import TransactionModel from "../models/TransactionModel.js";
import CartModel from "../models/CartModel.js";
import moment from "moment-timezone";
import {nanoid} from "nanoid";
import OrderModel from "../models/OrderModel.js";
import ServiceModel from "../models/ServiceModel.js";

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

export const getTransactionById = async (req, res) => {
    const { id } = req.params;
    try {
        const transactions = await TransactionModel.findAll({
            where: { userId: id }
        });
        // Assuming you want to send back the detailed transactions including cart and order info
        const itemInCart = await OrderModel.findAll(transactions.cartId)
        const transactionResponse = transactions.map(transaction => {
            return {
                id: transaction.id,
                cart: transaction.cartId,
                deliveryMethod: transaction.deliveryMethod,
                paymentMethod: transaction.paymentMethod,
                paymentStatus: transaction.paymentStatus,
                totalPurchasePrice: transaction.totalPurchasePrice,
                items: itemInCart
            }
        });
        res.status(200).json({ msg: "Success", transactions: transactionResponse });
    } catch (e) {
        res.status(500).json({ msg: e.message }); // It's better to send back the error message only
    }
};
