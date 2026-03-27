import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../libs/utils.js';
import { sendWelcomeEmail } from '../emails/emailHandllers.js';
import dotenv from 'dotenv';

dotenv.config();


export const signup = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide all the required fields"
            });
        }
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long"
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address"
            });
        }
        const isExistingUser = await User.findOne({ email });
        if (isExistingUser) {
            return res.status(400).json({
                success: false,
                message: "User with this email already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });
        if (newUser) {
            await newUser.save();
            generateToken(newUser._id, res);

            try {
                await sendWelcomeEmail(email, fullName, process.env.CLIENT_URL);
            } catch (error) {
                console.error('Error sending welcome email:', error);
            }
            return res.status(201).json({
                success: true,
                message: "User created successfully",
                user: {
                    _id: newUser._id,
                    fullName: newUser.fullName,
                    email: newUser.email,
                    profilePic: newUser.profilePic
                }
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid user data"
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        })
    }
}

export const login = async (req , res ) => {
    try {
        const { email , password} = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide all the required fields"
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json ({
                success : false ,
                message : "Invalid email or password"
            })
        }
        const isPasswordMatch = await bcrypt.compare (password , user.password);

        if (!isPasswordMatch){
            return res.status(400).json ({
                success : false ,
                message : "Invalid email or password"
            })
        }
        generateToken (user._id , res);

        return res.status(200).json ({
            success : true,
            message : "Logged in successfully",
            user : {
                _id : user._id,
                fullName : user.fullName,
                email : user.email,
                profilePic : user.profilePic
            }
        })
    } catch (error) {
        return res.status(500).json ({
            success : false ,
            message : "Server error"
        })
    }
}

export const logout = async (req , res)=> {
    try {
        res.clearCookie('jwt', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        return res.status(200).json ({
            success : true ,
            message : "Logged out successfully"
        })
    } catch (error) {
        return res.status(500).json ({
            success : false ,
            message : "Server error"
        })
    }
}