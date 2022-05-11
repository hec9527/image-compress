import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        host: '0.0.0.0',
    },
    build: {
        lib: {
            entry: '/src/index.ts',
            fileName: 'index',
            formats: ['cjs', 'es', 'umd', 'iife'],
            name: 'compressImage',
        },
    },
});
