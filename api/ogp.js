// api/ogp.js — XのクローラーにOGP画像を見せてカード表示させる
export default function handler(req, res) {
  const { img, name, tag } = req.query;

  // imgが直接画像URLであることを確認
  const imageUrl = img && img.startsWith("http") ? img : null;
  const title = name ? `私は「${decodeURIComponent(name)}タイプ」でした！` : "アナタ診断";
  const desc  = tag  ? decodeURIComponent(tag) : "あなたのポケモンタイプを診断します";

  // 画像がない場合はサイトにリダイレクト
  if (!imageUrl) {
    res.setHeader("Location", "https://anata-shindan.vercel.app");
    return res.status(302).end();
  }

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=600");

  // Xのクローラー向け：summary_large_image + 直接画像URL
  return res.status(200).send(`<!DOCTYPE html>
<html prefix="og: http://ogp.me/ns#">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width"/>
  <title>${title}</title>
  <meta name="description" content="${desc} #ポケモン診断"/>

  <!-- Open Graph -->
  <meta property="og:type" content="website"/>
  <meta property="og:site_name" content="アナタ診断"/>
  <meta property="og:title" content="${title}"/>
  <meta property="og:description" content="${desc} #ポケモン診断"/>
  <meta property="og:url" content="https://anata-shindan.vercel.app"/>
  <meta property="og:image" content="${imageUrl}"/>
  <meta property="og:image:type" content="image/png"/>
  <meta property="og:image:width" content="1200"/>
  <meta property="og:image:height" content="630"/>

  <!-- Twitter Card — summary_large_imageで大きい画像カード -->
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:site" content="@anata_shindan"/>
  <meta name="twitter:title" content="${title}"/>
  <meta name="twitter:description" content="${desc} #ポケモン診断 #アナタ診断"/>
  <meta name="twitter:image" content="${imageUrl}"/>
  <meta name="twitter:image:alt" content="${title}"/>

  <!-- 人間ユーザーはトップページへリダイレクト -->
  <meta http-equiv="refresh" content="0;url=https://anata-shindan.vercel.app"/>
</head>
<body>
  <script>
    // クローラーでなければリダイレクト
    if (!navigator.userAgent.includes("Twitterbot") && !navigator.userAgent.includes("facebookexternalhit")) {
      location.href = "https://anata-shindan.vercel.app";
    }
  </script>
  <p><a href="https://anata-shindan.vercel.app">アナタ診断へ</a></p>
</body>
</html>`);
}
