import express from "express";
import cors from "cors";

const app = express(); // create an express app

app.use(express.json()); // middleware to parse incoming JSON requests
app.use(cors());

//import routes
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";

//routes decleration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

export default app;