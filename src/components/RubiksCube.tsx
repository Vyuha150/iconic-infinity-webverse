
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
      
      const camera = new THREE.PerspectiveCamera(
        45,
        1,
        0.1,
        1000
      );

      // Enhanced renderer with metallic appearance
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
      renderer.toneMappingExposure = 1.2;
      
      container.appendChild(renderer.domElement);

      // Create Rubik's cube
      const cubeGroup = new THREE.Group();
      cubeGroupRef.current = cubeGroup;
      scene.add(cubeGroup);

      // Metallic gold colors with different shades
      const goldColors = [
        0xFFD700, // Gold
        0xFFA500, // Orange Gold  
        0xFFB347, // Light Gold
        0xB8860B, // Dark Gold
        0xDAA520, // Goldenrod
        0xF4A460, // Sandy Gold
      ];

      // Create individual cubes with metallic materials
      const cubeSize = 0.95;
      const gap = 0.05;
      const offset = (cubeSize + gap);
      const individualCubes: THREE.Mesh[] = [];

      for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
          for (let z = 0; z < 3; z++) {
            const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
            
            // Create metallic materials for each face
            const materials = goldColors.map(color => 
              new THREE.MeshPhysicalMaterial({ 
                color,
                metalness: 0.9,
                roughness: 0.1,
                clearcoat: 1.0,
                clearcoatRoughness: 0.1,
                reflectivity: 0.9,
                transparent: false,
              })
            );

            const cube = new THREE.Mesh(geometry, materials);
            
            cube.position.set(
              (x - 1) * offset,
              (y - 1) * offset,
              (z - 1) * offset
            );

            // Add subtle edge geometry
            const edges = new THREE.EdgesGeometry(geometry);
            const edgeMaterial = new THREE.LineBasicMaterial({ 
              color: 0x333333, 
              linewidth: 1,
              transparent: true,
              opacity: 0.3
            });
            const edgeLines = new THREE.LineSegments(edges, edgeMaterial);
            cube.add(edgeLines);

            // Store original position for solving animation
            cube.userData = {
              originalPosition: cube.position.clone(),
              originalRotation: cube.rotation.clone(),
              layerX: x,
              layerY: y,
              layerZ: z
            };

            individualCubes.push(cube);
            cubeGroup.add(cube);
          }
        }
      }

      // Enhanced lighting setup for metallic appearance
      const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
      scene.add(ambientLight);

      const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
      directionalLight1.position.set(10, 10, 5);
      directionalLight1.castShadow = true;
      scene.add(directionalLight1);

      const directionalLight2 = new THREE.DirectionalLight(0xffd700, 0.6);
      directionalLight2.position.set(-5, -5, -5);
      scene.add(directionalLight2);

      // Add rim lighting
      const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
      rimLight.position.set(0, 0, -10);
      scene.add(rimLight);

      // Camera positioning
      camera.position.set(5, 5, 8);
      camera.lookAt(0, 0, 0);

      // Mouse interaction with smooth following
      const handleMouseMove = (event: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      };

      container.addEventListener('mousemove', handleMouseMove);

      // Resize handler
      const handleResize = () => {
        if (!camera || !renderer || !container) return;
        
        const rect = container.getBoundingClientRect();
        camera.aspect = rect.width / rect.height;
        camera.updateProjectionMatrix();
        renderer.setSize(rect.width, rect.height);
      };

      window.addEventListener('resize', handleResize);

      // Solving animation function
      const startSolvingAnimation = () => {
        solvingRef.current.isSolving = true;
        solvingRef.current.step = 0;
      };

      // Start solving animation every 8 seconds
      const solvingInterval = setInterval(startSolvingAnimation, 8000);

      // Animation loop
      const clock = new THREE.Clock();
      let autoRotation = { x: 0, y: 0 };

      const animate = () => {
        animationRef.current = requestAnimationFrame(animate);
        
        const delta = clock.getDelta();
        const time = clock.getElapsedTime();

        if (cubeGroup) {
          // Smooth mouse following with easing
          const targetRotationY = mouseRef.current.x * 0.5;
          const targetRotationX = mouseRef.current.y * 0.3;
          
          // Auto rotation when not interacting
          autoRotation.x += delta * 0.15;
          autoRotation.y += delta * 0.1;
          
          // Blend auto rotation with mouse interaction
          cubeGroup.rotation.y += (targetRotationY + autoRotation.y - cubeGroup.rotation.y) * 0.03;
          cubeGroup.rotation.x += (targetRotationX + autoRotation.x - cubeGroup.rotation.x) * 0.03;

          // Subtle floating animation
          cubeGroup.position.y = Math.sin(time * 0.4) * 0.15;

          // Solving animation
          if (solvingRef.current.isSolving) {
            const solvingProgress = (time * 2) % 6;
            solvingRef.current.step = Math.floor(solvingProgress);
            
            individualCubes.forEach((cube, index) => {
              const { layerX, layerY, layerZ } = cube.userData;
              
              // Different rotations for different layers during solving
              if (solvingRef.current.step === 0 && layerX === 0) {
                cube.rotation.x = Math.sin(time * 3) * 0.2;
              } else if (solvingRef.current.step === 1 && layerY === 0) {
                cube.rotation.y = Math.sin(time * 3) * 0.2;
              } else if (solvingRef.current.step === 2 && layerZ === 0) {
                cube.rotation.z = Math.sin(time * 3) * 0.2;
              } else if (solvingRef.current.step === 3 && layerX === 2) {
                cube.rotation.x = Math.sin(time * 3) * 0.2;
              } else if (solvingRef.current.step === 4 && layerY === 2) {
                cube.rotation.y = Math.sin(time * 3) * 0.2;
              } else if (solvingRef.current.step === 5 && layerZ === 2) {
                cube.rotation.z = Math.sin(time * 3) * 0.2;
              } else {
                // Return to original rotation smoothly
                cube.rotation.x += (0 - cube.rotation.x) * 0.1;
                cube.rotation.y += (0 - cube.rotation.y) * 0.1;
                cube.rotation.z += (0 - cube.rotation.z) * 0.1;
              }
              
              // Subtle individual movements
              cube.position.x = cube.userData.originalPosition.x + Math.sin(time * 0.5 + index * 0.1) * 0.02;
              cube.position.z = cube.userData.originalPosition.z + Math.cos(time * 0.5 + index * 0.1) * 0.02;
            });
            
            // End solving animation after completion
            if (solvingProgress > 5.5) {
              solvingRef.current.isSolving = false;
            }
          } else {
            // Normal subtle animations when not solving
            individualCubes.forEach((cube, index) => {
              cube.position.x = cube.userData.originalPosition.x + Math.sin(time * 0.3 + index * 0.1) * 0.01;
              cube.position.z = cube.userData.originalPosition.z + Math.cos(time * 0.3 + index * 0.1) * 0.01;
            });
          }
        }

        renderer.render(scene, camera);
      };

      animate();

      // Cleanup function
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

        // Dispose of geometries and materials
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
        sceneRef.current = undefined;
        rendererRef.current = undefined;
        cubeGroupRef.current = undefined;
      };

    } catch (error) {
      console.error("Three.js Rubik's cube initialization error:", error);
      setWebGLFailed(true);
    }
  }, []);

  // Enhanced fallback when WebGL is not available
  if (webGLFailed) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg">
        <div className="grid grid-cols-3 gap-1 w-40 h-40 transform rotate-12">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className={`w-10 h-10 rounded-sm animate-pulse ${
                i % 6 === 0 ? 'bg-yellow-400' :
                i % 6 === 1 ? 'bg-yellow-500' :
                i % 6 === 2 ? 'bg-yellow-600' :
                i % 6 === 3 ? 'bg-orange-400' :
                i % 6 === 4 ? 'bg-orange-500' : 'bg-yellow-300'
              }`}
              style={{
                animationDelay: `${i * 0.1}s`,
                boxShadow: '0 4px 8px rgba(255, 215, 0, 0.3)'
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
