// import React, { useState, useRef, useEffect } from "react";
// import { toast } from "react-hot-toast";
// import { uploadPaymentScreenshot } from "../services/payment";
// import {
//   Loader2,
//   FileImage,
//   Upload,
//   CheckCircle,
//   X,
//   Clipboard,
//   DollarSign,
//   Package, // Changed Tag to Package for product
// } from "lucide-react";
// import GoBack from "../components/GoBack";
// import { useNavigate, Link, useLocation } from "react-router-dom";

// // Note: You would typically get the product details (amount, name, etc.) 
// // from a URL parameter (useLocation or useParams) or React state.
// // We use a placeholder here for the amount, and recommend passing it via props/state.

// const OrderPayment = ({ initialAmount }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   
//   // 💰 Determine the product amount.
//   // Best practice: pass it via props or state from the previous product page.
//   // FALLBACK: Retrieve from state passed via navigate or use a default.
//   const productAmount = initialAmount || location.state?.amount || 499.9; 
//   const productName = location.state?.name || "Selected Product Order";
//   
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const fileInputRef = useRef(null);
//   const [copied, setCopied] = useState(false);
//   // 🆕 New state to temporarily bypass navigation prevention
//   const [isRedirecting, setIsRedirecting] = useState(false);

//   // 🏦 Bank Account Details (Constants)
//   const AccountNumber = 1000403196928;
//   const AccountName = "Yamlak Negash Dugo";


//   // 🧩 Prevent user from leaving until upload is complete
//   useEffect(() => {
//     // Only run prevention logic if not in the redirecting phase
//     if (isRedirecting) return;

//     const handleBeforeUnload = (e) => {
//       if (!file) {
//         e.preventDefault();
//         e.returnValue =
//           "You must upload your payment OrderPayment before leaving this page.";
//       }
//     };

//     const handlePopState = () => {
//       if (!file) {
//         toast.error("You cannot go back until you upload your OrderPayment.");
//         // Force user to stay on the page
//         window.history.pushState(null, "", window.location.href);
//       }
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);
//     // This pushes the current state to prevent simple back-button navigation
//     window.history.pushState(null, "", window.location.href);
//     window.addEventListener("popstate", handlePopState);

//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//       window.removeEventListener("popstate", handlePopState);
//     };
//   }, [file, isRedirecting]); 

//   // 🖼️ File handling
//   const handleFileChange = (e) => {
//     const selected = e.target.files[0];
//     setFile(selected);
//     if (selected) setPreview(URL.createObjectURL(selected));
//     else setPreview(null);
//   };

//   const handleRemoveImage = () => {
//     setFile(null);
//     setPreview(null);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   const copyToClipboard = async (text) => {
//     try {
//       await navigator.clipboard.writeText(text);
//       setCopied(true);
//       toast.success("Account Number copied!");
//       setTimeout(() => setCopied(false), 2000);
//     } catch {
//       toast.error("Failed to copy text.");
//     }
//   };

//   // 📤 Upload handler
//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!file) return toast.error("Please select a OrderPayment file first.");

//     try {
//       setLoading(true);
//       // You might want to pass productName or an order ID here
//       const res = await uploadPaymentScreenshot(file); 
//       toast.success(res.message || "OrderPayment uploaded successfully!", {
//         duration: 5000,
//       });

//       setShowModal(true);
//       // 1. Set the redirecting flag to bypass navigation checks
//       setIsRedirecting(true);

//       // 2. Clear file and preview state 
//       setFile(null);
//       setPreview(null);
//       if (fileInputRef.current) fileInputRef.current.value = "";

//       // 3. Redirect after 5 seconds to the orders or confirmation page
//       setTimeout(() => {
//         setShowModal(false);
//         navigate("/clientorder"); // Redirect to the client's order page
//       }, 5000);
//     } catch (err) {
//       toast.error(err.message || "Upload failed.");
//       setLoading(false);
//       // In case of failure, ensure the redirecting flag is off
//       setIsRedirecting(false);
//     } finally {
//       if (!showModal) {
//         setLoading(false);
//       }
//     }
//   };

//   // 🚫 Render Access Denied if no product amount is set
//   if (!productAmount) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//         <div className="text-center p-8 bg-white rounded-xl shadow-2xl">
//           <div className="text-6xl mb-4 text-red-800">❌</div>
//           <h2 className="text-3xl font-bold text-gray-800 mb-2">
//             Payment Context Missing
//           </h2>
//           <p className="text-lg text-gray-600 mb-6">
//             Please select a product to initiate payment.
//           </p>
//           <Link
//             to="/products" // Adjust this to your main products page
//             className="inline-block px-8 py-3 text-white bg-orange-600 hover:bg-orange-700 transition duration-300 rounded-full shadow-lg transform hover:scale-[1.02]"
//           >
//             Browse Products
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     {/* Background image layer removed, restored simple background */}
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 border-t-8 border-orange-600 relative">
//         <GoBack />
//         <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
//           Order Payment
//         </h2>
//         <p className="text-center text-gray-500 mb-8">
//           Please transfer the total amount for your order and upload the OrderPayment below.
//         </p>

//         {/* Payment Summary */}
//         <div className="space-y-4 mb-8 p-4 bg-orange-50 rounded-lg border border-orange-200">
//           {/* Display Product/Order Name */}
//           <div className="flex justify-between items-center text-lg font-medium text-gray-700">
//             <div className="flex items-center text-orange-700">
//               <Package className="w-5 h-5 mr-2" />
//               <span>Order For:</span>
//             </div>
//             <span className="font-semibold text-orange-800">
//               {productName}
//             </span>
//           </div>

//           <div className="flex justify-between items-center text-xl font-bold text-gray-800 border-t pt-3 border-orange-200">
//             <div className="flex items-center text-orange-700">
//               <DollarSign className="w-5 h-5 mr-2" />
//               <span>Total Amount:</span>
//             </div>
//             <span className="text-2xl text-green-600">{productAmount} ETB</span>
//           </div>

//           <div className="pt-3 border-t border-orange-200">
//             <p className="font-bold text-gray-700 mb-2">Transfer to:</p>
//             <div className="bg-white p-3 rounded-lg border border-gray-300 shadow-sm">
//               <div className="flex justify-between items-center mb-1 text-sm">
//                 <span className="text-gray-500">Account Name:</span>
//                 <span className="font-semibold text-gray-800">{AccountName}</span>
//               </div>

//               <div className="flex justify-between items-center text-base font-mono">
//                 <span className="text-gray-500">Account Number:</span>
//                 <div className="flex items-center space-x-2">
//                   <span className="text-gray-900 font-extrabold">{AccountNumber}</span>
//                   <button
//                     type="button"
//                     onClick={() => copyToClipboard(AccountNumber.toString())}
//                     className={`p-1 rounded-full transition duration-150 ${
//                       copied
//                         ? "bg-green-500 text-white"
//                         : "text-orange-600 hover:bg-orange-100"
//                     }`}
//                     aria-label="Copy Account Number"
//                   >
//                     <Clipboard className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Upload Form */}
//         <form onSubmit={handleUpload} className="space-y-6">
//           <div className="flex flex-col items-center">
//             <label className="text-gray-700 font-medium mb-3">
//               Upload Payment Proof
//             </label>
//             {preview ? (
//               <div className="relative mb-4">
//                 <img
//                   src={preview}
//                   alt="Payment Preview"
//                   className="w-48 h-48 object-cover rounded-xl border-4 border-dashed border-gray-300 shadow-md"
//                 />
//                 <button
//                   type="button"
//                   onClick={handleRemoveImage}
//                   className="absolute top-0 right-0 -translate-y-2 translate-x-2 bg-red-600 text-white rounded-full p-1.5 shadow-lg hover:bg-red-700 transition-all border-2 border-white"
//                   aria-label="Remove Image"
//                 >
//                   <X size={16} />
//                 </button>
//               </div>
//             ) : (
//               <div className="w-48 h-48 bg-gray-100 flex flex-col items-center justify-center rounded-xl border-4 border-dashed border-gray-300 mb-4 text-gray-500">
//                 <FileImage className="w-12 h-12 mb-2" />
//                 <p className="text-sm">No file selected</p>
//               </div>
//             )}

//             <input
//               ref={fileInputRef}
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//               className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading || !file}
//             className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="animate-spin w-5 h-5" />
//                 <span>Uploading...</span>
//               </>
//             ) : (
//               <>
//                 <Upload className="w-5 h-5" />
//                 <span>Upload Payment Proof</span>
//               </>
//             )}
//           </button>

//           {preview && !loading && (
//             <div className="flex items-center justify-center mt-3 text-green-600 text-sm font-medium">
//               <CheckCircle className="w-4 h-4 mr-1" />
//               File selected and ready to upload
//             </div>
//           )}
//         </form>
//       </div>

//       {/* ✅ Success Modal */}
//       {showModal && (
//         <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center p-4 z-50 transition-opacity duration-300">
//           <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full text-center transform scale-100 transition-transform duration-300">
//             <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
//             <h2 className="text-xl font-bold text-gray-800 mb-4">
//               Order Placed!
//             </h2>
//             <p className="text-gray-600 mb-4">
//               Your payment proof has been sent and your order is being processed.
//             </p>
//             <p className="text-orange-600 font-medium mb-2">
//               You will be redirected to your orders page shortly.
//             </p>
//             <p className="text-sm text-gray-500 italic font-extrabold animate-pulse">
//               Redirecting to orders in 5 seconds...
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderPayment;