import TransactionModel from "../models/TransactionModel.js";
import CartModel from "../models/CartModel.js";
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
    const {transactionId, userId} = req.body;

    try {

        let cart = await CartModel.findOne({
            where: {
                userId: userId
            }
        })
        if (!cart) {
            await CartModel.create({
                userId,
                status: 'active'
                // Other fields initialization if needed
            });
        }

        const newCart = await CartModel.findOne({
            where: {
                userId: userId
            }
        })
        const updatedTransaction = await TransactionModel.update(
            {cartId: newCart.id},
            {where: {id: transactionId}}
        );

        const itemsInCart = await TransactionModel.findAll({
                where: {
                    cartId: cart.id
                }
            }
        )

        res.status(200).json({
            msg: 'Item added to cart successfully',
            cartId: updatedTransaction,
            items: itemsInCart
        });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(400).json({msg: 'Failed to add item to cart'});
    }
}
