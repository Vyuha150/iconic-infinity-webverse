
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
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      // Enhanced renderer
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      rendererRef.current = renderer;

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      
      mountRef.current.appendChild(renderer.domElement);

      // Create smooth infinity path
      const createInfinityPath = () => {
        const points = [];
        const segments = 300;
        
        for (let i = 0; i <= segments; i++) {
          const t = (i / segments) * Math.PI * 2;
          const scale = 3.5;
          
          const x = scale * Math.cos(t) / (1 + Math.sin(t) * Math.sin(t));
          const y = scale * Math.sin(t) * Math.cos(t) / (1 + Math.sin(t) * Math.sin(t));
          const z = Math.sin(t * 4) * 0.2;
          
          points.push(new THREE.Vector3(x, y, z));
        }
        
        return new THREE.CatmullRomCurve3(points, true);
      };

      const infinityPath = createInfinityPath();

      // Premium infinity tube
      const tubeGeometry = new THREE.TubeGeometry(infinityPath, 300, 0.15, 24, true);
      
      const infinityMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xFFD700,
        metalness: 0.95,
        roughness: 0.05,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        emissive: 0x443300,
        emissiveIntensity: 0.4,
        transmission: 0.2,
        thickness: 1.0
      });

      const infinityMesh = new THREE.Mesh(tubeGeometry, infinityMaterial);
      infinityMesh.castShadow = true;
      infinityMesh.receiveShadow = true;
      scene.add(infinityMesh);

      // Flowing particles
      const particleCount = 200;
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

        const color = i % 3 === 0 ? new THREE.Color(0x0047AB) : new THREE.Color(0xFFD700);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;

        sizes[i] = Math.random() * 0.04 + 0.02;
      }

      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      });

      const particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      // Enhanced lighting
      const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
      scene.add(ambientLight);

      const mainLight = new THREE.DirectionalLight(0xFFD700, 2);
      mainLight.position.set(6, 6, 6);
      mainLight.castShadow = true;
      scene.add(mainLight);

      const blueLight = new THREE.PointLight(0x0047AB, 4, 20);
      blueLight.position.set(-5, 0, 3);
      scene.add(blueLight);

      const goldLight = new THREE.PointLight(0xFFD700, 4, 20);
      goldLight.position.set(5, 0, 3);
      scene.add(goldLight);

      // Camera positioning
      camera.position.set(0, 0, 8);

      // Professional mouse interaction
      const handleMouseMove = (event: MouseEvent) => {
        mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
      };

      window.addEventListener('mousemove', handleMouseMove);

      // Resize handler
      const handleResize = () => {
        if (!camera || !renderer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

      // Smooth animation loop
      const clock = new THREE.Clock();
      let time = 0;

      const animate = () => {
        animationRef.current = requestAnimationFrame(animate);
        
        const delta = clock.getDelta();
        time += delta;

        // Horizontal movement with mouse interaction
        const targetX = mouseRef.current.x * 0.3;
        const targetY = mouseRef.current.y * 0.2;
        
        infinityMesh.position.x += (targetX - infinityMesh.position.x) * 0.02;
        infinityMesh.position.y += (targetY - infinityMesh.position.y) * 0.02;
        
        // Slow horizontal oscillation
        infinityMesh.position.x += Math.sin(time * 0.5) * 0.01;
        
        // Gentle rotation
        infinityMesh.rotation.z += delta * 0.15;
        infinityMesh.rotation.y += mouseRef.current.x * 0.01;
        infinityMesh.rotation.x += mouseRef.current.y * 0.005;

        // Animate particles
        const particlePositions = particles.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          const t = (time * 0.2 + (i / particleCount)) % 1;
          const point = infinityPath.getPoint(t);
          
          const offset = Math.sin(time * 1.5 + i) * 0.03;
          
          particlePositions[i * 3] = point.x + offset + infinityMesh.position.x;
          particlePositions[i * 3 + 1] = point.y + offset * 0.5 + infinityMesh.position.y;
          particlePositions[i * 3 + 2] = point.z + offset * 0.3;
        }
        particles.geometry.attributes.position.needsUpdate = true;

        // Dynamic lighting
        blueLight.intensity = 3 + Math.sin(time * 1.2) * 1;
        goldLight.intensity = 3 + Math.cos(time * 1.5) * 1;
        
        blueLight.position.x = Math.cos(time * 0.6) * 6 + infinityMesh.position.x;
        goldLight.position.x = Math.sin(time * 0.8) * 6 + infinityMesh.position.x;

        // Material animation
        infinityMaterial.emissiveIntensity = 0.3 + Math.sin(time * 0.8) * 0.2;

        renderer.render(scene, camera);
      };

      animate();

      // Cleanup
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        
        if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
          mountRef.current.removeChild(renderer.domElement);
        }

        tubeGeometry.dispose();
        infinityMaterial.dispose();
        particleGeometry.dispose();
        particleMaterial.dispose();
        renderer.dispose();
      };

    } catch (error) {
      console.error("Three.js error:", error);
      setWebGLFailed(true);
    }
  }, []);

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
