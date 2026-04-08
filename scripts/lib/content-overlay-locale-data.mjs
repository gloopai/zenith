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
