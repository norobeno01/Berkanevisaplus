import express, { type Request, type Response } from 'express'
import { knowledgeBase } from '../data/chatbotKnowledge.js'

const router = express.Router()

// Advanced Keyword-based Mock Chatbot
router.post('/', async (req: Request, res: Response) => {
  try {
    const { message, lang = 'en' } = req.body
    
    if (!message) {
      return res.status(400).json({ success: false, error: 'Message is required' })
    }

    const text = message.toLowerCase()
    
    // Default fallback responses based on language
    const fallbackResponses: Record<string, string> = {
      en: "I'm your VisaPlus virtual assistant. For specific inquiries, I recommend booking a free consultation on our Apply page, or you can ask me another question about Schengen, Canada, US, or UK visas!",
      fr: "Je suis votre assistant virtuel VisaPlus. Pour des questions spécifiques, je vous recommande de réserver une consultation gratuite sur notre page Postuler, ou posez-moi une autre question sur les visas Schengen, Canada, USA, ou UK !",
      ar: "أنا مساعدك الافتراضي من VisaPlus. للاستفسارات المحددة، أوصي بحجز استشارة مجانية في صفحة التقديم، أو يمكنك سؤالي سؤالاً آخر حول تأشيرات شنغن، كندا، أمريكا، أو بريطانيا!",
      es: "Soy su asistente virtual de VisaPlus. Para consultas específicas, le recomiendo reservar una consulta gratuita en nuestra página de Aplicación, ¡o puede hacerme otra pregunta sobre visas Schengen, Canadá, EE.UU. o Reino Unido!"
    }

    let response = fallbackResponses[lang] || fallbackResponses['en']
    let highestMatchScore = 0

    // Matching Algorithm
    for (const kb of knowledgeBase) {
      let matchCount = 0
      for (const keyword of kb.keywords) {
        if (text.includes(keyword)) {
          matchCount++
        }
      }

      // If we found matches, and it's better than our previous best match
      if (matchCount > 0 && matchCount > highestMatchScore) {
        highestMatchScore = matchCount
        // Safely access the requested language, fallback to English if not found
        response = (kb.responses as any)[lang] || kb.responses['en']
      }
    }

    // Simulate human typing delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 800))

    res.json({ success: true, reply: response })
  } catch (error) {
    console.error("Chatbot error:", error)
    res.status(500).json({ success: false, error: 'Chatbot encountered an error' })
  }
})

export default router