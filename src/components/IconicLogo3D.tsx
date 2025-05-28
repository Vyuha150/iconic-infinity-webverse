
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

const IconicLogo3D = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGLFailed, setWebGLFailed] = useState(false);
  const animationRef = useRef<number>();
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const logoGroupRef = useRef<THREE.Group>();
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
      camera.position.set(0, 0, 8);

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

      // Create 3D ICONIC logo group based on the uploaded image
      const logoGroup = new THREE.Group();
      logoGroupRef.current = logoGroup;

      // Main outer ring (circular border)
      const outerRingGeometry = new THREE.TorusGeometry(2.0, 0.15, 16, 100);
      const goldMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xFFD700,
        metalness: 0.9,
        roughness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        emissive: 0x332200,
        emissiveIntensity: 0.3
      });
      const outerRing = new THREE.Mesh(outerRingGeometry, goldMaterial);
      logoGroup.add(outerRing);

      // Inner oval rings (the two infinity-like ovals)
      const ovalGeometry = new THREE.TorusGeometry(0.8, 0.1, 12, 50);
      
      // Left oval
      const leftOval = new THREE.Mesh(ovalGeometry, goldMaterial.clone());
      leftOval.position.set(-0.5, 0, 0);
      leftOval.rotation.z = Math.PI / 6; // Slight rotation
      leftOval.scale.set(1.2, 0.8, 1);
      logoGroup.add(leftOval);

      // Right oval
      const rightOval = new THREE.Mesh(ovalGeometry, goldMaterial.clone());
      rightOval.position.set(0.5, 0, 0);
      rightOval.rotation.z = -Math.PI / 6; // Opposite rotation
      rightOval.scale.set(1.2, 0.8, 1);
      logoGroup.add(rightOval);

      // Central "I" pillar
      const pillarGeometry = new THREE.CylinderGeometry(0.12, 0.12, 2.5, 16);
      const pillar = new THREE.Mesh(pillarGeometry, goldMaterial.clone());
      logoGroup.add(pillar);

      // Top decorative element
      const topGeometry = new THREE.CylinderGeometry(0.25, 0.18, 0.2, 16);
      const topElement = new THREE.Mesh(topGeometry, goldMaterial.clone());
      topElement.position.y = 1.35;
      logoGroup.add(topElement);

      // Bottom decorative element
      const bottomGeometry = new THREE.CylinderGeometry(0.18, 0.25, 0.2, 16);
      const bottomElement = new THREE.Mesh(bottomGeometry, goldMaterial.clone());
      bottomElement.position.y = -1.35;
      logoGroup.add(bottomElement);

      // Add subtle connecting elements
      const connectGeometry = new THREE.SphereGeometry(0.08, 16, 16);
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const connector = new THREE.Mesh(connectGeometry, goldMaterial.clone());
        connector.position.set(
          Math.cos(angle) * 1.85,
          Math.sin(angle) * 1.85,
          0
        );
        logoGroup.add(connector);
      }

      // Position the logo to face the user
      logoGroup.rotation.x = 0;
      logoGroup.rotation.y = 0;
      logoGroup.rotation.z = 0;

      scene.add(logoGroup);

      // Enhanced lighting setup
      const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
      directionalLight.position.set(5, 5, 5);
      directionalLight.castShadow = true;
      scene.add(directionalLight);

      const pointLight1 = new THREE.PointLight(0x4F46E5, 1.2, 10);
      pointLight1.position.set(-4, 3, 4);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0xFFD700, 1.2, 10);
      pointLight2.position.set(4, -3, 4);
      scene.add(pointLight2);

      const rimLight = new THREE.PointLight(0xFFFFFF, 0.8, 15);
      rimLight.position.set(0, 0, -5);
      scene.add(rimLight);

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

        if (logoGroupRef.current) {
          // Smooth mouse interaction - more responsive
          const targetRotationY = mouseRef.current.x * 0.5;
          const targetRotationX = mouseRef.current.y * 0.4;
          
          logoGroupRef.current.rotation.y += (targetRotationY - logoGroupRef.current.rotation.y) * 0.08;
          logoGroupRef.current.rotation.x += (targetRotationX - logoGroupRef.current.rotation.x) * 0.08;
          
          // Gentle auto-rotation when not interacting
          if (Math.abs(mouseRef.current.x) < 0.1 && Math.abs(mouseRef.current.y) < 0.1) {
            logoGroupRef.current.rotation.y += 0.002;
          }
          
          // Subtle floating motion
          logoGroupRef.current.position.y = Math.sin(elapsedTime * 1.2) * 0.1;
          logoGroupRef.current.position.z = Math.cos(elapsedTime * 0.8) * 0.05;
        }

        // Dynamic lighting
        pointLight1.intensity = 1.0 + Math.sin(elapsedTime * 1.5) * 0.3;
        pointLight2.intensity = 1.0 + Math.cos(elapsedTime * 1.8) * 0.3;

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

        // Dispose of all geometries and materials
        outerRingGeometry.dispose();
        ovalGeometry.dispose();
        pillarGeometry.dispose();
        topGeometry.dispose();
        bottomGeometry.dispose();
        connectGeometry.dispose();
        goldMaterial.dispose();
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
        <div className="w-32 h-32 bg-gradient-to-br from-iconic-blue to-iconic-gold rounded-full opacity-30 animate-pulse flex items-center justify-center">
          <span className="text-white font-bold text-2xl">I</span>
        </div>
      );
    }
  }

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full cursor-none"
    />
  );
};

export default IconicLogo3D;
