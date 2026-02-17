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

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
