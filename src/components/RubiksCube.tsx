
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// Enhanced WebGL detection
const isWebGLAvailable = () => {
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!context;
  } catch (e) {
    return false;
  }
};

const RubiksCube = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGLFailed, setWebGLFailed] = useState(false);
  const animationRef = useRef<number>();
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cubeGroupRef = useRef<THREE.Group>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const solvingRef = useRef({ isSolving: false, step: 0 });

  useEffect(() => {
    if (!isWebGLAvailable()) {
      console.warn("WebGL is not supported");
      setWebGLFailed(true);
      return;
    }

    if (!mountRef.current) return;

    try {
      // Scene setup
      const scene = new THREE.Scene();
      sceneRef.current = scene;
      
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);

      // Enhanced renderer
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      rendererRef.current = renderer;

      const container = mountRef.current;
      const containerRect = container.getBoundingClientRect();
      renderer.setSize(containerRect.width, containerRect.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;
      
      container.appendChild(renderer.domElement);

      // Create Rubik's cube
      const cubeGroup = new THREE.Group();
      cubeGroupRef.current = cubeGroup;
      scene.add(cubeGroup);

      // Gold color palette - different shades for variety
      const goldColors = [
        new THREE.Color(0xFFD700), // Gold
        new THREE.Color(0xFFA500), // Orange Gold  
        new THREE.Color(0xFFB347), // Light Gold
        new THREE.Color(0xB8860B), // Dark Gold
        new THREE.Color(0xDAA520), // Goldenrod
        new THREE.Color(0xF4A460), // Sandy Gold
      ];

      // Create individual cubes
      const cubeSize = 0.9;
      const gap = 0.1;
      const offset = cubeSize + gap;
      const individualCubes: THREE.Mesh[] = [];

      for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
          for (let z = 0; z < 3; z++) {
            const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
            
            // Create metallic materials for each face
            const materials = goldColors.map((color, index) => 
              new THREE.MeshPhysicalMaterial({ 
                color: color,
                metalness: 0.95,
                roughness: 0.05,
                clearcoat: 1.0,
                clearcoatRoughness: 0.0,
                reflectivity: 1.0,
                envMapIntensity: 1.5,
              })
            );

            const cube = new THREE.Mesh(geometry, materials);
            
            cube.position.set(
              (x - 1) * offset,
              (y - 1) * offset,
              (z - 1) * offset
            );

            // Add edge lines for definition
            const edges = new THREE.EdgesGeometry(geometry);
            const edgeMaterial = new THREE.LineBasicMaterial({ 
              color: 0x333333, 
              linewidth: 2,
              transparent: true,
              opacity: 0.6
            });
            const edgeLines = new THREE.LineSegments(edges, edgeMaterial);
            cube.add(edgeLines);

            // Store original data
            cube.userData = {
              originalPosition: cube.position.clone(),
              originalRotation: cube.rotation.clone(),
              layerX: x,
              layerY: y,
              layerZ: z,
              rotationSpeed: Math.random() * 0.02 + 0.01
            };

            individualCubes.push(cube);
            cubeGroup.add(cube);
          }
        }
      }

      // Enhanced lighting for metallic appearance
      const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
      scene.add(ambientLight);

      const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
      mainLight.position.set(10, 10, 5);
      mainLight.castShadow = true;
      mainLight.shadow.mapSize.width = 2048;
      mainLight.shadow.mapSize.height = 2048;
      scene.add(mainLight);

      const fillLight = new THREE.DirectionalLight(0xffd700, 0.8);
      fillLight.position.set(-5, -5, -5);
      scene.add(fillLight);

      const rimLight = new THREE.DirectionalLight(0xffffff, 0.6);
      rimLight.position.set(0, 0, -10);
      scene.add(rimLight);

      // Camera positioning
      camera.position.set(6, 4, 8);
      camera.lookAt(0, 0, 0);

      // Smooth mouse interaction
      const handleMouseMove = (event: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        // Smooth interpolation to target rotation
        targetRotationRef.current.x = y * 0.3;
        targetRotationRef.current.y = x * 0.5;
      };

      container.addEventListener('mousemove', handleMouseMove);

      // Auto-solve animation
      const startSolvingAnimation = () => {
        solvingRef.current.isSolving = true;
        solvingRef.current.step = 0;
      };

      const solvingInterval = setInterval(startSolvingAnimation, 6000);

      // Resize handler
      const handleResize = () => {
        if (!camera || !renderer || !container) return;
        
        const rect = container.getBoundingClientRect();
        camera.aspect = rect.width / rect.height;
        camera.updateProjectionMatrix();
        renderer.setSize(rect.width, rect.height);
      };

      window.addEventListener('resize', handleResize);

      // Animation loop
      const clock = new THREE.Clock();
      let currentRotation = { x: 0, y: 0 };

      const animate = () => {
        animationRef.current = requestAnimationFrame(animate);
        
        const delta = clock.getDelta();
        const time = clock.getElapsedTime();

        if (cubeGroup) {
          // Smooth rotation interpolation
          const lerpFactor = 0.05;
          currentRotation.x += (targetRotationRef.current.x - currentRotation.x) * lerpFactor;
          currentRotation.y += (targetRotationRef.current.y - currentRotation.y) * lerpFactor;
          
          // Auto rotation when not being controlled
          const autoRotationSpeed = 0.2;
          cubeGroup.rotation.x = currentRotation.x + Math.sin(time * autoRotationSpeed) * 0.1;
          cubeGroup.rotation.y = currentRotation.y + time * autoRotationSpeed * 0.5;

          // Floating animation
          cubeGroup.position.y = Math.sin(time * 0.8) * 0.1;

          // Solving animation
          if (solvingRef.current.isSolving) {
            const solvingProgress = (time * 1.5) % 8;
            const step = Math.floor(solvingProgress);
            
            individualCubes.forEach((cube, index) => {
              const { layerX, layerY, layerZ } = cube.userData;
              const rotationIntensity = Math.sin(time * 4) * 0.5;
              
              // Reset all rotations first
              cube.rotation.set(0, 0, 0);
              
              // Apply solving rotations based on step
              switch (step) {
                case 0: // Front face
                  if (layerZ === 2) cube.rotation.z = rotationIntensity;
                  break;
                case 1: // Right face
                  if (layerX === 2) cube.rotation.x = rotationIntensity;
                  break;
                case 2: // Up face
                  if (layerY === 2) cube.rotation.y = rotationIntensity;
                  break;
                case 3: // Left face
                  if (layerX === 0) cube.rotation.x = -rotationIntensity;
                  break;
                case 4: // Down face
                  if (layerY === 0) cube.rotation.y = -rotationIntensity;
                  break;
                case 5: // Back face
                  if (layerZ === 0) cube.rotation.z = -rotationIntensity;
                  break;
                default:
                  // Gentle return to position
                  cube.rotation.x += (0 - cube.rotation.x) * 0.1;
                  cube.rotation.y += (0 - cube.rotation.y) * 0.1;
                  cube.rotation.z += (0 - cube.rotation.z) * 0.1;
              }
              
              // Subtle individual cube movements
              const waveX = Math.sin(time * 0.5 + index * 0.2) * 0.03;
              const waveZ = Math.cos(time * 0.5 + index * 0.2) * 0.03;
              cube.position.x = cube.userData.originalPosition.x + waveX;
              cube.position.z = cube.userData.originalPosition.z + waveZ;
            });
            
            // End solving after full cycle
            if (solvingProgress > 7.5) {
              solvingRef.current.isSolving = false;
            }
          } else {
            // Normal state - gentle movements
            individualCubes.forEach((cube, index) => {
              const waveX = Math.sin(time * 0.3 + index * 0.1) * 0.01;
              const waveZ = Math.cos(time * 0.3 + index * 0.1) * 0.01;
              cube.position.x = cube.userData.originalPosition.x + waveX;
              cube.position.z = cube.userData.originalPosition.z + waveZ;
              
              // Reset individual rotations smoothly
              cube.rotation.x *= 0.95;
              cube.rotation.y *= 0.95;
              cube.rotation.z *= 0.95;
            });
          }
        }

        renderer.render(scene, camera);
      };

      animate();

      // Cleanup
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }

        clearInterval(solvingInterval);
        container.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);

        if (container && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }

        // Dispose resources
        cubeGroup.children.forEach((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach(material => material.dispose());
            } else {
              child.material.dispose();
            }
          }
        });

        renderer.dispose();
      };

    } catch (error) {
      console.error("Three.js error:", error);
      setWebGLFailed(true);
    }
  }, []);

  // Fallback UI
  if (webGLFailed) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg">
        <div className="grid grid-cols-3 gap-2 w-48 h-48 transform rotate-12">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className={`w-12 h-12 rounded-sm animate-pulse ${
                i % 6 === 0 ? 'bg-yellow-400' :
                i % 6 === 1 ? 'bg-yellow-500' :
                i % 6 === 2 ? 'bg-yellow-600' :
                i % 6 === 3 ? 'bg-orange-400' :
                i % 6 === 4 ? 'bg-orange-500' : 'bg-yellow-300'
              }`}
              style={{
                animationDelay: `${i * 0.1}s`,
                boxShadow: '0 4px 12px rgba(255, 215, 0, 0.4)'
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full cursor-pointer"
      style={{ minHeight: '500px' }}
    />
  );
};

export default RubiksCube;
