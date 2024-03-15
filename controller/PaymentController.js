import axios from "axios";
import base64 from "base-64";

const serverKey = process.env.MIDTRANS_SERVER_KEY;
const isProduction = false;

export const charge = async (req, res) => {
    const {orderId, totalPrice, email, phone, name} = req.body;
    const url = isProduction ? process.env.MIDTRANS_PRODUCTION_URL : process.env.MIDTRANS_SANDBOX_URL;
    const transaction_details = {
        transaction_details: {
            order_id: orderId,
            gross_amount: totalPrice
        },
        customer_details: {
            first_name: name,
            email: email,
            phone: phone,
        }
    }
    try {
        const chargeResult = await chargeAPI(url, serverKey, transaction_details);
        res.status(chargeResult.httpCode).json(chargeResult.body);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

async function chargeAPI(apiUrl, serverKey, requestBody) {
    try {
        const response = await axios.post(apiUrl, requestBody, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Basic ' + base64.encode(serverKey + ':')
            }
        });

        return {
            body: response.data,
            httpCode: response.status
        };
    } catch (error) {
        return {
            body: {error: 'Failed to charge'},
            httpCode: error.response ? error.response.status : 500
        };
    }
}
