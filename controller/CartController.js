import OrderModel from "../models/OrderModel.js";
import CartModel from "../models/CartModel.js";
import ServiceModel from "../models/ServiceModel.js";


export const addToCart = async (req, res) => {
    const { orderId, userId } = req.body;

    try {
        // Find or create an active cart for the user
        const [cart] = await CartModel.findOrCreate({
            where: { userId: userId, status: 'active' },
            defaults: { status: 'active' }
        });

        // Assign the order to the cart
        await OrderModel.update(
            { cartId: cart.id },
            { where: { id: orderId } }
        );

        // Retrieve all items in the cart
        const itemsInCart = await OrderModel.findAll({
            where: { cartId: cart.id },
            include: [{ model: ServiceModel }]
        });

        let totalPrice = 0;

        const itemsWithPrice = itemsInCart.map(item => {
            const itemPrice = item.service ? item.service.price : 0;
            totalPrice += itemPrice; // Accumulate item prices for total price calculation

            return {
                id: item.id,
                washStatus: item.washStatus,
                imageUrl: item.imageUrl,
                productDetail: item.service,
            };
        });

        // Update the cart's total price
        await CartModel.update({ totalPrice }, { where: { id: cart.id } });

        res.status(200).json({
            msg: 'Item added to cart successfully',
            cartId: cart.id,
            items: itemsWithPrice,
            totalPrice: totalPrice // Include total price in the response
        });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ msg: 'Failed to add item to cart' });
    }
};


export const finishCartStatus = async (req, res) => {
    const {cartId} = req.query
}

export const getCart = async (req, res) => {
    const {userId} = req.params;

    try {
        const cart = await CartModel.findOne({
            where: {
                userId: userId,
                status: 'active'
            },
            include: [{model: OrderModel, include: [{model: ServiceModel}]}]
        });

        if (!cart) {
            return res.status(404).json({msg: 'Cart not found'});
        }

        const itemsInCart = (cart.orders || []).map(item => ({
            id: item.id,
            washStatus: item.washStatus,
            imageUrl: item.imageUrl,
            service : item.service
        }));

        res.status(200).json({
            msg: 'Cart retrieved successfully',
            cartId: cart.id,
            items: itemsInCart,
            totalPrice: cart.totalPrice
        });
    } catch (error) {
        console.error('Error retrieving cart:', error);
        res.status(500).json({msg: error});
    }
}
