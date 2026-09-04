# Gbemisola Foundation — Backend API

Backend API for the **Gbemisola Foundation web platform**, built with Node.js and Express. The API provides the backend services used by the foundation's website, including news, media, user-related functionality, email communication, and the Sokoto Learn registration system.

## 🌐 Project

* **Frontend:** https://gbemisolafoundation.org/
* **Backend API:** https://gbemisola-backend.onrender.com
* **Frontend Repository:** https://github.com/ebuka-chris-dev/gbemisola_frontend

## 🚀 What I Built

I developed the backend API that supports the Gbemisola Foundation website and its related services.

### Core functionality

* REST API development with Node.js and Express
* News management and API endpoints
* Media management and image handling
* User-related API functionality
* Email functionality
* Sokoto Learn registration system
* Registration slot management
* Tags and content organization
* Database integration
* API authentication and protected operations
* Request handling and validation
* Integration between the React frontend and backend API

## 📋 Sokoto Learn Registration

One of the backend features I implemented was the **Sokoto Learn registration system**.

The system handles registration data and includes:

* Registration submission
* Competition information
* Zone selection
* School type
* Education level
* Registration slot management
* Slot availability checking

The registration functionality is organized as its own backend domain with controllers, models, routes, and slot management logic.

## 🖼️ Media Management

The application uses **Cloudinary** for managing uploaded media.

Images are uploaded and stored through Cloudinary rather than being maintained as permanent files on the application server.

This allowed the backend to integrate cloud-based media storage with the foundation's media and content functionality.

## 📰 News & Content

The backend provides API functionality for managing and retrieving foundation news and related content.

The codebase separates news functionality into its own domain containing:

```text
controller.js
model.js
routes.js
index.js
```

A similar domain-based structure is used for other major features of the application.

## 📧 Email

The backend includes dedicated email functionality for handling application email operations.

Email functionality is separated into its own domain and supported by reusable utilities within the application.

## 🏗️ Project Structure

```text
src/
├── config/
│   └── db.js
│
├── domains/
│   ├── email/
│   ├── media/
│   ├── news/
│   ├── sokoto-registration/
│   ├── tags/
│   ├── user/
│   └── sochet/
│
├── routes/
├── util/
│   ├── authenticate.js
│   ├── compareHashedData.js
│   ├── generateOTP.js
│   ├── hashData.js
│   ├── sendMail.js
│   └── slotLimits.js
│
└── server.js
```

The project uses a modular/domain-based structure to keep related models, controllers, routes, and business logic organized.

## 🛠️ Technology

* Node.js
* Express.js
* MongoDB
* Mongoose
* Sequelize
* JWT
* Axios
* Cloudinary
* Nodemailer
* Socket.IO
* Twilio
* Render

## 🧪 API Documentation & Testing

The API was documented and tested using **Postman**.

The Postman documentation provides the API requests needed to work with the backend, including request methods, parameters, request bodies, authentication requirements, and responses.

**Postman Documentation:**
Add your public Postman documentation link here.

## ☁️ Deployment

The backend is deployed on **Render** and serves as the API consumed by the Gbemisola Foundation frontend.

Production API:

```text
https://gbemisola-backend.onrender.com
```

## 💻 Running Locally

### Clone the repository

```bash
git clone https://github.com/ebuka-chris-dev/gbemisola_backend.git

cd gbemisola_backend
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create the required environment configuration used by the application.

These include credentials and configuration for the database, authentication, Cloudinary, email services, and other external services used by the API.

### Start the development server

```bash
npm run dev
```

## 🔗 Related Repository

The backend works together with the Gbemisola Foundation React frontend:

https://github.com/ebuka-chris-dev/gbemisola_frontend

## 👨‍💻 Developer

**Ebuka Christian Ugwu**

Full-Stack JavaScript Developer
