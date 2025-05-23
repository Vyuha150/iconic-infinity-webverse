
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
    
    try {
      // Scene, camera and renderer setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      
      try {
        // Try to create renderer with error handling
        renderer = new THREE.WebGLRenderer({ 
          alpha: true, 
          antialias: true,
          powerPreference: 'default',
          failIfMajorPerformanceCaveat: false // Be more permissive with performance issues
        });
      } catch (error) {
        console.error("Failed to create WebGL renderer:", error);
        setWebGLFailed(true);
        return;
      }
      
      if (!mountRef.current) return;

      // Set up renderer
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mountRef.current.appendChild(renderer.domElement);

      // Create infinity symbol
      const infinityGroup = new THREE.Group();
      scene.add(infinityGroup);

      // Parameters for infinity curves
      const radius = 1.2;
      const tubeRadius = 0.15;
      const radialSegments = 32;
      const tubularSegments = 200;
      
      // Set gold color for both parts of the infinity symbol
      const goldColor = 0xFFD700; // Gold color
      const goldMaterial = new THREE.MeshStandardMaterial({ 
        color: goldColor,
        metalness: 0.9,
        roughness: 0.1,
        envMapIntensity: 1.2,
      });
      
      // Create left loop of infinity
      const curve1 = new THREE.Curve<THREE.Vector3>();
      curve1.getPoint = function (t) {
        const angle = 2 * Math.PI * t;
        const x = -radius + radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        const z = 0;
        return new THREE.Vector3(x, y, z);
      };
      
      const geometry1 = new THREE.TubeGeometry(curve1, tubularSegments, tubeRadius, radialSegments, true);
      const leftLoop = new THREE.Mesh(geometry1, goldMaterial);
      infinityGroup.add(leftLoop);
      
      // Create right loop of infinity
      const curve2 = new THREE.Curve<THREE.Vector3>();
      curve2.getPoint = function (t) {
        const angle = 2 * Math.PI * t;
        const x = radius + radius * Math.cos(angle);
        const y = -radius * Math.sin(angle);
        const z = 0;
        return new THREE.Vector3(x, y, z);
      };
      
      const geometry2 = new THREE.TubeGeometry(curve2, tubularSegments, tubeRadius, radialSegments, true);
      const rightLoop = new THREE.Mesh(geometry2, goldMaterial);
      infinityGroup.add(rightLoop);

      // Create particles for background effect - optimize count for better performance
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 1500; // Reduced from 2000 for better performance
      
      const positions = new Float32Array(particlesCount * 3);
      const colors = new Float32Array(particlesCount * 3);
      
      const color1 = new THREE.Color(0xFFD700); // Gold
      const color2 = new THREE.Color(0xFFF8DC); // Light gold/cream for variation
      
      for (let i = 0; i < particlesCount; i++) {
        // Positions
        const distance = Math.random() * 40 + 15;
        const theta = THREE.MathUtils.randFloatSpread(360); 
        const phi = THREE.MathUtils.randFloatSpread(360);
        
        positions[i * 3] = distance * Math.sin(theta) * Math.cos(phi);
        positions[i * 3 + 1] = distance * Math.sin(theta) * Math.sin(phi);
        positions[i * 3 + 2] = distance * Math.cos(theta);
        
        // Colors - interpolate between gold shades
        const mixedColor = color1.clone();
        mixedColor.lerp(color2, Math.random() * 0.3); // Limit variation to maintain gold appearance
        
        colors[i * 3] = mixedColor.r;
        colors[i * 3 + 1] = mixedColor.g;
        colors[i * 3 + 2] = mixedColor.b;
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.06,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true
      });
      
      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);

      // Add lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      // Add directional light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(10, 10, 10);
      scene.add(directionalLight);

      // Add point lights - both gold for consistent color theme
      const pointLight1 = new THREE.PointLight(0xFFD700, 2, 50); // Gold light
      pointLight1.position.set(-5, 3, 5);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0xFFD700, 2, 50); // Gold light
      pointLight2.position.set(5, -3, -5);
      scene.add(pointLight2);

      // Set camera position
      camera.position.z = 8;

      // Make scene interactive with mouse movement - using throttling for performance
      let lastMouseMoveTime = 0;
      const handleMouseMove = (event: MouseEvent) => {
        const now = performance.now();
        // Throttle mouse movement handling to improve performance
        if (now - lastMouseMoveTime < 30) return; // 30ms throttle
        lastMouseMoveTime = now;
        
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        
        // Subtle movement of the infinity symbol
        infinityGroup.rotation.y = mouseX * 0.3;
        infinityGroup.rotation.x = mouseY * 0.2;
        
        // Adjust point light positions for dynamic lighting
        pointLight1.position.x = mouseX * 5;
        pointLight1.position.y = mouseY * 5;
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });

      // Handle window resize with throttling for performance
      let resizeTimeout: number | undefined;
      const handleResize = () => {
        if (resizeTimeout) window.clearTimeout(resizeTimeout);
        
        resizeTimeout = window.setTimeout(() => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        }, 100);
      };

      window.addEventListener('resize', handleResize);

      // Animation function with RAF control for performance
      let animationId: number;
      const animate = () => {
        animationId = requestAnimationFrame(animate);

        // Rotate infinity symbol
        infinityGroup.rotation.y += 0.002;
        
        // Rotate particles slowly
        particles.rotation.y += 0.0003;
        particles.rotation.x += 0.0001;

        renderer.render(scene, camera);
      };

      animate();

      // Clean up
      return () => {
        if (animationId) cancelAnimationFrame(animationId);
        
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
        geometry1.dispose();
        geometry2.dispose();
        goldMaterial.dispose();
        particlesGeometry.dispose();
        particlesMaterial.dispose();
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
      <div 
        className="absolute inset-0 z-0 overflow-hidden bg-gradient-radial from-iconic-gold/20 via-iconic-dark/90 to-iconic-dark"
        aria-hidden="true"
      />
    );
  }

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 z-0 overflow-hidden"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
};

export default ThreeCanvas;
