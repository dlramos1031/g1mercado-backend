# g1mercado-backend
Backend for 3R7-G1's "The Mercado" Software

### 3R7 Group 1 "The Mercado"

Members:
- Meljonh C. Asoy
- Mariel Regine C. Endab
- Harold Louis Mehila
- Dave Lester Ramos
- Joshua C. Felisilda
- Mikedynl Ganinay


# Node.js Backend Server with MySQL

This is a simple Node.js backend server that uses MySQL for database operations, built with Express.js and supporting user authentication via JWTs.

---

## Features
- User Signup and Login with secure password hashing (bcrypt).
- JWT-based authentication for protected routes.
- Easy-to-use environment variable setup with `dotenv`.
- Development-ready with `nodemon` for automatic server restarts.

---

## Prerequisites
1. **Node.js and npm**: Ensure that Node.js and npm are installed on your system. Download from [Node.js official site](https://nodejs.org/).
2. **XAMPP**: Install and set up XAMPP for running MySQL on your local machine.

---

## Installation Guide

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-folder>

### 2. Install Dependencies

Run the following command to install all required npm packages:

```bash
npm install express mysql2 dotenv body-parser bcrypt jsonwebtoken nodemon
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following configuration:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=yourdatabase
JWT_SECRET=yourjwtsecret
```

Replace `yourpassword`, `yourdatabase`, and `yourjwtsecret` with your MySQL password, database name, and a secure JWT secret, respectively.

### 4. Start XAMPP MySQL Server

Ensure that the MySQL server is running via XAMPP.

### 5. Run Database Setup

Create the required database and table. Run the following SQL commands:

```sql
CREATE DATABASE yourdatabase;

USE yourdatabase;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
```

### 6. Run the Server

Start the server using `nodemon`:

```bash
npx nodemon server.js
```

Or use `node` for manual start:

```bash
node server.js
```

The server will run on `http://localhost:3000`.

---

## API Endpoints

### 1. Signup

- **URL**: `/signup`
- **Method**: `POST`
- **Body**:
    ```json
    {
      "username": "yourusername",
      "email": "youremail@example.com",
      "password": "yourpassword"
    }
    ```

### 2. Login

- **URL**: `/login`
- **Method**: `POST`
- **Body**:
    ```json
    {
      "email": "youremail@example.com",
      "password": "yourpassword"
    }
    ```

### 3. Protected Routes

Protected routes are accessible under `/api/protected` and require a valid JWT token.

---

## Development Tips

- **Use Nodemon**: To auto-restart the server during development, run:
    ```bash
    npx nodemon server.js
    ```

- **Debugging**: Check the terminal for any errors or logs.

---

## Contribution

Feel free to fork and contribute to this project!

---

## License

This project is licensed under the MIT License.
