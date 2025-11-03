"use client";

import { Suspense, useLayoutEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, ContactShadows, Float, Sparkles } from "@react-three/drei";
import {
  AmbientLight,
  Color,
  DirectionalLight,
  Fog,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  SpotLight
} from "three";
import VoxelBoy from "./VoxelBoy";

function SceneEnvironment() {
  const { scene } = useThree();

  useLayoutEffect(() => {
    const background = new Color("#060711");
    const fog = new Fog("#060711", 12, 30);
    scene.background = background;
    scene.fog = fog;

    return () => {
      scene.background = null;
      scene.fog = null;
    };
  }, [scene]);

  return null;
}

function LightRig() {
  const { scene } = useThree();

  useLayoutEffect(() => {
    const ambient = new AmbientLight(0xffffff, 0.5);

    const keyLight = new DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(6, 12, 8);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(2048, 2048);

    const rimLight = new SpotLight(0xffffff, 1);
    rimLight.position.set(-6, 9, -4);
    rimLight.angle = Math.PI / 4.4;
    rimLight.penumbra = 0.45;
    rimLight.castShadow = true;

    scene.add(ambient, keyLight, rimLight);

    return () => {
      scene.remove(ambient);
      scene.remove(keyLight);
      scene.remove(rimLight);
      ambient.dispose();
      keyLight.dispose();
      rimLight.dispose();
    };
  }, [scene]);

  return null;
}

function GroundPlane() {
  const { scene } = useThree();

  useLayoutEffect(() => {
    const geometry = new PlaneGeometry(30, 30);
    const material = new MeshStandardMaterial({ color: "#0b0e1d", roughness: 1, metalness: 0 });
    const mesh = new Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    mesh.position.set(0, -0.01, 0);
    scene.add(mesh);

    return () => {
      scene.remove(mesh);
      geometry.dispose();
      material.dispose();
    };
  }, [scene]);

  return null;
}

export default function Scene() {
  return (
    <Canvas
      shadows
      gl={{ antialias: true, preserveDrawingBuffer: true }}
      camera={{ position: [6, 6.5, 9], fov: 35, near: 0.1, far: 50 }}
    >
      <SceneEnvironment />
      <LightRig />
      <GroundPlane />

      <Suspense fallback={null}>
        <Float
          speed={1.6}
          rotationIntensity={0.3}
          floatIntensity={0.8}
          floatingRange={[0.1, 0.4]}
        >
          <VoxelBoy position={[0, 0, 0]} />
        </Float>
        <Environment preset="dawn" />
        <Sparkles count={80} size={2} speed={0.2} opacity={0.3} color="#7c9bff" scale={[10, 6, 10]} />
      </Suspense>

      <ContactShadows position={[0, -0.01, 0]} scale={12} opacity={0.35} blur={2.5} far={9} />

      <OrbitControls
        enableDamping
        dampingFactor={0.1}
        target={[0, 4.2, 0]}
        minDistance={6}
        maxDistance={14}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(3 * Math.PI) / 5}
        makeDefault
      />
    </Canvas>
  );
}
