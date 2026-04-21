const fs = require('fs');
const path = require('path');

const newTranslations = {
  en: {
    servicesPage: {
      title: "Our Services | VisaPlus",
      description: "Comprehensive visa and immigration services in Morocco.",
      heroSubtitle: "From profile assessment to final visa delivery, we offer a comprehensive suite of services designed to maximize your approval chances."
    },
    servicesData: {
      "consultation": { title: "Profile Assessment & Consultation", desc: "Expert evaluation of your eligibility, financial standing, and travel history to recommend the best visa pathways." },
      "form-filling": { title: "Application & Form Filling", desc: "Accurate completion of complex governmental portals (DS-160 for USA, IRCC for Canada, Schengen forms)." },
      "appointment-booking": { title: "Appointment Booking", desc: "Securing standard and premium appointment slots at local processing centers (TLScontact, BLS International, VFS Global)." },
      "document-preparation": { title: "Document Preparation & Formatting", desc: "Organizing and verifying required financial, employment, and civil documents to meet specific embassy standards." },
      "travel-itineraries": { title: "Flight & Accommodation Itineraries", desc: "Providing verifiable flight reservations and hotel bookings designed specifically for visa application compliance." },
      "travel-insurance": { title: "Travel Health Insurance", desc: "Issuing mandatory Schengen-compliant or international travel health insurance policies required by embassies." },
      "translation-legalization": { title: "Certified Translation & Legalization", desc: "Coordinating certified document translations from Arabic/French into target languages and assisting with Apostille procedures." },
      "interview-prep": { title: "Interview Preparation", desc: "Conducting mock interviews and providing coaching for in-person embassy appointments (specifically for US and UK visas)." },
      "refusal-appeal": { title: "Refusal Appeal & Re-application", desc: "Analyzing previous visa rejection letters and building stronger, corrected cases for subsequent applications." }
    },
    contactPage: {
      france: "France (Schengen)",
      spain: "Spain (Schengen)",
      canada: "Canada",
      other: "Other",
      workingHoursTime: "Mon-Fri: 09:00 - 18:00"
    },
    privacy: {
      title: "Privacy Policy",
      lastUpdated: "Last updated: October 2026",
      introTitle: "1. Introduction",
      introText: "Welcome to VisaPlus. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.",
      dataCollectTitle: "2. The Data We Collect",
      dataCollectText: "We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:",
      dataList1: "Identity Data: includes first name, last name, username or similar identifier.",
      dataList2: "Contact Data: includes billing address, email address and telephone numbers.",
      dataList3: "Document Data: includes passport copies, financial statements, and other sensitive documents required for visa processing.",
      useDataTitle: "3. How We Use Your Data",
      useDataText: "We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to process your visa application and communicate with embassies on your behalf.",
      securityTitle: "4. Data Security",
      securityText: "We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.",
      contactTitle: "5. Contact Us",
      contactText: "If you have any questions about this privacy policy or our privacy practices, please contact us at privacy@visaplus.com."
    }
  },
  fr: {
    servicesPage: {
      title: "Nos Services | VisaPlus",
      description: "Services complets de visas et d'immigration au Maroc.",
      heroSubtitle: "De l'évaluation du profil à la délivrance finale du visa, nous proposons une suite complète de services conçus pour maximiser vos chances d'approbation."
    },
    servicesData: {
      "consultation": { title: "Évaluation de Profil & Consultation", desc: "Évaluation experte de votre éligibilité, de votre situation financière et de votre historique de voyage pour recommander les meilleures voies de visa." },
      "form-filling": { title: "Demande & Remplissage de Formulaires", desc: "Remplissage précis des portails gouvernementaux complexes (DS-160 pour les États-Unis, IRCC pour le Canada, formulaires Schengen)." },
      "appointment-booking": { title: "Prise de Rendez-vous", desc: "Obtention de créneaux de rendez-vous standard et premium dans les centres de traitement locaux (TLScontact, BLS International, VFS Global)." },
      "document-preparation": { title: "Préparation & Formatage de Documents", desc: "Organisation et vérification des documents financiers, professionnels et d'état civil requis pour répondre aux normes spécifiques des ambassades." },
      "travel-itineraries": { title: "Itinéraires de Vol & Hébergement", desc: "Fourniture de réservations de vol vérifiables et de réservations d'hôtel conçues spécifiquement pour la conformité des demandes de visa." },
      "travel-insurance": { title: "Assurance Maladie de Voyage", desc: "Délivrance de polices d'assurance maladie de voyage obligatoires conformes à Schengen ou internationales requises par les ambassades." },
      "translation-legalization": { title: "Traduction Certifiée & Légalisation", desc: "Coordination des traductions certifiées de documents de l'arabe/français vers les langues cibles et assistance pour les procédures d'Apostille." },
      "interview-prep": { title: "Préparation aux Entretiens", desc: "Réalisation d'entretiens blancs et accompagnement pour les rendez-vous en personne à l'ambassade (spécifiquement pour les visas américains et britanniques)." },
      "refusal-appeal": { title: "Appel de Refus & Nouvelle Demande", desc: "Analyse des lettres de rejet de visa précédentes et constitution de dossiers plus solides et corrigés pour les demandes ultérieures." }
    },
    contactPage: {
      france: "France (Schengen)",
      spain: "Espagne (Schengen)",
      canada: "Canada",
      other: "Autre",
      workingHoursTime: "Lun-Ven : 09h00 - 18h00"
    },
    privacy: {
      title: "Politique de Confidentialité",
      lastUpdated: "Dernière mise à jour : Octobre 2026",
      introTitle: "1. Introduction",
      introText: "Bienvenue chez VisaPlus. Nous respectons votre vie privée et nous nous engageons à protéger vos données personnelles. Cette politique vous informera de la manière dont nous traitons vos données lorsque vous visitez notre site Web.",
      dataCollectTitle: "2. Les données que nous collectons",
      dataCollectText: "Nous pouvons collecter, utiliser, stocker et transférer différents types de données personnelles vous concernant :",
      dataList1: "Données d'identité : prénom, nom, identifiant.",
      dataList2: "Données de contact : adresse, e-mail et numéros de téléphone.",
      dataList3: "Données documentaires : copies de passeport, relevés financiers, documents requis pour le visa.",
      useDataTitle: "3. Comment nous utilisons vos données",
      useDataText: "Nous n'utiliserons vos données que lorsque la loi nous y autorise, principalement pour traiter votre demande de visa.",
      securityTitle: "4. Sécurité des données",
      securityText: "Nous avons mis en place des mesures de sécurité pour éviter la perte, l'utilisation non autorisée ou la divulgation de vos données.",
      contactTitle: "5. Contactez-nous",
      contactText: "Pour toute question, veuillez nous contacter à privacy@visaplus.com."
    }
  },
  ar: {
    servicesPage: {
      title: "خدماتنا | VisaPlus",
      description: "خدمات تأشيرات وهجرة شاملة في المغرب.",
      heroSubtitle: "من تقييم الملف الشخصي إلى تسليم التأشيرة النهائي، نقدم مجموعة شاملة من الخدمات المصممة لزيادة فرص الموافقة الخاصة بك."
    },
    servicesData: {
      "consultation": { title: "تقييم الملف الشخصي والاستشارة", desc: "تقييم خبير لأهليتك، ووضعك المالي، وتاريخ سفرك للتوصية بأفضل مسارات التأشيرة." },
      "form-filling": { title: "التقديم وملء النماذج", desc: "إكمال دقيق للبوابات الحكومية المعقدة (DS-160 لأمريكا، IRCC لكندا، نماذج شنغن)." },
      "appointment-booking": { title: "حجز المواعيد", desc: "تأمين مواعيد عادية ومميزة في مراكز المعالجة المحلية (TLScontact، BLS International، VFS Global)." },
      "document-preparation": { title: "إعداد وتنسيق الوثائق", desc: "تنظيم والتحقق من الوثائق المالية والمهنية والمدنية المطلوبة لتلبية معايير السفارات المحددة." },
      "travel-itineraries": { title: "مسارات الرحلات الجوية والإقامة", desc: "توفير حجوزات طيران وفنادق قابلة للتحقق مصممة خصيصاً للامتثال لطلبات التأشيرة." },
      "travel-insurance": { title: "تأمين السفر الطبي", desc: "إصدار بوالص تأمين صحي للسفر إلزامية متوافقة مع شنغن أو دولية تطلبها السفارات." },
      "translation-legalization": { title: "الترجمة المعتمدة والتصديق", desc: "تنسيق ترجمات الوثائق المعتمدة من العربية/الفرنسية إلى اللغات المستهدفة والمساعدة في إجراءات الأبوستيل." },
      "interview-prep": { title: "التحضير للمقابلة", desc: "إجراء مقابلات وهمية وتقديم التدريب للمواعيد الشخصية في السفارة (خاصة لتأشيرات أمريكا وبريطانيا)." },
      "refusal-appeal": { title: "استئناف الرفض وإعادة التقديم", desc: "تحليل رسائل رفض التأشيرة السابقة وبناء ملفات أقوى ومصححة للطلبات اللاحقة." }
    },
    contactPage: {
      france: "فرنسا (شنغن)",
      spain: "إسبانيا (شنغن)",
      canada: "كندا",
      other: "أخرى",
      workingHoursTime: "الاثنين-الجمعة: 09:00 - 18:00"
    },
    privacy: {
      title: "سياسة الخصوصية",
      lastUpdated: "آخر تحديث: أكتوبر 2026",
      introTitle: "1. مقدمة",
      introText: "مرحباً بك في VisaPlus. نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. ستعلمك هذه السياسة بكيفية تعاملنا مع بياناتك عند زيارة موقعنا.",
      dataCollectTitle: "2. البيانات التي نجمعها",
      dataCollectText: "قد نقوم بجمع واستخدام وتخزين ونقل أنواع مختلفة من البيانات الشخصية عنك:",
      dataList1: "بيانات الهوية: الاسم الأول، اسم العائلة، أو معرف مشابه.",
      dataList2: "بيانات الاتصال: العنوان، البريد الإلكتروني وأرقام الهواتف.",
      dataList3: "بيانات الوثائق: نسخ جواز السفر، البيانات المالية، وغيرها من الوثائق المطلوبة لمعالجة التأشيرة.",
      useDataTitle: "3. كيف نستخدم بياناتك",
      useDataText: "لن نستخدم بياناتك الشخصية إلا عندما يسمح لنا القانون بذلك، وبشكل أساسي لمعالجة طلب التأشيرة الخاص بك.",
      securityTitle: "4. أمن البيانات",
      securityText: "لقد وضعنا تدابير أمنية مناسبة لمنع فقدان بياناتك الشخصية أو استخدامها أو الوصول إليها بطريقة غير مصرح بها.",
      contactTitle: "5. اتصل بنا",
      contactText: "إذا كانت لديك أي أسئلة، يرجى الاتصال بنا على privacy@visaplus.com."
    }
  },
  es: {
    servicesPage: {
      title: "Nuestros Servicios | VisaPlus",
      description: "Servicios integrales de visas e inmigración en Marruecos.",
      heroSubtitle: "Desde la evaluación del perfil hasta la entrega final de la visa, ofrecemos un conjunto completo de servicios diseñados para maximizar sus posibilidades de aprobación."
    },
    servicesData: {
      "consultation": { title: "Evaluación de Perfil y Consulta", desc: "Evaluación experta de su elegibilidad, situación financiera e historial de viajes para recomendar las mejores vías de visa." },
      "form-filling": { title: "Solicitud y Llenado de Formularios", desc: "Finalización precisa de portales gubernamentales complejos (DS-160 para EE.UU., IRCC para Canadá, formularios Schengen)." },
      "appointment-booking": { title: "Reserva de Citas", desc: "Asegurar citas estándar y premium en centros de procesamiento locales (TLScontact, BLS International, VFS Global)." },
      "document-preparation": { title: "Preparación y Formato de Documentos", desc: "Organización y verificación de documentos financieros, laborales y civiles requeridos para cumplir con los estándares específicos de las embajadas." },
      "travel-itineraries": { title: "Itinerarios de Vuelo y Alojamiento", desc: "Provisión de reservas de vuelos verificables y reservas de hotel diseñadas específicamente para el cumplimiento de solicitudes de visa." },
      "travel-insurance": { title: "Seguro Médico de Viaje", desc: "Emisión de pólizas de seguro médico de viaje obligatorias que cumplen con Schengen o internacionales requeridas por las embajadas." },
      "translation-legalization": { title: "Traducción Certificada y Legalización", desc: "Coordinación de traducciones de documentos certificadas del árabe/francés a los idiomas de destino y asistencia con los procedimientos de Apostilla." },
      "interview-prep": { title: "Preparación para Entrevistas", desc: "Realización de entrevistas simuladas y capacitación para citas en persona en la embajada (específicamente para visas de EE. UU. y el Reino Unido)." },
      "refusal-appeal": { title: "Apelación de Rechazo y Re-solicitud", desc: "Análisis de cartas de rechazo de visas anteriores y construcción de casos más sólidos y corregidos para solicitudes posteriores." }
    },
    contactPage: {
      france: "Francia (Schengen)",
      spain: "España (Schengen)",
      canada: "Canadá",
      other: "Otro",
      workingHoursTime: "Lun-Vie: 09:00 - 18:00"
    },
    privacy: {
      title: "Política de Privacidad",
      lastUpdated: "Última actualización: Octubre 2026",
      introTitle: "1. Introducción",
      introText: "Bienvenido a VisaPlus. Respetamos su privacidad y estamos comprometidos a proteger sus datos personales.",
      dataCollectTitle: "2. Los Datos que Recopilamos",
      dataCollectText: "Podemos recopilar, usar, almacenar y transferir diferentes tipos de datos personales sobre usted:",
      dataList1: "Datos de identidad: incluye nombre, apellido o identificador similar.",
      dataList2: "Datos de contacto: incluye dirección, correo electrónico y números de teléfono.",
      dataList3: "Datos de documentos: copias de pasaportes, extractos financieros y otros documentos requeridos.",
      useDataTitle: "3. Cómo Usamos sus Datos",
      useDataText: "Solo usaremos sus datos personales cuando la ley nos lo permita, principalmente para procesar su solicitud de visa.",
      securityTitle: "4. Seguridad de los Datos",
      securityText: "Hemos implementado medidas de seguridad adecuadas para evitar que sus datos personales se pierdan, usen o accedan de forma no autorizada.",
      contactTitle: "5. Contáctenos",
      contactText: "Si tiene alguna pregunta, contáctenos en privacy@visaplus.com."
    }
  }
};

const langs = ['en', 'fr', 'ar', 'es'];

langs.forEach(lang => {
  const filePath = path.join(__dirname, `../src/locales/${lang}/translation.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  data.servicesPage = newTranslations[lang].servicesPage;
  data.servicesData = newTranslations[lang].servicesData;
  data.contactPage = newTranslations[lang].contactPage;
  data.privacy = newTranslations[lang].privacy;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Updated ${lang} translations.`);
});
