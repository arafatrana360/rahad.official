
import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.VITE_API_KEY || process.env.API_KEY || ''),
    'process.env.ADMIN_PASSWORD': JSON.stringify(process.env.VITE_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || 'rahad2026')
  },
  server: {
    port: 5173,
    open: true
  }
});
