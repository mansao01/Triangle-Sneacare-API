import TransactionModel from "../models/TransactionModel.js";
import CartModel from "../models/CartModel.js";
import moment from "moment-timezone";
import {nanoid} from "nanoid";

export const createTransaction = async (req, res) => {
    const {cartId, deliveryMethod, paymentMethod, customerAddressId, userId, totalPurchasePrice} = req.body;
    const transactionDate = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
    const paymentStatus = "pending";
    const receiveByCustomer = false;
    const deliveryStatus = "pending";

    try {
        const transaction = await TransactionModel.create({
            cartId: cartId,
            userId: userId,
            paymentMethod: paymentMethod,
            paymentStatus: paymentStatus,
            deliveryStatus: deliveryStatus,
            customerAddressId: customerAddressId,
            receiveByCustomer: receiveByCustomer,
            deliveryMethod: deliveryMethod,
            transactionDate: transactionDate,
            totalPurchasePrice: totalPurchasePrice
        });

        const cart = await CartModel.findByPk(cartId);
        await cart.update({status: "checkout"});
        if (!cart) {
            return res.status(404).json({msg: "Cart not found"});
        }
        const transactionResponse = {
            id: transaction.id,
            cart: cart,
            deliveryMethod: transaction.deliveryMethod,
            paymentMethod: transaction.paymentMethod,
            totalPurchasePrice: transaction.totalPurchasePrice,
        }

        res.status(200).json({msg: "transaction added successfully", transaction: transactionResponse});
    } catch (e) {
        console.error(e);
        res.status(400).json({msg: "Failed to add checkout", e});
    }
}
