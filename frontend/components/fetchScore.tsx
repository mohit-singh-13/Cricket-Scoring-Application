"use client";

import useSocket from "@/app/hooks/useSocket";
import { useCallback, useEffect, useState } from "react";
import Scoreboard from "./scoreBoard";
import Commentary from "./commentry";
import axios from "axios";

export interface BatsmanStats {
  name: string;
  runs: number;
  balls: number;
}

export interface BowlerStats {
  name: string;
  overs: number;
  runs: number;
  wickets: number;
}

const FetchScore = ({
  commentry,
  noGame,
  toggleGame,
}: {
  commentry: boolean;
  noGame: boolean;
  toggleGame: () => void;
}) => {
  const socket = useSocket();
  const [teamScore, setTeamScore] = useState<number>(0);
  const [batsmanStats1, setBatsmanStats1] = useState<BatsmanStats>({
    runs: 0,
    balls: 0,
    name: "Batsman 1",
  });
  const [batsmanStats2, setBatsmanStats2] = useState<BatsmanStats>({
    runs: 0,
    balls: 0,
    name: "Batsman 2",
  });
  const [currentBatsman, setCurrentBatsman] = useState<0 | 1>(0);
  const [bowlerStats, setBowlerStats] = useState<BowlerStats>({
    overs: 0,
    runs: 0,
    wickets: 0,
    name: "Bowler 1",
  });
  const [commentary, setCommentary] = useState<string>("");

  const fetchData = useCallback(async () => {
    try {
      await axios.get(
        `${process.env.NEXT_PUBLIC_BE_URL}/api/score/getScore` || ""
      );
    } catch (err) {
      console.log(err);
      toggleGame();
    }
  }, [toggleGame]);

  useEffect(() => {
    if (!socket) return;
    socket.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log(data);
      setTeamScore(data.teamScore);
      setCommentary(data.commentary);
      setBatsmanStats1({
        runs: data.batsmanStats[0].runs,
        balls: data.batsmanStats[0].balls,
        name: data.batsmanStats[0].name,
      });
      setBatsmanStats2({
        runs: data.batsmanStats[1].runs,
        balls: data.batsmanStats[1].balls,
        name: data.batsmanStats[1].name,
      });
      setBowlerStats({
        overs: data.bowlerStats[0].overs,
        runs: data.bowlerStats[0].runs,
        wickets: data.bowlerStats[0].wickets,
        name: data.bowlerStats[0].name,
      });
      setCommentary(data.commentary);
      setCurrentBatsman(data.currentBatsman);
    };

    fetchData();

    return () => {
      socket.close();
    };
  }, [socket, fetchData]);

  return (
    <div className="h-full">
      {noGame ? (
        <p className="text-center text-4xl font-bold my-12 flex items-center justify-center h-full">
          No game is currenly being played
        </p>
      ) : (
        <div>
          <Scoreboard
            batsmanStats1={batsmanStats1}
            batsmanStats2={batsmanStats2}
            teamScore={teamScore}
            bowlerStats={bowlerStats}
            currentBatsman={currentBatsman}
          />

          {commentry ? <Commentary commentary={commentary} /> : null}
        </div>
      )}
    </div>
  );
};

export default FetchScore;
