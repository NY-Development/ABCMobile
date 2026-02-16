import React, { useState } from 'react';

const OrderForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    name: '',
    address1: '',
    address2: '',
    city: '',
    zip: '',
    deliveryOption: '',
    orderDetail: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle order submission logic here
    console.log('Order Data:', formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center backdrop-blur-xs p-8">
      <div className="w-full max-w-lg rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-center mb-6 text-orange-500">Special Order Form</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email" 
              required 
              className="w-full px-5 py-4 rounded-xl border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700 placeholder-gray-400"
            />
          </div>
          <div>
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number" 
              required 
              className="w-full px-5 py-4 rounded-xl border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700 placeholder-gray-400"
            />
          </div>
          <div>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name" 
              required 
              className="w-full px-5 py-4 rounded-xl border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700 placeholder-gray-400"
            />
          </div>
          <div>
            <input 
              type="text" 
              name="address1"
              value={formData.address1}
              onChange={handleChange}
              placeholder="Address 1" 
              required 
              className="w-full px-5 py-4 rounded-xl border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700 placeholder-gray-400"
            />
          </div>
          <div>
            <input 
              type="text" 
              name="address2"
              value={formData.address2}
              onChange={handleChange}
              placeholder="Address 2" 
              className="w-full px-5 py-4 rounded-xl border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700 placeholder-gray-400"
            />
          </div>
          <div>
            <input 
              type="text" 
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City" 
              required 
              className="w-full px-5 py-4 rounded-xl border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700 placeholder-gray-400"
            />
          </div>
          <div>
            <input 
              type="text" 
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              placeholder="Zip Code" 
              required 
              className="w-full px-5 py-4 rounded-xl border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700 placeholder-gray-400"
            />
          </div>
          <div>
            <select 
              name="deliveryOption"
              value={formData.deliveryOption}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-xl border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700"
            >
              <option value="" disabled>Choose a delivery option</option>
              <option value="standard">Standard Delivery</option>
              <option value="express">Express Delivery</option>
            </select>
          </div>
          <div>
            <textarea 
              name="orderDetail"
              value={formData.orderDetail}
              onChange={handleChange}
              placeholder="Order Detail"
              required
              rows="4"
              className="w-full px-5 py-4 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700 placeholder-gray-400"
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-4 rounded-xl bg-orange-500 text-white text-lg font-bold transition-colors hover:bg-orange-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;