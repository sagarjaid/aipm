/** @format */

'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { gsap } from 'gsap';

export default function ParticleHead() {
  const mountRef = useRef<HTMLDivElement>(null);

  // Constants instead of state
  const PARTICLE_CONFIG = {
    multiplier: 0.5,
    velocity: 0,
    size: 0.1,
    color: '#636363',
    width: 320,
    height: 320,
    zoom: 400,
    mouseSpeed: 0.01,
  };

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;

    const camera = new THREE.PerspectiveCamera(
      35,
      PARTICLE_CONFIG.width / PARTICLE_CONFIG.height,
      1,
      2000
    );
    camera.position.z = PARTICLE_CONFIG.zoom;

    const scene = new THREE.Scene();
    const positions: number[] = [];
    const velocities: number[] = [];
    const origins: number[] = [];
    const colors: number[] = [];

    const colorA = new THREE.Color(PARTICLE_CONFIG.color);
    const colorB = new THREE.Color('#9fc5e8');
    const colorC = new THREE.Color('#ea9999');

    const loader = new OBJLoader();

    loader.load(
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/40480/head.obj',
      function (object) {
        object.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            const scale = 8;
            const geometry = child.geometry;
            geometry.computeBoundingBox();
            geometry.computeVertexNormals();

            const positionAttribute = geometry.getAttribute('position');
            for (let i = 0; i < positionAttribute.count; i++) {
              const baseX = positionAttribute.getX(i) * scale;
              const baseY = positionAttribute.getY(i) * scale;
              const baseZ = positionAttribute.getZ(i) * scale;

              const count = Math.max(
                1,
                Math.round(PARTICLE_CONFIG.multiplier * 2)
              );
              for (let j = 0; j < count; j++) {
                const offsetX = (Math.random() - 0.5) * 5;
                const offsetY = (Math.random() - 0.5) * 5;
                const offsetZ = (Math.random() - 0.5) * 5;
                positions.push(
                  baseX + offsetX,
                  baseY + offsetY,
                  baseZ + offsetZ
                );
                origins.push(baseX + offsetX, baseY + offsetY, baseZ + offsetZ);
                velocities.push(
                  (Math.random() - 0.5) * PARTICLE_CONFIG.velocity,
                  (Math.random() - 0.5) * PARTICLE_CONFIG.velocity,
                  (Math.random() - 0.5) * PARTICLE_CONFIG.velocity
                );

                const colorChoice = j % 3;
                if (colorChoice === 0) {
                  colors.push(colorA.r, colorA.g, colorA.b);
                } else if (colorChoice === 1) {
                  colors.push(colorB.r, colorB.g, colorB.b);
                } else {
                  colors.push(colorC.r, colorC.g, colorC.b);
                }
              }
            }
          }
        });

        const p_geom = new THREE.BufferGeometry();
        p_geom.setAttribute(
          'position',
          new THREE.Float32BufferAttribute(positions, 3)
        );
        p_geom.setAttribute(
          'color',
          new THREE.Float32BufferAttribute(colors, 3)
        );

        const p_material = new THREE.PointsMaterial({
          size: PARTICLE_CONFIG.size,
          vertexColors: true,
        });

        const particles = new THREE.Points(p_geom, p_material);
        scene.add(particles);

        const positionAttr = p_geom.getAttribute(
          'position'
        ) as THREE.BufferAttribute;
        const positionArray = positionAttr.array as Float32Array;

        const animateParticles = () => {
          for (let i = 0; i < positionAttr.count; i++) {
            const idx = i * 3;
            velocities[idx] += (Math.random() - 0.5) * 0.001;
            velocities[idx + 1] += (Math.random() - 0.5) * 0.001;
            velocities[idx + 2] += (Math.random() - 0.5) * 0.001;

            const dx = origins[idx] - positionArray[idx];
            const dy = origins[idx + 1] - positionArray[idx + 1];
            const dz = origins[idx + 2] - positionArray[idx + 2];

            velocities[idx] += dx * 0.001;
            velocities[idx + 1] += dy * 0.001;
            velocities[idx + 2] += dz * 0.001;

            velocities[idx] *= 0.95;
            velocities[idx + 1] *= 0.95;
            velocities[idx + 2] *= 0.95;

            positionArray[idx] += velocities[idx];
            positionArray[idx + 1] += velocities[idx + 1];
            positionArray[idx + 2] += velocities[idx + 2];
          }
          positionAttr.needsUpdate = true;
        };

        const animate = () => {
          animateParticles();
          render();
        };

        gsap.ticker.add(animate);
      }
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(PARTICLE_CONFIG.width, PARTICLE_CONFIG.height);
    renderer.setClearColor(0xffffff, 0);
    mountRef.current?.appendChild(renderer.domElement);

    function onDocumentMouseMove(event: MouseEvent) {
      const bounds = mountRef.current?.getBoundingClientRect();
      if (!bounds) return;
      mouseX = (event.clientX - bounds.left - PARTICLE_CONFIG.width / 2) / 2;
      mouseY = (event.clientY - bounds.top - PARTICLE_CONFIG.height / 2) / 2;
    }

    function render() {
      camera.position.x +=
        (-mouseX * 0.5 - camera.position.x) * PARTICLE_CONFIG.mouseSpeed;
      camera.position.y +=
        (mouseY * 0.5 - camera.position.y) * PARTICLE_CONFIG.mouseSpeed;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    }

    window.addEventListener('mousemove', onDocumentMouseMove);

    return () => {
      window.removeEventListener('mousemove', onDocumentMouseMove);
      gsap.ticker.remove(render);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: PARTICLE_CONFIG.width, height: PARTICLE_CONFIG.height }}
    />
  );
}
