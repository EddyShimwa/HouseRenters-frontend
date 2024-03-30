/* eslint-disable */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './Images/logo.png'; 
import "../App.css";

const SplashPage = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/home');
  }

  return (
    <div 
      className="splash-page h-screen flex flex-col items-center justify-center "
    >
      <div className="flex items-center mb-2 ">
        <h2 className="text-6xl text-white -mr-6 font-bold mt-9 ">SCHOLARZ</h2>
        <img src={logo} alt="Logo" className="mx-2" />
        <h2 className="text-6xl text-white -ml-8 font-bold mt-9">NID</h2>
      </div>
      <h1 className="text-6xl text-white mb-8 font-bold">
        House Renting Made <span style={{ color: '#2dbcfa' }}>Easy</span>!
      </h1>
      <div className="textdiv" style={{ maxWidth: '30%', margin: '0 auto' }}>
        <h4 className="mytext text-2xl animate-pulse">
          Unlock a world of possibilities and convenience in house hunting with our simplified renting solutions.
        </h4>
      </div>
      <button 
        className="transition duration-700 ease-in-out py-2 px-4 rounded-half text-xl font-bold mt-8 get-started animate-bounce"
        onClick={navigateToHome}
      >
        Let's Get Started
      </button>
      <footer className="mt-auto text-center pb-4">
        © {new Date().getFullYear()} SCHOLARZNID. All rights reserved.
      </footer>
    </div>
  );
}

export default SplashPage;