import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repositoryName = 'DishDeck';

export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS === 'true' ? `/${repositoryName}/` : '/',
});
