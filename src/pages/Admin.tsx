import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { 
  Users, FileCheck, Calendar, Activity, Search, LayoutDashboard, Settings, Mail, CreditCard, ChevronRight, 
  PenTool, Save, Plus, Trash, Image as ImageIcon, Link as LinkIcon, Bold, Italic, List, FolderOpen, MessageSquare, Wallet,
  Download, Clock, AlertCircle, FileText, CheckCircle2, XCircle, Send, LineChart, Globe, RefreshCcw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useEffect, useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import ReactMarkdown from 'react-markdown'
import { blogPosts as initialBlogPosts } from '@/data/blog'

import { useAuthStore } from '@/store/authStore'

interface Application {
  id: string;
  client: string;
  destination: string;
  type: string;
  status: string;
  days: number;
}

const chartData = [
  { name: 'Jan', apps: 20 },
  { name: 'Feb', apps: 35 },
  { name: 'Mar', apps: 30 },
  { name: 'Apr', apps: 50 },
  { name: 'May', apps: 65 },
  { name: 'Jun', apps: 55 },
  { name: 'Jul', apps: 85 },
];

const mockClients = [
  { id: 'C-001', name: 'Ahmed M.', email: 'ahmed@example.com', phone: '+212 600 112233', apps: 1, status: 'Active' },
  { id: 'C-002', name: 'Fatima Z.', email: 'fatima@example.com', phone: '+212 600 445566', apps: 2, status: 'VIP' },
  { id: 'C-003', name: 'Youssef B.', email: 'youssef@example.com', phone: '+212 600 778899', apps: 1, status: 'Completed' },
  { id: 'C-004', name: 'Hassan R.', email: 'hassan@example.com', phone: '+212 600 998877', apps: 3, status: 'Active' },
  { id: 'C-005', name: 'Nadia S.', email: 'nadia@example.com', phone: '+212 600 334455', apps: 1, status: 'Lead' },
];

const mockDocuments = [
  { id: 'DOC-101', client: 'Ahmed M.', type: 'Passport', file: 'Passport_Scan.pdf', date: '2024-03-24', status: 'Pending' },
  { id: 'DOC-102', client: 'Ahmed M.', type: 'Financial', file: 'Bank_Statement_3M.pdf', date: '2024-03-24', status: 'Verified' },
  { id: 'DOC-103', client: 'Fatima Z.', type: 'Academic', file: 'Admission_Letter.pdf', date: '2024-03-23', status: 'Pending' },
  { id: 'DOC-104', client: 'Youssef B.', type: 'Travel', file: 'Flight_Booking.pdf', date: '2024-03-20', status: 'Rejected' },
  { id: 'DOC-105', client: 'Nadia S.', type: 'Identity', file: 'Family_Book_Translated.pdf', date: '2024-03-19', status: 'Verified' }
]

const mockAppointments = [
  { id: 'APT-01', client: 'Ahmed M.', type: 'Biometrics', date: '2024-03-24', time: '09:30 AM', agent: 'Agent Sarah', status: 'Confirmed' },
  { id: 'APT-02', client: 'Fatima Z.', type: 'Consultation', date: '2024-03-25', time: '02:00 PM', agent: 'Agent Karim', status: 'Pending' },
  { id: 'APT-03', client: 'Youssef B.', type: 'Doc Submission', date: '2024-03-25', time: '10:00 AM', agent: 'Agent Sarah', status: 'Confirmed' },
  { id: 'APT-04', client: 'Hassan R.', type: 'Follow-up', date: '2024-03-26', time: '11:30 AM', agent: 'Agent Karim', status: 'Confirmed' }
]

const mockInvoices = [
  { id: 'INV-2024-089', client: 'Ahmed M.', service: 'France Tourist Visa Package', amount: 1500, date: '2024-03-24', status: 'Paid' },
  { id: 'INV-2024-090', client: 'Fatima Z.', service: 'Canada Study Permit Full Service', amount: 4500, date: '2024-03-23', status: 'Pending' },
  { id: 'INV-2024-091', client: 'Youssef B.', service: 'Spain Work Visa Assistance', amount: 2000, date: '2024-03-20', status: 'Overdue' },
  { id: 'INV-2024-092', client: 'Nadia S.', service: 'Document Translation (5 pages)', amount: 750, date: '2024-03-19', status: 'Paid' }
]

export default function Admin() {
  const { t } = useTranslation()
  const { token, user } = useAuthStore()
  const [pipeline, setPipeline] = useState<Application[]>([])
  const [activeTab, setActiveTab] = useState<'dashboard' | 'applications' | 'crm' | 'documents' | 'calendar' | 'financial' | 'communications' | 'blog' | 'settings' | 'seo'>('dashboard')
  const [selectedApp, setSelectedApp] = useState<Application | null>(null)
  
  // Blog State
  const [blogs, setBlogs] = useState(initialBlogPosts)
  const [editingBlog, setEditingBlog] = useState<any | null>(null)
  const [markdownContent, setMarkdownContent] = useState('')
  const [seoSettings, setSeoSettings] = useState({
    siteName: 'VisaPlus',
    siteDesc: 'Expert Visa & Immigration Services',
    keywords: 'visa, immigration, travel, schengen'
  })
  const [sitemapLoading, setSitemapLoading] = useState(false)

  useEffect(() => {
    fetch('/api/applications', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json() as any)
      .then(data => {
        if (data.success) setPipeline(data.data)
      })
  }, [token])

  const stats = [
    { title: "Total Clients", value: "1,248", icon: <Users className="h-5 w-5 text-primary" />, trend: "+12%" },
    { title: "Active Applications", value: "156", icon: <Activity className="h-5 w-5 text-gold-500" />, trend: "+4%" },
    { title: "Approved Visas", value: "892", icon: <FileCheck className="h-5 w-5 text-green-500" />, trend: "+18%" },
    { title: "Revenue (MAD)", value: "142k", icon: <CreditCard className="h-5 w-5 text-purple-500" />, trend: "+8%" },
  ]

  const insertMarkdown = (prefix: string, suffix: string = '') => {
    setMarkdownContent(prev => prev + `${prefix}text${suffix}`)
  }

  const renderBlog = () => {
    if (editingBlog) {
        return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between mb-8">
            <Button variant="ghost" onClick={() => setEditingBlog(null)} className="text-muted-foreground hover:text-foreground -ml-4">
              <ChevronRight className="mr-2 h-4 w-4 rotate-180" /> Back to Articles
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2" onClick={() => {
              if (editingBlog.id === 'new') {
                setBlogs([{ ...editingBlog, id: Date.now().toString(), content: markdownContent }, ...blogs])
              } else {
                setBlogs(blogs.map(b => b.id === editingBlog.id ? { ...editingBlog, content: markdownContent } : b))
              }
              setEditingBlog(null)
            }}>
              <Save className="h-4 w-4" /> Save Post
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Editor Side */}
            <div className="space-y-6">
              <Card className="glass-panel border-border">
                <CardHeader>
                  <Input 
                    placeholder="Enter Article Title..." 
                    value={editingBlog.title}
                    onChange={(e) => setEditingBlog({...editingBlog, title: e.target.value})}
                    className="bg-card border-border text-foreground text-xl h-14 font-display font-bold" 
                  />
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <Input 
                      placeholder="Category (e.g. Schengen Visas)" 
                      value={editingBlog.category}
                      onChange={(e) => setEditingBlog({...editingBlog, category: e.target.value})}
                      className="bg-card border-border text-foreground" 
                    />
                    <Input 
                      placeholder="Cover Image URL" 
                      value={editingBlog.image}
                      onChange={(e) => setEditingBlog({...editingBlog, image: e.target.value})}
                      className="bg-card border-border text-foreground" 
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Toolbar */}
                  <div className="flex gap-2 p-2 bg-card rounded-md border border-border">
                    <Button size="icon" variant="ghost" onClick={() => insertMarkdown('**', '**')} className="h-8 w-8 text-muted-foreground hover:text-foreground"><Bold className="h-4 w-4"/></Button>
                    <Button size="icon" variant="ghost" onClick={() => insertMarkdown('*', '*')} className="h-8 w-8 text-muted-foreground hover:text-foreground"><Italic className="h-4 w-4"/></Button>
                    <Button size="icon" variant="ghost" onClick={() => insertMarkdown('[', '](url)')} className="h-8 w-8 text-muted-foreground hover:text-foreground"><LinkIcon className="h-4 w-4"/></Button>
                    <Button size="icon" variant="ghost" onClick={() => insertMarkdown('![alt](', ')')} className="h-8 w-8 text-muted-foreground hover:text-foreground"><ImageIcon className="h-4 w-4"/></Button>
                    <Button size="icon" variant="ghost" onClick={() => insertMarkdown('- ')} className="h-8 w-8 text-muted-foreground hover:text-foreground"><List className="h-4 w-4"/></Button>
                  </div>
                  <textarea 
                    className="w-full h-[500px] rounded-md bg-card border border-border p-4 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-mono leading-relaxed"
                    placeholder="Write your article content here in Markdown..."
                    value={markdownContent}
                    onChange={(e) => setMarkdownContent(e.target.value)}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Preview Side */}
            <div className="space-y-6">
              <Card className="glass-panel border-border h-full overflow-auto">
                <CardHeader>
                  <CardTitle className="text-lg font-display text-muted-foreground">Live Preview</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-invert prose-lg max-w-none text-muted-foreground prose-headings:font-display prose-headings:text-foreground prose-a:text-primary">
                  {markdownContent ? <ReactMarkdown>{markdownContent}</ReactMarkdown> : <p className="text-muted-foreground italic">Start typing to see preview...</p>}
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      )
    }

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold tracking-tight text-foreground">Blog Management</h1>
            <p className="text-muted-foreground mt-1">Manage articles published on the public website.</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2" onClick={() => {
            setEditingBlog({ id: 'new', title: '', category: '', image: '', excerpt: '', author: 'Admin' })
            setMarkdownContent('')
          }}>
            <Plus className="h-4 w-4" /> New Article
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map(blog => (
            <Card key={blog.id} className="glass-card border-border overflow-hidden flex flex-col">
              <img src={blog.image || 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80'} alt={blog.title} className="h-40 w-full object-cover" />
              <CardContent className="p-4 flex flex-col flex-1">
                <Badge className="w-fit mb-2 bg-primary/20 text-primary border-primary/30">{blog.category}</Badge>
                <h3 className="font-display font-bold text-lg text-foreground mb-2 line-clamp-2">{blog.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">{blog.excerpt || blog.content.substring(0, 100)}...</p>
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-border">
                  <span className="text-xs text-muted-foreground">{blog.date || new Date().toISOString().split('T')[0]}</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="glass text-foreground hover:bg-foreground/5" onClick={() => {
                      setEditingBlog(blog)
                      setMarkdownContent(blog.content)
                    }}>Edit</Button>
                    <Button variant="destructive" size="sm" className="bg-red-500/20 text-red-400 hover:bg-red-500/30" onClick={() => {
                      setBlogs(blogs.filter(b => b.id !== blog.id))
                    }}><Trash className="h-4 w-4"/></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    )
  }

  const renderCRM = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-foreground">Client Directory</h1>
          <p className="text-muted-foreground mt-1">Manage client profiles, contact information, and history.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search clients..." className="pl-9 bg-card border-border text-foreground w-64" />
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
            <Plus className="h-4 w-4" /> Add Client
          </Button>
        </div>
      </div>

      <Card className="glass-panel border-border">
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-sm text-muted-foreground">
            <thead className="bg-foreground/5 border-b border-border">
              <tr>
                <th className="p-4 font-medium text-muted-foreground">Client ID</th>
                <th className="p-4 font-medium text-muted-foreground">Name</th>
                <th className="p-4 font-medium text-muted-foreground">Email</th>
                <th className="p-4 font-medium text-muted-foreground">Phone</th>
                <th className="p-4 font-medium text-muted-foreground">Applications</th>
                <th className="p-4 font-medium text-muted-foreground">Status</th>
                <th className="p-4 font-medium text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockClients.map((c, i) => (
                <tr key={c.id} className={`border-b border-border hover:bg-foreground/5 transition-colors ${i === mockClients.length - 1 ? 'border-b-0' : ''}`}>
                  <td className="p-4 font-mono text-muted-foreground">{c.id}</td>
                  <td className="p-4 font-medium text-foreground flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center text-[10px] font-bold text-foreground">
                      {c.name.charAt(0)}
                    </div>
                    {c.name}
                  </td>
                  <td className="p-4">{c.email}</td>
                  <td className="p-4" dir="ltr">{c.phone}</td>
                  <td className="p-4 text-center">{c.apps}</td>
                  <td className="p-4">
                    <Badge variant="outline" className={`
                      ${c.status === 'Active' ? 'border-primary/50 text-primary bg-primary/10' : ''}
                      ${c.status === 'VIP' ? 'border-gold-500/50 text-gold-400 bg-gold-500/10' : ''}
                      ${c.status === 'Completed' ? 'border-green-500/50 text-green-400 bg-green-500/10' : ''}
                      ${c.status === 'Lead' ? 'border-border text-muted-foreground bg-foreground/5' : ''}
                    `}>
                      {c.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 hover:bg-primary/10">View Profile</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </motion.div>
  )

  const renderSettings = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold tracking-tight text-foreground">Agency Settings</h1>
        <p className="text-muted-foreground mt-1">Configure global platform preferences and contact details.</p>
      </div>

      <Card className="glass-panel border-border">
        <CardHeader>
          <CardTitle className="text-xl font-display text-foreground">General Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Agency Name</label>
              <Input defaultValue="VisaPlus Berkane" className="bg-card border-border text-foreground" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Support Email</label>
              <Input defaultValue="contact@visaplus-berkane.ma" className="bg-card border-border text-foreground" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Office Phone</label>
              <Input defaultValue="+212 536 61 23 45" className="bg-card border-border text-foreground" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">WhatsApp Business API</label>
              <Input defaultValue="+212 600 11 22 33" className="bg-card border-border text-foreground" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-muted-foreground">Office Address</label>
              <Input defaultValue="123 Boulevard Mohammed V, Berkane 60300, Morocco" className="bg-card border-border text-foreground" />
            </div>
          </div>
          <div className="pt-6 border-t border-border flex justify-end">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  const renderCommunications = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-foreground">Communications Center</h1>
          <p className="text-muted-foreground mt-1">Broadcast messages and manage automated notifications.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
          <Send className="h-4 w-4" /> New Broadcast
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-panel border-border">
            <CardHeader>
              <CardTitle className="text-xl font-display text-foreground">Send Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">To (Select Audience)</label>
                <select className="flex h-10 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>All Active Clients</option>
                  <option>Pending Review Only</option>
                  <option>VIP Clients</option>
                  <option>Specific Client...</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Channel</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-border bg-card text-primary focus:ring-primary" /> Email
                  </label>
                  <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-border bg-card text-primary focus:ring-primary" /> WhatsApp API
                  </label>
                  <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                    <input type="checkbox" className="rounded border-border bg-card text-primary focus:ring-primary" /> Portal Push
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Message</label>
                <textarea 
                  className="w-full h-32 rounded-md bg-card border border-border p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Type your message here..."
                />
              </div>
              <div className="pt-2 flex justify-end">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 gap-2">
                  <Send className="h-4 w-4" /> Send Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="glass-panel border-border">
            <CardHeader>
              <CardTitle className="text-lg font-display text-foreground">Recent Broadcasts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 rounded-lg bg-card border border-border">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-foreground">Ramadan Office Hours</span>
                  <span className="text-xs text-muted-foreground">Yesterday</span>
                </div>
                <div className="flex gap-2 mb-2">
                  <Badge variant="outline" className="text-[10px] bg-green-500/10 text-green-400 border-green-500/20 px-1 py-0">Email</Badge>
                  <Badge variant="outline" className="text-[10px] bg-green-500/10 text-green-400 border-green-500/20 px-1 py-0">WhatsApp</Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">Please note our updated office hours during the holy month of Ramadan...</p>
              </div>

              <div className="p-3 rounded-lg bg-card border border-border">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-foreground">Spain Visa Delays</span>
                  <span className="text-xs text-muted-foreground">Mar 20</span>
                </div>
                <div className="flex gap-2 mb-2">
                  <Badge variant="outline" className="text-[10px] bg-green-500/10 text-green-400 border-green-500/20 px-1 py-0">Email</Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">We have been notified by the consulate of slight delays in processing...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  )

  const renderFinancial = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-foreground">Financial Module</h1>
          <p className="text-muted-foreground mt-1">Manage invoices, payments, and revenue reports.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="glass text-foreground border-border hover:bg-foreground/5 gap-2">
            <Download className="h-4 w-4" /> Export Report
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
            <Plus className="h-4 w-4" /> Create Invoice
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card className="glass-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue MTD</CardTitle>
            <Wallet className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">142,500 MAD</div>
            <p className="text-xs text-green-400 mt-1">+12% from last month</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Payments</CardTitle>
            <Clock className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">24,000 MAD</div>
            <p className="text-xs text-amber-400 mt-1">12 invoices pending</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overdue Payments</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">8,500 MAD</div>
            <p className="text-xs text-red-400 mt-1">3 invoices overdue</p>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-panel border-border">
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-sm text-muted-foreground">
            <thead className="bg-foreground/5 border-b border-border">
              <tr>
                <th className="p-4 font-medium text-muted-foreground">Invoice ID</th>
                <th className="p-4 font-medium text-muted-foreground">Client</th>
                <th className="p-4 font-medium text-muted-foreground">Service</th>
                <th className="p-4 font-medium text-muted-foreground">Date</th>
                <th className="p-4 font-medium text-muted-foreground text-right">Amount</th>
                <th className="p-4 font-medium text-muted-foreground">Status</th>
                <th className="p-4 font-medium text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockInvoices.map((inv, i) => (
                <tr key={inv.id} className={`border-b border-border hover:bg-foreground/5 transition-colors ${i === mockInvoices.length - 1 ? 'border-b-0' : ''}`}>
                  <td className="p-4 font-mono text-muted-foreground text-xs">{inv.id}</td>
                  <td className="p-4 font-medium text-foreground">{inv.client}</td>
                  <td className="p-4 text-muted-foreground">{inv.service}</td>
                  <td className="p-4 text-muted-foreground">{inv.date}</td>
                  <td className="p-4 text-right font-medium text-foreground">{inv.amount} MAD</td>
                  <td className="p-4">
                    <Badge variant="outline" className={`
                      ${inv.status === 'Paid' ? 'border-green-500/50 text-green-400 bg-green-500/10' : ''}
                      ${inv.status === 'Pending' ? 'border-amber-500/50 text-amber-400 bg-amber-500/10' : ''}
                      ${inv.status === 'Overdue' ? 'border-red-500/50 text-red-400 bg-red-500/10' : ''}
                    `}>
                      {inv.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-foreground/5">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 text-primary hover:text-primary/80 hover:bg-primary/10">View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </motion.div>
  )

  const renderCalendar = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-foreground">Appointments Calendar</h1>
          <p className="text-muted-foreground mt-1">Manage team schedules and client meetings.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search appointments..." className="pl-9 bg-card border-border text-foreground w-64" />
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
            <Plus className="h-4 w-4" /> New Appointment
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-panel border-border">
            <CardHeader>
              <CardTitle className="text-xl font-display text-foreground">Upcoming Schedule</CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-left text-sm text-muted-foreground">
                <thead className="bg-foreground/5 border-b border-border">
                  <tr>
                    <th className="p-4 font-medium text-muted-foreground">Time & Date</th>
                    <th className="p-4 font-medium text-muted-foreground">Client</th>
                    <th className="p-4 font-medium text-muted-foreground">Type</th>
                    <th className="p-4 font-medium text-muted-foreground">Agent</th>
                    <th className="p-4 font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockAppointments.map((apt, i) => (
                    <tr key={apt.id} className={`border-b border-border hover:bg-foreground/5 transition-colors ${i === mockAppointments.length - 1 ? 'border-b-0' : ''}`}>
                      <td className="p-4">
                        <div className="font-medium text-foreground">{apt.time}</div>
                        <div className="text-xs text-muted-foreground">{apt.date}</div>
                      </td>
                      <td className="p-4 font-medium text-foreground">{apt.client}</td>
                      <td className="p-4">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">{apt.type}</Badge>
                      </td>
                      <td className="p-4 text-muted-foreground">{apt.agent}</td>
                      <td className="p-4">
                        <Badge variant="outline" className={`
                          ${apt.status === 'Confirmed' ? 'border-green-500/50 text-green-400 bg-green-500/10' : ''}
                          ${apt.status === 'Pending' ? 'border-amber-500/50 text-amber-400 bg-amber-500/10' : ''}
                        `}>
                          {apt.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card className="glass-panel border-border">
            <CardHeader>
              <CardTitle className="text-lg font-display text-foreground">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start glass text-foreground hover:bg-foreground/5">
                <Calendar className="h-4 w-4 mr-2" /> Sync with Google Calendar
              </Button>
              <Button variant="outline" className="w-full justify-start glass text-foreground hover:bg-foreground/5">
                <Clock className="h-4 w-4 mr-2" /> Manage Office Hours
              </Button>
              <Button variant="outline" className="w-full justify-start glass text-foreground hover:bg-foreground/5">
                <Users className="h-4 w-4 mr-2" /> Team Availability
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  )

  const renderDocuments = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-foreground">Document Management</h1>
          <p className="text-muted-foreground mt-1">Review uploaded documents across all clients.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search files or clients..." className="pl-9 bg-card border-border text-foreground w-64" />
          </div>
          <Button variant="outline" className="glass text-foreground border-border hover:bg-foreground/5 gap-2">
            <Download className="h-4 w-4" /> Bulk Download
          </Button>
        </div>
      </div>

      <Card className="glass-panel border-border">
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-sm text-muted-foreground">
            <thead className="bg-foreground/5 border-b border-border">
              <tr>
                <th className="p-4 font-medium text-muted-foreground">Document ID</th>
                <th className="p-4 font-medium text-muted-foreground">Client</th>
                <th className="p-4 font-medium text-muted-foreground">File Name</th>
                <th className="p-4 font-medium text-muted-foreground">Category</th>
                <th className="p-4 font-medium text-muted-foreground">Upload Date</th>
                <th className="p-4 font-medium text-muted-foreground">Status</th>
                <th className="p-4 font-medium text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockDocuments.map((doc, i) => (
                <tr key={doc.id} className={`border-b border-border hover:bg-foreground/5 transition-colors ${i === mockDocuments.length - 1 ? 'border-b-0' : ''}`}>
                  <td className="p-4 font-mono text-muted-foreground text-xs">{doc.id}</td>
                  <td className="p-4 font-medium text-foreground">{doc.client}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      {doc.file}
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline" className="bg-foreground/5 text-muted-foreground border-border">{doc.type}</Badge>
                  </td>
                  <td className="p-4 text-muted-foreground">{doc.date}</td>
                  <td className="p-4">
                    <Badge variant="outline" className={`
                      ${doc.status === 'Pending' ? 'border-amber-500/50 text-amber-400 bg-amber-500/10' : ''}
                      ${doc.status === 'Verified' ? 'border-green-500/50 text-green-400 bg-green-500/10' : ''}
                      ${doc.status === 'Rejected' ? 'border-red-500/50 text-red-400 bg-red-500/10' : ''}
                    `}>
                      {doc.status === 'Pending' && <Clock className="w-3 h-3 mr-1 inline-block" />}
                      {doc.status === 'Verified' && <CheckCircle2 className="w-3 h-3 mr-1 inline-block" />}
                      {doc.status === 'Rejected' && <XCircle className="w-3 h-3 mr-1 inline-block" />}
                      {doc.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-foreground/5">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 text-green-400 hover:text-green-300 hover:bg-green-400/10">Approve</Button>
                    <Button variant="ghost" size="sm" className="h-8 text-amber-400 hover:text-amber-300 hover:bg-amber-400/10">Reject</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </motion.div>
  )

  const renderSEO = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-foreground">SEO Management</h1>
          <p className="text-muted-foreground mt-1">Optimize your site for search engines and manage sitemaps.</p>
        </div>
        <Button 
          onClick={async () => {
            setSitemapLoading(true)
            await fetch('/api/seo/ping-google', { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } })
            setTimeout(() => setSitemapLoading(false), 1000)
          }}
          className="bg-green-500 hover:bg-green-600 text-foreground gap-2"
          disabled={sitemapLoading}
        >
          {sitemapLoading ? <RefreshCcw className="h-4 w-4 animate-spin" /> : <Globe className="h-4 w-4" />} 
          {sitemapLoading ? 'Pinging Google...' : 'Ping Google Sitemap'}
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-panel border-border">
            <CardHeader>
              <CardTitle className="text-xl font-display text-foreground">Global Meta Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Global Site Title</label>
                <Input 
                  value={seoSettings.siteName} 
                  onChange={e => setSeoSettings({...seoSettings, siteName: e.target.value})}
                  className="bg-card border-border text-foreground" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Global Description</label>
                <textarea 
                  value={seoSettings.siteDesc}
                  onChange={e => setSeoSettings({...seoSettings, siteDesc: e.target.value})}
                  className="flex min-h-[100px] w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Default Keywords (comma separated)</label>
                <Input 
                  value={seoSettings.keywords}
                  onChange={e => setSeoSettings({...seoSettings, keywords: e.target.value})}
                  className="bg-card border-border text-foreground" 
                />
              </div>
              <div className="pt-4 flex justify-end">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                  <Save className="h-4 w-4" /> Save Global Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="glass-panel border-border">
            <CardHeader>
              <CardTitle className="text-lg font-display text-foreground">Indexation Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-card border border-border space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Sitemap URL</span>
                  <a href="/api/seo/sitemap.xml" target="_blank" className="text-sm text-primary hover:underline">View XML</a>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Robots.txt</span>
                  <a href="/api/seo/robots.txt" target="_blank" className="text-sm text-primary hover:underline">View File</a>
                </div>
                <div className="pt-2 border-t border-border flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Google Status</span>
                  <Badge className="bg-green-500/10 text-green-400 border-green-500/20">Indexed</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel border-border bg-gradient-to-br from-primary/10 to-transparent">
            <CardContent className="p-6">
              <LineChart className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-medium text-foreground mb-2">SEO Health Score</h3>
              <div className="text-3xl font-bold text-foreground mb-2">92<span className="text-lg text-muted-foreground">/100</span></div>
              <p className="text-sm text-muted-foreground">Your website is well-optimized. All pages have meta tags and sitemaps are active.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  )

  const renderServices = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-foreground">Services & Visas</h1>
          <p className="text-muted-foreground mt-1">Manage agency services and destination options.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
          <Plus className="h-4 w-4" /> Add New
        </Button>
      </div>

      <Card className="glass-panel border-border">
        <CardContent className="p-8 text-center text-muted-foreground border border-dashed border-border rounded-xl bg-foreground/5">
          <List className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Service management is active. Use the API endpoints to create and update services and destinations.</p>
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <div className="flex h-full min-h-[calc(100vh-4rem)] bg-background">
      {/* Sidebar */}
      <aside className="hidden w-64 border-r border-border bg-card/50 backdrop-blur-xl md:block p-4 space-y-6 shrink-0">
        <div className="px-2 mb-8">
          <h3 className="font-display font-bold text-lg text-foreground">Agency Admin</h3>
          <p className="text-xs text-muted-foreground">Berkane Branch</p>
        </div>
        <nav className="space-y-2">
          <Button 
            variant="ghost" 
            onClick={() => {setActiveTab('dashboard'); setSelectedApp(null);}}
            className={`w-full justify-start ${activeTab === 'dashboard' ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'}`}
          >
            <LayoutDashboard className="mr-3 h-4 w-4" /> Dashboard
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => {setActiveTab('applications'); setSelectedApp(null);}}
            className={`w-full justify-start ${activeTab === 'applications' ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'}`}
          >
            <FileCheck className="mr-3 h-4 w-4" /> Applications
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => {setActiveTab('crm'); setSelectedApp(null);}}
            className={`w-full justify-start ${activeTab === 'crm' ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'}`}
          >
            <Users className="mr-3 h-4 w-4" /> CRM / Clients
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => {setActiveTab('documents'); setSelectedApp(null);}}
            className={`w-full justify-start ${activeTab === 'documents' ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'}`}
          >
            <FolderOpen className="mr-3 h-4 w-4" /> Documents
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => {setActiveTab('calendar'); setSelectedApp(null);}}
            className={`w-full justify-start ${activeTab === 'calendar' ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'}`}
          >
            <Calendar className="mr-3 h-4 w-4" /> Appointments
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => {setActiveTab('financial'); setSelectedApp(null);}}
            className={`w-full justify-start ${activeTab === 'financial' ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'}`}
          >
            <Wallet className="mr-3 h-4 w-4" /> Financial
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => {setActiveTab('communications'); setSelectedApp(null);}}
            className={`w-full justify-start ${activeTab === 'communications' ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'}`}
          >
            <MessageSquare className="mr-3 h-4 w-4" /> Communications
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => {setActiveTab('blog'); setSelectedApp(null);}}
            className={`w-full justify-start ${activeTab === 'blog' ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'}`}
          >
            <PenTool className="mr-3 h-4 w-4" /> Blog Editor
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => {setActiveTab('services' as any); setSelectedApp(null);}}
            className={`w-full justify-start ${(activeTab as any) === 'services' ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'}`}
          >
            <List className="mr-3 h-4 w-4" /> Services & Visas
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => {setActiveTab('seo'); setSelectedApp(null);}}
            className={`w-full justify-start ${activeTab === 'seo' ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'}`}
          >
            <LineChart className="mr-3 h-4 w-4" /> SEO Tool
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => {setActiveTab('settings'); setSelectedApp(null);}}
            className={`w-full justify-start ${activeTab === 'settings' ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'}`}
          >
            <Settings className="mr-3 h-4 w-4" /> Settings
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 overflow-auto relative">
        {selectedApp ? (
          /* Application Detail View */
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={() => setSelectedApp(null)} className="text-muted-foreground hover:text-foreground -ml-4">
                <ChevronRight className="mr-2 h-4 w-4 rotate-180" /> Back to Pipeline
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" className="glass border-border text-foreground hover:bg-foreground/5">Request Documents</Button>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Approve & Submit</Button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <Card className="glass-panel border-border">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center text-xl font-bold text-foreground">
                          {selectedApp.client.charAt(0)}
                        </div>
                        <div>
                          <CardTitle className="text-2xl font-display text-foreground">{selectedApp.client}</CardTitle>
                          <p className="text-muted-foreground">{selectedApp.id}</p>
                        </div>
                      </div>
                      <Badge className="bg-primary/20 text-primary border-primary/30 text-sm px-3 py-1">{selectedApp.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Destination</p>
                        <p className="font-medium text-foreground text-lg">{selectedApp.destination}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Visa Type</p>
                        <p className="font-medium text-foreground text-lg">{selectedApp.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Days in Stage</p>
                        <p className="font-medium text-foreground text-lg">{selectedApp.days} days</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-panel border-border">
                  <CardHeader>
                    <CardTitle className="text-lg font-display text-foreground">Uploaded Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {['Passport_Scan.pdf', 'Bank_Statement_3M.pdf', 'Work_Certificate.pdf'].map((doc, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-card border border-border hover:border-border transition-colors cursor-pointer">
                          <div className="flex items-center gap-3">
                            <FileCheck className="h-5 w-5 text-muted-foreground" />
                            <span className="text-sm text-foreground">{doc}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost" className="h-8 text-green-400 hover:text-green-300 hover:bg-green-400/10">Verify</Button>
                            <Button size="sm" variant="ghost" className="h-8 text-amber-400 hover:text-amber-300 hover:bg-amber-400/10">Reject</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card className="glass-panel border-border">
                  <CardHeader>
                    <CardTitle className="text-lg font-display text-foreground">Agent Notes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <textarea 
                      className="w-full h-40 rounded-md bg-card border border-border p-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Add internal notes here. These are not visible to the client."
                    />
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Save Note</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        ) : activeTab === 'dashboard' || activeTab === 'applications' ? (
          /* Dashboard & Pipeline View */
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-display font-bold tracking-tight text-foreground">
                  {activeTab === 'dashboard' ? 'Overview' : 'Applications Pipeline'}
                </h1>
                <p className="text-muted-foreground mt-1">Monitor agency performance and active pipeline.</p>
              </div>
              <div className="flex w-full md:w-auto items-center space-x-4">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="search" 
                    placeholder="Search clients or IDs..." 
                    className="pl-9 bg-card border-border text-foreground placeholder:text-muted-foreground" 
                  />
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  New Application
                </Button>
              </div>
            </div>

            {activeTab === 'dashboard' && (
              <>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Card className="glass-card border-border hover:border-border transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                          <div className="p-2 rounded-lg bg-foreground/5">
                            {stat.icon}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-display font-bold text-foreground">{stat.value}</div>
                          <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                            {stat.trend} from last month
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <div className="mb-8">
                  <Card className="glass-panel border-border">
                    <CardHeader>
                      <CardTitle className="text-lg font-display text-foreground">Application Volume (Last 6 Months)</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                          <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} />
                          <YAxis stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#0A0F1E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                            itemStyle={{ color: '#fff' }}
                          />
                          <Area type="monotone" dataKey="apps" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorApps)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}

            <div className="flex items-center justify-between mb-4 mt-8">
              <h2 className="text-xl font-display font-bold text-foreground">Application Pipeline</h2>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3">
              {/* Columns */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <h3 className="font-medium text-sm text-muted-foreground">Needs Review</h3>
                  <Badge variant="secondary" className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                    {pipeline.filter(p => p.status === 'Review').length}
                  </Badge>
                </div>
                {pipeline.filter(p => p.status === 'Review').map((app) => (
                  <Card key={app.id} onClick={() => setSelectedApp(app)} className="glass-panel border-border cursor-pointer hover:border-primary/50 transition-all hover:-translate-y-1">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="font-semibold text-foreground">{app.id}</span>
                        <Badge variant="outline" className="text-xs border-border text-muted-foreground bg-card">{app.days}d</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center text-[10px] font-bold text-foreground">
                          {app.client.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-foreground">{app.client}</span>
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center justify-between pt-2 border-t border-border">
                        <span>{app.destination}</span>
                        <span>{app.type}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <h3 className="font-medium text-sm text-muted-foreground">Submitted to Embassy</h3>
                  <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                    {pipeline.filter(p => p.status === 'Submitted').length}
                  </Badge>
                </div>
                {pipeline.filter(p => p.status === 'Submitted').map((app) => (
                  <Card key={app.id} onClick={() => setSelectedApp(app)} className="glass-panel border-border cursor-pointer hover:border-primary/50 transition-all hover:-translate-y-1">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="font-semibold text-foreground">{app.id}</span>
                        <Badge variant="outline" className="text-xs border-border text-muted-foreground bg-card">{app.days}d</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-gold-500 to-amber-600 flex items-center justify-center text-[10px] font-bold text-foreground">
                          {app.client.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-foreground">{app.client}</span>
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center justify-between pt-2 border-t border-border">
                        <span>{app.destination}</span>
                        <span>{app.type}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <h3 className="font-medium text-sm text-muted-foreground">Approved</h3>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">0</Badge>
                </div>
                <div className="p-8 text-center text-sm text-muted-foreground border border-dashed border-border rounded-xl bg-foreground/5">
                  No applications in this stage
                </div>
              </div>
            </div>
          </motion.div>
        ) : activeTab === 'blog' ? (
          /* Blog Editor View */
          renderBlog()
        ) : activeTab === 'crm' ? (
          /* CRM View */
          renderCRM()
        ) : activeTab === 'documents' ? (
          /* Documents View */
          renderDocuments()
        ) : activeTab === 'calendar' ? (
          /* Calendar View */
          renderCalendar()
        ) : activeTab === 'financial' ? (
          /* Financial View */
          renderFinancial()
        ) : activeTab === 'communications' ? (
          /* Communications View */
          renderCommunications()
        ) : activeTab === 'settings' ? (
          /* Settings View */
          renderSettings()
        ) : activeTab === 'seo' ? (
          /* SEO View */
          renderSEO()
        ) : activeTab === 'services' ? (
          /* Services View */
          renderServices()
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}