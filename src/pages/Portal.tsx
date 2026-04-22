import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { FileText, Upload, Clock, CheckCircle, AlertCircle, File, MoreVertical, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'

interface Application {
  id: string;
  destination: string;
  type: string;
  status: string;
  progress: number;
}

export default function Portal() {
  const { t } = useTranslation()
  const { user, token } = useAuthStore()
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    
    fetch(`/api/applications/client/${user.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json() as any)
      .then(data => {
        if (data.success) setApplications(data.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [user, token])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl font-display font-bold tracking-tight text-foreground">{t('portal.welcome')}, {user?.name.split(' ')[0]}!</h1>
          <p className="text-muted-foreground mt-2">{t('portal.manageApps')}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_15px_rgba(37,99,235,0.3)]">
            <FileText className="h-5 w-5" />
            {t('portal.newApplication')}
          </Button>
        </motion.div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content - Applications */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-display font-bold text-foreground">{t('portal.myApplications')}</h2>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">View All</Button>
          </div>
          
          <div className="space-y-6">
            {applications.map((app, idx) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="glass-card border-border hover:border-border transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle className="text-2xl font-display text-foreground">{app.destination}</CardTitle>
                      <CardDescription className="text-muted-foreground mt-1">{app.id} • {app.type} Visa</CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-gold-500/20 text-gold-400 border border-gold-500/30">
                      Under Review
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="mt-6 space-y-6">
                      
                      {/* Timeline visualization */}
                      <div className="relative">
                        <div className="flex justify-between mb-2">
                          <span className="text-xs text-primary font-medium">Submitted</span>
                          <span className="text-xs text-primary font-medium">Under Review</span>
                          <span className="text-xs text-muted-foreground">Embassy Filed</span>
                          <span className="text-xs text-muted-foreground">Decision</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-gold-500 transition-all duration-1000 ease-in-out relative" 
                            style={{ width: `${app.progress}%` }}
                          >
                            <div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[move_1s_linear_infinite]" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-6 border-t border-border flex flex-col sm:flex-row gap-4">
                        <Button className="w-full sm:w-auto gap-2 bg-muted hover:bg-navy-700 text-foreground border border-border">
                          <Upload className="h-4 w-4" /> Upload Documents
                        </Button>
                        <Button variant="ghost" className="w-full sm:w-auto text-muted-foreground hover:text-foreground">
                          View Timeline
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Document Center Preview */}
          <div className="pt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold text-foreground">Recent Documents</h2>
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">Document Vault</Button>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <Card className="glass border-border p-4 flex items-center gap-4 hover:bg-foreground/5 cursor-pointer transition-colors">
                <div className="p-3 rounded-lg bg-muted text-gold-400">
                  <File className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">Passport_Scan.pdf</p>
                  <p className="text-xs text-green-400">Verified</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </Card>

              <Card className="glass border-border p-4 flex items-center gap-4 hover:bg-foreground/5 cursor-pointer transition-colors border-l-4 border-l-amber-500">
                <div className="p-3 rounded-lg bg-muted text-muted-foreground">
                  <File className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">Bank_Statement.pdf</p>
                  <p className="text-xs text-amber-500">Action Required</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </Card>
            </div>
          </div>
        </div>

        {/* Sidebar - Quick Actions & Notifications */}
        <div className="space-y-8">
          <Card className="glass-panel border-border relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] rounded-full" />
            <CardHeader>
              <CardTitle className="text-xl font-display text-foreground">Next Appointment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-muted border border-border min-w-[4rem]">
                  <span className="text-xs text-gold-400 font-medium uppercase">Mar</span>
                  <span className="text-2xl font-bold text-foreground">24</span>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-foreground">VFS Global Rabat</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" /> 09:30 AM
                  </p>
                  <Badge variant="outline" className="mt-2 text-xs border-primary/50 text-primary">Biometrics</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel border-border">
            <CardHeader>
              <CardTitle className="text-xl font-display text-foreground">Action Required</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3 items-start p-4 bg-amber-500/10 text-amber-200 rounded-xl border border-amber-500/20 backdrop-blur-sm">
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-amber-400" />
                <div className="space-y-1.5">
                  <p className="text-sm font-semibold text-amber-400">Bank Statement Update</p>
                  <p className="text-xs opacity-90 leading-relaxed">Your previous bank statement was incomplete. Please upload a full 3-month history for France application.</p>
                  <Button size="sm" className="mt-2 h-8 text-xs bg-amber-500 hover:bg-amber-600 text-background font-bold">
                    Upload Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel border-border">
            <CardHeader>
              <CardTitle className="text-xl font-display text-foreground">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-foreground/5">
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full border border-background bg-green-500 text-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <CheckCircle className="h-3 w-3" />
                  </div>
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-xl border border-border bg-foreground/5 backdrop-blur-sm text-sm">
                    <p className="font-medium text-foreground">Passport Copy Verified</p>
                    <time className="text-xs text-muted-foreground mt-1 block">Mar 16, 2024</time>
                  </div>
                </div>
                
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full border border-background bg-primary text-primary-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <Clock className="h-3 w-3" />
                  </div>
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-xl border border-border bg-foreground/5 backdrop-blur-sm text-sm">
                    <p className="font-medium text-foreground">Application Submitted</p>
                    <time className="text-xs text-muted-foreground mt-1 block">Mar 15, 2024</time>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
