import {Router} from "express";
import {createPost, getAllPosts, updatePost, deletePost} from "../controllers/post.controller.js";

const router = Router();

router.route("/create").post(createPost); 
router.route("/getPosts").get(getAllPosts); 
router.route("/updatePost/:id").patch(updatePost);
router.route("/deletePost/:id").delete(deletePost);
export default router;