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
import adminRoutes from './routes/adminRoutes.js'
import advertRoutes from "./routes/advertRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(passport.initialize());

const allowedOrigins = [
  "http://localhost:5173", // local dev
  "http://localhost:8081", // local mobile dev
  "https://adama-bakery.vercel.app" //deployed url
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
  })
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

// --- BEAUTIFIED STATUS UI ---
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bakery API | Status</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
            body { background-color: #f4f7f6; display: flex; justify-content: center; align-items: center; height: 100vh; color: #333; }
            .card { background: white; padding: 2.5rem; border-radius: 20px; shadow: 0 10px 25px rgba(0,0,0,0.05); text-align: center; border: 1px solid #e1e8e7; max-width: 400px; width: 90%; box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
            .status-icon { width: 80px; height: 80px; background: #e8f5e9; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; position: relative; }
            .pulse { width: 20px; height: 20px; background: #4caf50; border-radius: 50%; position: relative; }
            .pulse::after { content: ''; width: 100%; height: 100%; background: #4caf50; border-radius: 50%; position: absolute; top: 0; left: 0; animation: pulse-animation 2s infinite; }
            @keyframes pulse-animation { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(3); opacity: 0; } }
            h1 { font-size: 1.5rem; margin-bottom: 0.5rem; color: #2c3e50; }
            p { color: #7f8c8d; line-height: 1.6; font-size: 0.95rem; }
            .badge { display: inline-block; background: #4caf50; color: white; padding: 5px 15px; border-radius: 50px; font-size: 0.75rem; font-weight: bold; text-transform: uppercase; margin-top: 1rem; letter-spacing: 1px; }
            .footer { margin-top: 2rem; font-size: 0.8rem; color: #bdc3c7; }
        </style>
    </head>
    <body>
        <div class="card">
            <div class="status-icon">
                <div class="pulse"></div>
            </div>
            <h1>System Operational</h1>
            <p>Bakery Backend API is running smoothly. All services are connected and responding to requests.</p>
            <div class="badge">Live</div>
            <div class="footer">Environment: Production</div>
        </div>
    </body>
    </html>
  `);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

export default app;