
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
  const [isHovered, setIsHovered] = useState(false);
  const animationRef = useRef<number>();
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cubeGroupRef = useRef<THREE.Group>();
  const mouseRef = useRef({ x: 0, y: 0 });

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
      renderer.toneMappingExposure = 1.2;
      
      container.appendChild(renderer.domElement);

      // Create Rubik's cube
      const cubeGroup = new THREE.Group();
      cubeGroupRef.current = cubeGroup;
      scene.add(cubeGroup);

      // Dark blue glassy material with enhanced properties
      const cubeColor = 0x1a237e; // Dark blue
      const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: cubeColor,
        metalness: 0.1,
        roughness: 0.05,
        transmission: 0.2,
        transparent: true,
        opacity: 0.9,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        ior: 1.5,
        thickness: 0.5,
        envMapIntensity: 1.5
      });

      // Create individual cubes with enhanced geometry
      const cubeSize = 0.9;
      const gap = 0.1;
      const offset = (cubeSize + gap);
      const cubes: THREE.Mesh[] = [];

      for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
          for (let z = 0; z < 3; z++) {
            const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
            
            const cube = new THREE.Mesh(geometry, glassMaterial.clone());
            
            cube.position.set(
              (x - 1) * offset,
              (y - 1) * offset,
              (z - 1) * offset
            );

            cube.castShadow = true;
            cube.receiveShadow = true;

            // Add beveled edges for more realistic look
            const edges = new THREE.EdgesGeometry(geometry);
            const edgeMaterial = new THREE.LineBasicMaterial({ 
              color: 0x0d47a1,
              linewidth: 1.5,
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

      // Enhanced lighting setup for glassy effect
      const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
      scene.add(ambientLight);

      const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.0);
      directionalLight1.position.set(5, 5, 5);
      directionalLight1.castShadow = true;
      directionalLight1.shadow.mapSize.width = 2048;
      directionalLight1.shadow.mapSize.height = 2048;
      scene.add(directionalLight1);

      const directionalLight2 = new THREE.DirectionalLight(0xffd700, 0.6);
      directionalLight2.position.set(-5, 3, -3);
      scene.add(directionalLight2);

      // Add point lights for better reflection
      const pointLight1 = new THREE.PointLight(0xffd700, 0.8, 20);
      pointLight1.position.set(3, 3, 3);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0x1a237e, 0.6, 15);
      pointLight2.position.set(-3, -3, 3);
      scene.add(pointLight2);

      // Camera positioning
      camera.position.set(5, 4, 6);
      camera.lookAt(0, 0, 0);

      // Enhanced mouse interaction
      const handleMouseMove = (event: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      };

      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);

      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);

      // Resize handler
      const handleResize = () => {
        if (!camera || !renderer || !container) return;
        
        const rect = container.getBoundingClientRect();
        camera.aspect = rect.width / rect.height;
        camera.updateProjectionMatrix();
        renderer.setSize(rect.width, rect.height);
      };

      window.addEventListener('resize', handleResize);

      // Enhanced animation loop
      const clock = new THREE.Clock();
      let autoRotation = { x: 0, y: 0 };
      let solvingAnimation = 0;

      const animate = () => {
        animationRef.current = requestAnimationFrame(animate);
        
        const delta = clock.getDelta();
        const time = clock.getElapsedTime();

        if (cubeGroup) {
          // Enhanced mouse following with smooth interpolation
          const targetRotationY = mouseRef.current.x * (isHovered ? 0.5 : 0.2);
          const targetRotationX = mouseRef.current.y * (isHovered ? 0.3 : 0.15);
          
          // Auto rotation when not hovering
          if (!isHovered) {
            autoRotation.x += delta * 0.15;
            autoRotation.y += delta * 0.2;
          }
          
          // Smooth rotation interpolation
          const lerpFactor = isHovered ? 0.08 : 0.03;
          cubeGroup.rotation.y += (targetRotationY + autoRotation.y - cubeGroup.rotation.y) * lerpFactor;
          cubeGroup.rotation.x += (targetRotationX + autoRotation.x - cubeGroup.rotation.x) * lerpFactor;

          // Enhanced floating animation
          cubeGroup.position.y = Math.sin(time * 0.6) * 0.15;

          // Solving animation effect
          solvingAnimation += delta * 0.8;
          cubes.forEach((cube, index) => {
            const offset = index * 0.1;
            
            // Subtle individual rotations for "solving" effect
            cube.rotation.z = Math.sin(solvingAnimation + offset) * 0.03;
            cube.rotation.x += Math.sin(solvingAnimation * 0.5 + offset) * 0.002;
            
            // Enhanced hover effects
            if (isHovered) {
              const hoverIntensity = 1 + Math.sin(time * 2 + offset) * 0.05;
              cube.scale.setScalar(hoverIntensity);
              
              // Dynamic material properties on hover
              if (cube.material instanceof THREE.MeshPhysicalMaterial) {
                cube.material.transmission = 0.3 + Math.sin(time * 3 + offset) * 0.1;
                cube.material.opacity = 0.85 + Math.sin(time * 2 + offset) * 0.1;
              }
            } else {
              cube.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
              if (cube.material instanceof THREE.MeshPhysicalMaterial) {
                cube.material.transmission = THREE.MathUtils.lerp(cube.material.transmission, 0.2, 0.05);
                cube.material.opacity = THREE.MathUtils.lerp(cube.material.opacity, 0.9, 0.05);
              }
            }
          });

          // Dynamic lighting effects
          pointLight1.intensity = 0.8 + Math.sin(time * 2) * 0.2;
          pointLight2.intensity = 0.6 + Math.sin(time * 1.5) * 0.2;
        }

        renderer.render(scene, camera);
      };

      animate();

      // Cleanup function
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }

        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
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
  }, [isHovered]);

  // Enhanced fallback when WebGL is not available
  if (webGLFailed) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg">
        <div className="grid grid-cols-3 gap-1 w-40 h-40 transform rotate-12 hover:rotate-0 transition-transform duration-500">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="w-10 h-10 rounded-sm animate-pulse bg-gradient-to-br from-blue-800 to-blue-900 shadow-lg hover:scale-110 transition-transform duration-300"
              style={{
                animationDelay: `${i * 0.1}s`,
                background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)'
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
      className="w-full h-full cursor-pointer transition-all duration-300 hover:scale-105"
      style={{ minHeight: '400px' }}
    />
  );
};

export default RubiksCube;
