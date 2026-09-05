# Project Management System

A full-stack, cloud-deployed **Project Management System** built with **Next.js, TypeScript, Node.js, Express, PostgreSQL, Prisma, Redux Toolkit, and AWS**.

The application provides a centralized workspace for managing projects, tasks, priorities, teams, users, and timelines. It includes multiple project visualization modes, light/dark themes, Amazon Cognito authentication, and a production AWS deployment.

This project was developed while following EdRoh's Project Management Dashboard tutorial, with additional debugging, production fixes, UI improvements, AWS configuration, and documentation completed during development.

---

## Features

- Project and task management
- Board, List, Table, and Timeline project views
- Priority-based task views
- Create projects and tasks
- Assign tasks to users
- Task status, priority, tags, start dates, and due dates
- Search functionality
- Team and user management
- Dashboard analytics
- Light and dark themes
- Success and error notifications for task creation
- Amazon Cognito authentication
- Email verification and user sign-in/sign-out
- Automatic backend user creation using AWS Lambda

---

## Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| Next.js | React application framework |
| React | User interface |
| TypeScript | Static typing |
| Tailwind CSS | Styling |
| Redux Toolkit | Global state management |
| RTK Query | API requests and caching |
| Material UI Data Grid | Tabular task views |
| Recharts | Dashboard visualizations |
| Lucide React | Icons |
| React Hot Toast | User notifications |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | Server runtime |
| Express.js | REST API |
| TypeScript | Backend type safety |
| Prisma ORM | Database access |
| PostgreSQL | Relational database |
| PM2 | Production process management |

### AWS

| Service | Purpose |
|---|---|
| AWS Amplify | Next.js frontend hosting |
| Amazon EC2 | Express backend hosting |
| Amazon RDS | PostgreSQL database |
| Amazon API Gateway | HTTPS REST API |
| Amazon Cognito | Authentication |
| AWS Lambda | Post-confirmation user provisioning |
| Amazon S3 | Image/static asset integration |
| Amazon VPC | Cloud networking |

---

# Application Screenshots

## Dashboard

The dashboard provides an overview of project status, task priorities, and user tasks.

### Dark Mode

![Dashboard Dark Mode](assets/screenshots/dashboard-dark.png)

### Light Mode

![Dashboard Light Mode](assets/screenshots/dashboard-light.png)

---

## Project Management

Projects support multiple visualization modes.

### Board View

![Project Board](assets/screenshots/project-board.png)

### List View

![Project List](assets/screenshots/project-list.png)

### Table View

![Project Table](assets/screenshots/project-table.png)

### Timeline View

![Project Timeline](assets/screenshots/project-timeline.png)

---

## Task Creation

Tasks can be created with a status, priority, tags, dates, project association, author, and assignee.

![Create Task Modal](assets/screenshots/create-task-modal.png)

Successful and failed task creation attempts provide immediate toast notifications.

---

## Project Creation

![Create Project Modal](assets/screenshots/create-project-modal.png)

---

## Priority Management

Tasks can be filtered by **Urgent, High, Medium, Low, and Backlog** priorities.

### Urgent — List View

![Urgent Priority List](assets/screenshots/priority-urgent-list.png)

### Urgent — Table View

![Urgent Priority Table](assets/screenshots/priority-urgent-table.png)

The same reusable interface supports the remaining priority levels.

---

## Timeline

### Day View

![Timeline Day](assets/screenshots/timeline-day.png)

### Week View

![Timeline Week](assets/screenshots/timeline-week.png)

### Month View

![Timeline Month](assets/screenshots/timeline-month.png)

---

## Search

![Search](assets/screenshots/search.png)

---

## Teams

![Teams](assets/screenshots/teams.png)

---

## Users

![Users](assets/screenshots/users.png)

---

# System Architecture

The production application uses a multi-service AWS architecture.

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
         Post Confirmation                              │
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

### Deployment Architecture

**AWS Amplify** hosts the Next.js frontend and is connected to the GitHub `main` branch.

**Amazon API Gateway** provides an HTTPS endpoint between the Amplify frontend and the Express backend.

**Amazon EC2** hosts the Node.js/Express API, with **PM2** managing the backend process.

**Amazon RDS** hosts the production PostgreSQL database accessed through Prisma.

**Amazon Cognito** handles registration, email verification, authentication, sessions, and sign-out.

An **AWS Lambda Post Confirmation trigger** creates the corresponding application user after a Cognito account is confirmed.

**Amazon S3** is used for application image/static asset integration.

The infrastructure runs inside a custom **Amazon VPC** using public/private networking and security groups.

---

# Authentication Flow

```text
User Sign Up
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

Authentication identity is managed by Cognito while application-specific user information is stored in PostgreSQL.

---

# Project Structure

```text
project-management-system/
│
├── assets/
│   ├── architecture/
│   └── screenshots/
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

Install:

- Git
- Node.js
- npm
- PostgreSQL

A Cognito configuration is required to use the complete authentication workflow.

## Clone the Repository

```bash
git clone git@github.com:ishaikhamaan07/project-management-system.git
cd project-management-system
```

## Install Dependencies

Frontend:

```bash
cd client
npm install
```

Backend:

```bash
cd ../server
npm install
```

---

# Environment Variables

Environment files are excluded from Git and should never contain credentials committed to the repository.

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

Never commit production credentials, database passwords, AWS credentials, private keys, `.env`, or `.env.local`.

---

# Database Setup

From the `server` directory:

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run seed
```

---

# Running Locally

Start the backend:

```bash
cd server
npm run dev
```

Start the frontend in another terminal:

```bash
cd client
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# Production Deployment

The application was deployed across multiple AWS services to gain practical experience with full-stack cloud deployment.

```text
GitHub
   │
   ▼
AWS Amplify
   │
   ▼
Next.js Frontend
   │
   ├────────► Amazon Cognito ─────► AWS Lambda
   │
   ▼
API Gateway
   │
   ▼
Amazon EC2
   │
   ▼
Express + Prisma
   │
   ▼
Amazon RDS PostgreSQL
```

Production pushes to the GitHub `main` branch trigger Amplify frontend deployments.

The Express backend runs on EC2 using PM2, while API Gateway provides the HTTPS endpoint consumed by the frontend.

---

# Technical Challenges & Solutions

## PostgreSQL Task ID Sequence

Task creation initially produced a Prisma unique-constraint error because existing task IDs were ahead of PostgreSQL's automatic sequence.

The sequence was synchronized with the highest existing task ID, restoring automatic task creation without deleting existing data.

---

## HTTPS Frontend → HTTP Backend

The Amplify frontend runs over HTTPS while the original EC2 API endpoint used HTTP.

Browsers blocked these requests because of mixed-content security restrictions.

**Solution:** Amazon API Gateway was introduced as an HTTPS entry point:

```text
Amplify HTTPS Frontend
        │
        ▼
API Gateway HTTPS
        │
        ▼
EC2 Express Backend
```

---

## Cognito User Provisioning

Cognito manages authentication identities while application user records are stored separately in PostgreSQL.

A **Cognito Post Confirmation Lambda trigger** was configured to call the backend after account confirmation and automatically create the corresponding PostgreSQL user.

---

## Task Creation & User Feedback

Task creation was updated to correctly handle the RTK Query mutation response.

Successful requests now display:

```text
Task created successfully!
```

while failed requests display an error notification.

---

# Skills Demonstrated

### Full-Stack Development

- Next.js, React and TypeScript
- Node.js and Express
- REST API development
- Redux Toolkit and RTK Query
- Tailwind CSS
- Material UI Data Grid
- Recharts
- Responsive UI development
- Light/dark theme implementation

### Database

- PostgreSQL
- Prisma ORM
- Database migrations
- Database seeding
- Relational data modeling
- Database sequence debugging

### AWS / Cloud

- Amazon VPC
- Public and private subnets
- Route tables and Internet Gateway
- Security Groups
- Amazon EC2
- Amazon RDS
- Amazon API Gateway
- AWS Amplify
- Amazon Cognito
- AWS Lambda
- Amazon S3

### DevOps & Deployment

- Git and GitHub
- AWS production deployment
- PM2 process management
- Environment configuration
- Frontend/backend cloud integration
- Production debugging

---

# Acknowledgements

This project was developed while following **EdRoh's Project Management Dashboard tutorial**.

The tutorial provided the foundation and architecture for the application. The project was implemented, configured, debugged, deployed, tested, and further documented as a hands-on full-stack and AWS learning project.

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

The project demonstrates the complete development lifecycle from local full-stack development through database integration, authentication, debugging, and multi-service AWS deployment.