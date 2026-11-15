# Legal Clarity

**Current version:** `1.2.4`

Legal Clarity is a modern, multilingual, and statically-generated web application designed for browsing and managing legal documents like Terms of Service, Privacy Policies, and End-User License Agreements. It's built with performance and ease of use in mind, leveraging a modern tech stack for a seamless developer and user experience.

![Legal Clarity Screenshot](https://placehold.co/800x450.png?text=Legal+Clarity+App)

## Key Features

- **Dynamic Document Management**: Documents are managed as simple Markdown files, making content updates easy and version-control friendly.
- **Multi-language Support**: Fully internationalized with support for English, Spanish, and Portuguese. Language is switched seamlessly without page reloads.
- **Static Site Generation (SSG)**: Built as a static site for maximum performance, security, and effortless deployment on any static hosting provider (e.g., GitHub Pages, Vercel, Netlify).
- **Modern UI/UX**: Clean, responsive interface built with **shadcn/ui** and **Tailwind CSS**.
- **Light & Dark Mode**: Includes a theme switcher for user preference.
- **Dockerized**: Comes with a production-ready, multi-stage `Dockerfile` for easy containerization and deployment.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Content Parsing**: [Remark](https://github.com/remarkjs/remark) and [gray-matter](https://github.com/jonschlinkert/gray-matter) for Markdown processing.

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or another package manager like [Yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/legal-clarity.git
    cd legal-clarity
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running in Development Mode

To start the development server with hot-reloading:

```bash
npm run dev
```

The application will be available at `http://localhost:9002`.

## Building for Production

To create a production-ready static build of the application:

```bash
npm run build
```

This command generates a static version of the site in the `out/` directory. These are the files you would deploy to a static hosting service.

## Deployment to Cloudflare Workers

The production workflow builds the static export in `out/` and deploys it to Cloudflare Workers at `https://legal.lbenicio.dev/`. Configure repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.

## Deployment with Docker

A multi-stage `Dockerfile` is included to build a lightweight, production-ready Docker image using Nginx.

1.  **Build the Docker image:**
    ```bash
    docker build -t legal-clarity .
    ```

2.  **Run the Docker container:**
    ```bash
    docker run -p 8080:80 legal-clarity
    ```

The application will now be running and accessible at `http://localhost:8080`.


Before the first deployment, configure the two Cloudflare secrets above. If the hostname still has a DNS CNAME pointing to AWS, remove that conflicting record before Wrangler creates the Worker custom domain.
