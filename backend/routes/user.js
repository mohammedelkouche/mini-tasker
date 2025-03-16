const router = require("express").Router();
const User = require ("../models/user");
const bcrypt = require ("bcryptjs");
const jwt = require ("jsonwebtoken");
require("dotenv").config();


// SIGN IN API  

router.post("/sign-in",async(req, res) => {
    try {

        // 
        console.log("request => ", req.body);

        const { username } = req.body;
        const { email } = req.body;
        const existingUser = await User.findOne({username : username});
        const existingeEmail = await User.findOne({email : email});
        if (existingUser)
            return res.status(400).json({message : "user alreadi existe"})
        else if (username.length < 3)
            return res.status(400).json({message : "username should have atleast 4 characters"})
        if (existingeEmail)
            return res.status(400).json({message : "email alreadi existe"})
        const hashPass = await bcrypt.hash(req.body.password, 10); // relation await with 10 ?

        const newUser = new User ( {
            username : req.body.username,
            email : req.body.email,
            password : hashPass,
        });
        await newUser.save();
        return res.status(200).json({message : "SignIn succesfully "})
    } catch (error) {
        console.log("the error message => ",error);
        return res.status(400).json({message : "Internal Server Error"});
    }
});

// login

router.get("/log-in", async(req, res) => {
    const {username, password} = req.body;
    const existingUser = await User.findOne({username : username});
    if (!existingUser)
        return res.status(400).json({message : "invalide credentials"})
    bcrypt.compare(password, existingUser.password, (err,data) => {
        if (data)
        {
            const authClaims = [{name:username}, {jit : jwt.sign({}, process.env.JWT_SECRET)}];
            const token = jwt.sign({authClaims}, process.env.JWT_SECRET, {expiresIn:"2d"});
            res.status(200).json({id : existingUser._id, token : token});
        }else
        {
            return res.status(400).json({message : "invalide credentials"})
        }
    } )
});

module.exports = router;