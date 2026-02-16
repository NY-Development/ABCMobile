import React, { useState } from 'react';
import { requestPasswordReset } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, Loader2 } from 'lucide-react';
import { useTheme } from '../../sharedStores/themeStore';
import { useTranslation } from 'react-i18next';

const ForgotPassword = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await requestPasswordReset({ email });
      if (response.success) {
        setMessage(t('passwordResetLinkSent')); // translation key
      } else {
        setMessage(t('passwordResetLinkFailed'));
      }
      navigate('/reset');
    } catch (error) {
      console.error('Request failed:', error);
      setMessage(t('requestFailed'));
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
          className={`flex items-center cp text-sm font-medium mb-6 transition-colors ${isDark ? 'text-gray-300 hover:text-orange-400' : 'text-gray-500 hover:text-orange-600'}`}
          aria-label={t('backToLogin')}
        >
          <ArrowLeft size={16} className="mr-1" />
          {t('backToLogin')}
        </button>

        <div className="text-center mb-8">
          <h2 className={`text-4xl font-extrabold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('forgotPassword')}</h2>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {t('enterEmailForReset')}
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <IconWrapper><Mail size={20} /></IconWrapper>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('emailPlaceholder')}
              required
              className={`w-full pl-12 pr-5 py-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 transition shadow-sm ${
                isDark 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
              }`}
            />
          </div>

          <button
            type="submit"
            className={`w-full py-4 flex items-center justify-center rounded-xl text-white text-lg font-bold transition-all duration-300 hover:shadow-xl ${
              loading 
              ? 'bg-orange-400 cursor-not-allowed' 
              : 'bg-orange-600 hover:bg-orange-700 shadow-lg'
            }`}
            disabled={loading}
          >
            {loading ? (
              <><Loader2 size={20} className="animate-spin mr-2" /> {t('sendingRequest')}...</>
            ) : t('sendResetLink')}
          </button>
        </form>

        {message && (
          <div className={`mt-6 p-4 rounded-xl text-center font-medium ${
            message.includes(t('passwordResetLinkSent'))
              ? `${isDark ? 'bg-green-800 text-green-200 border-green-600' : 'bg-green-100 text-green-700 border-green-300'} border`
              : `${isDark ? 'bg-red-800 text-red-200 border-red-600' : 'bg-red-100 text-red-700 border-red-300'} border`
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;