import "dotenv/config";
import express from "express";
const app = express();
import { connectDatabase } from "./config/db.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Routes
import user from "./routes/userRoute.js";
import course from "./routes/courseRoute.js";
import lesson from "./routes/lessonRoute.js";
import chapter from "./routes/chapterRoute.js";
import admin from "./routes/AdminRoute.js";
import quiz from "./routes/quizRoute.js";
import result from "./routes/resultRoute.js"
import comment from "./routes/commentRoute.js"

//Connect Database
connectDatabase();

// for parsing application/json
app.use(express.json());

// for parsing application/xwww-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "uploads")));
app.use(cookieParser());
//CORS POLICY
app.use(cors({ credentials: true, origin: true }));

app.use("/", user);
app.use("/admin", admin);
app.use("/courses", course);
app.use("/lessons", lesson);
app.use("/chapter", chapter);
app.use("/quiz", quiz);
app.use("/result", result)
app.use("/comments", comment)

//Server
const port = process.env.PORT || 5555;
app.listen(port, () => console.log(`Listening on port ${port}`));
