// api/upload-image.js
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { base64, pokemonName } = req.body || {};
  if (!base64) return res.status(400).json({ error: "no image" });

  const apiKey = process.env.IMGBB_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "IMGBB_API_KEY not set" });

  try {
    const name = `shindan-${(pokemonName||"pokemon").replace(/[^\w]/g,"")}`;

    const formData = new URLSearchParams();
    formData.append("key", apiKey);
    formData.append("image", base64);
    formData.append("name", name);

    const response = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!data.success) {
      return res.status(500).json({ error: "imgBB upload failed", detail: data });
    }

    // imgBB APIのレスポンス構造:
    // data.data.display_url = 直接画像URL (https://i.ibb.co/xxx/name.png) ← Xが読める
    // data.data.url = HTMLビューアページ ← NGだった
    const url = data.data.display_url;
    console.log("Direct image URL:", url);
    return res.status(200).json({ url });

  } catch (err) {
    console.error("upload error:", err);
    return res.status(500).json({ error: err.message });
  }
}
