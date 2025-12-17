"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const data7Days = [
  { date: "Mon", highRisk: 5, lowRisk: 12 },
  { date: "Tue", highRisk: 8, lowRisk: 15 },
  { date: "Wed", highRisk: 12, lowRisk: 8 },
  { date: "Thu", highRisk: 7, lowRisk: 18 },
  { date: "Fri", highRisk: 15, lowRisk: 22 },
  { date: "Sat", highRisk: 4, lowRisk: 10 },
  { date: "Sun", highRisk: 6, lowRisk: 8 },
]

const data30Days = [
  { date: "Week 1", highRisk: 45, lowRisk: 120 },
  { date: "Week 2", highRisk: 38, lowRisk: 140 },
  { date: "Week 3", highRisk: 55, lowRisk: 110 },
  { date: "Week 4", highRisk: 42, lowRisk: 160 },
]

const dataYear = [
  { date: "Jan", highRisk: 120, lowRisk: 400 },
  { date: "Feb", highRisk: 180, lowRisk: 450 },
  { date: "Mar", highRisk: 150, lowRisk: 550 },
  { date: "Apr", highRisk: 250, lowRisk: 500 },
  { date: "May", highRisk: 320, lowRisk: 600 },
  { date: "Jun", highRisk: 280, lowRisk: 750 },
  { date: "Jul", highRisk: 220, lowRisk: 700 },
  { date: "Aug", highRisk: 190, lowRisk: 680 },
  { date: "Sep", highRisk: 210, lowRisk: 720 },
  { date: "Oct", highRisk: 300, lowRisk: 800 },
  { date: "Nov", highRisk: 280, lowRisk: 850 },
  { date: "Dec", highRisk: 350, lowRisk: 900 },
]

export function PatientRiskChart() {
  const [timeRange, setTimeRange] = React.useState("year")

  const chartData = React.useMemo(() => {
    if (timeRange === "7d") return data7Days
    if (timeRange === "30d") return data30Days
    return dataYear
  }, [timeRange])

  return (
    <Card className="col-span-4 h-full shadow-sm">
      {/* 1. Compact Header */}
      <CardHeader className="flex flex-row items-center justify-between border-b px-4 py-3">
        <div className="grid gap-1">
          <CardTitle className="text-sm font-medium">Diabetic Risk Trends</CardTitle>
          <CardDescription className="text-xs">
            Risk analysis per period
          </CardDescription>
        </div>

        {/* Smaller Dropdown */}
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[110px] h-7 text-xs rounded-md border-gray-200">
            <SelectValue placeholder="This Year" />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="7d">7 Days</SelectItem>
            <SelectItem value="30d">30 Days</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      {/* 2. Reduced Height Container */}
      <CardContent className="p-4">
        <div className="h-[200px] w-full"> 
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="fillHigh" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillLow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tickLine={false} 
                axisLine={false} 
                tickMargin={8} 
                minTickGap={32}
                fontSize={10} // Smaller font for axis
                stroke="#888888" 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#fff", 
                  borderRadius: "6px", 
                  fontSize: "12px", // Compact tooltip
                  padding: "8px",
                  border: "1px solid #e5e7eb" 
                }}
              />
              
              <Area
                dataKey="highRisk"
                type="natural"
                fill="url(#fillHigh)"
                fillOpacity={0.4}
                stroke="#ef4444"
                strokeWidth={2}
                stackId="a"
                name="High Risk"
              />
              <Area
                dataKey="lowRisk"
                type="natural"
                fill="url(#fillLow)"
                fillOpacity={0.4}
                stroke="#22c55e"
                strokeWidth={2}
                stackId="a"
                name="Healthy"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}