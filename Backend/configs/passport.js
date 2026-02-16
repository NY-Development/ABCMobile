import dotenv from "dotenv";
dotenv.config(); 


import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/Users.js";
import jwt from "jsonwebtoken";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://bakerybackend-nine.vercel.app/api/auth/google/callback",

    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Extract Google data
        const email = profile.emails[0].value;
        const name = profile.displayName;
        const googleId = profile.id;

        // Check if user exists
        let user = await User.findOne({ email });

        if (!user) {
          // Create a new user with Google
          user = new User({
            name,
            email,
            password: "", // no password since Google login
            phone: "", // optional, can be updated later
            role: "owner", // default role for Google signups
            googleId,
            isAccountVerified: true, // Google is trusted
          });
          await user.save();
        }

        // Create JWT
        const token = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );

        return done(null, { user, token });
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// required for sessions but we can skip if you only use JWT
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

export default passport;
