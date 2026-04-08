/** @typedef {{ title: string, description: string, body: string }} LocBlock */

export const ARTICLES = {
  '2026-04-02-prompt-context-tips.md': {
    date: '2026-04-02',
    slug: '2026-04-02-prompt-context-tips',
    en: {
      title: 'Save context in long chats: five practical habits',
      description: 'From “conclusion first” to chunk summaries—fewer repeats, fewer wasted tokens, steadier threads.',
      body: `
Long threads often break because **the model forgets earlier turns** or you **paste the same wall of text again**. These habits help in most products.

## 1. Set boundaries before materials

First line: role (“you are a copy editor”), output shape (bullets/table), hard no’s (“no medical diagnoses”). Paste the long doc after. Clear constraints up front reduce drift.

## 2. Use short recap blocks instead of full repastes

Every 5–8 turns, three sentences on **facts you already agree on**, then the new question. Cheaper than copying turn one every time and reduces noisy old instructions.

## 3. Stable names for entities

Keep one spelling for teams, products, and version numbers. Mixed aliases can split “attention” and create inconsistency.

## 4. New session per new mission

Outline in one thread, paragraph expansion in another—carry only outline + current paragraph spec. Cleaner than one mega-thread for everything.

## 5. For code: minimal repro

Include environment, dependency versions, smallest runnable snippet, expected vs actual. One complete package beats ten rounds of guessing.

---

No perfect template—**clear structure + less blind repaste** usually beats stacking adjectives.
`.trim(),
    },
    'zh-TW': {
      title: '長對話裡怎麼省上下文：五個實用習慣',
      description: '從「先結論後細節」到分段總結，減少重複解釋與無效 token，對話更穩、更省。',
      body: `
和模型多輪聊久了，常見問題是：**前面說過的話它忘了**，或者**同一段話被反覆貼上**。下面幾個習慣在多數產品裡都適用。

## 1. 先給任務邊界，再給材料

第一句寫清：角色（例如「你是審稿人」）、輸出格式（ bullet / 表格）、禁止項（「不要給醫療診斷」）。再把長文貼在後面。邊界越靠前，後面越不容易跑偏。

## 2. 用「小結塊」代替整段重貼

每 5～8 輪，用三句話總結「已達成共識的事實」，再追加新問題。比從第一輪完整複製貼上更省上下文，也減少模型被舊指令干擾。

## 3. 專有名詞固定寫法

團隊名、產品名、版本號，全程用同一拼寫。模型對「同一實體的多種叫法」有時會分配不同權重，導致前後不一致。

## 4. 分任務就新開會話

「寫大綱」和「逐段擴寫」可以拆成兩次會話；第二次會話只帶大綱與當前段落要求。比在一個超長執行緒裡混聊更乾淨。

## 5. 對程式類任務附「最小復現」

報錯時給：環境、相依版本、最短可執行片段、期望 vs 實際。資訊一次給全，比來回追問更快。

---

沒有萬能模板，但**結構清晰 + 少重複貼上**，通常比堆形容詞更有效。
`.trim(),
    },
    ja: {
      title: '長いチャットで文脈を節約する：5つの実践習慣',
      description: '「結論→詳細」や区切りごとの要約で、無駄な再説明とトークンを減らし、会話を安定させます。',
      body: `
長いスレッドで困りがちなのは、**以前の内容を忘れる**／**同じ長文を何度も貼る**パターンです。多くの製品で効く習慣をまとめます。

## 1. 境界を先に、資料は後で

1行目に役割（「あなたは校正者」）、出力形式（箇条／表）、禁止（「医療診断はしない」）。長文はその後に。先に制約を置くほど戻り道が減ります。

## 2. 「要約ブロック」で全面貼り付けを避ける

5〜8ターンごとに、**合意済みの事実**を3文で要約してから新質問。第1ターンを毎回コピペするより安く、古い指示のノイズも減ります。

## 3. 固有名詞の表記を固定

チーム名・製品名・バージョンは一貫した表記へ。別名混在は一貫性を崩しやすいです。

## 4. 目的が変わったら新しい会話

「構成案」と「段落展開」は分ける。2回目は構成案＋今の段落要件だけを持ち込みます。

## 5. コードは最小再現を添える

環境、依存バージョン、最短スニペット、期待と実際。一度に揃えた方が早いです。

---

万能テンプレはありませんが、**構造をはっきり + 無暗な再貼り付けを減らす**のが効きます。
`.trim(),
    },
    ko: {
      title: '긴 대화에서 컨텍스트 아끼기: 실천 습관 다섯 가지',
      description: '‘결론 먼저’와 구간 요약으로 반복 설명과 불필요한 토큰을 줄여 대화를 안정적으로.',
      body: `
긴 스레드에서 흔한 문제는 **이전 내용을 잊는 것**과 **같은 긴 텍스트를 반복 붙여넣기**입니다. 대부분의 제품에 통하는 습관입니다.

## 1. 재료보다 경계를 먼저

첫 줄에 역할(「당신은 편집자입니다」), 출력 형식(글머리/표), 금지(「의학 진단 금지」). 긴 문서는 뒤에. 제약이 앞에 있을수록 덜 벗어납니다.

## 2. 전체 재붙여넣기 대신 ‘요약 블록’

5~8턴마다 **합의된 사실** 세 문장으로 정리한 뒤 새 질문. 1턴 전체를 매번 복사하는 것보다 저렴하고 옛 지시의 잡음도 줄입니다.

## 3. 고유명사 철자 고정

팀·제품·버전 표기를 일관되게. 별칭 혼용은 일관성을 깨기 쉽습니다.

## 4. 목적이 바뀌면 새 세션

‘목차 작성’과 ‘문단 확장’은 분리. 두 번째 세션에는 목차+현재 문단 요구만 가져갑니다.

## 5. 코드는 최소 재현

환경, 의존성 버전, 최소 스니펫, 기대 vs 실제. 한 번에 주는 편이 빠릅니다.

---

완벽한 템플릿은 없지만, **구조를 분명히 + 무분별한 재붙여넣기 줄이기**가 보통 더 낫습니다.
`.trim(),
    },
    ru: {
      title: 'Как экономить контекст в длинных чатах: пять привычек',
      description: 'От «сначала вывод, потом детали» до блоков-резюме — меньше повторов, меньше лишних токенов, стабильнее диалог.',
      body: `
В длинных ветках часто страдают **забывчивость к ранним репликам** и **бесконечное копирование одних и тех же простыней**. Эти привычки помогают почти везде.

## 1. Сначала рамка, потом материал

Первая строка: роль («ты редактор»), формат (список/таблица), запреты («без меддиагнозов»). Длинный текст — после. Чёткие границы снижают снос темы.

## 2. Маленькие сводки вместо полного репоста

Каждые 5–8 ходов — три предложения о **уже согласованных фактах**, затем новый вопрос. Дешевле, чем каждый раз тянуть первый ход целиком.

## 3. Единые написания имён

Команды, продукты, версии — одно написание. Псевдонимы размывают согласованность.

## 4. Новая задача — новый сеанс

«План» и «расписывание абзацев» — разделить. Во втором только план + требования к текущему абзацу.

## 5. Для кода — минимальный воспроизводимый пример

Среда, версии зависимостей, короткий фрагмент, ожидание vs факт. Один полный пакет быстрее десяти уточнений.

---

Идеального шаблона нет, но **ясная структура + меньше слепого копипаста** обычно эффективнее груды прилагательных.
`.trim(),
    },
    hi: {
      title: 'लंबी चैट में संदर्भ बचाएँ: पाँच आदतें',
      description: '‘पहले निष्कर्ष’ से लेकर खंड-सार तक—कम दोहराव, कम बेकार टोकन, ज़्यादा स्थिर बातचीत।',
      body: `
लंबे थ्रेड में अक्सर **पुराना भूल जाना** या **एक ही लंबा टेक्स्ट बार‑बार चिपकाना** होता है। ये आदतें ज़्यादातर उत्पादों में मदद करती हैं।

## 1. सामग्री से पहले सीमाएँ

पहली पंक्ति: भूमिका («आप संपादक हैं»), आउटपुट (बुलेट/तालिका), मना («चिकित्सा निदान नहीं»)। लंबा दस्तावेज़ बाद में।

## 2. पूरा पेस्ट नहीं, छोटा सार

हर 5–8 चाल पर **सहमत तथ्य** तीन वाक्यों में, फिर नया सवाल।

## 3. नाम एक जैसे लिखें

टीम, उत्पाद, संस्करण—एक ही वर्तनी।

## 4. नया मकसद—नई बातचीत

रूपरेखा अलग, पैराग्राफ विस्तार अलग; दूसरी बार केवल रूपरेखा + मौजूदा पैराफ़ की मांग।

## 5. कोड के लिए न्यूनतम पुनरुत्पादन

वातावरण, निर्भरता संस्करण, छोटा स्निपेट, अपेक्षा बनाम वास्तविक।

---

कोई सर्वोत्तम टेम्प्लेट नहीं—**स्पष्ट संरचना + कम अंधा पेस्ट** अक्सर शब्द भंडार से बेहतर।
`.trim(),
    },
    es: {
      title: 'Ahorrar contexto en charlas largas: cinco hábitos prácticos',
      description: 'De “primero la conclusión” a resúmenes por bloques: menos repeticiones y tokens, hilos más estables.',
      body: `
En hilos largos suele fallar **olvidar lo dicho** o **pegar otra vez el mismo muro de texto**. Estos hábitos ayudan en la mayoría de productos.

## 1. Límites antes que el material

Primera línea: rol («eres editor»), formato (viñetas/tabla), prohibiciones («sin diagnósticos médicos»). El documento largo va después.

## 2. Mini resúmenes en vez de repaste completo

Cada 5–8 turnos, tres frases sobre **hechos ya acordados** y luego la nueva pregunta.

## 3. Nombres estables

Equipos, productos, versiones: una sola grafía.

## 4. Nueva misión, nuevo hilo

«Esquema» y «ampliar párrafos» en sesiones distintas; la segunda lleva solo esquema + requisitos del párrafo actual.

## 5. En código: repro mínima

Entorno, versiones de dependencias, snippet mínimo, esperado vs real.

---

No hay plantilla perfecta: **estructura clara + menos pegado ciego** suele ganar a acumular adjetivos.
`.trim(),
    },
  },

  '2026-04-02-multimodal-workflow.md': {
    date: '2026-04-02',
    slug: '2026-04-02-multimodal-workflow',
    en: {
      title: 'Multimodal workflow: from a single image to a reviewable pipeline',
      description: 'How to split image/text/audio work, keep intermediates, and debug or revise cleanly.',
      body: `
Many first multimodal attempts **do image, copy, and voice‑over in one chat**—change one piece and everything wobbles. Treat it like a **pipeline** instead.

## Suggested stages

1. **Intent & style**: audience, channel (poster/short/PPT), taboos (brand colors, banned words).  
2. **Text spine**: titles, subheads, three bullets—lock before visuals.  
3. **Visuals**: multiple seeds from one prompt; **fix the random seed** when the tool allows fine tweaks.  
4. **Audio / VO**: record or TTS from the locked script to avoid length drift.

## Why keep intermediate files

Export **versionable artifacts** (md, png, srt). Rollbacks don’t require retelling the whole story from memory; teams can agree which revision is live.

Multimodal stacks change fast—**process beats single tricks**.
`.trim(),
    },
    'zh-TW': {
      title: '多模態工作流：從「單張圖」到「可複盤管線」',
      description: '圖文音混合任務裡，怎樣拆分步驟、保留中間結果，方便改稿與排錯。',
      body: `
很多人第一次做多模態，會**在同一次對話裡**又出圖、又改文案、又配旁白，結果一改全亂。更穩的做法是當成**流水線**。

## 建議拆法

1. **意圖與風格**：先定受眾、渠道（海報／短影片／PPT）、禁忌（品牌色、禁用詞）。
2. **文本主幹**：標題、副標題、三句賣點，確認後再進視覺。
3. **視覺**：同一提示詞多版本出圖，**固定隨機種子**（若工具支援）便於微調。
4. **音訊／口播**：按定稿腳本錄製或 TTS，避免邊寫邊改導致時長對不齊。

## 為什麼要留中間檔案

每一步匯出**可版本化的產物**（md、png、srt），回滾時不用從頭口述。團隊協作時，評審也能對齊「到底哪一版在改」。

多模態工具更新快，**流程比單點技巧**更保值。
`.trim(),
    },
    ja: {
      title: 'マルチモーダル工作：1枚の画像から「検証可能なパイプライン」へ',
      description: '画像・文・音声を段階に分け、中間成果物を残して修正・デバッグしやすくする。',
      body: `
初めてだと **1つの会話で画像生成・文案・ナレーション**までやりがちで、1か所の変更が全体を揺らします。**パイプライン**として扱いましょう。

## 段階の例

1. **意図とスタイル**：読者、チャネル（ポスター/Short/PPT）、タブー（色・禁止語）。  
2. **テキスト骨格**：見出しと3つの要点を先に固定。  
3. **ビジュアル**：同じ指示で複数案。ツールが許すなら**シード固定**で微調整。  
4. **音声**：確定台本から録音/TTS。書きながら変えると尺が崩れます。

## 中間ファイルを残す理由

md/png/srt など**版管理しやすい成果物**にすると、ロールバックも説明コストも下がります。

モダリティ組み合わせは変化が速い。**一発テクよりプロセス**が長持ちします。
`.trim(),
    },
    ko: {
      title: '멀티모달 워크플로: 한 장의 이미지에서 되돌아볼 수 있는 파이프라인으로',
      description: '이미지·텍스트·오디오를 단계로 나누고 중간 산출물을 남겨 수정·디버깅을 쉽게.',
      body: `
처음엔 **한 대화 안에서 이미지·카피·내레이션**을 같이 하다가 한 군데만 바꿔도 전체가 흔들립니다. **파이프라인**으로 보세요.

## 단계 예시

1. **의도·톤**: 독자, 채널(포스터/쇼츠/PPT), 금지(브랜드 컬러·금칙어).  
2. **텍스트 뼈대**: 제목·부제·세 가지 포인트를 먼저 고정.  
3. **비주얼**: 같은 프롬프트로 여러 버전; 도구가 허용하면 **시드 고정**으로 미세 조정.  
4. **오디오**: 확정 대본 기준 녹음/TTS.

## 중간 파일

md·png·srt 등 **버전 관리 가능한 산출물**을 두면 롤백과 협업이 쉬워집니다.

멀티모달 스택은 빨리 바뀝니다. **프로세스가 단발 요령보다** 오래 갑니다.
`.trim(),
    },
    ru: {
      title: 'Мультимодальный процесс: от одного кадра к воспроизводимому конвейеру',
      body: `
Часто новички **в одном чате** и картинку, и текст, и озвучку — правка одного ломает всё. Думайте **конвейером**.

## Этапы

1. **Замысел и стиль**: аудитория, канал (постер/short/PPT), табу.  
2. **Текстовый каркас**: заголовки и три тезиса до визуала.  
3. **Визуал**: несколько вариантов; **фиксируйте seed**, если инструмент позволяет.  
4. **Аудио**: по утверждённому сценарию, иначе поедет тайминг.

## Промежуточные файлы

md, png, srt — **версионируемые артефакты** облегчают откаты и согласования.

Стек меняется быстро — **процесс важнее одиночного трюка**.
`,
      description: 'Как разделить шаги для картинки/текста/аудио, сохранить промежуточные файлы и править без хаоса.',
    },
    hi: {
      title: 'मल्टीमोडल वर्कफ़्लो: एक इमेज से जाँच योग्य पाइपलाइन तक',
      description: 'छवि, टेक्स्ट, ऑडियो के चरण, बीच के आउटपुट रखें ताकि संपादन व डीबग साफ़ रहे।',
      body: `
अक्सर लोग **एक ही चैट** में छवि, कॉपी और वॉयसओवर करते हैं—एक बदलाव सब हिला देता है इसे **पाइपलाइन** समझें।

## चरण

1. **मकसद व शैली**: दर्शक, चैनल, वर्जित चीज़ें।  
2. **टेक्स्ट कंकाल**: शीर्षक व तीन बिंदु पहले लॉक करें।  
3. **विज़ुअल**: एक प्रॉम्प्ट से कई संस्करण; **सीड फिक्स** करें यदि टूल दे।  
4. **ऑडियो**: लॉक स्क्रिप्ट से—लिखते‑लिखते बदलें तो समय बिगड़ता है।

## मध्यवर्ती फाइलें

md, png, srt जैसे **संस्करणीय आर्टिफैक्ट** रोलबैक आसान बनाते हैं।

तकनीक तेज़ बदलती है—**प्रक्रिया एकल तरकीब से ज़्यादा टिकती है**।
`.trim(),
    },
    es: {
      title: 'Flujo multimodal: de una sola imagen a una tubería auditable',
      description: 'Separa imagen/texto/audio, guarda intermedios y revisa sin que todo se caiga.',
      body: `
Muchos empiezan **en un solo chat** con imagen, texto y voz en off; cambiar una pieza tumba el resto. Piensa en una **tubería**.

## Etapas

1. **Intención y estilo**: audiencia, canal, tabúes.  
2. **Espina textual**: títulos y tres puntos antes del visual.  
3. **Visual**: varias versiones; **fija la semilla** si la herramienta lo permite.  
4. **Audio**: desde guion cerrado para no desalinear duración.

## Archivos intermedios

md, png, srt **versionables** simplifican rollbacks y revisiones.

El stack cambia rápido—**el proceso vale más que un truco aislado**.
`.trim(),
    },
  },

  '2026-04-02-local-vs-cloud-llm.md': {
    date: '2026-04-02',
    slug: '2026-04-02-local-vs-cloud-llm',
    en: {
      title: 'Local vs cloud models: choose by scenario',
      description: 'Privacy, cost, latency, and capability—quick rules for when to run weights on-device.',
      body: `
In 2026 **local inference** (Ollama, LM Studio, vLLM, …) and **cloud APIs** coexist; each owns different scenarios.

## When local first

- Material that **must not leave the network** (docs, code, clinical notes).  
- **High‑frequency, low unit cost** batch jobs if you’ll maintain GPUs/CPU clusters.  
- **Latency‑sensitive** tasks that accept smaller models without a network round‑trip.

## When cloud fits better

- You need **top multimodal, huge context, or latest closed weights** local hardware can’t carry.  
- **Elastic usage** early in a project—pay‑as‑you‑go is simpler.  
- **No ops headcount** for serving and monitoring.

## Practical mix

Same product can be **hybrid**: sensitive prep on‑prem, synthesis and creativity in cloud. Tier data instead of “all local” or “all cloud.”
`.trim(),
    },
    'zh-TW': {
      title: '本地模型和雲端模型怎麼選：按情境拆',
      description: '隱私、成本、延遲與能力四條線，快速判斷要不要在本機跑開源權重。',
      body: `
2026 年，**本地推理**（Ollama、LM Studio、vLLM 等）和**雲端 API** 已經長期共存，不是誰取代誰，而是各管各的情境。

## 什麼時候優先考慮本地

- 文件、程式、病歷等**不能出網**的素材。
- 需要**高頻、低單價**的批次任務（例如日誌分類、格式轉換），且你願意維護顯示卡或 CPU 叢集。
- 對**延遲極敏感**且能接受較小模型（同機推理無網路往返）。

## 什麼時候更適合雲端

- 需要**最強多模態、長上下文或最新閉源模型**，本地硬體難以承載。
- **彈性用量**：專案早期流量不穩定，按量付費更省事。
- **免維運**：團隊沒有專職做推理服務與監控。

## 實操建議

同一業務可以**混合**：敏感預處理在本地，彙總與創意在雲端。關鍵是把資料分級，而不是「全盤本地」或「全盤上雲」。
`.trim(),
    },
    ja: {
      title: 'ローカルとクラウドモデル：シナリオで選ぶ',
      description: 'プライバシー・コスト・遅延・能力の4軸で、オンデバイス実行の是非を素早く判断。',
      body: `
2026 年、**ローカル推論**（Ollama, LM Studio, vLLM など）と**クラウド API** は共存し、置き換えではなく分担です。

## ローカル優先

- **ネットに出せない**資料（文書・コード・診療メモ）。  
- GPU/CPU を維持できるなら **高頻度・低単価**のバッチ。  
- **遅延最重視**で小型モデル可（往復なし）。

## クラウド向き

- **最強マルチモーダル・巨大文脈・最新クローズド重量**が要る。  
- 初期の**弾力的な課金**。  
- 推論運用の人がいない。

## ハイブリッド

機密はオンプレ、要約・創作はクラウドなど**データ階層**で決める。「全部ローカル/全部クラウド」より現実的です。
`.trim(),
    },
    ko: {
      title: '로컬 vs 클라우드 LLM: 상황별로 고르기',
      body: `
2026년, **로컬 추론**(Ollama, LM Studio, vLLM 등)과 **클라우드 API** 는 공존하며 각자 장면이 있습니다.

## 로컬 우선

- **외부로 나가면 안 되는** 자료.  
- GPU/CPU 를 유지할 수 있다면 **고빈도·저단가** 배치.  
- **지연 최소**·작은 모델 허용.

## 클라우드

- **최강 멀티모달·긴 컨텍스트·최신 클로즈드**가 필요.  
- 초기 **탄력 과금**.  
- 추론 운영 인력 없음.

## 혼합

민감 전처리는 온프레미스, 창작·요약은 클라우드 등 **데이터 등급**으로 나눕니다.`,
      description: '프라이버시·비용·지연·능력 네 축으로 온디바이스 실행 여부를 빠르게 판단.',
    },
    ru: {
      title: 'Локальные и облачные модели: выбор по сценарию',
      description: 'Приватность, стоимость, задержка и мощность — быстрые правила для on‑prem весов.',
      body: `
В 2026 **локальный инференс** (Ollama, LM Studio, vLLM, …) и **облачные API** сосуществуют — у каждого свои задачи.

## Когда локально

- Данные **не должны уходить в сеть**.  
- **Высокая частота и низкая цена** за запрос — если готовы держать GPU/CPU.  
- **Чувствительность к задержке** и приемлемость меньших моделей.

## Когда облако

- Нужны **топ мультимодальность, огромный контекст или свежие закрытые веса**.  
- **Эластичный** потребление на старте.  
- Нет людей на сопровождение сервинга.

## Гибрид

Чувствительная предобработка **on‑prem**, сводки и креатив **в облаке**. Делите данные по уровням, а не «всё тут или всё там».
`.trim(),
    },
    hi: {
      title: 'लोकल बनाम क्लाउड मॉडल: परिदृश्य से चुनें',
      description: 'गोपनीयता, लागत, विलंब और क्षमता—ऑन‑डिवाइस वज़न कब चलाना है, जल्दी नियम।',
      body: `
2026 में **लोकल इन्फेरेंस** और **क्लाउड API** साथ हैं—हर एक के अपने मौके हैं।

## पहले लोकल

- सामग्री **नेट से बाहर न जाए**।  
- GPU/CPU रख सकें तो **उच्च आवृत्ति, कम यूनिट लागत**।  
- **विलंब‑संवेदी** और छोटे मॉडल मंज़ूर।

## क्लाउड बेहतर

- **शीर्ष मल्टीमोडल, विशाल संदर्भ, नवीनतम बंद वज़न**।  
- शुरुआत में **लचीली खपत**।  
- ऑप्स टीम नहीं।

## मिश्रण

संवेदनशील काम लोकल, सार व रचनात्मकता क्लाउड। डेटा को **स्तरीय** करें।
`.trim(),
    },
    es: {
      title: 'Modelos locales vs nube: elige por escenario',
      description: 'Privacidad, coste, latencia y capacidad—reglas rápidas para pesos en el dispositivo.',
      body: `
En 2026 **inferencia local** y **APIs cloud** conviven; no se reemplazan, se reparten casos.

## Local primero

- Material que **no debe salir a la red**.  
- **Alto volumen y bajo coste** si mantienes GPU/CPU.  
- **Latencia crítica** con modelos más pequeños.

## Nube

- **Top multimodal, contexto enorme o pesos cerrados recientes**.  
- **Uso elástico** al inicio.  
- Sin equipo de operaciones de inferencia.

## Híbrido

Prep sensible on‑prem; síntesis y creatividad en la nube. **Clasifica datos**, no “todo local o todo nube”.
`.trim(),
    },
  },

  '2026-04-02-agent-openclaw-note.md': {
    date: '2026-04-02',
    slug: '2026-04-02-agent-openclaw-note',
    en: {
      title: 'Agents and skill packs: from “chatty” to “uses your tools”',
      description: 'How runtimes like OpenClaw wire CLIs/APIs via Skills—and why you should read SKILL.md carefully.',
      body: `
“Coding chat” and “agents that act consistently in your environment” differ by one layer: **structured tool docs**. Many stacks use a skills folder + \`SKILL.md\` (or similar) describing when/how to invoke commands; the runtime injects that into the system prompt.

## Four things readers should know

1. **Skills aren’t magic**—they’re **instructions plus guardrails** (binaries, env vars, config).  
2. **Treat third‑party skills as untrusted**—they enter the prompt; malicious text can steer behavior.  
3. **Official repo vs community registry** differ—bundles change with releases; community listings need maintainer checks.  
4. In **hybrid local/cloud**, inject secrets per your security policy—don’t paste keys into chat for convenience.

If you already run an agent stack, spend thirty minutes on the official “skills/tools” docs—it prevents more incidents than chasing every new model drop.
`.trim(),
    },
    'zh-TW': {
      title: '代理與技能包：從「會聊天」到「會用你的工具」',
      description: '以 OpenClaw 這類執行階為例，理解技能如何把 CLI 與 API 接到代理上，以及為什麼要審 SKILL.md。',
      body: `
「能寫程式的聊天」和「能在你環境裡執行一致動作」的代理，中間差一層：**結構化工具說明**。不少框架用技能目錄 + \`SKILL.md\`（或同類）描述「何時、如何呼叫什麼命令」，執行階再把說明注入系統提示。

## 讀者需要知道的四件事

1. **技能不是魔法**：本質是**說明書 + 門控**（依賴哪些二進位檔、環境變數、設定項）。
2. **第三方技能要當不可信程式讀**：說明會進提示詞，惡意指令能誤導行為。
3. **官方儲存庫與社群登錄表是兩套概念**：內建技能隨版本變，社群技能要自己核對維護者。
4. **混合雲與本地時**，金鑰注入方式要符合你司安全規範，別圖方便寫進對話裡。

若你已經在用某款代理執行階，值得花半小時讀一遍官方「技能／工具」文件，比追新模型版本更能減少翻車。
`.trim(),
    },
    ja: {
      title: 'エージェントとスキルパック:「雑談」から「自分のツールを使う」へ',
      description: 'OpenClaw のようなランタイムが Skills 経由で CLI/API を接続する理由と SKILL.md を読む意味。',
      body: `
「コードが書けるチャット」と「環境で一貫して動くエージェント」の間には **構造化されたツール説明** があります。多くのスタックは skills + \`SKILL.md\` でコマンドの条件を述べ、ランタイムがシステムプロンプトに注入します。

## 知っておく4点

1. **スキルは魔法ではない**—**手順とガードレール**（バイナリ・環境変数・設定）。  
2. **第三者スキルは非信頼扱い**—プロンプトに入るため悪意ある文言で誘導可能。  
3. **公式リポとコミュニティ登録は別物**—同梱は更新で変わる。  
4. **ハイブリッド構成**では鍵をポリシーに沿って注入—チャットへの貼り付けは避ける。

既にエージェント基盤を使うなら公式の skills/tools ドキュメントに30分—新モデル追いより事故予防に効きます。
`.trim(),
    },
    ko: {
      title: '에이전트와 스킬 팩: 「수다」에서 「내 도구 사용」까지',
      body: `
「코딩 채팅」과 「환경에서 일관되게 행동하는 에이전트」 사이에는 **구조화된 도구 설명** 이 있습니다. 많은 스택이 skills + \`SKILL.md\` 로 호출 조건을 적고 런타임이 시스템 프롬프트에 넣습니다.

## 알아둘 네 가지

1. **스킬은 마법이 아님**—**설명서 + 가드레일**.  
2. **서드파티는 불신**—프롬프트에 들어가 조작 가능.  
3. **공식 저장소 ≠ 커뮤니티 레지스트리**.  
4. **하이브리드**—비밀은 정책대로 주입, 채팅 붙여넣기 금지.

이미 에이전트를 쓴다면 공식 skills/tools 문서 30분이 새 모델 쫓기보다 사고 예방에 낫습니다.`,
      description: 'OpenClaw 류 런타임이 Skills 로 CLI·API 를 잇는 방식과 SKILL.md 를 검토해야 하는 이유.',
    },
    ru: {
      title: 'Агенты и пакеты навыков: от «просто болтает» к «использует ваши инструменты»',
      description: 'Как рантаймы вроде OpenClaw подключают CLI/API через Skills и зачем читать SKILL.md.',
      body: `
Между «чатом, который пишет код», и **агентом, который стабильно действует в вашей среде**, лежит слой **структурированных описаний инструментов**. Часто это каталог skills + \`SKILL.md\`, а рантайм вставляет текст в системный промпт.

## Четыре пункта

1. **Навыки не волшебство** — это **инструкция и ограничители**.  
2. **Сторонние навыки — недоверенные** — текст попадает в промпт.  
3. **Официальный репозиторий и реестр сообщества** — разные вещи.  
4. В **гибриде** секреты по политике безопасности, не в чат «для удобства».

Потратьте полчаса на официальные доки про skills/tools — это спасает чаще, чем погоня за каждым новым релизом модели.
`.trim(),
    },
    hi: {
      title: 'एजेंट और स्किल पैक: «बातचीत» से «आपके टूल उपयोग» तक',
      description: 'OpenClaw जैसे रनटाइम Skills के ज़रिए CLI/API कैसे जोड़ते हैं और SKILL.md क्यों पढ़ें।',
      body: `
«कोड लिखने वाली चैट» और **आपके वातावरण में स्थिर कार्रवाई करने वाले एजेंट** के बीच **संरचित टूल विवरण** है। अक्सर skills + \`SKILL.md\` और रनटाइम सिस्टम प्रॉम्प्ट में डालता है।

## चार बातें

1. **स्किल जादू नहीं**—**निर्देश + रेलगाड़ी**।  
2. **तीये पक्ष अविश्वसनीय**—टेक्स्ट प्रॉम्प्ट में जाता है।  
3. **आधिकारिक रेपो बनाम कम्युनिटी रजिस्ट्री** अलग।  
4. **हाइब्रिड** में कुंजी नीति अनुसार—चैट में चिपकाएँ नहीं।

यदि एजेंट चला रहे हैं तो आधिकारिक skills/tools दस्तावेज़ में 30 मिनट नए मॉडल पीछा करने से ज़्यादा बचाते हैं।
`.trim(),
    },
    es: {
      title: 'Agentes y paquetes de habilidades: de «charlar» a «usar tus herramientas»',
      description: 'Cómo runtimes como OpenClaw enlazan CLI/API vía Skills y por qué leer SKILL.md.',
      body: `
Entre un «chat que codea» y un **agente que actúa bien en tu entorno** hay **documentación estructurada de herramientas**. Muchos stacks usan skills + \`SKILL.md\`; el runtime la inyecta al prompt del sistema.

## Cuatro ideas

1. **Las skills no son magia**—son **manual + barreras**.  
2. **Skills de terceros = no confiables**.  
3. **Repo oficial ≠ registro comunitario**.  
4. En **híbridos**, secretos según política—no pegues llaves al chat por comodidad.

Si ya usas un stack de agentes, lee 30 min la doc oficial de skills/tools—evita más sustos que perseguir cada modelo nuevo.
`.trim(),
    },
  },

  '2026-04-01-ai-nav-trends.md': {
    date: '2026-04-01',
    slug: '2026-04-01-ai-nav-trends',
    en: {
      title: 'Running an AI directory: do you need detail pages?',
      description: 'When a full tool page pays off vs when a tight list is enough—from the reader’s view.',
      body: `
## What readers actually want

Many visitors **compare a few products quickly** and jump to official sites. Names, one‑liners, and consistent categories often beat long essays.

When differences really matter (pricing, privacy, Chinese support), **half a screen more** of scenario text reduces “not for me” churn.

## Split navigation vs news

- **Directory**: discoverability—clean taxonomy, consistent tags, working links.  
- **News / essays**: depth—releases, industry notes, playbooks complement the list.

## Freshness signals

A site feels “alive” when tool metadata stays current and news doesn’t go silent. Small, steady beats one giant dump that rots.
`.trim(),
    },
    'zh-TW': {
      title: '做 AI 導航站，詳情頁到底要不要單獨做？',
      description: '從讀者體驗出發：什麼時候值得為每個工具寫一頁介紹，而什麼時候列表就夠了。',
      body: `
## 讀者真正需要什麼

很多人開啟導航站，只想**快速比較幾款產品**，然後點進官網試用。這時列表裡的名稱、一句話說明和分類，往往比長文更實用。

但如果某類產品差異很大（定價、隱私、是否支援中文），**多給半屏文字**說明適用情境，能明顯減少「點進去才發現不合適」的挫敗感。

## 導航和資訊怎麼分工

- **導航**：負責「找得到」——分類清楚、標籤一致、連結有效。
- **資訊**：負責「講清楚」——版本更新、行業新聞、使用心得可以寫長一點，和工具列表形成互補。

## 持續更新的感受

站點是否「活著」，往往體現在：工具資訊有沒有過時、資訊有沒有斷更。固定節奏小步迭代，比一次性堆大量條目更容易維護。
`.trim(),
    },
    ja: {
      title: 'AIナビサイト：詳細ページは要る？',
      description: '読者目線で、一覧で足りるときと作品ページが効くとき。',
      body: `
## 読者が欲しいもの

多くは**数製品を素早く比較**し公式へ。名前・一言一句・分類の整合が長文より効く場合も。

価格・プライバシー・言語対応など差が大きい領域では**追加の半画面**で用途を書くと離脱が減ります。

## ナビと記事

- **ナビ**：発見性—分類・タグ・リンク鮮度。  
- **記事**：深さ—アップデートや業界観測は一覧と補完関係。

## 鮮度

メタ情報と更新が止まらないサイトは「生きている」と感じられます。一度に大量投入より小さな継続が腐りにくい。
`.trim(),
    },
    ko: {
      title: 'AI 내비 사이트: 상세 페이지가 필요할까?',
      body: `
## 독자가 원하는 것

많은 방문자는 **몇 가지를 빨리 비교**하고 공식 사이트로 갑니다. 이름·한줄·분류 일관이 긴 글보다 나을 때가 있습니다.

가격·프라이버시·언어 지원 차이가 크면 **반 화면 설명**이 이탈을 줄입니다.

## 내비 vs 소식

- **내비**: 발견성.  
- **소식/칼럼**: 깊이—목록과 보완.

## 신선함

메타가 최신이고 소식이 끊기지 않으면 살아 있는 사이트로 느껴집니다. 작고 꾸준한 편집이 한꺼번에 쌓아두는 것보다 낫습니다.`,
      description: '독자 관점에서 긴 소개 페이지가 언제 가치가 있고 언제 목록만으로 충분한지.',
    },
    ru: {
      title: 'AI‑каталог: нужны ли отдельные карточки?',
      description: 'Когда длинная страница окупается, а когда хватает списка — глазами читателя.',
      body: `
## Что хотят читатели

Часто **быстро сравнить пару продуктов** и уйти на официальный сайт. Имена, однострочники и ровная таксономия полезнее простыней.

Если отличия важны (цена, приватность, язык), **полэкрана контекста** снижает разочарование.

## Навигация и новости

- **Каталог**: находимость, теги, живые ссылки.  
- **Новости**: глубина — дополняют список.

## Свежесть

Сайт «живой», если метаданные инструментов и лента не замирают. Малые регулярные шаги лучше единовременной горы, которая устаревает.
`.trim(),
    },
    hi: {
      title: 'AI निर्देशिका: विस्तार पेज चाहिए?',
      description: 'पाठक की नज़र से कब लंबा पेज सही और कब सूची काफ़ी।',
      body: `
## पाठक क्या चाहते हैं

कई लोग **कुछ उत्पाद जल्दी तुलना** कर अधिकृत साइट पर जाते हैं। नाम, एक पंक्ति, साफ़ श्रेणियाँ कभी लंबे निबंध से बेहतर।

मूल्य निर्धारण, गोपनीयता, भाषा जैसे अंतर पर **आधा स्क्रीन संदर्भ** मदद करता है।

## निर्देशिका बनाम समाचार

- **निर्देशिका**: खोज।  
- **समाचार**: गहराई।  

## ताज़गी

टूल मेटा व समाचार नियमित—साइट «जीवित» लगती है।
`.trim(),
    },
    es: {
      title: 'Un directorio de IA: ¿hace falta página de detalle?',
      description: 'Cuándo compensa una ficha larga y cuándo basta la lista, pensando en el lector.',
      body: `
## Qué buscan

Mucha gente **compara pocas opciones rápido** y va al sitio oficial. Nombres, una línea y taxonomía clara a veces ganan a un ensayo.

Si importan precio, privacidad o idioma, **medio panel más** de contexto reduce frustración.

## Directorio vs noticias

- **Directorio**: hallar y etiquetas coherentes.  
- **Noticias**: profundidad que complementa.

## Frescura

Un sitio “vivo” mantiene metadatos y publica con ritmo. Mejor pasos pequeños que un volcán que envejece.
`.trim(),
    },
  },

  '2026-04-05-channel-refresh-note.md': {
    date: '2026-04-05',
    slug: '2026-04-05-channel-refresh-note',
    en: {
      title: 'Site refresh: tools, OpenClaw skills, and overlays',
      description: 'Manus and Lovable join the directory; upstream Taskflow naming is mirrored; localized overlays were regenerated.',
      body: `
## Tools

**Manus** and **Lovable** are now in the featured list with categories aligned to the existing taxonomy so “对话 / 通用” and “编程 / 开发” stay consistent across locales.

## OpenClaw

The OpenClaw skills generator follows **openclaw/openclaw** on GitHub: **Taskflow** and **taskflow-inbox-triage** replace the older Clawflow labels. Re-run \`npm run data:openclaw\` when you bump the script so \`data/openclaw-skills.json\` matches the repo.

## Overlays

Tool and OpenClaw overlay JSON under \`data/i18n/*-overlays\` is rebuilt from the overlay script—extended blurbs (including the new tool slugs) pick up from \`scripts/lib/content-overlay-locale-data.mjs\`.
`.trim(),
    },
    'zh-TW': {
      title: '站上更新：工具、OpenClaw 技能與多語覆寫',
      description: '導航列入 Manus、Lovable；技能名與上游 Taskflow 對齊；覆寫層已重新產生。',
      body: `
## 工具

**Manus**、**Lovable** 已列入精選，分類沿用現有詞表（如「對話／通用」「編程／開發」），避免各語系分類漂移。

## OpenClaw

技能產生腳本已對齊 **openclaw/openclaw**：以 **Taskflow**、**taskflow-inbox-triage** 取代舊的 Clawflow 命名。更新腳本後請執行 \`npm run data:openclaw\`，讓 \`data/openclaw-skills.json\` 與倉庫一致。

## 覆寫（overlays）

\`data/i18n/*-overlays\` 由腳本重建；工具與技能的加長說明（含新 slug）來自 \`scripts/lib/content-overlay-locale-data.mjs\`。
`.trim(),
    },
    ja: {
      title: 'サイト更新：ツール、OpenClaw スキル、オーバーレイ',
      description: 'Manus / Lovable を掲載。上流の Taskflow 命名に追従。多言語オーバーレイを再生成。',
      body: `
## ツール

**Manus** と **Lovable** をフィーチャーに追加。既存タクソノミーに合わせ、分類の一貫性を保っています。

## OpenClaw

スキル生成は **openclaw/openclaw** に合わせ、**Taskflow** / **taskflow-inbox-triage** へ名称を更新。スクリプト変更後は \`npm run data:openclaw\` で \`data/openclaw-skills.json\` を同期してください。

## オーバーレイ

\`data/i18n/*-overlays\` はビルドスクリプトで再生成。長文説明は \`scripts/lib/content-overlay-locale-data.mjs\` を参照します。
`.trim(),
    },
    ko: {
      title: '사이트 갱신: 도구, OpenClaw 스킬, 오버레이',
      description: 'Manus·Lovable 추가. 상위 저장소 Taskflow 명명 반영. 로컬라이즈 오버레이 재생성.',
      body: `
## 도구

**Manus**, **Lovable** 를 추천 목록에 추가했습니다. 기존 분류 체계와 맞춰 로케일 간 일관성을 유지합니다.

## OpenClaw

스킬 생성기는 **openclaw/openclaw** 를 따릅니다. **Taskflow**, **taskflow-inbox-triage** 로 이전 Clawflow 라벨을 대체합니다. 스크립트 수정 후 \`npm run data:openclaw\` 로 \`data/openclaw-skills.json\` 을 맞추세요.

## 오버레이

\`data/i18n/*-overlays\` 는 스크립트로 재빌드됩니다. 확장 설명은 \`scripts/lib/content-overlay-locale-data.mjs\` 에서 관리합니다.
`.trim(),
    },
    ru: {
      title: 'Обновление сайта: инструменты, навыки OpenClaw и оверлеи',
      description: 'Manus и Lovable в каталоге; имена Taskflow как у upstream; локализованные оверлеи пересобраны.',
      body: `
## Инструменты

В избранное добавлены **Manus** и **Lovable**, категории согласованы с текущей таксономией.

## OpenClaw

Генератор навыков следует **openclaw/openclaw**: **Taskflow** и **taskflow-inbox-triage** вместо старых имён Clawflow. После правок запустите \`npm run data:openclaw\`, чтобы \`data/openclaw-skills.json\` совпадал с репозиторием.

## Оверлеи

JSON в \`data/i18n/*-overlays\` пересобирается скриптом; расширенные тексты — в \`scripts/lib/content-overlay-locale-data.mjs\`.
`.trim(),
    },
    hi: {
      title: 'साइट अपडेट: टूल, OpenClaw स्किल, ओवरले',
      description: 'Manus व Lovable सूची में; Taskflow नाम upstream जैसा; स्थानीय ओवरले फिर बने।',
      body: `
## टूल

**Manus** और **Lovable** अब फ़ीचर्ड सूची में हैं; श्रेणियाँ मौजूदा शब्दावली से मेल खाती हैं।

## OpenClaw

स्किल जनरेटर **openclaw/openclaw** के अनुरूप: **Taskflow** व **taskflow-inbox-triage** पुराने Clawflow लेबल की जगह। स्क्रिप्ट बदलने पर \`npm run data:openclaw\` चलाएँ।

## ओवरले

\`data/i18n/*-overlays\` स्क्रिप्ट से दोबारा बनता है; लंबे विवरण \`scripts/lib/content-overlay-locale-data.mjs\` में।
`.trim(),
    },
    es: {
      title: 'Actualización del sitio: herramientas, skills OpenClaw y overlays',
      description: 'Manus y Lovable en el directorio; nombres Taskflow como el upstream; overlays localizados regenerados.',
      body: `
## Herramientas

**Manus** y **Lovable** entran en destacados con categorías alineadas a la taxonomía actual.

## OpenClaw

El generador de skills sigue **openclaw/openclaw**: **Taskflow** y **taskflow-inbox-triage** sustituyen etiquetas Clawflow antiguas. Tras cambiar el script, ejecuta \`npm run data:openclaw\` para sincronizar \`data/openclaw-skills.json\`.

## Overlays

Los JSON en \`data/i18n/*-overlays\` se reconstruyen; textos largos salen de \`scripts/lib/content-overlay-locale-data.mjs\`.
`.trim(),
    },
  },

  '2026-04-06-engineering-assistants-roundup.md': {
    date: '2026-04-06',
    slug: '2026-04-06-engineering-assistants-roundup',
    en: {
      title: 'Engineering assistants beyond the chat window',
      description: 'Why we list Devin, Warp, Zed, and Granola together—agents, terminals, editors, and meeting memory each hit different bottlenecks.',
      body: `
## Four different “AI at work” surfaces

- **Devin‑style agents** chase end‑to‑end tickets but still need human review.  
- **Warp‑style terminals** shorten repetitive shell work—watch cloud/off‑device prompts if you paste secrets.  
- **Zed‑style editors** optimize latency and pair programming; extensions differ from VS Code.  
- **Granola‑style meeting tools** reduce post‑call cleanup; check data retention before company‑wide rollouts.

## For readers managing a directory

Stable **categories + one honest line** beats hype; link to official pricing and regions, and regenerate overlays when you add slugs.
`.trim(),
    },
    'zh-TW': {
      title: '聊天視窗之外的工程向 AI：代理、終端、編輯器與會議記憶',
      description: '為何同時收錄 Devin、Warp、Zed、Granola——各自解的是不同瓶頸。',
      body: `
## 四種不同的「工作層」AI

- **類 Devin 的代理**　往「端到端工單」走，但**人審仍不可少**。  
- **類 Warp 的終端**　省重複敲指令——若開雲端 AI，注意**哪些內容會離開本機**。  
- **類 Zed 的編輯器**　偏延遲與協作；**外掛生態與 VS Code 不同**。  
- **類 Granola 的會議工具**　減少會後整理——全公司推廣前先看清**保存與訓練策略**。

## 給導航站維護者

分類穩定、**一句誠實定位**勝過堆形容詞；新 slug 記得重跑覆寫腳本並链到**官方定價與地區**。
`.trim(),
    },
    ja: {
      title: 'チャットの外側：エージェント・ターミナル・エディタ・会議メモ',
      description: 'Devin / Warp / Zed / Granola を並べる理由—ボトルネックが違う。',
      body: `
## 4つの仕事面

- **Devin 型エージェント**　チケット〜PR まで狙うが**人間レビュー必須**。  
- **Warp 型ターミナル**　CLI 反復を短縮—**クラウド AI で何が送られるか**確認。  
- **Zed 型エディタ**　低遅延と協調編集—**拡張は VS Code と別物**。  
- **Granola 型ミーティング**　議事後処理を削減—**保持と学習利用**を企業で確認。

## ディレクトリ運用

分類を安定させ、**一句正直な位置づけ**が効く。slug 追加後はオーバーレイを再生成し**価格と地域**は公式へ。
`.trim(),
    },
    ko: {
      title: '챗창 밖 엔지니어링 AI: 에이전트, 터미널, 에디터, 회의 메모',
      description: 'Devin·Warp·Zed·Granola 를 같이 두는 이유—각각 다른 병목을 겨냥.',
      body: `
## 네 가지 작업 표면

- **Devin 류 에이전트**　티켓→PR 까지 추천하지만 **인간 검토 필수**.  
- **Warp 류 터미널**　반복 셸 작업 단축—**클라우드 AI 시 전송 데이터** 확인.  
- **Zed 류 에디터**　지연·협업—**확장 생태는 VS Code 와 다름**.  
- **Granola 류 회의**　사후 정리 감소—**보존·학습 정책** 전사 도입 전 확인.

## 디렉터리 운영자에게

안정한 분류와 **한 줄 정직한 포지셔닝**이 과장보다 낫다. slug 추가 후 오버레이 재생성·**가격·지역**은 공식 사이트로.
`.trim(),
    },
    ru: {
      title: 'Инженерный ИИ за пределами чата',
      description: 'Зачем в одном списке Devin, Warp, Zed и Granola — у каждого свой узкий запрос.',
      body: `
## Четыре слоя

- **Агенты в духе Devin** — сквозные тикеты, но **без человека нельзя**.  
- **Терминалы в духе Warp** — меньше рутины в shell; **проверьте облачный ИИ**.  
- **Редакторы в духе Zed** — задержка и парное редактирование; **плугины ≠ VS Code**.  
- **Встречи в духе Granola** — меньше постобработки; **хранение и обучение** до корпоративного внедрения.

## Для каталога

Ровная таксономия и **одна честная строка** лучше хайпа; новые slug → пересобрать оверлеи, цены и регионы — на официальный сайт.
`.trim(),
    },
    hi: {
      title: 'चैट के बाहर इंजीनियरिंग सहायक',
      description: 'Devin, Warp, Zed, Granola एक साथ—क्योंकि अलग‑अलग बाधा।',
      body: `
## चार सतहें

- **Devin‑जैसे एजेंट**　टिकट से PR तक—**मानव समीक्षा ज़रूरी**।  
- **Warp‑जैसा टर्मिनल**　दोहराव घटाएँ—**क्लाउड AI पर क्या जाता है** देखें।  
- **Zed‑जैसा संपादक**　कम विलंब, सह‑संपादन—**एक्सटेंशन VS Code जैसे नहीं**।  
- **Granola‑जैसी मीटिंग**　बाद की सफ़ाई कम—**कंपनीव्यापी रोलआउट से पहले रिटेन्शन**।

## निर्देशिका के लिए

स्थिर श्रेणियाँ + **एक ईमानदार पंक्ति** ज़्यादा भरोसेमंद; नए slug पर ओवरले फिर बनाएँ; कीमत व क्षेत्र आधिकारिक साइट।
`.trim(),
    },
    es: {
      title: 'Asistentes de ingeniería más allá del chat',
      description: 'Por qué listar Devin, Warp, Zed y Granola: cada uno atasca un cuello de botella distinto.',
      body: `
## Cuatro superficies

- **Agentes tipo Devin** hacia tickets completos—**revisión humana obligatoria**.  
- **Terminales tipo Warp** recortan shell repetitivo—**ojo con IA en la nube**.  
- **Editores tipo Zed** latencia y pair programming—**extensiones ≠ VS Code**.  
- **Reuniones tipo Granola** menos limpieza después—**retención y entrenamiento** antes del despliegue.

## Para directorios

Taxonomía estable + **una línea honesta** gana al hype; nuevos slug → regenerar overlays; precios y regiones en el sitio oficial.
`.trim(),
    },
  },
}
