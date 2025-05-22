
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeCanvas = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scene, camera and renderer setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    if (!mountRef.current) return;

    // Set up renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Create a group for all objects
    const group = new THREE.Group();
    scene.add(group);

    // Create ICONIC text with company-like look and feel
    const textGeometry = new THREE.SphereGeometry(1, 32, 32);
    const materials = [
      new THREE.MeshBasicMaterial({ color: 0x0047AB }), // Blue
      new THREE.MeshBasicMaterial({ color: 0xFFD700 }), // Gold
      new THREE.MeshBasicMaterial({ color: 0x1E293B }), // Slate
    ];
    
    // Create multiple spheres
    const spheres: THREE.Mesh[] = [];
    for (let i = 0; i < 5; i++) {
      const material = materials[i % materials.length];
      const sphere = new THREE.Mesh(textGeometry, material);
      sphere.position.set(
        (Math.random() - 0.5) * 10, 
        (Math.random() - 0.5) * 10, 
        (Math.random() - 0.5) * 10
      );
      sphere.scale.setScalar(Math.random() * 0.5 + 0.5);
      group.add(sphere);
      spheres.push(sphere);
    }

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Set camera position
    camera.position.z = 15;

    // Make spheres interactive with mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      group.rotation.y = mouseX * 0.3;
      group.rotation.x = mouseY * 0.3;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);

      // Animate each sphere
      spheres.forEach((sphere, index) => {
        sphere.rotation.x += 0.01 * (index % 3 + 1);
        sphere.rotation.y += 0.01 * (index % 2 + 1);
      });

      group.rotation.y += 0.002;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 z-0 overflow-hidden"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default ThreeCanvas;
