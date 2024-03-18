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
  <div className="flex items-center mb-2">
  <h2 className="text-8xl text-white mr-1 font-bold mt-6">SCHOLAR</h2>
  <img src={logo} alt="Logo" className="mx-2" />
  <h2 className="text-8xl text-white ml-1 font-bold mt-6">NID</h2>
</div>
      <h1 className="text-6xl text-white mb-8 font-bold">
        House Renting Made <span style={{ color: '#2dbcfa' }}>Easy</span>!
      </h1>
      <h4 style={{ color: 'white', fontSize: '1.5rem', textAlign: 'center', maxWidth: '50%', margin: '0 auto', color: "#ededed" }}>
        Unlock a world of possibilities and convenience in house hunting with our simplified renting solutions.
      </h4>
      <button 
        className="bg-white text-blue-500 py-2 px-4 rounded-full text-xl font-bold mt-8"
        onClick={navigateToHome}
      >
        Let's Get Started
      </button>
    </div>
  );
}

export default SplashPage;