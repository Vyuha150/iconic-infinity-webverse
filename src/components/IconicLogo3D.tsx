
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

      // Create 3D ICONIC logo group
      const logoGroup = new THREE.Group();
      logoGroupRef.current = logoGroup;

      // Main circular ring (outer)
      const ringGeometry = new THREE.TorusGeometry(1.2, 0.1, 16, 100);
      const ringMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xFFD700,
        metalness: 0.8,
        roughness: 0.2,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        emissive: 0x332200,
        emissiveIntensity: 0.3
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2;
      logoGroup.add(ring);

      // Inner oval elements
      const ovalGeometry = new THREE.TorusGeometry(0.6, 0.08, 12, 50);
      const ovalMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xFFD700,
        metalness: 0.7,
        roughness: 0.3,
        clearcoat: 0.8,
        clearcoatRoughness: 0.2
      });
      
      const leftOval = new THREE.Mesh(ovalGeometry, ovalMaterial);
      leftOval.rotation.x = Math.PI / 2;
      leftOval.position.x = -0.3;
      leftOval.scale.set(0.8, 1, 0.6);
      logoGroup.add(leftOval);

      const rightOval = new THREE.Mesh(ovalGeometry, ovalMaterial);
      rightOval.rotation.x = Math.PI / 2;
      rightOval.position.x = 0.3;
      rightOval.scale.set(0.8, 1, 0.6);
      logoGroup.add(rightOval);

      // Central "I" pillar
      const pillarGeometry = new THREE.CylinderGeometry(0.08, 0.08, 1.5, 16);
      const pillarMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xFFD700,
        metalness: 0.9,
        roughness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        emissive: 0x332200,
        emissiveIntensity: 0.4
      });
      const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
      logoGroup.add(pillar);

      // Top cap
      const capGeometry = new THREE.CylinderGeometry(0.2, 0.15, 0.15, 16);
      const cap = new THREE.Mesh(capGeometry, pillarMaterial);
      cap.position.y = 0.8;
      logoGroup.add(cap);

      // Base
      const baseGeometry = new THREE.CylinderGeometry(0.15, 0.2, 0.15, 16);
      const base = new THREE.Mesh(baseGeometry, pillarMaterial);
      base.position.y = -0.8;
      logoGroup.add(base);

      scene.add(logoGroup);

      // Enhanced lighting similar to Resend.com
      const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
      directionalLight.position.set(5, 5, 5);
      directionalLight.castShadow = true;
      scene.add(directionalLight);

      const pointLight1 = new THREE.PointLight(0x4F46E5, 1.2, 10);
      pointLight1.position.set(-3, 2, 3);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0xFFD700, 1.2, 10);
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

        if (logoGroupRef.current) {
          // Smooth mouse interaction
          const targetRotationY = mouseRef.current.x * 0.4;
          const targetRotationX = mouseRef.current.y * 0.3;
          
          logoGroupRef.current.rotation.y += (targetRotationY - logoGroupRef.current.rotation.y) * 0.05;
          logoGroupRef.current.rotation.x += (targetRotationX - logoGroupRef.current.rotation.x) * 0.05;
          
          // Gentle auto-rotation when not interacting
          logoGroupRef.current.rotation.y += 0.003;
          
          // Subtle floating motion
          logoGroupRef.current.position.y = Math.sin(elapsedTime * 0.8) * 0.1;
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

        // Dispose of geometries and materials
        ringGeometry.dispose();
        ringMaterial.dispose();
        ovalGeometry.dispose();
        ovalMaterial.dispose();
        pillarGeometry.dispose();
        pillarMaterial.dispose();
        capGeometry.dispose();
        baseGeometry.dispose();
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

export default IconicLogo3D;
