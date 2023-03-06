# Inventories
## Description

Inventories is a web application that helps businesses keep track of their inventory. The application is divided into two parts: the backend and the frontend.

The backend is an Express.js application that requires Node.js and PostgreSQL. It has the following endpoints:

- GET `/inventories`: Returns a list of inventories.
- POST `/inventories`: Creates a new inventory.
- DELETE `/inventories/:guid`: Deletes the inventory with the specified GUID.
- GET `/generate`: Generates 10,000 random inventory records in the database.

## Backend
To run the backend application, follow these steps:

1. Navigate to the `backend` folder using the command line.
2. Run the command `npm install` to install the required dependencies.
3. Create a `.env` file using the `.env.example` file as a template. This file should contain the necessary configuration parameters for your PostgreSQL database.
4. Run the command `npm start` to start the backend server.

## Frontend
To run the frontend application, follow these steps:

1. Navigate to the `frontend` folder using the command line.
2. Run the command `npm install` to install the required dependencies.
3. Create a `.env` file using the `.env.example` file as a template. This file should contain the necessary configuration parameters for your backend API URL.
4. Run the command `npm start` to start the frontend server.