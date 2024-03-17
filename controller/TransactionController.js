import TransactionModel from "../models/TransactionModel.js";
import CartModel from "../models/CartModel.js";

export const addTransaction = async (req, res) => {
    const {cartId, receiveByCustomer, deliveryMethod} = req.body;
    const transactionDate = new Date();

    try {
        const transaction = await TransactionModel.create({
            cartId: cartId,
            receiveByCustomer: receiveByCustomer,
            deliveryMethod: deliveryMethod,
            transactionDate: transactionDate
        });

        const cart = await CartModel.findByPk(cartId);
        await cart.update({status: "checkout"});
        if (!cart) {
            return res.status(404).json({msg: "Cart not found"});
        }
        const transactionResponse = {
            id: transaction.id,
            cart: cart,
            receivedByCustomer: transaction.receiveByCustomer,
            deliveryMethod: transaction.deliveryMethod
        }

        res.status(200).json({msg: "transaction added successfully", transaction: transactionResponse});
    } catch (e) {
        console.error(e);
        res.status(400).json({msg: "Failed to add checkout", e});
    }
}
