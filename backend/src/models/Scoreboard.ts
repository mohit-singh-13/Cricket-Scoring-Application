import mongoose, { Schema } from "mongoose";

const batsmanSchema = new Schema({
  name: { type: String, required: true },
  runs: { type: Number, default: 0 },
  balls: { type: Number, default: 0 },
});

const bowlerSchema = new Schema({
  name: { type: String, required: true },
  overs: { type: Number, default: 0 },
  runs: { type: Number, default: 0 },
  wickets: { type: Number, default: 0 },
});

const scoreboardSchema = new Schema({
  teamScore: { type: Number, default: 0 },
  currentBatsman: { type: Number, required: true, default: 0 },
  batsmen: [batsmanSchema],
  bowlers: [bowlerSchema],
  deliveries: { type: Number, default: 0 },
  overs: { type: Number, default: 0 },
  commentary: { type: String, default: "" },
});

const ScoreboardModel = mongoose.model("Scoreboard", scoreboardSchema);

export default ScoreboardModel;