import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { 
  Users, FileCheck, Calendar, Activity, Search, LayoutDashboard, Settings, Mail, CreditCard, ChevronRight, 
  PenTool, Save, Plus, Trash, Image as ImageIcon, Link as LinkIcon, Bold, Italic, List, FolderOpen, MessageSquare, Wallet,
  Download, Clock, AlertCircle, FileText, CheckCircle2, XCircle, Send, LineChart, Globe, RefreshCcw, Edit
} from 'lucide-react'
import AdvancedSEOTool from '@/components/admin/AdvancedSEOTool'
import AdvancedBlogSEO from '@/components/admin/AdvancedBlogSEO'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useEffect, useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import ReactMarkdown from 'react-markdown'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { servicesData } from '@/data/services'
import { countriesData } from '@/data/countries'

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
  const [dashboardStats, setDashboardStats] = useState<any>({
    users: 0,
    applications: 0,
    pendingApplications: 0,
    appointments: 0,
    pendingAppointments: 0,
    blogs: 0
  })
  const [usersList, setUsersList] = useState<any[]>([])
  const [appointmentsList, setAppointmentsList] = useState<any[]>([])
  const [applicationsList, setApplicationsList] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<'dashboard' | 'applications' | 'crm' | 'documents' | 'calendar' | 'financial' | 'communications' | 'blog' | 'settings' | 'seo' | 'services' | 'docRules'>('dashboard')
  const [selectedApp, setSelectedApp] = useState<Application | null>(null)
  
  // Blog State
  const [blogs, setBlogs] = useState<any[]>([])
  const [editingBlog, setEditingBlog] = useState<any | null>(null)
  const [blogLang, setBlogLang] = useState<'en' | 'ar' | 'fr'>('en')
  const [markdownContent, setMarkdownContent] = useState('')
  const [seoSettings, setSeoSettings] = useState({
    siteName: 'E-Visa Schengen',
    siteDesc: 'Expert Visa & Immigration Services',
    keywords: 'visa, immigration, travel, schengen'
  })
  const [sitemapLoading, setSitemapLoading] = useState(false)
  const [docRulesList, setDocRulesList] = useState<any[]>([])
  const [docRulesLoading, setDocRulesLoading] = useState(false)
  const [docRulesMessage, setDocRulesMessage] = useState({ message: '', isError: false })
  const [docRuleForm, setDocRuleForm] = useState({
    id: '',
    destinationId: '',
    visaTypeId: '',
    originCountryCode: '',
    documentsText: '',
    sourcesText: '',
    active: true,
    lastVerifiedAt: ''
  })
  const [originsTopCodes, setOriginsTopCodes] = useState('')
  const [originsLoading, setOriginsLoading] = useState(false)
  const [originsMessage, setOriginsMessage] = useState({ message: '', isError: false })

  useEffect(() => {
    if (!token) return
    if (activeTab !== 'docRules') return

    setDocRulesLoading(true)
    setDocRulesMessage({ message: '', isError: false })

    fetch('/api/document-rules/all', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json() as any)
      .then(data => {
        if (data.success) setDocRulesList(data.data || [])
        else setDocRulesMessage({ message: 'Failed to load rules', isError: true })
      })
      .catch(() => setDocRulesMessage({ message: 'Failed to load rules', isError: true }))
      .finally(() => setDocRulesLoading(false))

    setOriginsLoading(true)
    setOriginsMessage({ message: '', isError: false })
    fetch('/api/origins/all', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json() as any)
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          const top = data.data.filter((r: any) => r.isTop === 1 && r.active === 1).map((r: any) => r.code)
          setOriginsTopCodes(top.join(','))
        }
      })
      .catch(() => setOriginsMessage({ message: 'Failed to load origins', isError: true }))
      .finally(() => setOriginsLoading(false))
  }, [activeTab, token])

  useEffect(() => {
    if (!token) return

    fetch('/api/applications', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json() as any)
      .then(data => {
        if (data.success) setPipeline(data.data)
      })

    fetch('/api/auth/stats', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json() as any)
      .then(data => {
        if (data.success) {
          if (data.stats) setDashboardStats(data.stats)
          if (data.users) setUsersList(data.users)
          if (data.appointments) setAppointmentsList(data.appointments)
          if (data.applications) setApplicationsList(data.applications)
        }
      })

    fetch('/api/blogs')
      .then(res => res.json() as any)
      .then(data => {
        if (data.success) setBlogs(data.data)
      })

    fetch('/api/settings')
      .then(res => res.json() as any)
      .then(data => {
        if (data.success && data.data) {
          setSocialLinks({
            facebook: data.data.facebook || '',
            instagram: data.data.instagram || '',
            linkedin: data.data.linkedin || '',
            x: data.data.x || '',
            tiktok: data.data.tiktok || '',
            address: data.data.address || '',
            phone: data.data.phone || '',
            email: data.data.email || '',
            whatsapp: data.data.whatsapp || '',
            workingHours: data.data.workingHours || ''
          })
          setTrackingLinks({
            metaPixel: data.data.metaPixel || '',
            googleAnalytics: data.data.googleAnalytics || '',
            googleTagManager: data.data.googleTagManager || ''
          })
        }
      })
  }, [token])

  const stats = [
    { title: "Total Clients", value: dashboardStats.users.toString(), icon: <Users className="h-5 w-5 text-primary" />, trend: "+12%" },
    { title: "Total Applications", value: dashboardStats.applications.toString(), icon: <Activity className="h-5 w-5 text-gold-500" />, trend: "+4%" },
    { title: "Pending Apps", value: dashboardStats.pendingApplications.toString(), icon: <FileCheck className="h-5 w-5 text-green-500" />, trend: "+18%" },
    { title: "Published Blogs", value: dashboardStats.blogs.toString(), icon: <PenTool className="h-5 w-5 text-purple-500" />, trend: "+8%" },
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
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2" onClick={async () => {
              if (editingBlog.id === 'new') {
                const res = await fetch('/api/blogs', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                  body: JSON.stringify(editingBlog)
                })
                const data = await res.json() as any
                if (data.success) {
                  setBlogs([data.data, ...blogs])
                }
              } else {
                const res = await fetch(`/api/blogs/${editingBlog.id}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                  body: JSON.stringify(editingBlog)
                })
                const data = await res.json() as any
                if (data.success) {
                  setBlogs(blogs.map(b => b.id === editingBlog.id ? data.data : b))
                }
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
                  <div className="flex gap-2 mb-4">
                    <Button variant={blogLang === 'en' ? 'default' : 'outline'} size="sm" onClick={() => setBlogLang('en')} className={blogLang === 'en' ? 'bg-primary' : 'glass text-foreground'}>English (Primary)</Button>
                    <Button variant={blogLang === 'ar' ? 'default' : 'outline'} size="sm" onClick={() => setBlogLang('ar')} className={blogLang === 'ar' ? 'bg-primary' : 'glass text-foreground'}>Arabic (AR)</Button>
                    <Button variant={blogLang === 'fr' ? 'default' : 'outline'} size="sm" onClick={() => setBlogLang('fr')} className={blogLang === 'fr' ? 'bg-primary' : 'glass text-foreground'}>French (FR)</Button>
                  </div>
                  <Input 
                    placeholder={`Enter Article Title (${blogLang.toUpperCase()})...`}
                    value={blogLang === 'en' ? editingBlog.title : blogLang === 'ar' ? (editingBlog.titleAr || '') : (editingBlog.titleFr || '')}
                    onChange={(e) => {
                      if (blogLang === 'en') setEditingBlog({...editingBlog, title: e.target.value})
                      if (blogLang === 'ar') setEditingBlog({...editingBlog, titleAr: e.target.value})
                      if (blogLang === 'fr') setEditingBlog({...editingBlog, titleFr: e.target.value})
                    }}
                    dir={blogLang === 'ar' ? 'rtl' : 'ltr'}
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
                  {/* Editor */}
                  <div className="bg-card text-foreground" dir={blogLang === 'ar' ? 'rtl' : 'ltr'}>
                    <ReactQuill 
                      theme="snow"
                      value={blogLang === 'en' ? editingBlog.content : blogLang === 'ar' ? (editingBlog.contentAr || '') : (editingBlog.contentFr || '')}
                      onChange={(val) => {
                        if (blogLang === 'en') setEditingBlog({...editingBlog, content: val})
                        if (blogLang === 'ar') setEditingBlog({...editingBlog, contentAr: val})
                        if (blogLang === 'fr') setEditingBlog({...editingBlog, contentFr: val})
                      }}
                      className="h-[450px] mb-12"
                      modules={{
                        toolbar: [
                          [{ 'header': [1, 2, 3, false] }],
                          ['bold', 'italic', 'underline', 'strike'],
                          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                          ['link', 'image'],
                          ['clean']
                        ]
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              <AdvancedBlogSEO editingBlog={editingBlog} blogLang={blogLang} />
            </div>

            {/* Preview Side */}
            <div className="space-y-6">
              <Card className="glass-panel border-border h-full overflow-auto">
                <CardHeader>
                  <CardTitle className="text-lg font-display text-muted-foreground">Live Preview</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert prose-lg max-w-none text-muted-foreground prose-headings:font-display prose-headings:text-foreground prose-a:text-primary">
                  {blogLang === 'en' && editingBlog.content ? <div dangerouslySetInnerHTML={{ __html: editingBlog.content }} /> : null}
                  {blogLang === 'ar' && editingBlog.contentAr ? <div dir="rtl" dangerouslySetInnerHTML={{ __html: editingBlog.contentAr }} /> : null}
                  {blogLang === 'fr' && editingBlog.contentFr ? <div dangerouslySetInnerHTML={{ __html: editingBlog.contentFr }} /> : null}
                  {!editingBlog.content && !editingBlog.contentAr && !editingBlog.contentFr && <p className="text-muted-foreground italic">Start typing to see preview...</p>}
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
              {usersList.length > 0 ? usersList.map((c, i) => (
                <tr key={c.id} className={`border-b border-border hover:bg-foreground/5 transition-colors ${i === usersList.length - 1 ? 'border-b-0' : ''}`}>
                  <td className="p-4 font-mono text-muted-foreground">{c.id.substring(0,8)}...</td>
                  <td className="p-4 font-medium text-foreground flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center text-[10px] font-bold text-foreground">
                      {c.name.charAt(0).toUpperCase()}
                    </div>
                    {c.name}
                  </td>
                  <td className="p-4">{c.email}</td>
                  <td className="p-4" dir="ltr">{c.phone || '-'}</td>
                  <td className="p-4 text-center">{applicationsList.filter(app => app.clientId === c.id).length}</td>
                  <td className="p-4">
                    <Badge variant="outline" className={`
                      ${c.role === 'ADMIN' ? 'border-primary/50 text-primary bg-primary/10' : 'border-border text-muted-foreground bg-foreground/5'}
                    `}>
                      {c.role}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 hover:bg-primary/10">View Profile</Button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={7} className="text-center p-4 text-muted-foreground">No clients found</td></tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </motion.div>
  )

  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', password: '', phone: '' })
  const [adminStatus, setAdminStatus] = useState({ loading: false, message: '', isError: false })
  const [socialLinks, setSocialLinks] = useState({ facebook: '', instagram: '', linkedin: '', x: '', tiktok: '', address: '', phone: '', email: '', whatsapp: '', workingHours: '' })
  const [socialStatus, setSocialStatus] = useState({ loading: false, message: '', isError: false })
  const [contactStatus, setContactStatus] = useState({ loading: false, message: '', isError: false })
  const [trackingLinks, setTrackingLinks] = useState({ metaPixel: '', googleAnalytics: '', googleTagManager: '' })
  const [trackingStatus, setTrackingStatus] = useState({ loading: false, message: '', isError: false })

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAdminStatus({ loading: true, message: '', isError: false })
    try {
      const res = await fetch('/api/auth/admin-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ ...newAdmin, role: 'ADMIN' })
      })
      const data = await res.json() as any
      if (data.success) {
        setAdminStatus({ loading: false, message: 'Admin account created successfully!', isError: false })
        setNewAdmin({ name: '', email: '', password: '', phone: '' })
      } else {
        setAdminStatus({ loading: false, message: data.error || 'Failed to create admin', isError: true })
      }
    } catch (err) {
      setAdminStatus({ loading: false, message: 'Network error', isError: true })
    }
  }

  const handleSaveContact = async (e: React.FormEvent) => {
    e.preventDefault()
    setContactStatus({ loading: true, message: '', isError: false })
    try {
      const payload = {
        address: socialLinks.address,
        phone: socialLinks.phone,
        whatsapp: socialLinks.whatsapp,
        email: socialLinks.email,
        workingHours: socialLinks.workingHours
      }
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload)
      })
      const data = await res.json() as any
      if (data.success) {
        setContactStatus({ loading: false, message: 'Business info updated successfully!', isError: false })
      } else {
        setContactStatus({ loading: false, message: 'Failed to update business info', isError: true })
      }
    } catch (err) {
      setContactStatus({ loading: false, message: 'Network error', isError: true })
    }
  }

  const handleSaveTracking = async (e: React.FormEvent) => {
    e.preventDefault()
    setTrackingStatus({ loading: true, message: '', isError: false })
    try {
      const payload = {
        metaPixel: trackingLinks.metaPixel,
        googleAnalytics: trackingLinks.googleAnalytics,
        googleTagManager: trackingLinks.googleTagManager
      }
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload)
      })
      const data = await res.json() as any
      if (data.success) {
        setTrackingStatus({ loading: false, message: 'Tracking scripts updated successfully!', isError: false })
      } else {
        setTrackingStatus({ loading: false, message: 'Failed to update tracking scripts', isError: true })
      }
    } catch (err) {
      setTrackingStatus({ loading: false, message: 'Network error', isError: true })
    }
  }

  const handleSaveSocials = async (e: React.FormEvent) => {
    e.preventDefault()
    setSocialStatus({ loading: true, message: '', isError: false })
    try {
      const payload = {
        facebook: socialLinks.facebook,
        instagram: socialLinks.instagram,
        linkedin: socialLinks.linkedin,
        x: socialLinks.x,
        tiktok: socialLinks.tiktok
      }
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload)
      })
      const data = await res.json() as any
      if (data.success) {
        setSocialStatus({ loading: false, message: 'Social links updated successfully!', isError: false })
      } else {
        setSocialStatus({ loading: false, message: 'Failed to update social links', isError: true })
      }
    } catch (err) {
      setSocialStatus({ loading: false, message: 'Network error', isError: true })
    }
  }

  const renderSettings = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold tracking-tight text-foreground">Agency Settings</h1>
        <p className="text-muted-foreground mt-1">Configure global platform preferences and contact details.</p>
      </div>

      <Card className="glass-panel border-border">
        <CardHeader>
          <CardTitle className="text-xl font-display text-foreground">Create Admin Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateAdmin} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Admin Name</label>
                <Input value={newAdmin.name} onChange={e => setNewAdmin({...newAdmin, name: e.target.value})} required className="bg-card border-border text-foreground" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <Input type="email" value={newAdmin.email} onChange={e => setNewAdmin({...newAdmin, email: e.target.value})} required className="bg-card border-border text-foreground" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Password</label>
                <Input type="password" value={newAdmin.password} onChange={e => setNewAdmin({...newAdmin, password: e.target.value})} required className="bg-card border-border text-foreground" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Phone</label>
                <Input value={newAdmin.phone} onChange={e => setNewAdmin({...newAdmin, phone: e.target.value})} required className="bg-card border-border text-foreground" />
              </div>
            </div>
            {adminStatus.message && (
              <p className={`text-sm ${adminStatus.isError ? 'text-red-500' : 'text-green-500'}`}>
                {adminStatus.message}
              </p>
            )}
            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={adminStatus.loading} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                {adminStatus.loading ? 'Creating...' : 'Create Admin'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>


      <Card className="glass-panel border-border mt-8">
        <CardHeader>
          <CardTitle className="text-xl font-display text-foreground">Global Contact & Social Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-10">
            <form onSubmit={handleSaveContact} className="space-y-4">
              <h3 className="font-semibold text-lg text-foreground border-b border-border pb-2">Business Contact Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Office Address</label>
                  <Input value={socialLinks.address} onChange={e => setSocialLinks({...socialLinks, address: e.target.value})} placeholder="123 Boulevard..." className="bg-card border-border text-foreground" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Office Phone</label>
                  <Input value={socialLinks.phone} onChange={e => setSocialLinks({...socialLinks, phone: e.target.value})} placeholder="+212 536..." className="bg-card border-border text-foreground" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">WhatsApp Business API</label>
                  <Input value={socialLinks.whatsapp} onChange={e => setSocialLinks({...socialLinks, whatsapp: e.target.value})} placeholder="+212 600..." className="bg-card border-border text-foreground" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                  <Input type="email" value={socialLinks.email} onChange={e => setSocialLinks({...socialLinks, email: e.target.value})} placeholder="contact@..." className="bg-card border-border text-foreground" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-muted-foreground">Working Hours</label>
                  <Input value={socialLinks.workingHours} onChange={e => setSocialLinks({...socialLinks, workingHours: e.target.value})} placeholder="Mon-Fri: 09:00 - 18:00..." className="bg-card border-border text-foreground" />
                </div>
              </div>
              {contactStatus.message && (
                <p className={`text-sm ${contactStatus.isError ? 'text-red-500' : 'text-green-500'}`}>
                  {contactStatus.message}
                </p>
              )}
              <div className="flex justify-end pt-2">
                <Button type="submit" disabled={contactStatus.loading} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                  {contactStatus.loading ? 'Saving...' : 'Save Business Info'}
                </Button>
              </div>
            </form>

            <form onSubmit={handleSaveSocials} className="space-y-4 pt-4 border-t border-border">
              <h3 className="font-semibold text-lg text-foreground border-b border-border pb-2">Social Media Links</h3>
              <p className="text-sm text-muted-foreground mb-4">Leave a link completely empty to hide its icon from the footer.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Facebook URL</label>
                  <Input value={socialLinks.facebook} onChange={e => setSocialLinks({...socialLinks, facebook: e.target.value})} placeholder="https://facebook.com/..." className="bg-card border-border text-foreground" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Instagram URL</label>
                  <Input value={socialLinks.instagram} onChange={e => setSocialLinks({...socialLinks, instagram: e.target.value})} placeholder="https://instagram.com/..." className="bg-card border-border text-foreground" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">LinkedIn URL</label>
                  <Input value={socialLinks.linkedin} onChange={e => setSocialLinks({...socialLinks, linkedin: e.target.value})} placeholder="https://linkedin.com/..." className="bg-card border-border text-foreground" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">X (Twitter) URL</label>
                  <Input value={socialLinks.x} onChange={e => setSocialLinks({...socialLinks, x: e.target.value})} placeholder="https://x.com/..." className="bg-card border-border text-foreground" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">TikTok URL</label>
                  <Input value={socialLinks.tiktok} onChange={e => setSocialLinks({...socialLinks, tiktok: e.target.value})} placeholder="https://tiktok.com/@..." className="bg-card border-border text-foreground" />
                </div>
              </div>
              {socialStatus.message && (
                <p className={`text-sm ${socialStatus.isError ? 'text-red-500' : 'text-green-500'}`}>
                  {socialStatus.message}
                </p>
              )}
              <div className="flex justify-end pt-2">
                <Button type="submit" disabled={socialStatus.loading} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                  {socialStatus.loading ? 'Saving...' : 'Save Social Links'}
                </Button>
              </div>
            </form>
            <form onSubmit={handleSaveTracking} className="space-y-4 pt-4 border-t border-border">
              <h3 className="font-semibold text-lg text-foreground border-b border-border pb-2">Tracking & Analytics Scripts</h3>
              <p className="text-sm text-muted-foreground mb-4">Paste your measurement IDs or full script codes below.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Meta (Facebook) Pixel ID</label>
                  <Input value={trackingLinks.metaPixel} onChange={e => setTrackingLinks({...trackingLinks, metaPixel: e.target.value})} placeholder="e.g. 123456789012345" className="bg-card border-border text-foreground" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Google Analytics ID</label>
                  <Input value={trackingLinks.googleAnalytics} onChange={e => setTrackingLinks({...trackingLinks, googleAnalytics: e.target.value})} placeholder="e.g. G-ABC123XYZ" className="bg-card border-border text-foreground" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-muted-foreground">Google Tag Manager ID</label>
                  <Input value={trackingLinks.googleTagManager} onChange={e => setTrackingLinks({...trackingLinks, googleTagManager: e.target.value})} placeholder="e.g. GTM-ABC1234" className="bg-card border-border text-foreground" />
                </div>
              </div>
              {trackingStatus.message && (
                <p className={`text-sm ${trackingStatus.isError ? 'text-red-500' : 'text-green-500'}`}>
                  {trackingStatus.message}
                </p>
              )}
              <div className="flex justify-end pt-2">
                <Button type="submit" disabled={trackingStatus.loading} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                  {trackingStatus.loading ? 'Saving...' : 'Save Tracking Scripts'}
                </Button>
              </div>
            </form>
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
                  {appointmentsList.length > 0 ? appointmentsList.map((apt, i) => (
                    <tr key={apt.id} className={`border-b border-border hover:bg-foreground/5 transition-colors ${i === appointmentsList.length - 1 ? 'border-b-0' : ''}`}>
                      <td className="p-4">
                        <div className="font-medium text-foreground">{apt.time}</div>
                        <div className="text-xs text-muted-foreground">{new Date(apt.date).toLocaleDateString()}</div>
                      </td>
                      <td className="p-4 font-medium text-foreground">{apt.firstName} {apt.lastName}</td>
                      <td className="p-4">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">{apt.visaType}</Badge>
                      </td>
                      <td className="p-4 text-muted-foreground">-</td>
                      <td className="p-4">
                        <Badge variant="outline" className={`
                          ${apt.status === 'Confirmed' ? 'border-green-500/50 text-green-400 bg-green-500/10' : ''}
                          ${apt.status === 'Pending' ? 'border-amber-500/50 text-amber-400 bg-amber-500/10' : ''}
                        `}>
                          {apt.status}
                        </Badge>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan={5} className="text-center p-4 text-muted-foreground">No appointments found</td></tr>
                  )}
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
    <AdvancedSEOTool seoSettings={seoSettings} setSeoSettings={setSeoSettings} token={token} />
  )

  const renderServices = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-foreground">Services & Destinations</h1>
          <p className="text-muted-foreground mt-1">Manage agency services and destination options.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
          <Plus className="h-4 w-4" /> Add New
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Services List */}
        <Card className="glass-panel border-border h-[600px] flex flex-col">
          <CardHeader className="border-b border-border bg-foreground/5 shrink-0">
            <CardTitle className="text-lg font-display text-foreground flex justify-between">
              Our Services
              <Badge variant="outline" className="bg-primary/10 text-primary">{servicesData.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-auto flex-1">
            <div className="divide-y divide-border">
              {servicesData.map(s => (
                <div key={s.id} className="p-4 hover:bg-foreground/5 flex justify-between items-center transition-colors">
                  <div>
                    <h3 className="font-semibold text-foreground">{s.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">{s.description}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary"><Edit className="h-4 w-4"/></Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Destinations List */}
        <Card className="glass-panel border-border h-[600px] flex flex-col">
          <CardHeader className="border-b border-border bg-foreground/5 shrink-0">
            <CardTitle className="text-lg font-display text-foreground flex justify-between">
              Visa Destinations
              <Badge variant="outline" className="bg-primary/10 text-primary">{countriesData.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-auto flex-1">
            <div className="divide-y divide-border">
              {countriesData.map(c => (
                <div key={c.id} className="p-4 hover:bg-foreground/5 flex justify-between items-center transition-colors">
                  <div className="flex items-center gap-3">
                    <img src={c.image} alt={c.name} className="w-10 h-10 rounded-md object-cover" />
                    <div>
                      <h3 className="font-semibold text-foreground">{c.name}</h3>
                      <p className="text-xs text-muted-foreground">{c.type}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary"><Edit className="h-4 w-4"/></Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )

  const renderDocRules = () => {
    const destinations = countriesData.map(c => ({ id: c.id, name: c.name, visaTypes: c.visaTypes }))
    const selectedDest = destinations.find(d => d.id === docRuleForm.destinationId) || null
    const visaTypeOptions = selectedDest ? selectedDest.visaTypes.map(v => ({ id: v.id, name: v.name })) : []

    const parseLines = (value: string) =>
      value
        .split('\n')
        .map(v => v.trim())
        .filter(Boolean)

    const parseSources = (value: string) =>
      parseLines(value)
        .map(line => {
          const [title, url] = line.split('|').map(v => v.trim())
          if (!title || !url) return null
          return { title, url }
        })
        .filter(Boolean)

    const handleSaveTopOrigins = async () => {
      setOriginsLoading(true)
      setOriginsMessage({ message: '', isError: false })
      try {
        const topCodes = originsTopCodes
          .split(',')
          .map(s => s.trim().toUpperCase())
          .filter(Boolean)
        const res = await fetch('/api/origins', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ topCodes })
        })
        const data = await res.json() as any
        if (data.success) {
          setOriginsMessage({ message: 'Top origins updated', isError: false })
        } else {
          setOriginsMessage({ message: data.error || 'Failed to update origins', isError: true })
        }
      } catch (e) {
        setOriginsMessage({ message: 'Failed to update origins', isError: true })
      } finally {
        setOriginsLoading(false)
      }
    }

    const handleSaveRule = async () => {
      setDocRulesLoading(true)
      setDocRulesMessage({ message: '', isError: false })
      try {
        const payload = {
          destinationId: docRuleForm.destinationId,
          visaTypeId: docRuleForm.visaTypeId,
          originCountryCode: docRuleForm.originCountryCode,
          documents: parseLines(docRuleForm.documentsText),
          sources: parseSources(docRuleForm.sourcesText),
          active: docRuleForm.active,
          lastVerifiedAt: docRuleForm.lastVerifiedAt || new Date().toISOString()
        }

        const url = docRuleForm.id ? `/api/document-rules/${docRuleForm.id}` : '/api/document-rules'
        const method = docRuleForm.id ? 'PUT' : 'POST'

        const res = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify(payload)
        })
        const data = await res.json() as any
        if (!data.success) {
          setDocRulesMessage({ message: data.error || 'Failed to save rule', isError: true })
          return
        }

        const reload = await fetch('/api/document-rules/all', { headers: { 'Authorization': `Bearer ${token}` } })
        const reloadData = await reload.json() as any
        if (reloadData.success) {
          setDocRulesList(reloadData.data || [])
          setDocRulesMessage({ message: 'Rule saved', isError: false })
          setDocRuleForm({
            id: '',
            destinationId: '',
            visaTypeId: '',
            originCountryCode: '',
            documentsText: '',
            sourcesText: '',
            active: true,
            lastVerifiedAt: ''
          })
        } else {
          setDocRulesMessage({ message: 'Rule saved but reload failed', isError: true })
        }
      } catch (e) {
        setDocRulesMessage({ message: 'Failed to save rule', isError: true })
      } finally {
        setDocRulesLoading(false)
      }
    }

    const handleRefresh = async () => {
      setDocRulesLoading(true)
      setDocRulesMessage({ message: '', isError: false })
      try {
        const res = await fetch('/api/document-rules/all', { headers: { 'Authorization': `Bearer ${token}` } })
        const data = await res.json() as any
        if (data.success) setDocRulesList(data.data || [])
        else setDocRulesMessage({ message: data.error || 'Failed to load rules', isError: true })
      } catch (e) {
        setDocRulesMessage({ message: 'Failed to load rules', isError: true })
      } finally {
        setDocRulesLoading(false)
      }
    }

    const handleEditRule = (r: any) => {
      const docs = (() => {
        try { return JSON.parse(r.documents || '[]') } catch { return [] }
      })()
      const sources = (() => {
        try { return JSON.parse(r.sources || '[]') } catch { return [] }
      })()
      setDocRuleForm({
        id: r.id,
        destinationId: r.destinationId || '',
        visaTypeId: r.visaTypeId || '',
        originCountryCode: r.originCountryCode || '',
        documentsText: Array.isArray(docs) ? docs.join('\n') : '',
        sourcesText: Array.isArray(sources) ? sources.map((s: any) => `${s.title} | ${s.url}`).join('\n') : '',
        active: r.active === 1,
        lastVerifiedAt: r.lastVerifiedAt || ''
      })
    }

    const handleDeleteRule = async (id: string) => {
      setDocRulesLoading(true)
      setDocRulesMessage({ message: '', isError: false })
      try {
        const res = await fetch(`/api/document-rules/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        })
        const data = await res.json() as any
        if (!data.success) {
          setDocRulesMessage({ message: data.error || 'Failed to delete rule', isError: true })
          return
        }
        setDocRulesList(prev => prev.filter(r => r.id !== id))
        setDocRulesMessage({ message: 'Rule deleted', isError: false })
      } catch (e) {
        setDocRulesMessage({ message: 'Failed to delete rule', isError: true })
      } finally {
        setDocRulesLoading(false)
      }
    }

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold tracking-tight text-foreground">Documents Rules</h1>
            <p className="text-muted-foreground mt-1">Manage requirements by destination, visa type, and origin country.</p>
          </div>
          <Button
            variant="outline"
            className="glass text-foreground border-border hover:bg-foreground/5 gap-2"
            onClick={handleRefresh}
            disabled={docRulesLoading}
          >
            <RefreshCcw className="h-4 w-4" /> Refresh
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card className="glass-panel border-border">
              <CardHeader>
                <CardTitle className="text-lg font-display text-foreground">Top Origins</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input
                  value={originsTopCodes}
                  onChange={e => setOriginsTopCodes(e.target.value)}
                  placeholder="MA,DZ,TN,EG..."
                  className="bg-card border-border text-foreground"
                />
                {originsMessage.message && (
                  <p className={`text-sm ${originsMessage.isError ? 'text-red-500' : 'text-green-500'}`}>{originsMessage.message}</p>
                )}
                <Button
                  onClick={handleSaveTopOrigins}
                  disabled={originsLoading}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {originsLoading ? 'Saving...' : 'Save Top Origins'}
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-panel border-border">
              <CardHeader>
                <CardTitle className="text-lg font-display text-foreground">{docRuleForm.id ? 'Edit Rule' : 'New Rule'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Destination</label>
                  <select
                    value={docRuleForm.destinationId}
                    onChange={e => setDocRuleForm(prev => ({ ...prev, destinationId: e.target.value, visaTypeId: '' }))}
                    className="h-10 w-full rounded-md border border-border bg-card px-3 text-sm text-foreground"
                  >
                    <option value="">Select destination</option>
                    <option value="*">Any destination (*)</option>
                    {destinations.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Visa Type</label>
                  <select
                    value={docRuleForm.visaTypeId}
                    onChange={e => setDocRuleForm(prev => ({ ...prev, visaTypeId: e.target.value }))}
                    className="h-10 w-full rounded-md border border-border bg-card px-3 text-sm text-foreground"
                  >
                    <option value="">Select visa type</option>
                    <option value="*">Any visa type (*)</option>
                    {visaTypeOptions.map(v => (
                      <option key={v.id} value={v.id}>{v.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Origin (ISO code)</label>
                  <Input
                    value={docRuleForm.originCountryCode}
                    onChange={e => setDocRuleForm(prev => ({ ...prev, originCountryCode: e.target.value.toUpperCase() }))}
                    placeholder="MA or *"
                    className="bg-card border-border text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Documents (one per line)</label>
                  <textarea
                    value={docRuleForm.documentsText}
                    onChange={e => setDocRuleForm(prev => ({ ...prev, documentsText: e.target.value }))}
                    className="w-full min-h-[140px] rounded-md bg-card border border-border p-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Passport\nBank statement\nTravel insurance"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Official sources (Title | URL, one per line)</label>
                  <textarea
                    value={docRuleForm.sourcesText}
                    onChange={e => setDocRuleForm(prev => ({ ...prev, sourcesText: e.target.value }))}
                    className="w-full min-h-[120px] rounded-md bg-card border border-border p-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="France-Visas | https://france-visas.gouv.fr/"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-muted-foreground">Active</label>
                  <input
                    type="checkbox"
                    checked={docRuleForm.active}
                    onChange={e => setDocRuleForm(prev => ({ ...prev, active: e.target.checked }))}
                    className="h-4 w-4"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Last verified (ISO)</label>
                  <Input
                    value={docRuleForm.lastVerifiedAt}
                    onChange={e => setDocRuleForm(prev => ({ ...prev, lastVerifiedAt: e.target.value }))}
                    placeholder={new Date().toISOString()}
                    className="bg-card border-border text-foreground"
                  />
                </div>

                {docRulesMessage.message && (
                  <p className={`text-sm ${docRulesMessage.isError ? 'text-red-500' : 'text-green-500'}`}>{docRulesMessage.message}</p>
                )}

                <Button
                  onClick={handleSaveRule}
                  disabled={docRulesLoading || !docRuleForm.destinationId || !docRuleForm.visaTypeId || !docRuleForm.originCountryCode}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {docRulesLoading ? 'Saving...' : 'Save Rule'}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card className="glass-panel border-border">
              <CardHeader>
                <CardTitle className="text-lg font-display text-foreground">Rules</CardTitle>
              </CardHeader>
              <CardContent className="p-0 overflow-x-auto">
                <table className="w-full text-left text-sm text-muted-foreground">
                  <thead className="bg-foreground/5 border-b border-border">
                    <tr>
                      <th className="p-4 font-medium text-muted-foreground">Destination</th>
                      <th className="p-4 font-medium text-muted-foreground">Visa</th>
                      <th className="p-4 font-medium text-muted-foreground">Origin</th>
                      <th className="p-4 font-medium text-muted-foreground">Active</th>
                      <th className="p-4 font-medium text-muted-foreground text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(docRulesList || []).map((r: any, i: number) => (
                      <tr key={r.id} className={`border-b border-border hover:bg-foreground/5 transition-colors ${i === docRulesList.length - 1 ? 'border-b-0' : ''}`}>
                        <td className="p-4 text-foreground">{r.destinationId}</td>
                        <td className="p-4">{r.visaTypeId}</td>
                        <td className="p-4">{r.originCountryCode}</td>
                        <td className="p-4">
                          <Badge variant="outline" className={r.active === 1 ? 'border-green-500/50 text-green-400 bg-green-500/10' : 'border-red-500/50 text-red-400 bg-red-500/10'}>
                            {r.active === 1 ? 'Yes' : 'No'}
                          </Badge>
                        </td>
                        <td className="p-4 text-right flex justify-end gap-2">
                          <Button variant="ghost" size="sm" className="h-8 text-primary hover:bg-primary/10" onClick={() => handleEditRule(r)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 text-red-400 hover:bg-red-400/10" onClick={() => handleDeleteRule(r.id)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {!docRulesList?.length && (
                      <tr><td colSpan={5} className="text-center p-6 text-muted-foreground">{docRulesLoading ? 'Loading...' : 'No rules found'}</td></tr>
                    )}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    )
  }

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
            onClick={() => {setActiveTab('docRules'); setSelectedApp(null);}}
            className={`w-full justify-start ${activeTab === 'docRules' ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'}`}
          >
            <FileText className="mr-3 h-4 w-4" /> Documents Rules
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
        ) : activeTab === 'docRules' ? (
          renderDocRules()
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
