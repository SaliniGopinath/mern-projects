# FreshPlate 🍽️

FreshPlate is a **full-stack food ordering web application** built with the MERN stack (MongoDB, Express.js, React.js, Node.js). 
Users can browse the menu, add items to their cart, manage addresses, and place orders. 
Admins can manage users, menu items, categories, and track all orders.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)

## Features

### User Side
- User registration and login
- View menu with all available items
- Add items to cart and manage cart items
- Add and manage delivery addresses
- Checkout and place orders
- Order confirmation after successful placement
### Admin Side
- View all registered users
- Manage menu categories
- View all menu items with their categories
- Track all orders placed by users

### Backend
- All data (users, addresses, orders, menu items, cart) stored in DB.
- RESTful APIs for communication between frontend and backend

## Tech Stack
- **Frontend:** React.js, HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Tools & Libraries:** Axios, React Router, Mongoose

## Project Structure

mern-projects/
├── backend/                            # Express backend
│   ├── app/api/controllers/            # Request handlers for different features
│   │   ├── adminController.js
│   │   ├── userController.js
│   │   ├── orderController.js
│   │   └── cartController.js
│   ├── app/api/model/                  # Mongoose models
│   │   ├── adminModel.js
│   │   ├── cartModel.js
│   │   ├── categoryModel.js
│   │   ├── orderModel.js
│   │   └── prodModel.js
│   │   └── shippingAddressModel.js
│   │   └── userModel.js
│   ├── routes/                         # API routes
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── menuRoutes.js
│   │   └── cartRoutes.js
│   ├── app/api/middleware/                 
│   │   └── upload.js                #File upload handling
│   ├── config/                        
│   │   └── database.js                # MongoDB connection setup
│   ├── routes/                         # API route definitions
│   │   └── adminRoutes.js
│   │   └── cartRoutes.js
│   │   └── orderRoutes.js
│   │   └── userRoutes.js
│   ├── main.js                       # Backend entry point
│   └── package-lock.json             
│   └── package.json
│   ├── server.js                     # Server initialization
│
├── user-freshplate/                    # React frontend app
│   ├── public/
│   │
│   ├── src/
│   │   ├── admin-dashboard              # Admin side of application
│   │   │   ├── admin
│   │   │   ├── ├── AddAdmins.jsx
│   │   │   ├── ├── ViewAdmins.jsx
│   │   │   ├── category
│   │   │   ├── ├── Addcategory.jsx
│   │   │   ├── ├── ListCategory.jsx
│   │   │   ├── orders
│   │   │   ├── ├── ViewOrders.jsx
│   │   │   ├── products
│   │   │   ├── ├── AddProducts.jsx
│   │   │   ├── ├── ViewProducts.jsx
│   │   │   ├── user
│   │   │   ├── ├── ViewUsers.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   ├── components/                 # User side of application
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── MenuItemCard.jsx
│   │   │   ├── CartItem.jsx
│   │   │   └── Loader.jsx
│   │   │
│   │   ├── pages/                      # Full pages/screens
│   │   │   ├── cart.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Menu.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── OrderSummary.jsx
│   │   │   ├── OrderSuccess.jsx
│   │   │   ├── ShippingAddress.jsx
│   │   │   └── SignUp.jsx
│   │   │   └── UserBody.jsx
│   │   │
│   │   ├── services/                   # API call functions
│   │   │   ├── authService.js
│   │   │   ├── userService.js
│   │   │   ├── menuService.js
│   │   │   ├── cartService.js
│   │   │   └── orderService.js
│   │   │
│   │   ├── utils/                      # Utility/helper functions
│   │   │   └── auth.js
│   │   │   └── config.js
│   │   │
│   │   ├── App.js                      # Main app component
│   │   ├── index.js                    # Entry point
│   │   └── index.css                  # Global CSS
│   │
│   ├── package.json                   
│   └── package-lock.json               
│
├── .gitignore
├── package.json                        # Root project dependencies
├── package-lock.json
└── README.md

