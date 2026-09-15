export type JpToken = {
  text: string;
  reading?: string;
  gloss?: string;
  plain?: boolean;
};

export type JpExample = {
  tokens: JpToken[];
  english: string;
  note?: string;
};

export type Particle = {
  id: string;
  kana: string;
  spoken: string;
  role: string;
  core: string;
  uses: string[];
  caution: string;
  examples: JpExample[];
  classes: string[];
};

const w = (text: string, reading: string | undefined, gloss: string): JpToken => ({ text, reading, gloss });
const p = (text: string): JpToken => ({ text, plain: true });

export const particles: Particle[] = [
  {
    id: 'wa', kana: 'は', spoken: 'wa', role: 'topic / contrast',
    core: 'Frames what the sentence is about: “as for …”. It can also contrast one item with another.',
    uses: ['Set the topic before giving new information about it.', 'Contrast two choices, including an implied contrast.', 'Mark information already active in the conversation.'],
    caution: 'は does not automatically mean “subject.” It tells the listener which frame to use.',
    examples: [
      { tokens: [w('私', 'わたし', 'I'), w('は', undefined, 'topic marker'), w('学生', 'がくせい', 'student'), w('です', undefined, 'am / is'), p('。')], english: 'As for me, I am a student.' },
      { tokens: [w('袋', 'ふくろ', 'bag'), w('は', undefined, 'contrast marker'), w('要りません', 'いりません', 'do not need'), p('。')], english: 'I do not need a bag (though I may need something else).', note: 'The contrast may stay unspoken.' },
    ], classes: ['grammar-basics', 'convenience-store'],
  },
  {
    id: 'ga', kana: 'が', spoken: 'ga', role: 'subject / identification',
    core: 'Points to the thing that satisfies, performs, or carries the predicate—often the answer to “who/what?”.',
    uses: ['Identify new or focused information.', 'Mark what is liked, understood, wanted, or skillful.', 'Introduce something before it becomes the topic.'],
    caution: 'With 好き, 上手, 分かります, and ほしい, English often uses an object where Japanese uses が.',
    examples: [
      { tokens: [w('だれ', undefined, 'who'), w('が', undefined, 'subject marker'), w('来ます', 'きます', 'will come'), w('か', undefined, 'question marker'), p('。')], english: 'Who will come?' },
      { tokens: [w('日本語', 'にほんご', 'Japanese language'), w('が', undefined, 'subject marker'), w('分かります', 'わかります', 'understand'), p('。')], english: 'I understand Japanese.' },
    ], classes: ['grammar-basics', 'self-introduction'],
  },
  {
    id: 'o', kana: 'を', spoken: 'o', role: 'direct object',
    core: 'Marks the thing directly affected by a transitive action.',
    uses: ['Mark what you eat, drink, read, hear, or do.', 'Mark a request item before ください or お願いします.'],
    caution: 'Pronounced “o,” even though it is written を.',
    examples: [
      { tokens: [w('コーヒー', undefined, 'coffee'), w('を', undefined, 'object marker'), w('飲みます', 'のみます', 'drink'), p('。')], english: 'I drink coffee.' },
      { tokens: [w('水', 'みず', 'water'), w('を', undefined, 'object marker'), w('ください', undefined, 'please give me'), p('。')], english: 'Water, please.' },
    ], classes: ['grammar-basics', 'convenience-store', 'minna-lesson-6', 'minna-lesson-7'],
  },
  {
    id: 'ni', kana: 'に', spoken: 'ni', role: 'target / point',
    core: 'Pins an event to a target: a time point, destination, recipient, or place of existence.',
    uses: ['Exact time: ８時に.', 'Destination with 行く・来る・帰る.', 'Location where something exists.', 'Recipient with あげる; person from whom something is received with もらう.'],
    caution: 'Relative time words such as 今日, 明日, 毎日 usually do not take に. Weekdays may take it or omit it.',
    examples: [
      { tokens: [w('八時', 'はちじ', 'eight o’clock'), w('に', undefined, 'time point'), w('起きます', 'おきます', 'wake up'), p('。')], english: 'I wake up at eight.' },
      { tokens: [w('京都', 'きょうと', 'Kyoto'), w('に', undefined, 'destination marker'), w('行きます', 'いきます', 'go'), p('。')], english: 'I go to Kyoto.' },
    ], classes: ['minna-lesson-4', 'minna-lesson-5', 'minna-lesson-7', 'self-introduction'],
  },
  {
    id: 'de', kana: 'で', spoken: 'de', role: 'scene / means / state',
    core: 'Marks the setting, means, or condition in which something happens or remains.',
    uses: ['Place where an action occurs.', 'Transport, tool, language, or method used.', 'A state or condition that remains in effect, as in そのままで.', 'Material or cause in later lessons.'],
    caution: 'Use に for a destination or place of existence. Use で for where an action unfolds, how it is done, or the condition being maintained.',
    examples: [
      { tokens: [w('家', 'いえ', 'home'), w('で', undefined, 'place of action'), w('食べます', 'たべます', 'eat'), p('。')], english: 'I eat at home.' },
      { tokens: [w('電車', 'でんしゃ', 'train'), w('で', undefined, 'means marker'), w('行きます', 'いきます', 'go'), p('。')], english: 'I go by train.' },
      { tokens: [w('そのまま', undefined, 'as it is'), w('で', undefined, 'state marker'), w('大丈夫', 'だいじょうぶ', 'all right'), w('です', undefined, 'is / polite'), p('。')], english: 'It is okay as it is.', note: 'Here で marks the condition in which something remains.' },
    ], classes: ['grammar-basics', 'minna-lesson-5', 'minna-lesson-6', 'minna-lesson-7', 'convenience-store'],
  },
  {
    id: 'e', kana: 'へ', spoken: 'e', role: 'direction',
    core: 'Shows movement heading toward a direction or destination.',
    uses: ['Destination with motion verbs when direction is emphasized.'],
    caution: 'Pronounced “e.” At this level, に and へ often overlap for destinations; に feels more like a target, へ like a direction.',
    examples: [{ tokens: [w('日本', 'にほん', 'Japan'), w('へ', undefined, 'toward'), w('来ました', 'きました', 'came'), p('。')], english: 'I came to Japan.' }],
    classes: ['minna-lesson-5'],
  },
  {
    id: 'to', kana: 'と', spoken: 'to', role: 'counterpart / and / quotation',
    core: 'Links something as a complete counterpart: another participant in the same event, another item in a closed list, or the content of words and thoughts.',
    uses: ['Shared participation: person と action means doing the action together or alongside that person.', 'A mutual counterpart in actions such as talking, marrying, or working together.', 'Exhaustive “and” between nouns: A と B presents the named items as the complete set.', 'Quotation before verbs such as 言います and 思います in later lessons.'],
    caution: 'と is not a general marker for every relationship. Compare 先生と話します (“talk with the teacher,” a two-way exchange) with 先生に話します (“speak to the teacher,” who is the target). Use の for a noun-to-noun relationship and や for a partial list.',
    examples: [
      { tokens: [w('友達', 'ともだち', 'friend'), w('と', undefined, 'with / joint participant'), w('映画', 'えいが', 'movie'), w('を', undefined, 'object marker'), w('見ます', 'みます', 'watch'), p('。')], english: 'I watch a movie with a friend.' },
      { tokens: [w('先生', 'せんせい', 'teacher'), w('と', undefined, 'with / conversation partner'), w('日本語', 'にほんご', 'Japanese language'), w('で', undefined, 'language used'), w('話します', 'はなします', 'talk'), p('。')], english: 'I talk with the teacher in Japanese.' },
      { tokens: [w('パン', undefined, 'bread'), w('と', undefined, 'and'), w('卵', 'たまご', 'egg(s)'), w('を', undefined, 'object marker'), w('買います', 'かいます', 'buy'), p('。')], english: 'I buy bread and eggs.' },
    ],
    classes: ['minna-lesson-5', 'izakaya-questions'],
  },
  {
    id: 'mo', kana: 'も', spoken: 'mo', role: 'also / even',
    core: 'Adds the marked item to a set that is already true.',
    uses: ['Replace は, が, or を when “also” is the point.', 'Combine with question words and a negative for “no one/nothing/nowhere.”'],
    caution: 'Do not stack it after は, が, or を in the basic “also” pattern; it usually replaces them.',
    examples: [
      { tokens: [w('私', 'わたし', 'I'), w('も', undefined, 'also'), w('学生', 'がくせい', 'student'), w('です', undefined, 'am / is'), p('。')], english: 'I am also a student.' },
      { tokens: [w('どこ', undefined, 'where'), w('にも', undefined, 'to no place + negative'), w('行きません', 'いきません', 'do not go'), p('。')], english: 'I do not go anywhere.' },
    ], classes: ['grammar-basics', 'minna-lesson-5', 'minna-lesson-6'],
  },
  {
    id: 'no', kana: 'の', spoken: 'no', role: 'connection / belonging',
    core: 'Lets one noun specify another: belonging, kind, origin, or relationship.',
    uses: ['Possession and affiliation.', 'Category or type.', 'Location relationships such as 駅の隣.'],
    caution: 'Read the relation from right to left: the right noun is the main thing.',
    examples: [{ tokens: [w('駅', 'えき', 'station'), w('の', undefined, 'of'), w('隣', 'となり', 'next to'), p('。')], english: 'Next to the station.' }],
    classes: ['grammar-basics', 'izakaya-questions', 'convenience-store'],
  },
  {
    id: 'kara', kana: 'から', spoken: 'kara', role: 'starting point',
    core: 'Marks where or when a span begins: “from”.',
    uses: ['Starting time.', 'Origin or starting place.', 'Source person with もらう.'],
    caution: 'から can appear without まで when only the start matters. With もらう, a person can take に or から.',
    examples: [{ tokens: [w('九時', 'くじ', 'nine o’clock'), w('から', undefined, 'from'), w('働きます', 'はたらきます', 'work'), p('。')], english: 'I work from nine.' }],
    classes: ['minna-lesson-4', 'minna-lesson-7', 'self-introduction'],
  },
  {
    id: 'made', kana: 'まで', spoken: 'made', role: 'end point',
    core: 'Marks where or when a span reaches: “until / as far as”.',
    uses: ['Ending time.', 'Farthest destination or boundary.'],
    caution: 'まで can appear without から when only the endpoint matters.',
    examples: [{ tokens: [w('五時', 'ごじ', 'five o’clock'), w('まで', undefined, 'until'), w('働きます', 'はたらきます', 'work'), p('。')], english: 'I work until five.' }],
    classes: ['minna-lesson-4'],
  },
];

export const verbRules = [
  { id: 'masu-time', label: 'Polite time frame', summary: 'The ます family carries tense and polarity. The base verb does not change for person or number.', forms: [['non-past +', 'ます'], ['non-past −', 'ません'], ['past +', 'ました'], ['past −', 'ませんでした']], note: 'Japanese non-past covers both habits and future events; context supplies the time.' },
  { id: 'motion', label: 'Movement has a target', summary: '行きます・来ます・帰ります pair with に or へ for destination, で for transport, と for company, and に for exact time.', forms: [['destination', 'place に／へ'], ['transport', 'vehicle で'], ['company', 'person と'], ['time', 'time に']], note: 'You can omit information already obvious from the conversation.' },
  { id: 'transitive', label: 'Actions affect を', summary: 'A transitive verb acts directly on a marked thing. The place where the action occurs takes で.', forms: [['thing affected', 'noun を'], ['place of action', 'place で'], ['tool / language', 'means で']], note: 'Do not use に simply because English says “at.” Choose the particle from the Japanese role.' },
  { id: 'invitation', label: 'Invite, then decide', summary: 'ませんか softly invites someone. ましょう proposes the shared decision or accepts it.', forms: [['invitation', 'verb ませんか'], ['proposal', 'verb ましょう']], note: 'A negative-looking form becomes a polite invitation in this pattern.' },
  { id: 'giving-receiving', label: 'Follow an exchange', summary: 'あげます follows something from giver to recipient. もらいます frames the same kind of exchange from the receiver.', forms: [['give to someone', 'person に thing を あげます'], ['receive from someone', 'person に／から thing を もらいます']], note: 'Choose the verb from the viewpoint of the sentence, then mark the other person accordingly.' },
  { id: 'already', label: 'Already or not yet', summary: 'もう + a past verb marks an expected action as complete. まだです is the compact reply when it remains incomplete.', forms: [['already did', 'もう verb ました'], ['not yet', 'まだです']], note: 'When the answer is not yet, do not combine もう with a negative verb.' },
];

export const adjectiveRules = [
  { id: 'i-adjectives', label: 'い-adjectives', marker: 'い', summary: 'The final い is part of the adjective and changes for negative and past forms.', forms: [['non-past +', '高いです'], ['non-past −', '高くないです'], ['past +', '高かったです'], ['past −', '高くなかったです']], nounForm: '高い店', caution: 'いい is irregular: よくない, よかった, よくなかった.' },
  { id: 'na-adjectives', label: 'な-adjectives', marker: 'な', summary: 'They behave like nouns at the end of a sentence, but use な directly before a noun.', forms: [['non-past +', '静かです'], ['non-past −', '静かじゃありません'], ['past +', '静かでした'], ['past −', '静かじゃありませんでした']], nounForm: '静かな店', caution: 'Do not put な before です: 静かです, not 静かなです.' },
  { id: 'preference', label: 'Preference and skill', marker: 'が', summary: '好き, きらい, 上手, and 下手 are な-adjectives. The liked or skilled-at thing is marked by が.', forms: [['I like sushi', '私は寿司が好きです'], ['She is good at Japanese', '彼女は日本語が上手です']], nounForm: '好きな食べ物', caution: 'Translate naturally, but remember that the Japanese grammar is not a transitive verb pattern.' },
];

export const kanaRows = [
  { consonant: '—', hira: ['あ', 'い', 'う', 'え', 'お'], kata: ['ア', 'イ', 'ウ', 'エ', 'オ'], roma: ['a', 'i', 'u', 'e', 'o'] },
  { consonant: 'K', hira: ['か', 'き', 'く', 'け', 'こ'], kata: ['カ', 'キ', 'ク', 'ケ', 'コ'], roma: ['ka', 'ki', 'ku', 'ke', 'ko'] },
  { consonant: 'S', hira: ['さ', 'し', 'す', 'せ', 'そ'], kata: ['サ', 'シ', 'ス', 'セ', 'ソ'], roma: ['sa', 'shi', 'su', 'se', 'so'] },
  { consonant: 'T', hira: ['た', 'ち', 'つ', 'て', 'と'], kata: ['タ', 'チ', 'ツ', 'テ', 'ト'], roma: ['ta', 'chi', 'tsu', 'te', 'to'] },
  { consonant: 'N', hira: ['な', 'に', 'ぬ', 'ね', 'の'], kata: ['ナ', 'ニ', 'ヌ', 'ネ', 'ノ'], roma: ['na', 'ni', 'nu', 'ne', 'no'] },
  { consonant: 'H', hira: ['は', 'ひ', 'ふ', 'へ', 'ほ'], kata: ['ハ', 'ヒ', 'フ', 'ヘ', 'ホ'], roma: ['ha', 'hi', 'fu', 'he', 'ho'] },
  { consonant: 'M', hira: ['ま', 'み', 'む', 'め', 'も'], kata: ['マ', 'ミ', 'ム', 'メ', 'モ'], roma: ['ma', 'mi', 'mu', 'me', 'mo'] },
  { consonant: 'Y', hira: ['や', '', 'ゆ', '', 'よ'], kata: ['ヤ', '', 'ユ', '', 'ヨ'], roma: ['ya', '', 'yu', '', 'yo'] },
  { consonant: 'R', hira: ['ら', 'り', 'る', 'れ', 'ろ'], kata: ['ラ', 'リ', 'ル', 'レ', 'ロ'], roma: ['ra', 'ri', 'ru', 're', 'ro'] },
  { consonant: 'W', hira: ['わ', '', '', '', 'を'], kata: ['ワ', '', '', '', 'ヲ'], roma: ['wa', '', '', '', 'o'] },
  { consonant: 'N', hira: ['ん', '', '', '', ''], kata: ['ン', '', '', '', ''], roma: ['n', '', '', '', ''] },
];

export const voicedKana = [
  ['が ぎ ぐ げ ご', 'ガ ギ グ ゲ ゴ', 'ga gi gu ge go'],
  ['ざ じ ず ぜ ぞ', 'ザ ジ ズ ゼ ゾ', 'za ji zu ze zo'],
  ['だ ぢ づ で ど', 'ダ ヂ ヅ デ ド', 'da ji zu de do'],
  ['ば び ぶ べ ぼ', 'バ ビ ブ ベ ボ', 'ba bi bu be bo'],
  ['ぱ ぴ ぷ ぺ ぽ', 'パ ピ プ ペ ポ', 'pa pi pu pe po'],
];

export const contractedKana = [
  ['きゃ きゅ きょ', 'キャ キュ キョ', 'kya kyu kyo'],
  ['しゃ しゅ しょ', 'シャ シュ ショ', 'sha shu sho'],
  ['ちゃ ちゅ ちょ', 'チャ チュ チョ', 'cha chu cho'],
  ['にゃ にゅ にょ', 'ニャ ニュ ニョ', 'nya nyu nyo'],
  ['ひゃ ひゅ ひょ', 'ヒャ ヒュ ヒョ', 'hya hyu hyo'],
  ['みゃ みゅ みょ', 'ミャ ミュ ミョ', 'mya myu myo'],
  ['りゃ りゅ りょ', 'リャ リュ リョ', 'rya ryu ryo'],
  ['ぎゃ ぎゅ ぎょ', 'ギャ ギュ ギョ', 'gya gyu gyo'],
  ['じゃ じゅ じょ', 'ジャ ジュ ジョ', 'ja ju jo'],
  ['びゃ びゅ びょ', 'ビャ ビュ ビョ', 'bya byu byo'],
  ['ぴゃ ぴゅ ぴょ', 'ピャ ピュ ピョ', 'pya pyu pyo'],
];
