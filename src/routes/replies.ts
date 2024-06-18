import express from "express";
import * as repliesController from "../controllers/replies.js";
import * as validation from "../middleware/validation.js";

const router = express.Router();

// replies/:id
router.get("/:id", repliesController.getReply);
router.patch("/:id", repliesController.updateReply);
router.delete("/:id", repliesController.deleteReply);

// Export the router for import in the app file
export default router;
