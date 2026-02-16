import { create } from "zustand";
import {
    requestAdvertiseInfo,
    getAdvertRequestInfo,
    uploadAdvertPayment,
    fetchActiveAds
} from '../services/advertise';

const useAdvertiseStore = create((set) => ({
    activeAds: [],
    advertInfo: null,
    loading: false,
    error: null,

    // Fetch active ads
    fetchActiveAds: async () => {
        set({ loading: true, error: null });
        try {
            const ads = await fetchActiveAds();
            set({ activeAds: ads });
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },

    // Request advertisement info
    requestAdvertise: async (productId, endDate) => {
        set({ loading: true, error: null });
        try {
            const res = await requestAdvertiseInfo(productId, endDate);
            set({ advertInfo: res });
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },

    // Get advert request info
    getAdvertRequestInfo: async (advertId) => {
        set({ loading: true, error: null });
        try {
            const res = await getAdvertRequestInfo(advertId);
            set({ advertInfo: res });
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },

    // Upload payment screenshot
    uploadPaymentScreenshot: async (advertId, formData) => {
        set({ loading: true, error: null });
        try {
            const res = await uploadAdvertPayment(advertId, formData);
            set({ advertInfo: res });
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    }
}));

export default useAdvertiseStore;