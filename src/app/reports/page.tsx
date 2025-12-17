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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Download, Eye, Loader2, AlertCircle } from "lucide-react"

// Mock Data: Recent AI generated reports
const reports = [
  {
    id: "RPT-8832",
    patientName: "Ali Khan",
    type: "Diabetes Risk Analysis",
    date: "2024-12-14",
    status: "Completed",
    size: "2.4 MB",
  },
  {
    id: "RPT-8833",
    patientName: "Sara Ahmed",
    type: "Blood Glucose Trends",
    date: "2024-12-14",
    status: "Processing", // Shows AI is working
    size: "-",
  },
  {
    id: "RPT-8831",
    patientName: "Bilal Sheikh",
    type: "Dietary Recommendation",
    date: "2024-12-13",
    status: "Completed",
    size: "1.1 MB",
  },
  {
    id: "RPT-8830",
    patientName: "Fatima Bibi",
    type: "Lab Results Summary",
    date: "2024-12-12",
    status: "Failed", // Shows error handling
    size: "0 KB",
  },
]

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      
      {/* 1. Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Medical Reports</h2>
          <p className="text-muted-foreground">
            Access and manage AI-generated patient reports.
          </p>
        </div>
        <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export Log
        </Button>
      </div>

      {/* 2. Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Documents</CardTitle>
          <CardDescription>
            A list of the last 50 generated reports from MediNova.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Report ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Report Type</TableHead>
                <TableHead>Date Generated</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-500" />
                    {report.id}
                  </TableCell>
                  <TableCell>{report.patientName}</TableCell>
                  <TableCell>{report.type}</TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>
                    {/* Dynamic Status Badges */}
                    {report.status === "Completed" && (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Ready</Badge>
                    )}
                    {report.status === "Processing" && (
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 flex w-fit gap-1">
                        <Loader2 className="h-3 w-3 animate-spin" /> Generating
                      </Badge>
                    )}
                    {report.status === "Failed" && (
                      <Badge className="bg-red-100 text-red-700 hover:bg-red-100 flex w-fit gap-1">
                        <AlertCircle className="h-3 w-3" /> Error
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {report.status === "Completed" ? (
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4 text-gray-500" />
                        </Button>
                        <Button variant="outline" size="sm" className="h-8">
                            <Download className="mr-2 h-3 w-3" /> PDF
                        </Button>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">Unavailable</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}