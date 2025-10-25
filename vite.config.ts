import path from 'path';
import fs from 'fs';
import { defineConfig, loadEnv } from 'vite';
import dotenv from 'dotenv';

// === Load env files if available ===
const envPortPath = path.resolve(__dirname, './.env.port');
if (fs.existsSync(envPortPath)) dotenv.config({ path: envPortPath });

const envIPPath = path.resolve(__dirname, './.env.ip');
if (fs.existsSync(envIPPath)) dotenv.config({ path: envIPPath });

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const isProduction = mode === 'production';

  const serverConfig = !isProduction
    ? {
        host: '0.0.0.0',
        port: process.env.VITE_PORT ? parseInt(process.env.VITE_PORT, 10) : 5173,
        https: fs.existsSync(path.resolve(__dirname, '192.168.1.3-key.pem'))
          ? {
              key: fs.readFileSync(path.resolve(__dirname, '192.168.1.3-key.pem')),
              cert: fs.readFileSync(path.resolve(__dirname, '192.168.1.3.pem')),
            }
          : false,
      }
    : undefined;

  return {
    // ⚙️ Base path cho GitHub Pages
    base: isProduction ? '/OW3/' : '/',
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
    server: serverConfig,
    build: {
      outDir: 'dist',
      sourcemap: false,
    },
  };
});
