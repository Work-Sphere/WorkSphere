// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       // User Auth + Location Service
//       '/api/auth': {
//         target: 'https://localhost:7239',
//         changeOrigin: true,
//         secure: false
//       },
//       '/api/location': {
//         target: 'https://localhost:7239',
//         changeOrigin: true,
//         secure: false
//       },

//       // Admin Services API
//       '/api/admin': {
//         target: 'https://localhost:7133',
//         changeOrigin: true,
//         secure: false
//       },
//       '/api/services': {
//         target: 'https://localhost:7133',
//         changeOrigin: true,
//         secure: false
//       }
//     }
//   }
// })


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // ===============================
      // USER AUTH + LOCATION (.NET)
      // ===============================
      "/api/auth": {
        target: "https://localhost:7239",
        changeOrigin: true,
        secure: false,
      },
      "/api/location": {
        target: "https://localhost:7239",
        changeOrigin: true,
        secure: false,
      },

      // ===============================
      // ADMIN SERVICE (.NET)
      // ===============================
      "/api/admin": {
        target: "https://localhost:7133",
        changeOrigin: true,
        secure: false,
      },

      // ===============================
      // FREELANCER SERVICE (SPRING)
      // ===============================
      "/api/freelancer": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },

      // ===============================
      // CLIENT SERVICE (SPRING)
      // ===============================
      "/api/client": {
        target: "http://localhost:8082",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
