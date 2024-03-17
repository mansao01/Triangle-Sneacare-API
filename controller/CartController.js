import SelectedProductModel from "../models/SelectedProductModel.js";
import CartModel from "../models/CartModel.js";
import ProductModel from "../models/ProductModel.js";


export const addToCart = async (req, res) => {
    const { transactionId, userId } = req.body;

    try {
        let [cart, created] = await CartModel.findOrCreate({
            where: { userId },
            defaults: { status: 'active' }
        });

        if (created) {
            cart = cart[0];
        }

        await SelectedProductModel.update(
            { cartId: cart.id },
            { where: { id: transactionId } }
        );

        const itemsInCart = await SelectedProductModel.findAll({
            where: { cartId: cart.id },
            include: [{ model: ProductModel }]
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


export const getCart = async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await CartModel.findOne({
            where: { userId: userId },
            include: [{ model: SelectedProductModel, include: [{ model: ProductModel }] }]
        });

        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
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
        res.status(500).json({ msg: 'Failed to retrieve cart' });
    }
}
