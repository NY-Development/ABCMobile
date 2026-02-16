import Home from "../pages/Home/Home";
import About from "../pages/Static/About";
import Contact from "../pages/Static/Contact";
import PrivacyPage from "../pages/Static/PrivacyPage";
import TermsPage from "../pages/Static/TermsPage";
import EULA from "../pages/Static/EULA";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";
import VerifyOTP from "../pages/Auth/VerifyOTP";
import OAuthSuccess from "../pages/Auth/OAuthSuccess";

import Admin from "../pages/Admin/Admin";
import Owner from "../pages/Owner/Owner";
import OwnerProducts from "../pages/Owner/OwnerProducts";
import OrderForm from "../pages/Owner/OrderForm";
import OrderCenter from "../pages/Owner/OrderCenter";
import ClientOrder from "../pages/ClientOrder/ClientOrder";
import Payment from "../pages/Payment/Payment";
import Screenshot from "../pages/Payment/Screenshot";
import AdditionalInfo from "../pages/Misc/AdditionalInfo";
import Bakeries from "../pages/Bakeries/Bakeries";

// RouteConfig structure
const routes = {
  public: [
    { path: "/", element: Home },
    { path: "/about", element: About },
    { path: "/contact", element: Contact },
    { path: "/privacy", element: PrivacyPage },
    { path: "/terms", element: TermsPage },
    { path: "/eula", element: EULA },
    { path: "/login", element: Login },
    { path: "/register", element: Register },
    { path: "/forgot", element: ForgotPassword },
    { path: "/reset", element: ResetPassword },
    { path: "/verify-otp", element: VerifyOTP },
  ],
  protected: [
    // Admin
    { path: "/admin", element: Admin, roles: ["admin"] },
    { path: "/admin/users", element: Admin, roles: ["admin"] },
    { path: "/admin/owners", element: Admin, roles: ["admin"] },
    { path: "/admin/payments", element: Admin, roles: ["admin"] },

    // Owner
    { path: "/owner", element: Owner, roles: ["owner"] },
    { path: "/ownerproducts/:id", element: OwnerProducts, roles: ["owner"] },
    { path: "/ownerproducts", element: OwnerProducts, roles: ["owner"] },
    { path: "/orderForm", element: OrderForm, roles: ["owner"] },
    { path: "/ordercenter", element: OrderCenter, roles: ["owner"] },
    { path: "/oauth-success", element: OAuthSuccess },

    // Client
    { path: "/clientorder", element: ClientOrder, roles: ["client"] },

    // Payment
    { path: "/payment/success", element: Payment, roles: ["client"] },
    { path: "/screenshot", element: Screenshot, roles: ["client"] },

    // Logged-in additional info
    { path: "/additionalInfo", element: AdditionalInfo },

    // Bakeries (available to all logged-in users)
    { path: "/bakeries", element: Bakeries },
  ],
};

export default routes;
