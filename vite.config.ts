import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';

function ttsProxyPlugin(): Plugin {
  return {
    name: 'tts-proxy-middleware',
    configureServer(server) {
      server.middlewares.use('/api/tts', async (req, res) => {
        try {
          const url = new URL(req.url || '', `http://${req.headers.host}`);
          const q = url.searchParams.get('q');
          const tl = url.searchParams.get('tl') || 'te';

          if (!q) {
            res.statusCode = 400;
            res.end('Missing q parameter');
            return;
          }

          const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${encodeURIComponent(tl)}&client=tw-ob&q=${encodeURIComponent(q)}`;
          const response = await fetch(googleUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Accept': '*/*'
            }
          });

          if (!response.ok) {
            res.statusCode = response.status;
            res.end('Upstream TTS error');
            return;
          }

          const arrayBuf = await response.arrayBuffer();
          res.setHeader('Content-Type', 'audio/mpeg');
          res.setHeader('Cache-Control', 'public, max-age=86400');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(Buffer.from(arrayBuf));
        } catch (error) {
          res.statusCode = 500;
          res.end('TTS Proxy failure');
        }
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/tts', async (req, res) => {
        try {
          const url = new URL(req.url || '', `http://${req.headers.host}`);
          const q = url.searchParams.get('q');
          const tl = url.searchParams.get('tl') || 'te';

          if (!q) {
            res.statusCode = 400;
            res.end('Missing q parameter');
            return;
          }

          const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${encodeURIComponent(tl)}&client=tw-ob&q=${encodeURIComponent(q)}`;
          const response = await fetch(googleUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Accept': '*/*'
            }
          });

          if (!response.ok) {
            res.statusCode = response.status;
            res.end('Upstream TTS error');
            return;
          }

          const arrayBuf = await response.arrayBuffer();
          res.setHeader('Content-Type', 'audio/mpeg');
          res.setHeader('Cache-Control', 'public, max-age=86400');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(Buffer.from(arrayBuf));
        } catch (error) {
          res.statusCode = 500;
          res.end('TTS Proxy failure');
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), ttsProxyPlugin()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          jspdf: ['jspdf'],
          vendor: ['react', 'react-dom', 'lucide-react', 'canvas-confetti'],
        }
      }
    }
  }
});
