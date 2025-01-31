import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    allowedHosts: [
      'f520-103-89-57-218.ngrok-free.app',
      '9d18-103-89-57-218.ngrok-free.app',
      'localhost',  // Optional: Add other allowed hosts here as needed
    ],
  },
});
