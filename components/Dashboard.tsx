'use client'

import { useState } from 'react'
import { Portfolio } from '@/types/portfolio'
import PortfolioList from './PortfolioList'
import PortfolioDetail from './PortfolioDetail'
import CreatePortfolioModal from './CreatePortfolioModal'
import { Plus } from 'lucide-react'

interface DashboardProps {
  portfolios: Portfolio[]
  onPortfolioUpdate: () => void
}

export default function Dashboard({ portfolios, onPortfolioUpdate }: DashboardProps) {
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const handlePortfolioSelect = (portfolio: Portfolio) => {
    setSelectedPortfolio(portfolio)
  }

  const handlePortfolioCreated = () => {
    setShowCreateModal(false)
    onPortfolioUpdate()
  }

  const handleBackToList = () => {
    setSelectedPortfolio(null)
  }

  if (selectedPortfolio) {
    return (
      <PortfolioDetail
        portfolio={selectedPortfolio}
        onBack={handleBackToList}
        onPortfolioUpdate={onPortfolioUpdate}
      />
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Your Portfolios</h2>
          <p className="mt-2 text-gray-600">
            Manage and track your financial investments
          </p>
        </div>
        
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Create Portfolio</span>
        </button>
      </div>

      <PortfolioList
        portfolios={portfolios}
        onPortfolioSelect={handlePortfolioSelect}
        onPortfolioUpdate={onPortfolioUpdate}
      />

      {showCreateModal && (
        <CreatePortfolioModal
          onClose={() => setShowCreateModal(false)}
          onPortfolioCreated={handlePortfolioCreated}
        />
      )}
    </div>
  )
}
