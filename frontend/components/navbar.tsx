"use client";

import { usePathname, useRouter } from "next/navigation";
import Button from "./button";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
  const router = useRouter();

  const [loggedIn, setLoggedIn] = useState(false);

  const authenticate = async () => {
    try {
      const { data }: { data: { success: boolean } } = await axios.get(
        `${process.env.NEXT_PUBLIC_BE_URL}/api/auth/authenticate`,
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        setLoggedIn(true);
      }
    } catch (err) {
      console.log(err);
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    authenticate();
  }, []);

  const pathname = usePathname();

  const classname =
    "px-2 py-4 bg-green-500 w-[40%] rounded-lg text-gray-900 font-bold text-lg";

  return (
    <div className="w-full pb-14">
      {loggedIn ? (
        <div className="flex justify-between">
          {pathname === "/admin" ? (
            <Button classname={classname} onClick={() => router.push("/")}>
              Home
            </Button>
          ) : (
            <Button classname={classname} onClick={() => router.push("/admin")}>
              Admin Board
            </Button>
          )}
          <button
            className={classname}
            onClick={async () => {
              const data: { data: { success: true } } = await axios.get(
                `${process.env.NEXT_PUBLIC_BE_URL}/api/auth/logout`,
                {
                  withCredentials: true,
                }
              );

              if (data.data.success) setLoggedIn(false);
              router.push("/");
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex justify-between">
          <Button
            classname={classname}
            onClick={() => router.push("/api/auth/signup")}
          >
            Signup
          </Button>
          <Button
            classname={classname}
            onClick={() => router.push("/api/auth/signin")}
          >
            Login
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
