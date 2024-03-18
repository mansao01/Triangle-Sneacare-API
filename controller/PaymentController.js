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

export const getTransactionPaymentStatus = async (req, res) => {
    const orderId = req.query.orderId
    const url = `https://api.sandbox.midtrans.com/v2/${orderId}/status`

    try {
        const options = {
            method: 'GET',
            url: url,
            headers: {
                accept: 'application/json',
                authorization: 'Basic ' + base64.encode(serverKey + ':')
            }
        };
        axios.request(options)
            .then(function (response) {
                res.status(200).json(response.data)
            })
            .catch(function (error) {
                res.status(400).json(error)
            });
    } catch (e) {
        res.status(500).json({error: 'Internal Server Error'});
    }
}

export const cancelTransaction = async (req, res) => {
    const orderId = req.query.orderId
    const url = `https://api.sandbox.midtrans.com/v2/${orderId}/cancel`

    try {
        const options = {
            method: 'POST',
            url: url,
            headers: {
                accept: 'application/json',
                authorization: 'Basic ' + base64.encode(serverKey + ':')
            }
        };

        axios
            .request(options)
            .then(function (response) {
                res.status(200).json(response.data)
            })
            .catch(function (error) {
                res.status(400).json(error)
            });
    } catch (e) {
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
