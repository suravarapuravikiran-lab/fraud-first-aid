// scripts/check-tts-proxy.js
// Automated verification script for high-fidelity Telugu / Hindi / English TTS audio endpoint

async function checkTtsProxy() {
  const testPhrase = 'నమస్కారం, ఇది ఫ్రాడ్ ఫస్ట్ ఎయిడ్ అత్యవసర సహాయ కేంద్రం';
  const url = `http://localhost:5173/api/tts?tl=te&q=${encodeURIComponent(testPhrase)}`;

  console.log('Testing Local TTS Proxy Endpoint:', url);

  try {
    const res = await fetch(url);
    const contentType = res.headers.get('content-type') || '';

    if (res.status === 200 && contentType.includes('audio')) {
      const buffer = await res.arrayBuffer();
      console.log(`\x1b[32m✔ SUCCESS:\x1b[0m Pure Telugu audio stream received (${buffer.byteLength} bytes, ${contentType}).`);
      process.exit(0);
    } else {
      console.error(`\x1b[31m✖ FAILURE:\x1b[0m Expected 200 with audio/*, received status ${res.status} (${contentType}).`);
      process.exit(1);
    }
  } catch (err) {
    console.error('\x1b[31m✖ FAILURE:\x1b[0m Could not connect to local TTS proxy at http://localhost:5173/. Ensure Vite server is active.');
    console.error(err);
    process.exit(1);
  }
}

checkTtsProxy();
