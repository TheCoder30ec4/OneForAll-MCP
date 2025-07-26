import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "./src"),
    },
  },
  optimizeDeps: {
    include: [
      'react-dom/client',
      'react-router-dom',
      '@radix-ui/react-slot',
      '@radix-ui/react-menubar',
      'class-variance-authority',
      'lucide-react',
      'clsx',
      'tailwind-merge',
    ],
  },
})
