import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Client-only: force all React-related imports to a single instance so
      // React Three Fiber's reconciler matches the app's React context.
      config.resolve.alias = {
        ...config.resolve.alias,
        react: path.resolve(__dirname, "node_modules/react"),
        "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
        "react/jsx-runtime": path.resolve(__dirname, "node_modules/react/jsx-runtime"),
        "react/jsx-dev-runtime": path.resolve(__dirname, "node_modules/react/jsx-dev-runtime"),
        "react-dom/server": path.resolve(__dirname, "node_modules/react-dom/server"),
        "react-reconciler": path.resolve(__dirname, "node_modules/react-reconciler"),
        scheduler: path.resolve(__dirname, "node_modules/scheduler"),
        three: path.resolve(__dirname, "node_modules/three"),
      };
    } else {
      // Server-only: only deduplicate three.js.
      // Do NOT alias react/react-dom here — Next.js's server runtime requires
      // its own compiled copies of React (which include server-side APIs like
      // ReactDOM.preload). Overriding them causes build failures.
      config.resolve.alias = {
        ...config.resolve.alias,
        three: path.resolve(__dirname, "node_modules/three"),
      };
    }
    return config;
  },
};

export default nextConfig;
