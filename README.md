# 🍰 Adama Bakery & Cake (ABC)

An online ordering and management system for Adama Bakery & Cake.  
This platform allows customers to browse cakes/bakery items, place orders, pay securely via **Chapa**, and track order status.  
Owners can manage products (add/edit/delete), accept orders, and update readiness.  
Admins oversee the platform and approve deletion requests.  

---

## 🚀 Features
- **Customer**: Browse, order, customize (size, color, message, date, etc.), pay pre-amount  
- **Owner**: Manage products, accept/reject orders, send notifications, profile with location/map  
- **Admin**: Approve/deny delete requests, monitor platform  
- **Platform**: Commission auto-deduction from payments  
- Real-time notifications (order status updates)  

---

## 📂 Project Structure
```

abc-project/
│── Backend/       # Node.js + Express + MongoDB (API, Auth, Payment)
│── Frontend/      # React + Vite + Tailwind (UI)
│── README.md      # Root documentation

````

---

## ⚙️ Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/yamneg96/Adama-Bakery-Cake.git
cd Adama-Bakery-Cake
````

### Backend

```bash
cd Backend
npm install
```

### Frontend

```bash
cd Frontend
npm install
```

---

## ▶️ Running the Project

### Start Backend

```bash
cd backend
npm run dev
```

### Start Frontend

```bash
cd frontend
npm run dev
```

The app will be available at:
👉 Frontend: `http://localhost:5173`
👉 Backend API: `http://localhost:5000`

---

## 🛠️ Tech Stack

* **Frontend:** React + Vite + Tailwind CSS
* **Backend:** Node.js + Express
* **Database:** MongoDB Atlas
* **Payment:** Chapa
* **Notifications:** Web push + in-app

---

## Figma Design
```
https://www.figma.com/design/Y4Z45xzqdKZgNbDLYZS1ir/Adama-Bakery---Cake?node-id=0-1&p=f&t=yHQRiiLfBtXIoFzc-0
```

---

## 📜 License

This project is licensed under the MIT License.

