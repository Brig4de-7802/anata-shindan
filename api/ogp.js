// api/ogp.js
// Xのクローラーが /api/ogp?img=URL にアクセスしたとき
// OGPメタタグ付きのHTMLを返す → X上でカード画像として表示される

export default function handler(req, res) {
  const { img, name, tag } = req.query;
  const imageUrl = img || "https://anata-shindan.vercel.app/ogp-default.png";
  const title = name ? `私は「${name}タイプ」でした！` : "アナタ診断 — ポケモンタイプ診断";
  const desc  = tag  ? `「${tag}」 #ポケモン診断 #アナタ診断` : "30の質問でAIがあなたのポケモンタイプを診断します";

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=300");
  return res.status(200).send(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta property="og:title" content="${title}"/>
  <meta property="og:description" content="${desc}"/>
  <meta property="og:image" content="${imageUrl}"/>
  <meta property="og:image:width" content="1200"/>
  <meta property="og:image:height" content="630"/>
  <meta property="og:url" content="https://anata-shindan.vercel.app"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content="${title}"/>
  <meta name="twitter:description" content="${desc}"/>
  <meta name="twitter:image" content="${imageUrl}"/>
  <meta http-equiv="refresh" content="0;url=https://anata-shindan.vercel.app"/>
</head>
<body>
  <script>location.href="https://anata-shindan.vercel.app"</script>
</body>
</html>`);
}
