import { Link } from "react-router-dom";
import useCheckLoginStatus from "../hooks/useCheckLoginStatus";

const Landing = () => {
  useCheckLoginStatus();
  const year = new Date().getFullYear();

  const primary = "oklch(0.5393 0.2713 286.7462)";
  const cardBorder = "oklch(0.93 0.0094 286.2156)";
  const bg = "oklch(0.994 0 0)";
  const text = "oklch(0 0 0)";

  const cardClass =
    "bg-white border border-[oklch(0.93_0.0094_286.2156)] rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.05)]";

  return (
    <div
      className="min-h-screen font-sans"
      style={{
        backgroundColor: bg,
        color: text,
        letterSpacing: "-0.025em",
        fontFamily: '"Plus Jakarta Sans", sans-serif',
      }}
    >
      {/* Hero Section */}
      <section className="px-4 py-28 md:py-36">
        <div
          className={`flex flex-col-reverse lg:flex-row items-center justify-between max-w-7xl mx-auto gap-16 md:gap-24 lg:gap-32 py-12 px-6 ${cardClass}`}
        >
          <div className="flex-1 text-center lg:text-left space-y-6 p-4">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Fresh Flavors,
              <br className="hidden lg:inline" /> Delivered Daily.
            </h1>
            <p className="text-lg sm:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 text-gray-700">
              Discover local gems and order your favorite meals with effortless
              ease. Quality food, right to your doorstep.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <Link
                to="/signup/customer"
                className="px-8 py-3 text-lg font-semibold rounded-full text-white transition-all duration-300 shadow-lg hover:brightness-110"
                style={{ backgroundColor: primary }}
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="px-8 py-3 text-lg font-semibold rounded-full border hover:bg-gray-100 transition duration-300"
                style={{ borderColor: cardBorder }}
              >
                Sign In
              </Link>
            </div>
          </div>

          <div className="flex-1 flex justify-center items-center">
            <div
              className={`w-full max-w-xs sm:max-w-md aspect-square overflow-hidden ${cardClass}`}
            >
              <img
                src="/burger.png"
                alt="Delicious Gourmet Burger"
                className="w-full h-full object-cover p-6 rounded-[1.5rem]"
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

      {/* Partner With Us */}
      <section className="py-24 px-4 bg-white">
        <div
          className={`max-w-5xl mx-auto text-center px-6 py-16 ${cardClass}`}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Partner With Us
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed mb-8">
            Are you a restaurant looking to expand your reach and delight more
            customers? Join our platform and let us handle the delivery, so you
            can focus on crafting incredible food.
          </p>
          <Link
            to="/signup/restaurant"
            className="px-10 py-4 text-lg font-semibold text-white rounded-full shadow-lg transition duration-300 hover:brightness-110"
            style={{ backgroundColor: primary }}
          >
            Sign Up Your Restaurant
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-10 px-4"
        style={{
          backgroundColor: "oklch(0 0 0)",
          color: "oklch(1 0 0)",
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm opacity-90">
          <p>&copy; {year} FoodApp. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:underline transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline transition">
              Terms of Service
            </a>
            <a href="#" className="hover:underline transition">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
