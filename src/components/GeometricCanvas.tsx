
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const isWebGLAvailable = () => {
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!context;
  } catch (e) {
    return false;
  }
};

const GeometricCanvas = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGLFailed, setWebGLFailed] = useState(false);
  const animationRef = useRef<number>();
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cubeRef = useRef<THREE.Mesh>();
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
      
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
      camera.position.set(0, 0, 5);

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      rendererRef.current = renderer;

      const container = mountRef.current;
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;

      renderer.setSize(containerWidth, containerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      container.appendChild(renderer.domElement);

      // Create cube geometry similar to Resend.com
      const geometry = new THREE.BoxGeometry(2, 2, 2);
      
      // Create materials for each face with gradients
      const materials = [
        new THREE.MeshPhysicalMaterial({ 
          color: 0x4F46E5, 
          metalness: 0.1, 
          roughness: 0.2,
          clearcoat: 0.8,
          clearcoatRoughness: 0.1
        }),
        new THREE.MeshPhysicalMaterial({ 
          color: 0x6366F1, 
          metalness: 0.1, 
          roughness: 0.2,
          clearcoat: 0.8,
          clearcoatRoughness: 0.1
        }),
        new THREE.MeshPhysicalMaterial({ 
          color: 0x8B5CF6, 
          metalness: 0.1, 
          roughness: 0.2,
          clearcoat: 0.8,
          clearcoatRoughness: 0.1
        }),
        new THREE.MeshPhysicalMaterial({ 
          color: 0xA855F7, 
          metalness: 0.1, 
          roughness: 0.2,
          clearcoat: 0.8,
          clearcoatRoughness: 0.1
        }),
        new THREE.MeshPhysicalMaterial({ 
          color: 0xFFD700, 
          metalness: 0.2, 
          roughness: 0.1,
          clearcoat: 0.9,
          clearcoatRoughness: 0.05
        }),
        new THREE.MeshPhysicalMaterial({ 
          color: 0xFFC107, 
          metalness: 0.2, 
          roughness: 0.1,
          clearcoat: 0.9,
          clearcoatRoughness: 0.05
        }),
      ];

      const cube = new THREE.Mesh(geometry, materials);
      cube.position.set(0, 0, 0);
      cubeRef.current = cube;
      scene.add(cube);

      // Lighting setup similar to Resend.com
      const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
      directionalLight.position.set(5, 5, 5);
      directionalLight.castShadow = true;
      scene.add(directionalLight);

      const pointLight1 = new THREE.PointLight(0x4F46E5, 0.8, 10);
      pointLight1.position.set(-3, 2, 3);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0xFFD700, 0.8, 10);
      pointLight2.position.set(3, -2, 3);
      scene.add(pointLight2);

      // Mouse interaction
      const handleMouseMove = (event: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      };

      container.addEventListener('mousemove', handleMouseMove);

      // Resize handler
      const handleResize = () => {
        if (!camera || !renderer || !mountRef.current) return;
        
        const newWidth = mountRef.current.offsetWidth;
        const newHeight = mountRef.current.offsetHeight;
        
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      };

      window.addEventListener('resize', handleResize);

      // Animation loop
      const clock = new THREE.Clock();

      const animate = () => {
        animationRef.current = requestAnimationFrame(animate);
        
        const elapsedTime = clock.getElapsedTime();

        if (cubeRef.current) {
          // Smooth mouse interaction
          const targetRotationY = mouseRef.current.x * 0.3;
          const targetRotationX = mouseRef.current.y * 0.3;
          
          cubeRef.current.rotation.y += (targetRotationY - cubeRef.current.rotation.y) * 0.05;
          cubeRef.current.rotation.x += (targetRotationX - cubeRef.current.rotation.x) * 0.05;
          
          // Gentle auto-rotation when not interacting
          cubeRef.current.rotation.y += 0.005;
          cubeRef.current.rotation.x += 0.003;
          
          // Subtle floating motion
          cubeRef.current.position.y = Math.sin(elapsedTime * 0.5) * 0.1;
        }

        // Dynamic lighting
        pointLight1.intensity = 0.8 + Math.sin(elapsedTime * 2) * 0.2;
        pointLight2.intensity = 0.8 + Math.cos(elapsedTime * 2.2) * 0.2;

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }

        container.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);

        if (container && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }

        geometry.dispose();
        materials.forEach(material => material.dispose());
        renderer.dispose();
      };

    } catch (error) {
      console.error("Three.js initialization error:", error);
      setWebGLFailed(true);
    }
  }, []);

  if (webGLFailed) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-32 h-32 bg-gradient-to-br from-iconic-blue to-iconic-gold rounded-lg opacity-30 animate-pulse"></div>
      </div>
    );
  }

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full cursor-none"
    />
  );
};

export default GeometricCanvas;
