// api/upload-image.js — Cloudinary（スラッシュ問題修正済み・folder不使用）
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { base64, pokemonName } = req.body || {};
  if (!base64) return res.status(400).json({ error: "no image" });

  const cloudName    = process.env.CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    return res.status(500).json({ error: "Cloudinary env not set" });
  }

  try {
    // public_idはシンプルな数字のみ（スラッシュ・特殊文字なし）
    const publicId = `s${Date.now()}`;

    const body = {
      file: `data:image/png;base64,${base64}`,
      upload_preset: uploadPreset,
      public_id: publicId,
      // folder指定なし（スラッシュエラーの原因だったので削除）
    };

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error("Cloudinary error:", JSON.stringify(data.error));
      return res.status(500).json({ error: data.error.message });
    }

    // Cloudinaryのsecure_urlはTwitterクローラーが確実に読める
    const url = data.secure_url;
    console.log("✅ Cloudinary URL:", url);
    return res.status(200).json({ url });

  } catch (err) {
    console.error("upload error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
