import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
	server: {
		host: '127.0.0.1',
	},
	plugins: [react()],
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: './viteTestSetup.js',
	},
	build: {
		outDir: '../dist',
		emptyOutDir: true
	}
})
