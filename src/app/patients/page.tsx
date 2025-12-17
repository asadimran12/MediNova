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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Plus, Search } from "lucide-react"

// Mock Data: This simulates your database
const patients = [
  {
    id: "MED-001",
    name: "Ali Khan",
    email: "ali.khan@example.com",
    status: "Active",
    condition: "Type 2 Diabetes",
    lastVisit: "2024-12-10",
  },
  {
    id: "MED-002",
    name: "Sara Ahmed",
    email: "sara.ahmed@example.com",
    status: "Active",
    condition: "Pre-Diabetic",
    lastVisit: "2024-12-12",
  },
  {
    id: "MED-003",
    name: "Usman Zafar",
    email: "usman.z@example.com",
    status: "Inactive",
    condition: "Healthy",
    lastVisit: "2024-11-20",
  },
  {
    id: "MED-004",
    name: "Fatima Bibi",
    email: "fatima.b@example.com",
    status: "Critical",
    condition: "Type 1 Diabetes",
    lastVisit: "2024-12-14",
  },
  {
    id: "MED-005",
    name: "Bilal Sheikh",
    email: "bilal.s@example.com",
    status: "Active",
    condition: "Type 2 Diabetes",
    lastVisit: "2024-12-08",
  },
]

export default function PatientsPage() {
  return (
    <div className="space-y-6">
      {/* 1. Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Patients</h2>
          <p className="text-muted-foreground">
            Manage patient records and medical history.
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Add Patient
        </Button>
      </div>

      {/* 2. Search Bar (Visual only for now) */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-lg border w-full max-w-sm">
        <Search className="h-4 w-4 text-gray-500" />
        <input 
          placeholder="Search by name..." 
          className="outline-none text-sm w-full"
        />
      </div>

      {/* 3. The Patient Table */}
      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Visit</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell className="font-medium">{patient.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${patient.name}`} />
                      <AvatarFallback>{patient.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{patient.name}</span>
                      <span className="text-xs text-muted-foreground">{patient.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{patient.condition}</TableCell>
                <TableCell>
                  <Badge 
                    className={
                      patient.status === "Active" ? "bg-green-100 text-green-700 hover:bg-green-100" :
                      patient.status === "Critical" ? "bg-red-100 text-red-700 hover:bg-red-100" :
                      "bg-gray-100 text-gray-700 hover:bg-gray-100"
                    }
                  >
                    {patient.status}
                  </Badge>
                </TableCell>
                <TableCell>{patient.lastVisit}</TableCell>
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
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit Details</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Delete Patient</DropdownMenuItem>
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