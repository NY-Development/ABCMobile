import React from 'react';

// EULA content customized for ABC Project (Adama Bakery and Cake)
const rawEULAContent = `
  <h1>End User License Agreement (EULA)</h1>
  <p>Last updated: <span class="font-semibold text-gray-700">November 8, 2025</span></p>

  <h2 id="licensing-agreement">Licensing Agreement</h2>
  <p>The "ABC Ordering and Loyalty App" (the "Licensed Application") is licensed to You (End-User) by <span class="font-semibold text-orange-600">ABC Project (Adama Bakery and Cake)</span> (the "Licensor"), located at <span class="font-medium">P.O. Box 456, Adama, Oromia, Ethiopia</span>, for use only under the terms of this License Agreement.</p>
  
  <p class="bg-red-50 p-4 border-l-4 border-red-500 text-gray-800 my-6">
    By downloading or using the Licensed Application, you indicate that You agree to be bound by all of the terms and conditions of this License Agreement. The platform through which this Application is purchased or downloaded is referred to in this License Agreement as "Services."
  </p>
  
  <h2 id="table-of-contents">TABLE OF CONTENTS</h2>
  <ol class="list-decimal list-inside space-y-2 text-gray-700 p-4 bg-gray-50 rounded-lg shadow-inner border border-gray-200">
    <li><a href="#1-the-application" class="text-blue-600 hover:text-orange-600 transition-colors">THE APPLICATION</a></li>
    <li><a href="#2-scope-of-license" class="text-blue-600 hover:text-orange-600 transition-colors">SCOPE OF LICENSE</a></li>
    <li><a href="#3-technical-requirements" class="text-blue-600 hover:text-orange-600 transition-colors">TECHNICAL REQUIREMENTS</a></li>
    <li><a href="#4-no-maintenance-or-support" class="text-blue-600 hover:text-orange-600 transition-colors">NO MAINTENANCE AND SUPPORT</a></li>
    <li><a href="#5-user-generated-contributions" class="text-blue-600 hover:text-orange-600 transition-colors">USER-GENERATED CONTRIBUTIONS</a></li>
    <li><a href="#6-contribution-license" class="text-blue-600 hover:text-orange-600 transition-colors">CONTRIBUTION LICENSE</a></li>
    <li><a href="#7-liability" class="text-blue-600 hover:text-orange-600 transition-colors">LIABILITY</a></li>
    <li><a href="#8-warranty" class="text-blue-600 hover:text-orange-600 transition-colors">WARRANTY</a></li>
    <li><a href="#9-product-claims" class="text-blue-600 hover:text-orange-600 transition-colors">PRODUCT CLAIMS</a></li>
    <li><a href="#10-legal-compliance" class="text-blue-600 hover:text-orange-600 transition-colors">LEGAL COMPLIANCE</a></li>
    <li><a href="#11-contact-information" class="text-blue-600 hover:text-orange-600 transition-colors">CONTACT INFORMATION</a></li>
    <li><a href="#12-termination" class="text-blue-600 hover:text-orange-600 transition-colors">TERMINATION</a></li>
    <li><a href="#13-third-party-terms" class="text-blue-600 hover:text-orange-600 transition-colors">THIRD-PARTY TERMS OF AGREEMENTS AND BENEFICIARY</a></li>
    <li><a href="#14-intellectual-property-rights" class="text-blue-600 hover:text-orange-600 transition-colors">INTELLECTUAL PROPERTY RIGHTS</a></li>
    <li><a href="#15-applicable-law" class="text-blue-600 hover:text-orange-600 transition-colors">APPLICABLE LAW</a></li>
    <li><a href="#16-miscellaneous" class="text-blue-600 hover:text-orange-600 transition-colors">MISCELLANEOUS</a></li>
  </ol>

  <h2 id="1-the-application">1. THE APPLICATION</h2>
  <p>The "ABC Ordering and Loyalty App" ("Licensed Application") is a piece of software created for ordering bakery and cake items — and customized for mobile devices ("Devices"). It is used for submitting and tracking orders.</p>

  <h2 id="2-scope-of-license">2. SCOPE OF LICENSE</h2>
  <p>The Licensor grants you a non-transferable license to use the Licensed Application on any devices that You own or control and as permitted by the Usage Rules set forth in this License Agreement. This license does not allow You to use the Licensed Application on any device that You do not own or control, and You may not distribute or make the Licensed Application available over a network where it could be used by multiple devices simultaneously.</p>

  <h2 id="3-technical-requirements">3. TECHNICAL REQUIREMENTS</h2>
  <p>To use the Licensed Application, you must have an active internet connection and a compatible operating system (iOS or Android) on your device. The Licensor is not responsible for any compatibility issues or data usage fees incurred by the End-User.</p>

  <h2 id="4-no-maintenance-or-support">4. NO MAINTENANCE OR SUPPORT</h2>
  <p>4.1 The Licensor is not obligated, expressed or implied, to provide any maintenance, technical or other support for the Licensed Application beyond what is typically expected for a standard commercial application.
  4.2 The Licensor and the End-User acknowledge that the Services have no obligation whatsoever to furnish any maintenance and support services with respect to the Licensed Application.</p>

  <h2 id="5-user-generated-contributions">5. USER-GENERATED CONTRIBUTIONS</h2>
  <p>The Licensed Application is primarily for ordering and loyalty use. While it does not offer users to freely submit or post public content, we may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us (such as reviews or customized cake requests) (collectively, "Contributions"). When you create or make available any Contributions, you represent and warrant that:</p>
  <ol>
      <li>The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights...</li>
      <li>You are the creator and owner of or have the necessary licenses, rights, consents, releases, and permissions to use and to authorize us...</li>
      <li>Your Contributions are not false, inaccurate, or misleading.</li>
      <li>Your Contributions do not violate any applicable law, regulation, or rule.</li>
  </ol>

  <h2 id="6-contribution-license">6. CONTRIBUTION LICENSE</h2>
  <p>You agree that we may access, store, process, and use any information and personal data that you provide following the terms of the Privacy Policy and your choices (including settings). By submitting suggestions or other feedback regarding the Licensed Application, you agree that we can use and share such feedback for any purpose without compensation to you.</p>

  <h2 id="7-liability">7. LIABILITY</h2>
  <p class="font-extrabold text-lg text-red-700 bg-red-100 p-4 rounded-md">IN NO EVENT WILL THE LICENSOR OR ITS DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE LICENSED APPLICATION.</p>

  <h2 id="8-warranty">8. WARRANTY</h2>
  <p>8.1 The Licensor warrants that the Licensed Application is free of spyware, trojan horses, viruses, or any other malware at the time of Your download. Licensor warrants that the Licensed Application works as described in the user documentation.
  8.2 No warranty is provided for the Licensed Application that has been unauthorizedly modified, handled inappropriately or culpably, combined or installed with inappropriate hardware or software, or used with inappropriate accessories.</p>

  <h2 id="9-product-claims">9. PRODUCT CLAIMS</h2>
  <p>The Licensor and the End-User acknowledge that the Licensor, and not the Services, is responsible for addressing any claims of the End-User or any third party relating to the Licensed Application or the End-User's possession and/or use of that Licensed Application, including, but not limited to: (i) product liability claims; (ii) any claim that the Licensed Application fails to conform to any applicable legal or regulatory requirement; and (iii) claims arising under consumer protection, privacy, or similar legislation.</p>

  <h2 id="10-legal-compliance">10. LEGAL COMPLIANCE</h2>
  <p>You represent and warrant that You are not located in a country that is subject to a US Government embargo, or that has been designated by the US Government as a "terrorist supporting country," and that You are not listed on any US Government list of prohibited or restricted parties.</p>

  <h2 id="11-contact-information">11. CONTACT INFORMATION</h2>
  <p>For general inquiries, complaints, questions, or claims concerning the Licensed Application, please contact the Licensor at:</p>
  <p class="font-medium">Email: <a href="mailto:yamlaknegash96@gmail.com" class="text-blue-600 hover:underline">yamlaknegash96@gmail.com</a></p>
  <p class="font-medium">Address: P.O. Box 456, Adama, Oromia, Ethiopia</p>

  <h2 id="12-termination">12. TERMINATION</h2>
  <p>The license is valid until terminated by the Licensor or by You. Your rights under this license will terminate automatically and without notice from the Licensor if You fail to adhere to any term(s) of this license. Upon License termination, You shall stop all use of the Licensed Application, and destroy all copies, full or partial, of the Licensed Application.</p>

  <h2 id="13-third-party-terms">13. THIRD-PARTY TERMS OF AGREEMENTS AND BENEFICIARY</h2>
  <p>The Licensor represents and warrants that it will comply with applicable third-party terms of agreement when using Licensed Application. The Licensor's subsidiaries shall be third-party beneficiaries of this End User License Agreement and will have the right to enforce this Agreement against You as a third-party beneficiary thereof.</p>

  <h2 id="14-intellectual-property-rights">14. INTELLECTUAL PROPERTY RIGHTS</h2>
  <p>The Licensor and the End-User acknowledge that, in the event of any third-party claim that the Licensed Application or the End-User's possession and use of that Licensed Application infringes on the third party's intellectual property rights, the Licensor, and not the Services, will be solely responsible for the investigation, defense, settlement, and discharge of any such intellectual property infringement claims.</p>

  <h2 id="15-applicable-law">15. APPLICABLE LAW</h2>
  <p>This License Agreement is governed by the laws of <span class="font-medium">Ethiopia</span>, excluding its conflicts of law rules.</p>

  <h2 id="16-miscellaneous">16. MISCELLANEOUS</h2>
  <p>16.1 If any of the terms of this agreement should be or become invalid, the validity of the remaining provisions shall not be affected. Invalid terms will be replaced by valid ones formulated in a way that will achieve the primary purpose.
  16.2 Collateral agreements, changes, and amendments are only valid if laid down in writing.</p>
`;

const EULA = () => {
  // EULA component with structure and styling matching the T&C page
  return (
    <div className="bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-4xl mx-auto shadow-xl rounded-2xl p-8 lg:p-12 bg-gray-50 border border-gray-100">
        <div
          // Apply Tailwind Typography (prose) and custom styles
          className="prose prose-lg max-w-none terms-content-styles"
          dangerouslySetInnerHTML={{ __html: rawEULAContent }}
        />
      </div>
      {/* Custom styles to match the Terms and Conditions look and enable smooth scrolling */}
      <style jsx="true">{`
        html {
            scroll-behavior: smooth;
        }
        
        .terms-content-styles h1 {
          font-size: 3rem;
          font-weight: 800; /* Extra-bold */
          color: #1f2937; /* Gray-900 */
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 4px solid #f97316; /* Orange-600 border, matching the bakery theme */
          line-height: 1.2;
        }

        .terms-content-styles h2 {
          font-size: 1.875rem; /* 3xl */
          font-weight: 700; /* Bold */
          color: #ea580c; /* Orange-700 */
          margin-top: 3rem;
          margin-bottom: 1rem;
          padding-top: 1.5rem; /* Added padding for anchor link target offset */
        }

        .terms-content-styles p {
          line-height: 1.75;
          margin-bottom: 1rem;
          color: #4b5563; /* Gray-600 */
        }

        .terms-content-styles ol {
          margin-top: 1.5rem;
          margin-bottom: 1.5rem;
          padding-left: 2rem;
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

export default EULA;