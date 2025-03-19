import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { Admin } from '../models/Admin.js';
import sendMail from '../controllers/sendMailController.js';


// User SignUp
export const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        try {
            await sendMail(email, 'Registration Confirm!!!', `Your Role is: <b>${role}</b>`);
        } catch (error) {
            return res.status(500).json({ error: "Failed to send email" });
        }

        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json({ message: "User registered Successfully."});
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};

// User Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
        user.tokens.push({ token });
        await user.save();

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};
