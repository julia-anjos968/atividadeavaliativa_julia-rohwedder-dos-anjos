import express from "express";
import { getAllStreamers, getById, createStreamer, deleteStreamer, updateStreamer} from "./../controllers/streamersController.js";

const router = express.Router();

router.get("/", getAllStreamers);
router.get("/:id", getById);
router.post("/", createStreamer);
router.delete("/:id", deleteStreamer);
router.put("/:id", updateStreamer);

export default router;