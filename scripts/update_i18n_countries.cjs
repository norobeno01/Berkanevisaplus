const fs = require('fs');
const path = require('path');

const locales = ['en', 'ar', 'fr'];

const data = {
  en: {
    common: {
      agencyName: "VisaPlus Berkane",
      home: "Home",
      about: "About",
      services: "Services",
      contact: "Contact",
      applyNow: "Apply Now",
      backToHome: "Back to Home",
      requirements: "Document Checklist",
      downloadPdf: "Download PDF",
      noteReq: "Note: Embassy requirements frequently change. This checklist serves as a general guideline. Contact us for an exact profile assessment.",
      visaSummary: "Visa Summary",
      processingTime: "Processing Time",
      visaType: "Visa Type",
      officialFees: "Official Fees:"
    },
    countryData: {
      france: {
        name: "France (Schengen)",
        type: "Schengen (Type C & D)",
        description: "The most requested Schengen destination from Morocco. Ideal for tourism, business, and study (Campus France).",
        visaTypes: {
          tourist: {
            name: "Tourist Visa (Type C)",
            description: "For short stays up to 90 days for tourism or visiting family/friends.",
            processingTime: "15 - 30 Days",
            fee: "€90 + TLScontact fee",
            requirements: [
              "Valid Passport (issued within last 10 years, valid for 3+ months beyond return date, 2+ blank pages)",
              "Two recent biometric passport photos (ICAO standard, white background)",
              "Schengen Visa application form, fully completed and signed via France-Visas",
              "Travel Medical Insurance (minimum coverage €30,000, valid for entire Schengen area)",
              "Proof of Accommodation (hotel reservation or host invitation 'Attestation d'accueil')",
              "Round-trip flight reservation",
              "Proof of Financial Means (bank statements for last 3 months showing min. 3000 MAD/day)",
              "Proof of Socio-Economic Status (work certificate, last 3 salary slips, CNSS registration, or commerce registry)",
              "Family record book (Livret de famille) for married applicants"
            ]
          },
          student: {
            name: "Student Visa (Type D)",
            description: "For long stays over 90 days to study at a French university or language school.",
            processingTime: "15 - 45 Days",
            fee: "€50 (reduced rate for EEF) + TLScontact fee",
            requirements: [
              "Valid Passport",
              "Long-stay visa application form",
              "Campus France 'Accord préalable' or Etudes en France (EEF) certificate",
              "Proof of enrollment in a French educational institution",
              "Proof of financial resources (minimum €615 per month) via blocked account or guarantor",
              "Proof of accommodation in France for at least the first 3 months",
              "Previous academic transcripts and diplomas"
            ]
          }
        }
      },
      spain: {
        name: "Spain (Schengen)",
        type: "Schengen (Type C & D)",
        description: "A top choice for summer holidays and family visits. Processed via BLS International.",
        visaTypes: {
          tourist: {
            name: "Tourist / Family Visit (Type C)",
            description: "Short stay visa for tourism or visiting family in Spain.",
            processingTime: "15 - 45 Days",
            fee: "€90 + BLS fee",
            requirements: [
              "Valid Passport (6 months validity recommended)",
              "Visa application form completed in Spanish or French",
              "Travel Medical Insurance (€30,000 coverage)",
              "Hotel reservation or Invitation letter (Carta de Invitación from Policia Nacional)",
              "Flight itinerary",
              "Financial proof (Bank statements for 3 months)",
              "Work certificate & CNSS history",
              "Copies of all previous Schengen visas"
            ]
          }
        }
      },
      canada: {
        name: "Canada",
        type: "Visitor, Study & Work Permits",
        description: "Whether you want to study, work, or visit, we help you navigate the complex IRCC portal.",
        visaTypes: {
          visitor: {
            name: "Visitor Visa (TRV)",
            description: "For tourism, visiting family, or short business trips to Canada.",
            processingTime: "30 - 90 Days",
            fee: "$100 CAD + $85 Biometrics",
            requirements: [
              "Valid Passport",
              "Digital photo (IRCC specifications)",
              "Proof of funds (Bank statements, property ownership, sponsor letters)",
              "Letter of explanation detailing the purpose of the trip",
              "Ties to home country proof (employment letter, family ties, property)",
              "Travel history (previous visas)"
            ]
          },
          study: {
            name: "Study Permit",
            description: "Required for international students to study at Designated Learning Institutions (DLI) in Canada.",
            processingTime: "4 - 12 Weeks",
            fee: "$150 CAD + $85 Biometrics",
            requirements: [
              "Letter of Acceptance from a Canadian DLI",
              "Provincial Attestation Letter (PAL) if applicable",
              "Proof of financial support (tuition + $20,635 CAD for living expenses)",
              "Letter of explanation / Study plan",
              "CAQ (Certificat d'acceptation du Québec) if studying in Quebec",
              "Medical exam and Police certificate (if required)"
            ]
          }
        }
      },
      usa: {
        name: "United States",
        type: "B1/B2 Tourist, F1 Student",
        description: "Expert assistance with the DS-160 form and rigorous mock interview preparation for the US Embassy.",
        visaTypes: {
          b1b2: {
            name: "B1/B2 Tourist & Business",
            description: "Non-immigrant visa for persons traveling to the US temporarily for business (B-1) or for pleasure/medical treatment (B-2).",
            processingTime: "Depends on interview slot (often 1-6 months)",
            fee: "$185 USD",
            requirements: [
              "Valid Passport (valid for at least 6 months beyond period of stay)",
              "DS-160 Nonimmigrant Visa Application Confirmation Page",
              "Appointment Confirmation Page",
              "US Visa Photo (2x2 inches, white background, no glasses)",
              "Proof of strong ties to Morocco (employment, property, family)",
              "Bank statements & financial proof",
              "Travel itinerary or letter of invitation (if applicable)"
            ]
          }
        }
      },
      uk: {
        name: "United Kingdom",
        type: "Standard Visitor, Student",
        description: "Seamless application processing via TLScontact for tourism, business, and study in the UK.",
        visaTypes: {
          visitor: {
            name: "Standard Visitor Visa",
            description: "For tourism, business, study (courses up to 6 months), and other permitted activities.",
            processingTime: "15 - 21 Days",
            fee: "£115 GBP (up to 6 months)",
            requirements: [
              "Valid Passport",
              "Online Application Form via Gov.uk",
              "Financial evidence (Bank statements showing consistent income and savings)",
              "Proof of employment (letter from employer stating salary, role, and approved leave)",
              "Accommodation details in the UK",
              "Detailed travel itinerary and estimated costs"
            ]
          }
        }
      }
    }
  },
  ar: {
    common: {
      agencyName: "فيزا بلس بركان",
      home: "الرئيسية",
      about: "معلومات عنا",
      services: "خدماتنا",
      contact: "اتصل بنا",
      applyNow: "قدم الآن",
      backToHome: "العودة للرئيسية",
      requirements: "قائمة المستندات المطلوبة",
      downloadPdf: "تحميل PDF",
      noteReq: "ملاحظة: تتغير متطلبات السفارة بشكل متكرر. هذه القائمة هي بمثابة مبادئ توجيهية عامة. اتصل بنا لتقييم ملفك الشخصي بدقة.",
      visaSummary: "ملخص التأشيرة",
      processingTime: "وقت المعالجة",
      visaType: "نوع التأشيرة",
      officialFees: "الرسوم الرسمية:"
    },
    countryData: {
      france: {
        name: "فرنسا (شنغن)",
        type: "شنغن (النوع C و D)",
        description: "الوجهة الأكثر طلباً في منطقة شنغن من المغرب. مثالية للسياحة، والأعمال، والدراسة (كامبوس فرانس).",
        visaTypes: {
          tourist: {
            name: "تأشيرة سياحية (النوع C)",
            description: "للإقامات القصيرة حتى 90 يوماً للسياحة أو زيارة العائلة/الأصدقاء.",
            processingTime: "15 - 30 يوماً",
            fee: "90 يورو + رسوم TLScontact",
            requirements: [
              "جواز سفر ساري المفعول (صادر خلال آخر 10 سنوات، صالح لأكثر من 3 أشهر بعد تاريخ العودة، صفحتين فارغتين على الأقل)",
              "صورتان شخصيتان بيومتريتان حديثتان (معيار ICAO، خلفية بيضاء)",
              "نموذج طلب تأشيرة شنغن، مكتمل وموقع بالكامل عبر France-Visas",
              "تأمين طبي للسفر (تغطية بحد أدنى 30,000 يورو، صالح لكامل منطقة شنغن)",
              "إثبات الإقامة (حجز فندقي أو دعوة استضافة)",
              "حجز طيران ذهاب وإياب",
              "إثبات القدرة المالية (كشوفات حساب بنكي لآخر 3 أشهر تظهر 3000 درهم/يوم كحد أدنى)",
              "إثبات الحالة الاجتماعية والاقتصادية (شهادة عمل، آخر 3 قسائم راتب، تسجيل الضمان الاجتماعي، أو سجل تجاري)",
              "دفتر العائلة (للمتزوجين)"
            ]
          },
          student: {
            name: "تأشيرة طالب (النوع D)",
            description: "للإقامات الطويلة التي تزيد عن 90 يوماً للدراسة في جامعة فرنسية أو مدرسة لغات.",
            processingTime: "15 - 45 يوماً",
            fee: "50 يورو (سعر مخفض لـ EEF) + رسوم TLScontact",
            requirements: [
              "جواز سفر ساري المفعول",
              "نموذج طلب تأشيرة إقامة طويلة",
              "شهادة 'الموافقة المسبقة' من Campus France أو Etudes en France (EEF)",
              "إثبات التسجيل في مؤسسة تعليمية فرنسية",
              "إثبات الموارد المالية (بحد أدنى 615 يورو شهرياً) عبر حساب مغلق أو كفيل",
              "إثبات إقامة في فرنسا لأول 3 أشهر على الأقل",
              "كشوف النقاط الأكاديمية السابقة والشهادات"
            ]
          }
        }
      },
      spain: {
        name: "إسبانيا (شنغن)",
        type: "شنغن (النوع C و D)",
        description: "خيار رائع لعطلات الصيف والزيارات العائلية. تتم معالجتها عبر BLS International.",
        visaTypes: {
          tourist: {
            name: "سياحة / زيارة عائلية (النوع C)",
            description: "تأشيرة إقامة قصيرة للسياحة أو زيارة العائلة في إسبانيا.",
            processingTime: "15 - 45 يوماً",
            fee: "90 يورو + رسوم BLS",
            requirements: [
              "جواز سفر ساري المفعول (يوصى بصلاحية 6 أشهر)",
              "نموذج طلب التأشيرة مكتمل بالإسبانية أو الفرنسية",
              "تأمين طبي للسفر (تغطية 30,000 يورو)",
              "حجز فندقي أو خطاب دعوة (Carta de Invitación من الشرطة الوطنية)",
              "مسار رحلة الطيران",
              "إثبات مالي (كشوفات بنكية لـ 3 أشهر)",
              "شهادة عمل وتاريخ CNSS",
              "نسخ من جميع تأشيرات شنغن السابقة"
            ]
          }
        }
      },
      canada: {
        name: "كندا",
        type: "تأشيرات زائر، دراسة، وعمل",
        description: "سواء كنت ترغب في الدراسة، العمل، أو الزيارة، نساعدك في التنقل عبر بوابة IRCC المعقدة.",
        visaTypes: {
          visitor: {
            name: "تأشيرة زائر (TRV)",
            description: "للسياحة، زيارة العائلة، أو رحلات العمل القصيرة إلى كندا.",
            processingTime: "30 - 90 يوماً",
            fee: "100 دولار كندي + 85 دولار بصمات",
            requirements: [
              "جواز سفر ساري المفعول",
              "صورة رقمية (مواصفات IRCC)",
              "إثبات الأموال (كشوفات بنكية، ملكية عقار، رسائل كفيل)",
              "رسالة توضيحية توضح الغرض من الرحلة",
              "إثبات الروابط بالوطن الأم (رسالة عمل، روابط عائلية، عقار)",
              "تاريخ السفر (تأشيرات سابقة)"
            ]
          },
          study: {
            name: "تصريح دراسة",
            description: "مطلوب للطلاب الدوليين للدراسة في مؤسسات تعليمية معتمدة (DLI) في كندا.",
            processingTime: "4 - 12 أسبوعاً",
            fee: "150 دولار كندي + 85 دولار بصمات",
            requirements: [
              "رسالة قبول من مؤسسة تعليمية كندية معتمدة (DLI)",
              "رسالة تصديق إقليمية (PAL) إذا لزم الأمر",
              "إثبات الدعم المالي (الرسوم الدراسية + 20,635 دولار كندي لنفقات المعيشة)",
              "رسالة توضيحية / خطة دراسية",
              "شهادة قبول كيبيك (CAQ) إذا كنت تدرس في كيبيك",
              "فحص طبي وشهادة شرطة (إذا لزم الأمر)"
            ]
          }
        }
      },
      usa: {
        name: "الولايات المتحدة",
        type: "تأشيرة سياحة B1/B2، طالب F1",
        description: "مساعدة خبراء في تعبئة نموذج DS-160 وإعداد دقيق للمقابلة الوهمية للسفارة الأمريكية.",
        visaTypes: {
          b1b2: {
            name: "تأشيرة سياحة وأعمال B1/B2",
            description: "تأشيرة لغير المهاجرين للأشخاص المسافرين إلى الولايات المتحدة مؤقتاً للعمل (B-1) أو للسياحة/العلاج الطبي (B-2).",
            processingTime: "يعتمد على موعد المقابلة (غالباً 1-6 أشهر)",
            fee: "185 دولار أمريكي",
            requirements: [
              "جواز سفر ساري المفعول (صالح لمدة 6 أشهر على الأقل بعد فترة الإقامة)",
              "صفحة تأكيد نموذج طلب التأشيرة DS-160",
              "صفحة تأكيد الموعد",
              "صورة تأشيرة أمريكية (2×2 بوصة، خلفية بيضاء، بدون نظارات)",
              "إثبات روابط قوية بالمغرب (عمل، عقار، عائلة)",
              "كشوفات بنكية وإثبات عمل",
              "مسار الرحلة أو خطاب دعوة (إذا لزم الأمر)"
            ]
          }
        }
      },
      uk: {
        name: "المملكة المتحدة",
        type: "زائر قياسي، طالب",
        description: "معالجة سلسة للطلبات عبر TLScontact للسياحة، الأعمال، والدراسة في المملكة المتحدة.",
        visaTypes: {
          visitor: {
            name: "تأشيرة زائر قياسي",
            description: "للسياحة، الأعمال، الدراسة (دورات تصل إلى 6 أشهر)، وأنشطة مسموح بها أخرى.",
            processingTime: "15 - 21 يوماً",
            fee: "115 جنيه إسترليني (حتى 6 أشهر)",
            requirements: [
              "جواز سفر ساري المفعول",
              "نموذج طلب إلكتروني عبر Gov.uk",
              "دليل مالي (كشوفات بنكية تظهر دخلاً ثابتاً ومدخرات)",
              "إثبات عمل (رسالة من صاحب العمل توضح الراتب، الدور، والإجازة المعتمدة)",
              "تفاصيل الإقامة في المملكة المتحدة",
              "مسار رحلة مفصل والتكاليف المقدرة"
            ]
          }
        }
      }
    }
  },
  fr: {
    common: {
      agencyName: "VisaPlus Berkane",
      home: "Accueil",
      about: "À Propos",
      services: "Services",
      contact: "Contact",
      applyNow: "Postuler",
      backToHome: "Retour à l'accueil",
      requirements: "Liste des documents",
      downloadPdf: "Télécharger PDF",
      noteReq: "Remarque : Les exigences de l'ambassade changent fréquemment. Cette liste sert de directive générale. Contactez-nous pour une évaluation exacte de votre profil.",
      visaSummary: "Résumé du Visa",
      processingTime: "Délai de traitement",
      visaType: "Type de Visa",
      officialFees: "Frais Officiels :"
    },
    countryData: {
      france: {
        name: "France (Schengen)",
        type: "Schengen (Type C & D)",
        description: "La destination Schengen la plus demandée depuis le Maroc. Idéal pour le tourisme, les affaires et les études (Campus France).",
        visaTypes: {
          tourist: {
            name: "Visa Touristique (Type C)",
            description: "Pour les courts séjours jusqu'à 90 jours pour le tourisme ou pour visiter famille/amis.",
            processingTime: "15 - 30 Jours",
            fee: "90 € + Frais TLScontact",
            requirements: [
              "Passeport valide (délivré dans les 10 dernières années, valide pour 3+ mois au-delà de la date de retour, 2+ pages vierges)",
              "Deux photos d'identité biométriques récentes (norme OACI, fond blanc)",
              "Formulaire de demande de visa Schengen, entièrement rempli et signé via France-Visas",
              "Assurance médicale de voyage (couverture minimale 30 000 €, valide pour tout l'espace Schengen)",
              "Preuve d'hébergement (réservation d'hôtel ou 'Attestation d'accueil')",
              "Réservation de vol aller-retour",
              "Preuve de moyens financiers (relevés bancaires des 3 derniers mois montrant min. 3000 MAD/jour)",
              "Preuve de statut socio-économique (attestation de travail, 3 dernières fiches de paie, inscription CNSS ou registre de commerce)",
              "Livret de famille pour les demandeurs mariés"
            ]
          },
          student: {
            name: "Visa Étudiant (Type D)",
            description: "Pour les longs séjours de plus de 90 jours pour étudier dans une université française ou une école de langue.",
            processingTime: "15 - 45 Jours",
            fee: "50 € (tarif réduit pour EEF) + Frais TLScontact",
            requirements: [
              "Passeport valide",
              "Formulaire de demande de visa de long séjour",
              "Certificat d'Accord préalable de Campus France ou Etudes en France (EEF)",
              "Preuve d'inscription dans un établissement d'enseignement français",
              "Preuve de ressources financières (minimum 615 € par mois) via un compte bloqué ou un garant",
              "Preuve d'hébergement en France pour au moins les 3 premiers mois",
              "Relevés de notes académiques précédents et diplômes"
            ]
          }
        }
      },
      spain: {
        name: "Espagne (Schengen)",
        type: "Schengen (Type C & D)",
        description: "Un choix de premier plan pour les vacances d'été et les visites familiales. Traité via BLS International.",
        visaTypes: {
          tourist: {
            name: "Tourisme / Visite Familiale (Type C)",
            description: "Visa de court séjour pour le tourisme ou pour visiter de la famille en Espagne.",
            processingTime: "15 - 45 Jours",
            fee: "90 € + Frais BLS",
            requirements: [
              "Passeport valide (validité de 6 mois recommandée)",
              "Formulaire de demande de visa rempli en espagnol ou en français",
              "Assurance médicale de voyage (couverture 30 000 €)",
              "Réservation d'hôtel ou lettre d'invitation (Carta de Invitación de la Policia Nacional)",
              "Itinéraire de vol",
              "Preuve financière (Relevés bancaires pour 3 mois)",
              "Attestation de travail & historique CNSS",
              "Copies de tous les visas Schengen précédents"
            ]
          }
        }
      },
      canada: {
        name: "Canada",
        type: "Visiteur, Études & Travail",
        description: "Que vous souhaitiez étudier, travailler ou visiter, nous vous aidons à naviguer sur le portail complexe d'IRCC.",
        visaTypes: {
          visitor: {
            name: "Visa de Visiteur (VRT)",
            description: "Pour le tourisme, les visites familiales ou de courts voyages d'affaires au Canada.",
            processingTime: "30 - 90 Jours",
            fee: "100 $ CAD + 85 $ Biométrie",
            requirements: [
              "Passeport valide",
              "Photo numérique (spécifications IRCC)",
              "Preuve de fonds (Relevés bancaires, propriété, lettres de garant)",
              "Lettre d'explication détaillant le but du voyage",
              "Preuve d'attaches au pays d'origine (lettre d'emploi, liens familiaux, propriété)",
              "Historique de voyage (visas précédents)"
            ]
          },
          study: {
            name: "Permis d'Études",
            description: "Requis pour les étudiants internationaux pour étudier dans des Établissements d'Enseignement Désignés (EED) au Canada.",
            processingTime: "4 - 12 Semaines",
            fee: "150 $ CAD + 85 $ Biométrie",
            requirements: [
              "Lettre d'acceptation d'un EED canadien",
              "Lettre d'Attestation Provinciale (PAL) si applicable",
              "Preuve de soutien financier (frais de scolarité + 20 635 $ CAD pour frais de subsistance)",
              "Lettre d'explication / Plan d'études",
              "CAQ (Certificat d'acceptation du Québec) si vous étudiez au Québec",
              "Examen médical et certificat de police (si requis)"
            ]
          }
        }
      },
      usa: {
        name: "États-Unis",
        type: "B1/B2 Tourisme, F1 Étudiant",
        description: "Assistance experte avec le formulaire DS-160 et préparation rigoureuse aux entretiens pour l'Ambassade des États-Unis.",
        visaTypes: {
          b1b2: {
            name: "B1/B2 Tourisme & Affaires",
            description: "Visa non-immigrant pour les personnes se rendant aux États-Unis temporairement pour les affaires (B-1) ou pour le plaisir/traitement médical (B-2).",
            processingTime: "Dépend de la date d'entretien (souvent 1-6 mois)",
            fee: "185 $ USD",
            requirements: [
              "Passeport valide (valide pendant au moins 6 mois au-delà de la période de séjour)",
              "Page de confirmation de la demande de visa non-immigrant DS-160",
              "Page de confirmation de rendez-vous",
              "Photo de visa américain (2x2 pouces, fond blanc, sans lunettes)",
              "Preuve d'attaches fortes au Maroc (emploi, propriété, famille)",
              "Relevés bancaires & preuve d'emploi",
              "Itinéraire de voyage ou lettre d'invitation (si applicable)"
            ]
          }
        }
      },
      uk: {
        name: "Royaume-Uni",
        type: "Visiteur Standard, Étudiant",
        description: "Traitement transparent des demandes via TLScontact pour le tourisme, les affaires et les études au Royaume-Uni.",
        visaTypes: {
          visitor: {
            name: "Visa Visiteur Standard",
            description: "Pour le tourisme, les affaires, les études (cours jusqu'à 6 mois) et d'autres activités autorisées.",
            processingTime: "15 - 21 Jours",
            fee: "115 £ GBP (jusqu'à 6 mois)",
            requirements: [
              "Passeport valide",
              "Formulaire de demande en ligne via Gov.uk",
              "Preuve financière (Relevés bancaires montrant un revenu et des économies constants)",
              "Preuve d'emploi (lettre de l'employeur indiquant le salaire, le rôle et le congé approuvé)",
              "Détails de l'hébergement au Royaume-Uni",
              "Itinéraire de voyage détaillé et coûts estimés"
            ]
          }
        }
      }
    }
  }
};

locales.forEach(loc => {
  const filePath = path.join(__dirname, `../src/locales/${loc}/translation.json`);
  if (fs.existsSync(filePath)) {
    const fileData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Merge deeply
    if(!fileData.common) fileData.common = {};
    Object.assign(fileData.common, data[loc].common);
    
    if(!fileData.countryData) fileData.countryData = {};
    Object.assign(fileData.countryData, data[loc].countryData);
    
    fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2));
    console.log(`Updated ${loc}`);
  }
});
