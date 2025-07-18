import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig((props) => {
  const env = loadEnv(props.mode, process.cwd(), "VITE_APP");
  const envWithProcessPrefix = {
    "process.env": `${JSON.stringify(env)}`,
  };
  return {
    plugins: [
      react({}),
      viteTsconfigPaths(),
      // visualizer({
      //   open: false, // при true после build откроется окно с отчётом о bundle
      // }),
    ],
    test: {
      environment: "jsdom",
      setupFiles: ["./src/tests/setup.ts"],
      testMatch: ["./src/**/*.test.tsx"],
      globals: true,
    },
    define: envWithProcessPrefix,
    build: {
      outDir: "build",
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler", // or "modern"
        },
      },
    },

    optimizeDeps: {
      include: ["linked-dep"],
    },
  };
});
