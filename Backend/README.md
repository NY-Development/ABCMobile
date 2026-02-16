# 🍞 ABC Backend (Node.js + Express)

The backend API for **Adama Bakery & Cake (ABC)**.  
It powers authentication, product management, order handling, payment integration with **Chapa**, and notifications.  

---

## 🚀 Features
- **Authentication**: JWT-based, roles (Customer, Owner, Admin)  
- **Product Management**: Add, edit, stock tracking, admin-approved deletion  
- **Order Flow**: Place → Accept → Pre-payment → Ready notification  
- **Payments**: Integrated with Chapa, auto commission deduction  
- **Notifications**: Real-time updates (customer ↔ owner)  
- **Admin Tools**: Approve deletion requests, monitor activity  

---

## 📂 Folder Structure
```

backend/
│ ├── config/       # DB, env, and Chapa setup
│ ├── controllers/  # Business logic
│ ├── models/       # Mongoose schemas
│ ├── routes/       # API routes
│ ├── services/     # Payment & notifications
│ └── index.js      # App entry point
│── .env              # Environment variables
│── package.json
│── README.md

````

---

## ⚙️ Installation
```bash
cd backend
npm install
````

---

## ▶️ Running the Server

```bash
npm run server
```

Backend runs at:
👉 `http://localhost:5000/api`

---

## 🧪 Testing

You can test endpoints using **Postman** or **cURL**.
Example routes:

* `POST /api/auth/register` → Register user (customer/owner)
* `POST /api/auth/login` → Login & get JWT
* `POST /api/orders` → Place an order
* `POST /api/payment/initiate` → Start a Chapa payment

---

## 🛠️ Tech Stack

* Node.js + Express
* MongoDB + Mongoose
* Chapa Payment API
* JWT Authentication
* Web Push (notifications)

---

