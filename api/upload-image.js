// api/upload-image.js — Cloudinary経由（TwitterのクローラーがブロックしないCDN）
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { base64, pokemonName } = req.body || {};
  if (!base64) return res.status(400).json({ error: "no image" });

  const cloudName    = process.env.CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    return res.status(500).json({ error: "Cloudinary env vars not set" });
  }

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          file: `data:image/png;base64,${base64}`,
          upload_preset: uploadPreset,
          public_id: `shindan-${Date.now()}`,
          folder: "anata-shindan",
        }),
      }
    );

    const data = await response.json();
    if (data.error) {
      console.error("Cloudinary error:", data.error);
      return res.status(500).json({ error: data.error.message });
    }

    // secure_url = https://res.cloudinary.com/... → Twitterが必ず読める
    console.log("Cloudinary URL:", data.secure_url);
    return res.status(200).json({ url: data.secure_url });

  } catch (err) {
    console.error("upload error:", err);
    return res.status(500).json({ error: err.message });
  }
}
