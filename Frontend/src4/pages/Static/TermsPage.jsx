import React from 'react';

// Terms and Conditions content customized for ABC Project (Adama Bakery & Cake)
const rawTermsContent = `
  <h1>TERMS AND CONDITIONS</h1>
  <p>Last updated: <span class="font-semibold text-gray-700">November 08, 2025</span></p>

  <p>These Terms and Conditions ("Terms") govern your use of the ABC Ordering and Loyalty App, including the website at <a href="https://adama-bakery.vercel.app" class="text-blue-600 hover:text-orange-600 transition-colors">https://adama-bakery.vercel.app</a> and the mobile application (collectively, the "Service"), provided by <span class="font-semibold text-orange-600">ABC Project (Adama Bakery and Cake)</span> ("we," "us," or "our").</p>

  <p class="mt-6 bg-orange-50 p-4 border-l-4 border-orange-500 text-gray-800">
    By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
  </p>

  <h2 id="table-of-contents">TABLE OF CONTENTS</h2>
  <ol class="list-decimal list-inside space-y-2 text-gray-700 p-4 bg-gray-50 rounded-lg shadow-inner border border-gray-200">
    <li><a href="#1-acceptance-of-terms" class="text-blue-600 hover:text-orange-600 transition-colors">ACCEPTANCE OF TERMS</a></li>
    <li><a href="#2-user-accounts-and-registration" class="text-blue-600 hover:text-orange-600 transition-colors">USER ACCOUNTS AND REGISTRATION</a></li>
    <li><a href="#3-online-ordering-and-payment" class="text-blue-600 hover:text-orange-600 transition-colors">ONLINE ORDERING AND PAYMENT</a></li>
    <li><a href="#4-cancellations-and-refunds" class="text-blue-600 hover:text-orange-600 transition-colors">CANCELLATIONS AND REFUNDS</a></li>
    <li><a href="#5-loyalty-program" class="text-blue-600 hover:text-orange-600 transition-colors">LOYALTY PROGRAM</a></li>
    <li><a href="#6-intellectual-property" class="text-blue-600 hover:text-orange-600 transition-colors">INTELLECTUAL PROPERTY</a></li>
    <li><a href="#7-termination" class="text-blue-600 hover:text-orange-600 transition-colors">TERMINATION</a></li>
    <li><a href="#8-disclaimer-of-warranties" class="text-blue-600 hover:text-orange-600 transition-colors">DISCLAIMER OF WARRANTIES</a></li>
    <li><a href="#9-limitation-of-liability" class="text-blue-600 hover:text-orange-600 transition-colors">LIMITATION OF LIABILITY</a></li>
    <li><a href="#10-governing-law" class="text-blue-600 hover:text-orange-600 transition-colors">GOVERNING LAW</a></li>
    <li><a href="#11-changes-to-terms" class="text-blue-600 hover:text-orange-600 transition-colors">CHANGES TO TERMS</a></li>
    <li><a href="#12-contact-us" class="text-blue-600 hover:text-orange-600 transition-colors">CONTACT US</a></li>
  </ol>

  <h2 id="1-acceptance-of-terms">1. ACCEPTANCE OF TERMS</h2>
  <p>By using the Service, you confirm that you are at least 18 years old or accessing the Service under the supervision of a parent or legal guardian. You agree that these Terms constitute a binding legal agreement between you and ABC Project (Adama Bakery and Cake).</p>

  <h2 id="2-user-accounts-and-registration">2. USER ACCOUNTS AND REGISTRATION</h2>
  <p>To access certain features, including placing orders and participating in the loyalty program, you must register for an account. You agree to:</p>
  <ul class="list-disc ml-6 space-y-1">
      <li>Provide accurate and complete registration information.</li>
      <li>Maintain the security and confidentiality of your password.</li>
      <li>Notify us immediately of any unauthorized use of your account.</li>
  </ul>
  <p>We reserve the right to suspend or terminate your account if any information provided during the registration process or thereafter proves to be inaccurate, false, or misleading.</p>

  <h2 id="3-online-ordering-and-payment">3. ONLINE ORDERING AND PAYMENT</h2>
  <h3>Order Acceptance</h3>
  <p>All orders placed through the Service are subject to acceptance by ABC Project. We reserve the right to refuse or cancel any order for any reason, including limitations on quantities available, product or pricing errors, or issues identified by our credit and fraud avoidance department.</p>

  <h3>Payment Processing</h3>
  <p>Payment for all orders must be processed through the accepted payment methods available on the Service (e.g., Chapa). By submitting an order, you authorize us or our third-party payment processor (Chapa) to charge the specified amount to your selected payment method.</p>

  <h2 id="4-cancellations-and-refunds">4. CANCELLATIONS AND REFUNDS</h2>
  <p>Due to the nature of custom bakery and food items:</p>
  <ul class="list-disc ml-6 space-y-1">
      <li>**Cancellations:** Orders may be cancelled within a short time window (typically 30 minutes) of placement, provided preparation has not yet begun. Custom or large orders may have stricter cancellation policies communicated at the time of order.</li>
      <li>**Refunds:** Refunds are issued at the sole discretion of ABC Project. If a product is significantly damaged or incorrect, you must notify us within 2 hours of receipt. No refunds will be provided for issues related to taste preference or items consumed.</li>
  </ul>

  <h2 id="5-loyalty-program">5. LOYALTY PROGRAM</h2>
  <p>Participation in the ABC Loyalty Program is subject to the following:</p>
  <ul class="list-disc ml-6 space-y-1">
      <li>Loyalty points are earned only on qualifying purchases made through the Service.</li>
      <li>Points have no monetary value and cannot be redeemed for cash.</li>
      <li>We reserve the right to modify, suspend, or terminate the Loyalty Program or any user's membership therein at any time, with or without notice.</li>
  </ul>

  <h2 id="6-intellectual-property">6. INTELLECTUAL PROPERTY</h2>
  <p>The Service and its original content, features, and functionality (including but not limited to all designs, text, graphics, user interfaces, and software) are and will remain the exclusive property of ABC Project (Adama Bakery and Cake) and its licensors. You may not use our intellectual property without our prior written consent.</p>

  <h2 id="7-termination">7. TERMINATION</h2>
  <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.</p>

  <h2 id="8-disclaimer-of-warranties">8. DISCLAIMER OF WARRANTIES</h2>
  <p>The Service is provided on an "AS IS" and "AS AVAILABLE" basis. Your use of the Service is at your sole risk. We expressly disclaim all warranties of any kind, whether express or implied, including, but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>

  <h2 id="9-limitation-of-liability">9. LIMITATION OF LIABILITY</h2>
  <p class="font-extrabold text-lg text-red-700 bg-red-100 p-4 rounded-md">IN NO EVENT SHALL ABC PROJECT, NOR ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES, BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE.</p>

  <h2 id="10-governing-law">10. GOVERNING LAW</h2>
  <p>These Terms shall be governed and construed in accordance with the laws of **Ethiopia**, without regard to its conflict of law provisions.</p>

  <h2 id="11-changes-to-terms">11. CHANGES TO TERMS</h2>
  <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.</p>

  <h2 id="12-contact-us">12. CONTACT US</h2>
  <p>If you have any questions about these Terms, please contact us:</p>
  <ul class="list-disc ml-6 space-y-1">
      <li>By email: <a href="mailto:yamlaknegash96@gmail.com" class="text-blue-600 hover:underline">yamlaknegash96@gmail.com</a></li>
      <li>By post: ABC Project (Adama Bakery & Cake), P.O. Box 456, Adama, Oromia, Ethiopia</li>
  </ul>
`;

const TermsPage = () => {
  return (
    <div className="bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-4xl mx-auto shadow-xl rounded-2xl p-8 lg:p-12 bg-gray-50 border border-gray-100">
        <div
          // Apply Tailwind Typography (prose) and custom styles
          className="prose prose-lg max-w-none terms-content-styles"
          dangerouslySetInnerHTML={{ __html: rawTermsContent }}
        />
      </div>
      {/* Custom styles for consistent look and smooth scrolling */}
      <style jsx="true">{`
        html {
            scroll-behavior: smooth;
        }

        .terms-content-styles h1 {
          font-size: 3rem;
          font-weight: 800;
          color: #1f2937;
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 4px solid #f97316; /* Orange-600 border */
          line-height: 1.2;
        }

        .terms-content-styles h2 {
          font-size: 1.875rem; /* 3xl */
          font-weight: 700;
          color: #ea580c; /* Orange-700 */
          margin-top: 3rem;
          margin-bottom: 1rem;
          padding-top: 1.5rem; /* Anchor link target offset */
        }

        .terms-content-styles h3 {
            font-size: 1.5rem; /* 2xl */
            font-weight: 600;
            color: #4b5563; /* Gray-600 */
            margin-top: 2rem;
            margin-bottom: 0.75rem;
        }

        .terms-content-styles p {
          line-height: 1.75;
          margin-bottom: 1rem;
          color: #4b5563;
        }

        .terms-content-styles ol, .terms-content-styles ul {
          margin-top: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .terms-content-styles li {
          margin-bottom: 0.5rem;
        }

        /* Style for anchor links within the table of contents */
        .terms-content-styles ol a {
            font-weight: 600;
            text-decoration: none;
        }

        .terms-content-styles ol a:hover {
            text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default TermsPage;