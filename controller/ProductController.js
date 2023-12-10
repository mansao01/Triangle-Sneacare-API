import ProductModel from "../models/ProductModel.js";
import ItemTypeModel from "../models/ItemTypeModel.js";


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
