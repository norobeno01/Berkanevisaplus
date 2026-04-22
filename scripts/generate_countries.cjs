const fs = require('fs');

const countries = [
  { id: 'france', name: 'France', img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a', desc: 'Top Schengen destination from Morocco for tourism, business, and Campus France.' },
  { id: 'spain', name: 'Spain', img: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325', desc: 'Popular for summer holidays and family visits. Processed via BLS International.' },
  { id: 'canada', name: 'Canada', img: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce', desc: 'Navigating the complex IRCC portal for Visitor, Study, and Work permits.' },
  { id: 'usa', name: 'United States', img: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74', desc: 'Expert assistance with DS-160 and mock interview preparation.' },
  { id: 'uk', name: 'United Kingdom', img: 'https://images.unsplash.com/photo-1735475458425-3f58c48170ad', desc: 'Seamless application processing via TLScontact for UK Visas.' },
  { id: 'germany', name: 'Germany', img: 'https://images.unsplash.com/photo-1599839619722-39751411ea63', desc: 'Leading European economy with strong opportunities for skilled workers.' },
  { id: 'italy', name: 'Italy', img: 'https://images.unsplash.com/photo-1516483638261-f40af5a52233', desc: 'Rich cultural heritage and popular Schengen destination.' },
  { id: 'netherlands', name: 'Netherlands', img: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4', desc: 'Innovative economy with streamlined highly skilled migrant visas.' },
  { id: 'switzerland', name: 'Switzerland', img: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99', desc: 'High quality of life and premium tourism destination.' },
  { id: 'belgium', name: 'Belgium', img: 'https://images.unsplash.com/photo-1550340499-a6c60fc8287c', desc: 'Heart of Europe, excellent for business and study.' },
  { id: 'australia', name: 'Australia', img: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be', desc: 'World-class education and points-based immigration system.' },
  { id: 'uae', name: 'United Arab Emirates', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c', desc: 'Fast-tracked e-visas and Golden Visa opportunities.' },
  { id: 'saudiarabia', name: 'Saudi Arabia', img: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb', desc: 'Umrah, business, and the new rapid e-Visa system.' },
  { id: 'turkey', name: 'Turkey', img: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200', desc: 'Bridge between Europe and Asia with easy e-Visa access.' },
  { id: 'japan', name: 'Japan', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e', desc: 'Unique culture with rising demand for international workers.' },
  { id: 'china', name: 'China', img: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d', desc: 'Global business hub and massive educational opportunities.' },
  { id: 'southkorea', name: 'South Korea', img: 'https://images.unsplash.com/photo-1538485399081-7191377e8241', desc: 'K-ETA support and vibrant student visa pathways.' },
  { id: 'singapore', name: 'Singapore', img: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd', desc: 'Premier Asian business hub with streamlined work passes.' },
  { id: 'newzealand', name: 'New Zealand', img: 'https://images.unsplash.com/photo-1469521669194-babbdf9aa987', desc: 'Stunning landscapes and welcoming skilled migrant policies.' },
  { id: 'sweden', name: 'Sweden', img: 'https://images.unsplash.com/photo-1509356843151-38319e6231d6', desc: 'Scandinavian innovation with excellent work-life balance.' },
  { id: 'qatar', name: 'Qatar', img: 'https://images.unsplash.com/photo-1538045698727-ac45d4365100', desc: 'Rapidly growing Gulf state with Hayya card facilitation.' }
];

let countriesDataTS = `export interface VisaType {
  id: string;
  name: string;
  description: string;
  processingTime: string;
  fee: string;
  requirements: string[];
}

export interface CountryData {
  id: string;
  name: string;
  image: string;
  type: string;
  description: string;
  visaTypes: VisaType[];
}

export const countriesData: CountryData[] = [
`;

const enTranslations = {};
const arTranslations = {};

countries.forEach((c, index) => {
  // TS structure
  countriesDataTS += `  {
    id: "${c.id}",
    name: "${c.name}",
    image: "${c.img}?auto=format&fit=crop&w=1000&q=80",
    type: "Tourist, Study & Work Visas",
    description: "${c.desc}",
    visaTypes: [
      {
        id: "tourist",
        name: "Tourist Visa",
        description: "For short stays, holidays, and family visits.",
        processingTime: "15 - 30 Days",
        fee: "Varies by consulate",
        requirements: [
          "Valid Passport (6+ months validity)",
          "Completed Visa Application Form",
          "Two recent biometric passport photos",
          "Travel Medical Insurance",
          "Proof of Accommodation (Hotel or Invitation)",
          "Round-trip flight reservation",
          "Proof of Financial Means (Bank statements)",
          "Proof of Employment / Socio-Economic Status"
        ]
      },
      {
        id: "study",
        name: "Study Visa",
        description: "For long-term enrollment in educational institutions.",
        processingTime: "4 - 8 Weeks",
        fee: "Varies by institution/consulate",
        requirements: [
          "Valid Passport",
          "Letter of Acceptance from recognized institution",
          "Proof of tuition payment or financial support",
          "Previous academic transcripts and diplomas",
          "Proof of accommodation",
          "Language proficiency certificate (if required)"
        ]
      },
      {
        id: "work",
        name: "Work Visa",
        description: "For employment, sponsored by a recognized company.",
        processingTime: "4 - 12 Weeks",
        fee: "Varies by country",
        requirements: [
          "Valid Passport",
          "Official Job Offer / Employment Contract",
          "Work Permit approval from local labor ministry",
          "Professional qualifications and diplomas",
          "Police clearance certificate",
          "Medical examination report"
        ]
      }
    ]
  }${index < countries.length - 1 ? ',' : ''}
`;

  enTranslations[c.id] = {
    name: c.name,
    type: "Tourist, Study & Work Visas",
    description: c.desc,
    visaTypes: {
      tourist: {
        name: "Tourist Visa",
        description: "For short stays, holidays, and family visits.",
        processingTime: "15 - 30 Days",
        fee: "Varies by consulate",
        requirements: [
          "Valid Passport (6+ months validity)",
          "Completed Visa Application Form",
          "Two recent biometric passport photos",
          "Travel Medical Insurance",
          "Proof of Accommodation (Hotel or Invitation)",
          "Round-trip flight reservation",
          "Proof of Financial Means (Bank statements)",
          "Proof of Employment / Socio-Economic Status"
        ]
      },
      study: {
        name: "Study Visa",
        description: "For long-term enrollment in educational institutions.",
        processingTime: "4 - 8 Weeks",
        fee: "Varies by institution/consulate",
        requirements: [
          "Valid Passport",
          "Letter of Acceptance from recognized institution",
          "Proof of tuition payment or financial support",
          "Previous academic transcripts and diplomas",
          "Proof of accommodation",
          "Language proficiency certificate (if required)"
        ]
      },
      work: {
        name: "Work Visa",
        description: "For employment, sponsored by a recognized company.",
        processingTime: "4 - 12 Weeks",
        fee: "Varies by country",
        requirements: [
          "Valid Passport",
          "Official Job Offer / Employment Contract",
          "Work Permit approval from local labor ministry",
          "Professional qualifications and diplomas",
          "Police clearance certificate",
          "Medical examination report"
        ]
      }
    }
  };

  arTranslations[c.id] = {
    name: c.name,
    type: "تأشيرات السياحة، الدراسة، والعمل",
    description: "مساعدة متخصصة للحصول على تأشيرات لهذه الوجهة.",
    visaTypes: {
      tourist: {
        name: "تأشيرة سياحية",
        description: "للإقامات القصيرة، العطلات، والزيارات العائلية.",
        processingTime: "15 - 30 يوماً",
        fee: "تختلف حسب القنصلية",
        requirements: [
          "جواز سفر ساري المفعول (صلاحية 6 أشهر+)",
          "نموذج طلب تأشيرة مكتمل",
          "صورتان شخصيتان بيومتريتان حديثتان",
          "تأمين طبي للسفر",
          "إثبات الإقامة (فندق أو دعوة)",
          "حجز طيران ذهاب وإياب",
          "إثبات القدرة المالية (كشوفات حساب بنكي)",
          "إثبات العمل / الحالة الاجتماعية والاقتصادية"
        ]
      },
      study: {
        name: "تأشيرة دراسة",
        description: "للتسجيل طويل الأمد في المؤسسات التعليمية.",
        processingTime: "4 - 8 أسابيع",
        fee: "تختلف حسب المؤسسة",
        requirements: [
          "جواز سفر ساري المفعول",
          "رسالة قبول من مؤسسة معترف بها",
          "إثبات دفع الرسوم الدراسية أو الدعم المالي",
          "كشوف النقاط والشهادات الأكاديمية السابقة",
          "إثبات الإقامة",
          "شهادة إتقان اللغة (إذا لزم الأمر)"
        ]
      },
      work: {
        name: "تأشيرة عمل",
        description: "للعمل، برعاية شركة معترف بها.",
        processingTime: "4 - 12 أسبوعاً",
        fee: "تختلف حسب الدولة",
        requirements: [
          "جواز سفر ساري المفعول",
          "عرض عمل رسمي / عقد عمل",
          "موافقة تصريح العمل من وزارة العمل المحلية",
          "المؤهلات المهنية والشهادات",
          "شهادة خلو من السوابق (فيش تشبيه)",
          "تقرير فحص طبي"
        ]
      }
    }
  };
});

countriesDataTS += `];\n`;

fs.writeFileSync('./src/data/countries.ts', countriesDataTS);

// Update translations
const enFile = JSON.parse(fs.readFileSync('./src/locales/en/translation.json', 'utf8'));
enFile.countryData = enTranslations;
fs.writeFileSync('./src/locales/en/translation.json', JSON.stringify(enFile, null, 2));

const arFile = JSON.parse(fs.readFileSync('./src/locales/ar/translation.json', 'utf8'));
arFile.countryData = arTranslations;
fs.writeFileSync('./src/locales/ar/translation.json', JSON.stringify(arFile, null, 2));

const frFile = JSON.parse(fs.readFileSync('./src/locales/fr/translation.json', 'utf8'));
frFile.countryData = enTranslations; // Defaulting to EN for FR for this generation
fs.writeFileSync('./src/locales/fr/translation.json', JSON.stringify(frFile, null, 2));

console.log("Generated successfully.");
