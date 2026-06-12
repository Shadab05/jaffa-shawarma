import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface Navbar3DLogoProps {
  variant?: 'navbar' | 'footer';
}

export const Navbar3DLogo: React.FC<Navbar3DLogoProps> = ({ variant = 'navbar' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Set dynamic dimensions and scales based on variant
    const isNavbar = variant === 'navbar';
    const width = isNavbar ? 240 : 340;
    const height = isNavbar ? 75 : 105;
    const modelScale = isNavbar ? 1.5 : 2.1;
    const cameraY = isNavbar ? 0.1 : 0.12;
    const cameraZ = isNavbar ? 4.4 : 4.6;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 50);
    camera.position.set(0, cameraY, cameraZ);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xdbeafe, 2.8);
    keyLight.position.set(3, 3, 3);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x0e5bff, 4.2);
    rimLight.position.set(0, 3, -3);
    scene.add(rimLight);

    let logo: THREE.Group | null = null;

    // Load Model
    const loader = new GLTFLoader();
    loader.load(
      'assets/3D logo/base_basic_shaded.glb',
      (gltf) => {
        const model = gltf.scene;
        
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = false;
            child.receiveShadow = false;
            if (child.material && child.material instanceof THREE.MeshStandardMaterial) {
              child.material.roughness = 0.25;
              child.material.metalness = 0.85;
            }
          }
        });

        // Center Model Geometry
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        // Scaled model scale to fill canvas size
        model.scale.set(modelScale, modelScale, modelScale);

        scene.add(model);
        logo = model;
      },
      undefined,
      (error) => {
        console.warn('Navbar mini GLB load failed:', error);
      }
    );

    // Mouse & Touch sway tracking
    const mouse = { x: 0, targetX: 0 };
    const onMouseMove = (event: MouseEvent) => {
      mouse.targetX = (event.clientX / window.innerWidth) * 2 - 1;
    };
    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        mouse.targetX = (touch.clientX / window.innerWidth) * 2 - 1;
      }
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchstart', onTouchMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth sway
      mouse.x += (mouse.targetX - mouse.x) * 0.05;

      if (logo) {
        logo.rotation.y = mouse.x * 0.4;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchstart', onTouchMove);
      window.removeEventListener('touchmove', onTouchMove);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      
      if (logo) {
        logo.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach((mat) => mat.dispose());
              } else {
                child.material.dispose();
              }
            }
          }
        });
      }
    };
  }, [variant]);

  const isNavbar = variant === 'navbar';

  return (
    <div className="flex flex-col items-center justify-center pointer-events-none select-none">
      {/* 3D Model View container */}
      <div 
        ref={containerRef} 
        style={{ width: isNavbar ? '240px' : '340px', height: isNavbar ? '75px' : '105px' }}
        className="flex items-center justify-center overflow-hidden" 
      />
      
      {/* SHAWARMA Logo Subtext */}
      <span className={`font-inter text-[#0E5BFF] font-extrabold uppercase leading-none ${
        isNavbar ? 'text-[11px] tracking-[0.45em] mt-1' : 'text-[14px] tracking-[0.55em] mt-3'
      }`}>
        SHAWARMA
      </span>
    </div>
  );
};

export default Navbar3DLogo;
