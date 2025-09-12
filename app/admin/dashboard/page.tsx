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
  AlertCircle,
  RefreshCcw,
  UserX,
  DollarSign
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

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
  refundId?: string
  refundDate?: string
  refundReason?: string
  refundAmount?: number
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
  duplicateEmails: Array<{email: string, count: number, registrations: Registration[]}>
  duplicatePaperIds: Array<{paperId: string, count: number, registrations: Registration[]}>
  refundedPayments: number
  totalRefundAmount: number
}

interface DetailViewProps {
  registration: Registration
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onRefund?: (registration: Registration) => void
}

interface RefundDialogProps {
  registration: Registration | null
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onRefundComplete: () => void
}

// USD to INR conversion rate (you should ideally fetch this from an API)
const USD_TO_INR_RATE = 87.5 // Update this rate as needed

// Currency conversion utility functions
const convertToINR = (amount: number, currency: string): number => {
  if (currency === 'USD') {
    return amount * USD_TO_INR_RATE
  }
  return amount
}

const formatCurrencyDisplay = (amount: number, currency: string): string => {
  const inrAmount = convertToINR(amount, currency)
  if (currency === 'USD') {
    return `₹${Math.round(inrAmount).toLocaleString()} (${amount} USD)`
  }
  return `₹${Math.round(inrAmount).toLocaleString()}`
}

const RefundDialog = ({ registration, isOpen, onOpenChange, onRefundComplete }: RefundDialogProps) => {
  const [loading, setLoading] = useState(false)
  const [reason, setReason] = useState("")
  const [pin, setPin] = useState("")
  const { toast } = useToast()

  const handleRefund = async () => {
    if (!registration || !pin) {
      toast({
        title: "Error",
        description: "Please enter admin PIN",
        variant: "destructive"
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/admin/refund', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pin,
          paymentId: registration.paymentId,
          registrationId: registration.registrationId,
          reason: reason || 'Admin initiated refund'
        })
      })

      const data = await response.json()

      if (response.ok) {
        const displayAmount = formatCurrencyDisplay(data.amount, registration.currency)
        toast({
          title: "Success",
          description: `Refund of ${displayAmount} processed successfully`
        })
        onRefundComplete()
        onOpenChange(false)
        setPin("")
        setReason("")
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to process refund",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process refund",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RefreshCcw className="w-5 h-5" />
            Process Refund
          </DialogTitle>
        </DialogHeader>
        
        {registration && (
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm"><strong>Registration ID:</strong> {registration.registrationId}</p>
              <p className="text-sm"><strong>Participant:</strong> {registration.participantName}</p>
              <p className="text-sm"><strong>Amount:</strong> {formatCurrencyDisplay(registration.calculatedFee, registration.currency)}</p>
              <p className="text-sm"><strong>Payment ID:</strong> {registration.paymentId}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="refund-reason">Refund Reason</Label>
              <Input
                id="refund-reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g., Duplicate registration, Cancelled event"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="refund-pin">Admin PIN *</Label>
              <Input
                id="refund-pin"
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter admin PIN"
              />
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                This action will process a full refund through Razorpay and update the registration status.
              </AlertDescription>
            </Alert>

            <div className="flex gap-2 pt-4">
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={loading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleRefund}
                disabled={loading || !pin}
                className="flex-1"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  `Refund ${formatCurrencyDisplay(registration.calculatedFee, registration.currency)}`
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

const DetailView = ({ registration, isOpen, onOpenChange, onRefund }: DetailViewProps) => {
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
                      <span>{formatCurrencyDisplay(registration.baseFee || registration.calculatedFee, registration.currency)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>GST (18%):</span>
                      <span>+{formatCurrencyDisplay(Math.round(registration.gstAmount), registration.currency)}</span>
                    </div>
                    <div className="border-t pt-1">
                      <div className="flex justify-between font-semibold">
                        <span>Total Amount:</span>
                        <span className="text-lg text-primary">
                          {formatCurrencyDisplay(registration.calculatedFee, registration.currency)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <Label className="text-sm font-medium text-gray-600">Registration Fee</Label>
                  <p className="text-2xl font-bold text-primary">
                    {formatCurrencyDisplay(registration.calculatedFee, registration.currency)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">No GST applicable (International)</p>
                </div>
              )}
              
              <div>
                <Label className="text-sm font-medium text-gray-600">Payment Status</Label>
                <div className="flex items-center gap-2">
                  {registration.paymentStatus === 'completed' ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : registration.paymentStatus === 'refunded' ? (
                    <RefreshCcw className="w-4 h-4 text-orange-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <Badge variant={
                    registration.paymentStatus === 'completed' ? 'default' : 
                    registration.paymentStatus === 'refunded' ? 'secondary' : 'destructive'
                  }>
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

              {registration.refundId && (
                <div className="bg-orange-50 p-3 rounded-lg border">
                  <Label className="text-sm font-medium text-orange-800">Refund Information</Label>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Refund ID:</span>
                      <span className="font-mono">{registration.refundId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Refund Amount:</span>
                      <span>{formatCurrencyDisplay(registration.refundAmount || 0, registration.currency)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Refund Date:</span>
                      <span>{registration.refundDate ? new Date(registration.refundDate).toLocaleDateString() : 'N/A'}</span>
                    </div>
                    {registration.refundReason && (
                      <div className="flex justify-between">
                        <span>Reason:</span>
                        <span>{registration.refundReason}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              <div>
                <Label className="text-sm font-medium text-gray-600">Registration Date</Label>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <p>{new Date(registration.registrationDate).toLocaleString()}</p>
                </div>
              </div>

              {/* Admin Actions */}
              {registration.paymentStatus === 'completed' && onRefund && (
                <div className="pt-4 border-t">
                  <Label className="text-sm font-medium text-gray-600">Admin Actions</Label>
                  <div className="mt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onRefund(registration)}
                      className="text-orange-600 border-orange-300 hover:bg-orange-50"
                    >
                      <RefreshCcw className="w-4 h-4 mr-2" />
                      Process Refund
                    </Button>
                  </div>
                </div>
              )}
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
                    GST of {formatCurrencyDisplay(Math.round(registration.gstAmount), registration.currency)} has been applied as per Indian tax regulations.
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
  const [refundDialogOpen, setRefundDialogOpen] = useState(false)
  const [refundTarget, setRefundTarget] = useState<Registration | null>(null)
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
    // Convert all amounts to INR for calculation
    const totalAmountInINR = data.allRegistrations
      .filter((reg: Registration) => reg.paymentStatus === 'completed')
      .reduce((sum: number, reg: Registration) => {
        const inrAmount = convertToINR(reg.calculatedFee, reg.currency)
        return sum + inrAmount
      }, 0)

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

    // Find duplicate emails and paper IDs
    const emailGroups = data.allRegistrations.reduce((acc: Record<string, Registration[]>, reg: Registration) => {
      if (!acc[reg.email]) acc[reg.email] = []
      acc[reg.email].push(reg)
      return acc
    }, {})

    const duplicateEmails = Object.entries(emailGroups)
      .filter(([_, registrations]) => (registrations as Registration[]).length > 1)
      .map(([email, registrations]) => ({ email, count: (registrations as Registration[]).length, registrations: registrations as Registration[] }))

    const paperIdGroups = data.allRegistrations.reduce((acc: Record<string, Registration[]>, reg: Registration) => {
      if (!acc[reg.paperId]) acc[reg.paperId] = []
      acc[reg.paperId].push(reg)
      return acc
    }, {})

    const duplicatePaperIds = Object.entries(paperIdGroups)
      .filter(([_, registrations]) => (registrations as Registration[]).length > 1)
      .map(([paperId, registrations]) => ({ paperId, count: (registrations as Registration[]).length, registrations: registrations as Registration[] }))

    // Calculate refund statistics (convert to INR)
    const refundedRegistrations = data.allRegistrations.filter((reg: Registration) => reg.paymentStatus === 'refunded')
    const refundedPayments = refundedRegistrations.length
    const totalRefundAmountInINR = refundedRegistrations.reduce((sum: number, reg: Registration) => {
      const inrAmount = convertToINR(reg.refundAmount || 0, reg.currency)
      return sum + inrAmount
    }, 0)

    return {
      ...data,
      totalAmount: Math.round(totalAmountInINR), // Override with INR converted amount
      nationalityBreakdown,
      paymentStatusBreakdown,
      presentationModeBreakdown,
      countryBreakdown,
      dailyRegistrations,
      duplicateEmails,
      duplicatePaperIds,
      refundedPayments,
      totalRefundAmount: Math.round(totalRefundAmountInINR) // Override with INR converted amount
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

  const handleRefund = (registration: Registration) => {
    setRefundTarget(registration)
    setRefundDialogOpen(true)
  }

  const handleRefundComplete = () => {
    refreshData()
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
              <p className="text-xs text-blue-600 mt-1">
                * All amounts displayed in INR (USD amounts converted at rate: 1 USD = ₹{USD_TO_INR_RATE})
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

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
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
              <CardTitle className="text-sm font-medium">Refunded</CardTitle>
              <RefreshCcw className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.refundedPayments}</div>
              <p className="text-xs text-muted-foreground">
                ₹{dashboardData.totalRefundAmount.toLocaleString()} refunded
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-red-600"></div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Duplicates Found</CardTitle>
              <UserX className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardData.duplicateEmails.length + dashboardData.duplicatePaperIds.length}
              </div>
              <p className="text-xs text-muted-foreground">
                {dashboardData.duplicateEmails.length} emails, {dashboardData.duplicatePaperIds.length} papers
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600"></div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="flex flex-wrap justify-between w-full gap-2 sm:gap-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="registrations">All Registrations</TabsTrigger>
            <TabsTrigger value="duplicates">Duplicates</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="refunds">Refunds</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
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
                            ) : status === 'refunded' ? (
                              <RefreshCcw className="w-4 h-4 text-orange-500" />
                            ) : (
                              <Clock className="w-4 h-4 text-yellow-500" />
                            )}
                            <span className="capitalize">{status}</span>
                          </div>
                          <Badge variant={
                            status === 'completed' ? 'default' : 
                            status === 'refunded' ? 'secondary' : 'destructive'
                          }>
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
                                <Badge variant={
                                  reg.paymentStatus === 'completed' ? 'default' : 
                                  reg.paymentStatus === 'refunded' ? 'secondary' : 'destructive'
                                } className="text-xs">
                                  {reg.paymentStatus}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{formatCurrencyDisplay(reg.calculatedFee, reg.currency)}</p>
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
                        <SelectItem value="refunded">Refunded</SelectItem>
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
                        <TableHead>Amount (INR)</TableHead>
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
                            {formatCurrencyDisplay(reg.calculatedFee, reg.currency)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {reg.paymentStatus === 'completed' ? (
                                <CheckCircle2 className="w-3 h-3 text-green-500" />
                              ) : reg.paymentStatus === 'refunded' ? (
                                <RefreshCcw className="w-3 h-3 text-orange-500" />
                              ) : (
                                <Clock className="w-3 h-3 text-yellow-500" />
                              )}
                              <Badge variant={
                                reg.paymentStatus === 'completed' ? 'default' : 
                                reg.paymentStatus === 'refunded' ? 'secondary' : 'destructive'
                              }>
                                {reg.paymentStatus}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">
                            {new Date(reg.registrationDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => viewRegistrationDetails(reg)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              {reg.paymentStatus === 'completed' && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleRefund(reg)}
                                  className="text-orange-600 border-orange-300 hover:bg-orange-50"
                                >
                                  <RefreshCcw className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="duplicates" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Duplicate Emails */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Duplicate Emails ({dashboardData.duplicateEmails.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData.duplicateEmails.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">No duplicate emails found</p>
                    ) : (
                      dashboardData.duplicateEmails.map(({ email, count, registrations }) => (
                        <div key={email} className="border rounded-lg p-3">
                          <div className="flex justify-between items-center mb-2">
                            <p className="font-medium text-sm">{email}</p>
                            <Badge variant="destructive">{count} registrations</Badge>
                          </div>
                          <div className="space-y-2">
                            {registrations.map(reg => (
                              <div key={reg._id} className="flex justify-between items-center text-xs bg-gray-50 p-2 rounded">
                                <div>
                                  <p className="font-medium">{reg.registrationId}</p>
                                  <p className="text-gray-600">{reg.participantName}</p>
                                </div>
                                <div className="text-right">
                                  <Badge variant={
                                    reg.paymentStatus === 'completed' ? 'default' : 
                                    reg.paymentStatus === 'refunded' ? 'secondary' : 'destructive'
                                  } className="text-xs">
                                    {reg.paymentStatus}
                                  </Badge>
                                  <p className="text-gray-500 mt-1">{formatCurrencyDisplay(reg.calculatedFee, reg.currency)}</p>
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => viewRegistrationDetails(reg)}
                                  className="ml-2"
                                >
                                  <Eye className="w-3 h-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Duplicate Paper IDs */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Duplicate Paper IDs ({dashboardData.duplicatePaperIds.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData.duplicatePaperIds.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">No duplicate paper IDs found</p>
                    ) : (
                      dashboardData.duplicatePaperIds.map(({ paperId, count, registrations }) => (
                        <div key={paperId} className="border rounded-lg p-3">
                          <div className="flex justify-between items-center mb-2">
                            <p className="font-medium text-sm font-mono">{paperId}</p>
                            <Badge variant="destructive">{count} registrations</Badge>
                          </div>
                          <div className="space-y-2">
                            {registrations.map(reg => (
                              <div key={reg._id} className="flex justify-between items-center text-xs bg-gray-50 p-2 rounded">
                                <div>
                                  <p className="font-medium">{reg.registrationId}</p>
                                  <p className="text-gray-600">{reg.participantName}</p>
                                  <p className="text-gray-500">{reg.email}</p>
                                </div>
                                <div className="text-right">
                                  <Badge variant={
                                    reg.paymentStatus === 'completed' ? 'default' : 
                                    reg.paymentStatus === 'refunded' ? 'secondary' : 'destructive'
                                  } className="text-xs">
                                    {reg.paymentStatus}
                                  </Badge>
                                  <p className="text-gray-500 mt-1">{formatCurrencyDisplay(reg.calculatedFee, reg.currency)}</p>
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => viewRegistrationDetails(reg)}
                                  className="ml-2"
                                >
                                  <Eye className="w-3 h-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue by Category */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Revenue by Category (INR)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(dashboardData.categoryBreakdown).map(([category, count]) => {
                      const categoryRevenue = dashboardData.allRegistrations
                        .filter(reg => reg.category === category && reg.paymentStatus === 'completed')
                        .reduce((sum, reg) => {
                          const inrAmount = convertToINR(reg.calculatedFee, reg.currency)
                          return sum + inrAmount
                        }, 0)
                      
                      const percentage = ((categoryRevenue / dashboardData.totalAmount) * 100).toFixed(1)
                      
                      return (
                        <div key={category} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="capitalize text-sm">{category.replace('-', ' ')}</span>
                            <span className="font-medium">₹{Math.round(categoryRevenue).toLocaleString()}</span>
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

          <TabsContent value="refunds" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <RefreshCcw className="w-4 h-4" />
                    Total Refunds
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.refundedPayments}</div>
                  <p className="text-sm text-gray-600">Refunded registrations</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Refund Amount
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{dashboardData.totalRefundAmount.toLocaleString()}</div>
                  <p className="text-sm text-gray-600">Total refunded (INR)</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Refund Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {((dashboardData.refundedPayments / dashboardData.totalRegistrations) * 100).toFixed(1)}%
                  </div>
                  <p className="text-sm text-gray-600">Of total registrations</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Refunded Registrations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Registration ID</TableHead>
                        <TableHead>Participant</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Original Amount</TableHead>
                        <TableHead>Refund Amount (INR)</TableHead>
                        <TableHead>Refund Date</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dashboardData.allRegistrations
                        .filter(reg => reg.paymentStatus === 'refunded')
                        .map((reg) => (
                          <TableRow key={reg._id} className="hover:bg-gray-50">
                            <TableCell className="font-mono text-sm">{reg.registrationId}</TableCell>
                            <TableCell className="font-medium">{reg.participantName}</TableCell>
                            <TableCell>{reg.email}</TableCell>
                            <TableCell>{formatCurrencyDisplay(reg.calculatedFee, reg.currency)}</TableCell>
                            <TableCell className="font-medium text-orange-600">
                              {formatCurrencyDisplay(reg.refundAmount || reg.calculatedFee, reg.currency)}
                            </TableCell>
                            <TableCell>
                              {reg.refundDate ? new Date(reg.refundDate).toLocaleDateString() : 'N/A'}
                            </TableCell>
                            <TableCell>
                              <span className="text-sm">{reg.refundReason || 'N/A'}</span>
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
                  {dashboardData.allRegistrations.filter(reg => reg.paymentStatus === 'refunded').length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No refunded registrations found
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Detail View Modal */}
        {selectedRegistration && (
          <DetailView
            registration={selectedRegistration}
            isOpen={detailViewOpen}
            onOpenChange={setDetailViewOpen}
            onRefund={handleRefund}
          />
        )}

        {/* Refund Dialog */}
        <RefundDialog
          registration={refundTarget}
          isOpen={refundDialogOpen}
          onOpenChange={setRefundDialogOpen}
          onRefundComplete={handleRefundComplete}
        />
      </div>
    </div>
  )
}