# TechWolf Docker Demo

This demo showcases how to use Docker in real-world projects, focusing on best practices by containerizing a simple application.

## Docker Best Practices

### Layer caching

Docker builds images in layers. A new layer is created for each line in the Dockerfile. These layers are cached and reused if the contents of the previous layer haven't changed, which helps speed up builds. We can use this mechanism to avoid re-doing work while building the image unless necessary.

A common example of this is using the Docker layer cache to cache the dependencies of your project.
First, we install the dependencies of our application. Then we copy over the source code.
If dependencies remain unchanged, Docker can skip reinstalling them, significantly reducing rebuild times.

### Multi stage build

Naively built Docker images often include unnecessary development dependencies, resulting in bloated images. We can reduce the size of the image by spliting up the image into multiple stages.

1. Build stage: Install development dependencies, copy the source code, and build/compile the app.

2. Final stage: Start from a clean base image, install production dependencies, and copy over the build artefacts.

This can greatly reduce the size of your final image.

## Application

This demo showcases a simple message board application.

Messages are stored in a database and retrieved by a lightweight backend, which exposes them via an API. A basic frontend consumes this API to display messages and allows users to post new ones.

While the app itself is intentionally minimal, the focus of this demo is on how it’s packaged and run using Docker.

### Backend Dockerfile

To optimize Docker’s layer caching, the build process starts by copying over the dependency files (requirements.txt) and installing the necessary packages. Only after dependencies are installed is the application code copied into the image. This approach ensures that Docker can cache and reuse the earlier layers, speeding up rebuilds when code changes don’t affect dependencies.

The backend uses a multi-stage Dockerfile to produce two targets:

- Production Image (app): A lean image optimized for deployment.
- Development Image (dev): Built on top of the production image, this version adds hot-reloading and development tools.

This multi-stage strategy avoids duplicating effort and ensures that both images share common layers, reducing build time and maintaining consistency between environments.

### Frontend Dockerfile

The frontend uses a multi-stage Dockerfile to reduce the size of the final image.
In the first 'build' stage, all the dependencies are installed. Then the app is built using the `npm run build` command.
This produces a folder with some static HTML, CSS, and JavaScript files, that no longer depend on anything else.
We then start a new `app` stage from a fresh image. Here we install only the production dependency (the `serve` package, which is just a simple webserver), and we copy over the folder with our HTML, CSS, and JS files.

### Docker Compose

Docker Compose simplifies the process of running multiple containers together.

With a single docker-compose.yml file (commonly referred to as the Compose file) you can define and orchestrate multiple services. This includes specifying which images to use, setting up volume mounts, forwarding ports, and more.

Everything you’d normally configure via docker run can be defined declaratively in the Compose file, making it easy to version, share, and spin up complete environments with a single command.
