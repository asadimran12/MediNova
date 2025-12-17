"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// 1. Define Data
const dataWeek = [
  { range: "18-30", patients: 12 },
  { range: "31-45", patients: 8 },
  { range: "46-60", patients: 5 },
  { range: "60+", patients: 2 },
]

const dataMonth = [
  { range: "18-30", patients: 45 },
  { range: "31-45", patients: 60 },
  { range: "46-60", patients: 30 },
  { range: "60+", patients: 20 },
]

const dataYear = [
  { range: "18-30", patients: 150 },
  { range: "31-45", patients: 230 },
  { range: "46-60", patients: 320 },
  { range: "60+", patients: 290 },
]

export function AgeGroupChart() {
  const [timeRange, setTimeRange] = React.useState("year")

  // 2. Switch Data based on selection
  const chartData = React.useMemo(() => {
    if (timeRange === "week") return dataWeek
    if (timeRange === "month") return dataMonth
    return dataYear
  }, [timeRange])

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Age Demographics</CardTitle>
          <CardDescription>New patients registered by age.</CardDescription>
        </div>
        
        {/* 3. Dropdown Menu */}
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[140px] rounded-lg">
            <SelectValue placeholder="This Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Last 7 Days</SelectItem>
            <SelectItem value="month">Last 30 Days</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="range" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: "#fff", borderRadius: "8px" }} />
              <Bar dataKey="patients" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}