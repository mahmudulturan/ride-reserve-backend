# Ride Reserve Backend


## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## Introduction

Welcome to the Ride Reserve project! This system is designed to streamline and automate the process of renting cars, managing reservations, and handling customer data. It provides a comprehensive solution for car rental companies to manage their fleet, customers, and rental operations efficiently.

## Features

- **User Registration and Authentication**
- **Role-Based Access Control (User and Admin)**
- **CRUD Operations for Cars**
- **CRUD Operations for Bookings**
- **JWT-Based Authentication**

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB, Mongoose
- **Language:** TypeScript
- **Data Validation:** Zod
- **Authentication:** JWT

## Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local or Atlas)
- **npm** (v6 or higher) or **yarn**

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mahmudulturan/ride-reserve-backend
   cd ride-reserve-backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following this example:

   ```env
   NODE_ENV=development
   PORT=5000
   BCRYPT_SALTROUND=number
   DB_URL=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>
   ACCESS_TOKEN_SECRET_KEY=xxxxxxxxxxxxxxx
   REFRESH_TOKEN_SECRET_KEY=xxxxxxxxxxxx
   ```

### Running the Application

1. **Start the development server:**

   ```bash
   npm run start:dev
   # or
   yarn start:dev
   ```

2. **Visit the application:**

   Open your browser and go to `http://localhost:5000`.

## API Endpoints

Here's a brief overview of the main API endpoints:

- **Auth:**

  - `POST /api/auth/signup` - Register a new user
  - `POST /api/auth/signin` - Login a user

- **Car:**

  - `POST /api/cars` - Create a new car (admin only)
  - `PUT /api/cars/:id` - Update a car (admin only)
  - `GET /api/cars` - Get all cars
  - `GET /api/cars/:id` - Get a car by id
  - `DELETE /api/cars/:id` - Soft Delete a car by ID (admin only)
  - `PUT /api/cars/return` - Return a car (admin only)

- **Bookings:**
  - `POST /api/bookings` - Create a Booking (User Only)
  - `GET /api/bookings` - Get all Bookings (admin Only)
  - `GET /api/bookings/my-bookings` - Get all bookings of user (user only)



## Contributing

Contributions are welcome! Please fork the repository and create a pull request for any changes you'd like to make.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Create a new Pull Request
