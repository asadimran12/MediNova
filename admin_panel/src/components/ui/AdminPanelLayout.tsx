"use client"

import { useState } from "react"
import { Sidebar } from "@/components/ui/Sidebar" // Ensure this path is correct
import { Menu, X } from "lucide-react"

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 1. The Sidebar Container */}
      {/* We use CSS classes to slide it in/out smoothly */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen bg-white border-r transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full overflow-hidden"
        }`}
      >
        <Sidebar />
      </aside>

      {/* 2. The Main Content Area */}
      <main
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* The Toggle Button Bar */}
        <div className="sticky top-0 z-30 flex h-16 items-center border-b bg-white px-6 shadow-sm">
          <button
            onClick={toggleSidebar}
            className="rounded-md p-2 hover:bg-gray-100 text-gray-600 focus:outline-none"
          >
            {isSidebarOpen ? (
                // Icon when sidebar is open (Optional: You can keep Menu for both)
                <Menu className="h-6 w-6" /> 
            ) : (
                <Menu className="h-6 w-6" />
            )}
          </button>
          
          <span className="ml-4 text-lg font-semibold text-gray-700">
             Dashboard Overview
          </span>
        </div>

        {/* The Actual Page Content */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}