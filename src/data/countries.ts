export interface VisaType {
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
  type: string; // for the homepage bento grid
  description: string;
  visaTypes: VisaType[];
}

export const countriesData: CountryData[] = [
  {
    id: "france",
    name: "France (Schengen)",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1000&q=80",
    type: "Schengen (Type C & D)",
    description: "The most requested Schengen destination from Morocco. Ideal for tourism, business, and study (Campus France).",
    visaTypes: [
      {
        id: "tourist",
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
      {
        id: "student",
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
    ]
  },
  {
    id: "spain",
    name: "Spain (Schengen)",
    image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1000&q=80",
    type: "Schengen (Type C & D)",
    description: "A top choice for summer holidays and family visits. Processed via BLS International.",
    visaTypes: [
      {
        id: "tourist",
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
    ]
  },
  {
    id: "canada",
    name: "Canada",
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1000&q=80",
    type: "Visitor, Study & Work Permits",
    description: "Whether you want to study, work, or visit, we help you navigate the complex IRCC portal.",
    visaTypes: [
      {
        id: "visitor",
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
      {
        id: "study",
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
    ]
  },
  {
    id: "usa",
    name: "United States",
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=1000&q=80",
    type: "B1/B2 Tourist, F1 Student",
    description: "Expert assistance with the DS-160 form and rigorous mock interview preparation for the US Embassy.",
    visaTypes: [
      {
        id: "b1b2",
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
    ]
  },
  {
    id: "uk",
    name: "United Kingdom",
    image: "https://images.unsplash.com/photo-1735475458425-3f58c48170ad?auto=format&fit=crop&w=1000&q=80",
    type: "Standard Visitor, Student",
    description: "Seamless application processing via TLScontact for tourism, business, and study in the UK.",
    visaTypes: [
      {
        id: "visitor",
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
    ]
  }
]
