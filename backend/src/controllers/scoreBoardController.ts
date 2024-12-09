import { Request, Response } from "express";
import ScoreboardModel from "../models/Scoreboard";
import { wss } from "..";

export const createScoreboard = async (req: Request, res: Response) => {
  const scoreboard = new ScoreboardModel({
    teamScore: 0,
    currentBatsman: 0,
    batsmen: [
      { name: "Batsman 1", runs: 0, balls: 0 },
      { name: "Batsman 2", runs: 0, balls: 0 },
    ],
    bowlers: [{ name: "Bowler 1", overs: 0, runs: 0, wickets: 0 }],
    deliveries: 0,
    overs: 0,
    commentary: "",
  });

  await scoreboard.save();
  console.log("New scoreboard created");

  res
    .status(200)
    .json({ success: true, message: "New scoreboard created", scoreboard });
  return;
};

export const updateScore = async (req: Request, res: Response) => {
  const { scoreType } = req.body;

  // Find the current scoreboard
  const scoreboard = await ScoreboardModel.findOne();
  if (!scoreboard) {
    res.status(404).json({ success: false, error: "Scoreboard not found" });
    return;
  }

  let currentBatsman = scoreboard.batsmen[scoreboard.currentBatsman];

  switch (scoreType) {
    case "wide":
      scoreboard.teamScore += 1;
      scoreboard.commentary = "Wide delivery";
      break;

    case "no-ball":
      scoreboard.teamScore += 1;
      scoreboard.commentary = "No-ball delivery";
      break;

    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
      // Handle normal runs
      scoreboard.teamScore += Number(scoreType);
      currentBatsman.runs += Number(scoreType);
      currentBatsman.balls += 1;
      scoreboard.commentary = `${scoreType} runs scored`;

      // Switch batsman on odd runs
      if (Number(scoreType) % 2 !== 0) {
        scoreboard.currentBatsman =
          (scoreboard.currentBatsman + 1) % scoreboard.batsmen.length;
      }
      break;

    default:
      res.status(400).json({ success: false, error: "Invalid scoreType" });
      return;
  }
  // Increment the number of deliveries and overs
  if (scoreType !== "no-ball" && scoreType !== "wide") {
    let { overs } = scoreboard;
    scoreboard.deliveries += 1;
    const decimalPart = overs % 1;
    if (decimalPart >= 0.5) {
      overs = Math.floor(overs) + 1;
    } else {
      overs += 0.1;
    }
    scoreboard.overs = parseFloat(overs.toFixed(1));
  }

  // Switch batsman after every over
  if (scoreboard.deliveries % 6 === 0) {
    scoreboard.currentBatsman =
      (scoreboard.currentBatsman + 1) % scoreboard.batsmen.length;
  }

  // Update bowler stats
  const currentBowler = scoreboard.bowlers[0];
  currentBowler.runs +=
    scoreType === "wide" || scoreType === "no-ball" ? 1 : scoreType;
  currentBowler.overs = scoreboard.overs;

  await scoreboard.save();

  // Broadcast updated scoreboard to all WebSocket clients
  wss.clients.forEach((client) => {
    client.send(
      JSON.stringify({
        teamScore: scoreboard.teamScore,
        batsmanStats: scoreboard.batsmen,
        bowlerStats: scoreboard.bowlers,
        commentary: scoreboard.commentary,
        deliveries: scoreboard.deliveries,
        overs: scoreboard.overs,
        currentBatsman: scoreboard.currentBatsman,
      })
    );
  });

  res.json({ success: true, message: "Score updated successfully" });
};

export const getScore = async (req: Request, res: Response) => {
  // Find the current scoreboard
  const scoreboard = await ScoreboardModel.findOne();
  if (!scoreboard) {
    res.status(404).json({ success: false, error: "Scoreboard not found" });
    return;
  }

  // Broadcast updated scoreboard to all WebSocket clients
  wss.clients.forEach((client) => {
    client.send(
      JSON.stringify({
        teamScore: scoreboard.teamScore,
        batsmanStats: scoreboard.batsmen,
        bowlerStats: scoreboard.bowlers,
        commentary: scoreboard.commentary,
        deliveries: scoreboard.deliveries,
        overs: scoreboard.overs,
        currentBatsman: scoreboard.currentBatsman,
      })
    );
  });

  // Respond to the API request
  res.json({ success: true, scoreboard });
};

export const deleteScore = async (req: Request, res: Response) => {
  await ScoreboardModel.deleteOne();

  res.json({ success: true, message: "Board deleted successfully" });
};
