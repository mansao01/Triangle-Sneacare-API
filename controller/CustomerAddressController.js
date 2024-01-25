import axios from "axios";
import CustomerAddressModel from "../models/CustomerAddressModel.js";


export const createCustomerAddress = async (req, res) => {
    const {title, fullAddress, note} = req.body;
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
    }catch (e) {

    }
}
