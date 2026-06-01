import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import cors from "cors";
import connectDB from "./configs/db.js";
import authRoutes from "./routes/authRoutes.js";
import ownerRoutes from "./routes/ownerRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import advertRoutes from "./routes/advertRoutes.js";
import deliveryRoutes from "./routes/deliveryRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(passport.initialize());

const allowedOrigins = [
  "http://localhost:5173", // local dev
  "http://localhost:8081", // local mobile dev
  "http://192.168.1.12:8081", // local mobile dev on physical device
  "http://192.168.1.12:5000", // local mobile app on physical device
  "http://192.168.1.12", // Allow from your machine IP
  "https://adama-bakery.vercel.app", //deployed url
  "https://abc-mobile-front.vercel.app", // 2nd deployed url
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/owners", ownerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/advert", advertRoutes);
app.use("/api/delivery", deliveryRoutes);

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ABC - Adama Bakery and Cake</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #fcf8f2;
                color: #4a3728;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                text-align: center;
            }
            .container {
                max-width: 600px;
                padding: 40px;
                background: white;
                border-radius: 15px;
                box-shadow: 0 10px 25px rgba(0,0,0,0.05);
                border: 1px solid #f3e5d8;
            }
            h1 {
                color: #d2691e;
                margin-bottom: 10px;
                font-size: 2.5rem;
            }
            p {
                font-size: 1.1rem;
                line-height: 1.6;
                color: #6d5440;
            }
            .status-badge {
                display: inline-block;
                background-color: #e8f5e9;
                color: #2e7d32;
                padding: 6px 16px;
                border-radius: 20px;
                font-weight: bold;
                font-size: 0.9rem;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🍰 Adama Bakery and Cake (ABC)</h1>
            <p>Welcome to the backbone of ABC! Our backend API is up, running, and fresh out of the oven. Ready to serve sweet data and delicious requests.</p>
            <div class="status-badge">● API Status: Healthy & Active</div>
        </div>
    </body>
    </html>
  `);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

export default app;
