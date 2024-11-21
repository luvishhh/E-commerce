const app = require("./app"); // Your Express app
const mongoose = require("mongoose"); // Mongoose for MongoDB connection

const PORT = 3002;
const mongodbUrl = "mongodb+srv://lavishWebsite11:plAqMR5ChXY3vrhv@cluster0.krlvd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB and start the server
const startServer = async () => {
    try {
        await mongoose.connect(mongodbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
    
        });
        console.log("Connected to MongoDB successfully");

        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};

startServer();
