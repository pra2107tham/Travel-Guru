import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#040D12] text-white flex flex-col items-center justify-center font-sans">
        <div className="LandingPage text-center py-20">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in font-poppins">
            Welcome to our Travel Guru App
          </h1>
          <p className="text-xl mb-8 animate-fade-in-delayed font-poppins">
            Your ultimate AI travel companion
          </p>
          <Link to="/">
            <button className="bg-cyan-600 text-white font-semibold py-2 px-4 rounded hover:bg-cyan-500 transition duration-300 ease-in-out transform hover:scale-105 animate-bounce">
              Get Started
            </button>
          </Link>
        </div>
        <div className="AboutMe text-center py-20 animate-fade-in-delayed">
          <h2 className="text-4xl font-semibold mb-4 font-poppins">About Us</h2>
          <p className="text-lg max-w-prose mx-auto font-sans">
            Travel Guru is your one-stop solution for all your travel doubts. We provide you with the best travel guides, tips, and tricks to make your travel experience memorable. We provide a live Map feature to help you navigate through your journey. We also offer the best travel packages and deals to make your travel experience affordable. We are here to make your travel experience hassle-free and memorable.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
