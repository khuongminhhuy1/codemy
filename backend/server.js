import express from "express";
const app = express();
import { connectDatabase } from "./config/db.js";
import cors from "cors";
import path from "path";
import __dirname from "./config/__dirname.js";
import cookieParser from "cookie-parser";
const upload = multer();

//Routes
import user from "./routes/userRoute.js";
import course from "./routes/courseRoute.js";
import multer from "multer";

//Connect Database
connectDatabase();

// for parsing application/json
app.use(express.json());

// for parsing application/xwww-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../frontend")));
app.use(cookieParser());
//CORS POLICY
app.use(cors({ credentials: true, origin: true }));

app.use("/user", user);
app.use("/courses", course);

//Server
const port = process.env.PORT || 5555;
app.listen(port, () => console.log(`Listening on port ${port}`));
