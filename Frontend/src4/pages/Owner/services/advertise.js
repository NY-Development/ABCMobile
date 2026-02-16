import API from './axios';

// Request advertisement information
export const requestAdvertiseInfo = async (productId, endDate) => {
    try {
        const res = await API.post("/advert/request-info", { productId, endDate });
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "An unknown error occurred." };
    }
};

// Get specific advert request info by ID
export const getAdvertRequestInfo = async (advertId) => {
    try {
        const res = await API.get(`/advert/request-info/${advertId}`);
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "An unknown error occurred." };
    }
};

// Upload payment screenshot for an advert
export const uploadAdvertPayment = async (advertId, formData) => {
    try {
        const res = await API.put(`/advert/upload-payment/${advertId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "An unknown error occurred." };
    }
};

// Fetch all active ads for the homepage
export const fetchActiveAds = async () => {
    try {
        const res = await API.get("/advert/active");
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "An unknown error occurred." };
    }
};