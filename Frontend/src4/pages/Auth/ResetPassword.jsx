import React, { useState } from 'react';
import { resetPassword } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import { Mail, Key, ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';
import { useTheme } from '../../sharedStores/themeStore';
import { useTranslation } from 'react-i18next';
import { Trans } from "react-i18next";

const ResetPassword = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage(t("reset_password.error.passwords_do_not_match"));
      return;
    }

    if (newPassword.length < 8) {
      setMessage(t("reset_password.error.short_password"));
      return;
    }

    setLoading(true);
    try {
      const response = await resetPassword({ email, otp, newPassword });

      if (response.message) {
        setMessage(t("reset_password.success.message"));
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setMessage(t("reset_password.error.reset_failed"));
      }
    } catch (error) {
      console.error('Reset failed:', error);
      setMessage(t("reset_password.error.generic"));
    } finally {
      setLoading(false);
    }
  };

  const IconWrapper = ({ children }) => (
    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-orange-500">
      {children}
    </div>
  );

  return (
    <div className={`flex min-h-screen items-center justify-center p-4 sm:p-8 font-sans ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className={`w-full max-w-md rounded-2xl shadow-xl border p-8 sm:p-10 transition-all duration-300 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>

        <button
          onClick={() => navigate('/login')}
          className={`cp flex items-center text-sm font-medium mb-6 transition-colors ${isDark ? 'text-gray-300 hover:text-orange-400' : 'text-gray-500 hover:text-orange-600'}`}
          aria-label="Back to Login"
        >
          <ArrowLeft size={16} className="mr-1" />
          {t("reset_password.back_to_login")}
        </button>

        <div className="text-center mb-8">
          <h2 className={`text-4xl font-extrabold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t("reset_password.title")}</h2>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            <Trans i18nKey="reset_password.instructions" />
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <IconWrapper><Mail size={20} /></IconWrapper>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("reset_password.email_placeholder")} // Using translation
              required
              className={`w-full pl-12 pr-5 py-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 transition shadow-sm ${
                isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
              }`}
            />
          </div>

          <div className="relative">
            <IconWrapper><Key size={20} /></IconWrapper>
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder={t("reset_password.otp_placeholder")} // Using translation
              required
              className={`w-full pl-12 pr-5 py-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 transition shadow-sm ${
                isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
              }`}
            />
          </div>

          <div className="relative">
            <IconWrapper><ShieldCheck size={20} /></IconWrapper>
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder={t("reset_password.new_password_placeholder")} // Using translation
              required
              className={`w-full pl-12 pr-5 py-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 transition shadow-sm ${
                isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
              }`}
            />
          </div>

          <div className="relative">
            <IconWrapper><ShieldCheck size={20} /></IconWrapper>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={t("reset_password.confirm_password_placeholder")} // Using translation
              required
              className={`w-full pl-12 pr-5 py-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 transition shadow-sm ${
                isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
              }`}
            />
          </div>

          <button
            type="submit"
            className={`cp w-full py-4 flex items-center justify-center rounded-xl text-white text-lg font-bold transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-300 ${
              loading ? 'bg-orange-400 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700 shadow-lg'
            }`}
            disabled={loading}
          >
            {loading ? (
              <><Loader2 size={20} className="animate-spin mr-2" /> {t("reset_password.resetting")}</>
            ) : (
              t("reset_password.submit_button")
            )}
          </button>
        </form>

        {message && (
          <div
            className={`mt-6 p-4 rounded-xl text-center font-medium border ${
              message.includes('successfully')
                ? `${isDark ? 'bg-green-800 text-green-200 border-green-600' : 'bg-green-100 text-green-700 border-green-300'}`
                : `${isDark ? 'bg-red-800 text-red-200 border-red-600' : 'bg-red-100 text-red-700 border-red-300'}`
            }`}
            role="status"
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;