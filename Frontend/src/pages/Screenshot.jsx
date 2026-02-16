import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Loader2, FileImage, Upload, CheckCircle, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAdvertiseStore from "../store/advertiseStore";

const Screenshot = () => {
    const navigate = useNavigate();
    const { advertInfo, getAdvertRequestInfo, uploadPaymentScreenshot } = useAdvertiseStore();
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    // const [advertInfo, setAdvertInfo] = useState({});
    const fileInputRef = useRef(null);

		console.log(advertInfo)

    // Ensure that advert information exists
    useEffect(() => {
        const fetchAdvertInfo = async () => {
            if (!advertInfo) {
                toast.error("No advertisement information found.");
                navigate('/owner'); // Redirect if no info is available
            } else {
                try {
                    const res = await getAdvertRequestInfo(advertInfo?.advertId);
                } catch (error) {
                    toast.error("Failed to retrieve advertisement information.");
                }
            }
        };

        fetchAdvertInfo();
    }, [advertInfo, navigate, getAdvertRequestInfo]);

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        setFile(selected);
        if (selected) setPreview(URL.createObjectURL(selected));
        else setPreview(null);
    };

    const handleRemoveImage = () => {
        setFile(null);
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            return toast.error("Please select a screenshot file first.");
        }

        try {
            setLoading(true);
            const res = await uploadPaymentScreenshot(advertInfo?.advert?.advertId, file); // Updated to access advertId correctly
            toast.success(res?.message || "Screenshot uploaded successfully!", {
                duration: 5000,
            });
            localStorage.removeItem("AdInfo");
            setShowModal(true);
            setFile(null);
            setPreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";

            // Redirect after the modal is displayed
            setTimeout(() => {
                navigate('/owner');
            }, 5000);
        } catch (err) {
            toast.error(err.message || "Upload failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 border-t-8 border-orange-600 relative">
                <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
                    Payment Screenshot Upload
                </h2>
                <p className="text-center text-gray-500 mb-8">
                    Please upload your payment screenshot below.
                </p>

                {/* Display Advertisement Details */}
                {advertInfo?.advert && (
                    <div className="mb-6 border p-4 rounded-lg bg-orange-50 border-orange-200">
                        <h3 className="font-semibold text-orange-600 text-lg">Advertisement Details:</h3>
                        <p><strong>Advert ID:</strong> {advertInfo?.advert.advertId}</p>
                        <p><strong>Days:</strong> {advertInfo?.advert.days}</p>
                        <p><strong>Total Cost:</strong> {advertInfo?.advert.totalCost} Birr</p>
                    </div>
                )}

                {/* Upload Form */}
                <form onSubmit={handleUpload} className="space-y-6">
                    <div className="flex flex-col items-center">
                        <label className="text-gray-700 font-medium mb-3">
                            Upload Screenshot
                        </label>
                        {preview ? (
                            <div className="relative mb-4">
                                <img
                                    src={preview}
                                    alt="Payment Preview"
                                    className="w-48 h-48 object-cover rounded-xl border-4 border-dashed border-gray-300 shadow-md"
                                />
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="absolute top-0 right-0 -translate-y-2 translate-x-2 bg-red-600 text-white rounded-full p-1.5 shadow-lg hover:bg-red-700 transition-all border-2 border-white"
                                    aria-label="Remove Image"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="w-48 h-48 bg-gray-100 flex flex-col items-center justify-center rounded-xl border-4 border-dashed border-gray-300 mb-4 text-gray-500">
                                <FileImage className="w-12 h-12 mb-2" />
                                <p className="text-sm">No file selected</p>
                            </div>
                        )}

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !file}
                        className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin w-5 h-5" />
                                <span>Uploading...</span>
                            </>
                        ) : (
                            <>
                                <Upload className="w-5 h-5" />
                                <span>Upload Screenshot</span>
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* ✅ Success Modal */}
            {showModal && (
                <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center p-4 z-50 transition-opacity duration-300">
                    <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full text-center">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            Upload Complete!
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Your payment screenshot has been sent for admin review.
                        </p>
                        <p className="text-orange-600 font-medium mb-2">
                            Please wait for confirmation through your email.
                        </p>
                        <p className="text-sm text-gray-500 italic font-extrabold animate-pulse">
                            Redirecting in 5 seconds...
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Screenshot;