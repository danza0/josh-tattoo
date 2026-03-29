"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * CanvasErrorBoundary — wraps any React Three Fiber Canvas.
 * If Three.js or WebGL throws (missing WebGL, bad model, version mismatch, etc.)
 * the rest of the page still renders; the 3D slot shows the original dark
 * placeholder silhouette instead.
 */
export default class CanvasErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error("[CanvasErrorBoundary] 3D canvas failed:", error, info);
  }

  render() {
    if (this.state.hasError) {
      // Original dark placeholder silhouette — same look as before 3D was added
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            background:
              "radial-gradient(ellipse at 50% 60%, #2a2520 0%, #1a1815 60%, transparent 100%)",
            borderRadius: "50% 50% 48% 52% / 60% 60% 40% 40%",
          }}
        />
      );
    }

    return this.props.children;
  }
}
