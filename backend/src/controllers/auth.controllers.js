import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../libs/utils.js';


export const signup = async (req, res) => {
    const { fullName , email , password } = req.body;
    try {
        if (!fullName || !email || !password ){
            return res.status(400).json ({
                success : false ,
                message : "Please provide all the required fields"
            });
        }
        if (password.length < 6){
            return res.status (400).json ({
                success : false ,
                message : "Password must be at least 6 characters long"
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)){
            return res.status (400).json ({
                success : false ,
                message : "Please provide a valid email address"
            });
        }
        const isExistingUser = await User.findOne ({email});
        if (isExistingUser){
            return res.status (400).json ({
                success : false ,
                message : "User with this email already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User ({
            fullName,
            email,
            password : hashedPassword
        });
        if (newUser){
            await newUser.save();
            generateToken(newUser._id, res);
            return res.status (201).json ({
                success : true,
                message : "User created successfully",
                user : {
                    _id : newUser._id,
                    fullName : newUser.fullName,
                    email : newUser.email,
                    profilePic : newUser.profilePic
                }
            })
        }else {
            return res.status (400).json ({
                success : false,
                message : "Invalid user data"
            })
        }
    } catch (error) {
        return res.status (500).json ({
            success : false ,
            message : "Server error",
            error : error.message
        })
    }
}