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

interface scoreProps {
  title: string;
  value1: number | string;
  value2: number | string;
}

const Score = ({ title, value1, value2 }: scoreProps) => {
  return (
    <div className="space-y-2">
      <p className="text-xl font-bold">{title}</p>
      <p className="text-[1rem] font-semibold">{value1}</p>
      <p className="text-[1rem] font-semibold">{value2}</p>
    </div>
  );
};

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
        
        <Score
          title="Runs"
          value1={batsmanStats1.runs}
          value2={batsmanStats2.runs}
        />
        <Score
          title="Balls"
          value1={batsmanStats1.balls}
          value2={batsmanStats2.balls}
        />
      </div>
      <div className="grid grid-cols-4 text-center mt-8 border rounded-md bg-gray-300 py-4">
        <Score title="Bowler" value1={bowlerStats.name} value2={""} />
        <Score title="Overs" value1={bowlerStats.overs} value2={""} />
        <Score title="Wickets" value1={bowlerStats.wickets} value2={""} />
        <Score title="Runs" value1={bowlerStats.runs} value2={""} />
      </div>
    </div>
  );
};

export default Scoreboard;
