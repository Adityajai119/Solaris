import React from 'react';
import { Mesh, Group } from 'three';
import { useRef } from 'react';
import { Box, Cylinder, Sphere, Cone, useGLTF } from '@react-three/drei';

interface ModelProps {
  scale?: number;
}

export const AbsorberPlateModel: React.FC<ModelProps> = ({ scale = 1 }) => {
  const groupRef = useRef<Group>(null);

  return (
    <group ref={groupRef} scale={scale}>
      {/* Main absorber plate */}
      <Box args={[2, 0.05, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#2b2b2b" metalness={0.8} roughness={0.2} />
      </Box>
      
      {/* Fluid tubes */}
      {Array.from({ length: 8 }).map((_, index) => (
        <Cylinder
          key={index}
          args={[0.02, 0.02, 1, 16]}
          position={[-0.8 + index * 0.25, 0.025, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <meshStandardMaterial color="#b87333" metalness={0.6} roughness={0.3} />
        </Cylinder>
      ))}
      
      {/* Header tubes */}
      <Cylinder
        args={[0.03, 0.03, 2, 16]}
        position={[0, 0.025, 0.4]}
      >
        <meshStandardMaterial color="#b87333" metalness={0.6} roughness={0.3} />
      </Cylinder>
      <Cylinder
        args={[0.03, 0.03, 2, 16]}
        position={[0, 0.025, -0.4]}
      >
        <meshStandardMaterial color="#b87333" metalness={0.6} roughness={0.3} />
      </Cylinder>
    </group>
  );
};

export const GlazingCoverModel: React.FC<ModelProps> = ({ scale = 1 }) => {
  const groupRef = useRef<Group>(null);

  return (
    <group ref={groupRef} scale={scale}>
      {/* Glass cover */}
      <Box args={[2.1, 0.02, 1.1]} position={[0, 0.2, 0]}>
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.9}
          thickness={0.02}
          roughness={0}
          metalness={0}
        />
      </Box>
      
      {/* Frame */}
      <Box args={[2.2, 0.1, 0.05]} position={[0, 0.15, 0.55]}>
        <meshStandardMaterial color="#4a4a4a" />
      </Box>
      <Box args={[2.2, 0.1, 0.05]} position={[0, 0.15, -0.55]}>
        <meshStandardMaterial color="#4a4a4a" />
      </Box>
      <Box args={[0.05, 0.1, 1.2]} position={[1.1, 0.15, 0]}>
        <meshStandardMaterial color="#4a4a4a" />
      </Box>
      <Box args={[0.05, 0.1, 1.2]} position={[-1.1, 0.15, 0]}>
        <meshStandardMaterial color="#4a4a4a" />
      </Box>
    </group>
  );
};

export const InsulationModel: React.FC<ModelProps> = ({ scale = 1 }) => {
  const groupRef = useRef<Group>(null);

  return (
    <group ref={groupRef} scale={scale}>
      {/* Main insulation layer */}
      <Box args={[2, 0.1, 1]} position={[0, -0.05, 0]}>
        <meshStandardMaterial color="#f4d03f" roughness={0.9} />
      </Box>
      
      {/* Insulation texture details */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Box
          key={i}
          args={[0.15, 0.08, 0.15]}
          position={[
            -0.9 + (i % 5) * 0.45,
            -0.05,
            -0.4 + Math.floor(i / 5) * 0.25
          ]}
        >
          <meshStandardMaterial color="#f1c40f" roughness={0.9} />
        </Box>
      ))}
      
      {/* Backing material */}
      <Box args={[2.1, 0.02, 1.1]} position={[0, -0.11, 0]}>
        <meshStandardMaterial color="#7f8c8d" roughness={0.7} />
      </Box>
    </group>
  );
};

export const HeatTransferModel: React.FC<ModelProps> = ({ scale = 1 }) => {
  const groupRef = useRef<Group>(null);

  return (
    <group ref={groupRef} scale={scale}>
      {/* Storage tank */}
      <Cylinder
        args={[0.3, 0.3, 0.8, 32]}
        position={[0, 0.4, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <meshStandardMaterial color="#95a5a6" metalness={0.6} roughness={0.2} />
      </Cylinder>
      
      {/* Circulation pipes */}
      <Cylinder
        args={[0.03, 0.03, 1.2, 16]}
        position={[-0.3, 0, 0]}
        rotation={[0, 0, Math.PI / 6]}
      >
        <meshStandardMaterial color="#e74c3c" metalness={0.4} roughness={0.3} />
      </Cylinder>
      <Cylinder
        args={[0.03, 0.03, 1.2, 16]}
        position={[0.3, 0, 0]}
        rotation={[0, 0, -Math.PI / 6]}
      >
        <meshStandardMaterial color="#3498db" metalness={0.4} roughness={0.3} />
      </Cylinder>
      
      {/* Flow indicators (arrows) */}
      {Array.from({ length: 3 }).map((_, i) => (
        <group key={i} position={[0, -0.2 + i * 0.2, 0]}>
          <Box
            args={[0.1, 0.02, 0.02]}
            position={[-0.25, 0, 0]}
            rotation={[0, 0, Math.PI / 6]}
          >
            <meshStandardMaterial color="#e74c3c" />
          </Box>
          <Box
            args={[0.1, 0.02, 0.02]}
            position={[0.25, 0, 0]}
            rotation={[0, 0, -Math.PI / 6]}
          >
            <meshStandardMaterial color="#3498db" />
          </Box>
        </group>
      ))}
    </group>
  );
};

export const RadiationModel: React.FC<ModelProps> = ({ scale = 1 }) => {
  const groupRef = useRef<Group>(null);

  return (
    <group ref={groupRef} scale={scale}>
      {/* Sun */}
      <Sphere args={[0.2, 32, 32]} position={[0, 0.8, 0]}>
        <meshStandardMaterial color="#f1c40f" emissive="#f39c12" emissiveIntensity={0.5} />
      </Sphere>
      
      {/* Radiation rays */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 8;
        return (
          <group key={i} rotation={[0, 0, angle]}>
            <Box
              args={[0.4, 0.01, 0.01]}
              position={[0, 0.4, 0]}
            >
              <meshStandardMaterial color="#f1c40f" emissive="#f39c12" emissiveIntensity={0.3} />
            </Box>
          </group>
        );
      })}
      
      {/* Collector surface */}
      <Box args={[1, 0.05, 0.5]} position={[0, -0.2, 0]}>
        <meshStandardMaterial color="#2c3e50" />
      </Box>
    </group>
  );
};

export const ConductionModel: React.FC<ModelProps> = ({ scale = 1 }) => {
  const groupRef = useRef<Group>(null);

  return (
    <group ref={groupRef} scale={scale}>
      {/* Material layers */}
      {Array.from({ length: 5 }).map((_, i) => (
        <Box
          key={i}
          args={[1, 0.1, 0.5]}
          position={[0, i * 0.12 - 0.24, 0]}
        >
          <meshStandardMaterial 
            color={i % 2 === 0 ? "#34495e" : "#7f8c8d"}
            metalness={i % 2 === 0 ? 0.8 : 0.2}
            roughness={i % 2 === 0 ? 0.2 : 0.8}
          />
        </Box>
      ))}
      
      {/* Heat flow indicators */}
      {Array.from({ length: 3 }).map((_, i) => (
        <group key={i} position={[-0.3 + i * 0.3, 0, 0.3]}>
          <Cylinder
            args={[0.02, 0.02, 0.6, 16]}
            position={[0, 0, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <meshStandardMaterial color="#e74c3c" />
          </Cylinder>
          <Cone
            args={[0.04, 0.08, 16]}
            position={[0, 0, -0.3]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <meshStandardMaterial color="#e74c3c" />
          </Cone>
        </group>
      ))}
    </group>
  );
};

export const ConvectionModel: React.FC<ModelProps> = ({ scale = 1 }) => {
  const groupRef = useRef<Group>(null);

  return (
    <group ref={groupRef} scale={scale}>
      {/* Container */}
      <Box args={[1, 0.8, 0.3]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#34495e" transparent opacity={0.3} />
      </Box>
      
      {/* Heat source */}
      <Box args={[0.8, 0.05, 0.2]} position={[0, -0.35, 0]}>
        <meshStandardMaterial color="#e74c3c" emissive="#c0392b" emissiveIntensity={0.5} />
      </Box>
      
      {/* Convection flow indicators */}
      {Array.from({ length: 3 }).map((_, i) => {
        const x = -0.3 + i * 0.3;
        return (
          <group key={i}>
            {/* Rising flow */}
            <Cylinder
              args={[0.02, 0.02, 0.4, 16]}
              position={[x, 0.1, 0]}
            >
              <meshStandardMaterial color="#e74c3c" transparent opacity={0.6} />
            </Cylinder>
            {/* Falling flow */}
            <Cylinder
              args={[0.02, 0.02, 0.4, 16]}
              position={[x + 0.1, -0.1, 0]}
            >
              <meshStandardMaterial color="#3498db" transparent opacity={0.6} />
            </Cylinder>
          </group>
        );
      })}
    </group>
  );
};

export const getEducationalModel = (modelType: string) => {
  switch (modelType) {
    case 'absorber-plate':
      return AbsorberPlateModel;
    case 'glazing-cover':
      return GlazingCoverModel;
    case 'insulation':
      return InsulationModel;
    case 'heat-transfer':
      return HeatTransferModel;
    case 'radiation':
      return RadiationModel;
    case 'conduction':
      return ConductionModel;
    case 'convection':
      return ConvectionModel;
    default:
      return AbsorberPlateModel;
  }
};