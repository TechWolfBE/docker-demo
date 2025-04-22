# TechWolf Docker Demo

## Application

This demo showcases a simple message board application.

Messages are stored in a database and retrieved by a lightweight backend, which exposes them via an API. A basic frontend consumes this API to display messages and allows users to post new ones.

While the app itself is intentionally minimal, the focus of this demo is on how it’s packaged and run using Docker.

## Frontend Dockerfile

The frontend is built using a simple Dockerfile.

To optimize Docker’s layer caching, the build process starts by copying over the dependency files (package.json and package-lock.json) and installing the necessary packages. Only after dependencies are installed is the application code copied into the image. This approach ensures that Docker can cache and reuse the earlier layers, speeding up rebuilds when code changes don’t affect dependencies.

## Backend Dockerfile

The backend uses a multi-stage Dockerfile to produce two targets:

- Production Image (app): A lean image optimized for deployment.
- Development Image (dev): Built on top of the production image, this version adds hot-reloading and development tools.

This multi-stage strategy avoids duplicating effort and ensures that both images share common layers, reducing build time and maintaining consistency between environments.

## Docker Compose

Docker Compose simplifies the process of running multiple containers together.

With a single docker-compose.yml file (commonly referred to as the Compose file) you can define and orchestrate multiple services. This includes specifying which images to use, setting up volume mounts, forwarding ports, and more.

In essence, everything you’d normally configure via docker run can be defined declaratively in the Compose file, making it easy to version, share, and spin up complete environments with a single command.
