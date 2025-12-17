"use client"

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { 
  MoreHorizontal, 
  Download, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity 
} from "lucide-react"

// Mock Data: Recent Financial/System Activity
const transactions = [
  {
    id: "TRX-981",
    patient: "Ali Khan",
    service: "General Checkup",
    amount: "$50.00",
    date: "2024-12-14",
    status: "Completed",
  },
  {
    id: "TRX-982",
    patient: "Sara Ahmed",
    service: "Insulin Restock",
    amount: "$120.00",
    date: "2024-12-13",
    status: "Pending",
  },
  {
    id: "TRX-983",
    patient: "Usman Zafar",
    service: "Lab Test (HBA1C)",
    amount: "$85.00",
    date: "2024-12-12",
    status: "Completed",
  },
  {
    id: "TRX-984",
    patient: "Fatima Bibi",
    service: "Emergency Care",
    amount: "$300.00",
    date: "2024-12-10",
    status: "Failed",
  },
  {
    id: "TRX-985",
    patient: "Bilal Sheikh",
    service: "Consultation",
    amount: "$45.00",
    date: "2024-12-09",
    status: "Completed",
  },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* 1. Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">
            Overview of hospital performance and revenue.
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="mr-2 h-4 w-4" /> Export Report
        </Button>
      </div>

      {/* 2. Stats Cards (Replaces the Search Bar area) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 */}
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-muted-foreground">Total Revenue</span>
          </div>
          <div className="mt-2 text-2xl font-bold">$45,231.89</div>
          <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        </div>

        {/* Card 2 */}
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-muted-foreground">Active Patients</span>
          </div>
          <div className="mt-2 text-2xl font-bold">+2,350</div>
          <p className="text-xs text-muted-foreground">+180 new this month</p>
        </div>

        {/* Card 3 */}
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-orange-600" />
            <span className="text-sm font-medium text-muted-foreground">Appointments</span>
          </div>
          <div className="mt-2 text-2xl font-bold">+12,234</div>
          <p className="text-xs text-muted-foreground">+19% from last month</p>
        </div>

        {/* Card 4 */}
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-muted-foreground">Growth Rate</span>
          </div>
          <div className="mt-2 text-2xl font-bold">+12.5%</div>
          <p className="text-xs text-muted-foreground">+4% from last month</p>
        </div>
      </div>

      {/* 3. The Recent Transactions Table */}
      <div className="rounded-md border bg-white shadow-sm">
        <div className="p-4 border-b">
            <h3 className="font-semibold">Recent Financial Activity</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((trx) => (
              <TableRow key={trx.id}>
                <TableCell className="font-medium">{trx.id}</TableCell>
                <TableCell>{trx.patient}</TableCell>
                <TableCell>{trx.service}</TableCell>
                <TableCell>{trx.date}</TableCell>
                <TableCell className="font-bold text-gray-700">{trx.amount}</TableCell>
                <TableCell>
                  <Badge 
                    className={
                      trx.status === "Completed" ? "bg-green-100 text-green-700 hover:bg-green-100" :
                      trx.status === "Pending" ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100" :
                      "bg-red-100 text-red-700 hover:bg-red-100"
                    }
                  >
                    {trx.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Invoice</DropdownMenuItem>
                      <DropdownMenuItem>Print Receipt</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Refund</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}