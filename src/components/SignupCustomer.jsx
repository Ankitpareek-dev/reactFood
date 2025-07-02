import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsErrorMessage(false);

    try {
      const res = await axios.post(
        BASE_URL + "/signup/customer",
        { name, email, password },
        { withCredentials: true }
      );
      setIsLoading(false);
      console.log("success");
    } catch (err) {
      setIsErrorMessage(true);
      console.error(err);
    }
  };

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
          Create your account
        </h2>

        <form className="space-y-5" onSubmit={handleSignup}>
          <div>
            <label htmlFor="name" className="block mb-1 text-sm font-medium">
              Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              className="w-full px-4 py-2 rounded-lg border border-[oklch(0.93_0.0094_286.2156)] bg-white text-black focus:outline-none focus:ring-2 focus:ring-[oklch(0.5393_0.2713_286.7462)]"
              placeholder="Your full name"
              required
            />
          </div>

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

          {isErrorMessage && (
            <p className="text-red-500">Something went wrong. Try again.</p>
          )}

          <button
            type="submit"
            className="w-full font-semibold py-2 rounded-[1.4rem] text-white transition-colors duration-200"
            style={{ backgroundColor: "oklch(0.5393 0.2713 286.7462)" }}
          >
            {isLoading ? "Creating..." : "Sign up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[oklch(0.5393_0.2713_286.7462)] hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
