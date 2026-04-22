import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Bot, User, Minimize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTranslation } from 'react-i18next'

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

export default function Chatbot() {
  const { t, i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: t('chatbot.greeting', "Hi! I'm your E-Visa Schengen virtual assistant. How can I help you today?"),
      isBot: true,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen, isTyping])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage.text,
          lang: i18n.language || 'en'
        })
      })
      const data = await response.json() as any
      
      if (data.success) {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          text: data.reply,
          isBot: true,
          timestamp: new Date()
        }])
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: t('chatbot.error', "I'm having trouble connecting right now. Please try again later."),
        isBot: true,
        timestamp: new Date()
      }])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center justify-center p-0"
            >
              <MessageSquare className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-6rem)] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary px-4 py-3 flex items-center justify-between shadow-md relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center border border-border">
                  <Bot className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm">{t('chatbot.title', 'E-Visa Schengen Assistant')}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    {t('chatbot.online', 'Online')}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground hover:bg-foreground/5 h-8 w-8 rounded-full">
                  <Minimize2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50 custom-scrollbar">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex max-w-[85%] gap-2 ${msg.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-1 ${msg.isBot ? 'bg-primary/20 text-primary' : 'bg-foreground/5 text-foreground'}`}>
                      {msg.isBot ? <Bot className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.isBot 
                        ? 'bg-muted border border-border text-muted-foreground rounded-tl-none' 
                        : 'bg-primary text-primary-foreground rounded-tr-none shadow-lg'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="flex max-w-[85%] gap-2 flex-row">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center mt-1">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                    <div className="p-4 rounded-2xl bg-muted border border-border rounded-tl-none flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-foreground/5 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-foreground/5 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-foreground/5 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-card border-t border-border">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={t('chatbot.placeholder', 'Type your message...')}
                  className="flex-1 bg-background border-border text-foreground h-10 rounded-full px-4 focus-visible:ring-1 focus-visible:ring-primary"
                />
                <Button 
                  type="submit" 
                  disabled={!inputValue.trim() || isTyping}
                  className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shrink-0 p-0"
                >
                  <Send className="h-4 w-4 ml-0.5" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}