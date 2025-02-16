import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, BookOpen, Home, LineChart, Settings, Brain, Phone } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isDark }) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className={`${
      isDark 
        ? 'bg-dark-card border-dark-hover' 
        : 'bg-light-card border-light-hover'
    } shadow-lg border-b transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Sun className={`h-8 w-8 ${isDark ? 'text-dark-text-accent' : 'text-light-text-accent'}`} />
              <span className={`ml-2 text-xl font-bold ${
                isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
              }`}>SolarAI Sim</span>
            </div>
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavLink to="/" icon={<Home />} text="Home" isActive={isActive('/')} isDark={isDark} />
              <NavLink to="/simulation" icon={<LineChart />} text="Simulation" isActive={isActive('/simulation')} isDark={isDark} />
              <NavLink to="/education" icon={<BookOpen />} text="Education" isActive={isActive('/education')} isDark={isDark} />
              <NavLink to="/optimization" icon={<Brain />} text="AI Optimization" isActive={isActive('/optimization')} isDark={isDark} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink: React.FC<{
  to: string;
  icon: React.ReactNode;
  text: string;
  isActive: boolean;
  isDark: boolean;
}> = ({ to, icon, text, isActive, isDark }) => (
  <Link
    to={to}
    className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors duration-300 ${
      isActive
        ? `${isDark ? 'border-dark-text-accent text-dark-text-primary' : 'border-light-text-accent text-light-text-primary'}`
        : `${isDark 
            ? 'border-transparent text-dark-text-secondary hover:text-dark-text-primary hover:border-dark-text-secondary' 
            : 'border-transparent text-light-text-secondary hover:text-light-text-primary hover:border-light-text-secondary'
          }`
    }`}
  >
    <span className="mr-2">{icon}</span>
    {text}
  </Link>
);

export default Navbar;