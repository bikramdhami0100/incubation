import React from 'react'
import UserProvider from './Provider'

function FWULayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <UserProvider>

      {children}
      </UserProvider>
    </div>
  )
}

export default FWULayout