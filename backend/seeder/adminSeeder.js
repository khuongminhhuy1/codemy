import "dotenv/config";
import mongoose from "mongoose";
import { User } from "../models/userModel.js";
import { hashPassword } from "../utils/hashPassword.js"; 

const seedUser = {
  name: "Minh Huy",
  email: "minhhuy10@gmail.com",
  password: "123123123", 
  role: "admin",
  avatar: "default-img.jpg",
  phoneNumber: 1234567890,
  bookmarks: [],
};

async function seedDatabase() {
  try {
    console.log(process.env.DB_URL)
    // Connect to MongoDB
    await mongoose.connect(process.env.DB_URL, {
      serverSelectionTimeoutMS: 30000,useNewUrlParser: true 
    }).then(() => console.log("Connected to MongoDB")).catch((error) => {
  console.error("Error connecting to MongoDB:", error) ;
    });
    

    // Hash the password before inserting the user
    const hashedPassword = await hashPassword(seedUser.password);
    seedUser.password = hashedPassword;

    // Insert a single user
    const insertedUser = await User.create(seedUser);
    console.log('User inserted:', insertedUser);
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Disconnect from MongoDB after seeding
    await mongoose.connection.close();
    console.log("Disconnected from MongoDB");
  }
}

// Run the seed script
seedDatabase();
