const fs = require('fs');
const crypto = require('crypto');

function escapeSQL(str) {
  if (!str) return '';
  return str.replace(/'/g, "''");
}

const topics = [
  { 
    title: "How to Apply for a Schengen Visa from Morocco in 2024",
    titleAr: "كيفية التقديم للحصول على تأشيرة شنغن من المغرب في 2024",
    titleFr: "Comment demander un visa Schengen depuis le Maroc en 2024",
    img: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a",
    cat: "Schengen"
  },
  {
    title: "Canada Express Entry: The Ultimate Guide for Skilled Workers",
    titleAr: "الدخول السريع إلى كندا: الدليل الشامل للعمال المهرة",
    titleFr: "Entrée Express Canada : Le guide ultime pour les travailleurs qualifiés",
    img: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce",
    cat: "Canada"
  },
  {
    title: "UK Standard Visitor Visa: Required Documents and Tips",
    titleAr: "تأشيرة الزائر القياسية للمملكة المتحدة: المستندات المطلوبة ونصائح",
    titleFr: "Visa Visiteur Standard UK : Documents requis et conseils",
    img: "https://images.unsplash.com/photo-1735475458425-3f58c48170ad",
    cat: "UK Visas"
  },
  {
    title: "Studying in France: Campus France Procedure Explained",
    titleAr: "الدراسة في فرنسا: شرح إجراءات كامبوس فرانس",
    titleFr: "Étudier en France : La procédure Campus France expliquée",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    cat: "Study Abroad"
  },
  {
    title: "Top 10 Reasons Your Tourist Visa Got Rejected",
    titleAr: "أهم 10 أسباب لرفض تأشيرتك السياحية",
    titleFr: "Top 10 des raisons pour lesquelles votre visa touristique a été refusé",
    img: "https://images.unsplash.com/photo-1504159506876-f8338247a14a",
    cat: "Tips & Advice"
  },
  {
    title: "US B1/B2 Visa Interview: Common Questions and Answers",
    titleAr: "مقابلة تأشيرة الولايات المتحدة B1/B2: الأسئلة الشائعة وإجاباتها",
    titleFr: "Entretien pour le visa US B1/B2 : Questions courantes et réponses",
    img: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74",
    cat: "USA"
  },
  {
    title: "How to Prove Your Financial Means for a Schengen Visa",
    titleAr: "كيف تثبت قدرتك المالية للحصول على تأشيرة شنغن",
    titleFr: "Comment prouver vos moyens financiers pour un visa Schengen",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
    cat: "Schengen"
  },
  {
    title: "Moving to Germany: The Opportunity Karte (Chancenkarte)",
    titleAr: "الانتقال إلى ألمانيا: بطاقة الفرصة (Chancenkarte)",
    titleFr: "S'installer en Allemagne : La Carte d'Opportunité (Chancenkarte)",
    img: "https://images.unsplash.com/photo-1599839619722-39751411ea63",
    cat: "Work Visas"
  },
  {
    title: "Spain Tourist Visa vs France Tourist Visa: Which is Faster?",
    titleAr: "تأشيرة إسبانيا السياحية مقابل تأشيرة فرنسا: أيهما أسرع؟",
    titleFr: "Visa touristique Espagne vs Visa touristique France : Lequel est le plus rapide ?",
    img: "https://images.unsplash.com/photo-1543783207-ec64e4d95325",
    cat: "Schengen"
  },
  {
    title: "A Complete Guide to Studying in Canada for Moroccans",
    titleAr: "دليل شامل للدراسة في كندا للمغاربة",
    titleFr: "Un guide complet pour étudier au Canada pour les Marocains",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    cat: "Study Abroad"
  },
  {
    title: "The New Digital Nomad Visas in Europe (2024)",
    titleAr: "تأشيرات الرحالة الرقميين الجديدة في أوروبا (2024)",
    titleFr: "Les nouveaux visas pour nomades numériques en Europe (2024)",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
    cat: "Immigration News"
  },
  {
    title: "How to Track Your TLScontact Visa Application",
    titleAr: "كيفية تتبع طلب التأشيرة الخاص بك عبر TLScontact",
    titleFr: "Comment suivre votre demande de visa TLScontact",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    cat: "Tips & Advice"
  },
  {
    title: "Can I Appeal a Schengen Visa Refusal?",
    titleAr: "هل يمكنني استئناف قرار رفض تأشيرة شنغن؟",
    titleFr: "Puis-je faire appel d'un refus de visa Schengen ?",
    img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73",
    cat: "Schengen"
  },
  {
    title: "Understanding the Canadian Provincial Nominee Programs (PNP)",
    titleAr: "فهم برامج المرشح الإقليمي الكندية (PNP)",
    titleFr: "Comprendre les Programmes des Candidats des Provinces (PCP) canadiens",
    img: "https://images.unsplash.com/photo-1517732306149-e8f829eb588a",
    cat: "Canada"
  },
  {
    title: "Best European Countries for Post-Graduation Work Visas",
    titleAr: "أفضل الدول الأوروبية للحصول على تأشيرة عمل بعد التخرج",
    titleFr: "Les meilleurs pays européens pour les visas de travail post-diplôme",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
    cat: "Study Abroad"
  },
  {
    title: "How to Book a BLS Spain Appointment Successfully",
    titleAr: "كيفية حجز موعد في BLS إسبانيا بنجاح",
    titleFr: "Comment réserver un rendez-vous BLS Espagne avec succès",
    img: "https://images.unsplash.com/photo-1516483638261-f40af5a52233",
    cat: "Tips & Advice"
  },
  {
    title: "The Golden Visa in the UAE: Eligibility and Benefits",
    titleAr: "الإقامة الذهبية في الإمارات: الأهلية والفوائد",
    titleFr: "Le Golden Visa aux Émirats : Éligibilité et Avantages",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
    cat: "Work Visas"
  },
  {
    title: "What is an 'Attestation d'Accueil' and How to Get It?",
    titleAr: "ما هي 'شهادة الاستضافة' وكيف يمكن الحصول عليها؟",
    titleFr: "Qu'est-ce qu'une 'Attestation d'Accueil' et comment l'obtenir ?",
    img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5",
    cat: "Schengen"
  },
  {
    title: "Essential Documents for a Family Visit Visa to the UK",
    titleAr: "المستندات الأساسية لتأشيرة الزيارة العائلية إلى المملكة المتحدة",
    titleFr: "Documents essentiels pour un visa de visite familiale au Royaume-Uni",
    img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
    cat: "UK Visas"
  },
  {
    title: "Why Hire an Immigration Consultant? Benefits Explained",
    titleAr: "لماذا يجب تعيين مستشار هجرة؟ شرح الفوائد",
    titleFr: "Pourquoi engager un consultant en immigration ? Les avantages expliqués",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
    cat: "Immigration News"
  }
];

const loremEn = "Navigating the complex world of visas and immigration requires careful planning, accurate documentation, and up-to-date knowledge of consulate policies. Whether you are applying for a tourist visa to explore new cultures, seeking a student visa to advance your education abroad, or aiming for a work permit to boost your career, preparation is the key to success. In this comprehensive guide, we cover the latest 2024 regulations, essential document checklists, and insider tips to avoid common rejection pitfalls. Always ensure your passport is valid for at least 6 months, double-check your financial proofs, and consult with a certified immigration expert to maximize your chances of approval. Stay tuned to our blog for more insights.";

const loremAr = "يتطلب التنقل في عالم التأشيرات والهجرة المعقد تخطيطًا دقيقًا، ووثائق دقيقة، ومعرفة محدثة بسياسات القنصليات. سواء كنت تتقدم للحصول على تأشيرة سياحية لاستكشاف ثقافات جديدة، أو تسعى للحصول على تأشيرة طالب لتعزيز تعليمك في الخارج، أو تهدف إلى الحصول على تصريح عمل لتعزيز مسيرتك المهنية، فإن التحضير هو مفتاح النجاح. في هذا الدليل الشامل، نغطي أحدث لوائح 2024، وقوائم المستندات الأساسية، ونصائح الخبراء لتجنب أسباب الرفض الشائعة. تأكد دائمًا من أن جواز سفرك صالح لمدة 6 أشهر على الأقل، وتحقق من إثباتاتك المالية، واستشر خبير هجرة معتمد لزيادة فرصك في الموافقة. تابع مدونتنا لمزيد من الرؤى.";

const loremFr = "Naviguer dans le monde complexe des visas et de l'immigration nécessite une planification minutieuse, des documents précis et une connaissance actualisée des politiques consulaires. Que vous demandiez un visa touristique pour explorer de nouvelles cultures, que vous cherchiez un visa étudiant pour faire avancer vos études à l'étranger, ou que vous visiez un permis de travail pour stimuler votre carrière, la préparation est la clé du succès. Dans ce guide complet, nous couvrons les dernières réglementations de 2024, les listes de documents essentiels et les conseils d'experts pour éviter les pièges courants de rejet. Assurez-vous toujours que votre passeport est valide pour au moins 6 mois, vérifiez vos preuves financières et consultez un expert en immigration certifié pour maximiser vos chances d'approbation. Restez à l'écoute de notre blog pour plus d'informations.";

let sql = '';

topics.forEach((t, i) => {
  const id = crypto.randomUUID();
  const slug = t.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.floor(Math.random()*1000);
  
  const excerptEn = t.title + " - Learn everything you need to know about the requirements, processing times, and expert tips for a successful application.";
  const excerptAr = t.titleAr + " - تعرف على كل ما تحتاج لمعرفته حول المتطلبات وأوقات المعالجة ونصائح الخبراء لتقديم طلب ناجح.";
  const excerptFr = t.titleFr + " - Apprenez tout ce que vous devez savoir sur les exigences, les délais de traitement et les conseils d'experts pour une demande réussie.";

  const contentEn = `<h2>Introduction</h2><p>${loremEn}</p><h3>Key Requirements</h3><ul><li>Valid Passport</li><li>Application Form</li><li>Financial Proof</li></ul><p>Contact VisaPlus for expert assistance.</p>`;
  const contentAr = `<h2>مقدمة</h2><p>${loremAr}</p><h3>المتطلبات الأساسية</h3><ul><li>جواز سفر ساري المفعول</li><li>نموذج الطلب</li><li>إثبات مالي</li></ul><p>اتصل بـ VisaPlus للحصول على مساعدة الخبراء.</p>`;
  const contentFr = `<h2>Introduction</h2><p>${loremFr}</p><h3>Exigences clés</h3><ul><li>Passeport valide</li><li>Formulaire de demande</li><li>Preuve financière</li></ul><p>Contactez VisaPlus pour une assistance experte.</p>`;

  sql += `INSERT INTO "Blog" ("id", "title", "titleAr", "titleFr", "slug", "excerpt", "excerptAr", "excerptFr", "image", "content", "contentAr", "contentFr", "category", "author", "published", "createdAt", "updatedAt") VALUES ('${id}', '${escapeSQL(t.title)}', '${escapeSQL(t.titleAr)}', '${escapeSQL(t.titleFr)}', '${slug}', '${escapeSQL(excerptEn)}', '${escapeSQL(excerptAr)}', '${escapeSQL(excerptFr)}', '${t.img}?auto=format&fit=crop&w=800&q=80', '${escapeSQL(contentEn)}', '${escapeSQL(contentAr)}', '${escapeSQL(contentFr)}', '${escapeSQL(t.cat)}', 'Admin', 1, datetime('now', '-${i} days'), datetime('now', '-${i} days'));\n`;
});

fs.writeFileSync('./prisma/migrations/0003_seed_blogs.sql', sql);
console.log('SQL generated.');
