import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import RoleModel from "../models/RoleModel.js";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    const {name, email, password, roleId} = req.body;

    if (password.length < 6) {
        return res.status(400).json({msg: "Password must be at least 6 characters long"});
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const user = await UserModel.create({
            name: name,
            email: email,
            password: hashedPassword,
            roleId: roleId
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
            password: user.password,
            updatedAt: user.updatedAt,
            createdAt: user.createdAt,
            role: {
                id: role.id,
                role: role.role
            }
        };

        res.status(200).json({msg: "Registration successful", user: userResponse});
    } catch (error) {
        // Handle specific errors
        if (error.name === 'SequelizeUniqueConstraintError') {
            // Duplicate key error (e.g., email already exists)
            return res.status(400).json({msg: "Email already exists"});
        }
        console.error(error);
        // Handle other errors
        res.status(400).json({msg: "Registration failed due to an error"});
    }
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

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({msg: "Wrong password"});
        }

        const {id, name, roleId} = user;
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
        res.status(200).json({msg: "Login successful", user: {id, name, email, role},accessToken, refreshToken});
    } catch (error) {
        console.error(error);
        res.status(400).json({msg: "Login failed due to an error"});
    }
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
