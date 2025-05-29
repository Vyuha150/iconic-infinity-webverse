
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
  const currentRotationRef = useRef({ x: 0, y: 0 });

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
        1, // Will be updated based on container
        0.1,
        1000
      );

      // Enhanced renderer with better quality settings
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
      renderer.toneMappingExposure = 1.5;
      
      container.appendChild(renderer.domElement);

      // Create environment map for reflections
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      const envTexture = pmremGenerator.fromScene(new THREE.Scene()).texture;

      // Create Rubik's cube
      const cubeGroup = new THREE.Group();
      cubeGroupRef.current = cubeGroup;
      scene.add(cubeGroup);

      // Luxurious gold material with high-end properties
      const goldColor = 0xFFD700; // Pure gold color
      const goldMaterial = new THREE.MeshPhysicalMaterial({
        color: goldColor,
        metalness: 1.0,
        roughness: 0.02,
        transmission: 0,
        transparent: false,
        opacity: 1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.01,
        ior: 1.8,
        envMap: envTexture,
        envMapIntensity: 2.0,
        reflectivity: 1.0
      });

      // Create individual cubes with enhanced geometry
      const cubeSize = 0.9;
      const gap = 0.1;
      const offset = (cubeSize + gap);
      const cubes: THREE.Mesh[] = [];

      for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
          for (let z = 0; z < 3; z++) {
            // Enhanced geometry with more segments for smoother reflections
            const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize, 8, 8, 8);
            
            const cube = new THREE.Mesh(geometry, goldMaterial.clone());
            
            cube.position.set(
              (x - 1) * offset,
              (y - 1) * offset,
              (z - 1) * offset
            );

            cube.castShadow = true;
            cube.receiveShadow = true;

            // Add beveled edges with gold color
            const edges = new THREE.EdgesGeometry(geometry);
            const edgeMaterial = new THREE.LineBasicMaterial({ 
              color: 0xB8860B, // Darker gold for edges
              linewidth: 2,
              transparent: true,
              opacity: 0.9
            });
            const edgeLines = new THREE.LineSegments(edges, edgeMaterial);
            cube.add(edgeLines);

            cubes.push(cube);
            cubeGroup.add(cube);
          }
        }
      }

      // Enhanced lighting setup for gold reflections
      const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
      scene.add(ambientLight);

      // Primary directional light for main illumination
      const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
      directionalLight1.position.set(5, 5, 5);
      directionalLight1.castShadow = true;
      directionalLight1.shadow.mapSize.width = 2048;
      directionalLight1.shadow.mapSize.height = 2048;
      directionalLight1.shadow.camera.near = 0.5;
      directionalLight1.shadow.camera.far = 50;
      scene.add(directionalLight1);

      // Secondary light for reflections
      const directionalLight2 = new THREE.DirectionalLight(0xffd700, 1.0);
      directionalLight2.position.set(-5, 3, -3);
      scene.add(directionalLight2);

      // Rim lighting for luxury effect
      const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
      rimLight.position.set(0, -5, 5);
      scene.add(rimLight);

      // Multiple point lights for dynamic reflections
      const pointLight1 = new THREE.PointLight(0xffffff, 1.2, 20);
      pointLight1.position.set(3, 3, 3);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0xffd700, 1.0, 15);
      pointLight2.position.set(-3, -3, 3);
      scene.add(pointLight2);

      const pointLight3 = new THREE.PointLight(0xffa500, 0.8, 12);
      pointLight3.position.set(0, 5, -3);
      scene.add(pointLight3);

      // Camera positioning
      camera.position.set(5, 4, 6);
      camera.lookAt(0, 0, 0);

      // Global mouse tracking for smooth animation
      const handleGlobalMouseMove = (event: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const newMouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const newMouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        // Update mouse position smoothly
        mouseRef.current.x = newMouseX;
        mouseRef.current.y = newMouseY;
      };

      // Add global mouse listener for smooth tracking
      document.addEventListener('mousemove', handleGlobalMouseMove);

      // Resize handler
      const handleResize = () => {
        if (!camera || !renderer || !container) return;
        
        const rect = container.getBoundingClientRect();
        camera.aspect = rect.width / rect.height;
        camera.updateProjectionMatrix();
        renderer.setSize(rect.width, rect.height);
      };

      window.addEventListener('resize', handleResize);

      // Enhanced animation loop with increased rotation speed
      const clock = new THREE.Clock();

      const animate = () => {
        animationRef.current = requestAnimationFrame(animate);
        
        const delta = clock.getDelta();
        const time = clock.getElapsedTime();

        if (cubeGroup) {
          // Calculate target rotation with increased speed
          const baseIntensity = 0.8; // Increased from 0.4 for faster rotation
          const mouseInfluence = 1.0; // Increased influence for more responsive movement
          const targetRotationY = mouseRef.current.x * baseIntensity * mouseInfluence;
          const targetRotationX = mouseRef.current.y * baseIntensity * mouseInfluence * 0.6;
          
          // Smooth interpolation with slightly faster response
          const lerpFactor = 0.03; // Increased from 0.02 for snappier movement
          currentRotationRef.current.x = THREE.MathUtils.lerp(
            currentRotationRef.current.x,
            targetRotationX,
            lerpFactor
          );
          currentRotationRef.current.y = THREE.MathUtils.lerp(
            currentRotationRef.current.y,
            targetRotationY,
            lerpFactor
          );
          
          // Apply the smoothed rotation
          cubeGroup.rotation.x = currentRotationRef.current.x;
          cubeGroup.rotation.y = currentRotationRef.current.y;

          // Enhanced floating animation
          cubeGroup.position.y = Math.sin(time * 0.6) * 0.15;

          // Dynamic material effects for gold shine
          cubes.forEach((cube, index) => {
            if (cube.material instanceof THREE.MeshPhysicalMaterial) {
              // Subtle roughness variation for dynamic reflections
              cube.material.roughness = 0.02 + Math.sin(time * 1.5 + index * 0.1) * 0.01;
              cube.material.envMapIntensity = 2.0 + Math.sin(time * 2 + index * 0.1) * 0.3;
            }
          });

          // Dynamic lighting effects for premium look
          pointLight1.intensity = 1.2 + Math.sin(time * 2) * 0.3;
          pointLight2.intensity = 1.0 + Math.sin(time * 1.5) * 0.2;
          pointLight3.intensity = 0.8 + Math.sin(time * 1.8) * 0.2;
          
          // Rotate lights for dynamic reflections
          pointLight1.position.x = 3 * Math.cos(time * 0.5);
          pointLight1.position.z = 3 * Math.sin(time * 0.5);
        }

        renderer.render(scene, camera);
      };

      animate();

      // Cleanup function
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }

        document.removeEventListener('mousemove', handleGlobalMouseMove);
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
        pmremGenerator.dispose();
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
        <div className="grid grid-cols-3 gap-1 w-40 h-40 transform rotate-12 hover:rotate-0 transition-transform duration-500">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="w-10 h-10 rounded-sm animate-pulse shadow-lg hover:scale-110 transition-transform duration-300"
              style={{
                animationDelay: `${i * 0.1}s`,
                background: 'linear-gradient(135deg, #FFD700 0%, #B8860B 100%)'
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
      className="w-full h-full cursor-pointer transition-all duration-300"
      style={{ minHeight: '400px' }}
    />
  );
};

export default RubiksCube;
