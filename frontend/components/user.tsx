"use client";

import { useState } from "react";
import FetchScore from "./fetchScore";

const User = () => {
  const [noGame, setNoGame] = useState<boolean>(false);

  return (
    <div className="w-[650px] border mx-auto h-screen py-6 px-2 bg-slate-50">
      <FetchScore
        commentry={true}
        noGame={noGame}
        toggleGame={() => setNoGame(true)}
      />
    </div>
  );
};

export default User;
