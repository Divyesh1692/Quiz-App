# Quiz Application

## Project Overview

This project is a Quiz Management Application built using Node.js and MongoDB. It allows users to register, login, attempt quizzes, and track their results. Admin users can create, update, and delete quizzes, while regular users can only submit their responses and view their quiz submissions.

The application provides secure user authentication and role-based access control (Admin vs User) via JWT tokens. It is designed to help users test their knowledge through a variety of quizzes and store their results for later review.

---

## Features

### User Features:

- **Sign Up**: Users can create an account with a username, email, and password.
- **Login**: Registered users can log in to the application securely.
- **Logout**: Users can log out of the application.
- **View Quizzes**: Users can view available quizzes.
- **Submit Quizzes**: After taking a quiz, users can submit their answers and receive scores.
- **View Quizzes Taken**: Users can track the quizzes they have participated in.

### Admin Features:

- **Create Quiz**: Admins can create new quizzes by specifying the title, description, and questions with options and answers.
- **Update Quiz**: Admins can update the details of any quiz.
- **Delete Quiz**: Admins can delete quizzes.
- **View All Quizzes**: Admins can view a list of all quizzes.

### Authentication & Authorization:

- **JWT-based Authentication**: Secure user login and session management with JWT tokens.
- **Role-based Access Control**: Admins have access to additional functionality like creating, updating, and deleting quizzes.
- **Secure Endpoints**: All actions require valid authentication tokens for secure access.

---

## Tech Stack

- **Frontend**: Not included (API backend only)
- **Backend**:
  - **Node.js**: Server-side JavaScript runtime
  - **Express.js**: Web framework for building APIs
  - **MongoDB**: NoSQL database to store user and quiz data
  - **Mongoose**: ODM for MongoDB to model data
  - **JWT**: For secure authentication
  - **Bcrypt.js**: For password hashing
- **Authentication**: JWT (JSON Web Token)
- **Cookie Handling**: For storing JWT token in browser cookies

---

## API Documentation

### **User Endpoints**

#### 1. **POST** `/user/signup`

- **Description**: Create a new user account.
- **Request Body**:
  ```json
  {
    "username": "user123",
    "email": "user123@example.com",
    "password": "password123",
    "role": "user" // Optional, defaults to "user"
  }
  ```
- **Response**:
  - **Status**: 201 (Created)
  - **Body**:
  ```json
  {
    "message": "User created successfully",
    "user": {
      "_id": "userId",
      "username": "user123",
      "email": "user123@example.com",
      "role": "user"
    }
  }
  ```

#### 2. **POST** `/user/login`

- **Description**: Log in an existing user.
- **Request Body**:
  ```json
  {
    "email": "user123@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  - **Status**: 200 (OK)
  - **Body**:
  ```json
  {
    "message": "Logged in successfully",
    "user": {
      "_id": "userId",
      "username": "user123",
      "email": "user123@example.com",
      "role": "user"
    }
  }
  ```

#### 3. **POST** `/user/logout`

- **Description**: Log out the user by clearing the session cookie.
- **Response**:
  - **Status**: 200 (OK)
  - **Body**:
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

#### 4. **GET** `/user/quizzes`

- **Description**: Retrieve a list of quizzes taken by the logged-in user.
- **Response**:
  - **Status**: 200 (OK)
  - **Body**:
  ```json
  {
    "message": "User quizzes fetched successfully",
    "quizzes": [
      {
        "_id": "quizId",
        "title": "Quiz 1",
        "description": "A general knowledge quiz",
        "questions": [
          {
            "question": "question",
            "options": ["options"],
            "answer": "answer"
          }
        ],
        "submission": [
          {
            "user": "userId",
            "score": "score",
            "submittedAt": "submission Date"
          }
        ]
      }
    ]
  }
  ```

### **Quiz Endpoints**

#### 1. **GET** `/quizzes/all`

- **Description**: Retrieve all available quizzes.
- **Response**:

  - **Status**: 200 (OK)
  - **Body**:

  ```json
  {
    "message": "Quizzes fetched successfully",
    "Quizzes": [
      {
        "_id": "quizId",
        "title": "Quiz 1",
        "description": "A general knowledge quiz"
      }
    ],
    "questions": [
      {
        "question": "question",
        "options": ["options"],
        "answer": "answer"
      }
    ],
    "submission": [
      {
        "user": "userId",
        "score": "score",
        "submittedAt": "submission Date"
      }
    ]
  }
  ```

#### 2. **GET** `/quizzes/quiz/:id`

- **Description**: Retrieve a quiz by its ID.
- **Response**:
  - **Status**: 200 (OK)
  - **Body**:
  ```json
  {
    "message": "Quiz fetched successfully",
    "data": {
      "_id": "quizId",
      "title": "Quiz 1",
      "description": "A general knowledge quiz",
      "questions": [
        {
          "question": "What is the capital of France?",
          "options": ["Paris", "London", "Berlin"]
        }
      ]
    }
  }
  ```

#### 3. **POST** `/quizzes/create`

- **Description**: Create a new quiz (Admin only).
- **Request Body**:
  ```json
  {
    "title": "Math Quiz",
    "description": "A quiz on basic math questions",
    "questions": [
      {
        "question": "What is 2 + 2?",
        "options": ["3", "4", "5"],
        "answer": "4"
      }
    ]
  }
  ```
- **Response**:
  - **Status**: 201 (Created)
  - **Body**:
  ```json
  {
    "message": "Quiz created successfully",
    "data": {
      "_id": "quizId",
      "title": "Math Quiz",
      "description": "A quiz on basic math questions",
      "questions": [
        {
          "question": "question",
          "options": ["options"],
          "answer": "answer"
        }
      ]
    }
  }
  ```

#### 4. **POST** `/quizzes/submit/:id`

- **Description**: Submit answers to a quiz and calculate score.
- **Request Body**:
  ```json
  {
    "answers": ["4"]
  }
  ```
- **Response**:
  - **Status**: 200 (OK)
  - **Body**:
  ```json
  {
    "message": "Quiz submitted successfully",
    "score": 1
  }
  ```

#### 5. **PATCH** `/quizzes/update/:id`

- **Description**: Update an existing quiz (Admin only).
- **Request Body**:
  ```json
  {
    "title": "Updated Math Quiz",
    "description": "Updated description"
  }
  ```
- **Response**:
  - **Status**: 200 (OK)
  - **Body**:
  ```json
  {
    "message": "Quiz updated successfully",
    "data": {
      "_id": "quizId",
      "title": "Updated Math Quiz",
      "description": "Updated description"
    }
  }
  ```

#### 6. **DELETE** `/quizzes/delete/:id`

- **Description**: Delete a quiz (Admin only).
- **Response**:
  - **Status**: 200 (OK)
  - **Body**:
  ```json
  {
    "message": "Quiz deleted successfully"
  }
  ```

---

## Authentication

All endpoints except for **signup**, **login**, and **logout** require a valid JWT token to access. The token should be passed in the `Cookie` header.

### Token Generation

Tokens are generated during login and saved in the `token` cookie.

- **JWT Expiry**: 1 hour
- **Authentication Middleware**: The `auth` middleware verifies the JWT token for protected routes.

---

## Setup

1. **Clone the repository**:

   ```bash
   git clone <repository_url>
   cd quiz-app
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create a `.env` file** with the following variables:

   ```
   JWT_SECRET=your_jwt_secret
   MONGODB_URI=your_mongo_database_url
   ```

4. **Start the server**:
   ```bash
   npm start
   ```

---
