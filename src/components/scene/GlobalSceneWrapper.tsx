"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const CinematicScene = dynamic(() => import("./CinematicScene"), { 
  ssr: false});

export default function GlobalSceneWrapper() {
  const pathname = usePathname();

  // Disable entirely on the admin dashboard for performance
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  // Only show the interactive graph on the overview page
  const showGraph = pathname === "/" || pathname === "/overview";

  return <CinematicScene showGraph={showGraph} />;
}
