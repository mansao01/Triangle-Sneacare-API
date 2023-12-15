import TransactionModel from "../models/TransactionModel.js";
import dateFormat from "dateformat";
import multer from "multer";
import ImgUpload from "../modules/imgUpload.js";
// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({storage: storage});


export const addTransaction = (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({msg: err.message});
        }

        const {confirmed, washStatus, productId, userId} = req.body;
        const transactionDate = new Date();
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
                    const newTransaction = await TransactionModel.create({
                        transactionDate: transactionDate,
                        confirmed: confirmed,
                        washStatus: washStatus,
                        imageUrl: imageUrl,
                        productId: productId,
                        userId: userId
                    });

                    // If transaction is created successfully, send a success response
                    return res.status(201).json({msg: 'Transaction created successfully', transaction: newTransaction});
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
