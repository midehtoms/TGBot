'use client'
import { useState, useEffect } from 'react';
import { Wallet, User } from 'lucide-react'; // Import Wallet and User icons

const TapToEarn = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [leftValue, setLeftValue] = useState(100); // The left value (initially 100)
  const [userScore, setUserScore] = useState(0); // Track user's score (initially 0)

  const maxValue = 100;

  // Start an interval to increase leftValue by 5 after it reaches 0
  useEffect(() => {
    const interval = setInterval(() => {
      if (leftValue === 0 || leftValue < 100) {
        setLeftValue(prev => Math.min(prev + 5, 100)); // Ensure it doesn't exceed 100
      }
    }, 1000); // Increase every second
    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [leftValue]);

  const handleTap = () => {
    if (leftValue > 0) {
      setIsAnimating(true);
      setShowScore(true);
      setConfetti(true);
      setLeftValue(prev => Math.max(prev - 5, 0)); // Decrease left value by 5, ensure it doesn't go below 0
      setUserScore(prev => prev + 5); // Increase user score by 5 each tap
      setTimeout(() => setShowScore(false), 2000); // Hide score after 2 seconds
      setTimeout(() => setConfetti(false), 3000); // Hide confetti after 3 seconds
    }
  };

  const connectWallet = () => {
    alert("Wallet connected!");
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  return (
    <div className="min-h-screen bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: "url('https://flux-image.com/_next/image?url=https%3A%2F%2Fai.flux-image.com%2Fflux%2Fdae7c915-8cee-43e5-9663-70ebc0ea7133.png&w=3840&q=75')" }}>
      {/* Connect Wallet Button */}
      <button
        onClick={connectWallet}
        className="absolute top-4 right-4 px-4 py-2 bg-green-400 text-white rounded-lg border border-white/40 shadow-md hover:opacity-90 transition duration-300 flex items-center gap-2 sm:top-8 sm:right-8"
      >
        <Wallet className="w-6 h-6 text-white" />
        Connect Wallet
      </button>

      {/* User Section (USER Icon + Panda Icon + User Score) */}
      <div className="absolute top-4 left-4 px-4 py-2 bg-white/20 backdrop-blur-lg rounded-lg border border-white/40 flex items-center gap-2 sm:top-8 sm:left-8 sm:px-6">
        {/* User Icon */}
        <User className="w-6 h-6 text-white" />
        <p className="text-xl font-bold text-white">USER</p>
        {/* Panda Icon in front of User Score */}
        <img src="https://www.pngkit.com/png/full/0-6264_panda-bear-panda-head-png.png" alt="Panda" className="w-6 h-6" />
        <p className="text-xl font-bold text-white">{userScore}</p>
      </div>

      {/* Tap Button with Panda Image */}
      <button
        onClick={handleTap}
        className={`
          absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
          w-48 h-48 rounded-full shadow-xl active:scale-95 transition-all duration-200
          flex items-center justify-center
          ${isAnimating ? 'scale-105' : 'scale-100'}
          bg-[url('https://img.stablecog.com/insecure/1920w/aHR0cHM6Ly9iLnN0YWJsZWNvZy5jb20vYjQ2MjE3ZTQtN2ZkNS00MGVhLWFkNDMtNzhiYWFjYzcwZTFlLmpwZWc.webp')]
          bg-cover bg-center
        `}
      >
        <div className="absolute inset-0 rounded-full" />
        <div className="relative flex flex-col items-center">
          <span className="text-xl font-bold text-white">TAP!</span>
        </div>

        {/* Score Popup */}
        {showScore && (
          <div className="absolute animate-score text-3xl text-green-400">
            +5
          </div>
        )}

        {/* Confetti Animation */}
        {confetti && (
          <div className="absolute top-0 left-0 w-full h-full bg-transparent animate-confetti z-10">
            <div className="confetti confetti-1"></div>
            <div className="confetti confetti-2"></div>
            <div className="confetti confetti-3"></div>
          </div>
        )}
      </button>

      {/* Counter Section (100/100) Below the Tap Button */}
      <div className="absolute bottom-20 left-4 px-4 py-2 bg-white/20 backdrop-blur-lg rounded-lg border border-white/40 flex items-center gap-2 sm:bottom-16 sm:left-8 sm:px-6">
        {/* Panda Icon */}
        <img src="https://www.pngkit.com/png/full/0-6264_panda-bear-panda-head-png.png" alt="Panda" className="w-6 h-6" />
        <p className="text-xl font-bold text-green-400">
          {leftValue}/{maxValue}
        </p>
      </div>

      {/* Upgrade Section (Right side of 100/100 Section) */}
      <div className="absolute bottom-20 right-4 px-4 py-2 bg-white/20 backdrop-blur-lg rounded-lg border border-white/40 flex items-center gap-2 sm:bottom-16 sm:right-8 sm:px-6">
        <p className="text-xl font-bold text-green-400">UPGRADE</p>
      </div>
    </div>
  );
};

export default TapToEarn;
