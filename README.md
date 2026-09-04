# Gbemisola Foundation — Backend API

A Node.js and Express REST API powering the **Gbemisola Foundation web platform**.

The backend provides the server-side services required by the foundation's web application, including API routing, data management, authentication, file handling, communication services, and integration with external services.

The frontend is maintained separately and communicates with this API through REST endpoints.

## 🌐 Production

**Live API:**
https://gbemisola-backend.onrender.com

**Frontend:**
https://gbemisolafoundation.org

**Frontend Repository:**
https://github.com/ebuka-chris-dev/gbemisola_frontend

> The frontend website is currently being restored.

---

## 🚀 Overview

The Gbemisola Foundation backend was developed as a dedicated REST API for a production web platform.

The project uses a modular backend architecture, separating configuration, application domains, routes, utilities, and server initialization.

```
Client / React Frontend
          │
          │ HTTP Requests
          ▼
┌──────────────────────────┐
│      Express.js API      │
├──────────────────────────┤
│ Authentication            │
│ Application Routes        │
│ Business Domains          │
│ File Uploads              │
│ Communication Services    │
│ External Integrations     │
└────────────┬─────────────┘
             │
             ▼
        Database Layer
```

This separation allows the frontend and backend to be developed and deployed independently.

---

## ✨ Key Capabilities

The backend includes infrastructure for:

* RESTful API development
* User and application data management
* Authentication and authorization
* Password hashing
* JWT-based authentication
* File and image uploads
* Email communication
* SMS/phone communication
* API request handling
* Data validation and processing
* Database integration
* External API integrations
* CSV data export
* API documentation with Postman
* Cross-Origin Resource Sharing (CORS)

---

## 🛠️ Technology Stack

### Backend

* **Node.js**
* **Express.js**
* **JavaScript**
* REST API

### Database

* **MongoDB**
* **Mongoose**
* Sequelize
* PostgreSQL support

### Authentication & Security

* **JSON Web Token (JWT)**
* **bcrypt**
* **Node Forge**
* CORS
* Environment-based configuration

### Communication

* **Nodemailer** — email services
* **Twilio** — SMS/communication services

### File Processing

* Express File Upload
* JSON-to-CSV

### Real-Time Communication

* Socket.IO**

### API Documentation

* **Swagger JSDoc**
* **Swagger UI Express**

### Development & Code Quality

* ESLint
* Airbnb ESLint configuration
* Prettier
* Nodemon

---

## 🏗️ Project Architecture

The backend follows a modular structure:

```text id="5g6y84"
src/
├── config/
│   └── Application and database configuration
│
├── domains/
│   └── Application-specific business domains
│
├── routes/
│   └── API route definitions
│
├── util/
│   └── Shared utilities and helpers
│
└── server.js
```

The separation of domains and routes keeps application responsibilities organized and makes the backend easier to maintain as functionality grows.

---

## 🔐 Authentication & Security

The API includes security mechanisms for protecting application resources, including:

* JWT authentication
* Password hashing with bcrypt
* Protected API routes
* Environment-based secrets
* CORS configuration
* Authentication middleware
* Secure communication services

Sensitive credentials and service keys are managed through environment variables rather than being stored directly in source code.

---

## 📡 API

The backend exposes RESTful endpoints consumed by the Gbemisola Foundation frontend.

The API is designed around HTTP-based communication between the client application and backend services.

Example:

```
Frontend
   │
   │ GET /api/...
   │ POST /api/...
   │ PUT /api/...
   │ DELETE /api/...
   ▼
Express API
   │
   ▼
Application Domain
   │
   ▼
Database / External Service
```

---

## 📚 API Documentation & Testing

The API was documented and tested using **Postman**.

The Postman documentation covers the available API endpoints, including request methods, parameters, request bodies, authentication requirements, and expected responses.

**Postman API Documentation:**
*Add your public Postman documentation link here*

Using Postman throughout development helped with:

* API endpoint testing
* Request/response validation
* Authentication testing
* Debugging backend functionality
* Testing different request scenarios
* Maintaining API documentation for frontend integration


## ☁️ Deployment

The production backend is hosted on **Render**.

### Production API

https://gbemisola-backend.onrender.com

The frontend is deployed separately under the foundation's custom domain:

https://gbemisolafoundation.org

This deployment model allows the frontend and backend to operate independently while communicating through the REST API.

---

## 💻 Local Development

### 1. Clone the repository

```
git clone https://github.com/ebuka-chris-dev/gbemisola_backend.git

cd gbemisola_backend
```

### 2. Install dependencies

```
npm install
```

### 3. Configure environment variables

The application uses environment-based configuration for sensitive credentials and external services.

Create the appropriate environment configuration for your local setup.

Example:

```
PORT=8080
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Additional configuration may be required for services such as email, SMS, and other external integrations.

### 4. Start the development server

```
npm run dev
```

Or:

```
npm start
```

---

## 🔗 Related Project

This backend powers the Gbemisola Foundation frontend.

### Frontend Repository

https://github.com/ebuka-chris-dev/gbemisola_frontend

### Frontend Website

https://gbemisolafoundation.org

---

## 💡 Engineering Highlights

This project demonstrates practical backend engineering experience with:

* Designing REST APIs using Node.js and Express
* Structuring a backend into independent application domains
* Implementing authentication and authorization
* Working with MongoDB and Mongoose
* Integrating external services
* Handling file uploads
* Implementing email and SMS communication
* Building real-time capabilities with Socket.IO
* Documenting APIs with Swagger/OpenAPI
* Supporting data export workflows
* Managing environment-based configuration
* Integrating a backend with an independent React frontend
* Deploying a Node.js application to a cloud hosting platform

---

## 📌 Project Architecture

```
                 Gbemisola Foundation
                         │
                         ▼
                React Frontend
                         │
                         │ REST API
                         ▼
              Node.js / Express API
                         │
          ┌──────────────┼──────────────┐
          │              │              │
          ▼              ▼              ▼
       MongoDB       External APIs   Communication
                                      Services
```

---

## 👨‍💻 Developer

**Ebuka Christian**

Full-Stack JavaScript Developer specializing in React, Node.js, Express, REST APIs, database-driven applications, and production deployments.

GitHub:
https://github.com/ebuka-chris-dev

---

## 🔗 Project Links

| Resource               | Link                                                  |
| ---------------------- | ----------------------------------------------------- |
| 🌐 Foundation Website  | https://gbemisolafoundation.org                       |
| ⚙️ Production API      | https://gbemisola-backend.onrender.com                |
| 💻 Frontend Repository | https://github.com/ebuka-chris-dev/gbemisola_frontend |
| 🔧 Backend Repository  | https://github.com/ebuka-chris-dev/gbemisola_backend  |
