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
  type: string;
  description: string;
  visaTypes: VisaType[];
}

export const countriesData: CountryData[] = [
  {
    id: "france",
    name: "France",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1000&q=80",
    type: "Tourist, Study & Work Visas",
    description: "Top Schengen destination from Morocco for tourism, business, and Campus France.",
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
  },
  {
    id: "spain",
    name: "Spain",
    image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1000&q=80",
    type: "Tourist, Study & Work Visas",
    description: "Popular for summer holidays and family visits. Processed via BLS International.",
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
  },
  {
    id: "canada",
    name: "Canada",
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1000&q=80",
    type: "Tourist, Study & Work Visas",
    description: "Navigating the complex IRCC portal for Visitor, Study, and Work permits.",
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
  },
  {
    id: "usa",
    name: "United States",
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=1000&q=80",
    type: "Tourist, Study & Work Visas",
    description: "Expert assistance with DS-160 and mock interview preparation.",
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
  },
  {
    id: "uk",
    name: "United Kingdom",
    image: "https://images.unsplash.com/photo-1735475458425-3f58c48170ad?auto=format&fit=crop&w=1000&q=80",
    type: "Tourist, Study & Work Visas",
    description: "Seamless application processing via TLScontact for UK Visas.",
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
  },
  {
    id: "germany",
    name: "Germany",
    image: "https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&w=1000&q=80",
    type: "Tourist, Study & Work Visas",
    description: "Leading European economy with strong opportunities for skilled workers.",
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
  },
  {
    id: "italy",
    name: "Italy",
    image: "https://images.unsplash.com/photo-1516483638261-f40af5a52233?auto=format&fit=crop&w=1000&q=80",
    type: "Tourist, Study & Work Visas",
    description: "Rich cultural heritage and popular Schengen destination.",
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
  },
  {
    id: "netherlands",
    name: "Netherlands",
    image: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1000&q=80",
    type: "Tourist, Study & Work Visas",
    description: "Innovative economy with streamlined highly skilled migrant visas.",
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
  },
  {
    id: "switzerland",
    name: "Switzerland",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1000&q=80",
    type: "Tourist, Study & Work Visas",
    description: "High quality of life and premium tourism destination.",
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
  },
  {
    id: "belgium",
    name: "Belgium",
    image: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?auto=format&fit=crop&w=1000&q=80",
    type: "Tourist, Study & Work Visas",
    description: "Heart of Europe, excellent for business and study.",
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
  },
  {
    id: "australia",
    name: "Australia",
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1000&q=80",
    type: "Tourist, Study & Work Visas",
    description: "World-class education and points-based immigration system.",
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
  },
  {
    id: "uae",
    name: "United Arab Emirates",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80",
    type: "Tourist, Study & Work Visas",
    description: "Fast-tracked e-visas and Golden Visa opportunities.",
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
  },
  {
    id: "saudiarabia",
    name: "Saudi Arabia",
    image: "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=1000&q=80",
    type: "Tourist, Study & Work Visas",
    description: "Umrah, business, and the new rapid e-Visa system.",
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
  },
  {
    id: "turkey",
    name: "Turkey",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1000&q=80",
    type: "Tourist, Study & Work Visas",
    description: "Bridge between Europe and Asia with easy e-Visa access.",
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
  },
  {
    id: "japan",
    name: "Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80",
    type: "Tourist, Study & Work Visas",
    description: "Unique culture with rising demand for international workers.",
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
  },
  {
    id: "china",
    name: "China",
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1000&q=80",
    type: "Tourist, Study & Work Visas",
    description: "Global business hub and massive educational opportunities.",
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
  },
  {
    id: "southkorea",
    name: "South Korea",
    image: "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=1000&q=80",
    type: "Tourist, Study & Work Visas",
    description: "K-ETA support and vibrant student visa pathways.",
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
  },
  {
    id: "singapore",
    name: "Singapore",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1000&q=80",
    type: "Tourist, Study & Work Visas",
    description: "Premier Asian business hub with streamlined work passes.",
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
  },
  {
    id: "newzealand",
    name: "New Zealand",
    image: "https://images.unsplash.com/photo-1469521669194-babbdf9aa987?auto=format&fit=crop&w=1000&q=80",
    type: "Tourist, Study & Work Visas",
    description: "Stunning landscapes and welcoming skilled migrant policies.",
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
  },
  {
    id: "sweden",
    name: "Sweden",
    image: "https://images.unsplash.com/photo-1509356843151-38319e6231d6?auto=format&fit=crop&w=1000&q=80",
    type: "Tourist, Study & Work Visas",
    description: "Scandinavian innovation with excellent work-life balance.",
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
  },
  {
    id: "qatar",
    name: "Qatar",
    image: "https://images.unsplash.com/photo-1538045698727-ac45d4365100?auto=format&fit=crop&w=1000&q=80",
    type: "Tourist, Study & Work Visas",
    description: "Rapidly growing Gulf state with Hayya card facilitation.",
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
  }
];
