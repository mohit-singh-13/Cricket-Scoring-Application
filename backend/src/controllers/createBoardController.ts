import { Request, Response } from "express";
import ScoreboardModel from "../models/Scoreboard";

export const createScoreboard = async (req: Request, res: Response) => {
  const scoreboard = new ScoreboardModel({
    teamScore: 0,
    currentBatsman: 0,
    batsmen: [
      { name: "Batsman 1", runs: 0, balls: 0 },
      { name: "Batsman 2", runs: 0, balls: 0 },
    ],
    bowlers: [{ name: "Bowler 1", overs: 0, runs: 0, wickets: 0 }],
    deliveries: 0, // No deliveries bowled yet
    overs: 0, // No overs bowled yet
    commentary: "", // Empty commentary at the start
  });

  await scoreboard.save();
  console.log("New scoreboard created");

  res
    .status(200)
    .json({ success: true, message: "New scoreboard created", scoreboard });
  return;
};
