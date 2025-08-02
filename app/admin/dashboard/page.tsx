"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  FileText, 
  Download,
  Eye,
  Search,
  Filter,
  RefreshCw,
  Calendar,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Loader2,
  BarChart3,
  PieChart,
  Activity,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react"

interface Registration {
  _id: string
  registrationId: string
  participantName: string
  email: string
  mobileNumber: string
  whatsappNumber: string
  country: string
  category: string
  ieeeStatus: string
  nationality: string
  paperId: string
  copyrightAgreement: string
  presentationMode: string
  baseFee: number
  gstAmount: number
  calculatedFee: number
  currency: string
  paymentStatus: string
  paymentId: string
  orderId: string
  registrationDate: string
  paymentProofUrl?: string
  ieeeProofUrl?: string
}

interface DashboardData {
  totalRegistrations: number
  completedPayments: number
  totalAmount: number
  totalGSTAmount: number
  totalBaseAmount: number
  categoryBreakdown: Record<string, number>
  ieeeBreakdown: Record<string, number>
  nationalityBreakdown: Record<string, number>
  paymentStatusBreakdown: Record<string, number>
  presentationModeBreakdown: Record<string, number>
  countryBreakdown: Record<string, number>
  gstBreakdown: Record<string, number>
  recentRegistrations: Registration[]
  allRegistrations: Registration[]
  dailyRegistrations: Record<string, number>
}

interface DetailViewProps {
  registration: Registration
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const DetailView = ({ registration, isOpen, onOpenChange }: DetailViewProps) => {
  const hasGST = registration.gstAmount && registration.gstAmount > 0
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Registration Details - {registration.registrationId}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-4 h-4" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Full Name</Label>
                  <p className="font-medium">{registration.participantName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Email</Label>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <a href={`mailto:${registration.email}`} className="text-blue-600 hover:underline">
                      {registration.email}
                    </a>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Mobile Number</Label>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <a href={`tel:${registration.mobileNumber}`} className="text-blue-600 hover:underline">
                      {registration.mobileNumber}
                    </a>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">WhatsApp Number</Label>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-green-500" />
                    <a href={`https://wa.me/${registration.whatsappNumber.replace(/\D/g, '')}`} 
                       target="_blank" rel="noopener noreferrer" 
                       className="text-green-600 hover:underline">
                      {registration.whatsappNumber}
                    </a>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Country</Label>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <p>{registration.country}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Registration Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Registration Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-sm font-medium text-gray-600">Category</Label>
                <Badge variant="outline" className="ml-2 capitalize">
                  {registration.category}
                </Badge>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">IEEE Member</Label>
                <Badge variant={registration.ieeeStatus === 'yes' ? 'default' : 'secondary'} className="ml-2">
                  {registration.ieeeStatus === 'yes' ? 'Yes' : 'No'}
                </Badge>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Nationality</Label>
                <Badge variant="outline" className="ml-2 capitalize">
                  {registration.nationality}
                </Badge>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Paper ID</Label>
                <p className="font-mono bg-gray-100 px-2 py-1 rounded text-sm inline-block">
                  {registration.paperId}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Copyright Agreement</Label>
                <Badge variant={registration.copyrightAgreement === 'yes' ? 'default' : 'destructive'} className="ml-2">
                  {registration.copyrightAgreement === 'yes' ? 'Completed' : 'Pending'}
                </Badge>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Presentation Mode</Label>
                <Badge variant="outline" className="ml-2 capitalize">
                  {registration.presentationMode}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information with GST Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {hasGST ? (
                <div className="bg-blue-50 p-3 rounded-lg border">
                  <Label className="text-sm font-medium text-gray-600">Fee Breakdown</Label>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Base Fee:</span>
                      <span>{registration.baseFee || registration.calculatedFee} {registration.currency}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>GST (18%):</span>
                      <span>+{Math.round(registration.gstAmount)} {registration.currency}</span>
                    </div>
                    <div className="border-t pt-1">
                      <div className="flex justify-between font-semibold">
                        <span>Total Amount:</span>
                        <span className="text-lg text-primary">
                          {registration.calculatedFee} {registration.currency}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <Label className="text-sm font-medium text-gray-600">Registration Fee</Label>
                  <p className="text-2xl font-bold text-primary">
                    {registration.calculatedFee} {registration.currency}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">No GST applicable (International)</p>
                </div>
              )}
              
              <div>
                <Label className="text-sm font-medium text-gray-600">Payment Status</Label>
                <div className="flex items-center gap-2">
                  {registration.paymentStatus === 'completed' ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <Badge variant={registration.paymentStatus === 'completed' ? 'default' : 'destructive'}>
                    {registration.paymentStatus}
                  </Badge>
                </div>
              </div>
              
              {registration.paymentId && (
                <div>
                  <Label className="text-sm font-medium text-gray-600">Payment ID</Label>
                  <p className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
                    {registration.paymentId}
                  </p>
                </div>
              )}
              
              {registration.orderId && (
                <div>
                  <Label className="text-sm font-medium text-gray-600">Order ID</Label>
                  <p className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
                    {registration.orderId}
                  </p>
                </div>
              )}
              
              <div>
                <Label className="text-sm font-medium text-gray-600">Registration Date</Label>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <p>{new Date(registration.registrationDate).toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {registration.paymentProofUrl ? (
                <div>
                  <Label className="text-sm font-medium text-gray-600">Payment Proof</Label>
                  <Button
                    size="sm"
                    variant="outline"
                    className="ml-2"
                    onClick={() => window.open(registration.paymentProofUrl, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Document
                  </Button>
                </div>
              ) : (
                <div>
                  <Label className="text-sm font-medium text-gray-600">Payment Proof</Label>
                  <p className="text-gray-500 text-sm">No document uploaded</p>
                </div>
              )}
              
              {registration.ieeeProofUrl ? (
                <div>
                  <Label className="text-sm font-medium text-gray-600">IEEE Membership Proof</Label>
                  <Button
                    size="sm"
                    variant="outline"
                    className="ml-2"
                    onClick={() => window.open(registration.ieeeProofUrl, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Document
                  </Button>
                </div>
              ) : registration.ieeeStatus === 'yes' ? (
                <div>
                  <Label className="text-sm font-medium text-gray-600">IEEE Membership Proof</Label>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                    <p className="text-yellow-600 text-sm">Document missing</p>
                  </div>
                </div>
              ) : (
                <div>
                  <Label className="text-sm font-medium text-gray-600">IEEE Membership Proof</Label>
                  <p className="text-gray-500 text-sm">Not applicable (Non-IEEE member)</p>
                </div>
              )}
              
              {hasGST && (
                <div className="bg-green-50 p-2 rounded border">
                  <Label className="text-sm font-medium text-green-800">GST Information</Label>
                  <p className="text-xs text-green-700 mt-1">
                    GST of {Math.round(registration.gstAmount)} {registration.currency} has been applied as per Indian tax regulations.
                    This registration serves as a GST invoice.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function AdminDashboard() {
  const [pin, setPin] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterPaymentStatus, setFilterPaymentStatus] = useState("all")
  const [filterNationality, setFilterNationality] = useState("all")
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null)
  const [detailViewOpen, setDetailViewOpen] = useState(false)
  const { toast } = useToast()

  const handleLogin = async () => {
    if (!pin) {
      toast({
        title: "Error",
        description: "Please enter the admin PIN",
        variant: "destructive"
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/admin/dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin })
      })

      const data = await response.json()

      if (response.ok) {
        setIsAuthenticated(true)
        setDashboardData(enrichDashboardData(data.data))
        toast({
          title: "Success",
          description: "Logged in successfully"
        })
      } else {
        toast({
          title: "Error",
          description: data.error || "Invalid PIN",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to authenticate",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const refreshData = async () => {
    setRefreshing(true)
    try {
      const response = await fetch('/api/admin/dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin })
      })

      const data = await response.json()

      if (response.ok) {
        setDashboardData(enrichDashboardData(data.data))
        toast({
          title: "Success",
          description: "Data refreshed successfully"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refresh data",
        variant: "destructive"
      })
    } finally {
      setRefreshing(false)
    }
  }

  const enrichDashboardData = (data: any): DashboardData => {
    // Add additional breakdowns
    const nationalityBreakdown = data.allRegistrations.reduce((acc: Record<string, number>, reg: Registration) => {
      acc[reg.nationality] = (acc[reg.nationality] || 0) + 1
      return acc
    }, {})

    const paymentStatusBreakdown = data.allRegistrations.reduce((acc: Record<string, number>, reg: Registration) => {
      acc[reg.paymentStatus] = (acc[reg.paymentStatus] || 0) + 1
      return acc
    }, {})

    const presentationModeBreakdown = data.allRegistrations.reduce((acc: Record<string, number>, reg: Registration) => {
      acc[reg.presentationMode] = (acc[reg.presentationMode] || 0) + 1
      return acc
    }, {})

    const countryBreakdown = data.allRegistrations.reduce((acc: Record<string, number>, reg: Registration) => {
      acc[reg.country] = (acc[reg.country] || 0) + 1
      return acc
    }, {})

    // Daily registrations for the last 7 days
    const dailyRegistrations: Record<string, number> = {}
    const last7Days = Array.from({length: 7}, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return date.toISOString().split('T')[0]
    })

    last7Days.forEach(date => dailyRegistrations[date] = 0)

    data.allRegistrations.forEach((reg: Registration) => {
      const regDate = new Date(reg.registrationDate).toISOString().split('T')[0]
      if (dailyRegistrations.hasOwnProperty(regDate)) {
        dailyRegistrations[regDate]++
      }
    })

    return {
      ...data,
      nationalityBreakdown,
      paymentStatusBreakdown,
      presentationModeBreakdown,
      countryBreakdown,
      dailyRegistrations
    }
  }

  const exportToCSV = async () => {
    if (!dashboardData) return

    setLoading(true)
    try {
      const response = await fetch('/api/admin/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin })
      })

      const data = await response.json()

      if (response.ok) {
        // Convert to CSV
        const headers = Object.keys(data.data[0]).join(',')
        const csvContent = [
          headers,
          ...data.data.map((row: any) => 
            Object.values(row).map(value => 
              typeof value === 'string' && value.includes(',') ? `"${value}"` : value
            ).join(',')
          )
        ].join('\n')

        const blob = new Blob([csvContent], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `resgenxai-registrations-${new Date().toISOString().split('T')[0]}.csv`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)

        toast({
          title: "Success",
          description: "Data exported successfully"
        })
      } else {
        throw new Error(data.error || 'Export failed')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export data",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredRegistrations = dashboardData?.allRegistrations.filter(reg => {
    const matchesSearch = reg.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.registrationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.paperId.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = filterCategory === "all" || reg.category === filterCategory
    const matchesPaymentStatus = filterPaymentStatus === "all" || reg.paymentStatus === filterPaymentStatus
    const matchesNationality = filterNationality === "all" || reg.nationality === filterNationality

    return matchesSearch && matchesCategory && matchesPaymentStatus && matchesNationality
  }) || []

  const viewRegistrationDetails = (registration: Registration) => {
    setSelectedRegistration(registration)
    setDetailViewOpen(true)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-900 to-secondary-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Admin Dashboard</CardTitle>
            <p className="text-gray-600">Enter PIN to access dashboard</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pin">Admin PIN</Label>
              <Input
                id="pin"
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter admin PIN"
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <Button 
              onClick={handleLogin} 
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Authenticating...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto" />
          <p className="mt-4 text-lg">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">ResGenXAI 2025</h1>
              <p className="text-gray-600">Conference Registration Dashboard</p>
              <p className="text-sm text-gray-500 mt-1">
                Last updated: {new Date().toLocaleString()}
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={refreshData} variant="outline" disabled={refreshing}>
                {refreshing ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Refresh
              </Button>
              <Button onClick={exportToCSV} variant="outline" disabled={loading}>
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Download className="w-4 h-4 mr-2" />
                )}
                Export CSV
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.totalRegistrations}</div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Payments</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.completedPayments}</div>
              <p className="text-xs text-muted-foreground">
                {((dashboardData.completedPayments / dashboardData.totalRegistrations) * 100).toFixed(1)}% completion rate
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-green-600"></div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{dashboardData.totalAmount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Avg: ₹{Math.round(dashboardData.totalAmount / dashboardData.completedPayments || 0).toLocaleString()} per registration
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600"></div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">IEEE Members</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardData.ieeeBreakdown['IEEE Members'] || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                {(((dashboardData.ieeeBreakdown['IEEE Members'] || 0) / dashboardData.totalRegistrations) * 100).toFixed(1)}% of total
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-purple-600"></div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-x-6">
  <TabsList className="flex flex-wrap justify-between w-full gap-2 sm:gap-4">
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="registrations">All Registrations</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    <TabsTrigger value="insights">Insights</TabsTrigger>
  </TabsList>



          <TabsContent value="overview" className="space-x-6">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Category Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-4 h-4" />
                    Category Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(dashboardData.categoryBreakdown).map(([category, count]) => {
                      const percentage = ((count / dashboardData.totalRegistrations) * 100).toFixed(1)
                      return (
                        <div key={category} className="flex justify-between items-center">
                          <span className="capitalize text-sm">{category.replace('-', ' ')}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <Badge variant="secondary">{count} ({percentage}%)</Badge>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Payment Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(dashboardData.paymentStatusBreakdown).map(([status, count]) => {
                      const percentage = ((count / dashboardData.totalRegistrations) * 100).toFixed(1)
                      return (
                        <div key={status} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            {status === 'completed' ? (
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                            ) : (
                              <Clock className="w-4 h-4 text-yellow-500" />
                            )}
                            <span className="capitalize">{status}</span>
                          </div>
                          <Badge variant={status === 'completed' ? 'default' : 'secondary'}>
                            {count} ({percentage}%)
                          </Badge>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Top Countries */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Top Countries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(dashboardData.countryBreakdown)
                      .sort(([,a], [,b]) => b - a)
                      .slice(0, 5)
                      .map(([country, count]) => (
                        <div key={country} className="flex justify-between items-center">
                          <span className="text-sm">{country}</span>
                          <Badge variant="outline">{count}</Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Registrations */}
              <Card className="xl:col-span-3">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Recent Registrations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData.recentRegistrations.slice(0, 5).map((reg) => (
                      <div key={reg._id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <div>
                              <p className="font-medium">{reg.participantName}</p>
                              <p className="text-sm text-gray-600">{reg.email}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {reg.category}
                                </Badge>
                                <Badge variant={reg.paymentStatus === 'completed' ? 'default' : 'secondary'} className="text-xs">
                                  {reg.paymentStatus}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{reg.calculatedFee} {reg.currency}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(reg.registrationDate).toLocaleDateString()}
                          </p>
                          <Button
                            size="sm"
                            variant="outline"
                            className="mt-2"
                            onClick={() => viewRegistrationDetails(reg)}
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="registrations" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search by name, email, registration ID, or paper ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="academician">Academician</SelectItem>
                        <SelectItem value="industry">Industry</SelectItem>
                        <SelectItem value="attendee-student">Attendee - Student</SelectItem>
                        <SelectItem value="attendee-academician">Attendee - Academician</SelectItem>
                        <SelectItem value="attendee-industry">Attendee - Industry</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={filterPaymentStatus} onValueChange={setFilterPaymentStatus}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Payment status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={filterNationality} onValueChange={setFilterNationality}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Nationality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="national">National</SelectItem>
                        <SelectItem value="international">International</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {(searchTerm || filterCategory !== "all" || filterPaymentStatus !== "all" || filterNationality !== "all") && (
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      Showing {filteredRegistrations.length} of {dashboardData.totalRegistrations} registrations
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setSearchTerm("")
                        setFilterCategory("all")
                        setFilterPaymentStatus("all")
                        setFilterNationality("all")
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Registrations Table */}
            <Card>
              <CardHeader>
                <CardTitle>All Registrations ({filteredRegistrations.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Registration ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Country</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>IEEE</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRegistrations.map((reg) => (
                        <TableRow key={reg._id} className="hover:bg-gray-50">
                          <TableCell className="font-mono text-sm">{reg.registrationId}</TableCell>
                          <TableCell className="font-medium">{reg.participantName}</TableCell>
                          <TableCell>{reg.email}</TableCell>
                          <TableCell>{reg.country}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize text-xs">
                              {reg.category.replace('-', ' ')}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={reg.ieeeStatus === 'yes' ? 'default' : 'secondary'}>
                              {reg.ieeeStatus === 'yes' ? 'Yes' : 'No'}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">
                            {reg.calculatedFee} {reg.currency}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {reg.paymentStatus === 'completed' ? (
                                <CheckCircle2 className="w-3 h-3 text-green-500" />
                              ) : (
                                <Clock className="w-3 h-3 text-yellow-500" />
                              )}
                              <Badge variant={reg.paymentStatus === 'completed' ? 'default' : 'destructive'}>
                                {reg.paymentStatus}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">
                            {new Date(reg.registrationDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => viewRegistrationDetails(reg)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue by Category */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Revenue by Category
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(dashboardData.categoryBreakdown).map(([category, count]) => {
                      const categoryRevenue = dashboardData.allRegistrations
                        .filter(reg => reg.category === category && reg.paymentStatus === 'completed')
                        .reduce((sum, reg) => sum + reg.calculatedFee, 0)
                      
                      const percentage = ((categoryRevenue / dashboardData.totalAmount) * 100).toFixed(1)
                      
                      return (
                        <div key={category} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="capitalize text-sm">{category.replace('-', ' ')}</span>
                            <span className="font-medium">₹{categoryRevenue.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-primary to-primary-600 h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500">{percentage}% of total revenue</p>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Nationality Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Nationality Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(dashboardData.nationalityBreakdown).map(([nationality, count]) => {
                      const percentage = ((count / dashboardData.totalRegistrations) * 100).toFixed(1)
                      return (
                        <div key={nationality} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${nationality === 'national' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                            <span className="capitalize">{nationality}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">{percentage}%</span>
                            <Badge variant="secondary">{count}</Badge>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Presentation Mode */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Presentation Mode
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(dashboardData.presentationModeBreakdown).map(([mode, count]) => {
                      const percentage = ((count / dashboardData.totalRegistrations) * 100).toFixed(1)
                      return (
                        <div key={mode} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${mode === 'online' ? 'bg-purple-500' : 'bg-orange-500'}`}></div>
                            <span className="capitalize">{mode}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">{percentage}%</span>
                            <Badge variant="secondary">{count}</Badge>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Daily Registrations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Daily Registrations (Last 7 Days)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(dashboardData.dailyRegistrations)
                      .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
                      .map(([date, count]) => (
                        <div key={date} className="flex justify-between items-center">
                          <span className="text-sm">{new Date(date).toLocaleDateString()}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ 
                                  width: `${Math.max((count / Math.max(...Object.values(dashboardData.dailyRegistrations))) * 100, 5)}%` 
                                }}
                              ></div>
                            </div>
                            <Badge variant="outline">{count}</Badge>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Key Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Key Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900">Registration Completion Rate</h4>
                    <p className="text-2xl font-bold text-blue-600">
                      {((dashboardData.completedPayments / dashboardData.totalRegistrations) * 100).toFixed(1)}%
                    </p>
                    <p className="text-sm text-blue-700">
                      {dashboardData.completedPayments} out of {dashboardData.totalRegistrations} registrations completed
                    </p>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900">Average Registration Fee</h4>
                    <p className="text-2xl font-bold text-green-600">
                      ₹{Math.round(dashboardData.totalAmount / dashboardData.completedPayments || 0).toLocaleString()}
                    </p>
                    <p className="text-sm text-green-700">Per completed registration</p>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-900">IEEE Membership Rate</h4>
                    <p className="text-2xl font-bold text-purple-600">
                      {(((dashboardData.ieeeBreakdown['IEEE Members'] || 0) / dashboardData.totalRegistrations) * 100).toFixed(1)}%
                    </p>
                    <p className="text-sm text-purple-700">
                      {dashboardData.ieeeBreakdown['IEEE Members'] || 0} IEEE members registered
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Action Items */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Action Items
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {dashboardData.totalRegistrations - dashboardData.completedPayments > 0 && (
                    <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-yellow-600 mt-1" />
                      <div>
                        <h4 className="font-medium text-yellow-900">Pending Payments</h4>
                        <p className="text-sm text-yellow-700">
                          {dashboardData.totalRegistrations - dashboardData.completedPayments} registrations have pending payments
                        </p>
                      </div>
                    </div>
                  )}

                  {dashboardData.allRegistrations.filter(reg => 
                    reg.ieeeStatus === 'yes' && !reg.ieeeProofUrl
                  ).length > 0 && (
                    <div className="flex items-start gap-2 p-3 bg-red-50 rounded-lg">
                      <XCircle className="w-4 h-4 text-red-600 mt-1" />
                      <div>
                        <h4 className="font-medium text-red-900">Missing IEEE Proofs</h4>
                        <p className="text-sm text-red-700">
                          {dashboardData.allRegistrations.filter(reg => 
                            reg.ieeeStatus === 'yes' && !reg.ieeeProofUrl
                          ).length} IEEE members haven't uploaded proof
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-medium text-green-900">All Systems Operational</h4>
                      <p className="text-sm text-green-700">
                        Registration system is working properly
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Detail View Modal */}
        {selectedRegistration && (
          <DetailView
            registration={selectedRegistration}
            isOpen={detailViewOpen}
            onOpenChange={setDetailViewOpen}
          />
        )}
      </div>
    </div>
  )
}