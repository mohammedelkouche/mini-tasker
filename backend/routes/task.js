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
		//new : true means that the updated document will be returned after the update is applied.
		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{ $push: { tasks: taskId } },
			{ new: true }
		);
		if (!updatedUser) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json({ message: "Task Created", task: savetask });
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
		
		// option sort by createdAt in descending order (newest first).
		const userData = await User.findById(userId).populate(
			{
				path:"tasks",
				options:{ sort: {createdAt: -1}},
			}		
		);

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ data: userData.tasks});
		

		
	} catch (error) {
		console.log(error);
		res.status(500).json({message : "Internal Server Error"});
	}
})


router.delete("/delete-tasks/:id", verifyToken, async(req, res) => {
	try {
		const { id } = req.params;
		// or  const taskId = req.params.id;
		const userId = req.user.id;
		
		// Remove the task reference from the user's tasks array
		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{ $pull: { tasks: id } },);
		if (!updatedUser) {
			return res.status(404).json({ message: "User not found" });
		}

		// Delete the task from the Task collection
		const deletedTask = await Task.findByIdAndDelete(id);
		if (!deletedTask) {
			return res.status(404).json({ message: "Task not found" });
		}
		res.status(200).json({ message: "Task Deleted successfully" });
		
	} catch (error) {
		console.log(error);
		res.status(500).json({message : "Internal Server Error"});
	}
})


// update task
router.delete("/update-tasks/:id", verifyToken, async(req, res) => {
	try {
		const { id } = req.params;
		// or  const taskId = req.params.id;
		const { title, desc } = req.body;
		// Update the task in the Task collection
		const updatedTask = await Task.findByIdAndUpdate(
				id,
				{ title: title, desc: desc },
				{ new: true }
			);
		if (!updatedTask) {
			return res.status(404).json({ message: "Task not found" });
		}		
		
		res.status(200).json({ message: "Task updated successfully" });
		
	} catch (error) {
		console.log(error);
		res.status(500).json({message : "Internal Server Error"});
	}
})


// update-impostant task
router.put("/update-important-task/:id", verifyToken, async(req, res) => {
	try {
		const { id } = req.params;
		// or  const taskId = req.params.id;
		const taskdata = await Task.findById(id);
		if (!taskdata) {
			return res.status(404).json({ message: "Task not found" });
		}
		const important = taskdata.important;
		 // Toggle the important field
		const updatedTask = await Task.findByIdAndUpdate(
				id,
				{ important: !important },
				{ new: true }
			);	
		
		res.status(200).json({ message: "Task updated successfully" });
		
	} catch (error) {
		console.log(error);
		res.status(500).json({message : "Internal Server Error"});
	}
})


// update-complite task
router.put("/update-important-task/:id", verifyToken, async(req, res) => {
	try {
		const { id } = req.params;
		// or  const taskId = req.params.id;
		const taskdata = await Task.findById(id);
		if (!taskdata) {
			return res.status(404).json({ message: "Task not found" });
		}
		const complete = taskdata.complete;
		 // Toggle the complete field	
		 const updatedTask = await Task.findByIdAndUpdate(
				id,
				{ complete: !complete },
				{ new: true }
			);

		res.status(200).json({ message: "Task updated successfully" });
		
	} catch (error) {
		console.log(error);
		res.status(500).json({message : "Internal Server Error"});
	}
})

// Get All Important Tasks
router.get("/get-important-tasks", verifyToken, async(req, res) => {
	try {
		// const all_task = await User.findOne(😂);
		const userId = req.user.id;
		
		// option sort by createdAt in descending order (newest first).
		const Data = await User.findById(userId).populate(
			{
				path:"tasks",
				match: { important: true },
				options:{ sort: {createdAt: -1}},
			}		
		);
        if (!Data) {
            return res.status(404).json({ message: "User not found" });
        }
		const ImporTasksData = Data.tasks; // Access the populated tasks array

        res.status(200).json({ data: ImporTasksData});
		
	} catch (error) {
		console.log(error);
		res.status(500).json({message : "Internal Server Error"});
	}
})

// Get All complite Tasks
router.get("/get-complete-tasks", verifyToken, async(req, res) => {
	try {
		// const all_task = await User.findOne(😂);
		const userId = req.user.id;
		
		// option sort by createdAt in descending order (newest first).
		const Data = await User.findById(userId).populate(
			{
				path:"tasks",
				match: { complete: true },
				options:{ sort: {createdAt: -1}},
			}		
		);
        if (!Data) {
            return res.status(404).json({ message: "User not found" });
        }
		const completesData = Data.tasks; // Access the populated tasks array
		console.log("complete data = ", completesData);

        res.status(200).json({ data: completesData});
		
	} catch (error) {
		console.log(error);
		res.status(500).json({message : "Internal Server Error"});
	}
})


// Get All incomplete Tasks
router.get("/get-incomplete-tasks", verifyToken, async(req, res) => {
	try {
		// const all_task = await User.findOne(😂);
		const userId = req.user.id;
		
		// option sort by createdAt in descending order (newest first).
		const Data = await User.findById(userId).populate(
			{
				path:"tasks",
				match: { complete: false },
				options:{ sort: {createdAt: -1}},
			}		
		);
        if (!Data) {
            return res.status(404).json({ message: "User not found" });
        }
		const completesData = Data.tasks; // Access the populated tasks array
		console.log("complete data = ", completesData);

        res.status(200).json({ data: completesData});
		
	} catch (error) {
		console.log(error);
		res.status(500).json({message : "Internal Server Error"});
	}
})




module.exports = router;