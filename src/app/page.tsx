import dynamic from "next/dynamic";

const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });

export default function Home() {
  return (
    <main>
      <header className="header">
        <h1>Pixel Voxel Boy</h1>
        <p>
          An interactive voxel-inspired 3D character handcrafted with React Three Fiber.
          Drag to orbit, scroll to zoom, and enjoy the retro-future glow.
        </p>
      </header>
      <div className="scene-wrapper">
        <div className="scene-container">
          <Scene />
        </div>
      </div>
      <footer className="footer">
        Crafted autonomously · Powered by Next.js, Three.js, and a touch of neon nostalgia.
      </footer>
    </main>
  );
}
