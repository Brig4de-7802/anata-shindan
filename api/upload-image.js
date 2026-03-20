// api/upload-image.js
// 画像をimgBBにアップロードして公開URLを返す（Vercel Blob設定不要）

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { base64, pokemonName } = req.body || {};
  if (!base64) return res.status(400).json({ error: "no image" });

  const apiKey = process.env.IMGBB_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "IMGBB_API_KEY not set" });

  try {
    const name = `shindan-${(pokemonName||"pokemon").replace(/[^\w]/g,"")}`;

    // imgBB API に base64をPOST
    const formData = new URLSearchParams();
    formData.append("key", apiKey);
    formData.append("image", base64);
    formData.append("name", name);
    // expiration省略 = 永久保存

    const response = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!data.success) {
      console.error("imgBB error:", data);
      return res.status(500).json({ error: "imgBB upload failed" });
    }

    const url = data.data.display_url || data.data.url;
    return res.status(200).json({ url });

  } catch (err) {
    console.error("upload error:", err);
    return res.status(500).json({ error: err.message });
  }
}
