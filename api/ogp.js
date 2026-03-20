// api/ogp.js — XのTwitterbotクローラー向けOGPページ
// url.parse()を使わずWHATWG URL APIで実装
export default function handler(req, res) {
  // クエリパラメータを安全に取得
  const { img, name, tag } = req.query;

  const imageUrl = img || null;
  const pokeName = name || "ポケモン";
  const tagline  = tag  || "あなたのポケモンタイプ診断";

  const title   = `私は「${pokeName}タイプ」でした！`;
  const desc    = `「${tagline}」 #ポケモン診断 #アナタ診断 #性格診断`;
  const siteUrl = "https://anata-shindan.vercel.app";

  if (!imageUrl) {
    res.writeHead(302, { Location: siteUrl });
    return res.end();
  }

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");

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
<body><a href="${siteUrl}">アナタ診断へ</a></body>
</html>`);
}
