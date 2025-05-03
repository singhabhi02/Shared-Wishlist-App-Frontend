import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-pink-200 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-3xl font-extrabold text-purple-700 tracking-wide">
          Shared Wishlist App
        </h1>
        <div className="space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-purple-700 border border-purple-500 px-5 py-2 rounded-full font-semibold hover:bg-purple-100 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-purple-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-purple-700 transition"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 mt-10">
        {/* Text Section */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-5xl font-extrabold text-gray-800 leading-tight mb-4">
            Plan, Share & Shop Together
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Create collaborative wishlists with your friends and family. Perfect
            for birthdays, holidays, and shopping sprees — make it fun and
            social!
          </p>
          <div className="hidden md:block">
            <button
              onClick={() => navigate("/signup")}
              className="bg-green-500 text-white px-6 py-3 rounded-full text-lg font-bold hover:bg-green-600 transition"
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center mb-10 md:mb-0">
          <img
            src="https://illustrations.popsy.co/gray/shopping-cart.svg"
            alt="Collaborative shopping illustration"
            className="w-full max-w-md"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
