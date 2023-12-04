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

//Connect Database
connectDatabase();

// for parsing application/json
app.use(express.json());

// for parsing application/xwww-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// for posting images

app.use(express.static(path.join(__dirname, "uploads")));
app.use(cookieParser());
//CORS POLICY
app.use(cors({ credentials: true, origin: true }));

app.use("/", user);
app.use("/courses", course);

//Server
const port = process.env.PORT || 5555;
app.listen(port, () => console.log(`Listening on port ${port}`));
