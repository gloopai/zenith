/** Shared strings for scripts/build-content-overlays.mjs */
export const OVERLAY_LOCALES = ['en', 'zh-TW', 'ja', 'ko', 'ru', 'hi', 'es']

export const CUSTOM_SKILL_PREFIX = {
  en: 'Example · ',
  'zh-TW': '自訂範例 · ',
  ja: 'カスタム例 · ',
  ko: '사용자 예시 · ',
  ru: 'Пример · ',
  hi: 'उदाहरण · ',
  es: 'Ejemplo · ',
}

/** Chinese canonical key → localized label */
export const OPENCLAW_CAT = {
  '安全 / 密码': {
    en: 'Security / Passwords',
    'zh-TW': '安全／密碼',
    ja: 'セキュリティ／パスワード',
    ko: '보안 / 비밀번호',
    ru: 'Безопасность / Пароли',
    hi: 'सुरक्षा / पासवर्ड',
    es: 'Seguridad / Contraseñas',
  },
  'Apple 生态': {
    en: 'Apple ecosystem',
    'zh-TW': 'Apple 生態',
    ja: 'Apple エコシステム',
    ko: 'Apple 생태계',
    ru: 'Экосистема Apple',
    hi: 'Apple इकोसिस्टम',
    es: 'Ecosistema Apple',
  },
  '信息 / 订阅': {
    en: 'Info / Subscriptions',
    'zh-TW': '資訊／訂閱',
    ja: '情報／購読',
    ko: '정보 / 구독',
    ru: 'Информация / Подписки',
    hi: 'जानकारी / सदस्यता',
    es: 'Información / Suscripciones',
  },
  智能家居: {
    en: 'Smart home',
    'zh-TW': '智慧家居',
    ja: 'スマートホーム',
    ko: '스마트 홈',
    ru: 'Умный дом',
    hi: 'स्मार्ट होम',
    es: 'Hogar inteligente',
  },
  '通讯 / 消息': {
    en: 'Messaging',
    'zh-TW': '通訊／訊息',
    ja: 'メッセージング',
    ko: '메시징',
    ru: 'Сообщения',
    hi: 'मैसेजिंग',
    es: 'Mensajería',
  },
  '媒体 / 采集': {
    en: 'Media / Capture',
    'zh-TW': '媒體／擷取',
    ja: 'メディア／キャプチャ',
    ko: '미디어 / 캡처',
    ru: 'Медиа / Захват',
    hi: 'मीडिया / कैप्चर',
    es: 'Medios / Captura',
  },
  '协作 / 画布': {
    en: 'Collaboration / Canvas',
    'zh-TW': '協作／畫布',
    ja: 'コラボレーション／キャンバス',
    ko: '협업 / 캔버스',
    ru: 'Совместная работа / Холст',
    hi: 'सहयोग / कैनवास',
    es: 'Colaboración / Lienzo',
  },
  '自动化 / 工作流': {
    en: 'Automation / Workflow',
    'zh-TW': '自動化／工作流程',
    ja: '自動化／ワークフロー',
    ko: '자동화 / 워크플로',
    ru: 'Автоматизация / Рабочие процессы',
    hi: 'स्वचालन / वर्कफ़्लो',
    es: 'Automatización / Flujo de trabajo',
  },
  '生态 / 注册表': {
    en: 'Ecosystem / Registry',
    'zh-TW': '生態／登錄庫',
    ja: 'エコシステム／レジストリ',
    ko: '생태계 / 레지스트리',
    ru: 'Экосистема / Реестр',
    hi: 'इकोसिस्टम / रजिस्ट्री',
    es: 'Ecosistema / Registro',
  },
  '开发 / 代码': {
    en: 'Development / Code',
    'zh-TW': '開發／程式碼',
    ja: '開発／コード',
    ko: '개발 / 코드',
    ru: 'Разработка / Код',
    hi: 'डेवलपमेंट / कोड',
    es: 'Desarrollo / Código',
  },
  '工具链 / CLI': {
    en: 'Tooling / CLI',
    'zh-TW': '工具鏈／CLI',
    ja: 'ツールチェーン／CLI',
    ko: '툴체인 / CLI',
    ru: 'Инструменты / CLI',
    hi: 'टूलचेन / CLI',
    es: 'Herramientas / CLI',
  },
  '生活 / 地点': {
    en: 'Life / Places',
    'zh-TW': '生活／地點',
    ja: '生活／場所',
    ko: '생활 / 장소',
    ru: 'Быт / Места',
    hi: 'जीवन / स्थान',
    es: 'Vida / Lugares',
  },
  '运维 / 监控': {
    en: 'Ops / Monitoring',
    'zh-TW': '維運／監控',
    ja: '運用／監視',
    ko: '운영 / 모니터링',
    ru: 'Эксплуатация / Мониторинг',
    hi: 'ऑप्स / मॉनिटरिंग',
    es: 'Operaciones / Monitoreo',
  },
  '通讯 / 邮件': {
    en: 'Email',
    'zh-TW': '電子郵件',
    ja: 'メール',
    ko: '이메일',
    ru: 'Почта',
    hi: 'ईमेल',
    es: 'Correo',
  },
  '开发 / 集成': {
    en: 'Development / Integrations',
    'zh-TW': '開發／整合',
    ja: '開発／連携',
    ko: '개발 / 통합',
    ru: 'Разработка / Интеграции',
    hi: 'डेवलपमेंट / एकीकरण',
    es: 'Desarrollo / Integraciones',
  },
  '文档 / PDF': {
    en: 'Docs / PDF',
    'zh-TW': '文件／PDF',
    ja: 'ドキュメント／PDF',
    ko: '문서 / PDF',
    ru: 'Документы / PDF',
    hi: 'दस्तावेज़ / PDF',
    es: 'Documentos / PDF',
  },
  '文档 / 知识库': {
    en: 'Docs / Knowledge base',
    'zh-TW': '文件／知識庫',
    ja: 'ドキュメント／ナレッジベース',
    ko: '문서 / 지식 베이스',
    ru: 'Документы / База знаний',
    hi: 'दस्तावेज़ / नॉलेज बेस',
    es: 'Documentos / Base de conocimiento',
  },
  '语音 / 转写': {
    en: 'Speech / Transcription',
    'zh-TW': '語音／轉寫',
    ja: '音声／書き起こし',
    ko: '음성 / 전사',
    ru: 'Речь / Транскрипция',
    hi: 'भाषण / ट्रांसक्रिप्शन',
    es: 'Voz / Transcripción',
  },
  '生活 / 服务': {
    en: 'Life / Services',
    'zh-TW': '生活／服務',
    ja: '生活／サービス',
    ko: '생활 / 서비스',
    ru: 'Быт / Сервисы',
    hi: 'जीवन / सेवाएँ',
    es: 'Vida / Servicios',
  },
  '系统 / 桌面': {
    en: 'System / Desktop',
    'zh-TW': '系統／桌面',
    ja: 'システム／デスクトップ',
    ko: '시스템 / 데스크톱',
    ru: 'Система / Рабочий стол',
    hi: 'सिस्टम / डेस्कटॉप',
    es: 'Sistema / Escritorio',
  },
  '系统 / 自动化': {
    en: 'System / Automation',
    'zh-TW': '系統／自動化',
    ja: 'システム／自動化',
    ko: '시스템 / 자동화',
    ru: 'Система / Автоматизация',
    hi: 'सिस्टम / स्वचालन',
    es: 'Sistema / Automatización',
  },
  '语音 / 合成': {
    en: 'Speech / Synthesis',
    'zh-TW': '語音／合成',
    ja: '音声／合成',
    ko: '음성 / 합성',
    ru: 'Речь / Синтез',
    hi: 'भाषण / संश्लेषण',
    es: 'Voz / Síntesis',
  },
  '生态 / 开发': {
    en: 'Ecosystem / Development',
    'zh-TW': '生態／開發',
    ja: 'エコシステム／開発',
    ko: '생태계 / 개발',
    ru: 'Экосистема / Разработка',
    hi: 'इकोसिस्टम / डेवलपमेंट',
    es: 'Ecosistema / Desarrollo',
  },
  '媒体 / 音乐': {
    en: 'Media / Music',
    'zh-TW': '媒體／音樂',
    ja: 'メディア／音楽',
    ko: '미디어 / 음악',
    ru: 'Медиа / Музыка',
    hi: 'मीडिया / संगीत',
    es: 'Medios / Música',
  },
  '文档 / 摘要': {
    en: 'Docs / Summaries',
    'zh-TW': '文件／摘要',
    ja: 'ドキュメント／要約',
    ko: '문서 / 요약',
    ru: 'Документы / Резюме',
    hi: 'दस्तावेज़ / सारांश',
    es: 'Documentos / Resúmenes',
  },
  '开发 / 终端': {
    en: 'Development / Terminal',
    'zh-TW': '開發／終端機',
    ja: '開発／ターミナル',
    ko: '개발 / 터미널',
    ru: 'Разработка / Терминал',
    hi: 'डेवलपमेंट / टर्मिनल',
    es: 'Desarrollo / Terminal',
  },
  '协作 / 项目': {
    en: 'Collaboration / Projects',
    'zh-TW': '協作／專案',
    ja: 'コラボレーション／プロジェクト',
    ko: '협업 / 프로젝트',
    ru: 'Совместная работа / Проекты',
    hi: 'सहयोग / प्रोजेक्ट',
    es: 'Colaboración / Proyectos',
  },
  '媒体 / 视频': {
    en: 'Media / Video',
    'zh-TW': '媒體／影片',
    ja: 'メディア／動画',
    ko: '미디어 / 비디오',
    ru: 'Медиа / Видео',
    hi: 'मीडिया / वीडियो',
    es: 'Medios / Video',
  },
  '语音 / 通话': {
    en: 'Voice / Calls',
    'zh-TW': '語音／通話',
    ja: '音声／通話',
    ko: '음성 / 통화',
    ru: 'Голос / Звонки',
    hi: 'आवाज़ / कॉल',
    es: 'Voz / Llamadas',
  },
  '生活 / 天气': {
    en: 'Life / Weather',
    'zh-TW': '生活／天氣',
    ja: '生活／天気',
    ko: '생활 / 날씨',
    ru: 'Быт / Погода',
    hi: 'जीवन / मौसम',
    es: 'Vida / Clima',
  },
  '通讯 / 社交': {
    en: 'Social',
    'zh-TW': '通訊／社交',
    ja: 'ソーシャル',
    ko: '소셜',
    ru: 'Соцсети',
    hi: 'सोशल',
    es: 'Social',
  },
}

export const OPENCLAW_HINT_OFFICIAL = {
  en: 'Bundled skill in the OpenClaw repository; requires local binaries and permissions where applicable.',
  'zh-TW': 'OpenClaw 套件庫內建技能；視情況需要本機二進位檔與權限。',
  ja: 'OpenClaw リポジトリ同梱スキル。環境によりローカルの実行ファイルと権限が必要です。',
  ko: 'OpenClaw 저장소에 포함된 스킬이며, 경우에 따라 로컬 바이너리와 권한이 필요합니다.',
  ru: 'Встроенный навык в репозитории OpenClaw; может потребоваться локальное ПО и разрешения.',
  hi: 'OpenClaw रिपॉज़िटरी में बंडल किया गया स्किल; ज़रूरत पड़ने पर लोकल बाइनरीज़ और अनुमतियाँ चाहिए।',
  es: 'Habilidad incluida en el repositorio OpenClaw; puede requerir binarios locales y permisos.',
}

export const OPENCLAW_HINT_COMMUNITY = {
  en: 'Community naming example; may not exist as a default bundled folder—implement your own SKILL.md if needed.',
  'zh-TW': '社群命名示例；未必有預設捆綁資料夾——必要時請自行撰寫 SKILL.md。',
  ja: 'コミュニティ由来の命名例。既定の同梱フォルダにない場合があります—必要なら自前の SKILL.md を用意してください。',
  ko: '커뮤니티 명명 예시이며 기본 번들 폴더에 없을 수 있습니다—필요하면 SKILL.md 를 직접 작성하세요.',
  ru: 'Пример именования сообщества; в поставке по умолчанию может отсутствовать — при необходимости добавьте свой SKILL.md.',
  hi: 'समुदाय नामकरण का उदाहरण; डिफ़ॉल्ट बंडले में न हो — जरुरत हो तो अपना SKILL.md लिखें।',
  es: 'Ejemplo de nombre comunitario; puede no existir como carpeta incluida por defecto—implemente su propio SKILL.md si hace falta.',
}

export function openClawTail(s, locale) {
  const slug = s.slug
  const t = {
    en: `Follow the AgentSkills layout under skills/${slug}/. See OpenClaw documentation and ClawHub for security and setup.`,
    'zh-TW': `請依 AgentSkills 目錄規範放置於 skills/${slug}/。安全與安裝請參考 OpenClaw 文件與 ClawHub。`,
    ja: `skills/${slug}/ 配下で AgentSkills レイアウトに従ってください。セキュリティとセットアップは OpenClaw ドキュメントと ClawHub を参照してください。`,
    ko: `skills/${slug}/ 에서 AgentSkills 레이아웃을 따르세요. 보안과 설정은 OpenClaw 문서와 ClawHub 를 확인하세요.`,
    ru: `Следуйте структуре AgentSkills в skills/${slug}/. Безопасность и настройка — в документации OpenClaw и ClawHub.`,
    hi: `skills/${slug}/ में AgentSkills लेआउट का पालन करें। सुरक्षा व सेटअप के लिए OpenClaw दस्तावेज़ और ClawHub देखें।`,
    es: `Sigue el diseño AgentSkills en skills/${slug}/. Consulta la documentación de OpenClaw y ClawHub para seguridad y configuración.`,
  }
  return t[locale] ?? t.en
}

export function openClawDescription(s, locale) {
  const hint = s.official ? OPENCLAW_HINT_OFFICIAL[locale] ?? OPENCLAW_HINT_OFFICIAL.en : OPENCLAW_HINT_COMMUNITY[locale] ?? OPENCLAW_HINT_COMMUNITY.en
  const tail = openClawTail(s, locale)
  return `${s.name}: ${hint} ${tail}`
}

export function localizeOpenClawCategory(c, locale) {
  if (c.startsWith('自定义示例 ·')) {
    const p = CUSTOM_SKILL_PREFIX[locale] ?? CUSTOM_SKILL_PREFIX.en
    return p + c.slice('自定义示例 ·'.length).trim()
  }
  return OPENCLAW_CAT[c]?.[locale] ?? OPENCLAW_CAT[c]?.en ?? c
}

const HIGHLIGHTS = {
  chatgpt: {
    en: 'OpenAI’s flagship chat assistant: multi-turn conversations, optional browsing (plan/region-dependent), uploads, and light analysis. Great for drafting, code snippets, and study help—check the site for model names and policies.',
    'zh-TW':
      'OpenAI 的旗艦對話助理：多輪對話、視方案與地區可選的聯網檢索、檔案上傳與輕量分析。適合草稿、程式片段與學習輔助——模型名稱與政策請以官網為準。',
    ja: 'OpenAI のフラッグシップ対話アシスタント。マルチターン会話、（プラン／地域次第で）ブラウジング、ファイル投入、軽い分析に対応。下書き・コード断片・学習補助に向く—モデル名と利用規約は公式サイトで確認。',
    ko: 'OpenAI 의 대표 챗 어시스턴트: 멀티턴 대화, 플랜·지역에 따른 선택적 웹 검색, 업로드, 가벼운 분석. 초안·코드 스니펫·학습 도움에 적합—모델명·정책은 공식 사이트 확인.',
    ru: 'Флагманский чат‑ассистент OpenAI: многоходовой диалог, опциональный веб‑поиск (зависит от тарифа и региона), загрузки и лёгкий анализ. Удобен для черновиков, кода и учёбы — модели и правила смотрите на сайте.',
    hi: 'OpenAI का मुख्य चैट असिस्टेंट: मल्टी-टर्न बातचीत, योजना/क्षेत्र के आधार पर वैकल्पिक ब्राउज़िंग, अपलोड और हल्का विश्लेषण। ड्राफ्ट, कोड स्निपेट और पढ़ाई में मददगार—मॉडल नाम व नीतियाँ साइट पर देखें।',
    es: 'Asistente estelar de OpenAI: conversación multivuelta, navegación opcional (según plan y región), cargas y análisis ligero. Útil para borradores, fragmentos de código y estudio—consulta modelos y políticas en el sitio oficial.',
  },
  claude: {
    en: 'Anthropic’s assistant model known for long context and careful reasoning; strong for code review, technical writing, and long documents via web or API.',
    'zh-TW': 'Anthropic 的助理模型，以長上下文與穩健推理著稱；透過網頁或 API，在程式審閱、技術寫作與長文件上表現突出。',
    ja: 'Anthropic のアシスタントモデル。長いコンテキストと慎重な推論が強み。ウェブ/ API でコードレビュー、技術文書、長文ドキュメントに適す。',
    ko: 'Anthropic 의 어시스턴트 모델. 긴 컨텍스트와 신중한 추론에 강함. 웹·API 로 코드 리뷰·기술 문서·긴 문서 작업에 적합.',
    ru: 'Модель‑ассистент Anthropic: длинный контекст и аккуратные рассуждения; хороша для ревью кода, техтекста и длинных документов (веб или API).',
    hi: 'Anthropic का असिस्टेंट मॉडल—लंबा संदर्भ और सावधानी से तर्क के लिए जाना जाता है; कोड रिव्यू, तकनीकी लेखन और लंबे दस्तावेज़ (वेब/API) के लिए मजबूत।',
    es: 'Modelo asistente de Anthropic, reconocido por contexto largo y razonamiento cuidadoso; sólido para revisión de código, escritura técnica y documentos extensos (web o API).',
  },
  'google-gemini': {
    en: 'Google’s multimodal model family tied to Google accounts and Workspace; good for search-assisted answers, email drafts, and quick summaries where available.',
    'zh-TW': 'Google 的多模態模型家族，與 Google 帳號及 Workspace 深度整合；適合搜尋輔助回答、郵件草稿與快速摘要（以實際開放功能為準）。',
    ja: 'Google アカウントと Workspace と連携するマルチモーダルモデル群。検索支援の回答、メール下書き、要約（提供範囲内）に向く。',
    ko: 'Google 계정·Workspace 와 연계된 멀티모달 모델 패밀리. 검색 보조 답변, 메일 초안, 빠른 요약(제공 범위内)에 적합.',
    ru: 'Семейство мультимодальных моделей Google с привязкой к аккаунтам и Workspace; удобно для ответов с поиском, черновиков почты и кратких выжимок где доступно.',
    hi: 'Google खातों और Workspace से जुड़ा मल्टीमोडल मॉडल परिवार; जहाँ उपलब्ध हो, खोज‑सहायक जवाब, ईमेल ड्राफ्ट और त्वरित सार के लिए अच्छा।',
    es: 'Familia multimodal de Google ligada a cuentas y Workspace; buena para respuestas con búsqueda, borradores de correo y resúmenes rápidos donde esté disponible.',
  },
  'microsoft-copilot': {
    en: 'Microsoft’s assistant embedded across Windows, Edge, and Microsoft 365 for drafts, page summaries, and light automation—review enterprise data rules if you use M365.',
    'zh-TW': '微軟助理，內建於 Windows、Edge 與 Microsoft 365，可用於草稿、頁面摘要與輕量自動化——若使用 M365 請留意企業資料規範。',
    ja: 'Windows・Edge・Microsoft 365 に組み込まれた Microsoft のアシスタント。草稿、ページ要約、軽い自動化向け— M365 利用時は企業データ方針を確認。',
    ko: 'Windows, Edge, Microsoft 365 에 깊게 통합된 Microsoft 어시스턴트. 초안·페이지 요약·가벼운 자동화—M365 사용 시 엔터프라이즈 데이터 규칙 확인.',
    ru: 'Ассистент Microsoft в Windows, Edge и Microsoft 365: черновики, сводки страниц, лёгкая автоматизация — для M365 проверьте корпоративные правила данных.',
    hi: 'Windows, Edge और Microsoft 365 में एम्बेडेड Microsoft सहायक: ड्राफ्ट, पृष्ठ सारांश और हल्का ऑटोमेशन—M365 पर एंटरप्राइज डेटा नियम देखें।',
    es: 'Asistente de Microsoft en Windows, Edge y Microsoft 365 para borradores, resúmenes de página y automatización ligera—revisa las reglas de datos empresariales con M365.',
  },
  deepseek: {
    en: 'Chinese-friendly model stack with web chat and API; often praised for code/math/value pricing—confirm compliance for your region before production.',
    'zh-TW': '對中文友善的模型與對話／API 產品組合，程式與數學、性價比常受好評——正式環境請再確認所在地合規。',
    ja: '中国語向けのモデルスタック。ウェブ/API でコード・数学・コスパで評価されがち—本番前に地域のコンプライアンスを確認。',
    ko: '중문에 친화적인 모델 스택. 웹/API 로 코드·수학·가성비에서 호평—프로덕션 전 지역 컴플라이언스 확인.',
    ru: 'Стек моделей с удобным китайским языком, веб‑чат и API; часто хвалят за код/математику/цену — перед продакшеном проверьте соответствие в вашем регионе.',
    hi: 'चीनी के अनुकूल मॉडल स्टैक, वेब चैट और API; कोड/गणित/कीमत के लिए सराहा जाता है—प्रोडक्शन से पहले क्षेत्रीय अनुपालन जाँचें।',
    es: 'Stack de modelos amigable con chino, chat web y API; suele destacar en código/matemáticas/precio—confirma cumplimiento regional antes de producción.',
  },
  kimi: {
    en: 'Moonshot’s Chinese-first assistant focused on long documents and link/file summaries—useful for papers, contracts, and long threads.',
    'zh-TW': '月之暗面主打中文的助理，強調長文件與連結／檔案摘要——論文、合約與長串對話都適用。',
    ja: 'Moonshot の中文中心アシスタント。長文やリンク/ファイル要約に強く、論文・契約・長いスレッドに便利。',
    ko: 'Moonshot 의 중문 우선 어시스턴트. 긴 문서·링크/파일 요약에 강함—논문·계약·긴 스레드에 유용.',
    ru: 'Ассистент Moonshot с упором на китайский язык: длинные документы и сводки ссылок/файлов — удобен для статей, договоров и длинных веток.',
    hi: 'Moonshot का चीनी‑प्रथम असिस्टेंट: लंबे दस्तावेज़ और लिंक/फ़ाइल सार—पेपर, कॉन्ट्रैक्ट और लंबे थ्रेड के लिए उपयोगी।',
    es: 'Asistente de Moonshot centrado en chino, con foco en documentos largos y resúmenes de enlaces/archivos—útil para papers, contratos e hilos largos.',
  },
  'tongyi-qianwen': {
    en: 'Alibaba’s model and app suite for chat, plugins, and industry scenarios—fits teams on Alibaba/DingTalk; individuals can try the web client.',
    'zh-TW': '阿里雲體系內的大模型與應用矩陣，涵蓋對話、外掛與行業方案——適合阿里／釘釘生態團隊；個人也可先試網頁版。',
    ja: 'Alibaba 系のモデル/アプリ群。チャット、プラグイン、業界シナリオ向け—阿里/ DingTalk チームに馴染む。個人はウェブから試せる。',
    ko: 'Alibaba 스위트의 모델·앱. 채팅·플러그인·업종 시나리오—阿里/딩톡 팀에 맞음. 개인은 웹 클라이언트로 체험.',
    ru: 'Модели и приложения Alibaba: чат, плагины, отраслевые сценарии — для команд в экосистеме Alibaba/DingTalk; лично можно попробовать веб‑клиент.',
    hi: 'Alibaba का मॉडल और ऐप सूट: चैट, प्लगइन, इंडस्ट्री परिदृश्य—Alibaba/DingTalk टीमों के लिए; व्यक्ति वेब क्लाइंट आज़मा सकते हैं।',
    es: 'Suite de modelos y apps de Alibaba para chat, plugins y escenarios sectoriales—encaja con equipos en Alibaba/DingTalk; particulares pueden probar el cliente web.',
  },
  'ernie-bot': {
    en: 'Baidu’s Chinese chat product with ties to search and Baidu services—check the site for current features and plans.',
    'zh-TW': '百度的中文對話產品，與搜尋與百度服務有連動——最新功能與方案以官網為準。',
    ja: 'Baidu の中文チャット製品。検索や Baidu サービスと連携—最新機能とプランはサイト確認。',
    ko: '바이두의 중문 챗 제품. 검색·바이두 서비스와 연동—기능·요금제는 사이트 확인.',
    ru: 'Китайский чат‑продукт Baidu с привязкой к поиску и сервисам — актуальные функции и тарифы на сайте.',
    hi: 'Baidu का चीनी चैट उत्पाद, खोज व Baidu सेवाओं से जुड़ा—सुविधाएँ व प्लान साइट पर देखें।',
    es: 'Producto de chat en chino de Baidu vinculado a la búsqueda y servicios Baidu—consulta funciones y planes en el sitio.',
  },
  doubao: {
    en: 'ByteDance’s assistant hub spanning chat and creative tools; handy for templates and domestic integrations—compare sub-products for export needs.',
    'zh-TW': '位元組跳動旗下的 AI 助理與多應用矩陣，涵蓋對話與創作工具；範本與在地整合方便——有匯出需求請比較各子產品。',
    ja: 'ByteDance の AI ハブ。チャットと創作ツールを横断—テンプレと国内連携に便利。書き出し要件はサブ製品を比較。',
    ko: '바이트댄스의 AI 허브. 채팅·크리에이티브 도구 포괄—템플릿·국내 연동에 편함. 내보내기는 하위 제품 비교.',
    ru: 'Хаб ассистентов ByteDance: чат и творческие инструменты; удобен для шаблонов и локальных интеграций — для экспорта сравните подпродукты.',
    hi: 'ByteDance का असिस्टेंट हब: चैट और रचनात्मक टूल; टेम्प्लेट और घरेलू इंटीग्रेशन के लिए सुविधाजनक—निर्यात ज़रूरतों के लिए उप‑उत्पादों की तुलना करें।',
    es: 'Hub de asistentes de ByteDance con chat y herramientas creativas; práctico para plantillas e integraciones locales—compara subproductos si necesitas exportar.',
  },
<<<<<<< Updated upstream
=======
  manus: {
    en: 'General-purpose autonomous assistant product from Manus AI: delegates multi-step browser and research-style tasks behind a chat interface—check the site for task limits, regions, and data handling.',
    'zh-TW':
      'Manus AI 旗下的通用型自主助理：在對話介面後承接多步驟的瀏覽與研究型任務——任務限制、地區與資料處理請以官網為準。',
    ja: 'Manus AI の汎用オートノマス系アシスタント。チャット越しにブラウザ調査などの手順タスクを任せられる—上限・地域・データは公式確認。',
    ko: 'Manus AI 의 범용 자율형 어시스턴트. 챗 뒤에서 다단계 브라우징·조사형 작업 위임—한도·지역·데이터 처리는 공식 사이트 확인.',
    ru: 'Универсальный автономный ассистент Manus AI: через чат ставит многошаговые браузерные и исследовательские задачи — лимиты, регионы и данные на сайте.',
    hi: 'Manus AI का सामान्य उद्देश्य वाला स्वायत्त सहायक: चैट के पीछे ब्राउज़र व शोध जैसे बहु‑चरण कार्य—सीमा, क्षेत्र व डेटा हैंडलिंग साइट पर।',
    es: 'Asistente autónomo de propósito general de Manus AI: delega tareas de navegación e investigación en varios pasos tras un chat—límites, regiones y datos en el sitio.',
  },
  lovable: {
    en: 'AI app builder from Lovable: prompt-first full-stack UI and backend scaffolding with iterative previews—verify export, hosting, and team permissions before committing to production workflows.',
    'zh-TW':
      'Lovable 的 AI 應用生成器：以提示驅動全端介面與後端鷹架，並可反覆預覽——上線前請確認匯出、託管與團隊權限是否符合需求。',
    ja: 'Lovable の AI アプリビルダー。プロンプト主導でフルスタック UI/ バックエンド骨格を反復プレビュー—本番前にエクスポート・ホスティング・権限を確認。',
    ko: 'Lovable 의 AI 앱 빌더. 프롬프트 중심 풀스택 UI·백엔드 뼈대와 반복 미리보기—프로덕션 전 내보내기·호스팅·팀 권한 확인.',
    ru: 'Конструктор приложений Lovable: UI и бэкенд из промптов с итеративными превью — перед продакшеном проверьте экспорт, хостинг и права команды.',
    hi: 'Lovable का AI ऐप बिल्डर: प्रॉम्प्ट से फुल‑स्टैक UI व बैकएंड ढाँचा, पुनरावृत्त पूर्वावलोकन—प्रोडक्शन से पहले निर्यात, होस्टिंग व टीम अनुमतियाँ जाँचें।',
    es: 'Constructor de apps Lovable: UI y backend full-stack desde prompts con vistas previas iterativas—antes de producción revisa exportación, hosting y permisos del equipo.',
  },
  devin: {
    en: 'Cognition’s “AI software engineer” product focused on multi-step coding tasks from tickets to pull requests—treat output as draft work; enforce human review, tests, security, and regional availability per your policy.',
    'zh-TW':
      'Cognition 旗下偏「AI 軟體工程師」定位的產品，處理從需求到 PR 的多步驟開發——仍應視為草稿產出，並落实審閱、測試、資安與地區可用性政策。',
    ja: 'Cognition の「AI ソフトウェアエンジニア」製品。チケットから PR までの多段工程向け—成果は下書き扱いで、人間レビュー・テスト・セキュリティ・地域ポリシーを必ず。',
    ko: 'Cognition 의 «AI 소프트웨어 엔지니어» 성향 제품. 티켓→PR 다단계 작업—출력은 초안으로, 리뷰·테스트·보안·지역 정책 필수.',
    ru: 'Продукт Cognition в духе «AI‑инженера»: многошаговые задачи от тикета до PR — считайте вывод черновиком; обязательны ревью, тесты, безопасность и региональная политика.',
    hi: 'Cognition का «AI सॉफ्टवेयर इंजीनियर» उत्पाद: टिकट से PR तक बहु‑चरण कोडिंग—आउटपुट को ड्राफ्ट मानें; मानव समीक्षा, टेस्ट, सुरक्षा व क्षेत्रीय नीति लागू करें।',
    es: 'Producto tipo “ingeniero de software con IA” de Cognition: tareas en varios pasos de ticket a PR—trata la salida como borrador; exige revisión humana, pruebas, seguridad y política regional.',
  },
  warp: {
    en: 'Modern terminal with AI assistance for completions, shared commands, and workflow blocks—ideal for heavy CLI and SSH users; confirm what leaves your machine when using cloud-backed AI features.',
    'zh-TW':
      '內建 AI 輔助的現代終端機，強調補全、工作流區塊與團隊片段分享——適合重度 CLI／SSH 使用者；雲端 AI 時請確認哪些指令與輸出會上傳。',
    ja: '補完・共有コマンド・ワークフローブロックを備える現代的ターミナル。CLI/ SSH ヘビーユー — クラウド AI 利用時は送信データを確認。',
    ko: 'AI 보조가 있는 현대적 터미널. 자동완성·공유 명령·워크플로 블록—CLI/SSH 다용도. 클라우드 AI 시 전송 데이터 확인.',
    ru: 'Современный терминал с ИИ: дополнения, общие команды, блоки рабочих процессов — для активных CLI/SSH; уточните, что уходит в облако при ИИ‑функциях.',
    hi: 'AI सहायता वाला आधुनिक टर्मिनल: पूर्णताएँ, साझा कमांड, वर्कफ़्लो ब्लॉक—CLI/SSH पावर यूज़र के लिए; क्लाउड AI पर क्या भेजा जाता है जाँचें।',
    es: 'Terminal moderna con IA: autocompletado, comandos compartidos y bloques de flujo—para usuarios intensivos de CLI/SSH; verifica qué datos salen al usar IA en la nube.',
  },
  zed: {
    en: 'Rust-built code editor with low-latency editing and multiplayer collaboration plus optional AI hooks—compare extension depth vs VS Code before switching your whole team.',
    'zh-TW':
      '以 Rust 寫成、強調低延遲編輯與多人協作的程式編輯器，並可接 AI——團隊全面遷移前請與 VS Code 等就外掛深度與工作流比較。',
    ja: 'Rust 製の低遅延エディタ。マルチプレイ協調編集と任意の AI 連携—チーム移行前に VS Code 等と拡張の深さを比較。',
    ko: 'Rust 기반 저지연 에디터. 멀티플레이 협업 편집·선택적 AI—팀 전환 전 VS Code 등과 확장 깊이 비교.',
    ru: 'Редактор кода на Rust с низкой задержкой и совместным редактированием плюс опциональный ИИ — сравните глубину расширений с VS Code перед миграцией команды.',
    hi: 'Rust पर बना कम‑लेटेंसी संपादक, मल्टीप्लेयर सहयोग व वैकल्पिक AI—टीम बदलने से पहले VS Code से एक्सटेंशन गहराई तुलना करें।',
    es: 'Editor en Rust con baja latencia y colaboración multijugador más IA opcional—compara profundidad de extensiones vs VS Code antes de migrar al equipo.',
  },
  granola: {
    en: 'Meeting notes product that pairs calendar context with transcription-friendly flows to turn calls into searchable summaries—validate retention, training use, and enterprise controls before rolling out company-wide.',
    'zh-TW':
      '會議筆記產品，常結合行事曆與轉寫流程，把通話變成可搜尋摘要——全公司推廣前請確認保存期限、模型訓練與企業管控選項。',
    ja: 'カレンダー文脈と文字起こしを組み合わせ、会議を検索可能な要約へ。全社展開前に保持・学習利用・企業管理を確認。',
    ko: '캘린더·전사 흐름과 맞춰 회의를 검색 가능 요약으로. 전사 도입 전 보존·학습 사용·엔터프라이즈 통제 확인.',
    ru: 'Заметки для встреч с календарным контекстом и транскрипцией в поисковые конспекты — перед корпоративным внедрением проверьте хранение, обучение моделей и контроль.',
    hi: 'कैलेंडर संदर्भ व ट्रांसक्रिप्शन के साथ मीटिंग नोट्स—कॉल को खोज योग्य सार में; कंपनीव्यापी रोडआउट से पहले रिटेन्शन, मॉडल ट्रेनिंग व एंटरप्राइज नियंत्रण जाँचें।',
    es: 'Notas de reunión con contexto de calendario y flujos de transcripción a resúmenes buscables—antes del despliegue corporativo revisa retención, uso para entrenamiento y controles enterprise.',
  },
  langsmith: {
    en: 'LangChain’s eval and trace platform for LLM apps—datasets, scorers, live monitoring, and human review with the deepest LangChain/LangGraph integration.',
    'zh-TW': 'LangChain 團隊的 LLM 評測與 trace 平台——資料集、評分器、線上監控與人工標註，與 LangChain/LangGraph 整合最深。',
    ja: 'LangChain 公式の評価・トレース基盤。データセット／スコアラー／本番監視／人手レビューを LangChain・LangGraph と最深統合。',
    ko: 'LangChain 공식 평가·트레이스 플랫폼. 데이터셋·스코어러·실시간 모니터링·사람 리뷰를 LangChain/LangGraph와 가장 깊게 연동.',
    ru: 'Платформа оценок и трейсинга от LangChain: датасеты, скореры, мониторинг и human review с глубочайшей интеграцией LangChain/LangGraph.',
    hi: 'LangChain की eval व trace प्लेटफ़ॉर्म—डेटासेट, स्कोरर, लाइव मॉनिटरिंग व मानव समीक्षा; LangChain/LangGraph से सबसे गहरा एकीकरण।',
    es: 'Plataforma de evals y traces de LangChain—datasets, scorers, monitoreo en vivo y revisión humana con la integración más profunda con LangChain/LangGraph.',
  },
  langfuse: {
    en: 'Open-source LLM observability and eval platform with traces, datasets, scorers, and prompt management—self-host via Docker to keep data on your own network.',
    'zh-TW': '開源 LLM 可觀測與評測平台：trace、資料集、評分器與提示管理；可 Docker 自部署，把資料留在內網。',
    ja: 'OSS の LLM 可観測・評価プラットフォーム。トレース／データセット／スコアラー／プロンプト管理、Docker でセルフホスト可能。',
    ko: '오픈소스 LLM 옵저버빌리티·평가 플랫폼. 트레이스·데이터셋·스코어러·프롬프트 관리, Docker 자체 호스팅 가능.',
    ru: 'Open-source платформа наблюдаемости и оценок LLM: трейсы, датасеты, скореры и управление промптами; self-host в Docker.',
    hi: 'ओपन‑सोर्स LLM ऑब्ज़र्वेबिलिटी व eval—trace, डेटासेट, स्कोरर व प्रॉम्प्ट प्रबंधन; Docker सेल्फ‑होस्ट विकल्प।',
    es: 'Plataforma open‑source de observabilidad y evals para LLM—traces, datasets, scorers y gestión de prompts; self‑host con Docker.',
  },
  pinecone: {
    en: 'Managed vector database with serverless tiers and namespaces—fast path to production RAG; compare cost at scale with Qdrant/Milvus self-host.',
    'zh-TW': '託管型向量資料庫，提供 Serverless 方案與命名空間；RAG 上線快，規模變大時再與 Qdrant／Milvus 自部署比較成本。',
    ja: 'マネージドのベクトルDB。サーバーレスと名前空間で RAG を速く本番化；規模拡大時は Qdrant/Milvus 自ホストと比較。',
    ko: '매니지드 벡터 DB. 서버리스 티어와 네임스페이스로 RAG를 빠르게 운영; 규모 커지면 Qdrant/Milvus 자체호스팅 비교.',
    ru: 'Управляемая векторная БД с serverless и namespace — быстрый путь к RAG в проде; на масштабе сверяйте цену с Qdrant/Milvus self-host.',
    hi: 'मैनेज्ड वेक्टर DB—serverless टियर व namespaces; उत्पादन RAG के लिए तेज़; बड़े स्केल पर Qdrant/Milvus से लागत तुलना करें।',
    es: 'Vector DB gestionada con tiers serverless y namespaces—camino rápido a RAG; a gran escala compara coste con Qdrant/Milvus self-host.',
  },
  qdrant: {
    en: 'Rust-built open-source vector DB with managed cloud and enterprise options—strong payload filtering, hybrid search, and quantization for tight memory/throughput budgets.',
    'zh-TW': 'Rust 打造的開源向量資料庫，附雲端與企業版；payload 過濾、混合搜索與量化壓縮兼顧記憶體與吞吐。',
    ja: 'Rust 製 OSS ベクトルDB。マネージドと企業版あり。ペイロードフィルタ／ハイブリッド検索／量子化でメモリと吞吐を両立。',
    ko: 'Rust로 구현한 오픈소스 벡터 DB. 매니지드·엔터프라이즈 제공, payload 필터·하이브리드·양자화로 메모리와 처리량 최적화.',
    ru: 'Open-source векторная БД на Rust с управляемой облачной и enterprise-версией; мощные фильтры по payload, гибридный поиск и квантование.',
    hi: 'Rust में बना ओपन‑सोर्स वेक्टर DB—मैनेज्ड व एंटरप्राइज़ विकल्प; payload फ़िल्टर, hybrid सर्च व quantization।',
    es: 'Vector DB open source en Rust con nube gestionada y enterprise—filtro por payload, búsqueda híbrida y cuantización para memoria/rendimiento.',
  },
  cerebras: {
    en: 'Wafer-scale inference service from Cerebras claiming extreme token throughput on popular open LLMs—great for latency-sensitive interactive apps; verify model list and quotas on the site.',
    'zh-TW': 'Cerebras 晶圓級推論服務，對主流開源 LLM 宣稱極速 token 吞吐；延遲敏感互動型應用首選，模型清單以官網為準。',
    ja: 'Cerebras ウェハースケールの推論。主要OSS LLMで極速のトークン吞吐。対話型用途に最適、モデル一覧は公式で確認。',
    ko: 'Cerebras 웨이퍼 스케일 추론. 주요 OSS LLM에서 극한 토큰 처리; 인터랙티브 앱에 유리, 모델 목록은 공식 사이트.',
    ru: 'Инференс Cerebras на чипах wafer-scale с заявленной экстремальной пропускной способностью по известным OSS LLM; модели сверяйте на сайте.',
    hi: 'Cerebras की wafer‑scale इंफ़रेंस सर्विस—बड़े OSS LLM पर अति उच्च टोकन थ्रूपुट; इंटरैक्टिव ऐप्स के लिए उत्तम।',
    es: 'Inferencia de Cerebras en silicio wafer‑scale con throughput extremo en LLMs OSS populares; apto para apps interactivas, consulta modelos en la web.',
  },
  litellm: {
    en: 'Open-source proxy gateway exposing 100+ LLM vendors through one OpenAI-compatible API—routing, budgets, fallbacks, and logging without reinventing plumbing.',
    'zh-TW': '開源 LLM 聚合代理：以單一 OpenAI 相容 API 接上百家供應商，支援路由、預算、fallback 與日誌，不必重造基礎設施。',
    ja: 'OSS の LLM 代理ゲートウェイ。OpenAI 互換 API 一本で百超のベンダを統合、ルーティング／予算／フォールバック／ログまで。',
    ko: '오픈소스 LLM 프록시 게이트웨이. OpenAI 호환 API 하나로 100+ 벤더 통합—라우팅·예산·폴백·로그까지.',
    ru: 'OSS прокси-шлюз для 100+ провайдеров LLM через единый OpenAI-совместимый API: маршрутизация, бюджеты, fallback и логи.',
    hi: 'ओपन‑सोर्स LLM प्रॉक्सी गेटवे—एक OpenAI‑संगत API से 100+ वेंडर; राउटिंग, बजट, fallback व लॉग।',
    es: 'Gateway proxy open source para 100+ proveedores LLM con API compatible con OpenAI—enrutado, presupuestos, fallbacks y logs.',
  },
  'fireflies-ai': {
    en: 'Meeting bot that auto-joins calls, transcribes, and syncs action items to HubSpot/Salesforce/Slack—great for sales and CS teams; check retention and consent rules before rolling out.',
    'zh-TW': '自動入會的會議機器人：轉寫與行動項同步到 HubSpot／Salesforce／Slack，適合銷售與客服；推廣前確認錄音同意與保存策略。',
    ja: '会議に自動参加し文字起こし・アクション項目を HubSpot/Salesforce/Slack へ同期。営業・CS 向け。導入前に録音同意と保持期間を確認。',
    ko: '회의에 자동 참여해 전사·액션 아이템을 HubSpot/Salesforce/Slack로 동기화. 세일즈·CS 적합; 도입 전 동의·보존 정책 확인.',
    ru: 'Бот, который сам присоединяется к встречам, транскрибирует и синхронизирует action items с HubSpot/Salesforce/Slack — хорошо для sales/CS.',
    hi: 'मीटिंग बॉट जो कॉल में आता है, ट्रांसक्राइब करता है और HubSpot/Salesforce/Slack से सिंक करता है—सेल्स/CS के लिए उपयोगी.',
    es: 'Bot que se une solo a llamadas, transcribe y sincroniza tareas con HubSpot/Salesforce/Slack—apto para ventas/CS; revisa consentimiento y retención.',
  },
  'browser-use': {
    en: 'Open-source browser agent framework that drives web pages through structured DOM actions—a self-hostable alternative to Operator/Computer Use for developers who want control.',
    'zh-TW': '開源瀏覽器代理框架，以結構化 DOM 操作網頁；面向想自部署、要控制權的開發者，可替代 Operator／Computer Use。',
    ja: 'OSS のブラウザエージェント。構造化 DOM 操作で Web を駆動。Operator／Computer Use の自部署代替として開発者向け。',
    ko: '오픈소스 브라우저 에이전트 프레임워크. 구조화된 DOM 조작으로 웹을 제어—Operator/Computer Use의 자체 호스팅 대안.',
    ru: 'Open-source фреймворк браузерного агента: структурированные DOM-действия; self-host альтернатива Operator/Computer Use для разработчиков.',
    hi: 'ओपन‑सोर्स ब्राउज़र एजेंट फ्रेमवर्क—स्ट्रक्चर्ड DOM क्रियाओं से वेब चलाता है; Operator/Computer Use का self‑host विकल्प।',
    es: 'Framework open source de agente de navegador que controla páginas vía DOM estructurado—alternativa self‑host a Operator/Computer Use.',
  },
  'anthropic-computer-use': {
    en: 'Anthropic’s Claude capability to see the screen and operate a computer via API—best used with sandboxed VMs, scoped credentials, and human confirm on critical actions.',
    'zh-TW': 'Anthropic 讓 Claude 看螢幕並以 API 操作電腦的能力；生產建議搭配沙盒 VM、最小權限憑證與關鍵動作人工確認。',
    ja: 'Anthropic の Claude が画面を見て PC を操作する機能（API）。本番ではサンドボックス VM、最小権限、人手確認が必要。',
    ko: 'Anthropic의 Claude가 화면을 보고 컴퓨터를 조작하는 API 기능. 샌드박스 VM·최소권한·중요 단계 사람 확인 권장.',
    ru: 'Возможность Claude видеть экран и управлять компьютером через API; в проде — песочница, минимальные права, подтверждение важных шагов.',
    hi: 'Anthropic की वह क्षमता जिससे Claude स्क्रीन देखकर कंप्यूटर चलाए (API); उत्पादन में sandbox VM व सीमित अधिकार आवश्यक।',
    es: 'Capacidad de Claude (Anthropic) para ver la pantalla y operar un ordenador vía API—en producción usa VMs aisladas, credenciales acotadas y confirmación humana.',
  },
  'openai-operator': {
    en: 'OpenAI’s cloud browser agent (evolving into ChatGPT Agent) that operates websites remotely on your behalf—check current product name, regions, and data rules on the site.',
    'zh-TW': 'OpenAI 雲端瀏覽器代理（隨版本併入 ChatGPT Agent），在遠端瀏覽器替你操作網站；產品名稱與地區以官網為準。',
    ja: 'OpenAI のクラウド型ブラウザエージェント（ChatGPT Agent に統合進行中）。製品名・地域は公式で要確認。',
    ko: 'OpenAI의 클라우드 브라우저 에이전트(ChatGPT Agent로 통합 중). 제품명·지역은 공식 사이트에서 확인.',
    ru: 'Облачный браузер-агент OpenAI (сливается с ChatGPT Agent) — управляет сайтами удалённо; актуальное имя и регионы — на сайте.',
    hi: 'OpenAI का क्लाउड ब्राउज़र एजेंट (ChatGPT Agent में समाहित); नाम व क्षेत्र आधिकारिक साइट पर देखें।',
    es: 'Agente de navegador en la nube de OpenAI (en integración con ChatGPT Agent)—nombre y regiones actuales en el sitio oficial.',
  },
  vapi: {
    en: 'Developer-first voice agent platform with pluggable STT/LLM/TTS and phone numbers—minute-metered pricing for inbound/outbound bots and scheduling agents.',
    'zh-TW': '開發者優先的語音代理平台，可自選 STT／LLM／TTS 與租用號碼；以分鐘計費，適合呼入／外呼與預約機器人。',
    ja: '開発者志向のボイスエージェント基盤。STT/LLM/TTS を自由に組み合わせ、電話番号も利用可、分課金。',
    ko: '개발자 친화 보이스 에이전트 플랫폼. STT/LLM/TTS 선택과 번호 임대, 분 단위 과금.',
    ru: 'Платформа голосовых агентов с заменяемыми STT/LLM/TTS и номерами телефона; оплата по минутам.',
    hi: 'डेवलपर‑केंद्रित वॉइस एजेंट प्लेटफ़ॉर्म; STT/LLM/TTS चुनें, नंबर किराए पर; प्रति मिनट बिलिंग।',
    es: 'Plataforma de agentes de voz para desarrolladores con STT/LLM/TTS intercambiables y números de teléfono; tarifa por minuto.',
  },
  'retell-ai': {
    en: 'Voice agent platform tuned for low latency and natural barge-in—visual orchestration, rented phone numbers, and templates for inbound/outbound call flows.',
    'zh-TW': '強調低延遲與自然打斷的語音代理平台，可視化編排 + 號碼租用，面向呼入／外呼流程。',
    ja: '低遅延と自然な割り込みに注力したボイスエージェント。ビジュアル編成と番号レンタル、呼入／外呼テンプレあり。',
    ko: '저지연·자연스러운 인터럽트에 특화된 보이스 에이전트; 비주얼 오케스트레이션과 번호 임대 제공.',
    ru: 'Голосовой агент с упором на низкую задержку и естественное прерывание; визуальная оркестрация и аренда номеров.',
    hi: 'कम लेटेंसी व प्राकृतिक बार्ज‑इन पर केंद्रित वॉइस एजेंट; विज़ुअल ऑर्केस्ट्रेशन व नंबर किराया।',
    es: 'Plataforma de agentes de voz centrada en baja latencia y barge‑in natural; orquestación visual y alquiler de números.',
  },
  cartesia: {
    en: 'Low-latency TTS with streaming APIs and custom voices (Sonic series)—a go-to layer for natural-feeling voice agents and audio products.',
    'zh-TW': '低延遲 TTS（Sonic 系列），支援流式 API 與自訂聲音；語音代理與音訊產品追求「自然感」的常見選擇。',
    ja: '低遅延 TTS（Sonic 系）。ストリーミング API とカスタム音声。自然なボイスエージェント／音声プロダクト向け定番。',
    ko: '저지연 TTS(Sonic 시리즈). 스트리밍 API와 커스텀 보이스—자연스러운 보이스 에이전트·오디오 제품에 자주 사용.',
    ru: 'Low-latency TTS (серия Sonic) со стриминговыми API и кастомными голосами — частый выбор для натуральных голосовых агентов.',
    hi: 'कम लेटेंसी TTS (Sonic सीरीज़)—स्ट्रीमिंग API व कस्टम आवाज़ें; प्राकृतिक वॉइस एजेंट/ऑडियो उत्पादों में लोकप्रिय।',
    es: 'TTS de baja latencia (serie Sonic) con API en streaming y voces personalizadas—capa habitual para agentes de voz con sensación natural.',
  },
>>>>>>> Stashed changes
}

export function toolDescription(t, locale) {
  const hi = HIGHLIGHTS[t.slug]?.[locale] ?? HIGHLIGHTS[t.slug]?.en
  if (hi) return hi
  const g = {
    en: (n) => `${n}: popular AI product—see the official site for features, pricing, supported regions, data handling, and latest model lineup.`,
    'zh-TW': (n) => `${n}：常見的 AI 產品——功能、價格、支援地區、資料處理與最新模型，請以官網說明為準。`,
    ja: (n) => `${n}: 人気のAI製品です。機能・料金・対応地域・データ取り扱い・最新モデルは公式サイトで確認してください。`,
    ko: (n) => `${n}: 인기 AI 제품—기능·가격·지원 지역·데이터 처리·최신 모델은 공식 사이트를 확인하세요.`,
    ru: (n) => `${n}: популярный AI‑продукт — функции, цены, регионы, обработка данных и модели смотрите на официальном сайте.`,
    hi: (n) => `${n}: लोकप्रिय AI उत्पाद—फीचर, कीमत, समर्थित क्षेत्र, डेटा हैंडलिंग और नवीनतम मॉडल आधिकारिक साइट पर देखें।`,
    es: (n) => `${n}: producto de IA popular—consulta el sitio oficial para funciones, precios, regiones, datos y modelos actuales.`,
  }
  return (g[locale] ?? g.en)(t.name)
}

const MCP_HIGHLIGHTS = {
  filesystem: {
    en: 'Reference MCP server letting agents read/write/list files under an allow-listed directory. Run with least-privilege paths and read-only mode for sensitive data; ideal when you want to scope a project folder as an agent workspace.',
    'zh-TW': '官方參考 MCP 伺服器：讓代理在允許目錄中讀寫檔案、列出目錄、建立或移動項目。請用最小權限路徑與唯讀模式保護敏感資料。',
    ja: '公式リファレンス MCP サーバー。許可したディレクトリ配下でファイル読み書き・一覧・作成・移動を可能にします。機微データには最小権限パスと読み取り専用モードを。',
    ko: '허용된 디렉터리에서 파일 읽기/쓰기/나열을 지원하는 공식 참조 MCP 서버. 민감 데이터는 최소 권한 경로와 읽기 전용 모드로 운영하세요.',
    ru: 'Эталонный MCP-сервер: чтение/запись/листинг файлов внутри разрешённой директории. Для чувствительных данных — минимальные права и режим только-чтение.',
    hi: 'संदर्भ MCP सर्वर: अनुमति-सूचीबद्ध डायरेक्टरी में फ़ाइल पढ़ना/लिखना/सूची बनाना। संवेदनशील डेटा के लिए न्यूनतम अधिकार व केवल-पढ़ने का मोड उपयोग करें।',
    es: 'Servidor MCP oficial de referencia para leer, escribir y listar archivos dentro de un directorio permitido. Usa rutas con mínimo privilegio y modo solo-lectura para datos sensibles.',
  },
  git: {
    en: 'Reference MCP server exposing common git operations (status, log, diff, blame) to an agent. Great starting point for read-only code reviewers; grant write access carefully.',
    'zh-TW': '官方 MCP 伺服器：把常見 git 操作（狀態、log、diff、blame）暴露給代理。適合唯讀程式審閱代理起手；寫入請謹慎授權。',
    ja: '公式 MCP サーバー：status / log / diff / blame など git の主要操作をエージェントに公開。読み取り専用のコードレビュー起点として最適。書き込みは慎重に許可を。',
    ko: 'status·log·diff·blame 등 git 주요 작업을 에이전트에 노출하는 공식 MCP 서버. 읽기 전용 코드 리뷰 에이전트의 시작점으로 적합하며, 쓰기 권한은 신중히 부여.',
    ru: 'Эталонный MCP-сервер: stat/log/diff/blame git для агента. Отличная отправная точка для ревьюверов кода в read-only; запись — только по необходимости.',
    hi: 'संदर्भ MCP सर्वर: git के सामान्य ऑपरेशन (status/log/diff/blame) एजेंट को उपलब्ध कराता है। पढ़ने-मात्र कोड रिव्यूअर्स के लिए बढ़िया शुरुआत; लेखन अनुमति सोच-समझकर।',
    es: 'Servidor MCP de referencia que expone operaciones git comunes (status, log, diff, blame) al agente. Perfecto como base para revisores de código en solo lectura; otorga escritura con prudencia.',
  },
  github: {
    en: 'GitHub’s official MCP server: read/write repos, manage issues/PRs, and search code. Use scoped PATs or a GitHub App with audit logging for production.',
    'zh-TW': 'GitHub 官方 MCP 伺服器：讀寫倉庫、管理 Issue/PR、搜尋程式。生產環境請用受限 PAT 或 GitHub App 並做稽核。',
    ja: 'GitHub 公式 MCP サーバー。リポジトリの読み書き、Issue/PR 管理、コード検索。本番はスコープ限定 PAT か GitHub App＋監査ログを。',
    ko: 'GitHub 공식 MCP 서버: 저장소 R/W, Issue/PR 관리, 코드 검색. 운영 환경에서는 스코프 제한 PAT 또는 GitHub App+감사 로그를 사용하세요.',
    ru: 'Официальный MCP-сервер GitHub: чтение/запись репозиториев, управление Issues/PR, поиск по коду. Для прод — PAT с ограниченной областью или GitHub App с аудитом.',
    hi: 'GitHub का आधिकारिक MCP सर्वर: रिपॉज़िटरी R/W, Issue/PR प्रबंधन, कोड खोज। प्रोडक्शन में सीमित PAT या GitHub App + ऑडिट लॉग का उपयोग करें।',
    es: 'Servidor MCP oficial de GitHub: repos R/W, gestión de Issues/PR y búsqueda de código. En producción usa PAT con alcance limitado o una GitHub App con auditoría.',
  },
  postgres: {
    en: 'Reference MCP server for read-only Postgres access and schema introspection—ideal for data-analysis agents. Lock down with a read-only role and schema allow-list.',
    'zh-TW': '官方 MCP 伺服器：透過唯讀連線讓代理執行 PostgreSQL 查詢與 schema 探索，適合分析型代理。強烈建議唯讀帳號＋schema 白名單。',
    ja: '公式 MCP サーバー：読み取り専用接続で PostgreSQL にクエリ・スキーマ探索を実行。分析系エージェント向け。読み取り専用ロールとスキーマ許可リストで運用を。',
    ko: '읽기 전용 연결로 PostgreSQL 쿼리와 스키마 탐색을 허용하는 공식 MCP 서버. 읽기 전용 역할 + 스키마 허용 목록으로 제한하세요.',
    ru: 'Эталонный MCP-сервер: read-only подключение к Postgres с запросами и обзором схем — хорошо для аналитических агентов. Используйте read-only роль и allow-list схем.',
    hi: 'संदर्भ MCP सर्वर: केवल-पढ़ने की कनेक्शन से PostgreSQL क्वेरी व schema खोज—एनालिटिक्स एजेंट के लिए बढ़िया। Read-only रोल + schema allow-list ज़रूर लगाएँ।',
    es: 'Servidor MCP de referencia con acceso solo-lectura a Postgres e introspección de esquemas—ideal para agentes analíticos. Bloquea con un rol solo lectura y lista blanca de esquemas.',
  },
  fetch: {
    en: 'Reference MCP server that fetches any HTTP URL and converts it to Markdown—often the minimal “browsing” capability for agents. Add a domain allow-list and rate limits.',
    'zh-TW': '官方 MCP 伺服器：抓取 HTTP URL 並轉為 Markdown——代理最常見的「瀏覽」起點。請設定網域白名單與速率限制。',
    ja: '公式 MCP サーバー：任意の HTTP URL を取得して Markdown に変換—エージェントの最小限「ブラウジング」能力として定番。ドメイン許可リストとレート制限を。',
    ko: '임의 HTTP URL을 가져와 Markdown으로 변환하는 공식 MCP 서버—에이전트 "브라우징" 최소 구현으로 자주 사용. 도메인 허용 목록과 속도 제한 권장.',
    ru: 'Эталонный MCP-сервер: качает любой HTTP URL и приводит к Markdown — минимальная «навигация» для агента. Добавьте allow-list доменов и лимиты.',
    hi: 'संदर्भ MCP सर्वर: किसी भी HTTP URL को लाकर Markdown में बदलता है—एजेंट की न्यूनतम "ब्राउज़िंग" क्षमता। डोमेन अनुमति-सूची व दर सीमा लगाएँ।',
    es: 'Servidor MCP de referencia que descarga cualquier URL HTTP y la convierte a Markdown—suele ser la capacidad mínima de “navegar” para un agente. Añade allow-list de dominios y límites de tasa.',
  },
  'playwright-mcp': {
    en: 'Microsoft’s Playwright MCP server: cross-browser automation with broader coverage than Puppeteer—fits scrapers and UI-testing agents that need headless Chromium, Firefox, and WebKit.',
    'zh-TW': 'Microsoft 出品的 Playwright MCP：跨瀏覽器自動化，覆蓋 Chromium / Firefox / WebKit——適合爬取與 UI 測試代理。',
    ja: 'Microsoft 製 Playwright MCP サーバー。Chromium / Firefox / WebKit のクロスブラウザ自動化でスクレイパーや UI テストエージェント向き。',
    ko: 'Microsoft 의 Playwright MCP 서버: Chromium/Firefox/WebKit 크로스브라우저 자동화—스크레이퍼·UI 테스트 에이전트에 적합.',
    ru: 'MCP-сервер Playwright от Microsoft: кросс-браузерная автоматизация (Chromium/Firefox/WebKit) — для скрейперов и UI-тест агентов.',
    hi: 'Microsoft का Playwright MCP सर्वर: Chromium/Firefox/WebKit क्रॉस-ब्राउज़र ऑटोमेशन—स्क्रैपर व UI-टेस्ट एजेंट के लिए।',
    es: 'Servidor MCP Playwright de Microsoft: automatización entre navegadores (Chromium/Firefox/WebKit)—ideal para scrapers y agentes de pruebas UI.',
  },
  slack: {
    en: 'Reference MCP server that reads/writes Slack messages and searches history—turns Slack into an agent’s comms layer. Use a bot token with minimal scopes.',
    'zh-TW': '官方 MCP 伺服器：讀寫 Slack 訊息、搜尋歷史；把 Slack 作為代理的通訊層。請使用 Bot Token 並設定最小 scope。',
    ja: '公式 MCP サーバー：Slack のメッセージ送受信と履歴検索 — Slack をエージェントの通信層に。Bot Token は最小スコープで運用。',
    ko: 'Slack 메시지 송수신과 히스토리 검색을 제공하는 공식 MCP 서버—Slack을 에이전트 통신 계층으로. 최소 scope Bot Token 사용.',
    ru: 'Эталонный MCP-сервер: чтение/запись сообщений в Slack и поиск — превращает Slack в коммуникационный слой агента. Используйте Bot Token с минимальными правами.',
    hi: 'संदर्भ MCP सर्वर: Slack संदेश R/W व इतिहास खोज—Slack को एजेंट का कम्युनिकेशन लेयर बनाता है। न्यूनतम scope वाला Bot Token ही उपयोग करें।',
    es: 'Servidor MCP de referencia para leer/escribir mensajes de Slack y buscar en el historial—convierte Slack en la capa de comunicación del agente. Usa Bot Token con scopes mínimos.',
  },
  'cloudflare-mcp': {
    en: 'Cloudflare’s official MCP suite covering Workers, KV, D1, R2, Pages, and DNS. Supports Remote MCP over HTTP, so you can plug it into Claude or Cursor without a local binary.',
    'zh-TW': 'Cloudflare 官方 MCP 套件：Workers、KV、D1、R2、Pages、DNS；支援 HTTP Remote MCP，免本機二進位即可接入 Claude / Cursor。',
    ja: 'Cloudflare 公式 MCP スイート。Workers / KV / D1 / R2 / Pages / DNS を網羅し、HTTP 版 Remote MCP に対応—ローカル実行ファイル不要で Claude / Cursor に接続。',
    ko: 'Cloudflare 공식 MCP 모음: Workers·KV·D1·R2·Pages·DNS 지원, HTTP Remote MCP 가능—로컬 바이너리 없이 Claude/Cursor 에 연결.',
    ru: 'Официальный набор MCP от Cloudflare: Workers, KV, D1, R2, Pages, DNS. Поддержка Remote MCP по HTTP — подключать к Claude / Cursor без локальных бинарей.',
    hi: 'Cloudflare का आधिकारिक MCP सेट: Workers, KV, D1, R2, Pages, DNS—HTTP Remote MCP सपोर्ट, बिना लोकल बाइनरी Claude/Cursor से जोड़ें।',
    es: 'Paquete MCP oficial de Cloudflare con Workers, KV, D1, R2, Pages y DNS. Soporta Remote MCP por HTTP—se conecta a Claude o Cursor sin binario local.',
  },
  'stripe-mcp': {
    en: 'Stripe’s official MCP server exposing accounts, orders, refunds, and products as tools—handy for commerce agents. Restrict to test / restricted keys in production.',
    'zh-TW': 'Stripe 官方 MCP 伺服器：把帳戶、訂單、退款、產品等 API 以工具形式暴露——商務與支付代理實用。生產環境請限制在測試 / 受限金鑰。',
    ja: 'Stripe 公式 MCP サーバー。アカウント・注文・返金・商品などの API をツールとして公開—商取引エージェントに便利。本番はテスト / 制限付きキーに限定を。',
    ko: 'Stripe 공식 MCP 서버: 계정·주문·환불·상품 API를 도구로 노출—커머스 에이전트에 유용. 운영 환경은 테스트 / 제한 키로 제한.',
    ru: 'Официальный MCP-сервер Stripe: счета, заказы, возвраты, продукты как инструменты — удобно для коммерческих агентов. В проде используйте test / restricted ключи.',
    hi: 'Stripe का आधिकारिक MCP सर्वर: accounts/orders/refunds/products API टूल के रूप में—कॉमर्स एजेंट के लिए काम का। प्रोडक्शन में test/restricted की सीमा रखें।',
    es: 'Servidor MCP oficial de Stripe con cuentas, pedidos, reembolsos y productos como herramientas—ideal para agentes de comercio. Restringe a claves de prueba o limitadas en producción.',
  },
  'linear-mcp': {
    en: 'Linear’s official MCP server: create and query Issues, Projects, and Cycles—a lightweight task pipeline for engineering/product agents. Auth via personal API key or OAuth.',
    'zh-TW': 'Linear 官方 MCP 伺服器：建立與查詢 Issue、Project、Cycle——工程與產品代理的輕量任務管道。使用個人 API Key 或 OAuth 授權。',
    ja: 'Linear 公式 MCP サーバー。Issue / Project / Cycle の作成・照会—エンジニア／プロダクトエージェントの軽量タスク基盤。個人 API Key か OAuth で認可。',
    ko: 'Linear 공식 MCP 서버: Issue·Project·Cycle 생성·조회—엔지니어/프로덕트 에이전트의 경량 태스크 파이프라인. 개인 API Key 또는 OAuth 인증.',
    ru: 'Официальный MCP Linear: создание и запросы Issues/Projects/Cycles — лёгкий task-pipeline для agents разработки/продукта. Авторизация через API Key или OAuth.',
    hi: 'Linear का आधिकारिक MCP सर्वर: Issue/Project/Cycle बनाना व क्वेरी—इंजीनियरिंग/प्रोडक्ट एजेंट के लिए हल्का टास्क पाइपलाइन। API Key या OAuth से ऑथ।',
    es: 'Servidor MCP oficial de Linear: crea y consulta Issues, Projects y Cycles—una pipeline de tareas ligera para agentes de ingeniería/producto. Autenticación con API key o OAuth.',
  },
  'notion-mcp': {
    en: 'Notion’s official MCP server: read/write pages and database items—perfect for wiring requirement docs, weekly reports, and knowledge bases into agents. Workspace-level auth applies.',
    'zh-TW': 'Notion 官方 MCP 伺服器：讀寫頁面與資料庫項——把需求、週報、知識庫接入代理。以工作區為單位授權。',
    ja: 'Notion 公式 MCP サーバー。ページとデータベース項目の R/W—要件書・週報・ナレッジベースをエージェントに接続するのに最適。ワークスペース単位で認可。',
    ko: 'Notion 공식 MCP 서버: 페이지와 DB 항목 R/W—요구사항·주간 리포트·지식베이스를 에이전트에 연결. 워크스페이스 단위 권한.',
    ru: 'Официальный MCP Notion: R/W страниц и элементов БД — удобно для подключения требований, weekly и БЗ к агенту. Авторизация — по рабочему пространству.',
    hi: 'Notion का आधिकारिक MCP सर्वर: पेज व डेटाबेस आइटम R/W—आवश्यकताएँ, वीकली व नॉलेज बेस को एजेंट से जोड़ने में बढ़िया। वर्कस्पेस स्तर पर ऑथ।',
    es: 'Servidor MCP oficial de Notion: lectura/escritura de páginas y elementos de base de datos—perfecto para enganchar documentos, reportes y bases de conocimiento. Auth por workspace.',
  },
  'supabase-mcp': {
    en: 'Supabase’s official MCP server covering database, Storage, and Auth operations—great for wiring a Supabase project into AI IDEs and ops agents.',
    'zh-TW': 'Supabase 官方 MCP 伺服器：涵蓋資料庫、Storage、Auth——把 Supabase 專案接到 AI IDE 與維運代理。',
    ja: 'Supabase 公式 MCP サーバー。DB / Storage / Auth の主要操作をカバー—Supabase プロジェクトを AI IDE や運用エージェントに接続。',
    ko: 'Supabase 공식 MCP 서버: DB·Storage·Auth 주요 작업—Supabase 프로젝트를 AI IDE 및 운영 에이전트에 연결.',
    ru: 'Официальный MCP Supabase: операции с БД, Storage и Auth — удобно подключать Supabase-проект к AI IDE и ops-агентам.',
    hi: 'Supabase का आधिकारिक MCP सर्वर: DB, Storage, Auth संचालन—Supabase प्रोजेक्ट को AI IDE व ops एजेंट से जोड़ने के लिए बढ़िया।',
    es: 'Servidor MCP oficial de Supabase para base de datos, Storage y Auth—ideal para conectar un proyecto Supabase a IDEs de IA y agentes de operaciones.',
  },
  'tavily-mcp': {
    en: 'Tavily MCP server exposes the agent-focused search API as MCP tools—an easy way to give any MCP client a “can search the web” capability with API key control.',
    'zh-TW': 'Tavily MCP 伺服器：把面向代理的搜尋 API 暴露為 MCP 工具——給任何 MCP 客戶端接上「會聯網」能力，並用 API Key 控管。',
    ja: 'Tavily MCP サーバー。エージェント向け検索 API を MCP ツールとして公開—任意の MCP クライアントに「ウェブ検索可」能力を付与（API Key で制御）。',
    ko: 'Tavily MCP 서버: 에이전트용 검색 API를 MCP 도구로 노출—어떤 MCP 클라이언트에든 “웹 검색” 능력을 API Key 로 제공.',
    ru: 'MCP-сервер Tavily: API поиска, заточенный под агентов, как инструменты MCP — лёгкий способ дать любому MCP-клиенту «веб-поиск» с контролем по API Key.',
    hi: 'Tavily MCP सर्वर: एजेंट-केंद्रित सर्च API को MCP टूल के रूप में—किसी भी MCP क्लाइंट को API Key से "वेब सर्च" क्षमता देना आसान।',
    es: 'Servidor MCP de Tavily que expone la API de búsqueda orientada a agentes como herramientas MCP—dota a cualquier cliente MCP de capacidad de búsqueda web controlada por API key.',
  },
}

const MCP_GENERIC_OFFICIAL = {
  en: (n, vendor) =>
    `${n}: official MCP server from ${vendor || 'the upstream team'}—confirm version, auth scopes, and transport with the upstream docs before production use.`,
  'zh-TW': (n, vendor) =>
    `${n}：由 ${vendor || '上游團隊'} 提供的官方 MCP 伺服器——上線前請以上游文件確認版本、權限範圍與傳輸方式。`,
  ja: (n, vendor) =>
    `${n}：${vendor || '上流チーム'} の公式 MCP サーバー。本番投入前にバージョン・権限スコープ・トランスポートを上流ドキュメントで確認してください。`,
  ko: (n, vendor) =>
    `${n}: ${vendor || '업스트림 팀'} 제공의 공식 MCP 서버—운영 전에 버전·권한 scope·전송 방식을 업스트림 문서로 확인하세요.`,
  ru: (n, vendor) =>
    `${n}: официальный MCP-сервер от ${vendor || 'команды upstream'} — перед продом сверяйте версию, scope прав и транспорт с upstream-документацией.`,
  hi: (n, vendor) =>
    `${n}: ${vendor || 'अपस्ट्रीम टीम'} का आधिकारिक MCP सर्वर—प्रोडक्शन से पहले अपस्ट्रीम दस्तावेज़ों में वर्ज़न, स्कोप व ट्रांसपोर्ट जाँचें।`,
  es: (n, vendor) =>
    `${n}: servidor MCP oficial de ${vendor || 'el equipo upstream'}—revisa versión, scopes de permisos y transporte en la documentación upstream antes de producción.`,
}

const MCP_GENERIC_COMMUNITY = {
  en: (n) =>
    `${n}: community MCP implementation—great for learning and quick validation. Review maintenance, dependencies, and data policies before production use.`,
  'zh-TW': (n) =>
    `${n}：社群 MCP 實作——適合學習與快速驗證。上線前請評估維護、相依鏈與資料策略。`,
  ja: (n) =>
    `${n}：コミュニティ由来の MCP 実装—学習と早期検証に適しています。本番前にメンテ状況・依存・データポリシーを確認してください。`,
  ko: (n) =>
    `${n}: 커뮤니티 MCP 구현—학습과 빠른 검증에 적합합니다. 운영 전에 유지보수·의존성·데이터 정책을 점검하세요.`,
  ru: (n) =>
    `${n}: реализация MCP от сообщества — хорошо для обучения и быстрой проверки. Перед продом оцените сопровождение, зависимости и политику данных.`,
  hi: (n) =>
    `${n}: सामुदायिक MCP इम्प्लीमेंटेशन—सीखने व त्वरित सत्यापन के लिए बढ़िया। प्रोडक्शन से पहले मेंटेनेंस, डिपेंडेंसी व डेटा नीति जाँचें।`,
  es: (n) =>
    `${n}: implementación MCP de la comunidad—ideal para aprender y validar rápido. Antes de producción revisa mantenimiento, dependencias y políticas de datos.`,
}

export function mcpDescription(s, locale) {
  const hi = MCP_HIGHLIGHTS[s.slug]?.[locale] ?? MCP_HIGHLIGHTS[s.slug]?.en
  if (hi) return hi
  const map = s.official ? MCP_GENERIC_OFFICIAL : MCP_GENERIC_COMMUNITY
  const fn = map[locale] ?? map.en
  return s.official ? fn(s.name, s.vendor) : fn(s.name)
}
