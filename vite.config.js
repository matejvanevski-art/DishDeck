import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repositoryName = 'PROJECT';

export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS === 'true' ? `/${repositoryName}/` : '/',
});
