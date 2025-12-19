
# HireMe – Modular Backend (Node.js / Express.js)
HireMe is a fully modular backend application built with a clean Controller–Service–Model–Route architecture. It supports JWT-based RBAC authentication, file uploads, and a structured job application workflow.


# ⚙️ Quick Start
Prerequisites
Node.js (v16 or higher)

MongoDB (local or Atlas)

npm 

Installation
Clone the repository

## git clone 
```
https://github.com/soroardiislam/hire-me.git
```
### cd hireme-backend

```

PORT=3000
MONGO_URI=mongodb://localhost:27017/hireme
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
ADMIN_EMAIL=mdsoroardi9@gmail.com
PASSWORD ="123456"

```

# Frontend URL (for CORS)
CLIENT_URL=https://hire-me-j5u0.onrender.com

### Postman Documentation:
[![Postman Documentation](https://img.shields.io/badge/Postman-API%20Docs-orange?logo=postman)](https://documenter.getpostman.com/view/48392996/2sB3dVPTQh)

# ERD
ERD_LINK =https://github.com/soroardiislam/hire-me/tree/main/ERD-PDF
### User Roles & Access Control

```
| Role           | Description                                                    |
| -------------- | -------------------------------------------------------------- |
| **Admin**      | Manage all users, jobs, and applications                       |
| **Employee**   | Create job posts, manage received applications (Accept/Reject) |
| **Job Seeker** | View jobs, upload CV, apply for jobs with mock payment         |

```

## API Endpoints
### Auth
```
| Method | Route                       | Description                             | Access        |
| ------ | --------------------------- | --------------------------------------- | ------------- |
| POST   | `/api/auth/register`        | Register new user (default: Job Seeker) | Public        |
| POST   | `/api/auth/login`           | Login & receive JWT                     | Public        |
| POST   | `/api/auth/logout`          | Logout                                  | Public        |
| POST   | `/api/auth/forgot-password` | Send OTP to email                       | Public        |
| POST   | `/api/auth/verify-otp`      | Verify OTP                              | Public        |
| PUT    | `/api/auth/update-profile`  | Update user profile                     | Authenticated |

```
### Jobs
```
| Method | Route           | Description          | Access          |
| ------ | --------------- | -------------------- | --------------- |
| GET    | `/api/jobs`     | Get all job listings | Public          |
| POST   | `/api/jobs`     | Create job post      | Employee, Admin |
| PUT    | `/api/jobs/:id` | Update job post      | Employee, Admin |
| DELETE | `/api/jobs/:id` | Delete job post      | Employee, Admin |

```
### Applications
```
| Method | Route                            | Description                      | Access          |
| ------ | -------------------------------- | -------------------------------- | --------------- |
| POST   | `/api/applications/apply/:jobId` | Apply for a job (with CV upload) | Job Seeker      |
| PUT    | `/api/applications/:id`          | Update status (ACCEPT / REJECT)  | Employee, Admin |
| GET    | `/api/applications/history`      | Get own application history      | Job Seeker      |
| GET    | `/api/applications`              | Get all applications (RBAC)      | Employee, Admin |

```
### Users

```| Method | Route            | Description   | Access |
| ------ | ---------------- | ------------- | ------ |
| GET    | `/api/users`     | Get all users | Admin  |
| PUT    | `/api/users/:id` | Update user   | Admin  |
| DELETE | `/api/users/:id` | Delete user   | Admin  |

```

## Project Folder Structure

```
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
│   ├── modules
│   │   ├── applications
│   │   │   ├── application.controller.js
│   │   │   ├── application.model.js
│   │   │   ├── application.routes.js
│   │   │   ├── application.service.js
│   │   │   ├── application.validation.js
│   │   │   └── index.js
│   │   ├── auth
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.service.js
│   │   │   ├── auth.validation.js
│   │   │   └── index.js
│   │   ├── invoice
│   │   │   ├── index.js
│   │   │   ├── invoice.model.js
│   │   │   └── invoice.service.js
│   │   ├── jobs
│   │   │   ├── index.js
│   │   │   ├── job.controller.js
│   │   │   ├── job.model.js
│   │   │   ├── job.routes.js
│   │   │   ├── job.service.js
│   │   │   ├── job.validation.js
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
│   └── <files>
├── .env
├── package.json
├── package-lock.json
└── README.md
              # Entry point, DB connection, server start
```

# Tech Stack

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

Multer (File Upload)

Modular Architecture
