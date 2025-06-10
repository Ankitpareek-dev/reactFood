import { HEADER_LOGO_URL } from "../utils/constants";
export default function Header() {
  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={HEADER_LOGO_URL} />
      </div>

      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Cart</li>
        </ul>
      </div>
    </div>
  );
}
