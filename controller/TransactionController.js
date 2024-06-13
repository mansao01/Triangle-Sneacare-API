import TransactionModel from "../models/TransactionModel.js";
import CartModel from "../models/CartModel.js";
import moment from "moment-timezone";
import {nanoid} from "nanoid";
import OrderModel from "../models/OrderModel.js";
import ServiceModel from "../models/ServiceModel.js";
import CustomerAddressModel from "../models/CustomerAddressModel.js";
import UserModel from "../models/UserModel.js";
import {Op} from "sequelize";
import nodemailer from "nodemailer";

export const createTransaction = async (req, res) => {
    const {
        cartId,
        deliveryMethod,
        paymentMethod,
        customerAddressId,
        userId,
        totalPurchasePrice,
        paymentStatus
    } = req.body;
    const transactionDate = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
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

export const getTransactionsByMonth = async (req, res) => {
    try {
        const {month, year} = req.query;

        if (!month || !year) {
            return res.status(400).json({msg: "Month and year are required"});
        }

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59, 999);

        const transactions = await TransactionModel.findAll({
            where: {
                transactionDate: {
                    [Op.between]: [startDate, endDate]
                }
            },
            include: [
                {
                    model: CustomerAddressModel,
                    attributes: ['title', 'receiverName', 'phone', 'fullAddress', 'latitude', 'longitude', 'notes']
                },
                {
                    model: UserModel
                }
            ]
        });


        // Loop through transactions to get cart items
        const transactionResponse = await Promise.all(transactions.map(async (transaction) => {
            const itemsInCart = await OrderModel.findAll({
                where: {cartId: transaction.cartId},
                include: [
                    {
                        model: ServiceModel,
                        attributes: ['serviceName', 'price']
                    }
                ]
            });

            // Format items with service name
            const formattedItems = itemsInCart.map(item => ({
                id: item.id,
                washStatus: item.washStatus,
                imageUrl: item.imageUrl,
                serviceName: item.service.serviceName, // Access the service name
                price: item.service.price
            }));

            // Add customer address details
            const customerAddress = transaction.customerAddress;

            return {
                id: transaction.id,
                cart: transaction.cartId,
                user: transaction.user.name,
                deliveryMethod: transaction.deliveryMethod,
                deliveryStatus: transaction.deliveryStatus,
                paymentMethod: transaction.paymentMethod,
                customerAddress: {
                    id: customerAddress.id,
                    title: customerAddress.title,
                    receiverName: customerAddress.receiverName,
                    phone: customerAddress.phone,
                    fullAddress: customerAddress.fullAddress,
                    latitude: customerAddress.latitude,
                    longitude: customerAddress.longitude,
                    notes: customerAddress.notes
                },
                paymentStatus: transaction.paymentStatus,
                totalPurchasePrice: transaction.totalPurchasePrice,
                items: formattedItems
            };
        }));

        res.status(200).json({msg: "Success", transactions: transactionResponse});
    } catch (e) {
        res.status(500).json({msg: e.message});
    }
}
export const getAllTransactions = async (req, res) => {
    try {
        const transactions = await TransactionModel.findAll({
            include: [
                {
                    model: CustomerAddressModel,
                    attributes: ['title', 'receiverName', 'phone', 'fullAddress', 'latitude', 'longitude', 'notes']
                },
                {
                    model: UserModel
                }
            ]
        });


        // Loop through transactions to get cart items
        const transactionResponse = await Promise.all(transactions.map(async (transaction) => {
            const itemsInCart = await OrderModel.findAll({
                where: {cartId: transaction.cartId},
                include: [
                    {
                        model: ServiceModel,
                        attributes: ['serviceName', 'price']
                    }
                ]
            });

            // Format items with service name
            const formattedItems = itemsInCart.map(item => ({
                id: item.id,
                washStatus: item.washStatus,
                imageUrl: item.imageUrl,
                serviceName: item.service.serviceName, // Access the service name
                price: item.service.price
            }));

            // Add customer address details
            const customerAddress = transaction.customerAddress;

            return {
                id: transaction.id,
                cart: transaction.cartId,
                user: transaction.user.name,
                deliveryMethod: transaction.deliveryMethod,
                deliveryStatus: transaction.deliveryStatus,
                paymentMethod: transaction.paymentMethod,
                customerAddress: {
                    id: customerAddress.id,
                    title: customerAddress.title,
                    receiverName: customerAddress.receiverName,
                    phone: customerAddress.phone,
                    fullAddress: customerAddress.fullAddress,
                    latitude: customerAddress.latitude,
                    longitude: customerAddress.longitude,
                    notes: customerAddress.notes
                },
                paymentStatus: transaction.paymentStatus,
                totalPurchasePrice: transaction.totalPurchasePrice,
                items: formattedItems
            };
        }));

        res.status(200).json({msg: "Success", transactions: transactionResponse});
    } catch (e) {
        res.status(500).json({msg: e.message});
    }
}

export const getTransactionsByMonthAndPaymentStatus = async (req, res) => {
    try {
        const {month, year, status} = req.query;

        if (!month || !year) {
            return res.status(400).json({msg: "Month and year are required"});
        }

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59, 999);

        const transactions = await TransactionModel.findAll({
            where: {
                transactionDate: {
                    [Op.between]: [startDate, endDate]
                },
                paymentStatus: status
            },
            include: [
                {
                    model: CustomerAddressModel,
                    attributes: ['title', 'receiverName', 'phone', 'fullAddress', 'latitude', 'longitude', 'notes']
                },
                {
                    model: UserModel
                }
            ]
        });


        // Loop through transactions to get cart items
        const transactionResponse = await Promise.all(transactions.map(async (transaction) => {
            const itemsInCart = await OrderModel.findAll({
                where: {cartId: transaction.cartId},
                include: [
                    {
                        model: ServiceModel,
                        attributes: ['serviceName', 'price']
                    }
                ]
            });

            // Format items with service name
            const formattedItems = itemsInCart.map(item => ({
                id: item.id,
                washStatus: item.washStatus,
                imageUrl: item.imageUrl,
                serviceName: item.service.serviceName, // Access the service name
                price: item.service.price
            }));

            // Add customer address details
            const customerAddress = transaction.customerAddress;

            return {
                id: transaction.id,
                cart: transaction.cartId,
                user: transaction.user.name,
                deliveryMethod: transaction.deliveryMethod,
                deliveryStatus: transaction.deliveryStatus,
                paymentMethod: transaction.paymentMethod,
                customerAddress: {
                    id: customerAddress.id,
                    title: customerAddress.title,
                    receiverName: customerAddress.receiverName,
                    phone: customerAddress.phone,
                    fullAddress: customerAddress.fullAddress,
                    latitude: customerAddress.latitude,
                    longitude: customerAddress.longitude,
                    notes: customerAddress.notes
                },
                paymentStatus: transaction.paymentStatus,
                totalPurchasePrice: transaction.totalPurchasePrice,
                items: formattedItems
            };
        }));

        res.status(200).json({msg: "Success", transactions: transactionResponse});
    } catch (e) {
        res.status(500).json({msg: e.message});
    }
}




export const updateDeliveryStatus = async (req, res) => {
    const {id, status} = req.query;
    try {
        const transaction = await TransactionModel.findByPk(id);
        if (!transaction) {
            return res.status(404).json({msg: "Transaction not found"});
        }
        await transaction.update({deliveryStatus: status});
        res.status(200).json({msg: "Delivery status updated successfully", transaction});
    } catch (e) {
        console.error(e);
        res.status(400).json({msg: "Failed to update delivery status", e});
    }
}

export const getTransactionById = async (req, res) => {
    const {id} = req.params;
    try {
        const transactions = await TransactionModel.findAll({
            where: {userId: id}
        });

        // Loop through transactions to get cart items
        const transactionResponse = await Promise.all(transactions.map(async (transaction) => {
            const itemsInCart = await OrderModel.findAll({
                where: {cartId: transaction.cartId},
                include: [
                    {
                        model: ServiceModel,
                        attributes: ['serviceName', 'price']
                    }
                ]
            });

            // Format items with service name
            const formattedItems = itemsInCart.map(item => ({
                id: item.id,
                washStatus: item.washStatus,
                imageUrl: item.imageUrl,
                serviceName: item.service.serviceName, // Access the service name
                price: item.service.price
            }));

            return {
                id: transaction.id,
                cart: transaction.cartId,
                deliveryMethod: transaction.deliveryMethod,
                deliveryStatus: transaction.deliveryStatus,
                paymentMethod: transaction.paymentMethod,
                paymentStatus: transaction.paymentStatus,
                totalPurchasePrice: transaction.totalPurchasePrice,
                items: formattedItems
            };
        }));

        res.status(200).json({msg: "Success", transactions: transactionResponse});
    } catch (e) {
        res.status(500).json({msg: e.message}); // It's better to send back the error message only
    }
};

export const getTransactionsByDeliveryStatus = async (req, res) => {
    const {status} = req.query;

    try {
        const transactions = await TransactionModel.findAll({
            where: {deliveryStatus: status},
            include: [
                {
                    model: CustomerAddressModel,
                    attributes: ['title', 'receiverName', 'phone', 'fullAddress', 'latitude', 'longitude', 'notes']
                },
                {
                    model: UserModel
                }
            ]
        });

        // Loop through transactions to get cart items
        const transactionResponse = await Promise.all(transactions.map(async (transaction) => {
            const itemsInCart = await OrderModel.findAll({
                where: {cartId: transaction.cartId},
                include: [
                    {
                        model: ServiceModel,
                        attributes: ['serviceName', 'price']
                    }
                ]
            });

            // Format items with service name
            const formattedItems = itemsInCart.map(item => ({
                id: item.id,
                washStatus: item.washStatus,
                imageUrl: item.imageUrl,
                serviceName: item.service.serviceName, // Access the service name
                price: item.service.price
            }));

            // Add customer address details
            const customerAddress = transaction.customerAddress;

            return {
                id: transaction.id,
                cart: transaction.cartId,
                user: transaction.user.name,
                email: transaction.user.email,
                deliveryMethod: transaction.deliveryMethod,
                deliveryStatus: transaction.deliveryStatus,
                paymentMethod: transaction.paymentMethod,
                customerAddress: {
                    id: customerAddress.id,
                    title: customerAddress.title,
                    receiverName: customerAddress.receiverName,
                    phone: customerAddress.phone,
                    fullAddress: customerAddress.fullAddress,
                    latitude: customerAddress.latitude,
                    longitude: customerAddress.longitude,
                    notes: customerAddress.notes
                },
                paymentStatus: transaction.paymentStatus,
                totalPurchasePrice: transaction.totalPurchasePrice,
                items: formattedItems
            };
        }));

        res.status(200).json({msg: "Success", transactions: transactionResponse});
    } catch (e) {
        res.status(500).json({msg: e.message});
    }
}


export const sendFinishCleaningEmailToCustomer = async (req, res) => {
    const { email, name } = req.body;
    try {
        let config = {
            host: "smtp.gmail.com",
            service: "gmail",
            auth: {
                user: process.env.GMAIL_APP_USER,
                pass: process.env.GMAIL_APP_PASSWORD
            }
        };

        let transporter = nodemailer.createTransport(config);

        let message = {
            from: process.env.GMAIL_APP_USER,
            to: email,
            subject: "Your Order is Ready for Pickup",
            html: `
                <p>Dear ${name},</p>
                <p>We are pleased to inform you that your order has been completed. Your items are now ready for pickup at your convenience.</p>
                <p>Thank you for choosing our services. We look forward to serving you again in the future.</p>
                <p>Best regards,</p>
                <p>Triagnle Sneacare Team</p>
            `
        };

        transporter.sendMail(message).then((info) => {
            return res.status(200).json({
                msg: "Email sent successfully",
                info: info.messageId,
                preview: nodemailer.getTestMessageUrl(info)
            });
        }).catch((err) => {
            console.error(err); // Log the error for debugging purposes
            return res.status(500).json({ msg: err.message }); // Respond with the error message
        });
    } catch (e) {
        console.error(e); // Log the error for debugging purposes
        return res.status(500).json({ msg: e.message }); // Respond with the error message
    }
};
