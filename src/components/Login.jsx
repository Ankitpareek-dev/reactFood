import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useUserStore from "../utils/userStore";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const addUser = useUserStore((state) => state.addUser);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submit behavior
    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      // const data = await res.json();
      // console.log(res.data);
      setIsErrorMessage(false);
      setIsLoading(false);
      addUser(res.data);
      // dispatch(addUser(res.data));
      if (res.data.role === "customer") {
        navigate("/feed");
      } else {
        navigate("/restaurentPanel");
      }
      // Navigate or store token if needed
    } catch (err) {
      setIsErrorMessage(true);
      setIsLoading(false);
      console.error("Login failed:", err.message);
    }
  };

  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const res = await axios.get(BASE_URL + "/me", {
          withCredentials: true,
        });
        navigate("/feed");
      } catch (err) {
        console.error(err);
      }
    };
    checkUserAuth();
  }, []);

  return (
    <div
      className="h-[calc(100vh-150px)] flex flex-col items-center justify-center px-4 overflow-hidden"
      style={{ backgroundColor: "oklch(0.994 0 0)", color: "oklch(0 0 0)" }}
    >
      <div
        className="w-full max-w-md mt-16 p-8 rounded-[1.4rem] shadow-xl border"
        style={{
          backgroundColor: "oklch(1 0 0)",
          borderColor: "oklch(0.93 0.0094 286.2156)",
        }}
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Login to your account
        </h2>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded-lg border border-[oklch(0.93_0.0094_286.2156)] bg-white text-black focus:outline-none focus:ring-2 focus:ring-[oklch(0.5393_0.2713_286.7462)]"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium"
            >
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded-lg border border-[oklch(0.93_0.0094_286.2156)] bg-white text-black focus:outline-none focus:ring-2 focus:ring-[oklch(0.5393_0.2713_286.7462)]"
              placeholder="••••••••"
              required
            />
          </div>
          {isErrorMessage && <p className="text-red-500">Wrong Credentials</p>}
          <button
            type="submit"
            className="w-full font-semibold py-2 rounded-[1.4rem] text-white transition-colors duration-200"
            style={{ backgroundColor: "oklch(0.5393 0.2713 286.7462)" }}
          >
            {isLoading ? "loading" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-[oklch(0.5393_0.2713_286.7462)] hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
