import OrderModel from "../models/OrderModel.js";
import multer from "multer";
import ImgUpload from "../modules/imgUpload.js";
import CartModel from "../models/CartModel.js";
import ServiceModel from "../models/ServiceModel.js";
// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({storage: storage});


export const addOrder = (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({msg: err.message});
        }

        const {washStatus, serviceId, userId} = req.body;
        let imageUrl = '';

        // Call ImgUpload function to upload to GCS
        ImgUpload.uploadToGcs(req, res, async (err) => {
            if (err) {
                return res.status(400).json({msg: 'Failed to upload to GCS', error: err});
            }

            if (req.file && req.file.cloudStoragePublicUrl) {
                imageUrl = req.file.cloudStoragePublicUrl;

                try {
                    // Create a new transaction using Sequelize's create method
                    const order = await OrderModel.create({
                        washStatus: washStatus,
                        imageUrl: imageUrl,
                        serviceId: serviceId,
                        userId: userId
                    });

                    // If transaction is created successfully, send a success response
                    return res.status(201).json({msg: 'Success add order', order: order});
                } catch (error) {
                    // If there's an error during creation, handle it and send an error response
                    return res.status(500).json({msg: 'Failed to create transaction', details: error.message});
                }
            } else {
                return res.status(400).json({msg: 'Image upload failed or URL not found'});
            }
        });
    });
};

export const updateWashStatus = async (req, res) => {
    const {washStatus, orderId} = req.query;
    try {
        const order = await OrderModel.update({washStatus: washStatus}, {where: {id: orderId}});
        return res.status(200).json({msg: "Wash status updated successfully", order});
    } catch (e) {
        return res.status(500).json({error: e});
    }

}

export const deleteOrder = async (req, res) => {
    const {orderId} = req.params;

    try {
        // Find the order by ID
        const order = await OrderModel.findByPk(orderId);

        // If order is found, delete it
        if (order) {
            const cartId = order.cartId; // Get the cart ID before deleting the order
            await order.destroy();

            // Retrieve all remaining items in the cart
            const itemsInCart = await OrderModel.findAll({
                where: {cartId: cartId},
                include: [{model: ServiceModel}]
            });

            // Recalculate the total price of the cart
            let totalPrice = 0;
            itemsInCart.forEach(item => {
                const itemPrice = item.service ? item.service.price : 0;
                totalPrice += itemPrice;
            });

            // Update the cart's total price
            await CartModel.update({totalPrice}, {where: {id: cartId}});

            return res.status(200).json({
                msg: 'Order deleted successfully',
                order,
                totalPrice // Include updated total price in the response
            });
        } else {
            return res.status(404).json({msg: 'Order not found'});
        }
    } catch (error) {
        console.error('Error deleting order:', error);
        return res.status(500).json({msg: 'Failed to delete order', details: error.message});
    }
};
