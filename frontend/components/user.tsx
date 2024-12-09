"use client";

import { useState } from "react";
import FetchScore from "./fetchScore";
import Navbar from "./navbar";

const User = () => {
  const [noGame, setNoGame] = useState<boolean>(false);

  return (
    <div className="w-[650px] border mx-auto h-screen py-6 px-2 bg-slate-50">
      <div>
        <Navbar />
      </div>

      <FetchScore
        commentry={true}
        noGame={noGame}
        toggleGame={() => setNoGame(true)}
      />
    </div>
  );
};

export default User;
