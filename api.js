export default async function handler(req, res) {
  const githubUrl = "https://raw.githubusercontent.com/tarikulit82743-cyber/iptv-playlist/refs/heads/main/only%20full.m3u";
  const userAgent = req.headers['user-agent'] || '';
  const isBrowser = /Mozilla|Chrome|Safari|Edge|Opera/i.test(userAgent);

  if (isBrowser) {
    res.setHeader('Content-Type', 'text/html');
    return res.status(403).send(`
      <body style="background:#000;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;font-family:sans-serif;">
          <div style="border:2px solid red;padding:40px;border-radius:20px;text-align:center;">
              <h1 style="color:red;font-size:40px;">🛑 ACCESS DENIED</h1>
              <p style="color:#fff;font-size:18px;">Please use an <b>IPTV Player</b> to open this link.</p>
          </div>
      </body>
    `);
  }

  const response = await fetch(githubUrl);
  const data = await response.text();
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).send(data);
}
