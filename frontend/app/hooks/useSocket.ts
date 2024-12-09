import { useEffect, useState } from "react";

const useSocket = () => {
  const URL = process.env.NEXT_PUBLIC_BE_URL || "";
  
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(URL);

    ws.onopen = () => {
      console.log("Next Connected");
      setSocket(ws);
    };

    ws.onclose = () => {
      console.log("Next disconnected");
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, [URL]);

  return socket;
};

export default useSocket;
