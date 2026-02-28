# Deployment Guide

This guide provides instructions for building and deploying the Legal Documents application.

## Deployment Strategy

The application is built as a fully **static site**. The output is a collection of HTML, CSS, JavaScript, and other static assets that can be served by any static hosting provider or web server.

## Building for Production

To create a production-ready build, run the following command from the project root:

```bash
npm run build
```

This command executes `next build`, which will:
1.  Statically generate all pages.
2.  Output the final static assets into the `out/` directory.

The contents of the `out/` directory are all you need to deploy.

## Deployment Options

### 1. Static Hosting Providers

You can deploy the contents of the `out/` directory to any static hosting service. Popular choices include:

- **Vercel**: Push your repository and Vercel will automatically detect the Next.js project and deploy it. Ensure the "Output Directory" in the project settings is set to `out`.
- **Netlify**: Drag and drop the `out/` folder into the Netlify UI, or connect your Git repository. Set the "Build command" to `npm run build` and the "Publish directory" to `out`.
- **GitHub Pages**: Configure a GitHub Actions workflow to build the project and deploy the `out` directory to the `gh-pages` branch.
- **Firebase Hosting**: Use the Firebase CLI to deploy the `out` directory.

### 2. Docker Deployment

A production-ready, multi-stage `Dockerfile` is included for containerized deployments. It uses Nginx to serve the static files efficiently.

**Steps to Deploy with Docker:**

1.  **Build the Docker image:**
    From the project root, run:
    ```bash
    docker build -t legal-clarity .
    ```
    This command will execute the multi-stage build. The first stage builds the Next.js application, and the second stage copies the static files from the `out/` directory into a lightweight Nginx container.

2.  **Run the Docker container:**
    ```bash
    docker run -d -p 8080:80 --name legal-clarity-app legal-clarity
    ```
    - `-d`: Runs the container in detached mode (in the background).
    - `-p 8080:80`: Maps port 8080 on your host machine to port 80 inside the container (where Nginx is listening).
    - `--name legal-clarity-app`: Assigns a convenient name to the container.

The application will now be running and accessible at `http://localhost:8080`. You can adapt the port mapping and other Docker run options for your specific production environment.
