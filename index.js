export default async function handler(req, res) {
  const githubUrl = "https://raw.githubusercontent.com/tarikulit82743-cyber/iptv-playlist/refs/heads/main/only%20full.m3u";
  const userAgent = req.headers['user-agent'] || '';
  if (userAgent.includes('Mozilla') || userAgent.includes('Chrome')) {
    res.setHeader('Content-Type', 'text/html');
    return res.status(403).send('<h1 style="color:red;text-align:center;margin-top:50px;">🛑 ACCESS DENIED! Use IPTV Player.</h1>');
  }
  const response = await fetch(githubUrl);
  const data = await response.text();
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(data);
}
