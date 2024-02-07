import axios from "axios";
import CustomerAddressModel from "../models/CustomerAddressModel.js";


export const createCustomerAddress = async (req, res) => {
    const {title, receiverName, phone, fullAddress, note} = req.body;
    const id = req.user.id;
    const apiKey = process.env.MAP_KEY;

    try {
        const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${fullAddress}&key=${apiKey}`;

        const response = await axios.get(apiUrl);
        const result = response.data;

        // Access latitude and longitude
        const {lat, lng} = result.results[0].geometry.location;

        const customerAddress = await CustomerAddressModel.create({
            title: title,
            receiverName: receiverName,
            phone: phone,
            fullAddress: fullAddress,
            latitude: lat,
            longitude: lng,
            notes: note,
            userId: id,
        });

        return res.status(200).json({
            message: "Address created successfully",
            address: customerAddress,
        });
    } catch (error) {
        console.error("Error creating customer address:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};


export const getCustomerAddresses = async (req, res) => {
    const id = req.user.id;

    try {
        const customerAddress = await CustomerAddressModel.findAll({
            where: {userId: id},
        });

        return res.status(200).json({
            message: "Success",
            address: customerAddress,
        });
    } catch (e) {
    }
}

export const updateCustomerAddress = async (req, res) => {
    const {id, title, receiverName, phone, fullAddress, note} = req.query;
    const userId = req.user.id;
    const apiKey = process.env.MAP_KEY;

    try {
        const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${fullAddress}&key=${apiKey}`;

        const response = await axios.get(apiUrl);
        const result = response.data;

        // Access latitude and longitude
        const {lat, lng} = result.results[0].geometry.location;

        const customerAddress = await CustomerAddressModel.update({
            title: title,
            receiverName: receiverName,
            phone: phone,
            fullAddress: fullAddress,
            latitude: lat,
            longitude: lng,
            notes: note,
        }, {
            where: {
                id: id,
                userId: userId,
            },
        });

        return res.status(200).json({
            message: "Address updated successfully",
            address: customerAddress,
        });
    } catch (error) {
        console.error("Error updating customer address:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}


export const deleteCustomerAddress = async (req, res) => {
    const {id} = req.query;
    const userId = req.user.id;

    try {
        const customerAddress = await CustomerAddressModel.destroy({
            where: {
                id: id,
                userId: userId,
            }
        });

        return res.status(200).json({
            message: "Address deleted successfully",
            address: customerAddress,
        });
    } catch (error) {
        console.error("Error deleting customer address:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}
