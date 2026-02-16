import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "../data/dummyData";

const CustomerFeedback = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="bg-black text-white py-12 text-center relative">
      <h2 className="text-2xl font-bold">
        Our Customers <span className="text-orange-500">Feedback</span>
      </h2>

      {/* Feedback Text */}
      <div className="mt-6 max-w-2xl mx-auto px-6">
        <p className="italic text-lg">{testimonials[current].text}</p>
        <p className="mt-4 font-semibold text-orange-400">
          {testimonials[current].author}
        </p>
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="cp absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="cp absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === current ? "bg-orange-500" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default CustomerFeedback;