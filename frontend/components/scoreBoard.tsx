import React from "react";

interface BatsmanStats {
  name: string;
  runs: number;
  balls: number;
}

interface BowlerStats {
  name: string;
  overs: number;
  runs: number;
  wickets: number;
}

interface ScoreboardProps {
  teamScore: number;
  batsmanStats1: BatsmanStats;
  batsmanStats2: BatsmanStats;
  bowlerStats: BowlerStats;
  currentBatsman: number;
}

const Scoreboard = ({
  teamScore,
  batsmanStats1,
  batsmanStats2,
  bowlerStats,
  currentBatsman,
}: ScoreboardProps) => {
  return (
    <div>
      <h2 className="text-center text-5xl font-extrabold text-blue-800">
        Score Card
      </h2>
      <h3 className="text-center text-2xl font-bold mt-8">
        Score: <span className="text-red-500">{teamScore}</span>
      </h3>
      <div className="grid grid-cols-3 border text-center mt-8 rounded-md bg-gray-300 py-4">
        <div className="space-y-2">
          <p className="text-xl font-bold">Batsman</p>
          <p className="text-[1rem] font-semibold">
            {batsmanStats1.name}{" "}
            <span className="text-red-500">
              {currentBatsman === 0 ? "*" : null}
            </span>
          </p>
          <p className="text-[1rem] font-semibold">
            {batsmanStats2.name}{" "}
            <span className="text-red-500">
              {currentBatsman === 1 ? "*" : null}
            </span>
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-xl font-bold">Runs</p>
          <p className="text-[1rem] font-semibold">{batsmanStats1.runs}</p>
          <p className="text-[1rem] font-semibold">{batsmanStats2.runs}</p>
        </div>

        <div className="space-y-2">
          <p className="text-xl font-bold">Balls</p>
          <p className="text-[1rem] font-semibold">{batsmanStats1.balls}</p>
          <p className="text-[1rem] font-semibold">{batsmanStats2.balls}</p>
        </div>
      </div>
      <div className="grid grid-cols-4 text-center mt-8 border rounded-md bg-gray-300 py-4">
        <div className="space-y-2">
          <p className="text-xl font-bold">Bowler</p>
          <p className="text-[1rem] font-semibold">{bowlerStats.name}</p>
        </div>

        <div className="space-y-2">
          <p className="text-xl font-bold">Overs</p>
          <p className="text-[1rem] font-semibold">{bowlerStats.overs}</p>
        </div>

        <div className="space-y-2">
          <p className="text-xl font-bold">Wickets</p>
          <p className="text-[1rem] font-semibold">{bowlerStats.wickets}</p>
        </div>

        <div className="space-y-2">
          <p className="text-xl font-bold">Runs</p>
          <p className="text-[1rem] font-semibold">{bowlerStats.runs}</p>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
