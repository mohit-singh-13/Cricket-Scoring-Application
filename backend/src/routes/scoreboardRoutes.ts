import { Router } from "express";
import { deleteScore, getScore, updateScore } from "../controllers/scoreBoardController";
import { createScoreboard } from "../controllers/createBoardController";

const router = Router();

router.get("/create", createScoreboard);
router.post("/update", updateScore);
router.get("/getScore", getScore);
router.delete("/delete", deleteScore);

export default router;
