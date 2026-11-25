import type { MessageKey } from './en'

export const hiCore: Partial<Record<MessageKey, string>> = {
  'app.name': 'EyeZen',
  'app.disclaimer':
    'EyeZen केवल विश्राम और जानकारी के लिए है। यह आँखों की किसी स्थिति का निदान या इलाज नहीं करता और नेत्र चिकित्सक की जगह कभी नहीं ले सकता।',

  'nav.home': 'होम',
  'nav.exercises': 'व्यायाम',
  'nav.games': 'गेम्स',
  'nav.nutrition': 'पोषण',
  'nav.more': 'और',

  'home.greeting.morning': 'सुप्रभात, दोस्त',
  'home.greeting.afternoon': 'शुभ दोपहर, दोस्त',
  'home.greeting.evening': 'शुभ संध्या, दोस्त',
  'home.subtitle': 'आपकी आँखें रोज़ बहुत काम करती हैं। आइए उन्हें थोड़ा आराम दें।',
  'home.start': '2 मिनट का रीसेट शुरू करें',

  'consent.title': 'EyeZen में आपका स्वागत है',
  'consent.intro': 'शुरू करने से पहले कृपया ये चार छोटी बातें पढ़ें।',
  'consent.p1.title': 'सीखने और आराम के लिए',
  'consent.p1.text':
    'EyeZen आँखों की देखभाल के सामान्य विचार और हल्के व्यायाम बताता है। यह केवल जानकारी के लिए है।',
  'consent.p2.title': 'चिकित्सकीय सलाह नहीं',
  'consent.p2.text':
    'EyeZen आँखों की किसी स्थिति का निदान, इलाज या उपचार नहीं कर सकता। व्यायाम से नज़र की समस्याएँ ठीक नहीं होतीं और बीमारी दूर नहीं होती।',
  'consent.p3.title': 'अपने शरीर की सुनें',
  'consent.p3.text':
    'दर्द, चक्कर या असहजता महसूस हो तो कोई भी व्यायाम रोक दें। आँख की पुतली को कभी न दबाएँ।',
  'consent.p4.title': 'नेत्र चिकित्सक को कब दिखाएँ',
  'consent.p4.text':
    'अचानक नज़र बदलने, आँख में दर्द, लाल और दर्द भरी आँख, रोशनी की चमक, अचानक कई नए धब्बे (फ्लोटर्स) या आँख में चोट होने पर तुरंत नेत्र चिकित्सक को दिखाएँ। स्थिति गंभीर हो तो आपातकालीन इलाज लें।',
  'consent.check': 'मैं समझ गया/गई हूँ और आगे बढ़ना चाहता/चाहती हूँ',
  'consent.button': 'शुरू करें',
  'consent.footer': 'आपकी प्रगति केवल इसी डिवाइस पर सेव रहती है। खाता बनाने की ज़रूरत नहीं।',

  'settings.title': 'सेटिंग्स',
  'settings.back': 'वापस "और" पर',
  'settings.appearance': 'रूप-रंग',
  'settings.theme': 'थीम',
  'theme.light': 'लाइट',
  'theme.dark': 'डार्क',
  'theme.nightCalm': 'नाइट कैम',
  'settings.textSize': 'अक्षरों का आकार',
  'size.small': 'छोटा',
  'size.medium': 'मध्यम',
  'size.large': 'बड़ा',
  'size.xlarge': 'बहुत बड़ा',
  'settings.contrast': 'हाई कंट्रास्ट',
  'settings.contrastHint': 'गहरे अक्षर और साफ़ किनारे',
  'settings.comfort': 'आराम',
  'settings.motion': 'कम गति',
  'settings.motionHint': 'एनिमेशन को धीमा या बंद करता है',
  'settings.sound': 'आवाज़',
  'settings.soundHint': 'व्यायाम के अंत में हल्की घंटी',
  'settings.vibration': 'कंपन',
  'settings.vibrationHint': 'सपोर्ट करने वाले फ़ोन पर हल्की थरथराहट',
  'settings.language': 'भाषा',
  'settings.languageHint': 'अपनी भाषा चुनें। कुछ सामग्री अभी केवल अंग्रेज़ी में है।',
  'settings.safety': 'सुरक्षा सूचना',
  'settings.safetyText': 'सुरक्षित उपयोग की स्वागत सूचना फिर से पढ़ें।',
  'settings.safetyButton': 'सुरक्षा सूचना दिखाएँ',

  'more.title': 'और',
  'more.settings': 'सेटिंग्स',
  'more.settingsHint': 'थीम, अक्षर का आकार, आराम और भाषा',
  'more.conditions': 'आँखों की स्थितियों की गाइड',
  'more.conditionsHint': 'सरल, जानकारी देने वाली बातें',
  'more.rewards': 'पुरस्कार',
  'more.rewardsHint': 'अंक, स्तर और बैज',

  'notfound.title': 'हमें वह पेज नहीं मिला',
  'notfound.text': 'हो सकता है वह हट गया हो। चलिए आपको वापस होम ले चलें।',
  'notfound.button': 'होम जाएँ',
}