
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

      // Deep metallic blue with gold touches material
      const blueMetallicColor = 0x1E3A8A; // Deep blue
      const mainMaterial = new THREE.MeshPhysicalMaterial({
        color: blueMetallicColor,
        metalness: 1.0,
        roughness: 0.05,
        transmission: 0,
        transparent: false,
        opacity: 1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.02,
        ior: 2.4,
        envMap: envTexture,
        envMapIntensity: 2.5,
        reflectivity: 1.0
      });

      // Gold accent material for some cubes
      const goldAccentMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xFFD700,
        metalness: 1.0,
        roughness: 0.03,
        transmission: 0,
        transparent: false,
        opacity: 1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.01,
        ior: 2.0,
        envMap: envTexture,
        envMapIntensity: 2.8,
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
            
            // Use gold material for corner cubes and center, blue for others
            const isCorner = (x === 0 || x === 2) && (y === 0 || y === 2) && (z === 0 || z === 2);
            const isCenter = x === 1 && y === 1 && z === 1;
            const material = (isCorner || isCenter) ? goldAccentMaterial.clone() : mainMaterial.clone();
            
            const cube = new THREE.Mesh(geometry, material);
            
            cube.position.set(
              (x - 1) * offset,
              (y - 1) * offset,
              (z - 1) * offset
            );

            cube.castShadow = true;
            cube.receiveShadow = true;

            // Add beveled edges with contrasting color
            const edges = new THREE.EdgesGeometry(geometry);
            const edgeColor = (isCorner || isCenter) ? 0x1E3A8A : 0xB8860B; // Blue edges for gold cubes, gold edges for blue cubes
            const edgeMaterial = new THREE.LineBasicMaterial({ 
              color: edgeColor,
              linewidth: 2,
              transparent: true,
              opacity: 0.8
            });
            const edgeLines = new THREE.LineSegments(edges, edgeMaterial);
            cube.add(edgeLines);

            cubes.push(cube);
            cubeGroup.add(cube);
          }
        }
      }

      // Enhanced lighting setup for metallic blue and gold
      const ambientLight = new THREE.AmbientLight(0x404080, 0.4); // Slightly blue ambient
      scene.add(ambientLight);

      // Primary directional light for main illumination
      const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.8);
      directionalLight1.position.set(5, 5, 5);
      directionalLight1.castShadow = true;
      directionalLight1.shadow.mapSize.width = 2048;
      directionalLight1.shadow.mapSize.height = 2048;
      directionalLight1.shadow.camera.near = 0.5;
      directionalLight1.shadow.camera.far = 50;
      scene.add(directionalLight1);

      // Cool blue accent light
      const directionalLight2 = new THREE.DirectionalLight(0x4169E1, 1.2);
      directionalLight2.position.set(-5, 3, -3);
      scene.add(directionalLight2);

      // Warm gold rim lighting
      const rimLight = new THREE.DirectionalLight(0xFFD700, 0.9);
      rimLight.position.set(0, -5, 5);
      scene.add(rimLight);

      // Multiple point lights for dynamic reflections
      const pointLight1 = new THREE.PointLight(0x87CEEB, 1.5, 20); // Sky blue
      pointLight1.position.set(3, 3, 3);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0xFFD700, 1.2, 15); // Gold
      pointLight2.position.set(-3, -3, 3);
      scene.add(pointLight2);

      const pointLight3 = new THREE.PointLight(0x4682B4, 1.0, 12); // Steel blue
      pointLight3.position.set(0, 5, -3);
      scene.add(pointLight3);

      // Camera positioning
      camera.position.set(5, 4, 6);
      camera.lookAt(0, 0, 0);

      // Resize handler
      const handleResize = () => {
        if (!camera || !renderer || !container) return;
        
        const rect = container.getBoundingClientRect();
        camera.aspect = rect.width / rect.height;
        camera.updateProjectionMatrix();
        renderer.setSize(rect.width, rect.height);
      };

      window.addEventListener('resize', handleResize);

      // Enhanced animation loop with continuous rotation
      const clock = new THREE.Clock();

      const animate = () => {
        animationRef.current = requestAnimationFrame(animate);
        
        const delta = clock.getDelta();
        const time = clock.getElapsedTime();

        if (cubeGroup) {
          // Continuous smooth rotation
          cubeGroup.rotation.x += delta * 0.3;
          cubeGroup.rotation.y += delta * 0.4;

          // Enhanced floating animation
          cubeGroup.position.y = Math.sin(time * 0.6) * 0.15;

          // Dynamic material effects for blue and gold shine
          cubes.forEach((cube, index) => {
            if (cube.material instanceof THREE.MeshPhysicalMaterial) {
              // Subtle roughness variation for dynamic reflections
              cube.material.roughness = 0.03 + Math.sin(time * 1.5 + index * 0.1) * 0.02;
              cube.material.envMapIntensity = 2.5 + Math.sin(time * 2 + index * 0.1) * 0.4;
            }
          });

          // Dynamic lighting effects for premium look
          pointLight1.intensity = 1.5 + Math.sin(time * 2) * 0.4;
          pointLight2.intensity = 1.2 + Math.sin(time * 1.5) * 0.3;
          pointLight3.intensity = 1.0 + Math.sin(time * 1.8) * 0.3;
          
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
                background: i % 3 === 0 ? 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)' : 'linear-gradient(135deg, #FFD700 0%, #B8860B 100%)'
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
      className="w-full h-full transition-all duration-300"
      style={{ minHeight: '400px' }}
    />
  );
};

export default RubiksCube;
