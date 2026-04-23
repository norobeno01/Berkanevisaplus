import { Hono } from 'hono'

// Simple mock chatbot handler for the edge since we just echo mock data in this demo
const router = new Hono()

const KNOWLEDGE_BASE = [
  { keywords: ['schengen', 'europe', 'france', 'spain'], response: 'For Schengen visas, you typically need a valid passport, travel insurance, proof of accommodation, and financial means. Processing takes 15-30 days.' },
  { keywords: ['price', 'cost', 'fee', 'how much'], response: 'Our service fees start at €50 for basic consultation. Full application processing ranges from €100-€300 depending on the destination.' },
  { keywords: ['canada', 'express entry'], response: 'Canadian visas require comprehensive documentation. We assist with Express Entry, Study Permits, and Visitor Visas. Processing times vary significantly.' },
  { keywords: ['time', 'how long', 'duration'], response: 'Processing times vary by embassy. Schengen is usually 2-4 weeks, USA can be several months for appointments, and Canada takes 1-3 months.' },
  { keywords: ['hello', 'hi', 'hey'], response: 'Hello! I am the E-Visa Schengen AI assistant. How can I help you with your visa or immigration questions today?' },
  { keywords: ['contact', 'phone', 'address', 'where'], response: 'You can reach us at evisaschengen@gmail.com or call +2126600490490. Our office is located in Berkane, Morocco.' }
]

router.post('/', async (c) => {
  try {
    const { message } = await c.req.json()
    if (!message) return c.json({ success: false, error: 'Message is required' }, 400)

    const userMessage = message.toLowerCase()
    let response = "I'm not sure I understand. Could you rephrase your question about visas, pricing, or specific countries?"

    for (const entry of KNOWLEDGE_BASE) {
      if (entry.keywords.some(kw => userMessage.includes(kw))) {
        response = entry.response
        break
      }
    }

    // Simulate thinking delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return c.json({ success: true, response })
  } catch (error) {
    return c.json({ success: false, error: 'Chatbot error' }, 500)
  }
})

export default router