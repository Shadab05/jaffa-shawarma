import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export const ThreeDLogo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Create Scene
    const scene = new THREE.Scene();

    const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768;

    // 2. Create Camera (Optimized scale to prevent Y clipping)
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.4);

    // 3. Create WebGL Renderer (optimized for mobile vs desktop)
    const renderer = new THREE.WebGLRenderer({ 
      antialias: !isMobile, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = false; // Disable expensive shadowmaps (floating logo on transparent bg needs no shadowmap)
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    container.appendChild(renderer.domElement);

    // 4. Studio Lighting Rig
    // Warm ambient base
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    // Key Light (Royal Blue accent tint)
    const keyLight = new THREE.DirectionalLight(0xdbeafe, 2.5);
    keyLight.position.set(6, 6, 5);
    scene.add(keyLight);

    // Fill Light (Soft amber/gold tint)
    const fillLight = new THREE.DirectionalLight(0xfef3c7, 1.5);
    fillLight.position.set(-6, -3, 3);
    scene.add(fillLight);

    // Rim Light (Pure blue glow from behind)
    const rimLight = new THREE.DirectionalLight(0x0e5bff, 4.0);
    rimLight.position.set(0, 5, -6);
    scene.add(rimLight);

    // Interactive Point Light (Tracks Mouse Client Position)
    const pointLight = new THREE.PointLight(0x3b82f6, 3.5, 20);
    scene.add(pointLight);

    // 4.5. Add 3D Orbiting Glowing Particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = isMobile ? 60 : 180;
    const positions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);
    const particleRadii = new Float32Array(particleCount);
    const particleYOffsets = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Circular orbit coordinates
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 2.6 + 1.2; // Orbital radius around logo
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 3.2; // Vertical spread
      positions[i * 3 + 2] = Math.sin(angle) * radius;
      
      particleSpeeds[i] = Math.random() * 0.006 + 0.002;
      particleRadii[i] = radius;
      particleYOffsets[i] = positions[i * 3 + 1];
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    // Draw glowing circle particle texture dynamically using HTML5 Canvas
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 16;
    pCanvas.height = 16;
    const pCtx = pCanvas.getContext('2d');
    if (pCtx) {
      const grad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.35, 'rgba(14, 91, 255, 0.75)');
      grad.addColorStop(0.7, 'rgba(59, 130, 246, 0.25)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 16, 16);
    }
    const particleTexture = new THREE.CanvasTexture(pCanvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.12,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.8,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    let logoGroup: THREE.Group | null = null;

    // 5. Load GLB Model
    const loader = new GLTFLoader();
    loader.load(
      'assets/3D logo/base_basic_shaded.glb',
      (gltf) => {
        const model = gltf.scene;

        // Traverse meshes, ensure shadowing
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            
            // Adjust materials slightly for premium WebGL metallic shading
            if (child.material) {
              child.material.side = THREE.DoubleSide;
              if (child.material instanceof THREE.MeshStandardMaterial) {
                child.material.roughness = Math.min(child.material.roughness, 0.3);
                child.material.metalness = Math.max(child.material.metalness, 0.8);
              }
            }
          }
        });

        // Center Model Geometry
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        // Scale Adjustments (Optimized scale to prevent cutoff)
        model.scale.set(1.8, 1.8, 1.8);

        // Add to scene within a rotator group
        const wrapper = new THREE.Group();
        wrapper.add(model);
        scene.add(wrapper);
        logoGroup = wrapper;
      },
      (xhr) => {
        if (xhr.total > 0) {
          setLoadingProgress((xhr.loaded / xhr.total) * 100);
        }
      },
      (error) => {
        console.error('Error loading GLB 3D Jaffa logo:', error);
        setHasError(true);
      }
    );

    // 6. Interactive Mouse & Touch Movements
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onMouseMove = (event: MouseEvent) => {
      mouse.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        mouse.targetX = (touch.clientX / window.innerWidth) * 2 - 1;
        mouse.targetY = -(touch.clientY / window.innerHeight) * 2 + 1;
      }
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchstart', onTouchMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // 7. Scroll Tracking for Rotation
    let scrollPercent = 0;
    const onScroll = () => {
      const h = document.documentElement;
      const b = document.body;
      const st = 'scrollTop';
      const sh = 'scrollHeight';
      scrollPercent = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight);
    };
    window.addEventListener('scroll', onScroll);

    // 8. Animation Render Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth lerp mouse coordinates
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Update cursor point light
      pointLight.position.x = mouse.x * 8;
      pointLight.position.y = mouse.y * 8;
      pointLight.position.z = 4;

      // Orbiting particles logic
      if (particleSystem) {
        const positionsArr = particleSystem.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3;
          const px = positionsArr[idx];
          const pz = positionsArr[idx + 2];
          const speed = particleSpeeds[i];
          const radius = particleRadii[i];
          
          let pAngle = Math.atan2(pz, px);
          pAngle += speed;
          
          positionsArr[idx] = Math.cos(pAngle) * radius;
          positionsArr[idx + 2] = Math.sin(pAngle) * radius;
          positionsArr[idx + 1] = particleYOffsets[i] + Math.sin(elapsedTime * 0.5 + i) * 0.08;
        }
        particleSystem.geometry.attributes.position.needsUpdate = true;
        particleSystem.rotation.y = elapsedTime * 0.03;
      }

      if (logoGroup) {
        // Subtle floating motion
        logoGroup.position.y = Math.sin(elapsedTime * 0.6) * 0.08;
        logoGroup.position.x = Math.cos(elapsedTime * 0.3) * 0.02;

        // Static base: only reacts subtly to mouse hover movements
        logoGroup.rotation.y = mouse.x * 0.5;
        logoGroup.rotation.x = mouse.y * 0.3;
        logoGroup.rotation.z = 0;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Window Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 10. Memory Cleanups
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchstart', onTouchMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      renderer.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      
      if (logoGroup) {
        logoGroup.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => mat.dispose());
            } else if (child.material) {
              child.material.dispose();
            }
          }
        });
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-10">
      <div ref={containerRef} className="w-full h-full" />
      
      {/* 3D Progress Loader */}
      {loadingProgress < 100 && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-luxury-bg-ivory/40 backdrop-blur-sm transition-opacity duration-500">
          <div className="text-center">
            <div className="w-10 h-10 border-2 border-luxury-accent-blue border-t-transparent rounded-full animate-spin mb-3 mx-auto" />
            <div className="font-inter text-[10px] tracking-widest text-luxury-accent-blue uppercase font-bold">
              Rendering WebGL... {Math.round(loadingProgress)}%
            </div>
          </div>
        </div>
      )}

      {/* Fail fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center bg-white/80 border border-zinc-200/50 p-6 rounded-2xl shadow-xl max-w-sm pointer-events-auto">
            <h3 className="font-editorial text-lg text-luxury-text-black uppercase tracking-wider mb-2">
              JAFFA 3D BRAND
            </h3>
            <p className="font-inter text-xs text-zinc-500 leading-relaxed">
              Interactive WebGL renderer failed. Experience is running in standard hardware acceleration mode.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreeDLogo;
