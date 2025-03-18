const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { generateToken, verifyToken } = require("./middleware/auth");

// SIGN IN API (Register a new user)
router.post("/sign-in", async (req, res) => {
    try {
        console.log("request => ", req.body);

        const { username, email, password } = req.body;

        // Check if user exists
        if (await User.findOne({ username })) {
            return res.status(400).json({ message: "User already exists" });
        }

        if (await User.findOne({ email })) {
            return res.status(400).json({ message: "Email already exists" });
        }

        if (username.length < 4) {
            return res.status(400).json({ message: "Username should have at least 4 characters" });
        }

        // Hash password
        const hashPass = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new User({
            username,
            email,
            password: hashPass,
        });

        // Save the user to the database
        await newUser.save();

        // Generate JWT token
        const token = generateToken(newUser._id);

        return res.status(200).json({ message: "Sign-in successful", token });

        // Set token in HTTP-only cookie (better security practice)
        // res.cookie("token", token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === "production",  // Enforce HTTPS for production
        //     expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)  // 2 days expiration
        // }).json({ message: "Sign-in successful" });

    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


// LOG IN API (Authenticate the user)

router.post("/log-in", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const existingUser = await User.findOne({ username });

        if (!existingUser) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare the provided password with the stored hashed password in the database
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate a JWT token for the authenticated user
        const token = generateToken(existingUser._id);

        res.status(200).json({ id: existingUser._id, token });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports = router;


// {
//     "username" :"ahmed",
//     "password" : "ahmed123"
// }