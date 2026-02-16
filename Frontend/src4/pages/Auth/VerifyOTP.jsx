import React, { useState } from 'react';
import { verifyUserOtp, resendUserOtp } from '../../services/auth'; 
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Mail, Key } from 'lucide-react';
import { useTheme } from '../../sharedStores/themeStore'; // Add theme
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';

const VerifyOTP = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resentLoading, setResendLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [resendMessage, setResendMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await verifyUserOtp({ email, otp });
      if (response) {
        setMessage(response.message);
        navigate('/login');
      } else {
        setMessage(response.message);
      }
    } catch (error) {
      console.error('Verification failed:', error);
      setMessage(t("verify_otp.error.generic"));
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendMessage('');
    setResendLoading(true);
    try {
      const response = await resendUserOtp({ email });
      if (response.success) {
        setResendMessage(t("verify_otp.success_message")); 
        toast.success(t("verify_otp.success_message")); 
      } else {
        setResendMessage(t("verify_otp.error.generic")); 
        toast.error(t("verify_otp.error.generic"));
      }
    } catch (error) {
      toast.error(t("verify_otp.error.generic"), error); 
      setResendMessage(t("verify_otp.error.generic")); 
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className={`flex min-h-screen items-center justify-center p-4 sm:p-8 ${isDark ? 'bg-gray-900 text-white' : ''}`}>
      <div className={`w-full max-w-md rounded-2xl shadow-2xl p-6 sm:p-10 border transition-all duration-300 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
        
        <h2 className={`text-4xl font-extrabold text-center mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>{t("verify_otp.title")}</h2>
        <p className={`text-center mb-8 ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
          <Trans i18nKey="verify_otp.message" />
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <Mail size={20} className={`absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("verify_otp.email_placeholder")}
              required
              className={`w-full pl-12 pr-5 py-4 rounded-xl border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow ${
                isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-700 placeholder-gray-500'
              }`}
            />
          </div>

          <div className="relative">
            <Key size={20} className={`absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder={t("verify_otp.otp_placeholder")}
              required
              className={`w-full pl-12 pr-5 py-4 rounded-xl border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow tracking-wider font-mono ${
                isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-700 placeholder-gray-500'
              }`}
            />
          </div>

          <button
            type="submit"
            className={`w-full py-4 rounded-xl text-white text-lg font-bold transition-all duration-300 transform ${
              loading ? 'bg-orange-400 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700 shadow-lg hover:shadow-xl'
            }`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t("verify_otp.verify_button")}
              </span>
            ) : t("verify_otp.verify_button")}
          </button>
        </form>

        {message && <div className={`mt-4 text-center text-sm font-medium p-3 rounded-lg border ${
          isDark 
          ? 'bg-green-800 text-green-200 border-green-600' 
          : 'bg-green-50 text-green-600 border-green-200'
        }`}>{message}</div>}

        <div className="mt-6 border-t pt-6" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
          <p className="text-center text-sm mb-3" style={{ color: isDark ? '#d1d5db' : '#6b7280' }}>{t("verify_otp.no_code_received")}</p>
          <button
            onClick={handleResendOtp}
            className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 transform ${
              resentLoading 
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
              : 'bg-indigo-500 text-white hover:bg-indigo-600 shadow-md shadow-indigo-200'
            }`}
            disabled={resentLoading}
          >
            {resentLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t("verify_otp.resend_button")}...
              </span>
            ) : t("verify_otp.resend_button")}
          </button>
        </div>

        {resendMessage && <div className={`mt-4 text-center text-sm font-medium p-3 rounded-lg border ${
          isDark 
          ? 'bg-red-800 text-red-200 border-red-600' 
          : 'bg-red-50 text-red-600 border-red-200'
        }`}>{resendMessage}</div>}
      </div>
    </div>
  );
};

export default VerifyOTP;