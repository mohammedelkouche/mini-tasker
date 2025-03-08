const mongoose = require("mongoose");
const conn = async () => {
    // try {
    //     const responce = await mongoose.connect(`${process.env.MONGO_URL}`);
    //     if (responce)
    //         console.log("connected to db");
    // } catch (error) {
    //     console.log(error);
    // }

    try {
        const response = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log("Connected to DB successfully!"); // Only logs when successful

    } catch (error) {
        console.error("MongoDB connection failed:", error.message); // Logs real errors
    }
}

conn();