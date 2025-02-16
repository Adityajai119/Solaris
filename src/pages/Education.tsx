import React, { Suspense } from 'react';
import { Book, Sun, Thermometer, Droplets, Wind } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { getEducationalModel } from '../components/EducationalModels';

const EDUCATIONAL_CONTENT = [
  {
    id: 'solar-collector',
    title: 'Solar Collector Components',
    description: 'Understanding the key components of a solar thermal collector system.',
    modelType: 'absorber-plate',
    sections: [
      {
        title: 'Absorber Plate',
        description: 'Dark-colored surface that absorbs solar radiation and converts it to heat',
        modelType: 'absorber-plate',
        details: [
          'Usually made of copper or aluminum',
          'Selective coating maximizes absorption',
          'High thermal conductivity',
          'Direct contact with heat transfer fluid'
        ]
      },
      {
        title: 'Glazing Cover',
        description: 'Transparent cover that allows sunlight while reducing heat loss',
        modelType: 'glazing-cover',
        details: [
          'Tempered low-iron glass',
          'Reduces convection losses',
          'Prevents dust accumulation',
          'Creates greenhouse effect'
        ]
      },
      {
        title: 'Insulation Layer',
        description: 'Reduces heat loss from the back and sides of the collector',
        modelType: 'insulation',
        details: [
          'High-temperature resistant material',
          'Low thermal conductivity',
          'Weather-resistant backing',
          'Prevents heat loss'
        ]
      },
      {
        title: 'Heat Transfer System',
        description: 'Circulates fluid to transfer heat from collector to storage',
        modelType: 'heat-transfer',
        details: [
          'Copper piping network',
          'Antifreeze mixture',
          'Forced or natural circulation',
          'Temperature sensors'
        ]
      }
    ]
  },
  {
    id: 'heat-transfer',
    title: 'Heat Transfer Mechanisms',
    description: 'Understanding how heat moves through the system.',
    modelType: 'heat-transfer',
    sections: [
      {
        title: 'Radiation',
        description: 'Solar energy transfer through electromagnetic waves',
        modelType: 'radiation',
        details: [
          'Primary heat input',
          'Wavelength dependent',
          'Direct and diffuse',
          'Affected by atmosphere'
        ]
      },
      {
        title: 'Conduction',
        description: 'Heat transfer through solid materials',
        modelType: 'conduction',
        details: [
          'Through absorber plate',
          'Through pipe walls',
          'Material dependent',
          'Temperature gradient driven'
        ]
      },
      {
        title: 'Convection',
        description: 'Heat transfer through fluid movement',
        modelType: 'convection',
        details: [
          'Natural or forced',
          'Fluid flow patterns',
          'Temperature stratification',
          'Heat removal factor'
        ]
      }
    ]
  }
];

const ModelViewer: React.FC<{ modelType: string; isDark: boolean }> = ({ modelType, isDark }) => {
  const Model = getEducationalModel(modelType);

  return (
    <div className={`h-48 w-full rounded-lg overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500" />
        </div>
      }>
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <PerspectiveCamera makeDefault position={[0, 2, 4]} />
          <Model scale={1.2} />
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={2}
          />
        </Canvas>
      </Suspense>
    </div>
  );
};

const Education: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-12`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Solar Thermal Systems Education
          </h1>
          <p className={`mt-4 text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Comprehensive guide to understanding solar thermal technology
          </p>
        </div>

        {EDUCATIONAL_CONTENT.map((content) => (
          <div key={content.id} className="mb-16">
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Book className="h-8 w-8 text-yellow-500 mr-3" />
                  <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {content.title}
                  </h2>
                </div>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-lg mb-6`}>{content.description}</p>
                
                <div className="mb-6">
                  <ModelViewer modelType={content.modelType} isDark={isDark} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {content.sections.map((section, index) => (
                    <div key={index} className={`${
                      isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:shadow-lg'
                    } rounded-lg p-6 transition-all duration-300`}>
                      <div className="mb-4">
                        <ModelViewer modelType={section.modelType} isDark={isDark} />
                      </div>
                      <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                        {section.title}
                      </h3>
                      <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{section.description}</p>
                      <ul className="space-y-2">
                        {section.details.map((detail, idx) => (
                          <li key={idx} className={`flex items-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;