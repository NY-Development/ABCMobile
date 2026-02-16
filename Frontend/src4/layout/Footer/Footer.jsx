import React, { useEffect } from "react";
import { FaInstagram, FaTelegram, FaYoutube, FaFacebookF } from "react-icons/fa";
import { Phone, MapPin, Mail } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "../store/themeStore";

const Footer = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const { isDark } = useTheme(); // Use theme

    useEffect(() => {
        if (location.pathname) {
            window.scrollTo(0, 0);
        }
    }, [location.pathname]);

    // Helper component for styled social icons
    const SocialIcon = ({ Icon, href, label }) => (
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label={label}
            className={`
                flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 shadow-lg transform hover:scale-110
                ${isDark 
                  ? "bg-gray-700 text-gray-300 hover:bg-orange-600 hover:text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-orange-500 hover:text-white"}
            `}
        >
            <Icon size={20} />
        </a>
    );

    // Helper component for styled contact links
    const ContactLink = ({ Icon, text, href }) => (
        <a 
            href={href} 
            className={`
                flex items-center transition-colors duration-300 group
                ${isDark 
                  ? "text-gray-300 hover:text-orange-400" 
                  : "text-white hover:text-orange-600"}
            `}
        >
            <Icon size={20} className={`mr-3 ${isDark ? "text-orange-500 group-hover:text-orange-400" : "text-orange-500 group-hover:text-orange-600"} transition-colors`} />
            <span className="text-sm md:text-base">{text}</span>
        </a>
    );

    return (
        <footer className={`${isDark ? "border-t-2 border-white bg-gray-900 text-gray-300" : "bg-gradient-to-l from-orange-500 to-gray-900 bg-orange-400 text-white"} py-12 font-sans`}>
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                
                {/* Main Grid Layout */}
                <div className={`grid grid-cols-1 md:grid-cols-3 gap-12 pb-10 border-b ${isDark ? "border-white/30" : "border-gray-300"}`}>
                    
                    {/* Column 1: Branding & Quick Links */}
                    <div className="space-y-6">
                        <Link to='/' className={`text-4xl font-extrabold tracking-wider ${isDark ? "text-orange-500" : "text-white"}`}>
                            {t('footer.brand')}
                        </Link>
                        <p className={isDark ? "text-gray-300 max-w-xs" : "text-gray-100 max-w-xs"}>
                            {t('footer.description')}
                        </p>
                        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                            <Link to="/about" className={isDark ? "hover:text-orange-400" : "hover:text-orange-500"}>{t('footer.links.about')}</Link>
                            <Link to="/contact" className={isDark ? "hover:text-orange-400" : "hover:text-orange-500"}>{t('footer.links.contact')}</Link>
                            <Link to="/privacy" className={isDark ? "hover:text-orange-400" : "hover:text-orange-500"}>{t('footer.links.privacy')}</Link>
                            <Link to="/terms" className={isDark ? "hover:text-orange-400" : "hover:text-orange-500"}>{t('footer.links.terms')}</Link>
                            <Link to="/EULA" className={isDark ? "hover:text-orange-400" : "hover:text-orange-500"}>{t('footer.links.eula')}</Link>
                        </nav>
                    </div>

                    {/* Column 2: Contact Information */}
                    <div className="space-y-4">
                        <h3 className={`text-xl font-bold mb-4 pb-2 w-fit border-b ${isDark ? "text-white border-white/50" : "text-white border-orange-500/50"}`}>
                            {t('footer.contact.title')}
                        </h3>
                        <ContactLink 
                            Icon={MapPin} 
                            text={t('footer.contact.address')}  
                            href="https://maps.app.goo.gl/your-map-link-placeholder" 
                        />
                        <ContactLink 
                            Icon={Phone} 
                            text={t('footer.contact.phone')}
                            href="tel:+251973626204" 
                        />
                        <ContactLink 
                            Icon={Mail} 
                            text={t('footer.contact.email')} 
                            href="mailto:nydevofficial@gmail.com" 
                        />
                    </div>
                    
                    {/* Column 3: Social Media Links */}
                    <div className="space-y-4">
                        <h3 className={`text-xl font-bold mb-4 pb-2 w-fit border-b ${isDark ? "text-white border-white/50" : "text-white border-orange-500/50"}`}>
                            {t('footer.social.title')}
                        </h3>
                        <p className={isDark ? "text-gray-300" : "text-white"}>Follow our sweet journey on social media.</p>
                        <div className="flex space-x-4 pt-2">
                            <SocialIcon 
                                Icon={FaInstagram} 
                                href="https://www.instagram.com/nydevofficial" 
                                label="Instagram"
                            />
                            <SocialIcon 
                                Icon={FaTelegram} 
                                href="https://t.me/NYDev_Chat" 
                                label="Telegram"
                            />
                            <SocialIcon 
                                Icon={FaYoutube} 
                                href="https://www.youtube.com/@NYDev-t6p" 
                                label="YouTube"
                            />
                            <SocialIcon 
                                Icon={FaFacebookF} 
                                href="https://www.facebook.com/share/1BpyASHwr3/" 
                                label="Facebook"
                            />
                        </div>
                    </div>
                </div>
                
                {/* Copyright Bar */}
                <div className="mt-8 pt-4">
                    <p className={isDark ? "text-center text-sm text-gray-400" : "text-center text-sm text-white"}>
                        &copy; {new Date().getFullYear()} {t('footer.copyright')}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;