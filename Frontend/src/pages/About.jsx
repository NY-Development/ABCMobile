import React, { useState, useEffect } from 'react';
import { Utensils, Zap, MapPin, DollarSign, Users, Shield, Lightbulb, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import p1 from "../assets/product1.png";
import p2 from "../assets/product2.png";
import p3 from "../assets/product3.png";
import p4 from "../assets/product4.png";
import p5 from "../assets/product5.png";
import HomeImage from "../assets/home.png"
import { useTranslation } from "react-i18next";
const heroImages = [HomeImage, p1, p2, p3, p4, p5];

const About = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Rotate hero images every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000); // 3 seconds
        return () => clearInterval(interval);
    }, []);
    
    const imageShiftPercentage = 100 / heroImages.length;
    const { t } = useTranslation();

  const features = [
    { 
      icon: Utensils, 
      titleKey: "about.features.local_excellence.title", 
      descriptionKey: "about.features.local_excellence.description" 
    },
    { 
      icon: Zap, 
      titleKey: "about.features.real_time.title", 
      descriptionKey: "about.features.real_time.description" 
    },
    { 
      icon: DollarSign, 
      titleKey: "about.features.secure_payments.title", 
      descriptionKey: "about.features.secure_payments.description" 
    },
    { 
      icon: Users, 
      titleKey: "about.features.role_access.title", 
      descriptionKey: "about.features.role_access.description"
    },
    { 
      icon: MapPin, 
      titleKey: "about.features.easy_pickup.title", 
      descriptionKey: "about.features.easy_pickup.description" 
    },
    { 
      icon: Shield, 
      titleKey: "about.features.quality_vetted.title", 
      descriptionKey: "about.features.quality_vetted.description" 
    },
  ];

    return (
        <div className="font-sans min-h-screen bg-gray-50 antialiased">
            <section className="bg-gray-900 text-white py-20 px-4 sm:px-8 lg:px-16 text-center shadow-2xl">
                <h1 className="text-4xl md:text-7xl font-extrabold mb-4 tracking-tighter">
                    {t("about.hero.title_part1")}<span className="text-orange-500">Adama Bakery & Cake (ABC)</span>
                </h1>
                <p className="text-xl max-w-4xl mx-auto opacity-80 mt-4">
                    {t("about.hero.description")}
                </p>
            </section>
          <section className="py-16 px-4 sm:px-8 lg:px-16 bg-white">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    <div className="order-2 md:order-1">
                      <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-orange-500 pb-2">{t("about.mission.title")}</h2>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        {t("about.mission.description_part1")} <span className='font-bold'>ABC</span> {t("about.mission.description_part2")}
                      </p>
                      <p className="text-gray-600 text-lg leading-relaxed mt-4 italic">
                        {t("about.mission.quote")}
                      </p>
                    </div>

                    <div className="order-1 md:order-2 rounded-[55px] overflow-hidden shadow-2xl">
                      <img 
                        src={HomeImage} 
                        alt={t("about.mission.image_alt")} 
                        className="w-full h-auto object-cover rounded-3xl" 
                      />
                    </div>
                  </div>
                    <div className="rounded-[40px] overflow-hidden mt-8 md:mt-0 shadow-2xl shadow-gray-400/50 relative h-[350px] md:h-[450px] w-full border-8 border-white order-1 md:order-2">
                        <div
                            className="flex h-full transition-transform duration-700 ease-in-out"
                            style={{
                                transform: `translateX(-${currentImageIndex * imageShiftPercentage}%)`,
                                width: `${heroImages.length * 100}%`,
                            }}
                        >
                            {heroImages.map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    alt={`Adama Bakery Product ${i + 1}`}
                                    style={{ width: `${imageShiftPercentage}%` }}
                                    className="h-full object-cover flex-shrink-0"
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x600/FDBA74/4B5563?text=ABC+Vision"; }}
                                />
                            ))}
                        </div>
                    </div>
            </section>
            
            <section className="py-20 px-4 sm:px-8 lg:px-16 bg-gray-100">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-16 border-b border-orange-200 pb-3">
                        {t("about.features.title")}
                    </h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div 
                                key={index} 
                                className="bg-white p-8 rounded-2xl shadow-xl border-b-8 border-orange-600 transform transition duration-500 hover:scale-[1.05] hover:shadow-2xl hover:shadow-orange-200/50"
                            >
                                <div className="p-3 bg-orange-100 rounded-full w-fit mb-4">
                                    <feature.icon size={30} className="text-orange-600" strokeWidth={2.5} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{t(feature.titleKey)}</h3>
                                <p className="text-gray-600 leading-relaxed">{t(feature.descriptionKey)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-orange-500 py-16 px-4 sm:px-8 lg:px-16 text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                    {t("about.cta.title")}
                </h2>
                <p className="text-orange-100 text-lg mb-8 max-w-3xl mx-auto">
                    {t("about.cta.description")}
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <Link 
                        to="/register" 
                        className="inline-block px-10 py-3 text-orange-600 font-bold rounded-full bg-white hover:bg-gray-100 transition duration-300 shadow-xl transform hover:scale-110"
                    >
                        {t("about.cta.signup_btn")}
                    </Link>
                    <Link 
                        to="/contact" 
                        className="inline-block px-10 py-3 text-white bg-gray-900 font-bold rounded-full border-2 border-white hover:text-gray-900 hover:scale-110 transition duration-300 transform"
                    >
                       {t("about.cta.contact_btn")}
                    </Link>
                </div>
            </section>

        </div>
    );
};

export default About;