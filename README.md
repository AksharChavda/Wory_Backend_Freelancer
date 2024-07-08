Wory - A Freelancing Website Backend
This is the backend for Wory, a freelancing website. The backend is built using Node.js, Express, and MongoDB with Mongoose for ORM. This project includes user authentication (role-based for Clients and Freelancers) and CRUD operations for projects.

*Table of Contents*
- Installation
- Configuration
- Scripts
- API Endpoints
- Testing Endpoints
  
Installation
1. Clone the repository:
 git clone https://github.com/your-username/wory-backend.git
 cd wory-backend

2. Install dependencies:
 npm install

2. Set up environment variables. Create a .env file in the root directory with the following content:
 .envfile
 PORT=5000
 MONGO_URI=mongodb://localhost:27017/wory
 JWT_SECRET=your_jwt_secret

Configuration
- PORT: The port on which the server will run.
- MONGO_URI: The MongoDB connection string.
- JWT_SECRET: The secret key for signing JSON Web Tokens.

Scripts
- start: Start the server.
- dev: Start the server with nodemon for development.

*API Endpoints*
Auth

POST /api/auth/signup: Register a new user.
Request body: { "name": "string", "email": "string", "password": "string", "role": "Client" | "Freelancer" }

POST /api/auth/login: Login a user.
Request body: { "email": "string", "password": "string" }

Projects
POST /api/projects: Add a new project (Client only).
Request body: { "title": "string", "description": "string", "tags": ["string"] }
Requires Authorization: Bearer <JWT> header.

GET /api/projects/getall: Get all projects.

PUT api/projects/projects/:id : Update a project (Client only).
Request body: { "title": "string", "description": "string", "tags": ["string"] }
Requires Authorization: Bearer <JWT> header.

DELETE /api/projects//projects/:id : Delete a project (Client only).
Requires Authorization: Bearer <JWT> header.

GET /api/projects/tags: Get projects by tags.
Request query: tags=["tag1", "tag2"]

Testing Endpoints
You can test the endpoints using Thunder Client (VS Code extension) or any other API testing tool like Postman or Insomnia.

Testing with Thunder Client
Login Endpoint

URL: http://localhost:5000/api/auth/login

Method: POST

Body (JSON):

json
Copy code
{
  "email": "user@example.com",
  "password": "password"
}
Response will include a token:

json
Copy code
{
  "user": {
    "_id": "user_id",
    "name": "abc",
    "email": "abc@example.com",
    "role": "Client"
  },
  "token": "your_jwt_token"
}
Adding a Project

URL: http://localhost:5000/api/projects

Method: POST

Headers:

Authorization: Bearer <your_jwt_token>
Body (JSON):

json
Copy code
{
  "title": "Project Title",
  "description": "Project Description",
  "tags": ["tag1", "tag2"]
}
Updating a Project

URL: http://localhost:5000/api/projects/:id

Method: PUT

Headers:

Authorization: Bearer <your_jwt_token>
Body (JSON):

json
Copy code
{
  "title": "Updated Title",
  "description": "Updated Description",
  "tags": ["newtag1", "newtag2"]
}
Deleting a Project

URL: http://localhost:5000/api/projects/:id
Method: DELETE
Headers:
Authorization: Bearer <your_jwt_token>
Fetching Projects by Tags

URL: http://localhost:5000/api/projects/tags?tags=["tag1","tag2"]
Method: GET
Make sure to replace <your_jwt_token> with the token received from the login endpoint.
