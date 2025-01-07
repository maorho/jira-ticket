This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Step 1: React App for Jira Credentials Login
Frontend:
A simple React UI that asks for Jira credentials (email, username, and API token) and logs in via a backend API.
Backend:
The backend handles authentication and provides a secure method to interact with Jira's API for creating tickets.
Step 2: UI for Ticket Creation
After login, the user can enter the following details:
Project ID -> Project Key
Title
Description
Occurrences (a number that is required in the Jira project)
Step 3: Submit Button
On form submission, a Jira ticket is created.
The user will receive feedback with a URL of the created ticket.
