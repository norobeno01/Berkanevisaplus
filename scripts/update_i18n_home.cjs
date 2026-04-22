const fs = require('fs');
const path = require('path');

const locales = ['en', 'ar', 'fr'];

const homeAdditions = {
  en: {
    brandsTitle: "Partners & Official Bodies",
    brandsSubtitle: "We work directly with official application centers and universities globally.",
    teamTitle: "Our Expert Team",
    teamSubtitle: "Meet the certified immigration consultants dedicated to your success.",
    team: {
      ceo: "CEO & Lead Consultant",
      specialist: "Senior Visa Specialist",
      coordinator: "Application Coordinator"
    }
  },
  ar: {
    brandsTitle: "الشركاء والهيئات الرسمية",
    brandsSubtitle: "نعمل مباشرة مع مراكز تقديم الطلبات الرسمية والجامعات عالمياً.",
    teamTitle: "فريق الخبراء لدينا",
    teamSubtitle: "تعرف على مستشاري الهجرة المعتمدين المكرسين لنجاحك.",
    team: {
      ceo: "المدير العام والمستشار الرئيسي",
      specialist: "أخصائي تأشيرات أول",
      coordinator: "منسق طلبات"
    }
  },
  fr: {
    brandsTitle: "Partenaires et Organismes Officiels",
    brandsSubtitle: "Nous travaillons directement avec les centres de demande officiels et les universités à l'échelle mondiale.",
    teamTitle: "Notre Équipe d'Experts",
    teamSubtitle: "Rencontrez les consultants en immigration certifiés dédiés à votre succès.",
    team: {
      ceo: "PDG et Consultant Principal",
      specialist: "Spécialiste Senior des Visas",
      coordinator: "Coordinateur des Demandes"
    }
  }
};

locales.forEach(loc => {
  const filePath = path.join(__dirname, `../src/locales/${loc}/translation.json`);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Merge into home
    if(!data.home) data.home = {};
    data.home.brands = homeAdditions[loc];
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated ${loc}`);
  }
});
