import axios from "axios";

export const geoCode = async (req, res) => {
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
