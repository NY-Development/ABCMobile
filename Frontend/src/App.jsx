import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OrderForm from "./pages/OrderForm";
import Contact from "./pages/Contact";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Admin from "./pages/Admin";
import VerifyOTP from "./pages/VerifyOTP";
import Bakeries from "./pages/Bakeries";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import About from "./pages/About";
import AdditionalInfo from "./pages/AdditionalInfo";
import { OwnerProvider } from "./context/OwnerContext";
import Owner from "./pages/Owner"
// import Order from "./pages/Order"
import OrderCenter from "./pages/OrderCenter"
import OwnerProfile from "./pages/OwnerProfile";
import CustomerProfile from "./components/CustomerProfile";
import OAuthSuccess from "./pages/OAuthSuccess";
import ClientOrder from "./pages/ClientOrder";
import OwnerProducts from "./pages/OwnerProducts";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import EULA from "./pages/EULA";
import Payment from "./pages/Payment"
import Screenshot from "./pages/Screenshot"
import Profile from "./components/Profile";
// import {Analytics} from "@vercel/analytics/react"

// const {user} = useAuth();

const App = () => {
  
  return (
    <>
      <Toaster position="center" reverseOrder={false} />
      <AuthProvider>
        <OwnerProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          {/* <Analytics /> */}
          <Navbar />
          <main className="flex-grow pt-15">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/users" element={<Admin />} />
              <Route path="/admin/owners" element={<Admin />} />
              <Route path="/admin/payments" element={<Admin />} />
              <Route path="/verify-otp" element={<VerifyOTP />} />
              <Route path="/forgot" element={<ForgotPassword />} />
              <Route path="/reset" element={<ResetPassword />} />
              {/* LOGGED IN USER */}
              <Route path="/additionalInfo" element={<AdditionalInfo />} />
              <Route path="/bakeries" element={<Bakeries />} />
              <Route path="/oauth-success" element={<OAuthSuccess />} />
              <Route path="/owner" element={<Owner />} />
              <Route path="/ownerproducts/:id" element={<OwnerProducts />} />
              <Route path="/ownerproducts" element={<OwnerProducts />} />
              <Route path="/orderForm" element={<OrderForm />} />
              <Route path="/ordercenter" element={<OrderCenter />} />
              <Route path="/clientorder" element={<ClientOrder />} />
              <Route path="/owner" element={<Owner />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/eula" element={<EULA />} />
              <Route path="/payment/success" element={<Payment />} />
              <Route path="/screenshot" element={<Screenshot />} />
              <Route path="/profile" element={<Profile />} />
              {/* <Route path="/order" element={<Order />} /> */}
              {/* <Route path="/notification" element={<Orders />} /> */}

              {/* {user ? <Route path="/oauth-success" element={<OAuthSuccess />} /> : <Route path="/login" element={<Login />} />}
              {user ? <Route path="/owner" element={<Owner />} /> : <Route path="/login" element={<Login />} />}
              {user ? <Route path="/ownerproducts/:id" element={<OwnerProducts />} /> : <Route path="/login" element={<Login />} />}
              {user ? <Route path="/orderForm" element={<OrderForm />} /> : <Route path="/login" element={<Login />} />}
              {user ? <Route path="/ordercenter" element={<OrderCenter />} /> : <Route path="/login" element={<Login />} />}
              {user ? <Route path="/clientorder" element={<ClientOrder />} /> : <Route path="/login" element={<Login />} />}
              {user ? <Route path="/owner" element={<Owner />} /> : <Route path="/login" element={<Login />} />}
              {user ? <Route path="/order" element={<Order />} /> : <Route path="/login" element={<Login />} />}
              {user ? <Route path="/notification" element={<Orders />} /> : <Route path="/login" element={<Login />} />} */}
            </Routes>
          </main>
          <Footer />
        </div>
        </OwnerProvider>
      </AuthProvider>
    </>
  );
};

export default App;
