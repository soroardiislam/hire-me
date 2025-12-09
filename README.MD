🚀 HireMe – Modular Backend (Node.js / Express.js)

HireMe is a fully modular backend application built using a clean Controller–Service–Model–Route architecture.
It supports JWT-based RBAC authentication, file uploads, and a structured job application workflow.

⚙️ Setup Instructions

Follow the steps below to run the project locally:

1. Clone the repository
git clone <your-repository-url>
cd hireme-backend

2. Install dependencies
npm install

3. Configure environment variables

Create a .env file in the project root and configure all required environment variables.

4. Create Uploads Folder
mkdir uploads

5. Start the development server
npm run dev

🔐 User Roles & Access Control
Role	Description
Admin	Can manage all users, jobs, and job applications.
Employee	Can create job posts and manage received applications (Accept/Reject).
Job Seeker	Can view job posts, upload a CV, and apply for jobs with a mock payment.
📌 API Endpoints
Auth
Method	Route	Description	Access
POST	/api/auth/register	Register a new user (default role: Job Seeker)	Public
POST	/api/auth/login	Login & receive JWT token	Public
POST	/api/auth/logout	Logout user	Public
POST	/api/auth/forgot-password	Send OTP to email	Public
POST	/api/auth/verify-otp	OTP verification	Public
PUT	/api/auth/update-profile	Update user profile	Authenticated
Jobs
Method	Route	Description	Access
GET	/api/jobs	Get all job listings	Public
POST	/api/jobs	Create job post	Employee, Admin
PUT	/api/jobs/:id	Update job post	Employee, Admin
DELETE	/api/jobs/:id	Delete job post	Employee, Admin
Applications
Method	Route	Description	Access
POST	/api/applications/apply/:jobId	Apply for a job with CV upload	Job Seeker
PUT	/api/applications/:id	Update status (ACCEPT / REJECT)	Employee, Admin
GET	/api/applications/history	Get own application history	Job Seeker
GET	/api/applications	Get all applications (role-based)	Employee, Admin
Users
Method	Route	Description	Access
GET	/api/users	Get all users	Admin
PUT	/api/users/:id	Update user	Admin
DELETE	/api/users/:id	Delete user	Admin
📁 Project Folder Structure
.
├── node_modules
├── src
│   ├── core
│   │   ├── app.js
│   │   ├── config.js
│   │   ├── controller.js
│   │   ├── error_handler.js
│   │   ├── roles.js
│   │   └── server.js
│   ├── middlewares
│   │   ├── auth.js
│   │   ├── role.js
│   │   ├── upload.js
│   │   └── modules
│   ├── applications
│   │   ├── application.controller.js
│   │   ├── application.model.js
│   │   ├── application.routes.js
│   │   ├── application.service.js
│   │   ├── application.validation.js
│   │   └── index.js
│   ├── auth
│   │   ├── auth.controller.js
│   │   ├── auth.service.js
│   │   ├── auth.validation.js
│   │   └── index.js
│   ├── invoice
│   │   ├── index.js
│   │   ├── invoice.model.js
│   │   └── invoice.service.js
│   ├── jobs
│   │   ├── index.js
│   │   ├── job.controller.js
│   │   ├── job.model.js
│   │   ├── job.routes.js
│   │   ├── job.service.js
│   │   ├── job.validation.js
│   │   └── users
│   ├── user
│   │   ├── user.controller.js
│   │   ├── user.model.js
│   │   ├── user.routes.js
│   │   ├── user.service.js
│   │   ├── user.validation.js
│   ├── routes
│   │   └── index.js
│   ├── services
│   │   ├── mail.service.js
│   │   └── payment.service.js
│   └── utils
│       ├── config.js
│       ├── jwt.js
│       ├── logger.js
│       ├── sendEmail.js
│       └── index.js
├── uploads
│   └── 65e5e6...
├── .env
├── package.json
├── package-lock.json
└── README.md

🧩 Tech Stack

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

Multer (File Upload)

Modular Architecture