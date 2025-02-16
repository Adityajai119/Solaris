import React from 'react';
import { Mesh } from 'three';
import { useRef } from 'react';
import { Box, Cylinder, Sphere } from '@react-three/drei';

export const Model3D = ({ modelPath }: { modelPath: string }) => {
  const meshRef = useRef<Mesh>(null);

  // Create different shapes based on the model type
  switch (true) {
    case modelPath.includes('flat-plate'):
      return (
        <Box
          ref={meshRef}
          args={[2, 0.2, 1]} // width, height, depth
          position={[0, 0, 0]}
        >
          <meshStandardMaterial color="#2196f3" />
        </Box>
      );

    case modelPath.includes('evacuated-tube'):
      return (
        <group position={[0, 0, 0]}>
          {/* Create multiple tubes */}
          {Array.from({ length: 5 }).map((_, index) => (
            <Cylinder
              key={index}
              args={[0.1, 0.1, 2, 16]} // radiusTop, radiusBottom, height, segments
              position={[-0.8 + index * 0.4, 0, 0]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <meshStandardMaterial color="#90caf9" />
            </Cylinder>
          ))}
        </group>
      );

    case modelPath.includes('parabolic-trough'):
      return (
        <group position={[0, 0, 0]}>
          {/* Parabolic curve approximation using cylinders */}
          {Array.from({ length: 8 }).map((_, index) => {
            const angle = (index / 7) * Math.PI - Math.PI / 2;
            return (
              <Cylinder
                key={index}
                args={[0.1, 0.1, 0.3, 16]}
                position={[
                  Math.cos(angle) * 1,
                  Math.sin(angle) * 1,
                  0
                ]}
                rotation={[0, 0, angle]}
              >
                <meshStandardMaterial color="#ffd700" />
              </Cylinder>
            );
          })}
        </group>
      );

    case modelPath.includes('compound-parabolic'):
      return (
        <group position={[0, 0, 0]}>
          <Box args={[2, 0.1, 1]} position={[0, -0.5, 0]}>
            <meshStandardMaterial color="#4caf50" />
          </Box>
          {/* Parabolic reflectors */}
          {Array.from({ length: 2 }).map((_, index) => (
            <group key={index} position={[index === 0 ? -0.5 : 0.5, 0, 0]}>
              {Array.from({ length: 5 }).map((_, i) => {
                const angle = (i / 4) * Math.PI / 2;
                return (
                  <Box
                    key={i}
                    args={[0.1, 0.1, 1]}
                    position={[
                      Math.cos(angle) * 0.3 * (index === 0 ? 1 : -1),
                      Math.sin(angle) * 0.3,
                      0
                    ]}
                    rotation={[0, 0, angle * (index === 0 ? -1 : 1)]}
                  >
                    <meshStandardMaterial color="#f5f5f5" />
                  </Box>
                );
              })}
            </group>
          ))}
        </group>
      );

    case modelPath.includes('fresnel-lens'):
      return (
        <group position={[0, 0, 0]}>
          {/* Fresnel lens segments */}
          {Array.from({ length: 7 }).map((_, index) => (
            <Box
              key={index}
              args={[2, 0.05, 0.2]}
              position={[0, 0, -0.6 + index * 0.2]}
            >
              <meshStandardMaterial color="#b2dfdb" opacity={0.6} transparent />
            </Box>
          ))}
        </group>
      );

    case modelPath.includes('thermosyphon'):
      return (
        <group position={[0, 0, 0]}>
          {/* Storage tank */}
          <Cylinder
            args={[0.3, 0.3, 1.5, 16]}
            position={[0, 0.5, 0]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <meshStandardMaterial color="#78909c" />
          </Cylinder>
          {/* Collector */}
          <Box args={[2, 0.2, 1]} position={[0, -0.5, 0]}>
            <meshStandardMaterial color="#455a64" />
          </Box>
        </group>
      );

    case modelPath.includes('integrated-collector'):
      return (
        <group position={[0, 0, 0]}>
          <Box args={[2, 0.4, 1]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#546e7a" />
          </Box>
          <Cylinder
            args={[0.2, 0.2, 1.8, 16]}
            position={[0, 0, 0]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <meshStandardMaterial color="#78909c" />
          </Cylinder>
        </group>
      );

    case modelPath.includes('heat-pipe'):
      return (
        <group position={[0, 0, 0]}>
          {Array.from({ length: 6 }).map((_, index) => (
            <group key={index} position={[-1 + index * 0.4, 0, 0]}>
              <Cylinder
                args={[0.08, 0.08, 2, 16]}
                position={[0, 0, 0]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <meshStandardMaterial color="#e0e0e0" />
              </Cylinder>
              <Cylinder
                args={[0.02, 0.02, 1.9, 16]}
                position={[0, 0, 0]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <meshStandardMaterial color="#ffd700" />
              </Cylinder>
            </group>
          ))}
        </group>
      );

    case modelPath.includes('unglazed'):
      return (
        <group position={[0, 0, 0]}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Box
              key={index}
              args={[0.2, 0.1, 1]}
              position={[-0.8 + index * 0.25, 0, 0]}
            >
              <meshStandardMaterial color="#212121" />
            </Box>
          ))}
        </group>
      );

    case modelPath.includes('air-based'):
      return (
        <group position={[0, 0, 0]}>
          <Box args={[2, 0.3, 1]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#424242" />
          </Box>
          {/* Air channels */}
          {Array.from({ length: 5 }).map((_, index) => (
            <Box
              key={index}
              args={[1.8, 0.05, 0.1]}
              position={[0, 0, -0.4 + index * 0.2]}
            >
              <meshStandardMaterial color="#616161" />
            </Box>
          ))}
        </group>
      );

    default:
      return (
        <Box args={[1, 1, 1]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#f44336" />
        </Box>
      );
  }
};