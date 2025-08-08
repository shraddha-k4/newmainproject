import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { User } from '../model/User.js';

dotenv.config();

export const signup = async (req, res) => {
    try {
        const { name, email, mobileno, password, role } = req.body;


        if (!name || !email || !mobileno || !password) {
            return res.status(400).json(
                {
                    message: "All fields are required"
                });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }

        // Validate 10-digit numeric mobile number
        if (!/^\d{10}$/.test(mobileno)) {
            return res.status(400).json({ message: "Mobile number must be exactly 10 digits" });
        }



        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                message: "Email already exist"
            });
        }

        const hashpassword = await bcrypt.hash(password, 10);

        //create new user
        const newUser = await User.create({
            name,
            email,
            password: hashpassword,
            mobileno,
            role,
        })
        res.status(201).json(
            {
                message: "Your Account is Created Successfully!!", user: newUser
            });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error:", error: error.message
        });
    }
}


//create log in account
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid Email"
            });
        }

        const isMatchPassword = await bcrypt.compare(password, user.password);

        if (!isMatchPassword) {
            return res.status(400).json({
                message: "Incorrect Password"
            });
        }


        //Generate token
        const token = jwt.sign({
            id: user.id,
            role: user.role,
            name: user.name,
        }, process.env.JWT_SECRET, {
      expiresIn: '24h' 
    });

        res.status(200).json({
            message: "Login Successful!", token,
            user: {
                id: user.id,
                name: user.name,
                role: user.role,
                email: user.email,
                mobileno:user.mobileno,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Login Failed", error: error.message
        });
    }
}

//forgot password
export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User not found with that email" });
    }

    // Ideally: generate reset token & email to user
    // For now, just return a message
    res.status(200).json({
        message: "Reset link sent to your email (mocked)",
    });
};


//protected route 
export const protectedRoute = async (req, res) => {
    res.json({
        message: "Welcome! You are Authorized", user: req.user
    });
}