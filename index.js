export default async function handler(req, res) {
  const githubUrl = "https://raw.githubusercontent.com/tarikulit82743-cyber/iptv-playlist/refs/heads/main/only%20full.m3u";
  
  const userAgent = req.headers['user-agent'] || '';
  const isBrowser = /Mozilla|Chrome|Safari|Edge|Opera/i.test(userAgent);

  // ব্রাউজার হলে সুন্দর লাল বক্সের ডিজাইন দেখাবে
  if (isBrowser) {
    res.setHeader('Content-Type', 'text/html');
    return res.status(403).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Access Denied</title>
          <style>
              body { background: #0a0a0a; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: sans-serif; }
              .card { background: #141414; border: 2px solid #ff3232; border-radius: 15px; padding: 40px; text-align: center; max-width: 400px; width: 90%; box-shadow: 0 0 20px rgba(255, 50, 50, 0.2); }
              .icon { color: #ff3232; font-size: 50px; margin-bottom: 15px; }
              h1 { color: #ff3232; margin: 10px 0; font-size: 24px; text-transform: uppercase; }
              p { color: #ffcc00; font-size: 18px; font-weight: bold; margin-bottom: 15px; }
              .footer { color: #666; font-size: 13px; line-height: 1.5; }
          </style>
      </head>
      <body>
          <div class="card">
              <div class="icon">🛑</div>
              <h1>ACCESS DENIED</h1>
              <p>Please use an IPTV Player to open this link.</p>
              <div class="footer">Web browsers are not allowed to view this content.</div>
          </div>
      </body>
      </html>
    `);
  }

  // প্লেয়ার হলে অরিজিনাল মেইল ফাইল পাঠাবে
  try {
    const response = await fetch(githubUrl);
    const data = await response.text();
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Error");
  }
}
