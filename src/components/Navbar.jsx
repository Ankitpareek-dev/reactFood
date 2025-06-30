import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-center px-4 md:px-8 mt-4">
      <div
        className="w-full max-w-7xl py-3 px-6 rounded-[1.4rem] shadow-md border"
        style={{
          backgroundColor: "oklch(0.994 0 0)", // same as hero background
          borderColor: "oklch(0.93 0.0094 286.2156)", // same border as hero
        }}
      >
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold" style={{ color: "oklch(0 0 0)" }}>
            🍔 FoodApp
          </div>
          <div>
            <div className="space-x-6 hidden md:flex">
              <Link
                to="/"
                className="text-base font-medium"
                style={{ color: "oklch(0 0 0)" }}
              >
                Home
              </Link>
              <a
                href="#"
                className="text-base font-medium"
                style={{ color: "oklch(0 0 0)" }}
              >
                Menu
              </a>
              <a
                href="#"
                className="text-base font-medium"
                style={{ color: "oklch(0 0 0)" }}
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
