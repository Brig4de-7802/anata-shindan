// api/ogp.js
export default function handler(req, res) {
  const { img, name, tag } = req.query;
  const imageUrl = img || null;
  const pokeName = name ? decodeURIComponent(name) : "ポケモン";
  const tagline  = tag  ? decodeURIComponent(tag)  : "あなたのポケモンタイプ診断";
  const title    = `私は「${pokeName}タイプ」でした！`;
  const desc     = `「${tagline}」 #ポケモン診断 #アナタ診断`;
  const siteUrl  = "https://anata-shindan.vercel.app";

  if (!imageUrl) {
    res.writeHead(302, { Location: siteUrl });
    return res.end();
  }

  // TwitterbotかどうかをUser-Agentで判定
  const ua = req.headers["user-agent"] || "";
  const isBot = ua.includes("Twitterbot") || ua.includes("Discordbot") || ua.includes("facebookexternalhit") || ua.includes("bot");

  if (!isBot) {
    // 人間のユーザー → サイトにリダイレクト
    res.writeHead(302, { Location: siteUrl });
    return res.end();
  }

  // Twitterクローラー → OGPタグだけ返す（リダイレクトなし）
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache");
  return res.status(200).send(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>${title}</title>
  <meta property="og:type" content="website"/>
  <meta property="og:title" content="${title}"/>
  <meta property="og:description" content="${desc}"/>
  <meta property="og:image" content="${imageUrl}"/>
  <meta property="og:image:width" content="1200"/>
  <meta property="og:image:height" content="630"/>
  <meta property="og:url" content="${siteUrl}"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content="${title}"/>
  <meta name="twitter:description" content="${desc}"/>
  <meta name="twitter:image" content="${imageUrl}"/>
</head>
<body></body>
</html>`);
}
