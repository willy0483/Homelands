# Homelands 🏡

Homelands is a real estate management system built with **Node.js** and **Sequelize**. It provides a structured database schema for managing estates, users, reviews, and images efficiently.

## 📌 Features

- **Estate Listings**: Manage property listings with pricing, room details, and floor plans.
- **User Authentication**: Secure user login with hashed passwords.
- **Favorites & Reviews**: Users can save their favorite estates and leave reviews.
- **Image Management**: Upload and associate images with estates.
- **Staff &**: Manage system staff.

## 🏗 Database Schema (Sequelize Models)

The system follows a relational structure with the following models:

1. **Users** – Manages users with authentication details.
2. **Estates** – Stores estate properties with attributes like price, rooms, and location.
3. **Estate Types** – Categorizes estates into types (apartment, house, etc.).
4. **Cities** – Stores city names and zip codes.
5. **Favorites** – Allows users to save their preferred estates.
6. **Reviews** – Enables users to review estates.
7. **Images** – Stores images and links them to estates.
8. **Staffs** – Manages the system’s staff members.

## 🔧 Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/willy0483/Homelands
cd homelands
```

### 2️⃣ Install Dependencies
```
npm install
```

### 3️⃣ Set Up Database
Modify `.env` to configure your database connection.

```plaintext
PORT = "port"

DBHOST = "db_host"
DBUSER = "user"
DBPASSWD = "password"
DBNAME = "db_name"

# Token Access Key
TOKEN_ACCESS_KEY=your_secure_random_access_key
TOKEN_ACCESS_EXPIRATION_SECS=3600

# Token Refresh Key
TOKEN_REFRESH_KEY=your_secure_random_refresh_key
TOKEN_REFRESH_EXPIRATION_SECS=86400

```

### 4️⃣ Start the Server
```
nodemon
```

## 📡 Postman
https://documenter.getpostman.com/view/38785077/2sAYk7TQ2r
