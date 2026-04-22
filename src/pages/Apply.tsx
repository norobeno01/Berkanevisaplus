import { useState } from 'react'
import { motion } from 'framer-motion'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isBefore, startOfDay, getDay } from 'date-fns'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, User, Mail, Phone, Plane, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useTranslation } from 'react-i18next'
import { servicesData } from '@/data/services'

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
]

const visaTypes = [
  "Schengen Tourist Visa",
  "Schengen Student Visa",
  "Canada Express Entry",
  "Canada Study Permit",
  "Family Reunification",
  "General Consultation"
]

export default function Apply() {
  const { t } = useTranslation()
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()))
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    visaType: '',
    serviceType: '',
    notes: ''
  })
  
  const [step, setStep] = useState<'form' | 'otp' | 'success'>('form')
  const [otpCode, setOtpCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Calendar logic
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  })

  // Calculate empty cells for the start of the month (0 = Sunday, 1 = Monday...)
  const startDay = getDay(startOfMonth(currentMonth))
  const emptyDays = Array.from({ length: startDay }, (_, i) => i)

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))

  const handleDateSelect = (day: Date) => {
    // Prevent selecting past dates or weekends
    if (isBefore(day, startOfDay(new Date())) || getDay(day) === 0 || getDay(day) === 6) return
    setSelectedDate(day)
    setSelectedTime(null) // reset time when date changes
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime) return
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/appointments/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone })
      })
      const data = await res.json() as any
      if (!res.ok) throw new Error(data.error || 'Failed to send OTP')
      
      // In Dev mode, we could log the OTP here or pre-fill it for testing
      console.log('Dev OTP:', data.devCode)
      setStep('otp')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/appointments/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          date: selectedDate, 
          time: selectedTime,
          code: otpCode
        })
      })
      const data = await res.json() as any
      if (!res.ok) throw new Error(data.error || 'Failed to verify OTP')
      
      setStep('success')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (step === 'success') {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md z-10">
          <Card className="glass-panel border-border text-center py-12">
            <CardContent className="space-y-6">
              <div className="mx-auto w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                <CheckCircle2 className="h-10 w-10 text-green-400" />
              </div>
              <h2 className="text-3xl font-display font-bold text-foreground">{t('apply.successTitle')}</h2>
              <p className="text-muted-foreground">
                {t('apply.successDesc')} {formData.firstName}. Your consultation for <strong className="text-foreground">{formData.visaType}</strong> is scheduled for <strong className="text-primary">{selectedDate && format(selectedDate, 'MMMM d, yyyy')}</strong> at <strong className="text-primary">{selectedTime}</strong>.
              </p>
              <p className="text-sm text-muted-foreground">We've sent a confirmation WhatsApp to {formData.phone} with your appointment details and your Client Portal login credentials.</p>
              <Button onClick={() => window.location.href = '/'} className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground w-full">
                {t('apply.returnHome')}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  if (step === 'otp') {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md z-10">
          <Card className="glass-panel border-border text-center py-12">
            <CardContent className="space-y-6">
              <h2 className="text-3xl font-display font-bold text-foreground">Verify Phone Number</h2>
              <p className="text-muted-foreground">
                We've sent a 6-digit verification code to your WhatsApp number <strong>{formData.phone}</strong>.
              </p>
              <form onSubmit={handleVerifyOTP} className="space-y-4 pt-4">
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <Input 
                  type="text" 
                  maxLength={6}
                  required 
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="bg-card border-border text-foreground text-center tracking-[1em] font-mono text-2xl h-14" 
                  placeholder="••••••" 
                />
                <Button type="submit" disabled={loading || otpCode.length !== 6} className="bg-primary hover:bg-primary/90 text-primary-foreground w-full h-12">
                  {loading ? 'Verifying...' : 'Verify & Confirm Booking'}
                </Button>
                <Button type="button" variant="ghost" onClick={() => setStep('form')} className="text-muted-foreground hover:text-foreground">
                  Back to form
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 px-4 bg-background relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gold-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container max-w-6xl relative z-10">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">{t('apply.title')}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{t('apply.subtitle')}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Calendar & Time Selection Column */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="glass-panel border-border shadow-2xl">
              <CardHeader className="pb-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-display text-foreground flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-primary" /> {t('apply.selectDate')}
                  </CardTitle>
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={handlePrevMonth} className="text-muted-foreground hover:text-foreground hover:bg-foreground/5">
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <span className="font-medium text-foreground min-w-[120px] text-center">
                      {format(currentMonth, 'MMMM yyyy')}
                    </span>
                    <Button variant="ghost" size="icon" onClick={handleNextMonth} className="text-muted-foreground hover:text-foreground hover:bg-foreground/5">
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-7 gap-2 text-center mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{day}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {emptyDays.map(empty => (
                    <div key={`empty-${empty}`} className="h-12 rounded-lg" />
                  ))}
                  {daysInMonth.map(day => {
                    const isPast = isBefore(day, startOfDay(new Date()))
                    const isWeekend = getDay(day) === 0 || getDay(day) === 6
                    const disabled = isPast || isWeekend
                    const isSelected = selectedDate && isSameDay(day, selectedDate)
                    const isCurrentDay = isToday(day)

                    return (
                      <motion.button
                        key={day.toString()}
                        whileHover={!disabled ? { scale: 1.05 } : {}}
                        whileTap={!disabled ? { scale: 0.95 } : {}}
                        onClick={() => handleDateSelect(day)}
                        disabled={disabled}
                        className={`
                          h-12 rounded-lg flex items-center justify-center text-sm font-medium transition-colors
                          ${disabled ? 'text-muted-foreground cursor-not-allowed' : 'text-foreground hover:bg-foreground/5 cursor-pointer'}
                          ${isSelected ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(37,99,235,0.5)]' : ''}
                          ${isCurrentDay && !isSelected ? 'border border-primary/50 text-primary' : ''}
                        `}
                      >
                        {format(day, 'd')}
                      </motion.button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Time Slots (Shows only if date is selected) */}
            <motion.div
              initial={false}
              animate={{ opacity: selectedDate ? 1 : 0.5, height: 'auto' }}
              className={`transition-all duration-300 ${!selectedDate && 'pointer-events-none'}`}
            >
              <Card className="glass-panel border-border shadow-2xl">
                <CardHeader className="pb-4 border-b border-border">
                  <CardTitle className="text-xl font-display text-foreground flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" /> {t('apply.selectTime')}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {selectedDate ? `Available slots for ${format(selectedDate, 'EEEE, MMMM d')}` : 'Please select a date first'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {timeSlots.map(time => (
                      <Button
                        key={time}
                        type="button"
                        variant="outline"
                        onClick={() => setSelectedTime(time)}
                        className={`
                          h-12 border-border glass hover:bg-primary/20 hover:text-primary-foreground transition-all
                          ${selectedTime === time ? 'bg-primary border-primary text-primary-foreground shadow-[0_0_15px_rgba(37,99,235,0.3)]' : 'text-muted-foreground'}
                        `}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Application Form Column */}
          <div className="lg:col-span-2">
            <Card className="glass-panel border-border shadow-2xl h-full">
              <CardHeader className="pb-4 border-b border-border">
                <CardTitle className="text-xl font-display text-foreground">{t('apply.yourDetails')}</CardTitle>
                <CardDescription className="text-muted-foreground">{t('apply.subtitle')}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground flex items-center gap-2"><User className="h-3 w-3"/> {t('apply.firstName')}</label>
                      <Input required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="bg-card border-border text-foreground" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground">{t('apply.lastName')}</label>
                      <Input required value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="bg-card border-border text-foreground" placeholder="Doe" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground flex items-center gap-2"><Mail className="h-3 w-3"/> {t('apply.email')}</label>
                    <Input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="bg-card border-border text-foreground" placeholder="john@example.com" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground flex items-center gap-2"><Phone className="h-3 w-3"/> {t('apply.phone')}</label>
                    <Input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="bg-card border-border text-foreground" placeholder="+212 600 000 000" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground flex items-center gap-2"><Plane className="h-3 w-3"/> {t('apply.visaType')}</label>
                    <select 
                      required
                      value={formData.visaType}
                      onChange={e => setFormData({...formData, visaType: e.target.value})}
                      className="flex h-10 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="" disabled>Select a visa type...</option>
                      {visaTypes.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground flex items-center gap-2"><User className="h-3 w-3"/> {t('apply.serviceType', 'Service Needed')}</label>
                    <select 
                      required
                      value={formData.serviceType}
                      onChange={e => setFormData({...formData, serviceType: e.target.value})}
                      className="flex h-10 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="" disabled>{t('apply.selectService', 'Select a service...')}</option>
                      {servicesData.map(service => <option key={service.id} value={service.title}>{service.title}</option>)}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">{t('apply.notes')}</label>
                    <textarea 
                      value={formData.notes}
                      onChange={e => setFormData({...formData, notes: e.target.value})}
                      className="flex min-h-[80px] w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Briefly describe your situation..."
                    />
                  </div>

                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      disabled={!selectedDate || !selectedTime}
                      className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-[0_0_20px_rgba(37,99,235,0.4)] disabled:shadow-none transition-all"
                    >
                      {(!selectedDate || !selectedTime) ? t('apply.selectFirst') : t('apply.confirmBtn')}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
