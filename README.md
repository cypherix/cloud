

---
# Project Setup Guide

⚠️ **Important Note**: 
Server Side not working in Anna-wifi sometimes
Arrange the other network 


## Initial Setup

### Installing Dependencies

To ensure all necessary modules are set up for the project, run the following command in the project's root directory:
also in /api directory also
```bash
npm install
```

## Running the Application

### Client-Side

To initiate the client-side of the application, execute the following command:
```bash
npm run dev
```
This will start the client-side of your application.

### Server-Side

For the server-side, navigate to the `api` directory in your terminal. Once inside the `api` directory, start the server by executing:
```bash
npm run server
```
Ensure you're in the `api` directory before running this command.

## Database Configuration

⚠️ **Important Note**: 
Make sure to connect to your own database instance.

The MongoDB connection URI can be located in the `server.js` file. Replace the existing URI with your specific MongoDB connection string.

---

This format should help anyone reading the `README.md` file to quickly understand the steps required to set up and run your application.

