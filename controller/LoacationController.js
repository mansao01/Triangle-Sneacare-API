import axios from "axios";

export const geoCodeWithAddress = async (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.status(400).json({
            message: "Address is required"
        })
    }
    const apiKey = process.env.MAP_KEY;
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;

    try {
        const response = await axios.get(apiUrl);
        const result = response.data

        res.status(200).json({
            message: "Success",
            data: result
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

export const geoCodeWithPlaceId = async (req, res) => {
    const placeId = req.query.placeId;
    if (!placeId) {
        return res.status(400).json({
            message: "Place id is required"
        })
    }
    const apiKey = process.env.MAP_KEY;
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${apiKey}`;

    try {
        const response = await axios.get(apiUrl);
        const result = response.data

        res.status(200).json({
            message: "Success",
            data: result
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

export const autoCompleteAddress = async (req, res) => {
    const address = req.query.address;
    const apiKey = process.env.MAP_KEY;
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${address}&key=${apiKey}`

    try {
        const response = await axios.get(apiUrl);
        const result = response.data

        res.status(200).json({
            message: "Success",
            data: result
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}


export const calculateDistance = async (req, res) => {

    const origin = req.query.origin;
    const destination = "-6.8060505,110.8290513"; // triangle latLng
    const apiKey = process.env.MAP_KEY;
    const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`

    try {
        const response = await axios.get(apiUrl);
        const result = response.data

        res.status(200).json({
            message: "Success",
            data: result
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
