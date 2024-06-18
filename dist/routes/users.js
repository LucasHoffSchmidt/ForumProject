import express from "express";
import * as usersController from "../controllers/users.js";
import * as validation from "../middleware/validation.js";
import { isAdmin } from "../middleware/auth.js";
const router = express.Router();
// Users
router.get("/", usersController.getUsers);
// Users/:id
router.get("/:id", usersController.getUser);
router.patch("/", validation.updateUser, usersController.updateUser);
router.delete("/", usersController.deleteUser);
router.delete("/:id", isAdmin, usersController.adminDeleteUser);
// Users/:id/posts - posts-liked - posts-followed
router.get("/:id/posts", usersController.getUserPosts);
router.get("/:id/posts-liked", usersController.getUserLikedPosts);
router.get("/:id/posts-followed", usersController.getUserFollowedPosts);
// Export the router for import in the app file
export default router;
