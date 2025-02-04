import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    allowedHosts: [
      'fa3d-2409-40e3-102f-749b-2c2f-ce04-33f9-2c05.ngrok-free.app',
      'eb5f-2409-40e3-102f-749b-2c2f-ce04-33f9-2c05.ngrok-free.app',
      'localhost',  // Optional: Add other allowed hosts here as needed
    ],
  },
});
