export interface Term {
  id: string;
  word: string;
  reading: string; // Hiragana
  romaji: string[];  // Array of valid romaji variations
  description: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  category: string;
}

export const FIELD_TERMS: Term[] = [
  {
    id: "1",
    word: "丁張り",
    reading: "ちょうはり",
    romaji: ["tyouhari", "chouhari"],
    description: "工事の基準となる杭や貫（ぬき）のこと。形を出すための重要な工程です。",
  },
  {
    id: "2",
    word: "養生",
    reading: "ようじょう",
    romaji: ["youjou", "youzyou"],
    description: "コンクリートを保護したり、部材が傷つかないように覆ったりすることです。",
  },
  {
    id: "3",
    word: "締固め",
    reading: "しめかため",
    romaji: ["simekatame"],
    description: "土やコンクリートを叩いたり振動させたりして、密度を高めることです。強度の要！",
  },
  {
    id: "4",
    word: "配筋",
    reading: "はいきん",
    romaji: ["haikin"],
    description: "鉄筋を設計図通りに並べること. コンクリートを打つ前に必ずチェックされます。",
  },
  {
    id: "5",
    word: "掘削",
    reading: "くっさく",
    romaji: ["kussaku"],
    description: "地面を掘ること。法面（のりめん）の崩落に注意が必要です。",
  },
  {
    id: "6",
    word: "型枠",
    reading: "かたわく",
    romaji: ["katawaku"],
    description: "コンクリートを流し込むための器（木製や鋼製）のことです。",
  },
  {
    id: "7",
    word: "埋戻し",
    reading: "うめもどし",
    romaji: ["umemodosi", "umemodoshi"],
    description: "掘ったところに土を戻すこと。層ごとに締固めるのが基本です。",
  },
  {
    id: "8",
    word: "不陸整正",
    reading: "ふりくせいせい",
    romaji: ["furikuseisei"],
    description: "地面のデコボコを平らにすることです。",
  },
  {
    id: "9",
    word: "目地",
    reading: "めじ",
    romaji: ["meji", "mezi"],
    description: "部材と部材の継ぎ目のこと。ひび割れ防止の役割もあります。",
  },
  {
    id: "10",
    word: "生コン",
    reading: "なまこん",
    romaji: ["namakon"],
    description: "固まる前のフレッシュなコンクリート。時間の管理が非常にシビアです。",
  },
  {
    id: "11",
    word: "墨出し",
    reading: "すみだし",
    romaji: ["sumidasi", "sumidashi"],
    description: "床や壁に設計図上の基準線を引くこと。これがずれると全部ずれます。",
  },
  {
    id: "12",
    word: "天端",
    reading: "てんば",
    romaji: ["tenba"],
    description: "構造物の最上面のこと。「天端出し」と言えば高さを合わせることです。",
  },
  {
    id: "13",
    word: "法面",
    reading: "のりめん",
    romaji: ["norimen"],
    description: "切土や盛土によって作られた傾斜面のこと. 芝を植えたり保護したりします。",
  },
  {
    id: "14",
    word: "転圧",
    reading: "てんあつ",
    romaji: ["tenatsu", "tenatu"],
    description: "ローラーなどで土を押し固めること。地盤の安定に欠かせません。",
  },
  {
    id: "15",
    word: "遣方",
    reading: "やりかた",
    romaji: ["yarikata"],
    description: "建築物の位置や高さを決める仮設工作物のこと。丁張りと同義で使われることも。",
  },
  {
    id: "16",
    word: "残土",
    reading: "ざんど",
    romaji: ["zando"],
    description: "工事で余った土。処理場への運搬計画も重要です。",
  },
  {
    id: "17",
    word: "覆工板",
    reading: "ふっこうばん",
    romaji: ["fukkouban", "hukkouban"],
    description: "道路を掘削した際に、交通を確保するために被せる鋼鉄の板です。",
  },
  {
    id: "18",
    word: "玉掛け",
    reading: "たまがけ",
    romaji: ["tamagake"],
    description: "クレーンのフックに荷物を掛けたり外したりすること。資格が必要です。",
  },
  {
    id: "19",
    word: "足場",
    reading: "あしば",
    romaji: ["asiba", "ashiba"],
    description: "高所作業のために組む仮設の床. 安全帯の使用が必須です。",
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    question: "コンクリートの打設後の「養生（ようじょう）」の主な目的は何？",
    options: ["見た目を綺麗にするため", "急激な乾燥を防ぎ強度を出すため", "コンクリートを早く固めるため", "鉄筋を錆びさせるため"],
    answerIndex: 1,
    explanation: "コンクリートは水分と化学反応（水和反応）して強度が出ます。急激な乾燥はひび割れの原因になるため、湿潤状態を保つことが重要です。",
    category: "施工管理",
  },
  {
    id: "q2",
    question: "法面（のりめん）の崩落を防ぐために地面を掘る際の安全な角度を検討する作業は？",
    options: ["足場組み", "不陸整正", "安定計算", "養生"],
    answerIndex: 2,
    explanation: "掘削時には土圧や土質を考慮し、崩れない角度（勾配）を保つための安定計算や安全確認が不可欠です。",
    category: "安全管理",
  },
  {
    id: "q3",
    question: "「スランプ試験」とは何を測定する試験？",
    options: ["土の固さ", "コンクリートの柔らかさ・流動性", "鉄筋の強度", "舗装の厚み"],
    answerIndex: 1,
    explanation: "スランプ値が大きいほど柔らかい（流動性が高い）コンクリートであることを示します。作業性に直結します。",
    category: "品質管理",
  },
  {
    id: "q4",
    question: "工事写真の黒板に必ず記載すべき情報は？",
    options: ["当日の天気と気温", "作業員の氏名", "工種、測点、設計値、実測値", "監督の今日の気分"],
    answerIndex: 2,
    explanation: "エビデンスとして「どこで、何を、どのくらい」作ったかを明確に示す必要があります。",
    category: "施工管理",
  },
  {
    id: "q5",
    question: "1級土木施工管理技士の試験範囲にも含まれる「盛り土」で最も重要な工程は？",
    options: ["水をたっぷりかける", "とにかく高く積む", "規定の厚さごとに締固める", "色を綺麗に揃える"],
    answerIndex: 2,
    explanation: "盛り土は1層（通常30cm程度）ごとに丁寧に締固めないと、将来的に沈下や崩壊の恐れがあります。",
    category: "一般土木",
  },
];
