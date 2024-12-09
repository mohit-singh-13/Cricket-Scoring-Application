import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Login handler
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(400)
      .json({ success: false, error: "Email and password are required" });
    return;
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ success: false, error: "Invalid credentials" });
      return;
    }

    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
      res.status(401).json({ success: false, error: "Invalid credentials" });
      return;
    }

    const payload = {
      email: user.email,
    };

    const JWT_SECRET = process.env.JWT_SECRET || "secret";

    const token = sign(payload, JWT_SECRET, {
      expiresIn: "72h",
    });

    res
      .cookie("token", token, {
        sameSite: "none",
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 60 * 60 * 1000),
      })
      .json({
        success: true,
        message: "Login successful",
      });

    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
    return;
  }
};

// Signup Handler
export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ success: false, error: "User already exists" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = new User({
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
    return;
  } catch (error) {
    res.status(500).json({ success: false, error: "Error creating user" });
    return;
  }
};

// Authenticate Handler
export const authenticate = async (req: Request, res: Response) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(404).json({ success: false });
    return;
  }

  const verified = verify(token, process.env.JWT_SECRET || "");

  if (verified) {
    res.status(200).json({ success: true });
    return;
  } else {
    res.status(200).json({ success: false });
    return;
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({ success: true });
  return;
};
