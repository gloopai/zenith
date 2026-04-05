export const ARTICLES = {
  '2026-03-31-rag-first-steps.md': {
    date: '2026-03-31',
    slug: '2026-03-31-rag-first-steps',
    en: {
      title: 'RAG 101: skip the vector DB drama until three basics hold',
      description: 'Chunking, provenance, and evaluation matter more than which embedding you pick first.',
      body: `
RAG sounds heavy, but **v1 can stay lean**: cleaned docs, simple splits, basic retrieval, LLM summary. Most failures come from these three gaps.

## 1. Chunks should respect document structure

Split on headings, clauses, and tables—not a blind 500‑character razor. Contracts and legal text especially—“half sentences” in results break trust.

## 2. Answers must point back to sources

Surface quotes or page numbers in UI or logs. RAG without provenance leaves you defenseless when the model hallucinates.

## 3. Keep a tiny eval set

A dozen real questions plus expected bullet answers—rerun after every model or chunk change.**Vibes lie; spreadsheets don’t.**

Add vector stores and rerankers later; without the trio above, engineering only amplifies noise.
`.trim(),
    },
    'zh-TW': {
      title: 'RAG 入門：別急著上向量庫，先把三件事做對',
      description: '分塊、溯源與評測，比選哪家嵌入模型更能決定問答品質。',
      body: `
RAG（檢索增強生成）聽起來重，但**第一版**往往可以很輕：一份清洗過的文件 + 簡單切分 + 基礎檢索 + 大模型總結。真正容易翻車的是下面三點。

## 1. 分塊策略與文件結構一致

按標題、條款、表格拆，比固定 500 字一刀切更穩。法律、合約類尤其明顯——斷句位置錯了，檢索到的片段會「半句話」。

## 2. 回答必須能指回原文

介面或日誌裡保留「引用片段」或頁碼，使用者才能核對。沒有溯源的 RAG，幻覺時你無法辯解。

## 3. 準備一個小評測集

十來個真實問題 + 標準答案要點，每次換模型或換分塊都跑一遍。**體感不可靠，對比表才可靠。**

向量庫、重排模型可以後加；上面三件事沒做好，堆工程只會放大雜訊。
`.trim(),
    },
    ja: {
      title: 'RAG入門：向量DBより先に3つの基礎',
      description: 'チャンク分割・出所・評価が、最初の埋め込み選びより効く。',
      body: `
RAG は重く聞こえますが、**第一版は軽く**でよいです。清浄化した文書・単純分割・基本検索・要約で始められます。つまずきやすいのは次の3点です。

## 1. 文書構造に沿ったチャンク

見出し・条・表で分割し、機械的な固定長だけにしない。契約系では特に「半分の文」が致命的。

## 2. 出所を示す回答

引用やページをUI/ログに残す。出所なきRAGは幻覚時に説明できません。

## 3. ミニ評価セット

実問十数本＋期待要点を**モデルや分割を変えるたび**に再実行。体感より表が信頼できます。

ベクターストアやrerankは後追いでも、上記が弱いとノイズが増幅されます。
`.trim(),
    },
    ko: {
      title: 'RAG 입문: 벡터 DB 전에 세 가지',
      body: `
RAG는 무겁게 들리지만 **v1은 가볍게**: 정리된 문서·단순 분할·기본 검색·요약. 실패는 보통 아래 세 가지입니다.

## 1. 구조에 맞는 청크

제목·조항·표 기준으로, 고정 길이만 쓰지 마세요. 계약류는 반쯤 문장이 치명적입니다.

## 2. 출처를 보여 주는 답

인용·페이지를 UI/로그에. 출처 없는 RAG는 환각 시 방어가 없습니다.

## 3. 작은 평가 세트

실질 질문 열다음 + 기대 요점—모델·청크 바꿀 때마다 재실행. 감보다 표가 낫습니다.

벡터스토어·rerank는 나중에—기초 없으면 노이즈만 증폭됩니다.`,
      description: '청킹, 출처, 평가가 첫 임베딩 고르기보다 결과를 가릅니다.',
    },
    ru: {
      title: 'RAG с нуля: три базы до векторной БД',
      description: 'Нарезка, происхождение ответа и оценка важнее выбора эмбеддинга.',
      body: `
RAG звучит тяжело, но **первая версия может быть легкой**: вычищенные документы, простое деление, базовый поиск, суммаризация. Чаще ломается из‑за трёх вещей.

## 1. Чанки по структуре

Режьте по заголовкам, пунктам, таблицам — не «ровно N символов». В договорах обрывы фраз убивают доверие.

## 2. Ответ с указанием источника

Цитата или страница в UI/логах. Без этого не отмоешься от галлюцинаций.

## 3. Мини‑набор для оценки

Пара десятков реальных вопросов и эталонных тезисов — гоняйте после каждой смены модели или нарезки.**Ощущения врут, таблица нет.**

Векторные хранилища и реранкеры позже; без базы они усиливают шум.
`.trim(),
    },
    hi: {
      title: 'RAG शुरुआत: वेक्टर DB से पहले तीन बुनियादी बातें',
      description: 'चंकिंग, स्रोत दिखाना और मूल्यांकन पहले एम्बेडिंग चुनने से ज़्यादा मायने रखते हैं।',
      body: `
RAG भारी लगता है पर **v1 हल्का** रख सकते हैं: साफ़ दस्तावेज़, साधारण विभाजन, बुनियादी खोज, सार। असफलता अक्सर इन तीन से:

## 1. संरचना के अनुसार चंक

शीर्षक, खंड, तालिका—अंधा 500 अक्षर नहीं।

## 2. स्रोत दिखाए बिना उत्तर नहीं

उद्धरण या पृष्ठ UI/लॉग में।

## 3. छोटा मूल्यांकन सेट

वास्तविक प्रಶ्न + अपेक्षित बिंदु—मॉडल/चंक बदलने पर दोबारा चलाएँ।

वेक्टर DB बाद में—बुनियाद के बिना शोर बढ़ता है।
`.trim(),
    },
    es: {
      title: 'RAG para empezar: tres bases antes del vector DB',
      description: 'Fragmentación, fuentes y evaluación pesan más que el primer embedding.',
      body: `
RAG suena pesado, pero **la v1 puede ser ligera**: docs limpios, trozos simples, recuperación básica, resumen del LLM. Lo que suele fallar son tres cosas.

## 1. Trozos según estructura

Por secciones, cláusulas y tablas—no un corte ciego de N caracteres.

## 2. Respuestas con procedencia

Citas o página en UI/logs. Sin eso no defiendes alucinaciones.

## 3. Mini eval

Preguntas reales + puntos esperados tras cada cambio de modelo o troceo.**Las corazonadas mienten; la tabla no.**

Vector DB y rerank después; sin bases solo amplificas ruido.
`.trim(),
    },
  },

  '2026-03-30-ai-coding-habits.md': {
    date: '2026-03-30',
    slug: '2026-03-30-ai-coding-habits',
    en: {
      title: 'Five habits for coding with AI: faster and safer',
      description: 'Branching, tests, sensitive files, dependency bumps, and human review—practical for solo devs and small teams.',
      body: `
Assistants are powerful, but **you’re still accountable**. These cut rework and risk.

## 1. Small commits / PRs

Scope changes to something one PR can digest; split big refactors into runnable, revertible steps.

## 2. Auto‑generated code needs a verification path

Spell out manual checks or tests—inputs, expected outputs, edge cases. Don’t merge “trust me” diffs.

## 3. Sensitive files off‑limits by default

Keys, cert paths, prod configs—templates or placeholders locally, real secrets never committed.

## 4. Dependency upgrades on their own PR

Don’t mix feature work with major bumps—bisecting breaks becomes impossible.

## 5. Humans still review for architecture

Models excel at boilerplate; naming and structure still deserve a teammate skim.

Habits beat picking “the best editor.”
`.trim(),
    },
    'zh-TW': {
      title: '用 AI 寫程式時的五個習慣：省時間也省事故',
      description: '從分支策略到測試邊界，適合個人開發者與小團隊日常參考。',
      body: `
編程助手再強，**責任仍在開發者**。下面幾條能同時減少返工和安全風險。

## 1. 小步提交

讓助手改動的範圍控制在一個 PR 內可讀；大重構拆成多步，每步可執行、可回滾。

## 2. 自動產生必帶測試或檢查清單

至少說明「如何手動驗證」：輸入、期望輸出、邊界情況。沒有驗證路徑的程式不要直接合併。

## 3. 敏感檔案預設不讓自動改

金鑰、憑證路徑、生產設定，用模板或占位符，本地再填。避免助手誤把示例金鑰寫進儲存庫。

## 4. 相依升級單獨做

不要把「功能開發」和「大版本相依升級」混在同一 diff 裡，出問題難 bisect。

## 5. 程式碼審閱仍看人

助手擅長樣板與局部最佳化，架構與命名一致性仍需要同事掃一眼。

習慣比「哪一款編輯器」更能決定長期效率。
`.trim(),
    },
    ja: {
      title: 'AIとコードを書く五つの習慣：速くて安全に',
      description: 'ブランチ、検証、機密ファイル、依存更新、人によるレビュー。',
      body: `
アシスタントは強力でも**責任は開発者**にあります。

## 1. 小さなコミット/PR

1PRで読める範囲に抑え、巨大リファクタは実行可能な段階へ分割。

## 2. 検証手順必須

手動確認やテスト—入力・期待・境界。根拠なきマージは避ける。

## 3. 秘匿情報は既定で触らせない

鍵・本番設定はテンプレとローカル埋め込み。

## 4. 依存更新は別PR

機能開発とメジャー更新を混ぜない—ビセクト不能になる。

## 5. アーキテクチャは人が見る

ボイラープレートは得意でも命名整合は仲間の一瞥が効く。

「どのエディタ」より習慣が効きます。
`.trim(),
    },
    ko: {
      title: 'AI 로 코드 작성할 때 다섯 가지 습관',
      body: `
어시스턴트는 강해도 **책임은 개발자**에게 있습니다.

## 1. 작은 커밋·PR

한 PR에 읽을 만한 범위; 큰 리팩터는 단계적으로.

## 2. 검증 경로

수동 절차나 테스트—입력·기대·경계. 근거 없는 머지 금지.

## 3. 민감 파일 기본 금지

키·프로덕션 설정은 템플릿+로컬.

## 4. 의존성 업그레이드는 단독 PR

기능과 메이저 범프를 섞지 않기.

## 5. 아키텍처는 사람이

보일러플레이트는 잘하지만 이름·구조는 동료가 봐야 합니다.

에디터 고르기보다 습관이 장기 효율을 정합니다.`,
      description: '브랜치, 검증, 민감 파일, 의존성, 사람 리뷰—개인·소규모 팀용.',
    },
    ru: {
      title: 'Пять привычек при кодировании с ИИ: быстрее и безопаснее',
      description: 'Ветвление, проверки, чувствительные файлы, обновления зависимостей, ревью людьми.',
      body: `
Помощники сильны, но **ответственность на вас**.

## 1. Маленькие PR

Область изменений читается за один PR; большой рефакторинг режьте на обратимые шаги.

## 2. Путь проверки

Ручные чек‑листы или тесты—ввод, ожидание, границы. Без этого не мержим.

## 3. Секреты по умолчанию не трогаем

Шаблоны и локальные заполнения, не коммитим ключи.

## 4. Обновление зависимостей отдельным PR

Не смешивать с фичами — иначе бисект бессилен.

## 5. Архитектуру всё ещё смотрят люди

Каркас генерится легко, согласованность имён — взгляд коллеги.

Привычки важнее «какой редактор».
`.trim(),
    },
    hi: {
      title: 'AI के साथ कोडिंग: पाँच आदतें तेज़ और सुरक्षित',
      description: 'शाखा, परीक्षण, संवेदी फ़ाइलें, निर्भरता अपग्रेड, मानव समीक्षा।',
      body: `
सहायक शक्तिशाली हैं, पर **ज़िम्मेदारी आपकी** है।

## 1. छोटे कमिट/PR

एक PR में पचने योग्य दायरा; बड़ा रिफैक्टर चरणों में।

## 2. सत्यापन मार्ग

मैनुअल जाँच या परीक्षण—इनपुट, अपेक्षित, किनारे।

## 3. संवेदी फ़ाइलें डिफ़ॉल्ट न बदलें

कुंजी·उत्पादन कॉन्फ़िग टेम्पलेट+लोकल।

## 4. निर्भरता अपग्रेड अलग PR

फीचर के साथ मेजर बम्प न मिलाएँ।

## 5. वास्तुकला पर अभी भी इंसान

बॉयलरप्लेट आसान; नाम स्थिरता साथी की नज़र से।

संपादक चुनने से आदतें ज़्यादा मायनी रखती हैं।
`.trim(),
    },
    es: {
      title: 'Cinco hábitos al codificar con IA: más rápido y seguro',
      description: 'Ramas, pruebas, archivos sensibles, dependencias y revisión humana.',
      body: `
Los asistentes ayudan, pero **la responsabilidad sigue siendo tuya**.

## 1. Commits/PRs pequeños

Ámbito digerible en un PR; refactors grandes en pasos reversibles.

## 2. Ruta de verificación

Chequeos manuales o tests—entradas, esperado, bordes. Sin eso, no fusiones.

## 3. Secretos fuera por defecto

Plantillas y relleno local, nunca keys en repo.

## 4. Actualiza dependencias en PR aparte

No mezcles con features—el bisect falla.

## 5. Arquitectura humana

Boilerplate sí; coherencia de nombres merece un par de ojos.

Los hábitos ganan al «mejor editor».
`.trim(),
    },
  },

  '2026-03-29-privacy-hygiene.md': {
    date: '2026-03-29',
    slug: '2026-03-29-privacy-hygiene',
    en: {
      title: 'Privacy hygiene with everyday AI: a ten‑item checklist',
      description: 'Redaction, account separation, and API keys—readable even if you’re not engineering staff.',
      body: `
Dumping full customer rosters, unreleased earnings, or ID scans **directly into chats** is the easiest mistake to avoid. Treat this as a printable list.

1. **Assume chats may train models** unless the product clearly says otherwise *and* you trust compliance—redact or fictionalize first.  
2. Replace real client names with **internal codenames**; geography can stop at city level.  
3. **Blur screenshots**—watch status bars, browser tabs, mail sidebars.  
4. **Separate work and personal tenants** to stop accidental data cross‑pollution.  
5. Before **voice transcription**, confirm consent; sanitize again before external sharing.  
6. **API keys** live in env vars or vaults—never paste into a chat window.  
7. On **offboarding**, revoke third‑party integrations, not only passwords.  
8. Don’t post **intranet URLs or full internal logs** in public issues.  
9. For **medical/legal** topics treat model text as reference—decisions stay with licensed pros.  
10. **Revisit privacy policies** occasionally, especially data retention and training clauses.

Short list—few people stick to all ten consistently.
`.trim(),
    },
    'zh-TW': {
      title: '日常用 AI 時的隱私衛生：十條清單',
      description: '從脫敏到帳號隔離，適合非技術讀者逐條自查。',
      body: `
把完整客戶名單、未公開財報、身分證照片**直接貼進對話**，是最常見也最容易避免的錯誤。下面是一份可列印自查的清單。

1. **預設對話會被用於改進模型**（除非產品明確聲明且你信任其合規），敏感內容先脫敏或虛構示例。
2. **公司內部代號**代替真實客戶名；地名可寫到城市級。
3. **截圖**裡先打碼再上傳，注意狀態列、瀏覽器分頁、郵件用戶端側邊欄。
4. **工作區與私人帳號分離**，減少誤把私人資料選進企業租戶。
5. **錄音轉寫**前確認參與人是否同意；對外分享紀要再脫敏一輪。
6. **API Key** 只放在環境變數或金鑰管理器，永不貼到聊天視窗。
7. **離職交接**時撤銷第三方整合授權，而不只改密碼。
8. **開源專案** issue 裡不要貼內網 URL 或內部日誌全文。
9. **醫療、法律**等高風險領域，把模型輸出當參考，決策仍聽持證專業人士。
10. **定期**看一次所用產品的隱私政策更新（尤其涉及訓練資料與保留期限）。

清單不長，能堅持的人不多。
`.trim(),
    },
    ja: {
      title: '日常のAI利用でプライバシー衛生：10項目',
      description: 'マスキングからテナント分離、APIキーまで非エンジニアにも読める。',
      body: `
顧客一覧や未公開決算、身分証スキャンを**そのまま貼る**のは避けやすい典型ミスです。

1. **学習に使われる前提**—明示と信頼がなければマスクや架空例へ。  
2. 実名の代わりに**内部コードネーム**。地名は市区町村レベルまで等。  
3. **スクショはぼかし**—ステータスバー・タブ・メールサイドバーに注意。  
4. **仕事用と私用テナント分離**。  
5. **音声文字起こし**は同意確認、外部共有前に再マスク。  
6. **APIキー**は環境変数/ボールトのみ。  
7. **退職時**はサードパーティ連携も失効。  
8. 公開issueに**内製URLやフルログ**を貼らない。  
9. **医療・法律**は参考、判断は資格者へ。  
10. **プライバシーポリシー**を時々再確認。

短いが続く人は少ない。
`.trim(),
    },
    ko: {
      title: '일상 AI 사용의 프라이버시 위생: 10가지',
      body: `
고객 명단·미공개 실적·신분증을 **그대로 붙여넣기**는 흔하고 피하기 쉬운 실수입니다.

1. **학습에 쓰일 수 있다 가정**—민감 정보는 가명·삭제 후.  
2. 실명 대신 **내부 코드명**.  
3. **스크린샷 모자이크**—상태 표시줄·탭.  
4. **업무/개인 테넌트 분리**.  
5. **음성 전사** 전 동의, 외부 공유 전 재마스킹.  
6. **API 키**는 환경변수·금고만.  
7. **퇴사** 시 타사 연동 해제.  
8. 공개 이슈에 **인트라넷 URL·풀 로그** 금지.  
9. **의료·법률**은 참고, 판단은 면허 보유자.  
10. **개인정보 처리방침** 주기적 확인.

짧은 목록이지만 모두 지키기는 어렵습니다.`,
      description: '비기술 독자도 따라 할 수 있는 비식별·계정 분리·API 키 규칙.',
    },
    ru: {
      title: 'Гигиена приватности с «повседневным» ИИ: 10 пунктов',
      description: 'Маскировка, разделение аккаунтов и API‑ключи—even без инженерного бэкграунда.',
      body: `
Слить в чат **полные списки клиентов, черновую отчётность или сканы документов** — ошибка, которую легче всего не совершить.

1. **Считайте, что диалог может пойти в обучение**, пока продукт явно не сказал обратное — маскируйте или выдумывайте примеры.  
2. Реальные имена → **внутренние коды**; география до города.  
3. **Размывайте скриншоты** — статус‑бар, вкладки, почтовые боковые панели.  
4. **Разделяйте рабочие и личные арендаторы**.  
5. Перед **расшифровкой звонка** — согласие; перед внешней отправкой ещё раз маскируйте.  
6. **API‑ключи** только в переменных окружения/сейфах.  
7. При **увольнении** отзывайте OAuth‑интеграции, не только пароли.  
8. В публичных issue **не кладите intranet URL и полные логи**.  
9. **Медицина/право** — текст модели как справка, решение за специалистом.  
10. **Перечитывайте политики** — хранение и обучение.

Короткий список, мало кто держит все десять постоянно.
`.trim(),
    },
    hi: {
      title: 'रोज़मर्रा AI के साथ गोपनीयता: दस बिंदु',
      description: 'मास्किंग, खाता अलगाव, API कुंजी—गैर‑तकनीकी पाठक भी।',
      body: `
ग्राहक सूची, अप्रकाशित आंकड़े, ID स्कैन **सीधे चैट में**—सबसे आसानी से टाली जा सकने वाली गलती।

1. **प्रशिक्षण मानकर**—जब तक उत्पाद स्पष्ट न कहे, डी‑आईडी करें।  
2. असली नाम की जगह **आंतरिक कोड**।  
3. **स्क्रीनशॉट धुंधला**—स्टेटस बार, टैब।  
4. **काम/व्यक्तिगत किरायेदार अलग**।  
5. **आवाज़ ट्रांसक्रिप्ट** से पहले सहमति।  
6. **API कुंजी** केवल env/वॉल्ट।  
7. **ऑफबोर्डिंग** पर तीसरे पक्ष रद्द।  
8. सार्वजनिक issue में **इंट्रानेट URL/पूर्ण लॉग** नहीं।  
9. **चिकित्सा/कानूनी**—निर्णय लाइसेंसधारी के पास।  
10. **गोपनीयता नीति** समय‑समय पर।

छोटी सूची—सब पर टिकना मुश्किल।
`.trim(),
    },
    es: {
      title: 'Higiene de privacidad con IA cotidiana: diez puntos',
      description: 'Enmascarado, separación de cuentas y API keys—legible sin ser ingeniero.',
      body: `
Pegar listas de clientes, cifras no publicadas o DNI **directo al chat** es el error más fácil de evitar.

1. **Asume posible entrenamiento** salvo promesa clara—redacta o ficticia.  
2. **Alias internos** por nombres reales; ciudad basta para geo.  
3. **Difumina capturas**—barra de estado, pestañas, bandeja.  
4. **Separa tenants** laboral/personal.  
5. **Transcripción** con consentimiento; re‑enmascara antes de compartir.  
6. **API keys** solo en variables/bóveda.  
7. En **offboarding**, revoca integraciones.  
8. No **URL intranet ni logs completos** en issues públicos.  
9. **Médico/legal**: la IA es referencia; decide un profesional.  
10. **Relee políticas** de retención y entrenamiento.

Lista corta; pocos cumplen las diez siempre.
`.trim(),
    },
  },

  '2026-03-28-multimodal-roundup.md': {
    date: '2026-03-28',
    slug: '2026-03-28-multimodal-roundup',
    en: {
      title: 'Multimodal models: a quick weekly lens (sample)',
      description: 'Image, speech, and video understanding are reshaping creative and automation workflows.',
      body: `
Three threads worth watching this week:

1. **Toolchain integration**: single models turn into **composable pipelines**.  
2. **On‑device & privacy**: hybrid deployment is the default in some niches.  
3. **Eval transparency**: finer benchmarks and reproducible reports help buyers choose.

> This article is sample news—replace in repo with real reporting when ready.
`.trim(),
    },
    'zh-TW': {
      title: '多模態模型一週速覽（占位範例）',
      description: '圖像、語音與影片理解能力的快速迭代，正在改變內容創作與自動化工作流。',
      body: `
本週可以關注三件事：

1. **工具鏈整合**：從「單點模型」走向「可編排的工作流」。
2. **端側與隱私**：本地推理與混合部署在部分場景成為預設選項。
3. **評測透明化**：更細粒度的基準與可復現報告，幫助使用者做選擇。

> 本文為示例資訊，可在儲存庫中替換為真實稿件。
`.trim(),
    },
    ja: {
      title: 'マルチモーダル週報（サンプル）',
      description: '画像・音声・動画理解の速い進化が制作と自動化を変えていく。',
      body: `
今週の観測ポイント3つ：

1. **ツールチェーン統合**：単体モデルから**組み合わせ可能なパイプライン**へ。  
2. **オンデバイスとプライバシー**：一部領域ではハイブリッドが既定に。  
3. **評価の透明性**：細かいベンチと再現性のあるレポートが選定を助ける。

> サンプル記事—準備ができたら実稿に差し替えてください。
`.trim(),
    },
    ko: {
      title: '멀티모델 주간 스냅샷(샘플)',
      body: `
이번 주 살펴볼 세 가지:

1. **툴체인 통합**: 단일 모델에서 **조합 가능한 파이프라인**으로.  
2. **온디바이스·프라이버시**: 일부 분야에서 하이브리드가 기본.  
3. **평가 투명성**: 더 촘촘한 벤치와 재현 가능한 보고.

> 샘플 기사—실제 보도로 교체하세요.`,
      description: '이미지·음성·영상 이해가 창작·자동화 흐름을 바꾸는 중.',
    },
    ru: {
      title: 'Мультимодельная сводка недели (пример)',
      description: 'Понимание изображений, речи и видео меняет творческие и автоматические процессы.',
      body: `
Три темы недели:

1. **Интеграция в цепочки** — от одиночных моделей к **конвейерам**.  
2. **On‑device и приватность** — гибрид стал нормой в части ниш.  
3. **Прозрачные бенчмарки** — помогают выбирать осознанно.

> Это пример новости — замените реальным материалом в репозитории.
`.trim(),
    },
    hi: {
      title: 'मल्टीमोडल साप्ताहिक (नमूना)',
      description: 'छवि, वाचन और वीडियो समझ रचनात्मक व स्वचालित वर्कफ़्लो बदल रहे हैं।',
      body: `
इस सप्ताह तीन बातें:

1. **टूलचेन एकीकरण**—एकल मॉडल से **कंज्यूमेबल पाइपलाइन**।  
2. **डिवाइस पर व गोपनीयता**—कुछ क्षेत्रों में मिश्रित तैनाती डिफ़ॉल्ट।  
3. **मूल्यांकन पारदर्शिता**—बेहतर बेंचमार्क व प्रतिलिपि योग्य रिपोर्ट।

> नमूना समाचार—तैयार होने पर वास्तविक रिपोर्ट से बदलें।
`.trim(),
    },
    es: {
      title: 'Resumen multimodal de la semana (ejemplo)',
      description: 'Imagen, voz y vídeo están remodelando flujos creativos y de automatización.',
      body: `
Tres hilos esta semana:

1. **Integración en cadenas**: modelos sueltos → **tuberías componibles**.  
2. **En dispositivo y privacidad**: despliegue híbrido por defecto en algunos nichos.  
3. **Evaluaciones transparentes**: benchmarks finos y informes reproducibles.

> Noticia de ejemplo—sustituye por reportaje real en el repo.
`.trim(),
    },
  },

  '2026-03-27-image-prompt-checklist.md': {
    date: '2026-03-27',
    slug: '2026-03-27-image-prompt-checklist',
    en: {
      title: 'Text‑to‑image prompts: a cheat sheet for most jobs',
      description: 'Subject, style, light, lens, and negatives—structured beats adjective spam.',
      body: `
Every product parses prompts differently, but **structure** travels well. Fill in this order instead of stacking adjectives blindly.

## Suggested order

1. **Subject**: who/what, count, pose or action.  
2. **Environment**: indoor/outdoor, era, tidy vs messy.  
3. **Style**: photo vs illustration vs 3D; reference artists or film stock if useful.  
4. **Light & time**: soft/hard light, golden hour, neon night.  
5. **Lens**: wide vs tele, depth of field, high/low angle.  
6. **Negative prompts** (if supported): no watermark text, no extra fingers, no heavy distortion.

## Tips

- **Broad first, tight second**—explore composition, then iterate details.  
- Run the **same scaffold** across models to see which fits your taste.  
- **Copyright & likeness**: check training policies and portrait rights before commercial use.

Image gen is trial and error—**structured prompts** cut wasted rolls.
`.trim(),
    },
    'zh-TW': {
      title: '文生圖提示詞：一張小抄搞定八成需求',
      description: '主體、風格、光線、鏡頭與負面提示怎麼寫，出圖更可控。',
      body: `
不同產品對提示詞解析不同，但**結構**可以通用。按下面順序填，比堆形容詞更穩。

## 順序建議

1. **主體**：誰／什麼，數量，關鍵動作或姿態。
2. **環境**：室內戶外、時代感、簡潔或雜亂。
3. **風格**：攝影／插畫／3D；參考某位畫家或某種膠片。
4. **光線與時間**：柔光、硬光、黃金時刻、夜景霓虹。
5. **鏡頭**：廣角／長焦、景深淺深、俯視仰視。
6. **負面提示**（若支援）：不要文字浮水印、不要多手指、不要畸變。

## 小技巧

- **先寬後窄**：第一張探索構圖，鎖定後再加細節形容詞迭代。
- **同一套詞**在不同模型上各跑一張，對比再定主用模型。
- **版權與肖像**：商用前確認訓練資料政策與人物肖像權。

出圖是試錯過程，**結構化提示**能減少無效嘗試。
`.trim(),
    },
    ja: {
      title: '画像生成プロンプト：だいたい8割のチェックリスト',
      description: '主題・スタイル・光・レンズ・ネガで、形容詞の羅列より制御しやすく。',
      body: `
製品ごとに解釈は違っても**構造**は共通です。順に埋めていきます。

## 順番

1. **主題**：誰/何、数、ポーズ。  
2. **環境**：室内外、時代、雑然度。  
3. **スタイル**：写真/イラスト/3D、参照作家やフィルム。  
4. **光と時間**：柔/硬、ゴールデンアワー、ネオン夜景。  
5. **レンズ**：広角/望遠、ボケ、俯瞰/仰視。  
6. **ネガティブ**（対応時）：透かし文字、多指、強い歪みなど。

## コツ

- **最初は広く、次に絞る**。  
- **同じ骨格**をモデル横断で試す。  
- **商用は権利確認**。

試行錯誤は避けられませんが**構造化**で無駄撃ちは減ります。
`.trim(),
    },
    ko: {
      title: '텍스트-이미지 프롬프트: 작은 치트시트',
      body: `
제품마다 다르지만 **구조**는 통합니다.

## 순서

1. **주제**: 누가/무엇, 수, 자세.  
2. **환경**: 실내·야외, 시대, 정돈.  
3. **스타일**: 사진/일러스트/3D.  
4. **빛·시간**.  
5. **렌즈**.  
6. **네거티브**(지원 시).

## 팁

- **넓게 후 좁게**.  
- **같은 뼈대**로 모델 비교.  
- **상업용은 권리 확인**.

구조화된 프롬프트가 낭비를 줄입니다.`,
      description: '피사체, 스타일, 조명, 렌즈, 네거티브—형용사 남발보다 낫다.',
    },
    ru: {
      title: 'Промпты для картинок: шпаргалка на большинство задач',
      description: 'Субъект, стиль, свет, объектив и негативы — структура бьёт простыню прилагательных.',
      body: `
Парсеры разные, но **порядок полей** почти универсален.

## Последовательность

1. **Субъект**: кто/что, количество, поза.  
2. **Среда**: помещение/улица, эпоха, порядок.  
3. **Стиль**: фото, иллюстрация, 3D, референсы.  
4. **Свет и время**.  
5. **Оптика** — широко/длинно, ГРИП, ракурс.  
6. **Негатив** если есть: без водяного текста, без лишних пальцев.

## Советы

- Сначала **широко**, потом детали.  
- Один **каркас** на разных моделях.  
- **Права и портрет** перед коммерцией.

Генерация — перебор; **структура** экономит прогоны.
`.trim(),
    },
    hi: {
      title: 'टेक्स्ट‑टू‑इमेज प्रॉम्प्ट: डोंगी पन्ना',
      description: 'विषय, शैली, प्रकाश, लेंस व नकारात्मक—संरचना विषेशण ढेर से बेहतर।',
      body: `
हर उत्पाल अलग पार्स करता है, पर **क्रम** लगभग सार्वभौमिक है।

## क्रम

1. **विषय**  
2. **वातावरण**  
3. **शैली**  
4. **प्रकाश व समय**  
5. **लेंस**  
6. **नकारात्मक** (यदि हो)

## सुझाव

- पहले **चौड़ा**, फिर **सख्त**.  
- एक **ढाँचा** अनेक मॉडलों पर।  
- **व्यावसायिक उपयोग पर अधिकार**.

संरचित प्रॉम्प्ट बेकार प्रयास कम करते हैं।
`.trim(),
    },
    es: {
      title: 'Prompts de imagen: guía breve para la mayoría de casos',
      description: 'Sujeto, estilo, luz, lente y negativos—mejor estructura que adjetivos.',
      body: `
Cada motor parsea distinto, pero **la estructura** suele viajar bien.

## Orden

1. **Sujeto**  
2. **Entorno**  
3. **Estilo**  
4. **Luz y hora**  
5. **Lente**  
6. **Negativo** si aplica

## Tips

- **Ancho primero, fino después**.  
- **Misma armazón** en varios modelos.  
- **Derechos** antes de uso comercial.

Prompts estructurados reducen tiradas inútiles.
`.trim(),
    },
  },

  '2026-03-26-writing-with-ai.md': {
    date: '2026-03-26',
    slug: '2026-03-26-writing-with-ai',
    en: {
      title: 'Writing with AI: delegate vs own',
      description: 'Outlines, tone variants, and fact‑checking—how to split work so it still sounds human.',
      body: `
Models shine at **structure, transitions, and tone variants**; they don’t **carry liability for facts or viewpoints**. Divide labor clearly and the draft reads more human.

## Hand to the model

- Bullet‑to‑outline expansion and bridge sentences.  
- Rewrite long sentences for simpler reading (set reading level).  
- Formal vs casual **dual drafts** for A/B.  
- Several **title and lede** options to pick from.

## Keep yourself

- **Facts, numbers, proper nouns** verification.  
- **Ethics and stance** calls.  
- **Personal anecdotes**—models invent; readers sense it.

Do a final pass deleting filler (“in today’s era”, “in conclusion”). The piece will breathe better.
`.trim(),
    },
    'zh-TW': {
      title: '用 AI 輔助寫作：適合交給它和必須自己扛的',
      description: '提綱、擴寫、改語氣與事實核對怎麼分工，減少「讀起來像 AI」的腔調。',
      body: `
寫作類任務裡，模型擅長**結構、銜接、多版本語氣**；不擅長**替你承擔事實與觀點責任**。分工清楚，成品更像人寫的。

## 適合交給模型的

- 根據要點**拉提綱**、補全過渡句。
- 把長句**改成更易讀**的短句（指定讀者水平）。
- 同一內容出**正式／口語**兩版做 A/B。
- **標題與摘要**多給幾個候選，你再選。

## 建議自己扛的

- **事實、數字、專有名詞**核對。
- **立場與倫理**判斷。
- **個人經歷與案例**細節，模型只能編，讀者能嗅出來。

最後通讀一遍，刪掉套話（「在當今時代」「綜上所述」這類），文章會順眼很多。
`.trim(),
    },
    ja: {
      title: 'AIと文章：任せる/自分で肩を代わる',
      description: '構成・改調・ファクトチェックの分業で「AIっぽさ」を減らす。',
      body: `
モデルは**構成・接続・トーン違いのバリエーション**が得意ですが**事実責任や価値判断**は引き受けません。

## 任せる

- 箇条から構成案・つなぎ文。  
- 読解レベルを指定した平易化。  
- 格式/口語の**二稿A/B**。  
- **見出しとリード**の複数候補。

## 人が持つ

- **数値・固有名・真偽**の検証。  
- **倫理と立場**。  
- **個人体験**は創作とバレやすい。

最後に「今日では」「結論として」などの詰め物を削ると息が通ります。
`.trim(),
    },
    ko: {
      title: 'AI 와 글쓰기: 맡길 것과 직접 할 것',
      body: `
모델은 **구조·전환·같은 내용의 톤 변주**에 강하고 **사실·견해 책임**은 못 집니다.

## 맡기기

- 요점→개요·디딤문.  
- 읽기 수준 맞춘 단문화.  
- 격식/구어 **쌍안**.  
- **제목·리드** 후보 여럿.

## 직접

- **숫자·고유명·사실** 검증.  
- **윤리·입장**.  
- **개인 일화**—지어내면 티납니다.

마지막에 「오늘날에는」「결론적으로」류를 걷어내면 숨이 트입니다.`,
      description: '개요, 톤 변주, 팩트체크—분담하면 더 사람 같게 읽힌다.',
    },
    ru: {
      title: 'Текст с ИИ: что отдать модели, что оставить себе',
      description: 'Планы, переливы тона и проверка фактов — чтобы не пахло шаблоном.',
      body: `
Модели сильны в **структуре, связках и вариантах тона**; **факты и позицию** всё равно несёте вы.

## Модели

- Развернуть тезисы в план и мостовые фразы.  
- Упростить длинные предложения (уровень читателя).  
- **Две версии** формально/разговорно.  
- Несколько **заголовков и лидов**.

## Вам

- **Проверка чисел и имён**.  
- **Этика и тон** отношения.  
- **Личные истории** — выдумки чувствуются.

Финальный проход: убрать воду вроде «в современную эпоху» — текст дышит легче.
`.trim(),
    },
    hi: {
      title: 'AI से लेखन: सौंपें बनाम खुद रखें',
      description: 'रूपरेखा, टोन, तथ्य जाँच—बाँटें ताकि मशीन जैसा न लगे।',
      body: `
मॉडल **ढाँचा, संक्रमण, टोन संस्करण** में मजबूत; **तथ्य व विचार दायित्व** आपका।

## मॉडल को

- बिंदुओं से रूपरेखा व पुल वाक्य।  
- पाठ स्तर बताकर सरलीकरण।  
- औपचारिक बनाम **अनौपचारिक जोड़ा**।  
- **शीर्षक व लीड** के विकल्प।

## आप

- **संख्याएँ, नाम, सच**।  
- **नीतिशास्त्र व रुख**।  
- **निजी किस्से**—गढ़ा लगता है।

अंत में भराव जैसे «आज के युग में» हटाएँ।
`.trim(),
    },
    es: {
      title: 'Escribir con IA: delegar vs quedarte',
      description: 'Estructura, tonos y hechos—reparte el trabajo para que suene humano.',
      body: `
El modelo brilla en **estructura, transiciones y variantes de tono**; no asume **hechos ni postura**.

## Dale al modelo

- De viñetas a esquema y frases puente.  
- Simplificar oraciones (nivel de lectura).  
- **Dos versiones** formal/coloquial.  
- Varios **titulares y lead**.

## Quédate tú

- **Cifras, nombres propios, verificación**.  
- **Ética y postura**.  
- **Anécdotas personales**—si las inventa, se nota.

Paso final: quita muletillas (“en la era actual”). Respira mejor.
`.trim(),
    },
  },

  '2026-03-25-model-choice-pragmatic.md': {
    date: '2026-03-25',
    slug: '2026-03-25-model-choice-pragmatic',
    en: {
      title: 'Don’t stop at leaderboards: three practical questions',
      description: 'Task shape, context window, and failure cost matter more than “strongest model” bragging.',
      body: `
Communities love “model X crushed benchmarks,” but product teams should answer three practical questions first.

## 1. Mostly reasoning or mostly retrieval?

**Heavy reasoning** (math proofs, gnarly refactors) favors specialized reasoning stacks; **retrieval‑heavy** support bots may hinge more on embeddings and RAG—the base model gap shrinks once infra is solid.

## 2. How much raw text fits per turn?

Massive contracts or repos need both **window size and $/token** to be tolerable. Sometimes “summarize then QA” beats jamming full text.

## 3. What’s the price of being wrong?

In health, finance, or public safety **add a human gate**—document automation boundaries. Strongest models don’t erase product liability.

Leaderboards inform; **scenario and risk** decide.
`.trim(),
    },
    'zh-TW': {
      title: '選型時別只比榜單：三個實際問題先問清楚',
      description: '任務類型、上下文長度與成本約束，比「最強模型」更能定方案。',
      body: `
社區裡常看到「某某模型又屠榜了」，但落到業務裡，先要回答三個實際問題。

## 1. 任務主要是推理還是檢索？

**強推理**（數學證明、複雜程式重構）傾向選推理專長的模型；**大量檢索+摘要**（客服、內部知識庫）可能更看嵌入與 RAG 工程，基座模型差距會被縮小。

## 2. 單次上下文要裝多少原文？

長合約、長程式庫，要確認**視窗**與**價格**是否同時可接受。有時「先摘要再問答」比硬塞全文便宜且更穩。

## 3. 失敗時代價是什麼？

醫療、金融、公共安全場景，**寧可多一步人工審核**，也要把自動化的邊界寫清楚。模型再強也不消除產品責任。

榜單是參考，**情境與風險**才是決策主語。
`.trim(),
    },
    ja: {
      title: '選定でベンチだけ見ない：実務三問',
      description: 'タスク形・文脈長・失敗コストが「最強」言葉より効く。',
      body: `
「ベンチで勝った」は参考にすぎない。**現場の三問**へ。

## 1. 推論中心か検索中心か

**強い推論**は専門モデルが有利。**検索+RAG主体**は埋め込みと管線で差が縮まりがち。

## 2. 1ターンに生テキストはどの程度

**ウィンドウとコスト**の両立。長文は先**要約してからQ&A**の方が安く安定することがあります。

## 3. 誤りの代償

医療・金融・公共性では**人のゲート**と責任分界を書き残す。モデル性能は責任を消しません。

ベンチは雑誌。**場面とリスク**が意思決定の主語。
`.trim(),
    },
    ko: {
      title: '모델 고를 때 리더보드만 보지 말기: 실무 질문 셋',
      body: `
커뮤니티는 «X가 벤치 찍었다»를 좋아하지만 제품팀은 **세 가지**부터.

## 1. 추론 vs 검색 비중

**무거운 추론**(수학, 난해한 리팩터)은 특화 스택. **검색·RAG**는 임베딩·파이프라인이 기여를 키움.

## 2. 한 턴에 원문이 얼마나

**윈도·$/토큰**. 긴 계약은 **요약 후 QA**가 나을 때가 있음.

## 3. 틀리면 대가

의료·금융·공공은 **사람 게이트**와 자동화 경계 문서화.

리더보드는 참고.**상황·리스크**가 결정.`,
      description: '작업 형태, 컨텍스트 창, 실패 비용이 «최강»보다 중요.',
    },
    ru: {
      title: 'Выбор модели: три вопроса важнее таблицы лидеров',
      description: 'Тип задачи, окно контекста и цена ошибки сильнее хвастовства «самой мощной».',
      body: `
Таблицы интересны, но продукт начинает с **трёх практик**.

## 1. Больше рассуждать или больше искать?

**Тяжёлое рассуждение** — специализированные стеки; **поиск+RAG** — важнее эмбеддинги и инфраструктура, разрыв базовых моделей сужается.

## 2. Сколько сырого текста за запрос?

Длинные контракты требуют **окна и цены за токен**. Иногда «суммаризируй, потом спроси» дешевле и стабильнее.

## 3. Цена ошибки?

Медицина, финансы, публичная безопасность — **человеческий контур** и описанные границы автоматизации. Сила модели не снимает liability.

Лидеры информируют; **сценарий и риск** решают.
`.trim(),
    },
    hi: {
      title: 'लидरबोर्ड से आगे: तीन व्यावहारिक सवाल',
      description: 'कार्य प्रकार, संदर्भ खिड़की, गलती की कीमत—«सबसे ताकतवर» से ज़्यादा मायने रखते हैं।',
      body: `
समुदाय पसंद करता है «X ने बेंच हराया»—पर तीन **व्यावहारिक** प्रश्न पहले।

## 1. ज़्यादा तर्क या खोज?

**भारी तर्क**—विशेष स्टैक। **खोज+RAG**—एम्बेडिंग व पाइपलाइन बड़ा योगदान।

## 2. प्रति बार कितना कच्चा टेक्स्ट?

**विंडो व $/टोकन**। लंबे अनुबंध में **पहले सार फिर Q&A** सस्ता।

## 3. गलती की कीमत?

स्वास्थ्य, वित्त, सार्वजनिक सुरक्षा—**मानव गेट** व सीमाएँ लिखें।

लिडरबोर्ड सूचना है; **परिदृश्य व जोखिम** निर्णय।
`.trim(),
    },
    es: {
      title: 'Más allá del leaderboard: tres preguntas prácticas',
      description: 'Forma de la tarea, ventana de contexto y coste del fallo importan más que «el más fuerte».',
      body: `
Las tablas motivan, pero un producto arranca con **tres cosas**.

## 1. ¿Razonamiento o recuperación?

**Razonamiento duro** favorece stacks específicos; **RAG masivo** depende más de embeddings y tubería.

## 2. ¿Cuánto texto crudo por turno?

Contratos largos exigen **ventana y $/token**. A veces «resume y luego pregunta» gana.

## 3. ¿Precio del error?

Salud, finanzas, seguridad pública — **puerta humana** y límites documentados. Un modelo fuerte no borra responsabilidad.

Los rankings informan; **escenario y riesgo** deciden.
`.trim(),
    },
  },

  '2026-03-24-industry-snapshot.md': {
    date: '2026-03-24',
    slug: '2026-03-24-industry-snapshot',
    en: {
      title: 'Q1 glance: models sprint, products chase execution',
      description: 'Public signals on cadence, enterprise buying, open weights, and information overload (not investment advice).',
      body: `
Stack public notes and community chatter and a few **repeating Q1 themes** appear (no tickers or price talk).

## Release cadence

Multimodality and **agentic** surfaces remain the storyline—vision, browsers, more APIs get pilot budgets faster than **text‑only chat** narratives.

## Enterprise buyers

Procurement cares about **data residency, audit logs, roles**, and **vendor viability** more than saving a fraction of a cent per token. Pilots stretch from departments to company‑wide through security/legal gates.

## Builders

Open weights and tooling stay lively; **self‑host plus hybrid cloud** discussions are louder—people also admit **ops + eval overhead** must hit the total cost of ownership.

## Everyday users

More choices mean **more noise**—curated directories, docs, and trustworthy reviews beat chasing every new brand name.

This is an opinion column—verify with official product pages.
`.trim(),
    },
    'zh-TW': {
      title: '一季度觀察：模型迭代快，產品在拼「落地與治理」',
      description: '從發布節奏到企業採購，幾條公開資訊裡能讀出的共性（非投資建議）。',
      body: `
把公開報導與社區討論放在一起，今年一季度有幾條**重複出現的主題**（不涉及任何個股或價格預測）。

## 發布節奏

多模態與「代理化」能力仍是主線：能看圖、能操作瀏覽器、能接更多 API 的產品更容易拿到試用預算。**單一文字聊天**的增長故事在變難講。

## 企業側

採購更關心**資料駐留、稽核日誌、角色權限**與**供應商存續**，而不是單次推理便宜幾分錢。合約週期拉長，試點從「部門級」擴到「全公司」要跨安全與法務。

## 開發者側

開源權重與工具鏈繼續繁榮，**自託管 + 混合雲**的討論變多；同時大家更清醒：**維運與評測成本**算進總帳才有意義。

## 對普通使用者

可選產品更多，但**資訊過載**也更重——學會用導航、文件與社區評價篩選，比追每一個新名字更省力。

以上為行業觀察隨筆，具體產品請以官方說明為準。
`.trim(),
    },
    ja: {
      title: '四半期の一瞥：モデルは速く、プロダクトは実行力と統治',
      description: '公開シグナルから見えるリズム・企業調達・OSS・情報過多（投資助言ではありません）。',
      body: `
公開情報とコミュニティ話題を重ねると、Q1に**繰り返し出る筋**が見えます（銘柄・価格は扱いません）。

## リリースのテンポ

マルチモーダルと**エージェント的**表面の話が続く—画像、ブラウザ、API拡張の方が試作予算を取りやすい。**テキストのみチャット**単体の物語りは難しく。

## エンプラ調達

**データレジデンシ、監査ログ、ロール、ベンダ寿命**がトークン1回の安さより重要。パイロットはセキュリティ/法務のゲートを越えて部門から全社へ伸びる。

## 開発者

オープンウェイトとツールは活況。**自ホスト+ハイブリッド**の声が大きい一方、**運用と評価のオーバーヘッド**をTCOに入れる話も現実的に。

## 一般利用者

選択肢肥厚は**ノイズ増**—キュレーションされたナビや信頼レビューが、新名追いかけより効く。

コラムです。製品は公式情報で確認を。
`.trim(),
    },
    ko: {
      title: '1분기 스냅샷: 모델은 빠르고, 제품은 실행·거버넌스',
      body: `
공개 자료와 커뮤니티를 겹치면 **반복되는 Q1 테마**(투자 조언 아님).

## 출시 속도

멀티모달·**에이전트적** 표면이 주류—브라우저·API 확장이 파일럿 예산을 덜어오기 쉽습니다. **텍스트만 챗** 서사는 어려워짐.

## 엔터프라이즈

**데이터 상주·감사 로그·역할·벤더 지속성**이 토큰 몇 푼보다 중요. 파일럿은 보안·법무 게이트를 넘어 부서→전사로.

## 빌더

오픈 웨이트와 툴은 활발.**자체 호스팅+하이브리드** 논의가 커지고 **운영·평가 비용**을 TCO에 넣는 목소리도 현실적으로.

## 일반 사용자

선택지↑ = **노이즈↑**—큐레이션 내비·문서·신뢰 리뷰가 매번 새 이름 쫓기보다 낫습니다.

칼럼—제품은 공식 페이지로 확인.`,
      description: '공개 신호: 속도, 기업 구매, 오픈 가중치, 정보 과부하.',
    },
    ru: {
      title: 'Взгляд на I квартал: модели бегут, продукты — за исполнением',
      description: 'Публичные сигналы о ритме релизов, корпзакупках, open weights и шуме (не инвестсовет).',
      body: `
Если сложить открытые заметки и обсуждения, всплывают **повторяющиеся темы** без тикеров и прогнозов цен.

## Темп релизов

Мультимодальность и **агентные** интерфейсы — зрение, браузер, больше API получают бюджеты быстрее, чем истории «просто текстовый чат».

## Корпоративные закупки

**Резидентность данных, аудит, роли, жизнеспособность вендора** важнее экономии долей цента за токен. Пилоты растут через security/legal.

## Разработчики

Открытые веса и инструменты живы; **self‑host + гибрид** обсуждают чаще, но и **ops/eval** включают в TCO.

## Обычные пользователи

Больше выбора ⇒ **больше шума**—курируемые каталоги и обзоры беготни за брендами.

Колонка мнений — сверяйтесь с официальными страницами продуктов.
`.trim(),
    },
    hi: {
      title: 'तीन महीने की झलक: मॉडल तेज़, उत्पाद निष्पादन पर',
      description: 'सार्वजनिक संकेत—रिलीज़, एंटरप्राइज़, ओपन वेट, सूचना अतिभार (निवेश सलाह नहीं)।',
      body: `
सार्वजनिक टिप्पणी व चर्चा—**दोहराए जाने वाले विषय** (कोई स्टॉक/मूल्य नहीं)।

## रिलीज़ लय

मल्टीमोडल व **एजेंटिक** सतहें—ब्राउज़र, API; **केवल टेक्स्ट चैट** की कहानी मुश्किल।

## एंटरप्राइज़

**डेटा निवास, ऑडिट लॉग, भूमिकाएँ, विक्रेता जीवन** टोकन की कुछ पैसों से ऊपर।

## डेवलपर

ओपन वेट व टूल जीवंत; **सेल्फ‑होस्ट+हाइब्रिड**; **ऑप्स+मूल्यांकन** कुल लागत में।

## उपयोक्ता

अधिक विकल्प = **अधिक शोर**—क्यूरेटेड निर्देशिका बेहतर।

राय स्तंभ—आधिकारिक पृष्ठ देखें।
`.trim(),
    },
    es: {
      title: 'Mirada al primer trimestre: modelos rápidos, productos aterrizando',
      description: 'Señales públicas sobre ritmo, compras enterprise, pesos abiertos y ruido (no es asesoramiento financiero).',
      body: `
Cruzando notas públicas y charla comunitaria aparecen **temas que se repiten** (sin tickers ni precios).

## Ritmo de lanzamiento

Multimodalidad y capas **agénticas** siguen mandando—visión, navegador, más APIs ganan pilotos antes que el relato del chat solo texto.

## Compradores enterprise

**Residencia de datos, auditoría, roles, viabilidad del proveedor** pesan más que ahorrar fracciones de céntimo por token.

## Builders

Pesos abiertos y tooling activos; más **self‑host + híbrido** y conciencia del **coste ops+eval**.

## Usuarios cotidianos

Más opciones ⇒ **más ruido**—directorios curados y reseñas serias vencen perseguir nombres.

Columna de opinión—confirma en webs oficiales.
`.trim(),
    },
  },
}
