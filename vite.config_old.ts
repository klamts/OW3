import path from 'path';
import fs from 'fs';
import { defineConfig, loadEnv } from 'vite';
import dotenv from 'dotenv';

// === Load .env.port ===
const envPortPath = path.resolve(__dirname, './.env.port');
if (fs.existsSync(envPortPath)) {
  dotenv.config({ path: envPortPath });
} else {
  console.warn('.env.port not found, using defaults.');
}

// === Load .env.ip ===
const envIPPath = path.resolve(__dirname, './.env.ip');
if (fs.existsSync(envIPPath)) {
  dotenv.config({ path: envIPPath });
} else {
  console.warn('.env.ip not found, frontend sẽ dùng localhost.');
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.VITE_API_PORT': JSON.stringify(process.env.HTTPS_PORT),
      'process.env.VITE_API_IP': JSON.stringify(process.env.VITE_API_IP),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: process.env.VITE_PORT ? parseInt(process.env.VITE_PORT, 10) : 5173,
      https: {
        key: fs.readFileSync(path.resolve(__dirname, '192.168.1.3-key.pem')),
        cert: fs.readFileSync(path.resolve(__dirname, '192.168.1.3.pem')),
      },
    },
  };
});
