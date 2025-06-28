// import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="px-6 py-20 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Delicious Meals Delivered <span className="text-blue-600">Fast</span>{" "}
          & Fresh
        </h2>
        <p className="mt-6 text-lg text-gray-600">
          Explore cuisines, order your favorite dishes, and enjoy doorstep
          delivery in minutes.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/signup"
            className="px-6 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
          <a
            href="#menu"
            className="px-6 py-3 rounded-md border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition"
          >
            Explore Menu
          </a>
        </div>
      </section>
    </div>
  );
};

export default Landing;
