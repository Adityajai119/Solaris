import React, { useState, Suspense } from 'react';
import { X, Calendar, MapPin } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { INDIA_LOCATIONS } from '../data/locations';
import { Model3D } from './3DModels';

interface SystemModel {
  id: string;
  name: string;
  description: string;
  modelPath: string;
  defaultParams: Record<string, number | string>;
}

const SYSTEM_MODELS: SystemModel[] = [
  {
    id: 'flat-plate',
    name: 'Flat Plate Collector',
    description: 'Standard flat plate collector with high efficiency for domestic hot water.',
    modelPath: 'flat-plate',
    defaultParams: {
      tiltAngle: 35,
      flowRate: 2.5,
      panelSize: 2,
      location: 'Mumbai, Maharashtra',
      time: '12:00'
    }
  },
  {
    id: 'evacuated-tube',
    name: 'Evacuated Tube Collector',
    description: 'High-performance vacuum tubes for superior insulation and efficiency.',
    modelPath: 'evacuated-tube',
    defaultParams: {
      tiltAngle: 30,
      flowRate: 2.0,
      panelSize: 1.8,
      location: 'Mumbai, Maharashtra',
      time: '12:00'
    }
  },
  {
    id: 'parabolic-trough',
    name: 'Parabolic Trough',
    description: 'Concentrating collector for high-temperature applications.',
    modelPath: 'parabolic-trough',
    defaultParams: {
      tiltAngle: 0,
      flowRate: 3.0,
      panelSize: 4,
      location: 'Mumbai, Maharashtra',
      time: '12:00'
    }
  },
  {
    id: 'compound-parabolic',
    name: 'Compound Parabolic Collector',
    description: 'Non-tracking concentrator with medium concentration ratio.',
    modelPath: 'compound-parabolic',
    defaultParams: {
      tiltAngle: 25,
      flowRate: 2.8,
      panelSize: 3,
      location: 'Mumbai, Maharashtra',
      time: '12:00'
    }
  },
  {
    id: 'fresnel-lens',
    name: 'Fresnel Lens Collector',
    description: 'Linear Fresnel reflector system for industrial process heat.',
    modelPath: 'fresnel-lens',
    defaultParams: {
      tiltAngle: 15,
      flowRate: 3.5,
      panelSize: 5,
      location: 'Mumbai, Maharashtra',
      time: '12:00'
    }
  },
  {
    id: 'thermosyphon',
    name: 'Thermosyphon System',
    description: 'Passive system using natural convection for fluid circulation.',
    modelPath: 'thermosyphon',
    defaultParams: {
      tiltAngle: 40,
      flowRate: 1.5,
      panelSize: 2.2,
      location: 'Mumbai, Maharashtra',
      time: '12:00'
    }
  },
  {
    id: 'integrated-collector',
    name: 'Integrated Collector Storage',
    description: 'Combined collector and storage unit for simplified installation.',
    modelPath: 'integrated-collector',
    defaultParams: {
      tiltAngle: 45,
      flowRate: 2.0,
      panelSize: 2.5,
      location: 'Mumbai, Maharashtra',
      time: '12:00'
    }
  },
  {
    id: 'heat-pipe',
    name: 'Heat Pipe Collector',
    description: 'Advanced evacuated tubes with internal heat pipes.',
    modelPath: 'heat-pipe',
    defaultParams: {
      tiltAngle: 35,
      flowRate: 2.2,
      panelSize: 1.9,
      location: 'Mumbai, Maharashtra',
      time: '12:00'
    }
  },
  {
    id: 'unglazed',
    name: 'Unglazed Collector',
    description: 'Simple design for low-temperature applications like pool heating.',
    modelPath: 'unglazed',
    defaultParams: {
      tiltAngle: 20,
      flowRate: 4.0,
      panelSize: 3.5,
      location: 'Mumbai, Maharashtra',
      time: '12:00'
    }
  },
  {
    id: 'air-based',
    name: 'Air-Based Collector',
    description: 'Using air as heat transfer medium for space heating.',
    modelPath: 'air-based',
    defaultParams: {
      tiltAngle: 50,
      flowRate: 5.0,
      panelSize: 3.0,
      location: 'Mumbai, Maharashtra',
      time: '12:00'
    }
  }
];

interface ModelViewerProps {
  model: SystemModel;
  onClose: () => void;
  onParameterChange: (params: Record<string, number | string>) => void;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ model, onClose, onParameterChange }) => {
  const [params, setParams] = useState(model.defaultParams);
  const [efficiency, setEfficiency] = useState(0);
  const [outputPower, setOutputPower] = useState(0);

  const calculateOutput = (newParams: Record<string, number | string>) => {
    // Enhanced calculation considering location and time
    const location = INDIA_LOCATIONS.find(loc => loc.name === newParams.location);
    const time = newParams.time as string;
    const hour = parseInt(time.split(':')[0]);
    
    // Basic solar position factor (0-1) based on time of day
    const timeFactor = Math.sin(Math.PI * (hour - 6) / 12);
    
    // Location-based factors
    const latitudeFactor = location ? Math.cos((location.latitude * Math.PI) / 180) : 1;
    const altitudeFactor = location ? Math.exp(-location.altitude / 10000) : 1;
    
    // Calculate efficiency
    const baseEfficiency = 0.75;
    const tiltFactor = Math.cos((90 - (newParams.tiltAngle as number)) * Math.PI / 180);
    const flowFactor = Math.min(1, (newParams.flowRate as number) / 3);
    
    const calculatedEfficiency = baseEfficiency * tiltFactor * flowFactor * timeFactor * latitudeFactor * altitudeFactor;
    const power = 1000 * (newParams.panelSize as number) * calculatedEfficiency;
    
    setEfficiency(calculatedEfficiency * 100);
    setOutputPower(power);
  };

  const handleParamChange = (key: string, value: number | string) => {
    const newParams = { ...params, [key]: value };
    setParams(newParams);
    onParameterChange(newParams);
    calculateOutput(newParams);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-hidden">
      <div className="bg-white rounded-lg max-w-6xl w-full mx-4 max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">{model.name}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="h-[400px] bg-gray-100 rounded-lg sticky top-0">
              <Suspense fallback={<div className="w-full h-full flex items-center justify-center">Loading 3D Model...</div>}>
                <Canvas>
                  <PerspectiveCamera makeDefault position={[5, 5, 5]} />
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <Model3D modelPath={model.modelPath} />
                  <OrbitControls />
                </Canvas>
              </Suspense>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">System Parameters</h3>
              
              {/* Location Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <MapPin className="inline-block w-4 h-4 mr-1" />
                  Location
                </label>
                <select
                  value={params.location as string}
                  onChange={(e) => handleParamChange('location', e.target.value)}
                  className="w-full border rounded-md p-2"
                >
                  {INDIA_LOCATIONS.map((location) => (
                    <option key={location.name} value={location.name}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="inline-block w-4 h-4 mr-1" />
                  Time
                </label>
                <input
                  type="time"
                  value={params.time as string}
                  onChange={(e) => handleParamChange('time', e.target.value)}
                  className="w-full border rounded-md p-2"
                />
              </div>

              {/* Numeric Parameters */}
              {Object.entries(params).map(([key, value]) => {
                if (typeof value === 'number') {
                  return (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </label>
                      <input
                        type="range"
                        min={0}
                        max={key === 'tiltAngle' ? 90 : key === 'flowRate' ? 10 : 20}
                        step={0.1}
                        value={value}
                        onChange={(e) => handleParamChange(key, Number(e.target.value))}
                        className="w-full"
                      />
                      <span className="text-sm text-gray-500">{value.toFixed(1)}</span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>

        {/* Output Display - Fixed at bottom */}
        <div className="border-t p-6 bg-white">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-lg font-semibold mb-3">Simulation Output</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-md shadow">
                <div className="text-sm text-gray-600">System Efficiency</div>
                <div className="text-2xl font-bold text-yellow-600">
                  {efficiency.toFixed(1)}%
                </div>
              </div>
              <div className="bg-white p-3 rounded-md shadow">
                <div className="text-sm text-gray-600">Output Power</div>
                <div className="text-2xl font-bold text-green-600">
                  {outputPower.toFixed(0)} W
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SystemModels: React.FC<{
  onParameterChange: (params: Record<string, number | string>) => void;
}> = ({ onParameterChange }) => {
  const [selectedModel, setSelectedModel] = useState<SystemModel | null>(null);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6">Solar Thermal System Models</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SYSTEM_MODELS.map((model) => (
          <div
            key={model.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
            onClick={() => setSelectedModel(model)}
          >
            <div className="h-48 bg-gray-100">
              <Suspense fallback={<div className="w-full h-full flex items-center justify-center">Loading 3D Model...</div>}>
                <Canvas>
                  <PerspectiveCamera makeDefault position={[3, 3, 3]} />
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <Model3D modelPath={model.modelPath} />
                  <OrbitControls enableZoom={false} enablePan={false} />
                </Canvas>
              </Suspense>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{model.name}</h3>
              <p className="text-gray-600 text-sm line-clamp-2">{model.description}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedModel && (
        <ModelViewer
          model={selectedModel}
          onClose={() => setSelectedModel(null)}
          onParameterChange={onParameterChange}
        />
      )}
    </div>
  );
};

export default SystemModels;