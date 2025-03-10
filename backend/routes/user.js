const router = require("express").Router()
const User = require ("../models/user")

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
        const newUser = new User ( {
            username : req.body.username,
            email : req.body.email,
            password : req.body.password,
        });
        await newUser.save();
        return res.status(200).json({message : "SignIn succesfully "})
    } catch (error) {
        console.log("the error message => ",error);
        return res.status(400).json({message : "Internal Server Error"});
    }
});

module.exports = router;