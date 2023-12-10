
import ItemTypeModel from "../models/ItemTypeModel.js";

export const addItemType = async (req, res) => {
 try {
     const {itemType } = req.body;


     const newType = await ItemTypeModel.create({ itemType });
     res.status(201).json({ msg: "item type added successfully", newType });

 }catch (e) {
     res.status(400).json({ msg: e.message || "An error occurred while adding the item type" });

 }
}

export const deleteItemType = async (req, res) => {
    try {
        const {id} = req.params;

        const role = await ItemTypeModel.findOne({where: {id}});

        if (!role) {
            return res.status(404).json({msg: "Item type not found"});
        }

        await ItemTypeModel.destroy({where: {id}});

        res.status(200).json({msg: "item type deleted successfully"});
    } catch (error) {
        console.error("Error deleting item type:", error);

        res.status(500).json({msg: "Internal server error"});
    }
};
