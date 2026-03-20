// api/upload-image.js
// 画像をVercel Blobにアップロードして公開URLを返す
// → XがそのURLのOGP画像を自動で読み込んでツイートに表示される

import { put } from "@vercel/blob";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { base64, pokemonName } = req.body || {};
  if (!base64) return res.status(400).json({ error: "no image" });

  try {
    // base64 → Buffer → Blob
    const buffer = Buffer.from(base64, "base64");
    const filename = `shindan-${Date.now()}-${(pokemonName||"").replace(/[^\w]/g,"")}.png`;

    // Vercel Blob に保存（公開URL発行）
    const blob = await put(filename, buffer, {
      access: "public",
      contentType: "image/png",
    });

    return res.status(200).json({ url: blob.url });
  } catch (err) {
    console.error("upload error:", err);
    return res.status(500).json({ error: err.message });
  }
}
