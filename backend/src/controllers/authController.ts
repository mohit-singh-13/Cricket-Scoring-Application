import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

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

    // Success response
    res.json({
      success: true,
      message: "Login successful",
      user: { email: user.email },
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
  const { email, password }: { email: string; password: string } = req.body;

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
