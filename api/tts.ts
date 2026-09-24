// api/tts.ts - Vercel Serverless Function for pure Telugu / Hindi / English TTS audio streaming
export default async function handler(req: any, res: any) {
  try {
    const q = req.query?.q as string;
    const tl = (req.query?.tl as string) || 'te';

    if (!q) {
      return res.status(400).send('Missing query text parameter q');
    }

    const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${encodeURIComponent(tl)}&client=tw-ob&q=${encodeURIComponent(q)}`;
    const response = await fetch(googleUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': '*/*'
      }
    });

    if (!response.ok) {
      return res.status(response.status).send('Upstream Google TTS error');
    }

    const arrayBuf = await response.arrayBuffer();
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(Buffer.from(arrayBuf));
  } catch (err) {
    console.error('TTS Serverless error:', err);
    res.status(500).send('Internal serverless TTS failure');
  }
}
