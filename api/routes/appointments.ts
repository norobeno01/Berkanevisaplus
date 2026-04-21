import express, { type Request, type Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const router = express.Router()
const prisma = new PrismaClient()

// Simulate sending WhatsApp OTP
router.post('/request-otp', async (req: Request, res: Response) => {
  try {
    const { phone } = req.body
    if (!phone) return res.status(400).json({ success: false, error: 'Phone is required' })

    // Generate 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    
    // Save to DB
    await prisma.otpVerification.upsert({
      where: { phone },
      update: { code, expiresAt: new Date(Date.now() + 10 * 60 * 1000), verified: false },
      create: { phone, code, expiresAt: new Date(Date.now() + 10 * 60 * 1000) }
    })

    // Simulated WhatsApp Message log
    console.log(`\n========================================`)
    console.log(`📱 [WHATSAPP API MOCK] To: ${phone}`)
    console.log(`Your VisaPlus verification code is: ${code}`)
    console.log(`========================================\n`)

    // We return the code in dev environment to make it easier for testing
    res.json({ success: true, message: 'OTP sent via WhatsApp', devCode: code })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to request OTP' })
  }
})

// Verify OTP and Confirm Appointment
router.post('/confirm', async (req: Request, res: Response) => {
  try {
    const { phone, code, firstName, lastName, email, visaType, serviceType, date, time, notes } = req.body

    // 1. Verify OTP
    const otpRecord = await prisma.otpVerification.findUnique({ where: { phone } })
    
    if (!otpRecord || otpRecord.code !== code) {
      return res.status(400).json({ success: false, error: 'Invalid verification code' })
    }
    
    if (new Date() > otpRecord.expiresAt) {
      return res.status(400).json({ success: false, error: 'Verification code has expired' })
    }

    // Mark as verified
    await prisma.otpVerification.update({
      where: { phone },
      data: { verified: true }
    })

    // 2. Check if user exists, if not create account
    let user = await prisma.user.findUnique({ where: { email } })
    let newPassword = null

    if (!user) {
      // Auto generate a secure 8-character password
      newPassword = Math.random().toString(36).slice(-8)
      const hashedPassword = await bcrypt.hash(newPassword, 10)
      
      user = await prisma.user.create({
        data: {
          email,
          phone,
          name: `${firstName} ${lastName}`,
          password: hashedPassword,
          role: 'CLIENT'
        }
      })
    }

    // 3. Create Appointment
    const appointment = await prisma.appointment.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        visaType,
        serviceType,
        date: new Date(date),
        time,
        notes,
        status: 'Confirmed',
        clientId: user.id
      }
    })

    // 4. Simulate WhatsApp Confirmation Message
    console.log(`\n========================================`)
    console.log(`📱 [WHATSAPP API MOCK] To: ${phone}`)
    console.log(`✅ APPOINTMENT CONFIRMED!`)
    console.log(`Hello ${firstName}, your consultation for ${visaType} is confirmed for ${new Date(date).toDateString()} at ${time}.`)
    
    if (newPassword) {
      console.log(`\n🔐 ACCOUNT CREATED!`)
      console.log(`We have created a client portal account for you to track your application.`)
      console.log(`Login URL: https://visaplus.com/login`)
      console.log(`Email: ${email}`)
      console.log(`Password: ${newPassword}`)
    }
    console.log(`========================================\n`)

    res.json({ success: true, data: appointment })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error: 'Failed to confirm appointment' })
  }
})

export default router