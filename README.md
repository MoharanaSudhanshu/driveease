# 🚗 DriveEase - Premium Car Rental Platform

DriveEase is a full-stack car rental web application that allows users to browse vehicles, make bookings, manage wishlists, write reviews, and securely manage their profiles. It also includes a powerful Admin Dashboard for fleet management, booking control, analytics, and inventory monitoring.

---

## 🌟 Features

### 👤 User Features

- User Registration & Login (JWT Authentication)
- Browse Available Cars
- Advanced Search & Filtering
- Car Details Page
- Wishlist Management ❤️
- Car Booking System
- Booking History
- Cancel Bookings
- Review & Rating System
- Similar Car Recommendations
- User Profile Management
- Cloudinary Profile Image Upload

---

### 🛠 Admin Features

- Admin Dashboard
- Fleet Management
- Car Availability Control
- Booking Management
- Revenue Analytics
- Fleet Availability Pie Chart
- Statistics Cards
- Car Inventory Management

---

## 🖥 Tech Stack

### Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS
- React Hot Toast
- Recharts
- React Icons

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt.js
- Cloudinary
- Multer

### Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas
- Media Storage: Cloudinary

---

## 📂 Project Structure

```bash
DriveEase/
│
├── client/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   ├── api/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/MoharanaSudhanshu/driveease.git

cd driveease
```

---

### 2. Install Frontend Dependencies

```bash
cd client

npm install
```

---

### 3. Install Backend Dependencies

```bash
cd ../server

npm install
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT=5000

MONGO_URI=your_mongodb_atlas_connection_string

JWT_SECRET=your_super_secret_key

JWT_EXPIRES_IN=7d

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🚀 Running Locally

### Backend

```bash
cd server

npm run dev
```

Runs on:

```text
http://localhost:5000
```

---

### Frontend

```bash
cd client

npm run dev
```

Runs on:

```text
http://localhost:5173
```

---

## 📊 Admin Access

Default Admin Credentials:

```text
Email: admin@driveease.com

Password: ********
```

> Change credentials before production deployment.

---

## ☁️ Deployment

### Frontend

Deploy using:

- Vercel

### Backend

Deploy using:

- Render

### Database

- MongoDB Atlas

### Media Storage

- Cloudinary

---

## 🔒 Authentication

DriveEase uses:

- JWT Token Authentication
- Protected Routes
- Role-Based Access Control (Admin/User)
- Password Hashing using bcrypt

---

## 📈 Future Improvements

- Razorpay Payment Gateway
- Direct UPI Payments
- Email Notifications
- Booking Invoices PDF
- Google Authentication
- Vehicle Tracking
- AI Recommendation Engine
- Live Availability Calendar
- PWA Support

---

## 👨‍💻 Author

**Sudhanshu Sekhar Moharana**

B.Tech CSE Student  
Sambalpur University Institute of Information Technology

GitHub:
https://github.com/MoharanaSudhanshu

---

## 📜 License

This project is licensed under the MIT License.

---

⭐ If you like this project, please give it a star on GitHub!
