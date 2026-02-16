import React, { useState } from 'react';
import { Mail, Phone, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../store/themeStore'; // Assuming you have a theme store

// Data for the FAQ section (using keys now)
const faqData = [
  { id: 1, question: 'faq.1.question', answer: 'faq.1.answer', category: 'faq.1.category' },
  { id: 2, question: 'faq.2.question', answer: 'faq.2.answer', category: 'faq.2.category' },
  { id: 3, question: 'faq.3.question', answer: 'faq.3.answer', category: 'faq.3.category' },
  { id: 4, question: 'faq.4.question', answer: 'faq.4.answer', category: 'faq.4.category' }
];

const Contact = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact Data Submitted:', formData);
    toast.success(t('contact.form.success'));
    setFormData({ name: '', email: '', message: '' });
  };

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className={`min-h-screen font-sans pt-16 pb-12 px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* Page Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className={`text-5xl font-extrabold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('contact.title')}</h1>
        <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{t('contact.subtitle')}</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Contact Form Section */}
        <div className={`p-8 sm:p-10 rounded-2xl shadow-2xl border-t-4 border-orange-600 ${isDark ? 'bg-gray-800 text-white' : 'bg-white'}`}>
          <h2 className={`text-3xl font-bold mb-6 border-b pb-3 ${isDark ? 'text-white border-gray-700' : 'text-gray-800 border-gray-100'}`}>{t('contact.form.title')}</h2>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('contact.form.name_placeholder')} 
                required 
                className={`w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 transition 
                  ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-700 placeholder-gray-500'}`}
              />
            </div>
            
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('contact.form.email_placeholder')} 
                required 
                className={`w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 transition 
                  ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-700 placeholder-gray-500'}`}
              />
            </div>
            
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t('contact.form.message_placeholder')}
                required
                rows="5"
                className={`w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 transition resize-none
                  ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-700 placeholder-gray-500'}`}
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full py-3 rounded-xl bg-orange-600 text-white text-lg font-bold transition-colors shadow-md hover:bg-orange-700"
            >
              {t('contact.form.submit_btn')}
            </button>
          </form>

          {/* Contact Info */}
          <div className="mt-8 pt-6 border-t space-y-3" style={{ borderColor: isDark ? '#374151' : '#f3f4f6' }}>
            <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>{t('contact.direct.title')}</h3>
            <div className="flex items-center space-x-3" style={{ color: isDark ? '#d1d5db' : '#4b5563' }}>
              <Phone size={20} className="text-orange-600" />
              <span>{t('contact.direct.phone')}</span>
            </div>
            <div className="flex items-center space-x-3" style={{ color: isDark ? '#d1d5db' : '#4b5563' }}>
              <Mail size={20} className="text-orange-600" />
              <span>{t('contact.direct.email')}</span>
            </div>
            <div className="flex items-center space-x-3" style={{ color: isDark ? '#d1d5db' : '#4b5563' }}>
              <MapPin size={20} className="text-orange-600" />
              <span>{t('contact.direct.address')}</span>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="space-y-6">
          <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>{t('contact.faq.title')}</h2>
          
          <div className="space-y-4">
            {faqData.map((item) => (
              <div key={item.id} className={`rounded-xl overflow-hidden shadow-lg ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                <button
                  className={`w-full flex justify-between items-center p-5 text-left font-semibold hover:transition-colors duration-150 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                  onClick={() => toggleFaq(item.id)}
                >
                  <span>{t(item.question)}</span>
                  {openFaq === item.id ? (
                    <ChevronUp size={20} className="text-orange-600" />
                  ) : (
                    <ChevronDown size={20} className="text-orange-600" />
                  )}
                </button>
                
                {openFaq === item.id && (
                  <div className={`p-5 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{item.answer}</p>
                    <span className="mt-2 inline-block text-sm font-medium text-orange-600 px-3 py-1 bg-orange-50 rounded-full">{item.category}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
