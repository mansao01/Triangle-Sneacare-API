import OrderModel from "../models/OrderModel.js";
import CartModel from "../models/CartModel.js";
import ServiceModel from "../models/ServiceModel.js";


export const addToCart = async (req, res) => {
    const {orderId, userId} = req.body;

    try {
        let [cart, created] = await CartModel.findOrCreate({
            where: {userId},
            defaults: {status: 'active'}
        });

        if (created) {
            cart = cart[0];
        }

        await OrderModel.update(
            {cartId: cart.id},
            {where: {id: orderId}}
        );

        const itemsInCart = await OrderModel.findAll({
            where: {cartId: cart.id},
            include: [{model: ServiceModel}]
        });

        let totalPrice = 0;

        const itemsWithPrice = itemsInCart.map(item => {
            const itemPrice = item.product ? item.product.price : 0;
            totalPrice += itemPrice; // Accumulate item prices for total price calculation

            return {
                id: item.id,
                washStatus: item.washStatus,
                imageUrl: item.imageUrl,
                productDetail: item.product,
            };
        });

        // Update the cart's total price
        await CartModel.update({totalPrice}, {where: {id: cart.id}});

        res.status(200).json({
            msg: 'Item added to cart successfully',
            cartId: cart.id,
            items: itemsWithPrice,
            totalPrice: totalPrice // Include total price in the response
        });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({msg: 'Failed to add item to cart'});
    }
};

export const finishCartStatus = async (req, res) => {
    const {cartId} = req.query
}

export const getCart = async (req, res) => {
    const {userId} = req.params;

    try {
        const cart = await CartModel.findOne({
            where: {userId: userId},
            include: [{model: OrderModel, include: [{model: ServiceModel}]}]
        });

        if (!cart) {
            return res.status(404).json({msg: 'Cart not found'});
        }

        const itemsInCart = cart.transactions.map(item => ({
            id: item.id,
            transactionDate: item.transactionDate,
            confirmed: item.confirmed,
            washStatus: item.washStatus,
            imageUrl: item.imageUrl,
            productDetail: item.product
        }));

        res.status(200).json({
            msg: 'Cart retrieved successfully',
            cartId: cart.id,
            items: itemsInCart,
            totalPrice: cart.totalPrice
        });
    } catch (error) {
        console.error('Error retrieving cart:', error);
        res.status(500).json({msg: 'Failed to retrieve cart'});
    }
}
