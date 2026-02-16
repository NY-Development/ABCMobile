import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CakeCard from "../components/CakeCard";
import CustomerFeedback from "../components/CustomerFeedback";
import { Link } from "react-router-dom";
import HomeImage from "../assets/home.png"; 
import SpecialImage from "../assets/product5.png";
import p1 from "../assets/product1.png";
import p2 from "../assets/product2.png";
import p3 from "../assets/product3.png";
import p4 from "../assets/product4.png";
import p5 from "../assets/product5.png";
import { useAuth } from "../context/AuthContext";
import { Cake, Sparkles, ShoppingBag } from "lucide-react";
import { useTheme } from "../store/themeStore";
import { Trans } from "react-i18next";

// Mock data for the products section now uses translation keys
const products = [
  {
    id: 1,
    titleKey: "product.title.chocolate",
    descriptionKey: "product.desc.chocolate",
    img: p1,
  },
  {
    id: 2,
    titleKey: "product.title.vanilla",
    descriptionKey: "product.desc.vanilla",
    img: p2,
  },
  {
    id: 3,
    titleKey: "product.title.red_velvet",
    descriptionKey: "product.desc.red_velvet",
    img: p3,
  },
  {
    id: 4,
    titleKey: "product.title.fruit",
    descriptionKey: "product.desc.fruit",
    img: p4,
  },
  {
    id: 5,
    titleKey: "product.title.cheesecake",
    descriptionKey: "product.desc.cheesecake",
    img: p5,
  },
];

// Images for rotating hero banner
const heroImages = [HomeImage, p1, p2, p3, p4, p5];

const Home = () => {
    const { user } = useAuth();
    const { t } = useTranslation();
    const { isDark } = useTheme();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Rotate hero images every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const imageShiftPercentage = 100 / heroImages.length;

    return (
        <div className={`font-sans min-h-screen antialiased ${isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
            
            {/* Hero Section */}
            <section className={`relative px-4 sm:px-8 lg:px-16 py-16 md:py-24 overflow-hidden ${isDark ? "bg-gray-800" : "bg-white"}`}>
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
                    
                    {/* Text Content */}
                    <div className="md:w-1/2 md:pr-12">
                        <h1 className={`text-4xl md:text-6xl font-extrabold leading-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                            <Trans i18nKey="home.hero.title_part1" components={{ span: <span className="text-orange-600" /> }}/>{" "}
                            <Trans i18nKey="home.hero.title_part2" components={{ span: <span className="text-orange-600" /> }} />
                        </h1>
                        <p className={`my-6 text-lg ${isDark ? "text-gray-300" : "text-gray-600"} max-w-lg`}>
                            {t("home.hero.description")}
                        </p>
                        <Link
                            to="/about"
                            state={{ from: "/home" }}
                            className="inline-flex items-center gap-2 px-8 py-3 mt-4 text-white font-semibold rounded-full bg-orange-600 hover:bg-orange-700 transition duration-300 shadow-xl shadow-orange-300 transform hover:scale-[1.03]"
                        >
                            <Sparkles size={20} /> {t("home.hero.discover_btn")}
                        </Link>
                    </div>

                    {/* Hero Image Carousel */}
                    <div className="md:w-1/2 mt-12 md:mt-0 relative">
                        <div className="rounded-[40px] overflow-hidden shadow-2xl shadow-gray-400/50 h-[300px] sm:h-[400px] md:h-[480px] w-full border-8 border-white">
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
                                        alt={`Hero Slide ${i + 1}`}
                                        style={{ width: `${imageShiftPercentage}%` }}
                                        className="h-full object-cover flex-shrink-0"
                                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x600/FFDAB9/333?text=Placeholder+Image"; }}
                                    />
                                ))}
                            </div>
                        </div>
                        {/* Carousel Dots */}
                        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
                            {heroImages.map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                        currentImageIndex === i ? "bg-orange-600 w-4 h-4 shadow-md" : "bg-white/70"
                                    }`}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Section (Horizontal Scroll) */}
            <section className={`py-16 px-4 sm:px-8 lg:px-16 ${isDark ? "bg-gray-900" : "bg-orange-50"}`}>
                <div className="max-w-7xl mx-auto">
                    <h2 className={`text-4xl font-extrabold text-center mb-12 flex items-center justify-center gap-3 ${isDark ? "text-white" : "text-gray-800"}`}>
                        <Cake size={32} className="text-orange-600" />
                        <span className="text-orange-600">{t("home.products.title_part1")}</span>{" "} {t("home.products.title_part2")}
                    </h2>

                    {/* Scrollable Container */}
                    <div className="flex space-x-6 overflow-x-auto snap-x snap-mandatory pb-6 px-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:bg-orange-300 [&::-webkit-scrollbar-track]:bg-orange-100 [&::-webkit-scrollbar-thumb]:rounded-full">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="snap-center flex-shrink-0 w-[80vw] sm:w-[50vw] md:w-[350px]"
                            >
                                <CakeCard
                                    title={t(product.titleKey)}
                                    description={t(product.descriptionKey)}
                                    urlLink={`/ownerproducts/${user?.uid || 'guest'}`} 
                                    imageUrl={product.img}
                                    user={user}
                                    isDark={isDark} // pass theme to CakeCard if needed
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-12">
                        <Link
                            to={user ? "/bakeries" : "/login"}
                            state={{ from: "/home" }}
                            className="inline-block px-10 py-3 text-orange-600 font-semibold border-2 border-orange-600 rounded-full hover:bg-orange-600 hover:text-white transition duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                        >
                            {t("home.products.all_bakeries_btn")}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Special Orders Section */}
            <section className={`px-4 sm:px-8 lg:px-16 py-16 md:py-24 border-t ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 order-1 md:order-1 mb-8 md:mb-0">
                        <img
                            src={SpecialImage}
                            alt="Special Cake"
                            className="rounded-3xl shadow-2xl shadow-pink-300/50 w-full max-w-sm h-auto object-cover mx-auto ring-8 ring-pink-50 ring-offset-4 transform rotate-2 hover:rotate-0 transition duration-500"
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x400/FFC0CB/333?text=Custom+Cake"; }}
                        />
                    </div>
                    <div className="md:w-1/2 md:pl-12 order-2 md:order-2">
                        <h2 className={`text-4xl font-extrabold ${isDark ? "text-white" : "text-gray-800"}`}>
                            <span className="text-orange-600">{t("home.special_order.title_part1")}</span>{" "} {t("home.special_order.title_part2")}
                        </h2>
                        <p className={`my-6 text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                            {t("home.special_order.description")}
                        </p>
                        <Link
                            to={user ? "/order" : "/login"}
                            state={{ from: "/home" }}
                            className="inline-flex items-center gap-2 px-8 py-3 mt-4 text-white font-semibold rounded-full bg-orange-600 hover:bg-orange-700 transition duration-300 shadow-xl shadow-orange-300 transform hover:scale-[1.03]"
                        >
                            <ShoppingBag size={20} /> {t("home.special_order.order_btn")}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Customer Feedback Section */}
            <CustomerFeedback isDark={isDark} />
        </div>
    );
};

export default Home;
