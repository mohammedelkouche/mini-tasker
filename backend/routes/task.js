const router =  require("express").Router();
const Task = require("../models/task");

// creat task
router.post("/create-task",async(req, res)=>{
	try {
		const {title, desc} = req.body;
		const newTask = new Task ({
			title : title,
			desc : desq
		});
		
	} catch (error) {
		console.log(error);
		res.status(400).json({message : "Internal Server Error"});
	}
});

module.exports = router;