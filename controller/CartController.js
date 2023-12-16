import TransactionModel from "../models/TransactionModel.js";
import CartModel from "../models/CartModel.js";
import ProductModel from "../models/ProductModel.js";
import UserModel from "../models/UserModel.js";


export const addToCart = async (req, res) => {
    const { userId} = req.body;

    try {

        const newCart = await CartModel.create({
            userId: userId,
            status: 'active'
        });

        res.status(200).json({
            msg: 'Item added to cart successfully',
            newCart
        });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(400).json({msg: 'Failed to add item to cart'});
    }
};


// export const addToCart = async (req, res) => {
//     const {transactionId, userId} = req.body;
//
//     // Todo: userId from cartModel error
//     try {
//
//         // let cart = await CartModel.findAll({
//         //     where: {
//         //         userId: userId
//         //     }
//         // })
//         await CartModel.create({
//             userId,
//             status: 'active'
//             // Other fields initialization if needed
//         });
//
//         // const newCart = await CartModel.findOne({
//         //     where: {
//         //         userId: userId
//         //     }
//         // })
//         // const updatedTransaction = await TransactionModel.update(
//         //     {cartId: newCart.id},
//         //     {where: {id: transactionId}}
//         // );
//
//         res.status(200).json({
//             msg: 'Item added to cart successfully',
//             // updatedTransaction
//         });
//     } catch (error) {
//         console.error('Error adding item to cart:', error);
//         res.status(400).json({msg: 'Failed to add item to cart'});
//     }
// }
