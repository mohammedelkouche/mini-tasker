const router =  require("express").Router();
const Task = require("../models/task");
const User = require("../models/user");
const {verifyToken} = require("./middleware/auth");

// creat task
router.post("/create-task", verifyToken, async(req, res) =>{
	try {
		const {title, desc} = req.body;
		// const {id} = req.headers;
		const userId = req.user.id; // Securely get user ID from token
		console.log("user id = ", userId);
		const newTask = new Task ({
			title : title,
			desc : desc
		});
		const savetask = await newTask.save();
		const taskId = savetask._id;
		await User.findByIdAndUpdate(userId, {$push :{tasks: taskId._id}});
		res.status(200).json({message : "Task Created"});
	} catch (error) {
		console.log(error);
		res.status(500).json({message : "Internal Server Error"});
	}
});

// Get All Tasks
router.get("/get-all-tasks", verifyToken, async(req, res) => {
	try {
		// const all_task = await User.findOne(😂);
		const userId = req.user.id;
		
		const user = await User.findById(userId).populate("tasks");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ tasks: user.tasks });
		

		
	} catch (error) {
		console.log(error);
		res.status(500).json({message : "Internal Server Error"});
	}
})

module.exports = router;