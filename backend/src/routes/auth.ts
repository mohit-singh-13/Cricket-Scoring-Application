import { Router } from "express";
import {
  signup,
  login,
  authenticate,
  logout,
} from "../controllers/authController";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/authenticate", authenticate);
router.get("/logout", logout);

export default router;
