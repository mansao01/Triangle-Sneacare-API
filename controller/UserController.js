import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import RoleModel from "../models/RoleModel.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import ImgUpload from "../modules/imgUpload.js";
import multer from "multer";
import userModel from "../models/UserModel.js";

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

export const register = async (req, res) => {
    const {name, email, password, roleId} = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    if (password.length < 6) {
        return res.status(400).json({msg: "Password must be at least 6 characters long"});
    }

    try {
        const emailCheck = await userModel.findOne({
            where: {email}
        });
        if (emailCheck) {
            return res.status(400).json({msg: "Email already exists"});
        }

        const role = await RoleModel.findByPk(roleId);

        if (!role) {
            return res.status(404).json({msg: "Role not found"});
        }


        let config = {
            host: "smtp.gmail.com",
            service: "gmail",
            auth: {
                user: process.env.GMAIL_APP_USER,
                pass: process.env.GMAIL_APP_PASSWORD
            }
        }

        let transporter = nodemailer.createTransport(config);


        const user = await UserModel.create({
            name: name,
            email: email,
            password: hashedPassword,
            roleId: roleId,
        });

        const userResponse = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: {
                id: role.id,
                role: role.role
            }
        };

        let message = {
            from: process.env.GMAIL_APP_USER,
            to: email,
            subject: "Account Verification",
            html: `
        <p>Hello ${name},</p>
        <p>Welcome to Triangle Sneacare! Please verify your email by clicking the button below:</p>
        <a href="http://localhost:8080/v1/verify-email/${user.id}" style="display: inline-block; padding: 10px 20px; background-color: #3498db; color: #fff; text-decoration: none; border-radius: 5px;">Verify Email</a>
        <p>If you are unable to click the button, you can also copy and paste the following link into your browser:</p>
        <p>http://localhost:8080/v1/verify-email/${user.id}</p>
        <p>Thank you for choosing Triangle Sneacare!</p>

    `
        }

        transporter.sendMail(message).then((info) => {
            return res.status(201).json({
                msg: "Registration successful",
                user: userResponse,
                info: info.messageId,
                preview: nodemailer.getTestMessageUrl(info)
            })
        }).catch((err) => {
            console.error(err); // Log the error for debugging purposes
            return res.status(500).json({msg: err.message}); // Respond with the error message
        })
    } catch (error) {
        console.error(error);
        // Handle other errors
        res.status(400).json({msg: "Registration failed due to an error", error});
    }
};

export const verifyEmail = async (req, res) => {
    try {
        const id = req.params.id

        const user = await UserModel.findOne({
            where: {
                id: id
            }
        })

        if (!user) {
            return res.status(400).json({msg: "User not found"})
        } else {
            await userModel.update({
                isVerified: true
            }, {
                where: {
                    id: id
                }
            })
        }

        res.status(200).json({msg: "Email verified successfully"})
    } catch (e) {
        res.status(400).json({msg: "Invalid user id"})
    }
}

export const registerDriver = async (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({msg: err.message});
        }
        const {name, email, password, address, phone} = req.body;
        const roleId = 3
        let imageUrl = '';

        let config = {
            host: "smtp.gmail.com",
            service: "gmail",
            auth: {
                user: process.env.GMAIL_APP_USER,
                pass: process.env.GMAIL_APP_PASSWORD
            }
        }

        let transporter = nodemailer.createTransport(config);

        let message = {
            from: process.env.GMAIL_APP_USER,
            to: email,
            subject: "Welcome to Triangle Sneaker",
            text: "You have successfully registered as driver in Triangle Sneaker"
        }


        if (password.length < 6) {
            return res.status(400).json({msg: "Password must be at least 6 characters long"});
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        ImgUpload.uploadToGcs(req, res, async (err) => {
            if (req.file && req.file.cloudStoragePublicUrl) {
                imageUrl = req.file.cloudStoragePublicUrl
            }

            try {
                const user = await UserModel.create({
                    name: name,
                    email: email,
                    password: hashedPassword,
                    roleId: roleId,
                    address: address,
                    phone: phone,
                    pictureUrl: imageUrl
                });

                const role = await RoleModel.findByPk(roleId);

                if (!role) {
                    return res.status(404).json({msg: "Role not found"});
                }

                // Build the user response object with role details
                const userResponse = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    pictureUrl: user.pictureUrl,
                    role: {
                        id: role.id,
                        role: role.role
                    }
                };

                transporter.sendMail(message).then((info) => {
                    return res.status(201).json({
                        msg: "Registration successful",
                        user: userResponse,
                        info: info.messageId,
                        preview: nodemailer.getTestMessageUrl(info)
                    })
                }).catch((err) => {
                    console.error(err); // Log the error for debugging purposes
                    return res.status(500).json({msg: err.message}); // Respond with the error message
                })
            } catch (error) {
                console.error(error);
                // Handle other errors
                res.status(400).json({msg: "Registration failed due to an error", error: err + error});
            }
        })

    })

};


export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await UserModel.findOne(
            {where: {email}}
        );

        if (!user) {
            return res.status(400).json({msg: "Email not found"});
        }

        if (!user.isVerified) {
            return res.status(400).json({msg: "Please verify your email first, check your email"});
        }
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({msg: "Wrong password"});
        }

        const {id, name, roleId, isVerified} = user;
        const accessToken = jwt.sign({id, name, email, roleId}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "7d"
        });

        const refreshToken = jwt.sign({id, name, email, roleId}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "7d"
        });

        await UserModel.update({refresh_token: refreshToken}, {
            where: {id}
        });

        const role = await RoleModel.findByPk(roleId);
        res.status(200).json({
            msg: "Login successful",
            user: {
                id,
                name,
                email,
                isVerified,
                role: {
                    id: role.id,
                    role: role.role
                }
            }, accessToken, refreshToken
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({msg: "Login failed due to an error"});
    }
}


export const updateUser = async (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({msg: err.message});
        }

        const id = req.user.id;
        const {name, address, phone} = req.body;
        let imageUrl = '';

        const user = await UserModel.findOne({where: {id}});
        if (!user) {
            return res.status(404).json({msg: "User not found"});
        }

        ImgUpload.uploadToGcs(req, res, async (err) => {
            if (req.file && req.file.cloudStoragePublicUrl) {
                imageUrl = req.file.cloudStoragePublicUrl
            }

            try {
                await UserModel.update({
                    name: name,
                    address: address,
                    phone: phone,
                    pictureUrl: imageUrl
                }, {
                    where: {id}
                });

                const updatedUser = await UserModel.findOne({where: {id}});

                return res.status(200).json({msg: "User updated successfully", data: updatedUser});
            } catch (e) {
                return res.status(500).json({msg: e + err});
            }
        })

    })
}
export const logoutUser = async (req, res) => {
    try {
        const {refreshToken} = req.body;

        if (!refreshToken) {
            return res.status(400).json({msg: "Refresh token not found"});
        }

        await UserModel.update({refresh_token: null}, {
            where: {refresh_token: refreshToken}
        });

        res.status(200).json({msg: "Logout successful"});
    } catch (error) {
        console.error(error);
        res.status(400).json({msg: "Logout failed due to an error"});
    }
}

export const getProfile = async (req, res) => {
    try {
        const loggedInUserId = req.user.id; // Access user ID from the request

        // Fetch logged-in user's data
        const loggedInUser = await UserModel.findByPk(loggedInUserId, {
            attributes: ['id', 'name', 'email', "roleId"]
        });

        if (!loggedInUser) {
            return res.status(404).json({msg: "Logged-in user not found"});
        }


        const userRole = await RoleModel.findByPk(loggedInUser.roleId);
        console.log(loggedInUser.roleId)
        const profileResponse = {
            id: loggedInUser.id,
            name: loggedInUser.name,
            email: loggedInUser.email,
            role: {
                id: userRole.id,
                name: userRole.role
            }
        }

        res.status(200).json({msg: "Success", profile: profileResponse})
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({msg: "Internal server error"});
    }
};


export const getDrivers = async (req, res) => {
    try {
        const drivers = await UserModel.findAll({
            where: {roleId: 3},
            attributes: ['id', 'name', 'email', 'address', 'phone', 'pictureUrl'],
            include: [{model: RoleModel}]
        });

        res.status(200).json({msg: "Success", drivers})
    } catch (error) {
        console.error("Error fetching drivers:", error);
        res.status(500).json({msg: "Internal server error"});
    }
}
