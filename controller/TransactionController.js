import TransactionModel from "../models/TransactionModel.js";
import dateFormat from "dateformat";
import multer from "multer";
// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({storage: storage});


export const addTransaction = async (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            // Handle multer error (if any)
            return res.status(400).json({msg: err.message});
        }

        const {confirmed, washStatus, orderById, productId, cartId} = req.body;
        const transactionDate = dateFormat(new Date(), "yyyymmdd-HHMMss");
        let imageUrl = ""

        // If a file is uploaded, upload it to Google Cloud Storage and update the imageUrl
        if (req.file && req.file.cloudStoragePublicUrl) {
            imageUrl = req.file.cloudStoragePublicUrl;
        }

        try {
            // Create a new transaction using Sequelize's create method
            const newTransaction = await TransactionModel.create({
                transactionDate: transactionDate,
                confirmed: confirmed,
                washStatus: washStatus,
                imageUrl: imageUrl,
                orderedBy: orderById,
                productId: productId,
                cartId: cartId
            });

            // If transaction is created successfully, send a success response
            return res.status(201).json({msg: 'Transaction created successfully', transaction: newTransaction});
        } catch (error) {
            // If there's an error during creation, handle it and send an error response
            return res.status(500).json({msg: 'Failed to create transaction', details: error.message});
        }
    })
}
