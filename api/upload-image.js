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
    console.log("imgBB response:", JSON.stringify(data?.data?.image));

    if (!data.success) {
      return res.status(500).json({ error: "imgBB upload failed", detail: data });
    }

    // data.data.image.url が直接アクセスできる画像URL（Xが読める）
    // display_url はページURLなのでNG
    const url = data.data.image?.url || data.data.url;
    console.log("Image URL:", url);
    return res.status(200).json({ url });

  } catch (err) {
    console.error("upload error:", err);
    return res.status(500).json({ error: err.message });
  }
}
