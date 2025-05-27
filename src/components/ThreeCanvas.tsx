
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

const ThreeCanvas = () => {
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
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      // Enhanced renderer with better performance
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
        precision: 'highp'
      });
      rendererRef.current = renderer;

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      
      mountRef.current.appendChild(renderer.domElement);

      // Create infinity symbol geometry
      const createInfinityPath = () => {
        const points = [];
        const segments = 200;
        
        for (let i = 0; i <= segments; i++) {
          const t = (i / segments) * Math.PI * 2;
          const scale = 2.5;
          
          // Enhanced infinity parametric equations
          const x = scale * Math.cos(t) / (1 + Math.sin(t) * Math.sin(t));
          const y = scale * Math.sin(t) * Math.cos(t) / (1 + Math.sin(t) * Math.sin(t));
          const z = Math.sin(t * 3) * 0.15;
          
          points.push(new THREE.Vector3(x, y, z));
        }
        
        return new THREE.CatmullRomCurve3(points, true);
      };

      const infinityPath = createInfinityPath();

      // Main infinity tube with premium materials
      const tubeGeometry = new THREE.TubeGeometry(infinityPath, 200, 0.12, 20, true);
      
      // Create gradient material for infinity
      const infinityMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xFFD700,
        metalness: 0.9,
        roughness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        emissive: 0x332200,
        emissiveIntensity: 0.3,
        transmission: 0.1,
        thickness: 0.5
      });

      const infinityMesh = new THREE.Mesh(tubeGeometry, infinityMaterial);
      infinityMesh.castShadow = true;
      infinityMesh.receiveShadow = true;
      scene.add(infinityMesh);

      // Flowing particles system
      const particleCount = 150;
      const particleGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        const t = (i / particleCount) * Math.PI * 2;
        const point = infinityPath.getPoint(t);
        
        positions[i * 3] = point.x;
        positions[i * 3 + 1] = point.y;
        positions[i * 3 + 2] = point.z;

        // Alternating blue and gold particles
        const color = i % 3 === 0 ? new THREE.Color(0x0047AB) : new THREE.Color(0xFFD700);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;

        sizes[i] = Math.random() * 0.03 + 0.02;
      }

      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.08,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
      });

      const particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      // Enhanced lighting setup
      const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
      scene.add(ambientLight);

      const mainLight = new THREE.DirectionalLight(0xFFD700, 1.5);
      mainLight.position.set(5, 5, 5);
      mainLight.castShadow = true;
      mainLight.shadow.mapSize.width = 2048;
      mainLight.shadow.mapSize.height = 2048;
      scene.add(mainLight);

      // Dynamic accent lights
      const blueLight = new THREE.PointLight(0x0047AB, 3, 15);
      blueLight.position.set(-4, 0, 2);
      scene.add(blueLight);

      const goldLight = new THREE.PointLight(0xFFD700, 3, 15);
      goldLight.position.set(4, 0, 2);
      scene.add(goldLight);

      // Rim lighting for depth
      const rimLight = new THREE.DirectionalLight(0x0066FF, 0.8);
      rimLight.position.set(0, 0, -8);
      scene.add(rimLight);

      // Camera positioning
      camera.position.set(0, 0, 7);

      // Smooth mouse interaction with throttling
      let mouseX = 0;
      let mouseY = 0;
      let targetRotationX = 0;
      let targetRotationY = 0;

      const handleMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        
        targetRotationY = mouseX * 0.4;
        targetRotationX = mouseY * 0.3;
      };

      // Throttled mouse move handler
      let mouseMoveTimeout: number;
      const throttledMouseMove = (event: MouseEvent) => {
        if (mouseMoveTimeout) return;
        mouseMoveTimeout = window.setTimeout(() => {
          handleMouseMove(event);
          mouseMoveTimeout = 0;
        }, 16); // ~60fps
      };

      window.addEventListener('mousemove', throttledMouseMove);

      // Optimized resize handler
      const handleResize = () => {
        if (!camera || !renderer) return;
        
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      let resizeTimeout: number;
      const throttledResize = () => {
        if (resizeTimeout) return;
        resizeTimeout = window.setTimeout(() => {
          handleResize();
          resizeTimeout = 0;
        }, 100);
      };

      window.addEventListener('resize', throttledResize);

      // High-performance animation loop
      const clock = new THREE.Clock();
      let time = 0;

      const animate = () => {
        animationRef.current = requestAnimationFrame(animate);
        
        const delta = clock.getDelta();
        time += delta;

        // Smooth rotation interpolation
        infinityMesh.rotation.y += (targetRotationY - infinityMesh.rotation.y) * 0.03;
        infinityMesh.rotation.x += (targetRotationX - infinityMesh.rotation.x) * 0.03;

        // Continuous gentle rotation
        infinityMesh.rotation.z += delta * 0.2;

        // Animate particles along path
        const particlePositions = particles.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          const t = (time * 0.3 + (i / particleCount)) % 1;
          const point = infinityPath.getPoint(t);
          
          // Add slight random movement
          const offset = Math.sin(time * 2 + i) * 0.05;
          
          particlePositions[i * 3] = point.x + offset;
          particlePositions[i * 3 + 1] = point.y + offset * 0.5;
          particlePositions[i * 3 + 2] = point.z + offset * 0.3;
        }
        particles.geometry.attributes.position.needsUpdate = true;

        // Dynamic lighting animation
        blueLight.intensity = 2 + Math.sin(time * 1.5) * 0.8;
        goldLight.intensity = 2 + Math.cos(time * 1.8) * 0.8;
        
        blueLight.position.x = Math.cos(time * 0.8) * 5;
        goldLight.position.x = Math.sin(time * 0.6) * 5;

        // Material animation
        infinityMaterial.emissiveIntensity = 0.2 + Math.sin(time * 0.7) * 0.2;

        renderer.render(scene, camera);
      };

      animate();

      // Cleanup function
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }

        // Remove event listeners
        window.removeEventListener('mousemove', throttledMouseMove);
        window.removeEventListener('resize', throttledResize);

        // Clean up timeouts
        if (mouseMoveTimeout) clearTimeout(mouseMoveTimeout);
        if (resizeTimeout) clearTimeout(resizeTimeout);

        // Dispose of Three.js resources
        if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
          mountRef.current.removeChild(renderer.domElement);
        }

        tubeGeometry.dispose();
        infinityMaterial.dispose();
        particleGeometry.dispose();
        particleMaterial.dispose();
        renderer.dispose();

        // Clear refs
        sceneRef.current = undefined;
        rendererRef.current = undefined;
      };

    } catch (error) {
      console.error("Three.js initialization error:", error);
      setWebGLFailed(true);
    }
  }, []);

  // Enhanced fallback with animated infinity
  if (webGLFailed) {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-b from-iconic-dark via-iconic-blue/10 to-iconic-dark">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-64 h-32 opacity-30" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M50,50 C50,20 70,20 80,35 C90,50 110,50 120,35 C130,20 150,20 150,50 C150,80 130,80 120,65 C110,50 90,50 80,65 C70,80 50,80 50,50 Z"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              className="animate-dash"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0047AB" />
                <stop offset="50%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#0047AB" />
              </linearGradient>
            </defs>
          </svg>
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
