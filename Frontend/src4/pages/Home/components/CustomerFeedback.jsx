import React from 'react';
import { Star } from 'lucide-react';
import { useTheme } from '../../../store/themeStore';

const feedbackData = [
  { id: 1, name: "Helen K.", rating: 5, comment: "The Red Velvet was divine! Ordering was seamless and the pickup was quick. ABC is my new go-to for cakes. It was perfect for my daughter's birthday celebration." },
  { id: 2, name: "Samson A.", rating: 4, comment: "Great variety of bakeries. The bread is always fresh. I wish there were more filtering options, but overall excellent service and very user-friendly." },
  { id: 3, name: "Fikir T.", rating: 5, comment: "I placed a special order for a wedding cake, and it exceeded all expectations. Beautiful design and perfect taste! Highly recommend ABC." },
  { id: 4, name: "Michael B.", rating: 5, comment: "As a bakery owner, the management system is fantastic. Real-time notifications and integrated payment make everything so much smoother. A truly professional solution." },
  { id: 5, name: "Lulit G.", rating: 4, comment: "Very fast response time from the bakery owner after placing my custom order. The system handles the pre-payment smoothly. Four stars only because I'd like more pictures of the products." },
  { id: 6, name: "Jemal H.", rating: 5, comment: "Best platform for custom cakes in Adama. No more unreliable phone calls! The tracking feature is super helpful." },
  { id: 7, name: "Sara W.", rating: 3, comment: "The cake was delicious, but the website felt a little slow on my older phone. Hoping for speed improvements, but the food quality is undeniable." },
];

const CustomerFeedback = () => {
  const { isDark } = useTheme();

  const StarRating = ({ count }) => (
    <div className="flex space-x-0.5 mb-3">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          size={18} 
          fill={i < count ? '#f59e0b' : '#9ca3af'} 
          strokeWidth={1.5}
        />
      ))}
    </div>
  );

  return (
    <section className={`py-16 px-4 sm:px-8 lg:px-16 font-sans ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      <h2 className={`text-4xl font-extrabold text-center mb-12 ${isDark ? "text-white" : "text-gray-900"}`}>
        What Our <span className="text-orange-600">Customers Say</span>
      </h2>

      {/* Horizontal scroll */}
      <div className="flex space-x-6 max-w-7xl mx-auto overflow-x-auto scrollbar-hide pb-6">
        {feedbackData.map((feedback) => (
          <div 
            key={feedback.id} 
            className={`flex-shrink-0 w-[85vw] sm:w-[50vw] md:w-[320px] 
                        p-8 rounded-xl shadow-xl border-t-4 border-orange-600 
                        min-h-[280px] max-h-[320px] 
                        transform transition duration-300 hover:shadow-2xl hover:scale-[1.01] 
                        flex flex-col justify-between 
                        ${isDark ? "bg-gray-800 text-white border-orange-500" : "bg-white text-gray-900"}`}
          >
            {/* Comment */}
            <p className="italic mb-4 text-base overflow-hidden flex-grow">
              "{feedback.comment}"
            </p>

            {/* Rating & Name */}
            <div className={`pt-2 border-t ${isDark ? "border-gray-700" : "border-gray-100"}`}>
              <StarRating count={feedback.rating} />
              <p className="font-bold text-lg leading-none">- {feedback.name}</p>
              <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Verified ABC User</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerFeedback;