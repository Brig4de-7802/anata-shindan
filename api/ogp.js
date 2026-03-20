// api/ogp.js
// XのTwitterbotクローラー専用 — リダイレクトなしでOGPタグだけを返す
export default function handler(req, res) {
  const { img, name, tag } = req.query;

  const imageUrl = img && img.startsWith("http") ? decodeURIComponent(img) : null;
  const pokeName = name ? decodeURIComponent(name) : "ポケモン";
  const tagline  = tag  ? decodeURIComponent(tag)  : "あなたのポケモンタイプ診断";

  const title = `私は「${pokeName}タイプ」でした！`;
  const desc  = `「${tagline}」\n#ポケモン診断 #アナタ診断 #性格診断`;
  const siteUrl = "https://anata-shindan.vercel.app";

  if (!imageUrl) {
    res.writeHead(302, { Location: siteUrl });
    return res.end();
  }

  // Cache-Controlを長めに（Xがキャッシュを使い回す）
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600");

  // ★リダイレクトを一切しない★ OGPタグだけを返す
  // XのTwitterbotはこのページを読んでカード画像を取得する
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
<body>
  <a href="${siteUrl}">アナタ診断 — あなたは何ポケモンタイプ？</a>
</body>
</html>`);
}
