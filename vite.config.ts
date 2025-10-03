import path, { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dst from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react-router-dom",
        "react/jsx-runtime",
        "styled-components",
        "react-icons/md",
        "formik",
        "yup",
        "@inubekit/inubekit",
        "@isettingkit/input",
        "@isettingkit/view",
        "@formkit/drag-and-drop",
        "axios",
        "franc-min",
      ],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
  plugins: [react(), dst({ rollupTypes: true })],
    resolve: {
      alias: {
        "@src": path.resolve(__dirname, "./src"),
        "@types": path.resolve(__dirname, "./src/types"),
        "@core": path.resolve(__dirname, "./src/core"),
        "@enum": path.resolve(__dirname, "./src/enum"),
        "@design": path.resolve(__dirname, "./src/design"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@config": path.resolve(__dirname, "./src/config"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
        "@mocks": path.resolve(__dirname, "./src/mocks"),
        "@ptypes": path.resolve(__dirname, "./src/types"),
        "@forms": path.resolve(__dirname, "./src/forms"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@services": path.resolve(__dirname, "./src/services"),
        "@utils": path.resolve(__dirname, "./src/utils"),
        "@api": path.resolve(__dirname, "./src/api"),
        "@context": path.resolve(__dirname, "./src/context"),
        "@validations": path.resolve(__dirname, "./src/validations"),
        "@routes": path.resolve(__dirname, "./src/routes"),
        "@events": path.resolve(__dirname, "./src/events"),
      },
    },
});
