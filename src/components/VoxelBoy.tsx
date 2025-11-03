"use client";
import type { GroupProps } from "@react-three/fiber";
import { Instances, Instance } from "@react-three/drei";

type Vec3 = [number, number, number];

type Voxel = {
  position: Vec3;
  color: string;
  scale?: Vec3 | number;
};

const CUBE_SIZE = 0.48;

const palette = {
  skin: "#f3c9a8",
  skinShadow: "#e8b491",
  hair: "#352016",
  hairShadow: "#24130c",
  shirt: "#4263ff",
  shirtShade: "#2f46bf",
  pants: "#1f233a",
  pantsShade: "#151727",
  shoe: "#10111e",
  shoeAccent: "#3c415a",
  eye: "#151217",
  eyeShine: "#f7f7f9",
  blush: "#f69797",
  accent: "#ffc857"
};

const convert = (coords: Vec3): Vec3 => [coords[0] * CUBE_SIZE, coords[1] * CUBE_SIZE, coords[2] * CUBE_SIZE];

const buildVoxelBoy = (): Voxel[] => {
  const voxels: Voxel[] = [];
  const add = (x: number, y: number, z: number, color: string, scale: Voxel["scale"] = 1) => {
    voxels.push({ position: convert([x, y, z]), color, scale });
  };

  // Head core
  const headRange = [-1, 0, 1];
  const headHeights = [8, 9, 10];
  for (const y of headHeights) {
    for (const x of headRange) {
      for (const z of headRange) {
        const isCheek = y === 9 && Math.abs(x) === 1 && z === -1;
        add(x, y, z, isCheek ? palette.skinShadow : palette.skin);
      }
    }
  }

  // Hair cap & fringe
  for (const x of [-1, 0, 1]) {
    for (const z of [-1, 0, 1]) {
      add(x, 11, z, palette.hair);
    }
  }
  // Fringe
  for (const x of [-1, 0, 1]) {
    add(x, 10, -2, palette.hairShadow);
  }
  add(-2, 10, -1, palette.hairShadow);
  add(2, 10, -1, palette.hairShadow);

  // Ears
  add(-2, 9, 0, palette.skinShadow, [0.7, 0.9, 0.7]);
  add(2, 9, 0, palette.skinShadow, [0.7, 0.9, 0.7]);

  // Eyes
  add(-0.6, 9.2, -1.2, palette.eye, [0.3, 0.36, 0.3]);
  add(0.6, 9.2, -1.2, palette.eye, [0.3, 0.36, 0.3]);
  add(-0.2, 9.6, -1.3, palette.eyeShine, [0.15, 0.16, 0.15]);
  add(0.9, 9.6, -1.3, palette.eyeShine, [0.15, 0.16, 0.15]);

  // Blush
  add(-1.6, 8.6, -1.3, palette.blush, [0.38, 0.24, 0.2]);
  add(1.6, 8.6, -1.3, palette.blush, [0.38, 0.24, 0.2]);

  // Neck
  add(0, 7, 0, palette.skinShadow);
  add(0, 7, -1, palette.skinShadow);

  // Torso main block
  for (const y of [4, 5, 6]) {
    for (const x of [-1, 0, 1]) {
      for (const z of [-1, 0, 1]) {
        const isShade = z === 1 || x === -1;
        add(x, y, z, isShade ? palette.shirtShade : palette.shirt);
      }
    }
  }
  // Collar accent
  add(0, 7, -1.2, palette.accent, [0.6, 0.24, 0.3]);
  add(0, 6.6, -1.2, palette.accent, [0.6, 0.24, 0.3]);

  // Arms (voxels attached to torso sides)
  for (const y of [5, 4, 3]) {
    add(-2, y, 0, palette.skin);
    add(-2, y, -1, palette.skinShadow);
    add(2, y, 0, palette.skin);
    add(2, y, -1, palette.skinShadow);
  }
  // Shoulder connection
  add(-2, 6, -0.5, palette.shirtShade, [1, 0.9, 0.9]);
  add(2, 6, -0.5, palette.shirtShade, [1, 0.9, 0.9]);

  // Belt accent
  for (const x of [-1, 0, 1]) {
    add(x, 3, -1, palette.accent, [1, 0.4, 1]);
  }

  // Pants
  for (const y of [2, 1]) {
    for (const x of [-1, 0, 1]) {
      add(x, y, -1, palette.pants);
      add(x, y, 0, palette.pantsShade);
    }
  }

  // Leg front detail for depth
  add(-0.5, 1.5, -1.2, palette.pantsShade, [0.7, 1.1, 0.7]);
  add(0.5, 1.5, -1.2, palette.pantsShade, [0.7, 1.1, 0.7]);

  // Shoes
  for (const x of [-1, 0, 1]) {
    add(x, 0, -1.2, palette.shoe, [1, 0.5, 1]);
    add(x, 0, 0, palette.shoeAccent, [1, 0.5, 1]);
  }
  add(-1.2, 0, -1.4, palette.shoeAccent, [0.6, 0.5, 1.2]);
  add(1.2, 0, -1.4, palette.shoeAccent, [0.6, 0.5, 1.2]);

  return voxels;
};

const voxels = buildVoxelBoy();

export function VoxelBoy(props: GroupProps) {
  return (
    <group {...props} rotation={[0, Math.PI / 8, 0]}>
      <Instances limit={voxels.length} range={voxels.length} castShadow receiveShadow>
        <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
        <meshStandardMaterial roughness={0.45} metalness={0.05} />
        {voxels.map(({ position, color, scale }, index) => (
          <Instance key={index} position={position} color={color} scale={scale ?? 1} />
        ))}
      </Instances>
    </group>
  );
}

export default VoxelBoy;
