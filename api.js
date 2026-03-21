export default async function handler(req, res) {
  // আপনার আসল GitHub M3U লিঙ্ক
  const githubUrl = "https://raw.githubusercontent.com/tarikulit82743-cyber/iptv-playlist/refs/heads/main/only%20full.m3u";
  
  const userAgent = req.headers['user-agent'] || '';
  const isBrowser = /Mozilla|Chrome|Safari|Edge|Opera/i.test(userAgent);

  // যদি কেউ ব্রাউজার দিয়ে ঢোকে, তবে সুন্দর লাল বক্সের মেসেজটি দেখাবে
  if (isBrowser) {
    res.setHeader('Content-Type', 'text/html');
    return res.status(403).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Access Denied | Secure Gateway</title>
          <style>
              body { background: #0a0a0a; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: sans-serif; }
              .box { background: #1a1a1a; border: 2px solid #ff3232; border-radius: 15px; padding: 40px; text-align: center; max-width: 400px; box-shadow: 0 0 20px rgba(255, 50, 50, 0.2); animation: fade 0.5s; }
              @keyframes fade { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
              h1 { color: #ff3232; margin: 0; font-size: 28px; letter-spacing: 1px; }
              p { color: #fff; font-size: 18px; margin: 20px 0; }
              .footer { color: #666; font-size: 13px; }
          </style>
      </head>
      <body>
          <div class="box">
              <div style="font-size: 50px; margin-bottom: 10px;">🔒</div>
              <h1>ACCESS DENIED</h1>
              <p>Please use an <b>IPTV Player</b> to open this link.</p>
              <div class="footer">Web browsers are not allowed for security reasons.</div>
          </div>
      </body>
      </html>
    `);
  }

  // যদি IPTV Player হয়, তবে মেইন ফাইলটি পাঠিয়ে দিবে
  try {
    const response = await fetch(githubUrl);
    const data = await response.text();
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Error fetching playlist");
  }
}