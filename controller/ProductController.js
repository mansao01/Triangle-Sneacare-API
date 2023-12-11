import ProductModel from "../models/ProductModel.js";
import ItemTypeModel from "../models/ItemTypeModel.js";
import multer from "multer";
import ImgUpload from "../modules/imgUpload.js";

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const addProduct = async (req, res) => {
    const {productName, price, itemTypeId} = req.body;

    try {
        const product = await ProductModel.create({
            productName: productName,
            price: price,
            itemTypeId: itemTypeId
        });

        const itemType = await ItemTypeModel.findByPk(itemTypeId);

        const productResponse = {
            id: product.id,
            productName: product.productName,
            price: product.price,
            itemType: {
                id: itemType.id,
                itemType: itemType.itemType
            }
        }
        res.status(200).json({msg: "Product added successfully", product: productResponse});
    } catch (error) {
        console.error(error);
        res.status(400).json({msg: "Failed to add product", error});
    }
}
export const addImageProduct = (req, res) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            // Handle multer error (if any)
            return res.status(400).json({ msg: err.message });
        }

        const data = req.body;

        // Call ImgUpload function to upload to GCS
        ImgUpload.uploadToGcs(req, res, () => {
            if (req.file && req.file.cloudStoragePublicUrl) {
                data.imageUrl = req.file.cloudStoragePublicUrl;

                // Return the data with the added image URL in the response
                return res.status(200).json({ msg: 'Image uploaded successfully', data: data });
            } else {
                // Handle case where file or file URL is missing
                return res.status(400).json({ msg: 'File upload failed or file URL is missing.' });
            }
        });
    });
};
export const deleteProduct = async (req, res) => {
    try {
        const {id} = req.params;

        const product = await ProductModel.findOne({where: {id}});

        if (!product) {
            return res.status(404).json({msg: "Product not found"});
        }

        await ProductModel.destroy({where: {id}});

        res.status(200).json({msg: "Product deleted successfully"});
    } catch (e) {
        console.log("Error deleting product:", e);
        res.status(500).json({msg: "Internal server error"});
    }
}


export const getProducts = async (req, res) => {
    try {
        const products = await ProductModel.findAll({
            include: ItemTypeModel
        });

        res.status(200).json({ products: products });
    } catch (e) {
        console.log("Error getting products:", e);
        res.status(500).json({ msg: "Internal server error" });
    }
}
