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
    // Connect to MongoDB
    await mongoose.connect("mongodb://127.0.0.1:27017/online-academy", {
      serverSelectionTimeoutMS: 30000,
    });
    console.log("Connected to MongoDB");

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
