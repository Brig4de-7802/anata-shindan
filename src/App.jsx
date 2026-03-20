import { useState, useEffect, useRef } from "react";

const POKEMON_151 = [
  {id:1,name:"フシギダネ",types:["grass","poison"]},{id:2,name:"フシギソウ",types:["grass","poison"]},{id:3,name:"フシギバナ",types:["grass","poison"]},
  {id:4,name:"ヒトカゲ",types:["fire"]},{id:5,name:"リザード",types:["fire"]},{id:6,name:"リザードン",types:["fire","flying"]},
  {id:7,name:"ゼニガメ",types:["water"]},{id:8,name:"カメール",types:["water"]},{id:9,name:"カメックス",types:["water"]},
  {id:10,name:"キャタピー",types:["bug"]},{id:11,name:"トランセル",types:["bug"]},{id:12,name:"バタフリー",types:["bug","flying"]},
  {id:13,name:"ビードル",types:["bug","poison"]},{id:14,name:"コクーン",types:["bug","poison"]},{id:15,name:"スピアー",types:["bug","poison"]},
  {id:16,name:"ポッポ",types:["normal","flying"]},{id:17,name:"ピジョン",types:["normal","flying"]},{id:18,name:"ピジョット",types:["normal","flying"]},
  {id:19,name:"コラッタ",types:["normal"]},{id:20,name:"ラッタ",types:["normal"]},
  {id:21,name:"オニスズメ",types:["normal","flying"]},{id:22,name:"オニドリル",types:["normal","flying"]},
  {id:23,name:"アーボ",types:["poison"]},{id:24,name:"アーボック",types:["poison"]},
  {id:25,name:"ピカチュウ",types:["electric"]},{id:26,name:"ライチュウ",types:["electric"]},
  {id:27,name:"サンド",types:["ground"]},{id:28,name:"サンドパン",types:["ground"]},
  {id:29,name:"ニドラン♀",types:["poison"]},{id:30,name:"ニドリーナ",types:["poison"]},{id:31,name:"ニドクイン",types:["poison","ground"]},
  {id:32,name:"ニドラン♂",types:["poison"]},{id:33,name:"ニドリーノ",types:["poison"]},{id:34,name:"ニドキング",types:["poison","ground"]},
  {id:35,name:"ピッピ",types:["normal"]},{id:36,name:"ピクシー",types:["normal"]},
  {id:37,name:"ロコン",types:["fire"]},{id:38,name:"キュウコン",types:["fire"]},
  {id:39,name:"プリン",types:["normal"]},{id:40,name:"プクリン",types:["normal"]},
  {id:41,name:"ズバット",types:["poison","flying"]},{id:42,name:"ゴルバット",types:["poison","flying"]},
  {id:43,name:"ナゾノクサ",types:["grass","poison"]},{id:44,name:"クサイハナ",types:["grass","poison"]},{id:45,name:"ラフレシア",types:["grass","poison"]},
  {id:46,name:"パラス",types:["bug","grass"]},{id:47,name:"パラセクト",types:["bug","grass"]},
  {id:48,name:"コンパン",types:["bug","poison"]},{id:49,name:"モルフォン",types:["bug","poison"]},
  {id:50,name:"ディグダ",types:["ground"]},{id:51,name:"ダグトリオ",types:["ground"]},
  {id:52,name:"ニャース",types:["normal"]},{id:53,name:"ペルシアン",types:["normal"]},
  {id:54,name:"コダック",types:["water"]},{id:55,name:"ゴルダック",types:["water"]},
  {id:56,name:"マンキー",types:["fighting"]},{id:57,name:"オコリザル",types:["fighting"]},
  {id:58,name:"ガーディ",types:["fire"]},{id:59,name:"ウインディ",types:["fire"]},
  {id:60,name:"ニョロモ",types:["water"]},{id:61,name:"ニョロゾ",types:["water"]},{id:62,name:"ニョロボン",types:["water","fighting"]},
  {id:63,name:"ケーシィ",types:["psychic"]},{id:64,name:"ユンゲラー",types:["psychic"]},{id:65,name:"フーディン",types:["psychic"]},
  {id:66,name:"ワンリキー",types:["fighting"]},{id:67,name:"ゴーリキー",types:["fighting"]},{id:68,name:"カイリキー",types:["fighting"]},
  {id:69,name:"マダツボミ",types:["grass","poison"]},{id:70,name:"ウツドン",types:["grass","poison"]},{id:71,name:"ウツボット",types:["grass","poison"]},
  {id:72,name:"メノクラゲ",types:["water","poison"]},{id:73,name:"ドククラゲ",types:["water","poison"]},
  {id:74,name:"イシツブテ",types:["rock","ground"]},{id:75,name:"ゴローン",types:["rock","ground"]},{id:76,name:"ゴローニャ",types:["rock","ground"]},
  {id:77,name:"ポニータ",types:["fire"]},{id:78,name:"ギャロップ",types:["fire"]},
  {id:79,name:"ヤドン",types:["water","psychic"]},{id:80,name:"ヤドラン",types:["water","psychic"]},
  {id:81,name:"コイル",types:["electric","steel"]},{id:82,name:"レアコイル",types:["electric","steel"]},
  {id:83,name:"カモネギ",types:["normal","flying"]},{id:84,name:"ドードー",types:["normal","flying"]},{id:85,name:"ドードリオ",types:["normal","flying"]},
  {id:86,name:"パウワウ",types:["water"]},{id:87,name:"ジュゴン",types:["water","ice"]},
  {id:88,name:"ベトベター",types:["poison"]},{id:89,name:"ベトベトン",types:["poison"]},
  {id:90,name:"シェルダー",types:["water"]},{id:91,name:"パルシェン",types:["water","ice"]},
  {id:92,name:"ゴース",types:["ghost","poison"]},{id:93,name:"ゴースト",types:["ghost","poison"]},{id:94,name:"ゲンガー",types:["ghost","poison"]},
  {id:95,name:"イワーク",types:["rock","ground"]},
  {id:96,name:"スリープ",types:["psychic"]},{id:97,name:"スリーパー",types:["psychic"]},
  {id:98,name:"クラブ",types:["water"]},{id:99,name:"キングラー",types:["water"]},
  {id:100,name:"ビリリダマ",types:["electric"]},{id:101,name:"マルマイン",types:["electric"]},
  {id:102,name:"タマタマ",types:["grass","psychic"]},{id:103,name:"ナッシー",types:["grass","psychic"]},
  {id:104,name:"カラカラ",types:["ground"]},{id:105,name:"ガラガラ",types:["ground"]},
  {id:106,name:"サワムラー",types:["fighting"]},{id:107,name:"エビワラー",types:["fighting"]},
  {id:108,name:"ベロリンガ",types:["normal"]},
  {id:109,name:"ドガース",types:["poison"]},{id:110,name:"マタドガス",types:["poison"]},
  {id:111,name:"サイホーン",types:["ground","rock"]},{id:112,name:"サイドン",types:["ground","rock"]},
  {id:113,name:"ラッキー",types:["normal"]},{id:114,name:"モンジャラ",types:["grass"]},
  {id:115,name:"ガルーラ",types:["normal"]},
  {id:116,name:"タッツー",types:["water"]},{id:117,name:"シードラ",types:["water"]},
  {id:118,name:"トサキント",types:["water"]},{id:119,name:"アズマオウ",types:["water"]},
  {id:120,name:"ヒトデマン",types:["water"]},{id:121,name:"スターミー",types:["water","psychic"]},
  {id:122,name:"バリヤード",types:["psychic"]},
  {id:123,name:"ストライク",types:["bug","flying"]},
  {id:124,name:"ルージュラ",types:["ice","psychic"]},
  {id:125,name:"エレブー",types:["electric"]},{id:126,name:"ブーバー",types:["fire"]},
  {id:127,name:"カイロス",types:["bug"]},{id:128,name:"ケンタロス",types:["normal"]},
  {id:129,name:"コイキング",types:["water"]},{id:130,name:"ギャラドス",types:["water","flying"]},
  {id:131,name:"ラプラス",types:["water","ice"]},
  {id:132,name:"メタモン",types:["normal"]},{id:133,name:"イーブイ",types:["normal"]},
  {id:134,name:"シャワーズ",types:["water"]},{id:135,name:"サンダース",types:["electric"]},{id:136,name:"ブースター",types:["fire"]},
  {id:137,name:"ポリゴン",types:["normal"]},
  {id:138,name:"オムナイト",types:["rock","water"]},{id:139,name:"オムスター",types:["rock","water"]},
  {id:140,name:"カブト",types:["rock","water"]},{id:141,name:"カブトプス",types:["rock","water"]},
  {id:142,name:"プテラ",types:["rock","flying"]},
  {id:143,name:"カビゴン",types:["normal"]},
  {id:144,name:"フリーザー",types:["ice","flying"]},{id:145,name:"サンダー",types:["electric","flying"]},{id:146,name:"ファイヤー",types:["fire","flying"]},
  {id:147,name:"ミニリュウ",types:["dragon"]},{id:148,name:"ハクリュー",types:["dragon"]},{id:149,name:"カイリュー",types:["dragon","flying"]},
  {id:150,name:"ミュウツー",types:["psychic"]},{id:151,name:"ミュウ",types:["psychic"]},
];

const TYPE_COLORS = {
  fire:"#FF6B35",water:"#4FC3F7",grass:"#66BB6A",electric:"#FFD54F",
  psychic:"#F06292",ice:"#80DEEA",dragon:"#CE93D8",ghost:"#9575CD",
  normal:"#BDBDBD",flying:"#90CAF9",bug:"#AED581",poison:"#BA68C8",
  ground:"#FFCA28",rock:"#A1887F",fighting:"#EF5350",steel:"#90A4AE",
};

// タイプ日本語表記（ポケモン公式準拠）
const TYPE_JP = {
  fire:"ほのお", water:"みず", grass:"くさ", electric:"でんき",
  psychic:"エスパー", ice:"こおり", dragon:"ドラゴン", ghost:"ゴースト",
  normal:"ノーマル", flying:"ひこう", bug:"むし", poison:"どく",
  ground:"じめん", rock:"いわ", fighting:"かくとう", steel:"はがね",
};

const QUESTIONS = [
  {id:1,text:"朝起きたとき、まず何を感じる？",options:[{label:"🌅 よし、今日も頑張ろう！",value:"A"},{label:"😴 あと5分…",value:"B"},{label:"📋 今日の予定を確認",value:"C"},{label:"🌸 穏やかな気持ち",value:"D"}]},
  {id:2,text:"理想の休日の過ごし方は？",options:[{label:"🎉 友達と遊ぶ",value:"A"},{label:"🏠 家でまったり",value:"B"},{label:"🌲 自然の中へ",value:"C"},{label:"📚 一人で趣味",value:"D"}]},
  {id:3,text:"決断するときのスタイルは？",options:[{label:"⚡ 直感で即決",value:"A"},{label:"📊 データで判断",value:"B"},{label:"👥 みんなに相談",value:"C"},{label:"💭 じっくり悩む",value:"D"}]},
  {id:4,text:"ストレスの発散法は？",options:[{label:"🏃 運動・体を動かす",value:"A"},{label:"🎮 ゲーム・エンタメ",value:"B"},{label:"🍜 とにかく食べる",value:"C"},{label:"✍️ 日記や創作",value:"D"}]},
  {id:5,text:"友達からどんな人と言われる？",options:[{label:"😄 明るくてムードメーカー",value:"A"},{label:"🧠 頭が切れる",value:"B"},{label:"💛 優しくて癒し系",value:"C"},{label:"🎨 独特でおもしろい",value:"D"}]},
  {id:6,text:"お金の使い方の傾向は？",options:[{label:"✨ 体験・旅行に",value:"A"},{label:"📦 欲しいモノに即買い",value:"B"},{label:"💰 コツコツ貯金",value:"C"},{label:"🎁 人へのプレゼント",value:"D"}]},
  {id:7,text:"チームの中での役割は？",options:[{label:"🚀 率先してリード",value:"A"},{label:"🔍 分析・参謀タイプ",value:"B"},{label:"🤝 みんなをつなぐ",value:"C"},{label:"🎯 専門分野を極める",value:"D"}]},
  {id:8,text:"困難にぶつかったとき？",options:[{label:"💪 正面突破あるのみ",value:"A"},{label:"🧩 冷静に解決策を探す",value:"B"},{label:"🙏 誰かに頼る",value:"C"},{label:"😌 時間が解決すると待つ",value:"D"}]},
  {id:9,text:"もし動物に生まれ変わるなら？",options:[{label:"🦁 ライオン",value:"A"},{label:"🦊 キツネ",value:"B"},{label:"🐬 イルカ",value:"C"},{label:"🦋 チョウチョ",value:"D"}]},
  {id:10,text:"人生で最も大切にしているものは？",options:[{label:"❤️ 愛・人間関係",value:"A"},{label:"🏆 達成・成功",value:"B"},{label:"☮️ 平和・安定",value:"C"},{label:"🌏 自由・冒険",value:"D"}]},
  {id:11,text:"初めての場所に行くとき？",options:[{label:"🗺️ ノリで飛び込む",value:"A"},{label:"📱 事前にリサーチ",value:"B"},{label:"👫 誰かと一緒に",value:"C"},{label:"🌸 ゆっくり楽しむ",value:"D"}]},
  {id:12,text:"好きな季節は？",options:[{label:"☀️ 夏（熱くて活発）",value:"A"},{label:"🍂 秋（落ち着く）",value:"B"},{label:"🌸 春（新しい始まり）",value:"C"},{label:"❄️ 冬（静かで好き）",value:"D"}]},
  {id:13,text:"映画を選ぶなら？",options:[{label:"💥 アクション・冒険",value:"A"},{label:"🔍 ミステリー・サスペンス",value:"B"},{label:"😂 コメディ・恋愛",value:"C"},{label:"🎭 芸術・ドキュメンタリー",value:"D"}]},
  {id:14,text:"SNSの使い方は？",options:[{label:"📸 毎日バンバン投稿",value:"A"},{label:"👀 ほぼ見るだけ",value:"B"},{label:"💬 友達とのやりとり中心",value:"C"},{label:"🎨 こだわりの発信",value:"D"}]},
  {id:15,text:"怒りを感じるのはどんな時？",options:[{label:"😤 不正やズルが許せない",value:"A"},{label:"🤔 非論理的な話をされた時",value:"B"},{label:"💔 大切な人を傷つけられた時",value:"C"},{label:"😶 自由を制限された時",value:"D"}]},
  {id:16,text:"夢の中によく出てくるのは？",options:[{label:"🏆 戦い・挑戦のシーン",value:"A"},{label:"🌀 不思議な迷宮や謎",value:"B"},{label:"👥 懐かしい人たちとの場面",value:"C"},{label:"🌌 宇宙や広大な景色",value:"D"}]},
  {id:17,text:"好きな食べ物のジャンルは？",options:[{label:"🍖 肉！がっつり系",value:"A"},{label:"🍣 和食・繊細な味",value:"B"},{label:"🍰 甘いもの全般",value:"C"},{label:"🌍 エスニック・変わり種",value:"D"}]},
  {id:18,text:"仕事・勉強のスタイルは？",options:[{label:"🔥 締め切り前に一気に",value:"A"},{label:"📅 計画通りコツコツ",value:"B"},{label:"🤝 みんなと協力して",value:"C"},{label:"🎵 気分が乗った時にやる",value:"D"}]},
  {id:19,text:"理想のデートは？",options:[{label:"🎢 テーマパークで大興奮",value:"A"},{label:"🍷 静かなレストランで語り合う",value:"B"},{label:"🎬 映画→カフェのゆったりコース",value:"C"},{label:"🌄 ドライブで自然を満喫",value:"D"}]},
  {id:20,text:"財布を落としたらどうする？",options:[{label:"😤 即行動！手当たり次第に探す",value:"A"},{label:"🧩 冷静に最後の記憶を辿る",value:"B"},{label:"😢 まず誰かに話す",value:"C"},{label:"😮‍💨 諦めてカードを止める",value:"D"}]},
  {id:21,text:"子供の頃の遊びといえば？",options:[{label:"⚽ スポーツ・体を動かす遊び",value:"A"},{label:"🧪 実験・工作・ものづくり",value:"B"},{label:"🎭 ごっこ遊び・劇",value:"C"},{label:"📖 本・ゲーム・一人の世界",value:"D"}]},
  {id:22,text:"旅行に行くなら？",options:[{label:"🌋 アクティビティ満載の旅",value:"A"},{label:"🏛️ 歴史・文化を学ぶ旅",value:"B"},{label:"🏖️ リゾートでのんびり",value:"C"},{label:"🗺️ 計画なしの一人旅",value:"D"}]},
  {id:23,text:"もし魔法が使えるなら？",options:[{label:"⚡ 敵を倒す強い攻撃魔法",value:"A"},{label:"🔮 未来を知る予知魔法",value:"B"},{label:"✨ 誰でも癒せる回復魔法",value:"C"},{label:"🌀 自由に移動できる魔法",value:"D"}]},
  {id:24,text:"人から相談されるのはどんな内容？",options:[{label:"💡 仕事・目標の悩み",value:"A"},{label:"🧠 複雑な問題の解決策",value:"B"},{label:"💔 人間関係・恋愛の悩み",value:"C"},{label:"🎯 人生・生き方の悩み",value:"D"}]},
  {id:25,text:"あなたの笑いのツボは？",options:[{label:"😂 リアクション芸・ボケ",value:"A"},{label:"🤓 知的なウィット・言葉遊び",value:"B"},{label:"🌸 ほっこり系・かわいい笑い",value:"C"},{label:"🎭 シュール・不思議な笑い",value:"D"}]},
  {id:26,text:"本棚にありそうな本は？",options:[{label:"📈 自己啓発・ビジネス書",value:"A"},{label:"🔬 科学・哲学・専門書",value:"B"},{label:"💕 恋愛小説・エッセイ",value:"C"},{label:"🗺️ 旅行記・冒険小説",value:"D"}]},
  {id:27,text:"あなたの口癖に近いのは？",options:[{label:"「絶対やる！」",value:"A"},{label:"「なるほど…」",value:"B"},{label:"「大丈夫？」",value:"C"},{label:"「面白いな〜」",value:"D"}]},
  {id:28,text:"10年後の自分に最も近いのは？",options:[{label:"🏆 大きな成果を出している",value:"A"},{label:"🔬 専門性を極めた達人",value:"B"},{label:"🏡 愛する人と穏やかに",value:"C"},{label:"🌍 世界を旅している",value:"D"}]},
  {id:29,text:"大事な場面で緊張したら？",options:[{label:"💪 気合いで乗り切る",value:"A"},{label:"📋 事前準備で心を落ち着かせる",value:"B"},{label:"🙏 誰かの顔を思い浮かべる",value:"C"},{label:"🌬️ 深呼吸して流れに任せる",value:"D"}]},
  {id:30,text:"あなたにとって「幸せ」とは？",options:[{label:"🔥 情熱を燃やし続けること",value:"A"},{label:"💡 真実を探求すること",value:"B"},{label:"🤗 大切な人と笑い合うこと",value:"C"},{label:"🦋 自分らしくいること",value:"D"}]},
];

const POKEMON_LIST_FOR_PROMPT = POKEMON_151.map(p=>`${p.id}:${p.name}(${p.types.join(",")})`).join(", ");

// PokeSprite — 直接imgタグ + 4段フォールバック（fetch不使用）
// タイプ別SVGポケモンイラスト（CSP制限対応 — 外部画像不使用）
const TYPE_EMOJI = {
  fire:"🔥",water:"💧",grass:"🌿",electric:"⚡",psychic:"🔮",
  ice:"❄️",dragon:"🐉",ghost:"👻",normal:"⭐",flying:"🦅",
  bug:"🦋",poison:"☠️",ground:"🌍",rock:"🪨",fighting:"👊",steel:"⚙️",
};

// タイプごとのSVGキャラクター（簡易イラスト）
function TypeSVG({ type, size }) {
  const s = size;
  const configs = {
    fire: { bg:["#7c2d12","#ea580c"], body:"#f97316", detail:"#fde68a",
      svg: (s) => <>
        <ellipse cx={s*.5} cy={s*.62} rx={s*.28} ry={s*.24} fill="#f97316"/>
        <ellipse cx={s*.5} cy={s*.58} rx={s*.22} ry={s*.19} fill="#fb923c"/>
        {/* 炎の揺らぎ */}
        <path d={`M${s*.5},${s*.18} C${s*.42},${s*.28} ${s*.35},${s*.22} ${s*.38},${s*.35} C${s*.3},${s*.3} ${s*.28},${s*.42} ${s*.36},${s*.48} C${s*.3},${s*.52} ${s*.32},${s*.6} ${s*.44},${s*.62} L${s*.56},${s*.62} C${s*.68},${s*.6} ${s*.7},${s*.52} ${s*.64},${s*.48} C${s*.72},${s*.42} ${s*.7},${s*.3} ${s*.62},${s*.35} C${s*.65},${s*.22} ${s*.58},${s*.28} ${s*.5},${s*.18}Z`} fill="#fbbf24"/>
        <path d={`M${s*.5},${s*.28} C${s*.45},${s*.35} ${s*.42},${s*.32} ${s*.44},${s*.42} C${s*.4},${s*.44} ${s*.42},${s*.54} ${s*.5},${s*.55} C${s*.58},${s*.54} ${s*.6},${s*.44} ${s*.56},${s*.42} C${s*.58},${s*.32} ${s*.55},${s*.35} ${s*.5},${s*.28}Z`} fill="#fef3c7"/>
        {/* 目 */}
        <circle cx={s*.43} cy={s*.58} r={s*.035} fill="#1a0a00"/>
        <circle cx={s*.57} cy={s*.58} r={s*.035} fill="#1a0a00"/>
        <circle cx={s*.445} cy={s*.572} r={s*.012} fill="white"/>
        <circle cx={s*.585} cy={s*.572} r={s*.012} fill="white"/>
        {/* 足 */}
        <ellipse cx={s*.42} cy={s*.82} rx={s*.07} ry={s*.05} fill="#ea580c"/>
        <ellipse cx={s*.58} cy={s*.82} rx={s*.07} ry={s*.05} fill="#ea580c"/>
      </>
    },
    water: { bg:["#1e3a5f","#2563eb"], body:"#3b82f6", detail:"#bfdbfe",
      svg: (s) => <>
        <ellipse cx={s*.5} cy={s*.6} rx={s*.26} ry={s*.26} fill="#3b82f6"/>
        {/* しっぽ */}
        <path d={`M${s*.72},${s*.5} Q${s*.85},${s*.38} ${s*.8},${s*.28} Q${s*.78},${s*.42} ${s*.74},${s*.48}Z`} fill="#2563eb"/>
        <path d={`M${s*.72},${s*.6} Q${s*.87},${s*.65} ${s*.82},${s*.75} Q${s*.76},${s*.65} ${s*.73},${s*.62}Z`} fill="#2563eb"/>
        {/* 腹 */}
        <ellipse cx={s*.48} cy={s*.62} rx={s*.17} ry={s*.18} fill="#93c5fd"/>
        {/* ヒレ */}
        <path d={`M${s*.3},${s*.52} Q${s*.18},${s*.44} ${s*.22},${s*.35} Q${s*.28},${s*.45} ${s*.33},${s*.5}Z`} fill="#2563eb"/>
        {/* 目 */}
        <circle cx={s*.44} cy={s*.54} r={s*.045} fill="white"/>
        <circle cx={s*.44} cy={s*.54} r={s*.028} fill="#1e3a5f"/>
        <circle cx={s*.452} cy={s*.532} r={s*.01} fill="white"/>
        {/* くちばし */}
        <path d={`M${s*.38},${s*.62} L${s*.34},${s*.65} L${s*.38},${s*.67}Z`} fill="#fbbf24"/>
      </>
    },
    grass: { bg:["#14532d","#16a34a"], body:"#22c55e", detail:"#bbf7d0",
      svg: (s) => <>
        {/* 葉っぱ */}
        <path d={`M${s*.5},${s*.15} C${s*.65},${s*.2} ${s*.75},${s*.35} ${s*.65},${s*.5} C${s*.55},${s*.42} ${s*.5},${s*.35} ${s*.5},${s*.15}Z`} fill="#16a34a"/>
        <path d={`M${s*.5},${s*.15} C${s*.35},${s*.2} ${s*.25},${s*.35} ${s*.35},${s*.5} C${s*.45},${s*.42} ${s*.5},${s*.35} ${s*.5},${s*.15}Z`} fill="#15803d"/>
        <path d={`M${s*.5},${s*.22} C${s*.62},${s*.28} ${s*.68},${s*.4} ${s*.6},${s*.5} C${s*.54},${s*.44} ${s*.5},${s*.38} ${s*.5},${s*.22}Z`} fill="#4ade80"/>
        {/* 体 */}
        <ellipse cx={s*.5} cy={s*.64} rx={s*.24} ry={s*.22} fill="#22c55e"/>
        <ellipse cx={s*.5} cy={s*.66} rx={s*.17} ry={s*.15} fill="#86efac"/>
        {/* 目 */}
        <circle cx={s*.43} cy={s*.6} r={s*.038} fill="#052e16"/>
        <circle cx={s*.57} cy={s*.6} r={s*.038} fill="#052e16"/>
        <circle cx={s*.442} cy={s*.592} r={s*.012} fill="white"/>
        <circle cx={s*.582} cy={s*.592} r={s*.012} fill="white"/>
        {/* 足 */}
        <ellipse cx={s*.41} cy={s*.84} rx={s*.065} ry={s*.045} fill="#16a34a"/>
        <ellipse cx={s*.59} cy={s*.84} rx={s*.065} ry={s*.045} fill="#16a34a"/>
      </>
    },
    electric: { bg:["#713f12","#ca8a04"], body:"#eab308", detail:"#fef9c3",
      svg: (s) => <>
        {/* 耳 */}
        <path d={`M${s*.32},${s*.35} L${s*.26},${s*.18} L${s*.42},${s*.32}Z`} fill="#eab308"/>
        <path d={`M${s*.68},${s*.35} L${s*.74},${s*.18} L${s*.58},${s*.32}Z`} fill="#eab308"/>
        <path d={`M${s*.32},${s*.33} L${s*.28},${s*.22} L${s*.39},${s*.31}Z`} fill="#dc2626"/>
        <path d={`M${s*.68},${s*.33} L${s*.72},${s*.22} L${s*.61},${s*.31}Z`} fill="#dc2626"/>
        {/* 体 */}
        <ellipse cx={s*.5} cy={s*.57} rx={s*.26} ry={s*.23} fill="#eab308"/>
        {/* ほっぺ */}
        <circle cx={s*.35} cy={s*.61} r={s*.07} fill="#f43f5e" opacity="0.85"/>
        <circle cx={s*.65} cy={s*.61} r={s*.07} fill="#f43f5e" opacity="0.85"/>
        {/* 目 */}
        <circle cx={s*.42} cy={s*.52} r={s*.042} fill="#1a0a00"/>
        <circle cx={s*.58} cy={s*.52} r={s*.042} fill="#1a0a00"/>
        <circle cx={s*.432} cy={s*.51} r={s*.013} fill="white"/>
        <circle cx={s*.592} cy={s*.51} r={s*.013} fill="white"/>
        {/* 口 */}
        <path d={`M${s*.44},${s*.65} Q${s*.5},${s*.69} ${s*.56},${s*.65}`} stroke="#1a0a00" strokeWidth={s*.018} fill="none" strokeLinecap="round"/>
        {/* しっぽ稲妻 */}
        <path d={`M${s*.72},${s*.45} L${s*.82},${s*.32} L${s*.76},${s*.36} L${s*.86},${s*.22} L${s*.74},${s*.38} L${s*.8},${s*.35}Z`} fill="#eab308"/>
      </>
    },
    psychic: { bg:["#4a1942","#9d174d"], body:"#ec4899", detail:"#fce7f3",
      svg: (s) => <>
        {/* 体 */}
        <ellipse cx={s*.5} cy={s*.58} rx={s*.27} ry={s*.25} fill="#ec4899"/>
        {/* 水晶 */}
        <path d={`M${s*.5},${s*.18} L${s*.56},${s*.34} L${s*.5},${s*.38} L${s*.44},${s*.34}Z`} fill="#f9a8d4" opacity="0.9"/>
        <path d={`M${s*.5},${s*.18} L${s*.44},${s*.34} L${s*.5},${s*.28}Z`} fill="#fbcfe8"/>
        {/* 目 */}
        <ellipse cx={s*.42} cy={s*.54} rx={s*.055} ry={s*.065} fill="white"/>
        <ellipse cx={s*.58} cy={s*.54} rx={s*.055} ry={s*.065} fill="white"/>
        <ellipse cx={s*.42} cy={s*.55} rx={s*.032} ry={s*.04} fill="#7e22ce"/>
        <ellipse cx={s*.58} cy={s*.55} rx={s*.032} ry={s*.04} fill="#7e22ce"/>
        <circle cx={s*.43} cy={s*.545} r={s*.012} fill="white"/>
        <circle cx={s*.59} cy={s*.545} r={s*.012} fill="white"/>
        {/* 模様 */}
        <path d={`M${s*.36},${s*.64} Q${s*.5},${s*.72} ${s*.64},${s*.64}`} stroke="#be185d" strokeWidth={s*.02} fill="none"/>
        {/* 足 */}
        <ellipse cx={s*.4} cy={s*.82} rx={s*.07} ry={s*.05} fill="#db2777"/>
        <ellipse cx={s*.6} cy={s*.82} rx={s*.07} ry={s*.05} fill="#db2777"/>
      </>
    },
    ghost: { bg:["#1e1b4b","#4338ca"], body:"#8b5cf6", detail:"#ede9fe",
      svg: (s) => <>
        {/* ゴースト形 */}
        <path d={`M${s*.28},${s*.78} Q${s*.28},${s*.4} ${s*.5},${s*.35} Q${s*.72},${s*.4} ${s*.72},${s*.78} Q${s*.64},${s*.72} ${s*.56},${s*.78} Q${s*.5},${s*.72} ${s*.44},${s*.78} Q${s*.36},${s*.72} ${s*.28},${s*.78}Z`} fill="#8b5cf6"/>
        {/* 目 */}
        <ellipse cx={s*.41} cy={s*.58} rx={s*.062} ry={s*.075} fill="white"/>
        <ellipse cx={s*.59} cy={s*.58} rx={s*.062} ry={s*.075} fill="white"/>
        <ellipse cx={s*.415} cy={s*.592} rx={s*.038} ry={s*.048} fill="#1e1b4b"/>
        <ellipse cx={s*.595} cy={s*.592} rx={s*.038} ry={s*.048} fill="#1e1b4b"/>
        <circle cx={s*.427} cy={s*.585} r={s*.013} fill="white"/>
        <circle cx={s*.607} cy={s*.585} r={s*.013} fill="white"/>
        {/* 口 */}
        <path d={`M${s*.42},${s*.68} Q${s*.46},${s*.72} ${s*.5},${s*.69} Q${s*.54},${s*.72} ${s*.58},${s*.68}`} stroke="white" strokeWidth={s*.018} fill="none" strokeLinecap="round"/>
      </>
    },
    dragon: { bg:["#1e1b4b","#7c3aed"], body:"#6366f1", detail:"#c7d2fe",
      svg: (s) => <>
        {/* 翼 */}
        <path d={`M${s*.3},${s*.5} C${s*.15},${s*.35} ${s*.1},${s*.22} ${s*.2},${s*.18} C${s*.25},${s*.28} ${s*.28},${s*.4} ${s*.34},${s*.48}Z`} fill="#4f46e5"/>
        <path d={`M${s*.7},${s*.5} C${s*.85},${s*.35} ${s*.9},${s*.22} ${s*.8},${s*.18} C${s*.75},${s*.28} ${s*.72},${s*.4} ${s*.66},${s*.48}Z`} fill="#4f46e5"/>
        {/* 体 */}
        <ellipse cx={s*.5} cy={s*.59} rx={s*.24} ry={s*.27} fill="#6366f1"/>
        {/* 腹 */}
        <path d={`M${s*.44},${s*.5} Q${s*.5},${s*.78} ${s*.56},${s*.5} Q${s*.52},${s*.48} ${s*.5},${s*.49} Q${s*.48},${s*.48} ${s*.44},${s*.5}Z`} fill="#a5b4fc"/>
        {/* 頭 */}
        <ellipse cx={s*.5} cy={s*.38} rx={s*.18} ry={s*.16} fill="#6366f1"/>
        {/* 角 */}
        <path d={`M${s*.44},${s*.26} L${s*.4},${s*.15} L${s*.47},${s*.25}Z`} fill="#c084fc"/>
        <path d={`M${s*.56},${s*.26} L${s*.6},${s*.15} L${s*.53},${s*.25}Z`} fill="#c084fc"/>
        {/* 目 */}
        <ellipse cx={s*.43} cy={s*.38} rx={s*.038} ry={s*.042} fill="#fbbf24"/>
        <ellipse cx={s*.57} cy={s*.38} rx={s*.038} ry={s*.042} fill="#fbbf24"/>
        <circle cx={s*.43} cy={s*.382} r={s*.018} fill="#1e1b4b"/>
        <circle cx={s*.57} cy={s*.382} r={s*.018} fill="#1e1b4b"/>
      </>
    },
    ice: { bg:["#0c4a6e","#0284c7"], body:"#7dd3fc", detail:"#f0f9ff",
      svg: (s) => <>
        {/* 体 */}
        <ellipse cx={s*.5} cy={s*.58} rx={s*.26} ry={s*.24} fill="#7dd3fc"/>
        {/* 氷の結晶 */}
        {[0,60,120,180,240,300].map(deg => {
          const rad = deg * Math.PI / 180;
          const x1 = s*.5 + Math.cos(rad)*s*.12;
          const y1 = s*.28 + Math.sin(rad)*s*.12;
          const x2 = s*.5 + Math.cos(rad)*s*.22;
          const y2 = s*.28 + Math.sin(rad)*s*.22;
          return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#e0f2fe" strokeWidth={s*.018} strokeLinecap="round"/>;
        })}
        <circle cx={s*.5} cy={s*.28} r={s*.04} fill="white"/>
        {/* 目 */}
        <circle cx={s*.42} cy={s*.56} r={s*.042} fill="#0c4a6e"/>
        <circle cx={s*.58} cy={s*.56} r={s*.042} fill="#0c4a6e"/>
        <circle cx={s*.432} cy={s*.552} r={s*.014} fill="white"/>
        <circle cx={s*.592} cy={s*.552} r={s*.014} fill="white"/>
        {/* 口 */}
        <path d={`M${s*.44},${s*.65} Q${s*.5},${s*.69} ${s*.56},${s*.65}`} stroke="#0c4a6e" strokeWidth={s*.018} fill="none" strokeLinecap="round"/>
        {/* 足 */}
        <ellipse cx={s*.4} cy={s*.8} rx={s*.07} ry={s*.045} fill="#38bdf8"/>
        <ellipse cx={s*.6} cy={s*.8} rx={s*.07} ry={s*.045} fill="#38bdf8"/>
      </>
    },
    fighting: { bg:["#450a0a","#b91c1c"], body:"#ef4444", detail:"#fee2e2",
      svg: (s) => <>
        {/* 体（筋肉質） */}
        <ellipse cx={s*.5} cy={s*.57} rx={s*.28} ry={s*.26} fill="#ef4444"/>
        {/* 腕 */}
        <ellipse cx={s*.26} cy={s*.55} rx={s*.1} ry={s*.14} fill="#dc2626" transform={`rotate(-20,${s*.26},${s*.55})`}/>
        <ellipse cx={s*.74} cy={s*.55} rx={s*.1} ry={s*.14} fill="#dc2626" transform={`rotate(20,${s*.74},${s*.55})`}/>
        {/* 腹 */}
        <ellipse cx={s*.5} cy={s*.6} rx={s*.16} ry={s*.12} fill="#fca5a5"/>
        {/* 頭 */}
        <ellipse cx={s*.5} cy={s*.38} rx={s*.2} ry={s*.18} fill="#ef4444"/>
        {/* 目（怒り） */}
        <path d={`M${s*.36},${s*.34} L${s*.44},${s*.38}`} stroke="#7f1d1d" strokeWidth={s*.025} strokeLinecap="round"/>
        <path d={`M${s*.64},${s*.34} L${s*.56},${s*.38}`} stroke="#7f1d1d" strokeWidth={s*.025} strokeLinecap="round"/>
        <circle cx={s*.41} cy={s*.4} r={s*.038} fill="#7f1d1d"/>
        <circle cx={s*.59} cy={s*.4} r={s*.038} fill="#7f1d1d"/>
        {/* 口（歯） */}
        <path d={`M${s*.42},${s*.47} Q${s*.5},${s*.52} ${s*.58},${s*.47}`} stroke="#7f1d1d" strokeWidth={s*.018} fill="none"/>
      </>
    },
    poison: { bg:["#3b0764","#7e22ce"], body:"#a855f7", detail:"#f3e8ff",
      svg: (s) => <>
        {/* 体 */}
        <ellipse cx={s*.5} cy={s*.6} rx={s*.26} ry={s*.24} fill="#a855f7"/>
        {/* 毒の泡 */}
        <circle cx={s*.5} cy={s*.28} r={s*.09} fill="#c084fc" opacity="0.8"/>
        <circle cx={s*.37} cy={s*.33} r={s*.055} fill="#d8b4fe" opacity="0.7"/>
        <circle cx={s*.63} cy={s*.33} r={s*.055} fill="#d8b4fe" opacity="0.7"/>
        {/* 腹 */}
        <ellipse cx={s*.5} cy={s*.62} rx={s*.17} ry={s*.15} fill="#c084fc"/>
        {/* 目 */}
        <circle cx={s*.41} cy={s*.57} r={s*.045} fill="#3b0764"/>
        <circle cx={s*.59} cy={s*.57} r={s*.045} fill="#3b0764"/>
        <circle cx={s*.422} cy={s*.562} r={s*.015} fill="white"/>
        <circle cx={s*.602} cy={s*.562} r={s*.015} fill="white"/>
        {/* 口 */}
        <path d={`M${s*.42},${s*.67} Q${s*.5},${s*.72} ${s*.58},${s*.67}`} stroke="#6b21a8" strokeWidth={s*.02} fill="none" strokeLinecap="round"/>
        {/* 足 */}
        <ellipse cx={s*.4} cy={s*.82} rx={s*.065} ry={s*.045} fill="#9333ea"/>
        <ellipse cx={s*.6} cy={s*.82} rx={s*.065} ry={s*.045} fill="#9333ea"/>
      </>
    },
    normal: { bg:["#374151","#6b7280"], body:"#9ca3af", detail:"#f9fafb",
      svg: (s) => <>
        {/* 体 */}
        <ellipse cx={s*.5} cy={s*.58} rx={s*.27} ry={s*.25} fill="#9ca3af"/>
        <ellipse cx={s*.5} cy={s*.6} rx={s*.18} ry={s*.16} fill="#d1d5db"/>
        {/* 耳 */}
        <ellipse cx={s*.35} cy={s*.36} rx={s*.08} ry={s*.12} fill="#9ca3af"/>
        <ellipse cx={s*.65} cy={s*.36} rx={s*.08} ry={s*.12} fill="#9ca3af"/>
        <ellipse cx={s*.35} cy={s*.37} rx={s*.04} ry={s*.07} fill="#f9a8d4"/>
        <ellipse cx={s*.65} cy={s*.37} rx={s*.04} ry={s*.07} fill="#f9a8d4"/>
        {/* 目 */}
        <circle cx={s*.41} cy={s*.55} r={s*.042} fill="#111827"/>
        <circle cx={s*.59} cy={s*.55} r={s*.042} fill="#111827"/>
        <circle cx={s*.422} cy={s*.542} r={s*.014} fill="white"/>
        <circle cx={s*.602} cy={s*.542} r={s*.014} fill="white"/>
        {/* 鼻 */}
        <ellipse cx={s*.5} cy={s*.62} rx={s*.03} ry={s*.02} fill="#6b7280"/>
        {/* 口 */}
        <path d={`M${s*.44},${s*.66} Q${s*.5},${s*.70} ${s*.56},${s*.66}`} stroke="#4b5563" strokeWidth={s*.015} fill="none" strokeLinecap="round"/>
        <ellipse cx={s*.41} cy={s*.82} rx={s*.065} ry={s*.045} fill="#6b7280"/>
        <ellipse cx={s*.59} cy={s*.82} rx={s*.065} ry={s*.045} fill="#6b7280"/>
      </>
    },
    flying: { bg:["#1e3a5f","#1d4ed8"], body:"#93c5fd", detail:"#eff6ff",
      svg: (s) => <>
        {/* 翼 */}
        <path d={`M${s*.5},${s*.52} C${s*.35},${s*.42} ${s*.15},${s*.38} ${s*.12},${s*.28} C${s*.2},${s*.35} ${s*.32},${s*.45} ${s*.44},${s*.52}Z`} fill="#3b82f6"/>
        <path d={`M${s*.5},${s*.52} C${s*.65},${s*.42} ${s*.85},${s*.38} ${s*.88},${s*.28} C${s*.8},${s*.35} ${s*.68},${s*.45} ${s*.56},${s*.52}Z`} fill="#3b82f6"/>
        <path d={`M${s*.5},${s*.52} C${s*.38},${s*.46} ${s*.22},${s*.48} ${s*.2},${s*.4} C${s*.28},${s*.46} ${s*.4},${s*.5} ${s*.48},${s*.52}Z`} fill="#60a5fa"/>
        <path d={`M${s*.5},${s*.52} C${s*.62},${s*.46} ${s*.78},${s*.48} ${s*.8},${s*.4} C${s*.72},${s*.46} ${s*.6},${s*.5} ${s*.52},${s*.52}Z`} fill="#60a5fa"/>
        {/* 体 */}
        <ellipse cx={s*.5} cy={s*.6} rx={s*.18} ry={s*.22} fill="#93c5fd"/>
        <ellipse cx={s*.5} cy={s*.63} rx={s*.11} ry={s*.14} fill="#dbeafe"/>
        {/* 目 */}
        <circle cx={s*.43} cy={s*.55} r={s*.038} fill="#1e3a5f"/>
        <circle cx={s*.57} cy={s*.55} r={s*.038} fill="#1e3a5f"/>
        <circle cx={s*.442} cy={s*.542} r={s*.012} fill="white"/>
        <circle cx={s*.582} cy={s*.542} r={s*.012} fill="white"/>
        {/* くちばし */}
        <path d={`M${s*.46},${s*.62} L${s*.5},${s*.67} L${s*.54},${s*.62}Z`} fill="#fbbf24"/>
      </>
    },
    bug: { bg:["#14532d","#365314"], body:"#84cc16", detail:"#ecfccb",
      svg: (s) => <>
        {/* 触角 */}
        <path d={`M${s*.42},${s*.28} Q${s*.36},${s*.18} ${s*.32},${s*.14}`} stroke="#4d7c0f" strokeWidth={s*.018} fill="none" strokeLinecap="round"/>
        <path d={`M${s*.58},${s*.28} Q${s*.64},${s*.18} ${s*.68},${s*.14}`} stroke="#4d7c0f" strokeWidth={s*.018} fill="none" strokeLinecap="round"/>
        <circle cx={s*.32} cy={s*.14} r={s*.025} fill="#65a30d"/>
        <circle cx={s*.68} cy={s*.14} r={s*.025} fill="#65a30d"/>
        {/* 体（3セグメント） */}
        <ellipse cx={s*.5} cy={s*.35} rx={s*.15} ry={s*.13} fill="#84cc16"/>
        <ellipse cx={s*.5} cy={s*.55} rx={s*.2} ry={s*.18} fill="#65a30d"/>
        <ellipse cx={s*.5} cy={s*.73} rx={s*.14} ry={s*.12} fill="#4d7c0f"/>
        {/* 目 */}
        <circle cx={s*.42} cy={s*.33} r={s*.038} fill="#1a2e05"/>
        <circle cx={s*.58} cy={s*.33} r={s*.038} fill="#1a2e05"/>
        <circle cx={s*.432} cy={s*.322} r={s*.013} fill="white"/>
        <circle cx={s*.592} cy={s*.322} r={s*.013} fill="white"/>
        {/* 脚 */}
        {[-1,0,1].map(i => <>
          <line key={`l${i}`} x1={s*.32} y1={s*(.52+i*s*.06)} x2={s*.18} y2={s*(.48+i*s*.07)} stroke="#4d7c0f" strokeWidth={s*.015}/>
          <line key={`r${i}`} x1={s*.68} y1={s*(.52+i*s*.06)} x2={s*.82} y2={s*(.48+i*s*.07)} stroke="#4d7c0f" strokeWidth={s*.015}/>
        </>)}
      </>
    },
    ground: { bg:["#451a03","#92400e"], body:"#d97706", detail:"#fef3c7",
      svg: (s) => <>
        {/* 体 */}
        <ellipse cx={s*.5} cy={s*.6} rx={s*.28} ry={s*.24} fill="#d97706"/>
        {/* 土の模様 */}
        <path d={`M${s*.28},${s*.55} Q${s*.38},${s*.48} ${s*.5},${s*.52} Q${s*.62},${s*.48} ${s*.72},${s*.55}`} stroke="#b45309" strokeWidth={s*.02} fill="none"/>
        <path d={`M${s*.3},${s*.65} Q${s*.4},${s*.58} ${s*.5},${s*.62} Q${s*.6},${s*.58} ${s*.7},${s*.65}`} stroke="#b45309" strokeWidth={s*.02} fill="none"/>
        {/* 頭 */}
        <ellipse cx={s*.5} cy={s*.4} rx={s*.22} ry={s*.2} fill="#d97706"/>
        {/* 目 */}
        <circle cx={s*.41} cy={s*.39} r={s*.045} fill="#451a03"/>
        <circle cx={s*.59} cy={s*.39} r={s*.045} fill="#451a03"/>
        <circle cx={s*.422} cy={s*.382} r={s*.015} fill="white"/>
        <circle cx={s*.602} cy={s*.382} r={s*.015} fill="white"/>
        {/* 口 */}
        <path d={`M${s*.43},${s*.48} Q${s*.5},${s*.52} ${s*.57},${s*.48}`} stroke="#92400e" strokeWidth={s*.02} fill="none" strokeLinecap="round"/>
        {/* 足 */}
        <ellipse cx={s*.38} cy={s*.82} rx={s*.08} ry={s*.05} fill="#b45309"/>
        <ellipse cx={s*.62} cy={s*.82} rx={s*.08} ry={s*.05} fill="#b45309"/>
      </>
    },
    rock: { bg:["#1c1917","#57534e"], body:"#a8a29e", detail:"#fafaf9",
      svg: (s) => <>
        {/* 岩の体 */}
        <path d={`M${s*.28},${s*.72} L${s*.24},${s*.52} L${s*.35},${s*.38} L${s*.52},${s*.34} L${s*.68},${s*.4} L${s*.76},${s*.55} L${s*.7},${s*.72}Z`} fill="#a8a29e"/>
        <path d={`M${s*.32},${s*.68} L${s*.28},${s*.52} L${s*.38},${s*.42} L${s*.52},${s*.38} L${s*.64},${s*.44} L${s*.7},${s*.56} L${s*.66},${s*.68}Z`} fill="#d6d3d1"/>
        {/* 亀裂 */}
        <path d={`M${s*.45},${s*.42} L${s*.48},${s*.52} L${s*.44},${s*.6}`} stroke="#78716c" strokeWidth={s*.015} fill="none"/>
        <path d={`M${s*.55},${s*.44} L${s*.53},${s*.54} L${s*.57},${s*.62}`} stroke="#78716c" strokeWidth={s*.015} fill="none"/>
        {/* 目 */}
        <circle cx={s*.41} cy={s*.52} r={s*.04} fill="#1c1917"/>
        <circle cx={s*.59} cy={s*.52} r={s*.04} fill="#1c1917"/>
        <circle cx={s*.422} cy={s*.512} r={s*.013} fill="white"/>
        <circle cx={s*.602} cy={s*.512} r={s*.013} fill="white"/>
        {/* 口 */}
        <path d={`M${s*.44},${s*.62} L${s*.47},${s*.65} L${s*.53},${s*.65} L${s*.56},${s*.62}`} stroke="#57534e" strokeWidth={s*.018} fill="none" strokeLinecap="round"/>
      </>
    },
    steel: { bg:["#0f172a","#334155"], body:"#94a3b8", detail:"#f1f5f9",
      svg: (s) => <>
        {/* 体（金属） */}
        <ellipse cx={s*.5} cy={s*.58} rx={s*.27} ry={s*.25} fill="#94a3b8"/>
        {/* 光沢 */}
        <path d={`M${s*.36},${s*.42} Q${s*.5},${s*.38} ${s*.64},${s*.42} Q${s*.6},${s*.46} ${s*.5},${s*.44} Q${s*.4},${s*.46} ${s*.36},${s*.42}Z`} fill="rgba(255,255,255,0.35)"/>
        {/* ボルト */}
        <circle cx={s*.34} cy={s*.64} r={s*.04} fill="#64748b"/>
        <circle cx={s*.66} cy={s*.64} r={s*.04} fill="#64748b"/>
        <circle cx={s*.34} cy={s*.64} r={s*.02} fill="#cbd5e1"/>
        <circle cx={s*.66} cy={s*.64} r={s*.02} fill="#cbd5e1"/>
        {/* 目 */}
        <ellipse cx={s*.41} cy={s*.54} rx={s*.048} ry={s*.042} fill="#0f172a"/>
        <ellipse cx={s*.59} cy={s*.54} rx={s*.048} ry={s*.042} fill="#0f172a"/>
        <circle cx={s*.424} cy={s*.534} r={s*.016} fill="#7dd3fc"/>
        <circle cx={s*.604} cy={s*.534} r={s*.016} fill="#7dd3fc"/>
        {/* 口（スリット） */}
        <path d={`M${s*.42},${s*.65} L${s*.58},${s*.65}`} stroke="#475569" strokeWidth={s*.02} strokeLinecap="round"/>
      </>
    },
  };

  const cfg = configs[type] || configs.normal;
  const [bg1, bg2] = cfg.bg || ["#374151","#6b7280"];

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} style={{display:"block",overflow:"visible"}}>
      <defs>
        <radialGradient id={`bg-${type}`} cx="40%" cy="35%">
          <stop offset="0%" stopColor={bg2} stopOpacity="0.6"/>
          <stop offset="100%" stopColor={bg1} stopOpacity="0.2"/>
        </radialGradient>
      </defs>
      <circle cx={s*.5} cy={s*.5} r={s*.48} fill={`url(#bg-${type})`}/>
      {cfg.svg(s)}
    </svg>
  );
}

// PokeSprite — SVGイラスト表示（CSP対応）
function PokeSprite({ id, size = 96, float = false }) {
  const poke = POKEMON_151.find(p => p.id === id);
  const type = poke?.types?.[0] || "normal";
  const pad = String(id).padStart(3, "0");

  // 複数CDNを順番に試す
  const SRCS = [
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
    `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pad}.png`,
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
  ];

  const [srcIdx, setSrcIdx] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const failed = srcIdx >= SRCS.length;

  useEffect(() => { setSrcIdx(0); setLoaded(false); }, [id]);

  const typeColor = TYPE_COLORS[type] || "#9575CD";

  return (
    <div style={{
      width: size, height: size, flexShrink: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      animation: float ? "float 3s ease-in-out infinite" : undefined,
      filter: `drop-shadow(0 4px 24px ${typeColor}88)`,
      position: "relative",
    }}>
      {/* SVGキャラは常に下に表示（画像ロード中も見える） */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: loaded ? 0 : 1, transition: "opacity 0.3s",
      }}>
        <TypeSVG type={type} size={size}/>
      </div>
      {/* 本物イラスト */}
      {!failed && (
        <img
          key={`${id}-${srcIdx}`}
          src={SRCS[srcIdx]}
          alt={poke?.name || `pokemon-${id}`}
          style={{
            width: size, height: size, objectFit: "contain",
            opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease",
            position: "relative", zIndex: 1,
          }}
          onLoad={() => setLoaded(true)}
          onError={() => { setLoaded(false); setSrcIdx(i => i + 1); }}
        />
      )}
    </div>
  );
}


function Stars() {
  const [stars] = useState(() => Array.from({length:65},(_,i)=>({id:i,x:Math.random()*100,y:Math.random()*100,size:Math.random()*1.8+0.4,delay:Math.random()*4,dur:Math.random()*3+2})));
  return (
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>
      {stars.map(s=>(
        <div key={s.id} style={{position:"absolute",left:`${s.x}%`,top:`${s.y}%`,width:s.size,height:s.size,borderRadius:"50%",background:"white",opacity:0.5,animation:`twinkle ${s.dur}s ${s.delay}s infinite alternate`}}/>
      ))}
      <style>{`
        @keyframes twinkle{from{opacity:0.04}to{opacity:0.72}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes orb{0%,100%{transform:scale(1)}50%{transform:scale(1.18)}}
        @keyframes popIn{0%{transform:scale(0.4);opacity:0}65%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}
        @keyframes scanline{0%{top:-8%}100%{top:108%}}
      `}</style>
    </div>
  );
}

function Orbs() {
  return (
    <div style={{position:"fixed",inset:0,zIndex:0,overflow:"hidden",pointerEvents:"none"}}>
      {[
        {w:480,h:480,c:"rgba(139,92,246,0.28)",t:-90,l:-90,dur:9},
        {w:380,h:380,c:"rgba(236,72,153,0.2)",b:-70,r:-70,dur:11,dl:2},
        {w:280,h:280,c:"rgba(6,182,212,0.18)",t:"38%",r:"8%",dur:7,dl:1},
      ].map((o,i)=>(
        <div key={i} style={{position:"absolute",width:o.w,height:o.h,borderRadius:"50%",background:`radial-gradient(circle,${o.c} 0%,transparent 70%)`,top:o.t,left:o.l,bottom:o.b,right:o.r,animation:`orb ${o.dur}s ${o.dl||0}s ease-in-out infinite`}}/>
      ))}
    </div>
  );
}

function PokeBall({size=48,spinning=false}){
  return(
    <div style={{width:size,height:size,animation:spinning?"spin 1.4s linear infinite":"float 3s ease-in-out infinite"}}>
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2"/>
        <path d="M2,50 A48,48 0 0,1 98,50" fill="rgba(236,72,153,0.6)"/>
        <path d="M2,50 A48,48 0 0,0 98,50" fill="rgba(255,255,255,0.07)"/>
        <line x1="2" y1="50" x2="98" y2="50" stroke="rgba(255,255,255,0.35)" strokeWidth="2"/>
        <circle cx="50" cy="50" r="12" fill="rgba(20,5,40,0.85)" stroke="rgba(255,255,255,0.45)" strokeWidth="2"/>
        <circle cx="50" cy="50" r="6" fill="rgba(255,255,255,0.9)"/>
      </svg>
    </div>
  );
}

// パラメーターバー — 極端なメリハリで視覚化
function StatBar({ label, value, icon }) {
  const cfg =
    value >= 88 ? { color:"#4ade80", grade:"S+", glow:"0 0 18px #4ade80aa", barH:10, labelOp:1, textScale:1.1 } :
    value >= 75 ? { color:"#a3e635", grade:"S",  glow:"0 0 12px #a3e63566", barH:8,  labelOp:1, textScale:1 } :
    value >= 60 ? { color:"#fbbf24", grade:"A",  glow:"none",               barH:6,  labelOp:0.85, textScale:1 } :
    value >= 42 ? { color:"#fb923c", grade:"B",  glow:"none",               barH:5,  labelOp:0.7, textScale:1 } :
    value >= 25 ? { color:"#f87171", grade:"C",  glow:"none",               barH:4,  labelOp:0.55, textScale:1 } :
                  { color:"#9f7aea", grade:"D",  glow:"none",               barH:3,  labelOp:0.38, textScale:1 };

  const isTop = value >= 75;
  const isLow = value < 25;

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: 6 }}>
        <span style={{
          display:"flex", gap:6, alignItems:"center",
          fontSize: 12.5, fontWeight: isTop ? 700 : 400,
          color:`rgba(255,255,255,${cfg.labelOp})`,
        }}>
          <span style={{ fontSize:14, opacity: isLow ? 0.3 : 1 }}>{icon}</span>
          {label}
          {isLow && <span style={{ fontSize:9, color:"#9f7aea", opacity:0.65, marginLeft:2 }}>（苦手）</span>}
        </span>
        <div style={{ display:"flex", gap:6, alignItems:"center" }}>
          {isTop && (
            <span style={{ fontSize:8, color:cfg.color, letterSpacing:1, animation:"pulse 1.2s ease-in-out infinite" }}>
              ▲STRONG
            </span>
          )}
          <span style={{
            fontSize:10, fontWeight:900, padding:"2px 8px", borderRadius:6,
            color: isTop ? "#050010" : cfg.color,
            background: isTop ? cfg.color : `${cfg.color}20`,
            border:`1px solid ${cfg.color}50`,
            boxShadow: isTop ? cfg.glow : "none",
          }}>{cfg.grade}</span>
          <span style={{
            fontWeight:900, fontSize: isTop ? 18 : 14,
            color: cfg.color, minWidth:32, textAlign:"right",
            textShadow: isTop ? cfg.glow : "none",
            opacity: isLow ? 0.6 : 1,
            transform:`scale(${cfg.textScale})`, display:"inline-block",
          }}>{value}</span>
        </div>
      </div>
      {/* バー背景 */}
      <div style={{ height: cfg.barH, background:"rgba(255,255,255,0.05)", borderRadius:4, overflow:"hidden", position:"relative" }}>
        <div style={{
          height:"100%", width:`${value}%`,
          background: isTop
            ? `linear-gradient(90deg,${cfg.color}66,${cfg.color},#ffffffcc)`
            : isLow
              ? `linear-gradient(90deg,${cfg.color}30,${cfg.color}55)`
              : `linear-gradient(90deg,${cfg.color}55,${cfg.color})`,
          borderRadius:4,
          boxShadow: isTop ? cfg.glow : "none",
          transition:"width 1.5s cubic-bezier(0.4,0,0.2,1)",
        }}/>
      </div>
    </div>
  );
}


// 相性カード
function CompatCard({ data, good, getTypes }) {
  const types = getTypes(data.pokemonId);
  const mainColor = good ? "#34d399" : "#f87171";
  const bgColor = good ? "rgba(52,211,153,0.08)" : "rgba(248,113,113,0.08)";
  const borderColor = good ? "rgba(52,211,153,0.3)" : "rgba(248,113,113,0.28)";

  return (
    <div style={{
      borderRadius:16, padding:"14px 12px", textAlign:"center",
      background:bgColor, border:`1px solid ${borderColor}`,
      display:"flex", flexDirection:"column", alignItems:"center", gap:6,
    }}>
      <div style={{
        width:64,height:64,borderRadius:"50%",
        background:`${TYPE_COLORS[types[0]]||"#9575CD"}1a`,
        border:`1.5px solid ${TYPE_COLORS[types[0]]||"#9575CD"}44`,
        display:"flex",alignItems:"center",justifyContent:"center",
      }}>
        <PokeSprite id={data.pokemonId} size={52}/>
      </div>
      <div style={{fontSize:12,fontWeight:800,color:mainColor}}>{data.pokemonName}</div>
      <div style={{display:"flex",gap:4,justifyContent:"center",flexWrap:"wrap"}}>
        {types.map(t=>(
          <span key={t} style={{fontSize:8,padding:"2px 6px",borderRadius:6,background:`${TYPE_COLORS[t]||"#888"}33`,color:TYPE_COLORS[t]||"#ccc",fontWeight:700}}>
            {TYPE_JP[t]||t}
          </span>
        ))}
      </div>
      <p style={{margin:0,fontSize:10.5,color:"rgba(255,255,255,0.62)",lineHeight:1.55,textAlign:"center"}}>{data.reason}</p>
    </div>
  );
}

export default function ShindanApp() {
  const [screen, setScreen] = useState("top");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [loadingIdx, setLoadingIdx] = useState(0);
  const [resultVisible, setResultVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const loadingMessages = [
    "あなたのオーラを解析中…","ポケモン図鑑と照合中…",
    "タイプ相性を計算中…","隠れた才能を発掘中…",
    "運命のポケモンを特定中…","最終判定を下しています…",
  ];

  useEffect(()=>{
    if(screen==="loading"){
      const t=setInterval(()=>setLoadingIdx(n=>(n+1)%loadingMessages.length),1000);
      return()=>clearInterval(t);
    }
  },[screen]);

  const handleAnswer = async (value) => {
    const newAns=[...answers,value];
    setAnswers(newAns);
    if(currentQ<QUESTIONS.length-1){setCurrentQ(currentQ+1);}
    else{setScreen("loading");await fetchResult(newAns);}
  };

  const fetchResult = async (ans) => {
    const summary = QUESTIONS.map((q,i)=>{
      const c=q.options.find(o=>o.value===ans[i]);
      return `Q${i+1}「${q.text}」→ ${c?.label??ans[i]}`;
    }).join("\n");

    const prompt = `あなたはポケモンマスターかつ心理分析の専門家です。30の診断回答から性格・価値観・行動パターンを深く分析し、初代151匹の中から最もふさわしいポケモンを選んでください。

【重要：ポケモン選択のルール】
- ゲンガー・ミュウツー・ピカチュウ・カイリュー・リザードンなどの有名・人気ポケモンに偏らないこと
- 回答内容を真剣に分析し、本当にその人の性格に合ったポケモンを選ぶこと
- コイキング・カビゴン・ラッタ・ヤドンなど地味なポケモンでも回答が合っていれば積極的に選ぶこと
- 151匹全てが選ばれる可能性があるよう、多様な選択をすること
- 回答パターンに応じた具体的な根拠でポケモンを選ぶこと

【初代151匹リスト】
${POKEMON_LIST_FOR_PROMPT}

【回答】
${summary}

以下のJSON形式のみで返答（マークダウン・説明文不要）:
{
  "pokemonId": 1〜151の整数,
  "pokemonName": "ポケモン名（日本語）",
  "tagline": "キャッチコピー（20文字以内）",
  "personality": "性格説明（120文字）",
  "strength": "最大の強み（50文字）",
  "weakness": "意外な弱点（50文字）",
  "love": "恋愛傾向（60文字）",
  "fortune2025": "2025年の運勢（60文字）",
  "goodCompatibility": [
    {"pokemonId": ID, "pokemonName": "名前", "reason": "理由（30文字）"},
    {"pokemonId": ID, "pokemonName": "名前", "reason": "理由（30文字）"},
    {"pokemonId": ID, "pokemonName": "名前", "reason": "理由（30文字）"}
  ],
  "badCompatibility": [
    {"pokemonId": ID, "pokemonName": "名前", "reason": "理由（30文字）"},
    {"pokemonId": ID, "pokemonName": "名前", "reason": "理由（30文字）"},
    {"pokemonId": ID, "pokemonName": "名前", "reason": "理由（30文字）"}
  ],
  "score": {"charm": 整数, "luck": 整数, "power": 整数, "love": 整数, "wisdom": 整数}
}

【scoreの絶対ルール】
・最高値と最低値の差を必ず50以上開けること
・得意（85〜98）と苦手（10〜30）を必ず1〜2項目ずつ作ること
・5項目が均一（60〜80台に固まる）は絶対禁止
・良い例: charm:94, luck:22, power:88, love:17, wisdom:65
・悪い例（禁止）: charm:74, luck:71, power:69, love:73, wisdom:76
`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1200,messages:[{role:"user",content:prompt}]}),
      });
      const data = await res.json();
      const text = data.content?.map(c=>c.text||"").join("")||"";
      const clean = text.replace(/```json|```/g,"").trim();
      setResult(JSON.parse(clean));
    } catch {
      setResult({
        pokemonId:94,pokemonName:"ゲンガー",
        tagline:"影から世界を操る策士",
        personality:"表面はユーモラスだが内側に深い計算がある。人の心を読む天才的な洞察力で、場の空気を自在にコントロールする。一度信じた相手には全力を尽くす。",
        strength:"人の心を読む洞察力と、予測不能な行動力",
        weakness:"疑い深くなりすぎて素直になれないことも",
        love:"駆け引きが好きで、なかなか本音を見せないが一途",
        fortune2025:"隠れた実力が表に出る年。チャンスは夜に訪れる",
        goodCompatibility:[
          {pokemonId:65,pokemonName:"フーディン",reason:"同じ知性派で互いの深みを理解し合える"},
          {pokemonId:121,pokemonName:"スターミー",reason:"謎めいた雰囲気が共鳴しコンビネーション抜群"},
          {pokemonId:149,pokemonName:"カイリュー",reason:"強者への敬意が生む最高のパートナーシップ"},
        ],
        badCompatibility:[
          {pokemonId:143,pokemonName:"カビゴン",reason:"マイペースすぎて行動の足を引っ張り合う"},
          {pokemonId:39,pokemonName:"プリン",reason:"無邪気さについていけずイライラしてしまう"},
          {pokemonId:35,pokemonName:"ピッピ",reason:"純粋さが自分の複雑な内面と真逆すぎる"},
        ],
        score:{charm:19,luck:55,power:91,love:38,wisdom:94},
      });
    }
    setScreen("result");
    setTimeout(()=>setResultVisible(true),80);
  };

  const getTypes = (id) => { const p=POKEMON_151.find(p=>p.id===id); return p?p.types:["normal"]; };
  const getMainColor = (types) => TYPE_COLORS[types?.[0]]||"#9575CD";
  const reset = () => { setScreen("top");setCurrentQ(0);setAnswers([]);setResult(null);setResultVisible(false); };
  const goBack = () => { if(currentQ === 0){ reset(); } else { setCurrentQ(q => q-1); setAnswers(a => a.slice(0,-1)); } };

  const [shareState, setShareState] = useState("idle"); // idle | capturing | done

  // ── html2canvas ロード ──
  const loadH2C = () => new Promise((res, rej) => {
    if (window.html2canvas) { res(window.html2canvas); return; }
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
    s.onload = () => res(window.html2canvas); s.onerror = rej;
    document.head.appendChild(s);
  });

  // ── 結果カードをキャプチャ → base64 + blob ──
  const captureCard = async () => {
    const card = document.getElementById("result-share-card");
    if (!card) throw new Error("card not found");
    const h2c = await loadH2C();
    const canvas = await h2c(card, {
      backgroundColor: "#0b001e", scale: 2,
      useCORS: true, allowTaint: true, logging: false,
    });
    const dataUrl = canvas.toDataURL("image/png");
    const blob = await new Promise(res => canvas.toBlob(res, "image/png"));
    return { dataUrl, blob };
  };

  const [shareModal, setShareModal] = useState(null);
  // shareModal = { dataUrl, blob, publicUrl, text } | null

  // ── SNSシェアボタンを押したとき ──
  // 1. 画像キャプチャ
  // 2. /api/upload-image に送って公開URL取得
  // 3. モーダル表示
  const openShareModal = async () => {
    if (!result) return;
    setShareState("capturing");
    try {
      const { dataUrl, blob } = await captureCard();
      const text = `🎮 私は「${result.pokemonName}タイプ」でした！\n「${result.tagline}」\n\n#ポケモン診断 #アナタ診断 #性格診断`;
      const base64 = dataUrl.split(",")[1];
      let publicUrl = null;
      try {
        const res = await fetch("/api/upload-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ base64, pokemonName: result.pokemonName }),
        });
        const data = await res.json();
        console.log("upload result:", data);
        publicUrl = data.url || null;
      } catch (e) { console.warn("upload failed:", e); }
      console.log("publicUrl:", publicUrl);
      setShareModal({ dataUrl, blob, publicUrl, text });
    } catch (e) { console.error(e); }
    setShareState("idle");
  };

  const postToX = () => {
    if (!shareModal) return;
    // text= にはメッセージ＋ハッシュタグだけ（URLを含めない）
    // url= にOGPページURLを別で渡す → Xが自動でt.co短縮＋カード表示
    const ogpUrl = shareModal.publicUrl
      ? `https://anata-shindan.vercel.app/api/ogp?img=${encodeURIComponent(shareModal.publicUrl)}&name=${encodeURIComponent(result.pokemonName)}&tag=${encodeURIComponent(result.tagline)}`
      : "https://anata-shindan.vercel.app";

    const tweetText = encodeURIComponent(shareModal.text);
    const tweetUrl  = encodeURIComponent(ogpUrl);
    window.open(
      `https://twitter.com/intent/post?text=${tweetText}&url=${tweetUrl}`,
      "_blank"
    );
    // PCは画像もDL（手動添付用）
    const a = document.createElement("a");
    a.href = shareModal.dataUrl; a.download = "anata-shindan.png"; a.click();
    setShareModal(null);
  };

  const postToLine = () => {
    if (!shareModal) return;
    const shareUrl = shareModal.publicUrl
      ? `https://anata-shindan.vercel.app/api/ogp?img=${encodeURIComponent(shareModal.publicUrl)}&name=${encodeURIComponent(result.pokemonName)}&tag=${encodeURIComponent(result.tagline)}`
      : "https://anata-shindan.vercel.app";
    const url = encodeURIComponent(shareUrl);
    const txt = encodeURIComponent(shareModal.text);
    window.open(`https://social-plugins.line.me/lineit/share?url=${url}&text=${txt}`, "_blank");
    const a = document.createElement("a");
    a.href = shareModal.dataUrl; a.download = "anata-shindan.png"; a.click();
    setShareModal(null);
  };

  // ── 画像だけ保存 ──
  const saveImage = () => {
    if (!shareModal) return;
    const a = document.createElement("a");
    a.href = shareModal.dataUrl; a.download = "anata-shindan.png"; a.click();
    setShareModal(null);
  };


  const base = {
    minHeight:"100vh",
    background:"linear-gradient(135deg,#080014 0%,#0b001e 50%,#06001a 100%)",
    fontFamily:"'Hiragino Kaku Gothic ProN','Noto Sans JP',sans-serif",
    color:"white",position:"relative",overflow:"hidden",
  };
  const glassCard = (ex={}) => ({
    background:"rgba(255,255,255,0.04)",
    border:"1px solid rgba(255,255,255,0.09)",
    borderRadius:18, padding:"16px 18px", ...ex,
  });

  /* ── TOP ── */
  if(screen==="top") return (
    <div style={base}><Orbs/><Stars/>
      <div style={{position:"relative",zIndex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",padding:24,textAlign:"center"}}>
        <PokeBall size={76}/>
        <div style={{fontSize:9,letterSpacing:7,color:"rgba(167,139,250,0.75)",margin:"14px 0 5px",textTransform:"uppercase"}}>Pokemon Personality Lab</div>
        <h1 style={{fontSize:"clamp(1.9rem,7.5vw,3rem)",fontWeight:900,margin:"0 0 5px",background:"linear-gradient(90deg,#fbbf24,#f97316,#e879f9,#a855f7,#38bdf8,#fbbf24)",backgroundSize:"300%",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",animation:"shimmer 4s linear infinite"}}>アナタ診断</h1>
        <p style={{fontSize:13,color:"rgba(255,255,255,0.5)",margin:"0 0 4px"}}>〜あなたは何タイプ？〜</p>
        <p style={{fontSize:11.5,color:"rgba(255,255,255,0.35)",maxWidth:270,lineHeight:1.75,marginBottom:28}}>30の質問からAIが初代151匹の中の<br/>あなたに最も近いポケモンを診断します</p>
        <div style={{display:"flex",gap:8,marginBottom:32,flexWrap:"wrap",justifyContent:"center"}}>
          {["🎮 ポケモンタイプ診断","💘 相性◎×3通り","🌟 2025運勢","💪 才能＆弱点"].map(t=>(
            <span key={t} style={{padding:"5px 13px",borderRadius:20,fontSize:11,background:"rgba(139,92,246,0.18)",border:"1px solid rgba(139,92,246,0.32)",color:"rgba(255,255,255,0.78)"}}>{t}</span>
          ))}
        </div>
        <button onClick={()=>setScreen("quiz")} style={{padding:"17px 50px",borderRadius:50,fontSize:16,fontWeight:800,cursor:"pointer",border:"none",background:"linear-gradient(135deg,#a855f7,#ec4899)",color:"white",boxShadow:"0 0 36px rgba(168,85,247,0.48)",animation:"pulse 2s ease-in-out infinite",letterSpacing:3}}>診断スタート！</button>
        <p style={{marginTop:14,fontSize:10,color:"rgba(255,255,255,0.2)"}}>全30問 • 所要時間 約3分</p>
      </div>
    </div>
  );

  /* ── QUIZ ── */
  if(screen==="quiz"){
    const q=QUESTIONS[currentQ];
    const progress=(currentQ/QUESTIONS.length)*100;
    return(
      <div style={base}><Orbs/><Stars/>
        <div style={{position:"relative",zIndex:1,display:"flex",flexDirection:"column",minHeight:"100vh",padding:"18px 18px 28px",maxWidth:500,margin:"0 auto"}}>
          <div style={{paddingTop:14,marginBottom:20}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"rgba(255,255,255,0.38)",marginBottom:5}}>
              <span>Q {currentQ+1} / {QUESTIONS.length}</span><span>{Math.round(progress)}%</span>
            </div>
            <div style={{height:3,background:"rgba(255,255,255,0.07)",borderRadius:2,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${progress}%`,background:"linear-gradient(90deg,#a855f7,#ec4899)",transition:"width 0.3s ease",borderRadius:2}}/>
            </div>
          </div>
          <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center"}}>
            <div style={{...glassCard({padding:"20px 18px",marginBottom:16,textAlign:"center",animation:"fadeUp 0.3s ease",borderColor:"rgba(139,92,246,0.28)",background:"rgba(139,92,246,0.09)"})}}>
              <div style={{fontSize:9,letterSpacing:4,color:"rgba(167,139,250,0.65)",marginBottom:9,textTransform:"uppercase"}}>Q{currentQ+1}</div>
              <p style={{fontSize:"clamp(0.95rem,3.6vw,1.18rem)",fontWeight:700,lineHeight:1.65,margin:0}}>{q.text}</p>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
              {q.options.map((opt,i)=>(
                <button key={opt.value} onClick={()=>handleAnswer(opt.value)}
                  style={{padding:"14px 10px",borderRadius:13,cursor:"pointer",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",color:"white",fontSize:12.5,fontWeight:600,lineHeight:1.45,transition:"all 0.16s",animation:`fadeUp 0.3s ${i*0.05}s both ease`}}
                  onMouseEnter={e=>{e.currentTarget.style.background="rgba(139,92,246,0.26)";e.currentTarget.style.borderColor="rgba(139,92,246,0.65)";e.currentTarget.style.transform="translateY(-2px)";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.04)";e.currentTarget.style.borderColor="rgba(255,255,255,0.09)";e.currentTarget.style.transform="translateY(0)";}}
                >{opt.label}</button>
              ))}
            </div>
          </div>
          <div style={{paddingTop:14,paddingBottom:4}}>
            <button
              onClick={goBack}
              style={{
                display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                width:"100%", padding:"13px 20px", borderRadius:14, cursor:"pointer",
                background:"rgba(255,255,255,0.06)",
                border:"1px solid rgba(255,255,255,0.18)",
                color:"rgba(255,255,255,0.75)", fontSize:14, fontWeight:600,
                transition:"all 0.18s",
              }}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(168,85,247,0.2)";e.currentTarget.style.borderColor="rgba(168,85,247,0.6)";e.currentTarget.style.color="white";}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.06)";e.currentTarget.style.borderColor="rgba(255,255,255,0.18)";e.currentTarget.style.color="rgba(255,255,255,0.75)";}}
            >
              <span style={{fontSize:18}}>←</span>
              <span>{currentQ === 0 ? "トップに戻る" : `Q${currentQ} に戻る`}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── LOADING ── */
  if(screen==="loading") return(
    <div style={{...base,display:"flex",alignItems:"center",justifyContent:"center"}}><Orbs/><Stars/>
      <div style={{
        position:"relative",zIndex:1,
        display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
        textAlign:"center",padding:"40px 32px",
        width:"100%",maxWidth:400,
      }}>
        {/* ポケモンボール — 文字の真上・中央 */}
        <div style={{display:"flex",justifyContent:"center",marginBottom:28}}>
          <PokeBall size={90} spinning/>
        </div>
        <h2 style={{
          fontSize:18,fontWeight:700,margin:"0 0 10px",
          minHeight:28,width:"100%",
          animation:"fadeUp 0.4s ease",
        }}>{loadingMessages[loadingIdx]}</h2>
        <p style={{fontSize:11,color:"rgba(255,255,255,0.35)",margin:"0 0 24px"}}>AIが30の回答を深層分析しています</p>
        <div style={{display:"flex",gap:7,justifyContent:"center",flexWrap:"wrap"}}>
          {["性格タイプ","相性診断","才能分析","運勢計算","ポケモン特定"].map((t,i)=>(
            <span key={t} style={{padding:"4px 9px",borderRadius:12,fontSize:10,background:"rgba(139,92,246,0.18)",color:"rgba(167,139,250,0.75)",animation:`pulse ${1+i*0.22}s ease-in-out infinite`}}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );

  /* ── RESULT ── */
  if(screen==="result"&&result){
    const mainTypes = getTypes(result.pokemonId);
    const mainColor = getMainColor(mainTypes);
    const scores = result.score || {};

    return(
      <div style={{...base,overflowY:"auto"}}><Orbs/><Stars/>
        <div id="result-share-card" style={{position:"relative",zIndex:1,maxWidth:500,margin:"0 auto",padding:"22px 16px 48px",opacity:resultVisible?1:0,transition:"opacity 0.45s"}}>

          {/* ── Hero ── */}
          <div style={{textAlign:"center",marginBottom:20,animation:"fadeUp 0.5s ease"}}>
            <div style={{fontSize:9,letterSpacing:5,color:"rgba(167,139,250,0.65)",marginBottom:14,textTransform:"uppercase"}}>Your Pokemon Type</div>

            {/* スプライト */}
            <div style={{position:"relative",display:"inline-block",marginBottom:10,animation:"popIn 0.55s ease"}}>
              <div style={{
                width:140,height:140,borderRadius:"50%",margin:"0 auto",
                background:`radial-gradient(circle,${mainColor}2a 0%,transparent 68%)`,
                border:`2px solid ${mainColor}4a`,
                display:"flex",alignItems:"center",justifyContent:"center",
                boxShadow:`0 0 40px ${mainColor}44`,
              }}>
                <PokeSprite id={result.pokemonId} size={112} float/>
              </div>
              {/* スキャンラインエフェクト */}
              <div style={{position:"absolute",inset:0,borderRadius:"50%",overflow:"hidden",pointerEvents:"none"}}>
                <div style={{
                  position:"absolute",left:0,right:0,height:"8%",
                  background:"linear-gradient(transparent,rgba(255,255,255,0.04),transparent)",
                  animation:"scanline 2.5s linear infinite",
                }}/>
              </div>
            </div>

            {/* タイプバッジ */}
            <div style={{display:"flex",gap:7,justifyContent:"center",marginBottom:11}}>
              {mainTypes.map(t=>(
                <span key={t} style={{padding:"4px 13px",borderRadius:11,fontSize:11,fontWeight:800,background:`${TYPE_COLORS[t]||"#888"}38`,border:`1px solid ${TYPE_COLORS[t]||"#888"}77`,color:TYPE_COLORS[t]||"#ccc",letterSpacing:1}}>{TYPE_JP[t]||t}</span>
              ))}
            </div>

            <h2 style={{fontSize:"clamp(1.65rem,6vw,2.3rem)",fontWeight:900,margin:"0 0 7px",background:`linear-gradient(90deg,${mainColor},#e879f9,${mainColor})`,backgroundSize:"200%",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",animation:"shimmer 3s linear infinite"}}>{result.pokemonName}タイプ</h2>
            <p style={{fontSize:12.5,color:"rgba(255,255,255,0.72)",fontStyle:"italic",padding:"7px 16px",background:`${mainColor}1a`,border:`1px solid ${mainColor}3a`,borderRadius:20,display:"inline-block"}}>「{result.tagline}」</p>
          </div>

          {/* ── パラメーター ── */}
          <div style={{...glassCard({marginBottom:12,animation:"fadeUp 0.5s 0.08s both ease"})}}>
            <div style={{fontSize:9,letterSpacing:3,color:"rgba(255,255,255,0.3)",marginBottom:13,textTransform:"uppercase"}}>パラメーター</div>
            <StatBar label="魅力" icon="✨" value={scores.charm??55}/>
            <StatBar label="運勢" icon="🌟" value={scores.luck??60}/>
            <StatBar label="行動力" icon="⚡" value={scores.power??70}/>
            <StatBar label="愛情" icon="💕" value={scores.love??50}/>
            <StatBar label="知恵" icon="🧠" value={scores.wisdom??65}/>
          </div>

          {/* ── 詳細 ── */}
          {[
            {icon:"🧬",label:"性格",content:result.personality},
            {icon:"⚡",label:"最大の強み",content:result.strength},
            {icon:"😅",label:"意外な弱点",content:result.weakness},
            {icon:"💕",label:"恋愛傾向",content:result.love},
            {icon:"🌟",label:"2025年の運勢",content:result.fortune2025},
          ].map(({icon,label,content},i)=>(
            <div key={label} style={{...glassCard({marginBottom:10,animation:`fadeUp 0.5s ${0.13+i*0.06}s both ease`})}}>
              <div style={{fontSize:9,color:"rgba(255,255,255,0.32)",marginBottom:5,display:"flex",gap:5,alignItems:"center",letterSpacing:2,textTransform:"uppercase"}}>
                <span>{icon}</span><span>{label}</span>
              </div>
              <p style={{margin:0,fontSize:13,lineHeight:1.78,color:"rgba(255,255,255,0.88)"}}>{content}</p>
            </div>
          ))}

          {/* ── 相性◎ 3通り ── */}
          <div style={{animation:"fadeUp 0.5s 0.44s both ease",marginBottom:14}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
              <div style={{flex:1,height:1,background:"rgba(52,211,153,0.2)"}}/>
              <span style={{fontSize:10,letterSpacing:3,color:"rgba(52,211,153,0.75)",textTransform:"uppercase",fontWeight:700}}>💚 相性◎ ベスト3</span>
              <div style={{flex:1,height:1,background:"rgba(52,211,153,0.2)"}}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
              {(result.goodCompatibility||[]).slice(0,3).map((g,i)=>(
                <CompatCard key={i} data={g} good={true} getTypes={getTypes}/>
              ))}
            </div>
          </div>

          {/* ── 相性× 3通り ── */}
          <div style={{animation:"fadeUp 0.5s 0.52s both ease",marginBottom:20}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
              <div style={{flex:1,height:1,background:"rgba(248,113,113,0.2)"}}/>
              <span style={{fontSize:10,letterSpacing:3,color:"rgba(248,113,113,0.75)",textTransform:"uppercase",fontWeight:700}}>💔 相性× ワースト3</span>
              <div style={{flex:1,height:1,background:"rgba(248,113,113,0.2)"}}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
              {(result.badCompatibility||[]).slice(0,3).map((b,i)=>(
                <CompatCard key={i} data={b} good={false} getTypes={getTypes}/>
              ))}
            </div>
          </div>

          {/* ── アクション ── */}
          <div style={{display:"flex",flexDirection:"column",gap:11,animation:"fadeUp 0.5s 0.6s both ease"}}>

            {/* ── 状態トースト ── */}
            {shareState !== "idle" && shareState !== "capturing" && (
              <div style={{
                padding:"12px 16px", borderRadius:14, marginBottom:4,
                background: shareState.startsWith("copied") ? "rgba(52,211,153,0.18)" : "rgba(139,92,246,0.18)",
                border: `1px solid ${shareState.startsWith("copied") ? "rgba(52,211,153,0.5)" : "rgba(139,92,246,0.5)"}`,
                color:"white", fontSize:13, textAlign:"center", lineHeight:1.6,
                animation:"fadeUp 0.3s ease",
              }}>
                {shareState === "copied_x"   && "✅ 画像をコピーしました！\nXの投稿画面で Ctrl+V（またはペースト）で貼り付けてください"}
                {shareState === "saved_x"    && "📥 画像を保存しました！\nXの投稿画面で画像を添付して投稿してください"}
                {shareState === "copied_line"&& "✅ 画像をコピーしました！\nLINEのトーク画面で貼り付けて送ってください"}
                {shareState === "saved_line" && "📥 画像を保存しました！\nLINEのノートや送信に添付してください"}
                {shareState === "saved"      && "📥 画像を保存しました！"}
              </div>
            )}

            {/* ── キャプチャ中スピナー ── */}
            {shareState === "capturing" && (
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,padding:"14px",borderRadius:14,background:"rgba(139,92,246,0.12)",border:"1px solid rgba(139,92,246,0.3)"}}>
                <div style={{width:18,height:18,borderRadius:"50%",border:"2px solid rgba(139,92,246,0.3)",borderTop:"2px solid #a855f7",animation:"spin 0.7s linear infinite",flexShrink:0}}/>
                <span style={{fontSize:13,color:"rgba(255,255,255,0.75)"}}>画像を生成中…</span>
              </div>
            )}

            {/* ── SNSシェアボタン ── */}
            <button
              onClick={openShareModal}
              disabled={shareState==="capturing"}
              style={{padding:"16px",borderRadius:50,fontSize:15,fontWeight:800,cursor:"pointer",border:"none",background:"linear-gradient(135deg,#a855f7,#ec4899)",color:"white",boxShadow:"0 0 26px rgba(168,85,247,0.4)",opacity:shareState==="capturing"?0.5:1,letterSpacing:1}}
            >📣 結果をSNSでシェア</button>

            <button onClick={reset} style={{padding:"13px",borderRadius:50,fontSize:13,cursor:"pointer",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.11)",color:"rgba(255,255,255,0.8)"}}>🔄 もう一度診断する</button>
          </div>

          {/* ══ シェアモーダル ══ */}
          {shareModal && (
            <div onClick={()=>setShareModal(null)} style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(0,0,0,0.88)",backdropFilter:"blur(8px)",display:"flex",alignItems:"flex-end",justifyContent:"center",padding:"0 0 0 0",overflowY:"auto"}}>
              <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:520,background:"linear-gradient(135deg,#16003a,#0a0020)",border:"1px solid rgba(139,92,246,0.35)",borderRadius:"24px 24px 0 0",padding:"24px 18px 36px",animation:"fadeUp 0.28s ease"}}>

                {/* ヘッダー */}
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                  <span style={{fontSize:15,fontWeight:800,color:"white"}}>📤 シェアする</span>
                  <button onClick={()=>setShareModal(null)} style={{background:"rgba(255,255,255,0.1)",border:"none",color:"white",width:30,height:30,borderRadius:"50%",cursor:"pointer",fontSize:14}}>✕</button>
                </div>
                {/* 画像アップロード状態 */}
                <div style={{
                  padding:"8px 12px",borderRadius:10,marginBottom:12,fontSize:11,
                  background: shareModal?.publicUrl ? "rgba(52,211,153,0.15)" : "rgba(251,191,36,0.15)",
                  border: `1px solid ${shareModal?.publicUrl ? "rgba(52,211,153,0.4)" : "rgba(251,191,36,0.4)"}`,
                  color: shareModal?.publicUrl ? "#34d399" : "#fbbf24",
                  textAlign:"center",
                }}>
                  {shareModal?.publicUrl
                    ? "✅ 画像のアップロード成功！Xに投稿するとカード画像が表示されます"
                    : "⚠️ 画像のアップロード失敗。Xボタンを押すと画像がDLされるので手動で添付してください"}
                </div>

                {/* プレビュー画像 */}
                <div style={{borderRadius:16,overflow:"hidden",marginBottom:16,border:"1px solid rgba(255,255,255,0.1)",boxShadow:"0 4px 24px rgba(0,0,0,0.5)"}}>
                  <img src={shareModal.dataUrl} alt="preview" style={{width:"100%",display:"block"}}/>
                </div>

                {/* 投稿テキストプレビュー */}
                <div style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:12,padding:"12px 14px",marginBottom:18,fontSize:12,color:"rgba(255,255,255,0.7)",lineHeight:1.7,whiteSpace:"pre-wrap",wordBreak:"break-word"}}>
                  {shareModal.text}
                </div>

                {/* X ボタン */}
                <button
                  onClick={postToX}
                  style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,width:"100%",padding:"16px",borderRadius:16,fontSize:15,fontWeight:800,cursor:"pointer",border:"none",background:"#000",color:"white",marginBottom:10,transition:"background 0.15s"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#222"}
                  onMouseLeave={e=>e.currentTarget.style.background="#000"}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  <span>Xに投稿する</span>
                </button>

                {/* LINE ボタン */}
                <button
                  onClick={postToLine}
                  style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,width:"100%",padding:"16px",borderRadius:16,fontSize:15,fontWeight:800,cursor:"pointer",border:"none",background:"#06c755",color:"white",marginBottom:10,transition:"background 0.15s"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#08e060"}
                  onMouseLeave={e=>e.currentTarget.style.background="#06c755"}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.121.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-3.843 2.572-5.992zm-18.988-1.49c0-.166.132-.301.296-.301h3.609c.166 0 .298.135.298.301v.667c0 .166-.132.301-.298.301h-2.61v.667h2.61c.166 0 .298.135.298.301v.667c0 .166-.132.301-.298.301h-2.61v.667h2.61c.166 0 .298.135.298.301v.667c0 .166-.132.301-.298.301h-3.609c-.164 0-.296-.135-.296-.301v-4.341zm5.604 4.341c0 .166-.132.301-.298.301h-.667c-.164 0-.296-.135-.296-.301v-4.341c0-.166.132-.301.296-.301h.667c.166 0 .298.135.298.301v4.341zm4.856 0c0 .166-.132.301-.298.301h-.667c-.089 0-.172-.044-.228-.116l-2.101-2.839v2.654c0 .166-.132.301-.298.301h-.667c-.164 0-.296-.135-.296-.301v-4.341c0-.166.132-.301.296-.301h.667c.089 0 .172.044.228.116l2.101 2.839v-2.654c0-.166.132-.301.298-.301h.667c.166 0 .298.135.298.301v4.341zm3.745-3.341c0 .166-.132.301-.298.301h-2.61v.667h2.61c.166 0 .298.135.298.301v.667c0 .166-.132.301-.298.301h-2.61v.667h2.61c.166 0 .298.135.298.301v.667c0 .166-.132.301-.298.301h-3.609c-.164 0-.296-.135-.296-.301v-4.341c0-.166.132-.301.296-.301h3.609c.166 0 .298.135.298.301v.667z"/></svg>
                  <span>LINEで送る</span>
                </button>

                {/* 画像保存 */}
                <button
                  onClick={async()=>{ const a=document.createElement("a"); a.href=shareModal.dataUrl; a.download="anata-shindan.png"; a.click(); setShareModal(null); }}
                  style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,width:"100%",padding:"14px",borderRadius:16,fontSize:14,fontWeight:700,cursor:"pointer",background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.15)",color:"rgba(255,255,255,0.85)",transition:"background 0.15s"}}
                  onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.12)"}
                  onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.07)"}
                >
                  <span style={{fontSize:18}}>🖼️</span><span>画像だけ保存する</span>
                </button>

                {/* X用ガイド（PCのみ表示） */}
                <p style={{textAlign:"center",fontSize:11,color:"rgba(255,255,255,0.3)",marginTop:14,lineHeight:1.6}}>
                  ※PCでXに投稿する場合：画像が自動DLされます。<br/>X投稿画面で画像アイコンをクリックして添付してください。
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    );
  }
  return null;
}
