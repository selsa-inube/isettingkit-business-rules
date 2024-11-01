// vite.config.ts
import { resolve } from "path";
import { defineConfig } from "file:///home/digger/Documents/inube/frontEnd/react/isettingkit-business-rules/node_modules/vite/dist/node/index.js";
import react from "file:///home/digger/Documents/inube/frontEnd/react/isettingkit-business-rules/node_modules/@vitejs/plugin-react/dist/index.mjs";
import dst from "file:///home/digger/Documents/inube/frontEnd/react/isettingkit-business-rules/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname =
  "/home/digger/Documents/inube/frontEnd/react/isettingkit-business-rules";
var vite_config_default = defineConfig({
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      formats: ["es"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "styled-components",
        "react-icons/md",
        "formik",
        "yup",
        "@inubekit/button",
        "@inubekit/checkbox",
        "@inubekit/divider",
        "@inubekit/date",
        "@inubekit/foundations",
        "@inubekit/grid",
        "@inubekit/icon",
        "@inubekit/input",
        "@inubekit/stack",
        "@inubekit/text",
        "@inubekit/textarea",
        "@inubekit/toggle",
        "@isettingkit/input",
        "@isettingkit/view",
      ],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
  plugins: [react(), dst({ rollupTypes: true })],
});
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9kaWdnZXIvRG9jdW1lbnRzL2ludWJlL2Zyb250RW5kL3JlYWN0L2lzZXR0aW5na2l0LWJ1c2luZXNzLXJ1bGVzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9kaWdnZXIvRG9jdW1lbnRzL2ludWJlL2Zyb250RW5kL3JlYWN0L2lzZXR0aW5na2l0LWJ1c2luZXNzLXJ1bGVzL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2RpZ2dlci9Eb2N1bWVudHMvaW51YmUvZnJvbnRFbmQvcmVhY3QvaXNldHRpbmdraXQtYnVzaW5lc3MtcnVsZXMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgZHN0IGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGJ1aWxkOiB7XG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL2luZGV4LnRzXCIpLFxuICAgICAgZm9ybWF0czogW1wiZXNcIl0sXG4gICAgICBmaWxlTmFtZTogKGZvcm1hdCkgPT4gYGluZGV4LiR7Zm9ybWF0fS5qc2AsXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogW1xuICAgICAgICBcInJlYWN0XCIsXG4gICAgICAgIFwicmVhY3QtZG9tXCIsXG4gICAgICAgIFwicmVhY3QvanN4LXJ1bnRpbWVcIixcbiAgICAgICAgXCJzdHlsZWQtY29tcG9uZW50c1wiLFxuICAgICAgICBcInJlYWN0LWljb25zL21kXCIsXG4gICAgICAgIFwiZm9ybWlrXCIsXG4gICAgICAgIFwieXVwXCIsXG4gICAgICAgIFwiQGludWJla2l0L2J1dHRvblwiLFxuICAgICAgICBcIkBpbnViZWtpdC9jaGVja2JveFwiLFxuICAgICAgICBcIkBpbnViZWtpdC9kaXZpZGVyXCIsXG4gICAgICAgIFwiQGludWJla2l0L2RhdGVcIixcbiAgICAgICAgXCJAaW51YmVraXQvZm91bmRhdGlvbnNcIixcbiAgICAgICAgXCJAaW51YmVraXQvZ3JpZFwiLFxuICAgICAgICBcIkBpbnViZWtpdC9pY29uXCIsXG4gICAgICAgIFwiQGludWJla2l0L2lucHV0XCIsXG4gICAgICAgIFwiQGludWJla2l0L3N0YWNrXCIsXG4gICAgICAgIFwiQGludWJla2l0L3RleHRcIixcbiAgICAgICAgXCJAaW51YmVraXQvdGV4dGFyZWFcIixcbiAgICAgICAgXCJAaW51YmVraXQvdG9nZ2xlXCIsXG4gICAgICAgIFwiQGlzZXR0aW5na2l0L2lucHV0XCIsXG4gICAgICAgIFwiQGlzZXR0aW5na2l0L3ZpZXdcIixcbiAgICAgIF0sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgIHJlYWN0OiBcIlJlYWN0XCIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtyZWFjdCgpLCBkc3QoeyByb2xsdXBUeXBlczogdHJ1ZSB9KV0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1ksU0FBUyxlQUFlO0FBQzVaLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sV0FBVztBQUNsQixPQUFPLFNBQVM7QUFIaEIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsT0FBTztBQUFBLElBQ0wsS0FBSztBQUFBLE1BQ0gsT0FBTyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxNQUN4QyxTQUFTLENBQUMsSUFBSTtBQUFBLE1BQ2QsVUFBVSxDQUFDLFdBQVcsU0FBUyxNQUFNO0FBQUEsSUFDdkM7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFVBQVU7QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixTQUFTO0FBQUEsVUFDUCxPQUFPO0FBQUEsUUFDVDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLEVBQUUsYUFBYSxLQUFLLENBQUMsQ0FBQztBQUMvQyxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
