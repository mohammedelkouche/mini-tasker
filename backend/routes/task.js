const router =  require("express").Router();
const Task = require("../models/task");
const User = require("../models/user");

// creat task
router.post("/create-task",async(req, res) =>{
	try {
		const {title, desc} = req.body;
		const {id} = req.headers;
		const newTask = new Task ({
			title : title,
			desc : desc
		});
		const savetask = await newTask.save();
		const taskId = savetask._id;
		await User.findByIdAndUpdate(id, {$push :{tasks: taskId._id}});
		res.status(200).json({message : "Task Created"});
	} catch (error) {
		console.log(error);
		res.status(400).json({message : "Internal Server Error"});
	}
});

module.exports = router;