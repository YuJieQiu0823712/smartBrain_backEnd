# Smart Brain - Face Recognition Web Application

Live Demo: [Smart Brain App](https://smartbrain-frontend-qmrt.onrender.com/)

Smart Brain is a web application that uses AI to detect faces in images via a URL input. Built with modern web technologies, it offers a simple user experience for registering, signing in, and using face detection.

![App Screenshot](example.png)

## How to Use

### Register
Enter your name (optional), email, and password.

### Sign In
Use your registered email and password.

### Submit an Image URL
Paste an image URL into the form and click “Detect.”
→ Detected faces will be highlighted with blue boxes.


## Technologies Used (Frontend)

### React
Fast and reusable UI library

### Tachyons
Utility-first CSS framework for rapid styling

### Clarifai API
AI-based image recognition platform


## Technologies Used (Backend)

### Bcrypt
Secure password hashing

### Node.js
JavaScript runtime for server-side logic

### Express
Web framework for handling routes and APIs

### PostgreSQL
Relational database

### Knex.js
SQL query builder for PostgreSQL


## Getting Started

Follow these steps to set up the project locally:

1. **Clone this repository**:
   ```bash
   git clone https://github.com/YuJieQiu0823712/smartBrain_backEnd.git
   cd smart-brain
   ```
2. **Install dependencies**:
    ```bash
   npm install
   ```
3. **Start the development server**:
    ```bash
   npm start
   ```
4. **Configure the Clarifai API**: \
   Add your Personal Acess Token in the `controllers/image.js` file to connect to Clarifai API <br>
   You can grab Clarifai API key [here](https://www.clarifai.com/)


## Hosting

### Render
Auto-deploys directly from GitHub repositories, similar to Heroku.

