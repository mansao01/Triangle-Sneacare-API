
import CategoryModel from "../models/CategoryModel.js";

export const addCategory = async (req, res) => {
 try {
     const {itemType } = req.body;


     const newType = await CategoryModel.create({ itemType });
     res.status(201).json({ msg: "Category added successfully", newType });

 }catch (e) {
     if (e.name === 'SequelizeUniqueConstraintError') {
         // Duplicate key error (e.g., email already exists)
         return res.status(400).json({msg: "Category already exists"});
     }
     res.status(400).json({ msg: e.message || "An error occurred while adding the item type" });

 }
}

export const getCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.findAll();

        res.status(200).json({categories});
    } catch (error) {
        console.error("Error getting item types:", error);

        res.status(500).json({msg: "Internal server error"});
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const {id} = req.params;

        const role = await CategoryModel.findOne({where: {id}});

        if (!role) {
            return res.status(404).json({msg: "Item type not found"});
        }

        await CategoryModel.destroy({where: {id}});

        res.status(200).json({msg: "item type deleted successfully"});
    } catch (error) {
        console.error("Error deleting item type:", error);

        res.status(500).json({msg: "Internal server error"});
    }
};
