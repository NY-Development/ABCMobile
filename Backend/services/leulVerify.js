import axios from "axios";

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