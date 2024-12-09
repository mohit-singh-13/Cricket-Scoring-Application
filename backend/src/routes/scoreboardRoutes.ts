import { Router } from "express";
import {
  createScoreboard,
  deleteScore,
  getScore,
  updateScore,
} from "../controllers/scoreBoardController";

const router = Router();

router.get("/create", createScoreboard);
router.post("/update", updateScore);
router.get("/getScore", getScore);
router.delete("/delete", deleteScore);

export default router;
