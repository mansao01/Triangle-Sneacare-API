import ServiceModel from "../models/ServiceModel.js";
import CategoryModel from "../models/CategoryModel.js";
import multer from "multer";
import ImgUpload from "../modules/imgUpload.js";

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

export const addService = async (req, res) => {
    const {serviceName, price, categoryId, serviceDescription} = req.body;

    try {
        const product = await ServiceModel.create({
            serviceName: serviceName,
            price: price,
            serviceDescription: serviceDescription,
            categoryId: categoryId
        });

        const category = await CategoryModel.findByPk(categoryId);

        const serviceResponse = {
            id: product.id,
            serviceName: product.serviceName,
            serviceDescription: product.serviceDescription,
            price: product.price,
            itemType: {
                id: category.id,
                itemType: category.itemType
            }
        }
        res.status(200).json({msg: "service added successfully", product: serviceResponse});
    } catch (error) {
        console.error(error);
        res.status(400).json({msg: "Failed to add service", error});
    }
}
export const addImageProduct = (req, res) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            // Handle multer error (if any)
            return res.status(400).json({msg: err.message});
        }

        const data = req.body;

        // Call ImgUpload function to upload to GCS
        ImgUpload.uploadToGcs(req, res, () => {
            if (req.file && req.file.cloudStoragePublicUrl) {
                data.imageUrl = req.file.cloudStoragePublicUrl;

                // Return the data with the added image URL in the response
                return res.status(200).json({msg: 'Image uploaded successfully', data: data});
            } else {
                // Handle case where file or file URL is missing
                return res.status(400).json({msg: 'File upload failed or file URL is missing.'});
            }
        });
    });
};
export const deleteService = async (req, res) => {
    try {
        const {id} = req.params;

        const service = await ServiceModel.findOne({where: {id}});

        if (!service) {
            return res.status(404).json({msg: "service not found"});
        }

        await ServiceModel.destroy({where: {id}});

        res.status(200).json({msg: "service deleted successfully"});
    } catch (e) {
        console.log("Error deleting product:", e);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const getServicesByCategory = async (req, res) => {
    const {categoryId} = req.query;

    try {
        const service = await ServiceModel.findAll({
            where: {categoryId: categoryId},
            order: [['serviceName', 'ASC']],
            include: CategoryModel
        });

        res.status(200).json({service: service});
    } catch (e) {
        console.log("Error getting Services:", e);
        res.status(500).json({msg: e});
    }
}

export const getServices = async (req, res) => {
    try {
        const service = await ServiceModel.findAll({
            include: CategoryModel
        });
        const serviceCount = service.length; // Get the count of services

        res.status(200).json({service: service});
    } catch (e) {
        console.log("Error getting services:", e);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const updateService = async (req, res) => {

    const {id, serviceName, price, serviceDescription} = req.body;

    try {
        await ServiceModel.update({
            serviceName: serviceName,
            price: price,
            serviceDescription: serviceDescription
        }, {
            where: {id}
        })

        return res.status(200).json({msg: "Service updated successfully"});
    } catch (e) {
        return res.status(500).json({msg: e});
    }
}
