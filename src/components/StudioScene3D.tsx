import React, { useEffect, useRef } from 'react';

interface StudioScene3DProps {
  className?: string;
  activeTone?: string;
}

const palette = {
  ink: '#0A0A0A',
  yellow: '#FFD600',
  surface: '#F7F7F7',
  border: '#E5E5E5',
  muted: '#888888',
  white: '#FFFFFF',
};

export default function StudioScene3D({ className = '', activeTone = 'precision' }: StudioScene3DProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const setup = async () => {
      const THREE = await import('three');
      if (cancelled || !mountRef.current) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
      camera.position.set(0, 1.15, 8.2);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
      mount.appendChild(renderer.domElement);

      const root = new THREE.Group();
      scene.add(root);

      const key = new THREE.DirectionalLight(palette.white, 2.5);
      key.position.set(3, 5, 6);
      scene.add(key);
      scene.add(new THREE.AmbientLight(palette.white, 1.7));

      const baseMaterial = new THREE.MeshStandardMaterial({
        color: palette.ink,
        metalness: 0.55,
        roughness: 0.28,
      });
      const yellowMaterial = new THREE.MeshStandardMaterial({
        color: palette.yellow,
        metalness: 0.28,
        roughness: 0.32,
      });
      const paleMaterial = new THREE.MeshStandardMaterial({
        color: palette.surface,
        metalness: 0.12,
        roughness: 0.5,
      });
      const lineMaterial = new THREE.LineBasicMaterial({ color: palette.muted, transparent: true, opacity: 0.36 });
      const wireMaterial = new THREE.LineBasicMaterial({ color: palette.white, transparent: true, opacity: 0.22 });

      const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.15, 1), baseMaterial);
      root.add(core);

      const coreWire = new THREE.LineSegments(
        new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.18, 1)),
        wireMaterial
      );
      root.add(coreWire);

      const ringGroup = new THREE.Group();
      root.add(ringGroup);

      for (let i = 0; i < 3; i += 1) {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(1.85 + i * 0.52, 0.012, 12, 96),
          i === 1 ? yellowMaterial : paleMaterial
        );
        ring.rotation.x = Math.PI / 2 + i * 0.38;
        ring.rotation.y = i * 0.28;
        ringGroup.add(ring);
      }

      const timeline = new THREE.Group();
      timeline.position.set(0, -1.95, 0);
      root.add(timeline);

      for (let i = 0; i < 9; i += 1) {
        const width = i % 3 === 0 ? 0.72 : 0.46;
        const block = new THREE.Mesh(
          new THREE.BoxGeometry(width, 0.12 + (i % 4) * 0.055, 0.28),
          i === 4 ? yellowMaterial : paleMaterial
        );
        block.position.set((i - 4) * 0.58, Math.sin(i) * 0.05, 0);
        block.rotation.z = (i - 4) * 0.025;
        timeline.add(block);
      }

      const frameGroup = new THREE.Group();
      root.add(frameGroup);

      for (let i = 0; i < 8; i += 1) {
        const frame = new THREE.Group();
        const angle = (i / 8) * Math.PI * 2;
        const radius = 3.1;
        frame.position.set(Math.cos(angle) * radius, Math.sin(angle * 0.8) * 1.05, Math.sin(angle) * radius * 0.55);
        frame.lookAt(0, 0, 0);

        const slab = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.48, 0.035), paleMaterial);
        const strip = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.5, 0.045), i % 2 === 0 ? yellowMaterial : baseMaterial);
        strip.position.x = -0.37;
        frame.add(slab, strip);
        frameGroup.add(frame);
      }

      const linePoints = [];
      for (let i = 0; i < 64; i += 1) {
        const angle = (i / 63) * Math.PI * 2;
        linePoints.push(new THREE.Vector3(Math.cos(angle) * 3.9, Math.sin(angle * 2) * 0.3, Math.sin(angle) * 1.8));
      }
      root.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(linePoints), lineMaterial));

      const toneOffsets: Record<string, number> = {
        precision: 0,
        soft: 0.45,
        premium: 0.9,
        documentary: 1.35,
      };
      const toneOffset = toneOffsets[activeTone] ?? 0;

      const resize = () => {
        const width = Math.max(1, mount.clientWidth);
        const height = Math.max(1, mount.clientHeight);
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      let frameId = 0;
      const clock = new THREE.Clock();
      const animate = () => {
        const t = clock.getElapsedTime() + toneOffset;
        root.rotation.y = Math.sin(t * 0.18) * 0.22;
        root.rotation.x = Math.sin(t * 0.12) * 0.08;
        core.rotation.x = t * 0.42;
        core.rotation.y = t * 0.32;
        coreWire.rotation.x = -t * 0.24;
        coreWire.rotation.y = t * 0.2;
        ringGroup.rotation.z = t * 0.18;
        frameGroup.rotation.y = t * 0.24;
        timeline.children.forEach((child, i) => {
          child.position.y = -0.02 + Math.sin(t * 1.5 + i * 0.7) * 0.08;
        });
        renderer.render(scene, camera);
        frameId = window.requestAnimationFrame(animate);
      };

      resize();
      animate();
      window.addEventListener('resize', resize);

      cleanup = () => {
        window.cancelAnimationFrame(frameId);
        window.removeEventListener('resize', resize);
        if (renderer.domElement.parentNode === mount) {
          mount.removeChild(renderer.domElement);
        }
        renderer.dispose();
        scene.traverse(obj => {
          const mesh = obj as { geometry?: { dispose?: () => void } };
          mesh.geometry?.dispose?.();
        });
        [baseMaterial, yellowMaterial, paleMaterial, lineMaterial, wireMaterial].forEach(material => material.dispose());
      };
    };

    setup();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [activeTone]);

  return <div ref={mountRef} className={className} aria-label="Animated 3D post-production studio scene" />;
}
