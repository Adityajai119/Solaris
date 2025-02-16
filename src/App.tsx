import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import SimulationDashboard from './components/SimulationDashboard';
import Education from './pages/Education';
import AIOptimization from './components/AIOptimization';
import FancySun from './components/FancySun';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggleTheme = () => {
    setIsTransitioning(true);
    setIsDark(!isDark);
    
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Reset transition state after animation completes
    setTimeout(() => setIsTransitioning(false), 300);
  };

  return (
    <ThemeProvider>
      <Router>
        <div className={`min-h-screen transition-all duration-300 ease-in-out ${
          isTransitioning ? 'opacity-90 scale-[0.99]' : 'opacity-100 scale-100'
        } ${
          isDark 
            ? 'dark bg-dark-bg text-dark-text-primary' 
            : 'bg-light-bg text-light-text-primary'
        }`}>
          <div className="fixed top-4 right-4 w-24 h-24 z-50">
            <FancySun isDark={isDark} onToggle={toggleTheme} />
          </div>
          <Navbar isDark={isDark} />
          <div className={`transition-transform duration-300 ${isTransitioning ? 'scale-[0.99]' : 'scale-100'}`}>
            <Routes>
              <Route path="/" element={<Home isDark={isDark} />} />
              <Route path="/simulation" element={<SimulationDashboard isDark={isDark} />} />
              <Route path="/education" element={<Education isDark={isDark} />} />
              <Route path="/optimization" element={<AIOptimization isDark={isDark} />} />
            </Routes>
          </div>
          <Chatbot isDark={isDark} />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;