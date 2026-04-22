const fs = require('fs');
const path = require('path');

const locales = ['en', 'ar', 'fr', 'es'];

const schengenTranslations = {
  en: {
    "title": "Schengen Visas",
    "subtitle": "Complete assistance for Tourist, Business, and Family Visit visas to France, Spain, Italy, Germany, and all 27 Schengen member states.",
    "type": "Type C — Short Stay (up to 90 days)",
    "procedureTitle": "Application Procedure",
    "step1Title": "Consultation & Document Review",
    "step1Desc": "We analyze your profile and compile the exact checklist needed.",
    "step2Title": "File Preparation & Translation",
    "step2Desc": "Translation of Arabic documents to French/English/Spanish, filling forms.",
    "step3Title": "Appointment Booking",
    "step3Desc": "Securing a slot at VFS Global, TLScontact, or BLS.",
    "step4Title": "Biometrics & Submission",
    "step4Desc": "You submit your file and biometrics at the application center.",
    "step5Title": "Passport Collection",
    "step5Desc": "Tracking your application until your passport is returned.",
    "checklistTitle": "Document Checklist",
    "downloadPdf": "Download PDF",
    "req1": "Valid Passport (issued within last 10 years, valid for 3+ months beyond return date, 2+ blank pages)",
    "req2": "Two recent biometric passport photos (ICAO standard, white background)",
    "req3": "Schengen Visa application form, fully completed and signed",
    "req4": "Travel Medical Insurance (minimum coverage €30,000, valid for entire Schengen area)",
    "req5": "Proof of Accommodation (hotel reservation, host invitation 'Attestation d'accueil', or rental agreement)",
    "req6": "Round-trip flight reservation or travel itinerary",
    "req7": "Proof of Financial Means (bank statements for last 3 months showing min. 3000 MAD/day or sponsor letter)",
    "req8": "Proof of Socio-Economic Status (work certificate, last 3 salary slips, CNSS registration, or commerce registry for business owners)",
    "req9": "Family record book (Livret de famille) for married applicants",
    "note": "Note: Additional documents may be required depending on your specific socio-economic status (e.g., pensioners, students, minors).",
    "summaryTitle": "Visa Summary",
    "processingTime": "Processing Time",
    "processingDesc": "15 - 30 working days (Varies by embassy)",
    "validity": "Validity",
    "validityDesc": "Up to 90 days within a 180-day period",
    "appCenters": "Application Centers",
    "appCentersDesc": "Rabat, Nador, Oujda, Casablanca",
    "embassyFee": "Embassy Fee:",
    "serviceFee": "VFS/TLS Service Fee:",
    "startApp": "Start Application"
  },
  ar: {
    "title": "تأشيرات شنغن",
    "subtitle": "مساعدة كاملة للحصول على تأشيرات السياحة والأعمال والزيارات العائلية إلى فرنسا وإسبانيا وإيطاليا وألمانيا وجميع دول شنغن الـ 27.",
    "type": "النوع C — إقامة قصيرة (حتى 90 يومًا)",
    "procedureTitle": "إجراءات التقديم",
    "step1Title": "الاستشارة ومراجعة المستندات",
    "step1Desc": "نقوم بتحليل ملفك وإعداد قائمة المستندات المطلوبة بالضبط.",
    "step2Title": "إعداد الملف والترجمة",
    "step2Desc": "ترجمة المستندات العربية إلى الفرنسية/الإنجليزية/الإسبانية وتعبئة النماذج.",
    "step3Title": "حجز الموعد",
    "step3Desc": "تأمين موعد في VFS Global أو TLScontact أو BLS.",
    "step4Title": "البصمات وتقديم الطلب",
    "step4Desc": "تقوم بتقديم ملفك وأخذ البصمات في مركز تقديم الطلبات.",
    "step5Title": "استلام الجواز",
    "step5Desc": "تتبع طلبك حتى يتم إرجاع جواز سفرك.",
    "checklistTitle": "قائمة المستندات المطلوبة",
    "downloadPdf": "تحميل PDF",
    "req1": "جواز سفر ساري المفعول (صادر خلال آخر 10 سنوات، صالح لأكثر من 3 أشهر بعد تاريخ العودة، صفحتين فارغتين على الأقل)",
    "req2": "صورتان شخصيتان بيومتريتان حديثتان (معيار ICAO، خلفية بيضاء)",
    "req3": "نموذج طلب تأشيرة شنغن، مكتمل وموقع بالكامل",
    "req4": "تأمين طبي للسفر (تغطية بحد أدنى 30,000 يورو، صالح لكامل منطقة شنغن)",
    "req5": "إثبات الإقامة (حجز فندقي، دعوة استضافة، أو عقد إيجار)",
    "req6": "حجز طيران ذهاب وإياب أو خطة سفر",
    "req7": "إثبات القدرة المالية (كشوفات حساب بنكي لآخر 3 أشهر تظهر 3000 درهم/يوم كحد أدنى أو رسالة كفيل)",
    "req8": "إثبات الحالة الاجتماعية والاقتصادية (شهادة عمل، آخر 3 قسائم راتب، تسجيل الضمان الاجتماعي، أو سجل تجاري لأصحاب الأعمال)",
    "req9": "دفتر العائلة (للمتزوجين)",
    "note": "ملاحظة: قد تُطلب مستندات إضافية بناءً على حالتك الاجتماعية والاقتصادية الخاصة (مثل المتقاعدين، الطلاب، القصر).",
    "summaryTitle": "ملخص التأشيرة",
    "processingTime": "وقت المعالجة",
    "processingDesc": "15 - 30 يوم عمل (يختلف حسب السفارة)",
    "validity": "الصلاحية",
    "validityDesc": "حتى 90 يومًا خلال فترة 180 يومًا",
    "appCenters": "مراكز تقديم الطلبات",
    "appCentersDesc": "الرباط، الناظور، وجدة، الدار البيضاء",
    "embassyFee": "رسوم السفارة:",
    "serviceFee": "رسوم خدمة VFS/TLS:",
    "startApp": "ابدأ الطلب"
  }
};

// Fallbacks for missing languages (FR and ES use EN for simplicity unless translated)
const blogTranslations = {
  en: {
    "title": "Our Blog",
    "subtitle": "Latest news, updates, and expert tips on global immigration and visa procedures.",
    "readMore": "Read More",
    "postNotFound": "Post Not Found",
    "postNotFoundDesc": "The article you are looking for does not exist.",
    "returnToBlog": "Return to Blog",
    "backToBlog": "Back to Blog",
    "author": "Author",
    "publishedOn": "Published on"
  },
  ar: {
    "title": "مدونتنا",
    "subtitle": "أحدث الأخبار والتحديثات ونصائح الخبراء حول إجراءات الهجرة والتأشيرات العالمية.",
    "readMore": "اقرأ المزيد",
    "postNotFound": "المنشور غير موجود",
    "postNotFoundDesc": "المقال الذي تبحث عنه غير موجود.",
    "returnToBlog": "العودة إلى المدونة",
    "backToBlog": "العودة إلى المدونة",
    "author": "الكاتب",
    "publishedOn": "نشر في"
  }
};

locales.forEach(loc => {
  const filePath = path.join(__dirname, `../src/locales/${loc}/translation.json`);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Add schengen
    data.schengen = schengenTranslations[loc] || schengenTranslations['en'];
    // Add blog
    data.blogPage = blogTranslations[loc] || blogTranslations['en'];
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated ${loc}`);
  }
});
