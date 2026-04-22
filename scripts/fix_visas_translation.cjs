const fs = require('fs');

const arCountryNames = {
  france: "فرنسا",
  spain: "إسبانيا",
  canada: "كندا",
  usa: "الولايات المتحدة",
  uk: "المملكة المتحدة",
  germany: "ألمانيا",
  italy: "إيطاليا",
  netherlands: "هولندا",
  switzerland: "سويسرا",
  belgium: "بلجيكا",
  australia: "أستراليا",
  uae: "الإمارات العربية المتحدة",
  saudiarabia: "المملكة العربية السعودية",
  turkey: "تركيا",
  japan: "اليابان",
  china: "الصين",
  southkorea: "كوريا الجنوبية",
  singapore: "سنغافورة",
  newzealand: "نيوزيلندا",
  sweden: "السويد",
  qatar: "قطر"
};

const frCountryNames = {
  france: "France",
  spain: "Espagne",
  canada: "Canada",
  usa: "États-Unis",
  uk: "Royaume-Uni",
  germany: "Allemagne",
  italy: "Italie",
  netherlands: "Pays-Bas",
  switzerland: "Suisse",
  belgium: "Belgique",
  australia: "Australie",
  uae: "Émirats Arabes Unis",
  saudiarabia: "Arabie Saoudite",
  turkey: "Turquie",
  japan: "Japon",
  china: "Chine",
  southkorea: "Corée du Sud",
  singapore: "Singapour",
  newzealand: "Nouvelle-Zélande",
  sweden: "Suède",
  qatar: "Qatar"
};

const arFile = JSON.parse(fs.readFileSync('./src/locales/ar/translation.json', 'utf8'));
const frFile = JSON.parse(fs.readFileSync('./src/locales/fr/translation.json', 'utf8'));
const enFile = JSON.parse(fs.readFileSync('./src/locales/en/translation.json', 'utf8'));

// Fix country names in AR
for (const key in arFile.countryData) {
  if (arCountryNames[key]) {
    arFile.countryData[key].name = arCountryNames[key];
  }
}

// Fix country names in FR
for (const key in frFile.countryData) {
  if (frCountryNames[key]) {
    frFile.countryData[key].name = frCountryNames[key];
    frFile.countryData[key].type = "Visas de Tourisme, Études et Travail";
    frFile.countryData[key].description = "Assistance experte pour l'obtention de visas pour cette destination.";
    
    // Translate Visa Types for FR
    if(frFile.countryData[key].visaTypes) {
      if(frFile.countryData[key].visaTypes.tourist) {
        frFile.countryData[key].visaTypes.tourist.name = "Visa Touristique";
        frFile.countryData[key].visaTypes.tourist.description = "Pour les courts séjours, les vacances et les visites familiales.";
        frFile.countryData[key].visaTypes.tourist.processingTime = "15 - 30 Jours";
        frFile.countryData[key].visaTypes.tourist.fee = "Varie selon le consulat";
        frFile.countryData[key].visaTypes.tourist.requirements = [
          "Passeport valide (6+ mois de validité)",
          "Formulaire de demande de visa rempli",
          "Deux photos d'identité biométriques récentes",
          "Assurance médicale de voyage",
          "Preuve d'hébergement (Hôtel ou Invitation)",
          "Réservation de vol aller-retour",
          "Preuve de moyens financiers (Relevés bancaires)",
          "Preuve d'emploi / Statut socio-économique"
        ];
      }
      if(frFile.countryData[key].visaTypes.study) {
        frFile.countryData[key].visaTypes.study.name = "Visa d'Études";
        frFile.countryData[key].visaTypes.study.description = "Pour une inscription à long terme dans des établissements d'enseignement.";
        frFile.countryData[key].visaTypes.study.processingTime = "4 - 8 Semaines";
        frFile.countryData[key].visaTypes.study.fee = "Varie selon l'institution";
        frFile.countryData[key].visaTypes.study.requirements = [
          "Passeport valide",
          "Lettre d'acceptation d'une institution reconnue",
          "Preuve de paiement des frais de scolarité ou soutien financier",
          "Relevés de notes et diplômes académiques précédents",
          "Preuve d'hébergement",
          "Certificat de compétence linguistique (si requis)"
        ];
      }
      if(frFile.countryData[key].visaTypes.work) {
        frFile.countryData[key].visaTypes.work.name = "Visa de Travail";
        frFile.countryData[key].visaTypes.work.description = "Pour un emploi, parrainé par une entreprise reconnue.";
        frFile.countryData[key].visaTypes.work.processingTime = "4 - 12 Semaines";
        frFile.countryData[key].visaTypes.work.fee = "Varie selon le pays";
        frFile.countryData[key].visaTypes.work.requirements = [
          "Passeport valide",
          "Offre d'emploi officielle / Contrat de travail",
          "Approbation du permis de travail du ministère du travail local",
          "Qualifications professionnelles et diplômes",
          "Certificat de police (Casier judiciaire)",
          "Rapport d'examen médical"
        ];
      }
    }
  }
}

// Add home.visas translations
enFile.home = enFile.home || {};
enFile.home.visas = {
  title: "Select Your Destination",
  subtitle: "Choose from over 20+ global destinations and discover the exact visa types and requirements."
};

arFile.home = arFile.home || {};
arFile.home.visas = {
  title: "اختر وجهتك",
  subtitle: "اختر من بين أكثر من 20 وجهة عالمية واكتشف أنواع التأشيرات والمتطلبات الدقيقة."
};

frFile.home = frFile.home || {};
frFile.home.visas = {
  title: "Sélectionnez votre destination",
  subtitle: "Choisissez parmi plus de 20 destinations mondiales et découvrez les types de visas et les exigences exactes."
};

fs.writeFileSync('./src/locales/ar/translation.json', JSON.stringify(arFile, null, 2));
fs.writeFileSync('./src/locales/fr/translation.json', JSON.stringify(frFile, null, 2));
fs.writeFileSync('./src/locales/en/translation.json', JSON.stringify(enFile, null, 2));

console.log("Translations fixed.");
