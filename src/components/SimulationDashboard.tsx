import React, { useState, useEffect } from 'react';
import { LineChart, Settings, Thermometer, Cloud, Wind, Sun, Droplets } from 'lucide-react';
import SystemModels from './SystemModels';

interface SimulationParams {
  tiltAngle: number;
  azimuthAngle: number;
  panelSize: number;
  flowRate: number;
  heatCapacity: number;
  thermalConductivity: number;
  solarIrradiance: number;
  cloudCover: number;
}

const SimulationDashboard: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const [params, setParams] = useState<SimulationParams>({
    tiltAngle: 30,
    azimuthAngle: 180,
    panelSize: 2,
    flowRate: 2.5,
    heatCapacity: 4.18,
    thermalConductivity: 0.58,
    solarIrradiance: 1000,
    cloudCover: 0,
  });

  const [efficiency, setEfficiency] = useState(0);
  const [outputPower, setOutputPower] = useState(0);

  useEffect(() => {
    calculateSimulation();
  }, [params]);

  const calculateSimulation = () => {
    // Basic simulation calculation (simplified for demonstration)
    const baseEfficiency = 0.75;
    const tiltFactor = Math.cos((90 - params.tiltAngle) * Math.PI / 180);
    const cloudFactor = 1 - (params.cloudCover / 100) * 0.7;
    const flowFactor = Math.min(1, params.flowRate / 3);
    
    const calculatedEfficiency = baseEfficiency * tiltFactor * cloudFactor * flowFactor;
    const power = params.solarIrradiance * params.panelSize * calculatedEfficiency;
    
    setEfficiency(calculatedEfficiency * 100);
    setOutputPower(power);
  };

  const handleModelParameterChange = (modelParams: Record<string, number>) => {
    setParams(prev => ({
      ...prev,
      ...modelParams
    }));
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} p-6`}>
      <div className="max-w-7xl mx-auto">
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-8`}>
          Solar Thermal System Simulation
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Parameters Panel */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
            <h2 className={`text-xl font-semibold mb-4 flex items-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <Settings className="mr-2" /> System Parameters
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Tilt Angle (°)
                </label>
                <input
                  type="range"
                  min="0"
                  max="90"
                  value={params.tiltAngle}
                  onChange={(e) => setParams({...params, tiltAngle: Number(e.target.value)})}
                  className="w-full"
                />
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{params.tiltAngle}°</span>
              </div>

              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Azimuth Angle (°)
                </label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={params.azimuthAngle}
                  onChange={(e) => setParams({...params, azimuthAngle: Number(e.target.value)})}
                  className="w-full"
                />
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{params.azimuthAngle}°</span>
              </div>

              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Panel Size (m²)
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={params.panelSize}
                  onChange={(e) => setParams({...params, panelSize: Number(e.target.value)})}
                  className="w-full"
                />
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{params.panelSize} m²</span>
              </div>

              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Flow Rate (L/min)
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="5"
                  step="0.1"
                  value={params.flowRate}
                  onChange={(e) => setParams({...params, flowRate: Number(e.target.value)})}
                  className="w-full"
                />
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{params.flowRate} L/min</span>
              </div>

              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Solar Irradiance (W/m²)
                </label>
                <input
                  type="range"
                  min="0"
                  max="1200"
                  step="50"
                  value={params.solarIrradiance}
                  onChange={(e) => setParams({...params, solarIrradiance: Number(e.target.value)})}
                  className="w-full"
                />
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{params.solarIrradiance} W/m²</span>
              </div>

              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Cloud Cover (%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={params.cloudCover}
                  onChange={(e) => setParams({...params, cloudCover: Number(e.target.value)})}
                  className="w-full"
                />
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{params.cloudCover}%</span>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
            <h2 className={`text-xl font-semibold mb-4 flex items-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <LineChart className="mr-2" /> Simulation Results
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className={`${isDark ? 'bg-blue-900' : 'bg-blue-50'} p-4 rounded-lg`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Thermometer className="text-blue-500 mr-2" />
                    <span className={`text-sm font-medium ${isDark ? 'text-blue-100' : ''}`}>System Efficiency</span>
                  </div>
                  <span className={`text-2xl font-bold ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>
                    {efficiency.toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className={`${isDark ? 'bg-green-900' : 'bg-green-50'} p-4 rounded-lg`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Sun className="text-green-500 mr-2" />
                    <span className={`text-sm font-medium ${isDark ? 'text-green-100' : ''}`}>Output Power</span>
                  </div>
                  <span className={`text-2xl font-bold ${isDark ? 'text-green-300' : 'text-green-600'}`}>
                    {outputPower.toFixed(0)} W
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className={`text-lg font-medium mb-3 ${isDark ? 'text-white' : ''}`}>System Status</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Sun className="text-yellow-500 mr-2" />
                  <span className={isDark ? 'text-gray-300' : ''}>Solar Input: {params.solarIrradiance} W/m²</span>
                </div>
                <div className="flex items-center">
                  <Cloud className={`${isDark ? 'text-gray-400' : 'text-gray-500'} mr-2`} />
                  <span className={isDark ? 'text-gray-300' : ''}>Cloud Cover: {params.cloudCover}%</span>
                </div>
                <div className="flex items-center">
                  <Wind className="text-blue-500 mr-2" />
                  <span className={isDark ? 'text-gray-300' : ''}>Flow Rate: {params.flowRate} L/min</span>
                </div>
                <div className="flex items-center">
                  <Droplets className="text-blue-500 mr-2" />
                  <span className={isDark ? 'text-gray-300' : ''}>Panel Area: {params.panelSize} m²</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Models Grid */}
        <SystemModels onParameterChange={handleModelParameterChange} isDark={isDark} />
      </div>
    </div>
  );
};

export default SimulationDashboard;