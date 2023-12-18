import TransactionModel from "../models/TransactionModel.js";
import CartModel from "../models/CartModel.js";
import ProductModel from "../models/ProductModel.js";
//
//
// export const addToCart = async (req, res) => {
//     const {userId} = req.body;
//
//     try {
//         const newCart = await CartModel.create({
//             userId: userId,
//             status: "active"
//         });
//
//         res.status(200).json({
//             msg: 'Item added to cart successfully',
//             newCart
//         });
//     } catch (error) {
//         console.error('Error adding item to cart:', error);
//         res.status(400).json({msg: 'Failed to add item to cart', error});
//     }
// };


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

        await TransactionModel.update(
            { cartId: cart.id },
            { where: { id: transactionId } }
        );

        const itemsInCart = await TransactionModel.findAll({
            where: { cartId: cart.id },
            include: [{ model: ProductModel }] // Include ProductModel to fetch product details
        });

        res.status(200).json({
            msg: 'Item added to cart successfully',
            cartId: cart.id,
            items: itemsInCart.map(item => ({
                id: item.id,
                transactionDate: item.transactionDate,
                confirmed: item.confirmed,
                washStatus: item.washStatus,
                imageUrl: item.imageUrl,
                productDetail: item.product // Product details for each item
            }))
        });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ msg: 'Failed to add item to cart' });
    }
};
