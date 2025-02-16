import React from 'react';
import { ArrowRight, Sun, Brain, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <div className={`${isDark ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-yellow-50 to-orange-50'} py-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} sm:text-5xl md:text-6xl`}>
              Simulation Based Solar Thermal System
              <span className={`block ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>with AI/ML Optimization</span>
            </h1>
            <p className={`mt-3 max-w-md mx-auto text-base ${isDark ? 'text-gray-300' : 'text-gray-500'} sm:text-lg md:mt-5 md:text-xl md:max-w-3xl`}>
              Advanced simulation platform for solar thermal systems with integrated AI optimization
              and machine learning capabilities.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <Link
                to="/simulation"
                className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md ${
                  isDark 
                    ? 'text-gray-900 bg-yellow-400 hover:bg-yellow-500'
                    : 'text-white bg-yellow-600 hover:bg-yellow-700'
                }`}
              >
                Start Simulation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className={`py-12 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <FeatureCard
              icon={<Sun className="h-8 w-8 text-yellow-500" />}
              title="Advanced Simulation"
              description="Precise modeling of solar thermal systems with real-time parameter adjustment and performance analysis."
              isDark={isDark}
            />
            <FeatureCard
              icon={<Brain className="h-8 w-8 text-yellow-500" />}
              title="AI Optimization"
              description="Machine learning algorithms for optimal system configuration and performance prediction."
              isDark={isDark}
            />
            <FeatureCard
              icon={<BookOpen className="h-8 w-8 text-yellow-500" />}
              title="Educational Resources"
              description="Comprehensive learning materials and interactive 3D models for understanding solar thermal systems."
              isDark={isDark}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  isDark 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  isDark: boolean;
}) => (
  <div className={`${
    isDark 
      ? 'bg-gray-700 hover:bg-gray-600'
      : 'bg-gray-50 hover:bg-gray-100'
  } p-6 rounded-lg shadow-sm hover:shadow-md transition-all`}>
    <div className="flex items-center mb-4">
      {icon}
      <h3 className={`ml-3 text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
    </div>
    <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{description}</p>
  </div>
);

export default Home;