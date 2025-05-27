
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// WebGL detection utility function
const isWebGLAvailable = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && 
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
};

const ThreeCanvas = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGLFailed, setWebGLFailed] = useState(false);

  useEffect(() => {
    // Check WebGL support before attempting to initialize
    if (!isWebGLAvailable()) {
      console.warn("WebGL is not supported in this environment");
      setWebGLFailed(true);
      return;
    }

    let renderer: THREE.WebGLRenderer;
    let animationId: number;
    
    try {
      // Scene, camera and renderer setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      
      try {
        renderer = new THREE.WebGLRenderer({ 
          alpha: true, 
          antialias: true,
          powerPreference: 'high-performance'
        });
      } catch (error) {
        console.error("Failed to create WebGL renderer:", error);
        setWebGLFailed(true);
        return;
      }
      
      if (!mountRef.current) return;

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      mountRef.current.appendChild(renderer.domElement);

      // Enhanced infinity symbol creation
      const infinityGroup = new THREE.Group();
      scene.add(infinityGroup);

      // Create infinity curve using parametric equations
      const createInfinityGeometry = () => {
        const points = [];
        const segments = 300;
        
        for (let i = 0; i <= segments; i++) {
          const t = (i / segments) * Math.PI * 2;
          const scale = 2;
          
          // Infinity symbol parametric equations
          const x = scale * Math.cos(t) / (1 + Math.sin(t) * Math.sin(t));
          const y = scale * Math.sin(t) * Math.cos(t) / (1 + Math.sin(t) * Math.sin(t));
          const z = Math.sin(t * 4) * 0.1; // Add slight Z variation
          
          points.push(new THREE.Vector3(x, y, z));
        }
        
        return new THREE.BufferGeometry().setFromPoints(points);
      };

      // Main infinity tube
      const infinityGeometry = createInfinityGeometry();
      const tubeGeometry = new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(infinityGeometry.attributes.position.array), 
        300, 
        0.08, 
        16, 
        true
      );

      // Gradient material for infinity
      const infinityMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFD700,
        metalness: 0.9,
        roughness: 0.1,
        emissive: 0x221100,
        emissiveIntensity: 0.2
      });

      const infinityMesh = new THREE.Mesh(tubeGeometry, infinityMaterial);
      infinityGroup.add(infinityMesh);

      // Create flowing particles along the infinity path
      const particleCount = 100;
      const particleGeometry = new THREE.BufferGeometry();
      const particlePositions = new Float32Array(particleCount * 3);
      const particleColors = new Float32Array(particleCount * 3);
      const particleSizes = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        // Initialize particles along infinity curve
        const t = (i / particleCount) * Math.PI * 2;
        const scale = 2;
        const x = scale * Math.cos(t) / (1 + Math.sin(t) * Math.sin(t));
        const y = scale * Math.sin(t) * Math.cos(t) / (1 + Math.sin(t) * Math.sin(t));
        const z = Math.sin(t * 4) * 0.1;

        particlePositions[i * 3] = x;
        particlePositions[i * 3 + 1] = y;
        particlePositions[i * 3 + 2] = z;

        // Alternating colors
        const color = i % 2 === 0 ? new THREE.Color(0x0047AB) : new THREE.Color(0xFFD700);
        particleColors[i * 3] = color.r;
        particleColors[i * 3 + 1] = color.g;
        particleColors[i * 3 + 2] = color.b;

        particleSizes[i] = Math.random() * 0.02 + 0.01;
      }

      particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
      particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      });

      const particles = new THREE.Points(particleGeometry, particleMaterial);
      infinityGroup.add(particles);

      // Enhanced lighting setup
      const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      // Dynamic point lights
      const blueLight = new THREE.PointLight(0x0047AB, 2, 20);
      blueLight.position.set(-3, 0, 2);
      scene.add(blueLight);

      const goldLight = new THREE.PointLight(0xFFD700, 2, 20);
      goldLight.position.set(3, 0, 2);
      scene.add(goldLight);

      // Rim lighting
      const rimLight = new THREE.DirectionalLight(0x0047AB, 0.5);
      rimLight.position.set(0, 0, -5);
      scene.add(rimLight);

      // Set camera position
      camera.position.set(0, 0, 6);

      // Mouse interaction
      let mouseX = 0;
      let mouseY = 0;
      let targetRotationX = 0;
      let targetRotationY = 0;

      const handleMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        
        targetRotationY = mouseX * 0.3;
        targetRotationX = mouseY * 0.2;
      };

      window.addEventListener('mousemove', handleMouseMove);

      // Handle window resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

      // Animation variables
      let time = 0;
      const clock = new THREE.Clock();

      // Animation function
      const animate = () => {
        animationId = requestAnimationFrame(animate);
        time = clock.getElapsedTime();

        // Smooth rotation towards mouse position
        infinityGroup.rotation.y += (targetRotationY - infinityGroup.rotation.y) * 0.05;
        infinityGroup.rotation.x += (targetRotationX - infinityGroup.rotation.x) * 0.05;

        // Continuous slow rotation
        infinityGroup.rotation.z += 0.001;

        // Animate infinity symbol
        infinityMesh.rotation.y += 0.005;
        
        // Animate particles along the infinity path
        const positions = particles.geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
          const t = (time * 0.5 + (i / particleCount) * Math.PI * 2) % (Math.PI * 2);
          const scale = 2;
          const x = scale * Math.cos(t) / (1 + Math.sin(t) * Math.sin(t));
          const y = scale * Math.sin(t) * Math.cos(t) / (1 + Math.sin(t) * Math.sin(t));
          const z = Math.sin(t * 4) * 0.1 + Math.sin(time + i) * 0.05;

          positions[i * 3] = x;
          positions[i * 3 + 1] = y;
          positions[i * 3 + 2] = z;
        }
        particles.geometry.attributes.position.needsUpdate = true;

        // Animate lights
        blueLight.intensity = 1.5 + Math.sin(time * 2) * 0.5;
        goldLight.intensity = 1.5 + Math.cos(time * 2) * 0.5;
        
        blueLight.position.x = Math.cos(time) * 4;
        goldLight.position.x = Math.sin(time) * 4;

        // Color shifting for infinity material
        const colorShift = Math.sin(time * 0.5) * 0.5 + 0.5;
        infinityMaterial.emissiveIntensity = 0.1 + colorShift * 0.3;

        renderer.render(scene, camera);
      };

      animate();

      // Clean up
      return () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
        
        if (mountRef.current && renderer.domElement) {
          try {
            mountRef.current.removeChild(renderer.domElement);
          } catch (e) {
            console.error("Error removing renderer:", e);
          }
        }
        
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        
        // Dispose geometries and materials
        infinityGeometry.dispose();
        tubeGeometry.dispose();
        infinityMaterial.dispose();
        particleGeometry.dispose();
        particleMaterial.dispose();
        renderer.dispose();
      };
    } catch (error) {
      console.error("Error in Three.js setup:", error);
      setWebGLFailed(true);
    }
  }, []);

  // Create a fallback gradient background if WebGL fails
  if (webGLFailed) {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-iconic-blue/20 via-iconic-dark to-iconic-dark animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-32 h-16 border-4 border-iconic-gold rounded-full animate-spin opacity-20" />
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 z-0 overflow-hidden"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default ThreeCanvas;
