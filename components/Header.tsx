'use client'

import { User } from '@/types/user'
import { LogOut, User as UserIcon } from 'lucide-react'

interface HeaderProps {
  user: User
  onLogout: () => void
}

export default function Header({ user, onLogout }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Portfolio Tracker
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <UserIcon className="h-4 w-4" />
              <span>{user.username}</span>
            </div>
            
            <button
              onClick={onLogout}
              className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
