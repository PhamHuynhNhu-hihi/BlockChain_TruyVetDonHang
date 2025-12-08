import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Cấu hình Vite cho React
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true, // Tự động mở trình duyệt khi chạy
    proxy: {
      // Proxy API requests đến backend
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
