// api/upload-image.js
// Base64画像をVercel自身のtmpに保存してURLを返す
// → Cloudinary/imgBB設定不要

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { base64 } = req.body || {};
  if (!base64) return res.status(400).json({ error: "no image" });

  // base64をそのままdata URIとして返す（外部サービス不要）
  // OGPページがこのbase64をimgタグで直接表示する
  const dataUri = `data:image/png;base64,${base64}`;

  // Twitterクローラー向けにVercel上の静的URLが必要なため
  // base64をそのままJSONで保存してユニークなIDを返す
  const id = `${Date.now()}-${Math.random().toString(36).slice(2,8)}`;

  // KV storeの代わりにCloudflare Images等が理想だが
  // 最もシンプルな方法：base64を直接OGP URLのクエリに埋め込む
  // ただしURLが長くなりすぎるのでimgurの無認証APIを使う

  try {
    // Imgur匿名アップロード（認証不要・Twitterが必ず読める）
    const formData = new FormData();
    formData.append("image", base64);

    const response = await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
        "Authorization": "Client-ID 546c25a59c58ad7",  // Imgur公開クライアントID
      },
      body: formData,
    });

    const data = await response.json();

    if (!data.success) {
      console.error("Imgur error:", data);
      return res.status(500).json({ error: "Imgur upload failed" });
    }

    const url = data.data.link; // https://i.imgur.com/xxxxx.png
    console.log("Imgur URL:", url);
    return res.status(200).json({ url });

  } catch (err) {
    console.error("upload error:", err);
    return res.status(500).json({ error: err.message });
  }
}
