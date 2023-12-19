import CheckoutModel from "../models/CheckoutModel.js";
import CartModel from "../models/CartModel.js";

export const addToCheckout = async (req, res) => {
    const {cartId, receiveByCustomer, deliveryMethod} = req.body;

    try {
        const checkout = await CheckoutModel.create({
            cartId: cartId,
            receiveByCustomer: receiveByCustomer,
            deliveryMethod: deliveryMethod
        });

        const cart = await CartModel.findByPk(cartId);
        await cart.update({status: "checkout"});
        if (!cart) {
            return res.status(404).json({msg: "Cart not found"});
        }
        const checkoutResponse = {
            id: checkout.id,
            cart: cart,
            receivedByCustomer: checkout.receiveByCustomer,
            deliveryMethod: checkout.deliveryMethod
        }

        res.status(200).json({msg: "Checkout added successfully", checkout: checkoutResponse});
    } catch (e) {
        console.error(e);
        res.status(400).json({msg: "Failed to add checkout", e});
    }
}
