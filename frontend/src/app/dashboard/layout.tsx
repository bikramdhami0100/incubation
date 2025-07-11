import React from 'react'
import DashboardProvider from './Provider'

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
        {children}
    </DashboardProvider>
  )
}

export default DashboardLayout