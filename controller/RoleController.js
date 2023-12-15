import RoleModel from "../models/RoleModel.js";

export const addRole = async (req, res) => {
    try {
        const { role } = req.body;

        const newRole = await RoleModel.create({ role });

        res.status(201).json({ msg: "Role added successfully", newRole });
    } catch (e) {
        res.status(400).json({ msg: e.message || "An error occurred while adding" +
                " the role" });
    }
}


export const deleteRole = async (req, res) => {
    try {
        const {id} = req.params;

        // Check if the role exists
        const role = await RoleModel.findOne({where: {id}});

        if (!role) {
            return res.status(404).json({msg: "Role not found"});
        }

        // Delete the role
        await RoleModel.destroy({where: {id}});

        // Sending success message
        res.status(200).json({msg: "Role deleted successfully"});
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error deleting role:", error);

        // Send an error response
        res.status(500).json({msg: "Internal server error"});
    }
};
