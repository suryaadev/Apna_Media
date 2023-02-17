import express from "express";
import bodyParser from "body-parser"; //process req body
import mongoose from "mongoose"; //mongo DB
import cors from "cors"; //cross-origin req
import dotenv from "dotenv"; //env file
import multer from "multer"; //upload files locally
import helmet from "helmet"; //req safety
import morgan from "morgan"; //logging
// bcrypt - password encryption
// gridfs-stream - file upload
// jsonwebtoken - web authentication

/**path and routes for every functionality */
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";

/**section imports */
import { register } from "./controllers/Auth.js";
import { createPost } from "./controllers/Posts.js";

// in built packages
import path from "path";
import { fileURLToPath } from "url";

// middleware pkg
import { verifyToken } from "./middleware/auth.js";

// Models
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";

// configurations
const __filename = fileURLToPath(import.meta.url); //when use do module in type in pkg.json then we have do

const __dirname = path.dirname(__filename);
dotenv.config();

// invoke express
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// file Storage from multer stored in public/assets
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Routes with files for AUTH
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/*Mongoose setup */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port ::: ${PORT}`));

    // User.insertMany(users);
    // Post.insertMany(users);
  })
  .catch((errror) => console.log(`${errror} did not connect`));
