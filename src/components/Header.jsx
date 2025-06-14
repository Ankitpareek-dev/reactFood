import { HEADER_LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router";
import useOnlineStatus from "../utils/useOnlineStatus";

export default function Header() {
  let [btnName, setBtnName] = useState("login");

  const onlineStatus = useOnlineStatus();
  return (
    <div className="bg-green-600 drop-shadow-2xl py-2">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between h-16 rounded-2xl">
        {/* Logo */}
        <div className="flex items-center ">
          <img
            className="w-12 h-12 rounded-4xl"
            src={HEADER_LOGO_URL}
            alt="Logo"
          />
        </div>

        {/* Navigation */}
        <div className="flex items-center">
          <ul className="flex items-center gap-6 text-white font-medium">
            <li className="text-sm">
              Internet status:
              <span
                className={`ml-1 font-semibold ${
                  onlineStatus ? "text-green-200" : "text-red-300"
                }`}
              >
                {onlineStatus ? "online" : "offline"}
              </span>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-gray-200 transition duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-gray-200 transition duration-200"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-gray-200 transition duration-200"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-gray-200 transition duration-200"
              >
                Cart
              </Link>
            </li>
            <li>
              <Link
                to="/grocery"
                className="hover:text-gray-200 transition duration-200"
              >
                Grocery
              </Link>
            </li>
            <li>
              <button
                className="bg-green-800 hover:bg-green-700 text-white px-4 py-1 rounded-full transition duration-200"
                onClick={() => {
                  setBtnName((prev) => (prev === "login" ? "logout" : "login"));
                }}
              >
                {btnName}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
