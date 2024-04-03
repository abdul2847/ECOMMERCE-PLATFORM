const mongoose = require("mongoose");

const connectionString = process.env.MONGO_URI || 'mongodb+srv://abdulhafis2847:pious2847@malldb.fn96kux.mongodb.net/MallDb?retryWrites=true&w=majority';

// ``
const connectDB = async () => {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected successfully");
  } catch (error) {
    console.error("Error in database connection:", error.message);
  }
};

module.exports = connectDB;
