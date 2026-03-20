// api/diagnose.js — Vercelサーバーレス関数
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body || {};
  if (!prompt) return res.status(400).json({ error: "prompt required" });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured" });

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1200,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic API error:", response.status, errText);
      return res.status(500).json({ error: `Anthropic error: ${response.status}` });
    }

    const data = await response.json();
    const text = data.content?.map((c) => c.text || "").join("") || "";

    // JSON部分だけ抽出（```json ... ``` や余分なテキストを除去）
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("No JSON found in response:", text.slice(0, 200));
      return res.status(500).json({ error: "No JSON in response" });
    }

    const result = JSON.parse(jsonMatch[0]);
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json(result);

  } catch (err) {
    console.error("diagnose error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
