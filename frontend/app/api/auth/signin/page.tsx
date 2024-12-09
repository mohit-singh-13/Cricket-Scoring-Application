"use client";

import { useState } from "react";
import axios from "axios";
import Button from "@/components/button";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    try {
      const response: {
        data: { success: boolean; message?: string; error?: string };
      } = await axios.post(
        `${process.env.NEXT_PUBLIC_BE_URL}/api/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data && response.data.success) {
        setMessage(response.data.message || "");

        router.push("/admin");
      } else {
        setMessage(response.data.error || "Login failed. Try again.");
      }
    } catch (error: any) {
      console.log(error);
      setMessage(
        error.response?.data?.error || "An error occurred during login"
      );
    }
  };

  const router = useRouter();

  return (
    <div className="flex justify-center items-center h-screen bg-[#161B22] text-white flex-col gap-2">
      <Button
        classname="w-[8rem] bg-[#0D1117] text-white py-4 rounded-lg hover:bg-[#151920]"
        onClick={() => router.push("/")}
      >
        Home
      </Button>
      <Button
        classname="w-[8rem] bg-[#0D1117] text-white py-4 rounded-lg hover:bg-[#151920]"
        onClick={() => router.push("/api/auth/signup")}
      >
        Signup
      </Button>
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-[#0D1117] p-8 rounded-3xl shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {message && (
          <div
            className={`mb-4 p-3 rounded ${
              message.includes("successful")
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}
        <InputField
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          placeholder="johndoe@gmail.com"
          required
        />
        <InputField
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="123456"
          required
        />
        <button
          type="submit"
          className="w-full bg-[#0D1117] text-white py-4 rounded-lg hover:bg-[#151920]"
        >
          Login
        </button>
      </form>
    </div>
  );
};

const InputField = ({
  id,
  type,
  value,
  onChange,
  label,
  placeholder = "",
  required = false,
}: InputFieldProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full border px-3 py-2 rounded bg-[#0D1117]"
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

interface InputFieldProps {
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder?: string;
  required?: boolean;
}

export default Login;
