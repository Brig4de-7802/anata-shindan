# アナタ診断 — デプロイ手順

## 必要なもの
- GitHubアカウント（無料）
- Vercelアカウント（無料）
- Anthropic APIキー（https://console.anthropic.com）

---

## ① ローカル確認（任意）

```bash
npm install
npm run dev
# → http://localhost:5173 で確認
```

---

## ② GitHubにプッシュ

```bash
git init
git add .
git commit -m "first commit"
# GitHubで新しいリポジトリを作成（例: anata-shindan）
git remote add origin https://github.com/あなたのID/anata-shindan.git
git push -u origin main
```

---

## ③ Vercelにデプロイ（5分）

1. https://vercel.com にアクセス → GitHubでログイン
2. 「New Project」→ 先ほどのリポジトリを選択
3. 「Environment Variables」に以下を追加：
   - Name: `ANTHROPIC_API_KEY`
   - Value: `sk-ant-xxxx...`（Anthropicのコンソールから）
4. 「Deploy」ボタンを押す

→ 数分で `https://anata-shindan.vercel.app` が公開される！

---

## ④ 独自ドメイン（任意・年1,000〜2,000円）

- お名前.com / Xserverドメイン で取得
- Vercelの「Domains」設定で紐付けるだけ

---

## 💰 Web広告収益化

### Google AdSense（審査あり・高単価）
```html
<!-- index.html の <head> に追加 -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
  data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"></script>
```

結果ページに広告ユニットを配置：
```jsx
// 結果表示前に挟む（リワード広告の代替）
<ins className="adsbygoogle"
  style={{display:"block"}}
  data-ad-format="auto"
  data-ad-client="ca-pub-XXXXXXXX"
  data-ad-slot="XXXXXXXXXX"/>
```

### 収益目安（日本・AdSense）
| 月間PV    | 月収目安       |
|-----------|---------------|
| 10,000    | 2,000〜8,000円 |
| 50,000    | 1〜4万円       |
| 200,000   | 4〜15万円      |

---

## 📣 集客戦略

### Twitter/X（最重要）
- 「診断してみた」投稿が自然拡散
- 診断結果のシェアボタンで自動拡散
- #ポケモン診断 タグで検索流入

### SEO（中長期）
- 「ポケモン 性格診断」「AI 診断」で狙う
- index.html の description を充実させる

### TikTok
- 結果画面を録画して投稿するだけ
- バズれば一晩で数万PV

---

## ファイル構成

```
shindan-web/
├── index.html          ← エントリーポイント（OGP設定済み）
├── vite.config.js      ← Vite設定
├── vercel.json         ← Vercelデプロイ設定
├── package.json
├── api/
│   └── diagnose.js     ← サーバーレス関数（APIキーをここで管理）
└── src/
    ├── main.jsx        ← Reactエントリー
    └── App.jsx         ← メインアプリ（診断ロジック全部入り）
```
