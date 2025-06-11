import { HEADER_LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router";

export default function Header() {
  let [btnName, setBtnName] = useState("login");
  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={HEADER_LOGO_URL} />
      </div>

      <div className="nav-items">
        <ul>
          <li>
            <Link to="/" className="nav-items">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact US</Link>
          </li>
          <li>
            <Link to="/">Cart</Link>
          </li>

          <button
            className="login-btn"
            onClick={() => {
              btnName === "login" ? setBtnName("logout") : setBtnName("login");
            }}
          >
            {btnName}
          </button>
        </ul>
      </div>
    </div>
  );
}
