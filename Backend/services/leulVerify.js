import axios from "axios";
import FormData from "form-data";

export const verifyTelebirrPayment = async (
    transactionId,
    suffix
) => {
    const response = await axios.post(
        "https://verifyapi.leulzenebe.pro/verify",
        {
            reference: transactionId,
            suffix,
        },
        {
            headers: {
                "x-api-key": process.env.LEUL_VERIFY_API_KEY,
            },
        }
    );

    return response.data;
};

export const verifyTelebirrImage = async (
    fileBuffer,
    fileName,
    suffix
) => {
    const formData = new FormData();

    formData.append("file", fileBuffer, fileName);
    formData.append("autoVerify", "true");

    if (suffix) {
        formData.append("suffix", suffix);
    }

    const response = await axios.post(
        "https://verifyapi.leulzenebe.pro/verify-image",
        formData,
        {
            headers: {
                ...formData.getHeaders(),
                "x-api-key": process.env.LEUL_VERIFY_API_KEY,
            },
        }
    );

    return response.data;
};