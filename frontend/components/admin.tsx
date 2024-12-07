"use client";

import axios from "axios";
import Button from "@/components/button";
import FetchScore from "./fetchScore";
import { useCallback, useState } from "react";

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

export default function AdminPanel() {
  const handleScoreUpdate = async (scoreType: number | string) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BE_URL}/api/score/update`, {
        scoreType,
      });
    } catch (error) {
      console.error("Error updating score:", error);
    }
  };

  const [noGame, setNoGame] = useState<boolean>(false);

  const toggleGame = useCallback(() => {
    setNoGame(true);
  }, []);

  return (
    <div className="w-[650px] h-full border mx-auto py-6 px-2 bg-slate-50">
      <FetchScore commentry={false} noGame={noGame} toggleGame={toggleGame} />

      <h4 className="text-center font-bold text-2xl my-8">Update Score:</h4>

      <div className="grid grid-cols-2">
        {[
          [0, "bg-red-500"],
          [1, "bg-blue-500"],
          [2, "bg-green-500"],
          [3, "bg-yellow-500"],
          [4, "bg-pink-500"],
          [5, "bg-orange-500"],
          [6, "bg-violet-500"],
        ].map(([run, color]) => (
          <Button
            key={run}
            onClick={() => handleScoreUpdate(run)}
            classname={`border px-10 py-8 ${color} text-lg font-bold`}
          >
            {run}
          </Button>
        ))}

        <div className="grid">
          <Button
            onClick={() => handleScoreUpdate("wide")}
            classname="border px-10 py-8 bg-lime-500 text-lg font-bold"
          >
            Wide
          </Button>

          <Button
            onClick={() => handleScoreUpdate("no-ball")}
            classname="border px-10 py-8 bg-cyan-500 text-lg font-bold"
          >
            No Ball
          </Button>
        </div>
      </div>
      {noGame ? (
        <Button
          classname="w-full bg-green-700 py-6 text-lg text-white font-semibold"
          onClick={() => {
            axios.get(process.env.NEXT_PUBLIC_BE_URL + "/api/score/create");
            setNoGame(false);
          }}
        >
          Create New Game
        </Button>
      ) : (
        <Button
          classname="w-full bg-green-700 py-6 text-lg text-white font-semibold"
          onClick={() => {
            axios.delete(process.env.NEXT_PUBLIC_BE_URL + "/api/score/delete");
            setNoGame(true);
          }}
        >
          Delete Game
        </Button>
      )}
    </div>
  );
}
