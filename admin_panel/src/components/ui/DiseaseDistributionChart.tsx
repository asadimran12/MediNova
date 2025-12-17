"use client"

import * as React from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

// 1. Define Data
const dataWeek = [
  { name: "Type 1", value: 5 },
  { name: "Type 2", value: 8 },
  { name: "Pre-Diabetic", value: 12 },
  { name: "Gestational", value: 1 },
]

const dataMonth = [
  { name: "Type 1", value: 45 },
  { name: "Type 2", value: 60 },
  { name: "Pre-Diabetic", value: 35 },
  { name: "Gestational", value: 10 },
]

const dataYear = [
  { name: "Type 1", value: 400 },
  { name: "Type 2", value: 300 },
  { name: "Pre-Diabetic", value: 300 },
  { name: "Gestational", value: 200 },
]

export function DiseaseDistributionChart() {
  const [timeRange, setTimeRange] = React.useState("year")

  // 2. Switch Data
  const chartData = React.useMemo(() => {
    if (timeRange === "week") return dataWeek
    if (timeRange === "month") return dataMonth
    return dataYear
  }, [timeRange])

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b mb-4">
        <CardTitle className="text-base font-medium">Patient Classification</CardTitle>
        
        {/* 3. Dropdown Menu */}
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[130px] h-8 text-xs">
            <SelectValue placeholder="This Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "#fff", borderRadius: "8px" }} />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}