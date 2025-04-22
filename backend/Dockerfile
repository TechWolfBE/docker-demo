########################
###### Base image ######
########################

FROM python:3.11-slim AS app

# Set the working directory for the application
WORKDIR /app

# Install requirements, copy the requirements file first to leverage Docker cache
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY . .

CMD ["fastapi", "run", "--host", "0.0.0.0", "--port", "5000"]


#######################
###### Dev image ######
#######################

FROM app AS dev

# Install development dependencies
RUN pip install --no-cache-dir -r requirements-dev.txt

# Run in development mode with hot reload
CMD ["fastapi", "dev", "--reload", "--host", "0.0.0.0", "--port", "5000"]


