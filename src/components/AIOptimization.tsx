import React, { useState } from 'react';
import { Brain, Settings, Sun, Wind, Thermometer, CloudSun, Compass, Calendar, Factory, Database, Battery } from 'lucide-react';
import { INDIA_LOCATIONS } from '../data/locations';

interface OptimizationResult {
  tiltAngle: number;
  flowRate: number;
  panelSize: number;
  efficiency: number;
  power: number;
  confidence: number;
  recommendations: string[];
  monthlyProduction: { month: string; production: number }[];
  costSavings: number;
  environmentalImpact: {
    co2Reduction: number;
    treesEquivalent: number;
  };
}

type PanelType = 'flat-plate' | 'evacuated-tube' | 'parabolic-trough';
type UsageType = 'domestic' | 'commercial' | 'industrial' | 'agricultural';

const panelTypeInfo = {
  'flat-plate': {
    name: 'Flat Plate Collectors',
    efficiency: 0.7,
    costPerUnit: 15000,
    description: 'Best for domestic hot water and low-temperature applications'
  },
  'evacuated-tube': {
    name: 'Evacuated Tube Collectors',
    efficiency: 0.85,
    costPerUnit: 25000,
    description: 'Higher efficiency, suitable for colder climates'
  },
  'parabolic-trough': {
    name: 'Parabolic Trough',
    efficiency: 0.9,
    costPerUnit: 45000,
    description: 'High temperature applications, industrial use'
  }
};

const usageTypeInfo = {
  domestic: {
    typical: '5-15 kWh/day',
    description: 'Residential hot water and heating'
  },
  commercial: {
    typical: '20-100 kWh/day',
    description: 'Hotels, hospitals, and commercial buildings'
  },
  industrial: {
    typical: '100-500 kWh/day',
    description: 'Process heat and industrial applications'
  },
  agricultural: {
    typical: '10-50 kWh/day',
    description: 'Crop drying and greenhouse heating'
  }
};

const AIOptimization: React.FC<{ isDark?: boolean }> = ({ isDark = false }) => {
  const [selectedLocation, setSelectedLocation] = useState(INDIA_LOCATIONS[0]);
  const [budget, setBudget] = useState(50000);
  const [spaceAvailable, setSpaceAvailable] = useState(10);
  const [energyRequirement, setEnergyRequirement] = useState(20);
  const [usageType, setUsageType] = useState<UsageType>('domestic');
  const [sunlightHours, setSunlightHours] = useState(selectedLocation.annualSolarIrradiance / 365 / 1000 * 24);
  const [storageCapacity, setStorageCapacity] = useState(1000);
  const [panelType, setPanelType] = useState<PanelType>('flat-plate');
  const [hasBackup, setHasBackup] = useState(false);
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLocationChange = (locationName: string) => {
    const location = INDIA_LOCATIONS.find(loc => loc.name === locationName);
    if (location) {
      setSelectedLocation(location);
      setSunlightHours(location.annualSolarIrradiance / 365 / 1000 * 24);
    }
  };

  const optimizeSystem = () => {
    setLoading(true);
    
    setTimeout(() => {
      // Enhanced calculation based on new parameters
      const panelEfficiency = panelTypeInfo[panelType].efficiency;
      const dailyEnergy = energyRequirement;
      const usageMultiplier = {
        domestic: 1,
        commercial: 1.2,
        industrial: 1.5,
        agricultural: 1.3
      }[usageType];
      
      // Location-based adjustments
      const latitudeFactor = Math.cos((selectedLocation.latitude * Math.PI) / 180);
      const altitudeFactor = Math.exp(-selectedLocation.altitude / 10000);
      const temperatureFactor = 1 + (selectedLocation.avgTemperature - 25) / 100;
      
      const recommendedSize = Math.min(
        (dailyEnergy * usageMultiplier) / (sunlightHours * panelEfficiency),
        spaceAvailable,
        budget / panelTypeInfo[panelType].costPerUnit
      );
      
      const efficiency = panelEfficiency * latitudeFactor * altitudeFactor * temperatureFactor * (hasBackup ? 1.1 : 1);
      const power = selectedLocation.annualSolarIrradiance * recommendedSize * efficiency;
      
      // Generate monthly production data with seasonal variations
      const monthlyProduction = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ].map((month, index) => {
        // Seasonal adjustment factor
        const seasonalFactor = 1 + 0.2 * Math.sin((index - 5) * Math.PI / 6);
        return {
          month,
          production: power * seasonalFactor * (0.8 + Math.random() * 0.4)
        };
      });

      // Calculate environmental impact
      const annualProduction = monthlyProduction.reduce((sum, month) => sum + month.production, 0);
      const co2Reduction = annualProduction * 0.7;
      const treesEquivalent = co2Reduction / 20;

      // Generate system recommendations
      const recommendations = [
        `Optimal ${panelTypeInfo[panelType].name} system with ${recommendedSize.toFixed(1)}m² collector area`,
        `${storageCapacity}L storage tank recommended for your usage pattern`,
        `Expected daily energy production of ${(power * sunlightHours / 1000).toFixed(1)} kWh`,
        `${hasBackup ? 'Backup system integration recommended' : 'Solar-only system sufficient'} for your needs`,
        `Estimated annual CO2 reduction of ${co2Reduction.toFixed(0)} kg`,
        `Location-specific optimization for ${selectedLocation.name} with ${selectedLocation.annualSolarIrradiance} kWh/m²/year solar potential`
      ];

      const optimizedResult: OptimizationResult = {
        tiltAngle: Math.abs(selectedLocation.latitude) + 10,
        flowRate: 2.5 * (storageCapacity / 1000),
        panelSize: recommendedSize,
        efficiency: efficiency * 100,
        power,
        confidence: 85 + Math.random() * 10,
        recommendations,
        monthlyProduction,
        costSavings: annualProduction * 5,
        environmentalImpact: {
          co2Reduction,
          treesEquivalent
        }
      };
      
      setResult(optimizedResult);
      setLoading(false);
    }, 2000);
  };

  const textColor = isDark ? 'text-gray-300' : 'text-gray-700';
  const bgColor = isDark ? 'bg-gray-800' : 'bg-white';
  const accentColor = isDark ? 'text-yellow-400' : 'text-yellow-500';
  const cardBg = isDark ? 'bg-gray-700' : 'bg-gray-50';

  return (
    <div className={`min-h-screen py-12 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Brain className={`h-12 w-12 ${accentColor} mr-3`} />
            <h1 className="text-4xl font-bold">
              AI System Optimization
            </h1>
          </div>
          <p className={`mt-4 text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Let our AI optimize your solar thermal system based on your requirements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Parameters */}
          <div className={`rounded-lg shadow-lg p-6 ${bgColor}`}>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Settings className={`h-6 w-6 ${accentColor} mr-2`} />
              System Requirements
            </h2>

            <div className="space-y-6">
              {/* Location Selection */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${textColor}`}>
                  Location
                </label>
                <select
                  value={selectedLocation.name}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  className={`w-full border rounded-md p-2 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                >
                  {INDIA_LOCATIONS.map((loc) => (
                    <option key={loc.name} value={loc.name}>
                      {loc.name}, {loc.state} ({loc.annualSolarIrradiance} kWh/m²/year)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${textColor}`}>
                  Energy Requirement (kWh/day)
                </label>
                <input
                  type="range"
                  min="5"
                  max="500"
                  step="5"
                  value={energyRequirement}
                  onChange={(e) => setEnergyRequirement(Number(e.target.value))}
                  className="w-full"
                />
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                  {energyRequirement} kWh/day
                </span>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${textColor}`}>
                  Type of Usage
                </label>
                <select
                  value={usageType}
                  onChange={(e) => setUsageType(e.target.value as UsageType)}
                  className={`w-full border rounded-md p-2 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                >
                  {Object.entries(usageTypeInfo).map(([type, info]) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)} - {info.typical}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${textColor}`}>
                  Sunlight Hours per Day
                </label>
                <input
                  type="range"
                  min="4"
                  max="12"
                  step="0.5"
                  value={sunlightHours}
                  onChange={(e) => setSunlightHours(Number(e.target.value))}
                  className="w-full"
                />
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                  {sunlightHours.toFixed(1)} hours/day
                </span>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${textColor}`}>
                  Water Storage Capacity (Liters)
                </label>
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="500"
                  value={storageCapacity}
                  onChange={(e) => setStorageCapacity(Number(e.target.value))}
                  className="w-full"
                />
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                  {storageCapacity}L
                </span>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${textColor}`}>
                  Panel Type
                </label>
                <select
                  value={panelType}
                  onChange={(e) => setPanelType(e.target.value as PanelType)}
                  className={`w-full border rounded-md p-2 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                >
                  {Object.entries(panelTypeInfo).map(([type, info]) => (
                    <option key={type} value={type}>
                      {info.name} - {(info.efficiency * 100).toFixed(0)}% efficiency
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${textColor}`}>
                  Budget (₹)
                </label>
                <input
                  type="range"
                  min="10000"
                  max="1000000"
                  step="10000"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full"
                />
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                  ₹{budget.toLocaleString()}
                </span>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${textColor}`}>
                  Available Space (m²)
                </label>
                <input
                  type="range"
                  min="2"
                  max="500"
                  step="1"
                  value={spaceAvailable}
                  onChange={(e) => setSpaceAvailable(Number(e.target.value))}
                  className="w-full"
                />
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                  {spaceAvailable} m²
                </span>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="backup"
                  checked={hasBackup}
                  onChange={(e) => setHasBackup(e.target.checked)}
                  className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
                />
                <label htmlFor="backup" className={`ml-2 block text-sm ${textColor}`}>
                  Include Backup Heating System
                </label>
              </div>

              <button
                onClick={optimizeSystem}
                disabled={loading}
                className={`w-full py-3 px-4 rounded-md text-white font-medium ${
                  loading 
                    ? 'bg-gray-400' 
                    : isDark 
                      ? 'bg-yellow-400 hover:bg-yellow-500'
                      : 'bg-yellow-500 hover:bg-yellow-600'
                }`}
              >
                {loading ? 'Optimizing...' : 'Optimize System'}
              </button>
            </div>
          </div>

          {/* Results Panel */}
          <div className={`rounded-lg shadow-lg p-6 ${bgColor}`}>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Brain className={`h-6 w-6 ${accentColor} mr-2`} />
              Optimization Results
            </h2>

            {result ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg ${cardBg}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Sun className={accentColor} />
                        <span className="text-sm font-medium ml-2">Tilt Angle</span>
                      </div>
                      <span className="text-lg font-bold">
                        {result.tiltAngle.toFixed(1)}°
                      </span>
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg ${cardBg}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Wind className="text-blue-500" />
                        <span className="text-sm font-medium ml-2">Flow Rate</span>
                      </div>
                      <span className="text-lg font-bold">
                        {result.flowRate.toFixed(1)} L/min
                      </span>
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg ${cardBg}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Thermometer className="text-red-500" />
                        <span className="text-sm font-medium ml-2">Efficiency</span>
                      </div>
                      <span className="text-lg font-bold">
                        {result.efficiency.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg ${cardBg}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Settings className="text-green-500" />
                        <span className="text-sm font-medium ml-2">Panel Size</span>
                      </div>
                      <span className="text-lg font-bold">
                        {result.panelSize.toFixed(1)} m²
                      </span>
                    </div>
                  </div>
                </div>

                {/* Monthly Production Chart */}
                <div className={`p-4 rounded-lg ${cardBg}`}>
                  <h3 className="text-lg font-semibold mb-4">Monthly Energy Production</h3>
                  <div className="h-40 flex items-end space-x-2">
                    {result.monthlyProduction.map((month, index) => (
                      <div key={month.month} className="flex-1 flex flex-col items-center">
                        <div 
                          className={isDark ? 'bg-yellow-400' : 'bg-yellow-500'}
                          style={{ 
                            height: `${(month.production / Math.max(...result.monthlyProduction.map(m => m.production))) * 100}%`,
                            width: '100%'
                          }}
                        ></div>
                        <span className="text-xs mt-1 rotate-45 origin-left">{month.month.substring(0, 3)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Environmental Impact */}
                <div className={`p-4 rounded-lg ${cardBg}`}>
                  <h3 className="text-lg font-semibold mb-2">Environmental Impact</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>CO2 Reduction</span>
                      <p className="text-xl font-bold">{result.environmentalImpact.co2Reduction.toFixed(0)} kg/year</p>
                    </div>
                    <div>
                      <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Trees Equivalent</span>
                      <p className="text-xl font-bold">{result.environmentalImpact.treesEquivalent.toFixed(0)} trees</p>
                    </div>
                  </div>
                </div>

                {/* Cost Savings */}
                <div className={`p-4 rounded-lg ${cardBg}`}>
                  <h3 className="text-lg font-semibold mb-2">Financial Benefits</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Annual Savings</span>
                      <p className="text-xl font-bold">₹{result.costSavings.toFixed(0)}</p>
                    </div>
                    <div>
                      <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>ROI Period</span>
                      <p className="text-xl font-bold">{(budget / result.costSavings).toFixed(1)} years</p>
                    </div>
                  </div>
                </div>

                {/* AI Recommendations */}
                <div className={`p-4 rounded-lg ${isDark ? 'bg-yellow-900/20' : 'bg-yellow-50'}`}>
                  <h3 className="text-lg font-semibold mb-2">AI Recommendations</h3>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 mt-2 mr-2 rounded-full bg-yellow-500" />
                        <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Confidence Score */}
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-yellow-50'}`}>
                  <h3 className="text-lg font-semibold mb-2">AI Confidence Score</h3>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${
                          isDark ? 'bg-yellow-400/20 text-yellow-400' : 'bg-yellow-200 text-yellow-600'
                        }`}>
                          {result.confidence.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className={`overflow-hidden h-2 mb-4 text-xs flex rounded ${isDark ? 'bg-gray-600' : 'bg-yellow-200'}`}>
                      <div
                        style={{ width: `${result.confidence}%` }}
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                          isDark ? 'bg-yellow-400' : 'bg-yellow-500'
                        }`}
                      ></div>
                    </div>
                  </div>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    Based on historical data and current conditions, our AI is
                    {result.confidence > 90 ? ' very confident' : ' confident'} in these recommendations.
                  </p>
                </div>
              </div>
            ) : (
              <div className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-500'} py-12`}>
                {loading ? (
                  <div className="animate-pulse">
                    <Brain className={`h-12 w-12 mx-auto mb-4 ${accentColor}`} />
                    <p>AI is analyzing optimal parameters...</p>
                  </div>
                ) : (
                  <p>Enter your requirements and click optimize to get AI recommendations</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIOptimization;