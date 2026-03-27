import jwt from 'jsonwebtoken';
import ENV from '../env.js';
import User from '../models/User.js';

export const protectedRoute = (req , res , next) => {
    try {
        const token = req.cookies.jwt;
        if (!token){
            return res.status (401).json ({
                success : false,
                message : "unauthorized"
            })
        }

        const decoded = jwt.verify (token , ENV.JWT_SECRET);
        if (!decoded){
            return res.status (401).json ({
                success : false,
                message : "Unauthorized"
            });
        }

        const user = User.findById(decoded.userId).select("-password");
        if (!user){
            return res.status (401).json ({
                success : false,
                message : "Unauthorized"
            });
        }
        req.user = user ;
        next ();
    }
    catch (error) {
        return res.status (500).json ({
            success : false,
            message : "Internal Server Error"
        });
    }

}

export const check = (req , res) => {   
   return res.status(200).json({
        success: true,
        message: "User is authenticated",
        user: {
            _id: req.user._id,
            fullName: req.user.fullName,
            email: req.user.email,
            profilePic: req.user.profilePic
        }
    });
}