
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
        50,
        1,
        0.1,
        1000
      );

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
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      
      container.appendChild(renderer.domElement);

      // Create geometric crystal shape
      const createCrystalGeometry = () => {
        const geometry = new THREE.ConeGeometry(1.5, 3, 8);
        return geometry;
      };

      const createDiamondGeometry = () => {
        const geometry = new THREE.OctahedronGeometry(1.8);
        return geometry;
      };

      // Main crystal/diamond shape
      const crystalGeometry = createCrystalGeometry();
      const diamondGeometry = createDiamondGeometry();
      
      // Professional gradient material
      const crystalMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x4F46E5,
        metalness: 0.1,
        roughness: 0.2,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        transmission: 0.2,
        thickness: 0.5,
        transparent: true,
        opacity: 0.9
      });

      const diamondMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xFFD700,
        metalness: 0.9,
        roughness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        transmission: 0.1,
        thickness: 0.3,
        transparent: true,
        opacity: 0.8
      });

      const crystalMesh = new THREE.Mesh(crystalGeometry, crystalMaterial);
      const diamondMesh = new THREE.Mesh(diamondGeometry, diamondMaterial);
      
      crystalMesh.position.y = 0.5;
      diamondMesh.position.y = -0.5;
      diamondMesh.scale.set(0.7, 0.7, 0.7);

      crystalMesh.castShadow = true;
      crystalMesh.receiveShadow = true;
      diamondMesh.castShadow = true;
      diamondMesh.receiveShadow = true;

      scene.add(crystalMesh);
      scene.add(diamondMesh);

      // Create floating particles
      const particleCount = 50;
      const particleGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

        const color = i % 2 === 0 ? new THREE.Color(0x4F46E5) : new THREE.Color(0xFFD700);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }

      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
      });

      const particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      // Lighting setup
      const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
      scene.add(ambientLight);

      const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
      mainLight.position.set(5, 5, 5);
      mainLight.castShadow = true;
      mainLight.shadow.mapSize.width = 1024;
      mainLight.shadow.mapSize.height = 1024;
      scene.add(mainLight);

      const blueLight = new THREE.PointLight(0x4F46E5, 2, 10);
      blueLight.position.set(-3, 2, 3);
      scene.add(blueLight);

      const goldLight = new THREE.PointLight(0xFFD700, 2, 10);
      goldLight.position.set(3, -2, 3);
      scene.add(goldLight);

      // Camera positioning
      camera.position.set(0, 0, 6);

      // Mouse interaction
      let mouseX = 0;
      let mouseY = 0;

      const handleMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      };

      window.addEventListener('mousemove', handleMouseMove);

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

        // Smooth rotation
        crystalMesh.rotation.y = elapsedTime * 0.3;
        crystalMesh.rotation.x = Math.sin(elapsedTime * 0.2) * 0.1;
        
        diamondMesh.rotation.y = -elapsedTime * 0.4;
        diamondMesh.rotation.x = Math.cos(elapsedTime * 0.3) * 0.1;

        // Gentle floating motion
        crystalMesh.position.y = 0.5 + Math.sin(elapsedTime * 0.5) * 0.2;
        diamondMesh.position.y = -0.5 + Math.cos(elapsedTime * 0.7) * 0.15;

        // Mouse interaction
        const targetRotationY = mouseX * 0.2;
        const targetRotationX = mouseY * 0.1;
        
        crystalMesh.rotation.y += (targetRotationY - crystalMesh.rotation.y) * 0.02;
        crystalMesh.rotation.x += (targetRotationX - crystalMesh.rotation.x) * 0.02;

        // Animate particles
        const particlePositions = particles.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          particlePositions[i * 3 + 1] += Math.sin(elapsedTime + i) * 0.001;
        }
        particles.geometry.attributes.position.needsUpdate = true;
        particles.rotation.y = elapsedTime * 0.1;

        // Dynamic lighting
        blueLight.intensity = 1.5 + Math.sin(elapsedTime * 2) * 0.5;
        goldLight.intensity = 1.5 + Math.cos(elapsedTime * 2.2) * 0.5;

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }

        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);

        if (container && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }

        crystalGeometry.dispose();
        diamondGeometry.dispose();
        crystalMaterial.dispose();
        diamondMaterial.dispose();
        particleGeometry.dispose();
        particleMaterial.dispose();
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
      className="w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default GeometricCanvas;
