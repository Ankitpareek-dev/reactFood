import { Link } from "react-router-dom";
import Login from "./Login";
import useCheckLoginStatus from "../hooks/useCheckLoginStatus";

const Landing = () => {
  useCheckLoginStatus();
  const year = new Date().getFullYear();

  const containerStyle = {
    backgroundColor: "oklch(0.994 0 0)",
    color: "oklch(0 0 0)",
    letterSpacing: "-0.025em",
    fontFamily: '"Plus Jakarta Sans", sans-serif',
  };

  const cardStyle =
    "bg-white border border-[oklch(0.93_0.0094_286.2156)] rounded-[1.4rem] shadow-xl";

  return (
    <div className="min-h-screen font-sans antialiased" style={containerStyle}>
      <section className="flex mt-8 flex-col min-h-screen px-4 py-16">
        <div
          className={`flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto gap-12 py-16 px-8 ${cardStyle}`}
        >
          <div className="flex-1 text-center md:text-left p-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
              Fresh Flavors, <br className="hidden md:inline" /> Delivered
              Daily.
            </h1>
            <p className="text-lg sm:text-xl mb-8 max-w-xl">
              Discover local gems and order your favorite meals with effortless
              ease. Quality food, right to your doorstep.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link
                to="/signup/customer"
                className="px-8 py-3 text-lg font-bold rounded-[1.4rem] text-white"
                style={{ backgroundColor: "oklch(0.5393 0.2713 286.7462)" }}
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="px-8 py-3 text-lg font-bold border rounded-[1.4rem] border-[oklch(0.93_0.0094_286.2156)]"
              >
                Sign In
              </Link>
            </div>
          </div>

          <div className="flex-1 mt-12 md:mt-0 flex justify-center items-center p-4">
            <div
              className={`relative w-full max-w-md lg:max-w-xl aspect-square overflow-hidden ${cardStyle}`}
            >
              <img
                src="/burger.png"
                alt="Delicious Gourmet Burger"
                className="w-full h-full object-cover p-6 rounded-2xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/600x600/F0F0F0/888888?text=Food+Image";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className={`max-w-6xl mx-auto text-center p-8 ${cardStyle}`}>
          <h2 className="text-4xl font-extrabold mb-8">Partner With Us</h2>
          <pd className="text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Are you a restaurant looking to expand your reach and delight more
            customers? Join our platform and let us handle the delivery, so you
            can focus on crafting incredible food.
          </pd>
          <Link
            to="/signup/restaurant"
            className="px-10 py-4 text-xl font-bold text-white rounded-[1.4rem]"
            style={{ backgroundColor: "oklch(0.5393 0.2713 286.7462)" }}
          >
            Sign Up Your Restaurant
          </Link>
        </div>
      </section>

      <footer
        className="py-8 px-4"
        style={{ backgroundColor: "oklch(0 0 0)", color: "oklch(1 0 0)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0">
            &copy; {year} FoodApp. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="hover:opacity-80">
              Privacy Policy
            </a>
            <a href="#" className="hover:opacity-80">
              Terms of Service
            </a>
            <a href="#" className="hover:opacity-80">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
