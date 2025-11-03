import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Voxel Boy | Agentic Scene",
  description: "Pixelated 3D boy rendered with React Three Fiber and Next.js",
  metadataBase: new URL("https://agentic-df572e89.vercel.app")
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
