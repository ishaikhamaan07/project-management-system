# Project Management System

A full-stack, cloud-deployed **Project Management System** built with **Next.js, TypeScript, Node.js, Express, PostgreSQL, Prisma, Redux Toolkit, and AWS**.

The application provides a centralized workspace for managing projects, tasks, priorities, teams, users, timelines, and project progress. It includes multiple project visualization modes, authentication with Amazon Cognito, a PostgreSQL database hosted on Amazon RDS, an Express API deployed on Amazon EC2, and a production frontend hosted with AWS Amplify.

This project was developed as a hands-on full-stack and cloud engineering project while following EdRoh's Project Management Dashboard tutorial, with additional debugging, production fixes, UI improvements, AWS configuration, and documentation performed during development.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Application Screenshots](#application-screenshots)
- [System Architecture](#system-architecture)
- [AWS Cloud Architecture](#aws-cloud-architecture)
- [Authentication Flow](#authentication-flow)
- [Database & ORM](#database--orm)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Production Deployment](#production-deployment)
- [Key Technical Challenges & Solutions](#key-technical-challenges--solutions)
- [Skills Demonstrated](#skills-demonstrated)
- [Acknowledgements](#acknowledgements)

---

## Project Overview

The **Project Management System** is a responsive full-stack web application designed to help teams organize projects and manage work efficiently.

The system provides project and task management through several different views, including:

- Board view
- List view
- Table view
- Timeline view
- Priority-based task views

Users can create projects and tasks, search application data, view team members, monitor task priorities, and interact with a dashboard containing project and task analytics.

The application also supports **light and dark themes** and uses **Amazon Cognito authentication** to protect the application and identify authenticated users.

The production architecture uses multiple AWS services rather than deploying the entire application as a single service.

---

## Features

### Dashboard

- Project status visualization
- Task priority distribution
- User task overview
- Responsive dashboard layout
- Light and dark themes

### Project Management

- Create new projects
- Browse available projects
- Project-specific task management
- Multiple visualization modes
- Board view
- List view
- Table view
- Timeline view

### Task Management

- Create tasks
- Assign tasks to users
- Associate tasks with projects
- Set task status
- Set task priority
- Add tags
- Configure start and due dates
- Success and error feedback after task creation

### Priority Management

Tasks can be viewed according to their priority:

- Urgent
- High
- Medium
- Low
- Backlog

Priority pages support both **List** and **Table** layouts.

### Search

- Search application data
- Quickly locate relevant tasks and projects

### Timeline

- Day view
- Week view
- Month view
- Project scheduling visualization

### Team & User Management

- View teams
- View application users
- Associate users with teams
- Assign tasks to users

### Authentication

- User registration
- Email verification
- User sign-in
- User sign-out
- Amazon Cognito authentication
- Cognito Post Confirmation Lambda integration
- Backend user provisioning after account confirmation
- Authenticated API requests

---

# Technology Stack

## Frontend

| Technology | Purpose |
|---|---|
| Next.js | React application framework |
| React | Component-based user interface |
| TypeScript | Static typing |
| Tailwind CSS | Application styling |
| Redux Toolkit | Global state management |
| RTK Query | API requests and caching |
| Material UI Data Grid | Tabular task views |
| Recharts | Dashboard data visualization |
| Lucide React | Application icons |
| React Hot Toast | Success and error notifications |
| date-fns | Date formatting and manipulation |

## Backend

| Technology | Purpose |
|---|---|
| Node.js | Server runtime |
| Express.js | REST API |
| TypeScript | Backend type safety |
| Prisma ORM | Database access and schema management |
| PostgreSQL | Relational database |
| PM2 | Production process management |

## AWS Cloud

| AWS Service | Purpose |
|---|---|
| AWS Amplify | Next.js frontend hosting |
| Amazon EC2 | Express backend hosting |
| Amazon RDS | Managed PostgreSQL database |
| Amazon API Gateway | HTTPS entry point for backend API |
| Amazon Cognito | User authentication |
| AWS Lambda | Cognito post-confirmation processing |
| Amazon S3 | Image/static asset storage |
| Amazon VPC | Cloud network isolation |

---

# Application Screenshots

## Dashboard

The dashboard provides a high-level overview of projects and tasks, including task priority distribution, project status, and tasks associated with the authenticated user.

### Dark Mode

![Dashboard Dark Mode](assets/screenshots/dashboard-dark.png)

### Light Mode

![Dashboard Light Mode](assets/screenshots/dashboard-light.png)

---

## Project Management

Projects can be viewed through multiple layouts depending on how the user wants to visualize the work.

### Board View

The board provides a workflow-oriented view of project tasks.

![Project Board](assets/screenshots/project-board.png)

### List View

The list layout provides a simplified overview of project tasks.

![Project List](assets/screenshots/project-list.png)

### Table View

The table view provides structured task information in a data-grid layout.

![Project Table](assets/screenshots/project-table.png)

### Timeline View

The timeline view helps visualize project scheduling and task duration.

![Project Timeline](assets/screenshots/project-timeline.png)

---

## Task Creation

Users can create tasks and configure details including status, priority, tags, dates, project association, author, and assignee.

![Create Task Modal](assets/screenshots/create-task-modal.png)

Successful task creation provides immediate user feedback through a notification.

---

## Project Creation

Projects can be created directly from the application.

![Create Project Modal](assets/screenshots/create-project-modal.png)

---

## Priority Management

Tasks can be filtered according to priority, allowing important work to be identified quickly.

### Urgent Priority — List View

![Urgent Priority List](assets/screenshots/priority-urgent-list.png)

### Urgent Priority — Table View

![Urgent Priority Table](assets/screenshots/priority-urgent-table.png)

The same reusable priority interface supports other priority levels including High, Medium, Low, and Backlog.

---

## Timeline

The application provides multiple timeline resolutions for project scheduling.

### Day View

![Timeline Day](assets/screenshots/timeline-day.png)

### Week View

![Timeline Week](assets/screenshots/timeline-week.png)

### Month View

![Timeline Month](assets/screenshots/timeline-month.png)

---

## Search

The search interface allows users to locate relevant information within the project management system.

![Search](assets/screenshots/search.png)

---

## Teams

Users can view teams and their associated information.

![Teams](assets/screenshots/teams.png)

---

## Users

The user interface provides visibility into registered application users.

![Users](assets/screenshots/users.png)

---

# System Architecture

The application follows a full-stack client-server architecture.

```text
                         ┌─────────────────────┐
                         │        User         │
                         └──────────┬──────────┘
                                    │
                                  HTTPS
                                    │
                         ┌──────────▼──────────┐
                         │    AWS Amplify      │
                         │   Next.js Client    │
                         └──────────┬──────────┘
                                    │
                         Auth / API Requests
                                    │
                ┌───────────────────┴───────────────────┐
                │                                       │
        ┌───────▼────────┐                    ┌─────────▼────────┐
        │ Amazon Cognito │                    │   API Gateway    │
        │ Authentication │                    │   HTTPS REST API │
        └───────┬────────┘                    └─────────┬────────┘
                │                                       │
                │ Post Confirmation                     │
                │                                       │
        ┌───────▼────────┐                    ┌─────────▼────────┐
        │   AWS Lambda   │                    │    Amazon EC2    │
        │ User Provision │───────────────────►│ Express Backend  │
        └────────────────┘                    └─────────┬────────┘
                                                      │
                                                   Prisma
                                                      │
                                            ┌─────────▼────────┐
                                            │    Amazon RDS    │
                                            │    PostgreSQL    │
                                            └──────────────────┘
```

---

# AWS Cloud Architecture

The production deployment uses several AWS services, each responsible for a specific part of the system.

### AWS Amplify

The Next.js frontend is built and deployed using **AWS Amplify Hosting**. Amplify is connected to the project's GitHub repository and automatically builds the application when production changes are pushed.

### Amazon API Gateway

The frontend communicates with the backend through an **Amazon API Gateway REST API**.

API Gateway provides an HTTPS endpoint between the Amplify frontend and the backend running on EC2.

```text
Next.js Frontend
       │
       │ HTTPS
       ▼
AWS API Gateway
       │
       │ HTTP Proxy
       ▼
Express API on EC2
```

### Amazon EC2

The Node.js/Express backend is hosted on an **Amazon EC2** instance.

The backend application is managed using **PM2**, allowing the Node.js process to continue running independently of the SSH session.

### Amazon RDS

Production application data is stored in a PostgreSQL database hosted using **Amazon RDS**.

The RDS database is accessed by the backend through Prisma and is isolated inside the AWS network.

### Amazon Cognito

**Amazon Cognito User Pools** provide authentication for the application.

Cognito handles:

- Account registration
- Email verification
- Authentication
- User sessions
- Sign-out

### AWS Lambda

A **Post Confirmation Lambda trigger** runs after a Cognito user successfully confirms their account.

The Lambda function sends the required user information to the application backend so a corresponding application user can be created in PostgreSQL.

### Amazon S3

Amazon S3 is used for application image/static asset integration.

### Amazon VPC

The AWS resources are organized inside a custom Virtual Private Cloud containing public and private subnets.

The architecture separates publicly accessible infrastructure from database resources.

---

# Authentication Flow

Authentication is handled through Amazon Cognito and integrated into the Next.js application using AWS Amplify libraries.

```text
User
 │
 ▼
Sign Up
 │
 ▼
Amazon Cognito
 │
 ▼
Email Verification
 │
 ▼
Account Confirmation
 │
 ▼
Post Confirmation Lambda
 │
 ▼
Backend User Creation API
 │
 ▼
PostgreSQL User Record
 │
 ▼
Authenticated Application
```

After authentication, the frontend can include the user's authentication token when communicating with protected backend endpoints.

This architecture separates **authentication identity** from the application's own **user data** stored in PostgreSQL.

---

# Database & ORM

The backend uses **PostgreSQL** with **Prisma ORM**.

Prisma provides:

- Database schema definition
- Type-safe database queries
- Database migrations
- Relationship management
- Seed data
- Development tooling

The production PostgreSQL database is hosted using **Amazon RDS**.

Typical database initialization:

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run seed
```

---

# Project Structure

```text
project-management-system/
│
├── assets/
│   ├── architecture/
│   └── screenshots/
│       ├── create-project-modal.png
│       ├── create-task-modal.png
│       ├── dashboard-dark.png
│       ├── dashboard-light.png
│       ├── priority-urgent-list.png
│       ├── priority-urgent-table.png
│       ├── project-board.png
│       ├── project-list.png
│       ├── project-table.png
│       ├── project-timeline.png
│       ├── search.png
│       ├── teams.png
│       ├── timeline-day.png
│       ├── timeline-month.png
│       ├── timeline-week.png
│       └── users.png
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── state/
│   ├── package.json
│   └── tailwind.config.ts
│
├── server/
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── seedData/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── index.ts
│   ├── ecosystem.config.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

# Getting Started

## Prerequisites

Before running the project locally, install:

- Git
- Node.js
- npm
- PostgreSQL

You will also need an AWS Cognito configuration if you want to use the complete authentication workflow.

---

## Clone the Repository

```bash
git clone git@github.com:ishaikhamaan07/project-management-system.git
cd project-management-system
```

---

## Install Frontend Dependencies

```bash
cd client
npm install
```

---

## Install Backend Dependencies

From the project root:

```bash
cd server
npm install
```

---

# Environment Variables

Environment files are intentionally excluded from Git and should **never contain credentials committed to the repository**.

## Client

Create:

```text
client/.env.local
```

Example:

```env
NEXT_PUBLIC_API_BASE_URL=YOUR_API_URL
NEXT_PUBLIC_COGNITO_USER_POOL_ID=YOUR_COGNITO_USER_POOL_ID
NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID=YOUR_COGNITO_APP_CLIENT_ID
```

## Server

Create:

```text
server/.env
```

Example:

```env
PORT=8000
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE"
```

Replace all placeholder values with your own environment configuration.

**Never commit `.env` or `.env.local` files containing credentials.**

---

# Database Setup

After configuring `DATABASE_URL`, navigate to the server:

```bash
cd server
```

Generate the Prisma client:

```bash
npx prisma generate
```

Run the database migration:

```bash
npx prisma migrate dev --name init
```

Seed the database:

```bash
npm run seed
```

---

# Running the Application

## Start the Backend

```bash
cd server
npm run dev
```

The development API runs using the configured server port.

## Start the Frontend

Open another terminal:

```bash
cd client
npm run dev
```

Then open:

```text
http://localhost:3000
```

---

# Production Deployment

The application was deployed using AWS to gain practical experience deploying a multi-service full-stack application.

## Deployment Flow

```text
GitHub Repository
       │
       ▼
AWS Amplify
       │
       ▼
Next.js Frontend
       │
       ▼
Amazon Cognito ──────► AWS Lambda
       │
       ▼
Amazon API Gateway
       │
       ▼
Amazon EC2
       │
       ▼
Node.js / Express / Prisma
       │
       ▼
Amazon RDS PostgreSQL
```

### Frontend Deployment

The `client` application is deployed through **AWS Amplify**, connected to the GitHub `main` branch.

Production pushes trigger a new Amplify build and deployment.

### Backend Deployment

The Express backend runs on **Amazon EC2** and is managed using PM2.

```bash
pm2 start ecosystem.config.js
```

### Database Deployment

PostgreSQL runs using **Amazon RDS**, with Prisma handling application-level database access.

### API Deployment

**Amazon API Gateway** provides the HTTPS API endpoint used by the Amplify-hosted frontend.

### Authentication Deployment

Authentication is handled using **Amazon Cognito**, with AWS Lambda integrated into the post-confirmation workflow.

---

# Key Technical Challenges & Solutions

Building and deploying the project involved debugging issues across the frontend, backend, database, authentication, and cloud infrastructure.

## PostgreSQL Task ID Sequence Synchronization

### Problem

Task creation returned a Prisma error similar to:

```text
Unique constraint failed on the fields: (`id`)
```

The existing task records contained IDs that were ahead of PostgreSQL's automatic sequence.

### Solution

The PostgreSQL sequence was synchronized with the maximum existing task ID.

This restored automatic primary-key generation without deleting existing application data.

---

## HTTPS Frontend and HTTP Backend

### Problem

The production frontend was hosted over HTTPS through AWS Amplify while the EC2 backend initially exposed an HTTP endpoint.

Modern browsers prevent secure HTTPS applications from making insecure HTTP requests because of mixed-content restrictions.

### Solution

Amazon API Gateway was introduced as an HTTPS entry point.

```text
Amplify HTTPS Frontend
        │
        ▼
API Gateway HTTPS Endpoint
        │
        ▼
EC2 Express Backend
```

This allowed the production frontend to communicate securely with the backend.

---

## Cognito User Provisioning

### Problem

Authentication users existed in Amazon Cognito, while the project management application's user information was stored separately in PostgreSQL.

A newly registered Cognito user therefore also needed a corresponding database record.

### Solution

A Cognito **Post Confirmation Lambda trigger** was configured.

After email confirmation:

```text
Cognito
   │
   ▼
Post Confirmation Trigger
   │
   ▼
AWS Lambda
   │
   ▼
Backend User API
   │
   ▼
PostgreSQL
```

This automatically provisions the application user after successful account confirmation.

---

## Lambda Post Confirmation Response

### Problem

The Cognito confirmation workflow initially failed because the Lambda function response did not follow the expected Cognito trigger behavior.

### Solution

The Lambda handler was updated to wait for the backend user-creation request and then return the original Cognito event.

This allowed account confirmation to complete successfully while still provisioning the application user.

---

## Dark Mode Card Styling

### Problem

The application's surrounding layout switched to dark mode correctly, but several dashboard cards remained white.

### Cause

The components referenced a Tailwind class that did not match the custom color defined in the Tailwind configuration.

### Solution

The card styles were updated to reference the correct configured dark-theme color.

The dashboard now renders consistently in both light and dark modes.

---

## Task Creation Feedback

Task creation was enhanced with explicit mutation handling and user feedback.

The RTK Query mutation is unwrapped so successful and failed requests can be handled independently.

Users now receive:

```text
Task created successfully!
```

when creation succeeds and an error notification if the operation fails.

This provides immediate confirmation instead of requiring the user to infer whether the API request succeeded.

---

# Skills Demonstrated

This project demonstrates practical experience across several areas of modern software development.

### Frontend Engineering

- Next.js
- React
- TypeScript
- Tailwind CSS
- Responsive UI development
- Redux Toolkit
- RTK Query
- Data visualization
- Material UI Data Grid
- Form and modal management
- Dark/light theme implementation
- API integration

### Backend Engineering

- Node.js
- Express.js
- REST API development
- TypeScript
- Controller and route architecture
- Request validation
- Error handling
- Production process management with PM2

### Database Engineering

- PostgreSQL
- Prisma ORM
- Database migrations
- Database seeding
- Relational data modeling
- Primary-key sequence debugging
- Amazon RDS

### AWS / Cloud Engineering

- Amazon VPC
- Public and private subnets
- Route tables
- Internet Gateway
- Security Groups
- Amazon EC2
- Amazon RDS
- Amazon API Gateway
- AWS Amplify
- Amazon Cognito
- AWS Lambda
- Amazon S3

### Authentication & Security

- Cognito User Pools
- Email verification
- Authenticated frontend sessions
- Authorization headers
- Cognito-triggered Lambda workflows
- Environment variable management
- Separation of frontend and backend configuration
- Database network isolation

### DevOps & Deployment

- Git
- GitHub
- Production deployment
- AWS infrastructure configuration
- PM2 process management
- Environment-specific configuration
- Debugging production APIs
- Frontend/backend cloud integration

---

# Development Highlights

The project provided practical experience building and troubleshooting a distributed application where the frontend, backend, database, authentication system, API gateway, and cloud infrastructure operate as separate but connected components.

Rather than only running the application locally, the complete architecture was deployed and tested using AWS infrastructure.

Some of the most valuable areas covered were:

- Designing a full-stack TypeScript application
- Managing client state with Redux Toolkit
- Creating reusable project and priority interfaces
- Building REST APIs with Express
- Managing relational data with Prisma and PostgreSQL
- Deploying Node.js on EC2
- Hosting PostgreSQL using RDS
- Connecting HTTPS clients through API Gateway
- Deploying Next.js through Amplify
- Implementing Cognito authentication
- Connecting Cognito events to Lambda
- Debugging database sequence issues
- Debugging authentication and production deployment problems
- Managing cloud networking through a custom VPC
- Working with production environment variables
- Using Git and GitHub throughout development

---

# Security Notes

Sensitive configuration is not stored in the repository.

Files such as:

```text
.env
.env.local
```

should remain excluded through `.gitignore`.

Never commit:

- Database passwords
- AWS credentials
- Private keys
- Authentication secrets
- Production environment credentials

Example environment values included in this README are placeholders only.

---

# Acknowledgements

This project was developed while following **EdRoh's Project Management Dashboard tutorial**.

The tutorial provided the foundation and architecture for the application. The project was implemented, configured, debugged, deployed, tested, and further documented as a hands-on learning project.

### Tutorial

**Build a Nextjs Project Management App & Deploy on AWS | Cognito, EC2, Node, RDS, Postgres, Tailwind**

YouTube:  
https://www.youtube.com/watch?v=KAV8vo7hGAo

### Original Repository

https://github.com/ed-roh/project-management

Credit to **EdRoh** for the original tutorial, application design, and educational material.

---

# Author

**Mohammed Amaan Irfan Shaikh**

GitHub: **ishaikhamaan07**

Project Repository:  
https://github.com/ishaikhamaan07/project-management-system

---

## Project Status

**Full-stack application completed and successfully deployed on AWS.**

The application has been tested across:

- Local frontend
- Local backend
- PostgreSQL
- AWS RDS
- AWS EC2
- AWS API Gateway
- AWS Amplify
- Amazon Cognito
- AWS Lambda

The repository serves as both the application source code and documentation of the full-stack/AWS deployment process.