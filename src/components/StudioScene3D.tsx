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

      const cameraRig = new THREE.Group();
      root.add(cameraRig);

      const cameraBody = new THREE.Mesh(new THREE.BoxGeometry(2.35, 1.38, 0.95), baseMaterial);
      cameraBody.position.set(-0.2, 0.15, 0);
      cameraRig.add(cameraBody);

      const bodyFace = new THREE.Mesh(new THREE.BoxGeometry(2.12, 1.12, 0.035), paleMaterial);
      bodyFace.position.set(-0.2, 0.15, 0.49);
      cameraRig.add(bodyFace);

      const viewfinder = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.46, 0.62), baseMaterial);
      viewfinder.position.set(-0.7, 1.08, -0.1);
      viewfinder.rotation.z = -0.06;
      cameraRig.add(viewfinder);

      const handle = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.18, 0.22), yellowMaterial);
      handle.position.set(-0.55, 1.52, -0.02);
      cameraRig.add(handle);

      const lensGroup = new THREE.Group();
      lensGroup.position.set(0.95, 0.14, 0.7);
      cameraRig.add(lensGroup);

      const rearLens = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.78, 0.72, 48), baseMaterial);
      rearLens.rotation.x = Math.PI / 2;
      rearLens.position.z = 0.18;
      lensGroup.add(rearLens);

      const frontLens = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.64, 0.82, 48), paleMaterial);
      frontLens.rotation.x = Math.PI / 2;
      frontLens.position.z = 0.85;
      lensGroup.add(frontLens);

      const glassMaterial = new THREE.MeshStandardMaterial({ color: palette.ink, metalness: 0.2, roughness: 0.12, transparent: true, opacity: 0.88 });
      const glass = new THREE.Mesh(
        new THREE.CylinderGeometry(0.43, 0.43, 0.035, 48),
        glassMaterial
      );
      glass.rotation.x = Math.PI / 2;
      glass.position.z = 1.29;
      lensGroup.add(glass);

      const focusRing = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.025, 12, 72), yellowMaterial);
      focusRing.position.z = 0.52;
      lensGroup.add(focusRing);

      const apertureRing = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.012, 12, 72), wireMaterial);
      apertureRing.position.z = 1.32;
      lensGroup.add(apertureRing);

      const railGroup = new THREE.Group();
      railGroup.position.set(0.1, -0.95, 0.15);
      cameraRig.add(railGroup);

      for (let i = 0; i < 2; i += 1) {
        const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 3.7, 24), paleMaterial);
        rail.rotation.z = Math.PI / 2;
        rail.position.y = i === 0 ? -0.12 : 0.12;
        railGroup.add(rail);
      }

      const matteBox = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.9, 0.12), baseMaterial);
      matteBox.position.set(0.95, 0.14, 2.15);
      matteBox.rotation.z = 0.03;
      cameraRig.add(matteBox);

      const slate = new THREE.Group();
      slate.position.set(-2.25, -0.5, 0.45);
      slate.rotation.z = -0.18;
      cameraRig.add(slate);

      const slateBody = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.68, 0.045), paleMaterial);
      const slateTop = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.12, 0.055), yellowMaterial);
      slateTop.position.y = 0.4;
      slate.add(slateBody, slateTop);

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
        const x = -3.2 + (i / 63) * 6.4;
        linePoints.push(new THREE.Vector3(x, Math.sin(i * 0.35) * 0.18 - 2.35, Math.cos(i * 0.25) * 0.22));
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
        cameraRig.rotation.y = Math.sin(t * 0.32) * 0.18;
        cameraRig.rotation.x = Math.sin(t * 0.24) * 0.05;
        lensGroup.rotation.z = Math.sin(t * 0.7) * 0.04;
        focusRing.rotation.z = t * 0.75;
        apertureRing.rotation.z = -t * 0.45;
        slate.rotation.z = -0.18 + Math.sin(t * 0.9) * 0.05;
        frameGroup.rotation.y = t * 0.18;
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
        [baseMaterial, yellowMaterial, paleMaterial, lineMaterial, wireMaterial, glassMaterial].forEach(material => material.dispose());
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
