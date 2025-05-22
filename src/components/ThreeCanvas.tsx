
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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Create a group for all objects
    const group = new THREE.Group();
    scene.add(group);

    // Create geometric objects representing ICONIC's verticals
    const geometries = [
      new THREE.IcosahedronGeometry(1, 0), // Represents ICONIC Infinity Group
      new THREE.OctahedronGeometry(0.8, 0), // Represents Stay More
      new THREE.TetrahedronGeometry(0.7, 0), // Represents OJAS
      new THREE.DodecahedronGeometry(0.9, 0), // Represents Avani
      new THREE.TorusGeometry(0.7, 0.2, 16, 32), // Represents Yatra
      new THREE.SphereGeometry(0.6, 32, 32), // Represents Ohoo Foods
      new THREE.BoxGeometry(0.8, 0.8, 0.8), // Represents Right Homes
    ];
    
    const materials = [
      new THREE.MeshStandardMaterial({ color: 0x0047AB, roughness: 0.2, metalness: 0.8 }), // Blue
      new THREE.MeshStandardMaterial({ color: 0xFFD700, roughness: 0.2, metalness: 0.8 }), // Gold
      new THREE.MeshStandardMaterial({ color: 0x1E293B, roughness: 0.2, metalness: 0.8 }), // Slate
      new THREE.MeshStandardMaterial({ color: 0x4682B4, roughness: 0.2, metalness: 0.8 }), // Steel Blue
      new THREE.MeshStandardMaterial({ color: 0x800080, roughness: 0.2, metalness: 0.8 }), // Purple
      new THREE.MeshStandardMaterial({ color: 0x008080, roughness: 0.2, metalness: 0.8 }), // Teal
      new THREE.MeshStandardMaterial({ color: 0xFF4500, roughness: 0.2, metalness: 0.8 }), // Orange Red
    ];
    
    // Create meshes and position them in 3D space
    const objects: THREE.Mesh[] = [];
    geometries.forEach((geometry, i) => {
      const material = materials[i % materials.length];
      const mesh = new THREE.Mesh(geometry, material);
      
      // Position in a spiral pattern
      const angle = i * 0.8;
      const radius = i * 0.5 + 2;
      mesh.position.x = Math.cos(angle) * radius;
      mesh.position.y = Math.sin(angle * 0.7) * radius * 0.5;
      mesh.position.z = Math.sin(angle) * radius - 5;
      
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      
      group.add(mesh);
      objects.push(mesh);
    });

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Add point lights for dramatic effect
    const pointLight1 = new THREE.PointLight(0x0047AB, 2, 50); // Blue light
    pointLight1.position.set(-10, 5, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xFFD700, 2, 50); // Gold light
    pointLight2.position.set(10, -5, -10);
    scene.add(pointLight2);

    // Set camera position
    camera.position.z = 15;

    // Make scene interactive with mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Subtle movement of the entire group
      group.rotation.y = mouseX * 0.3;
      group.rotation.x = mouseY * 0.2;
      
      // Adjust point light positions for dynamic lighting
      pointLight1.position.x = mouseX * 5;
      pointLight1.position.y = mouseY * 5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Add particles for background effect
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    
    const positions = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 50;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate each object
      objects.forEach((object, index) => {
        object.rotation.x += 0.003 * (index % 2 + 1);
        object.rotation.y += 0.005 * ((index + 1) % 2 + 1);
      });

      // Gentle rotation of the entire group
      group.rotation.y += 0.001;
      
      // Rotate particles slowly
      particles.rotation.y += 0.0002;

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
