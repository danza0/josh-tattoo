"use client";

/**
 * StatueModel — thin wrapper that defers ALL R3F code to the client.
 * StatueCanvas (which contains Canvas, useThree, useGLTF, etc.) is loaded
 * exclusively via next/dynamic with ssr: false, so the R3F module graph is
 * never evaluated during SSR and cannot trigger React context conflicts.
 */

import dynamic from "next/dynamic";
import React from "react";

export interface StatueModelProps {
  autoRotate?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const StatueCanvas = dynamic(() => import("./StatueCanvas"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#1a1815",
        borderRadius: "50%",
      }}
    />
  ),
});

export default function StatueModel({
  autoRotate = false,
  className,
  style,
}: StatueModelProps) {
  return (
    <StatueCanvas autoRotate={autoRotate} className={className} style={style} />
  );
}


