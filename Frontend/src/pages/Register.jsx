import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Phone, ChevronDown, Store, Aperture, Eye, EyeOff } from 'lucide-react'; 
import { FaGoogle } from "react-icons/fa";
import { useAuth } from '../context/AuthContext'; 
import RegisterImage from "../assets/Register.jpg";
import PrivacyModal from "../components/PrivacyModal";
import TermsModal from '../components/TermsModal';
import { useTheme } from '../store/themeStore';

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register } = useAuth(); 
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'customer',
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [termModal, setTermModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!formData.role) {
      // Use translation key for error
      toast.error(t("register.error.select_role"));
      setLoading(false);
      return;
    }

    try {
      const res = await register(formData); 
      toast.success(res?.message);
      navigate('/verify-otp'); 
    } catch (error) {
      // Use translation key for generic error
      toast.error(error.message || t("register.error.generic"));
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = (platform) => {
    const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
    const redirectMap = {
      Google: `${baseURL}/api/auth/google`,
      Facebook: `${baseURL}/api/auth/facebook`,
      Instagram: `${baseURL}/api/auth/instagram`,
    };

    const signupURL = redirectMap[platform];

    if (signupURL) {
      // Use translation key for loading toast
      toast.loading(t("login.toast.redirecting_google", { name: platform }), { duration: 1000 });
      window.location.href = signupURL;
    } else {
      toast.error("Unsupported platform selected.");
    }
  };

  const IconWrapper = ({ children }) => (
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-orange-500">
      {children}
    </div>
  );

  return (
    <div className={`flex min-h-screen font-sans ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
      
      {/* Left section with image */}
      <div 
        className={`hidden lg:flex flex-1 items-center justify-center p-8 bg-cover bg-center`}
        style={{ 
          backgroundImage: `url(${RegisterImage})`,
          boxShadow: isDark
            ? 'inset 0 0 0 2000px rgba(0,0,0,0.6)'
            : 'inset 0 0 0 2000px rgba(0,0,0,0.4)',
        }}
      >
        <div className="text-center z-10 p-4">
          <h1 className="text-5xl font-extrabold text-white tracking-wider">ABC</h1>
          <p className="text-2xl text-orange-300 mt-2 font-semibold">{t("register.hero.slogan")}</p>
        </div>
      </div>
      
      {/* Right registration form */}
      <div className={`flex-1 flex items-center justify-center p-6 sm:p-12 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className={`w-full max-w-lg p-8 sm:p-10 rounded-3xl shadow-xl ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
          
          <h2 className={`text-4xl font-extrabold text-center mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t("register.title")}</h2>
          <p className={`text-center mb-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t("register.subtitle")}</p>
          
          <form className="space-y-6" onSubmit={handleSubmit}>

            <div className="relative">
              <IconWrapper><User size={20} /></IconWrapper>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                // Use translation key for placeholder
                placeholder={t("register.full_name_placeholder")} 
                required 
                className={`w-full px-5 pl-10 py-3 rounded-xl border focus:ring-2 focus:ring-orange-500 transition shadow-sm 
                  ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'}`}
              />
            </div>

            <div className="relative">
              <IconWrapper><Mail size={20} /></IconWrapper>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                // Use translation key for placeholder
                placeholder={t("login.email_placeholder")} 
                required 
                className={`w-full px-5 pl-10 py-3 rounded-xl border focus:ring-2 focus:ring-orange-500 transition shadow-sm 
                  ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'}`}
              />
            </div>

            <div className="relative">
              <IconWrapper><Lock size={20} /></IconWrapper>
              <input 
                type={showPassword ? 'text' : 'password'} 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={t("login.password_placeholder_min")} 
                required 
                minLength={8}
                className={`w-full px-5 pl-10 py-3 rounded-xl border focus:ring-2 focus:ring-orange-500 transition shadow-sm 
                  ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'}`}
              />
              <div onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                {showPassword ? <EyeOff size={20} className='text-orange-500'/> : <Eye size={20} className='text-orange-500'/>}
              </div>
            </div>

            <div className="relative">
              <IconWrapper><Phone size={20} /></IconWrapper>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                // Use translation key for placeholder
                placeholder={t("register.phone_placeholder")} 
                required
                className={`w-full px-5 pl-10 py-3 rounded-xl border focus:ring-2 focus:ring-orange-500 transition shadow-sm 
                  ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'}`}
              />
            </div>

            <div className="relative">
              <IconWrapper>{formData.role === 'owner' ? <Store size={20} /> : <Aperture size={20} />}</IconWrapper>
              <select 
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={`w-full px-5 pl-10 py-3 rounded-xl appearance-none pr-10 border focus:ring-2 focus:ring-orange-500 transition shadow-sm 
                  ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
              >
                {/* Use translation keys for options */}
                <option value="customer">{t("register.role_prompt")}</option>
                <option value="owner">{t("register.role_owner")}</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <ChevronDown size={20} />
              </div>
            </div>

            {/* ✅ Privacy & Terms Checkbox */}
            <div className="flex items-center justify-center mt-2">
              <input
                id="terms"
                type="checkbox"
                checked={acceptedTerms}
                onChange={() => setAcceptedTerms(!acceptedTerms)}
                className="cp h-4 w-4 text-indigo-600 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className={`ml-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t("register.terms_part1")}{" "}
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="cp text-orange-600 hover:underline"
                >
                  {t("register.privacy_policy_btn")}
                </button>
                {t("register.terms_and_")}
                <button
                  type="button"
                  onClick={() => setTermModal(true)}
                  className="cp text-orange-600 hover:underline"
                >
                  {t("register.terms_btn")}
                </button>
              </label>
            </div>

            <button 
              type="submit" 
              className={` ${acceptedTerms ? 'cp' : 'cursor-not-allowed'} w-full py-3 rounded-xl bg-orange-600 text-white text-lg font-bold transition-all shadow-lg hover:bg-orange-700 hover:shadow-xl disabled:opacity-50 mt-8`}
              disabled={loading || !acceptedTerms}
            >
              {/* Use translation key for button text */}
              {loading ? t("register.button.processing") : t("register.button.register")}
            </button>
          </form>
          
          {formData.role === 'owner' && <div className="flex justify-center space-x-6 my-6">
            <button onClick={() => handleSocialSignup('Google')} className={`w-full flex items-center justify-center space-x-3 py-3 rounded-xl border transition
              ${isDark ? 'border-gray-600 text-white hover:bg-orange-600 hover:text-white' : 'border-gray-300 text-gray-800 hover:bg-orange-600 hover:text-white'}`}>
              <FaGoogle className={`${isDark ? 'text-white' : 'text-black'} hover:text-white`} size={20} />
              <span className="font-medium">{t("register.google_sign_up_btn")}</span>
            </button>
          </div>}

          <div className={`flex items-center my-6 ${isDark ? 'text-gray-400' : ''}`}>
            <div className="flex-grow border-t" />
            <span className={`flex-shrink mx-4 text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {t("register.or_separator")}
            </span>
            <div className="flex-grow border-t" />
          </div>

          <div className={`text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t("register.have_account_prompt")}<Link to="/login" className="text-orange-600 font-bold hover:underline">{t("register.sign_in_here")}</Link>
          </div>
        </div>
      </div>

      <PrivacyModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
      <TermsModal 
        isOpen={termModal}
        onClose={() => setTermModal(false)}
      />
    </div>
  );
};

export default Register;