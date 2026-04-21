import express, { type Request, type Response } from 'express'
import { authenticate, requireAdmin } from './auth.js'

const router = express.Router()

// Mock Database
const applications = [  {
    id: "APP-2024-001",
    client: "Ahmed M.",
    clientId: "1",
    destination: "France",
    type: "Tourist",
    status: "Review",
    days: 3,
    progress: 60
  },
  {
    id: "APP-2024-002",
    client: "Fatima Z.",
    clientId: "2",
    destination: "Canada",
    type: "Student",
    status: "Review",
    days: 1,
    progress: 40
  },
  {
    id: "APP-2024-003",
    client: "Youssef B.",
    clientId: "3",
    destination: "Spain",
    type: "Work",
    status: "Submitted",
    days: 12,
    progress: 90
  }
]

router.get('/', authenticate, requireAdmin, (req: Request, res: Response) => {
  res.json({
    success: true,
    data: applications
  })
})

router.get('/client/:clientId', authenticate, (req: Request, res: Response) => {
  // If not admin, they can only request their own applications
  if (req.user?.role === 'CLIENT' && req.user.id !== req.params.clientId) {
    return res.status(403).json({ success: false, error: 'Forbidden' })
  }

  const { clientId } = req.params
  // Since we use mock data and user IDs are now generated UUIDs,
  // we just return the mock data for demonstration if they don't match the mock client IDs exactly.
  const clientApps = applications.filter(app => app.clientId === clientId)
  res.json({
    success: true,
    data: clientApps.length > 0 ? clientApps : applications.slice(0, 1) // Fallback to 1 app for demo
  })
})

export default router
