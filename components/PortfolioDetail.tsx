'use client'

import { useState, useEffect } from 'react'
import { Portfolio, DiversificationScore } from '@/types/portfolio'
import { ArrowLeft, Plus, TrendingUp, TrendingDown, BarChart3, Target } from 'lucide-react'
import AssetList from './AssetList'
import AddAssetModal from './AddAssetModal'
import DiversificationCard from './DiversificationCard'
import { PortfolioService } from '@/lib/portfolio'

interface PortfolioDetailProps {
  portfolio: Portfolio
  onBack: () => void
  onPortfolioUpdate: () => void
}

export default function PortfolioDetail({ portfolio, onBack, onPortfolioUpdate }: PortfolioDetailProps) {
  const [showAddAssetModal, setShowAddAssetModal] = useState(false)
  const [diversificationScore, setDiversificationScore] = useState<DiversificationScore | null>(null)
  const [isLoadingScore, setIsLoadingScore] = useState(false)

  useEffect(() => {
    loadDiversificationScore()
  }, [portfolio.id])

  const loadDiversificationScore = async () => {
    setIsLoadingScore(true)
    try {
      const score = await PortfolioService.getDiversificationScore(portfolio.id)
      setDiversificationScore(score)
    } catch (error) {
      console.error('Failed to load diversification score:', error)
    } finally {
      setIsLoadingScore(false)
    }
  }

  const handleAssetAdded = () => {
    setShowAddAssetModal(false)
    onPortfolioUpdate()
    loadDiversificationScore()
  }

  const handleAssetRemoved = () => {
    onPortfolioUpdate()
    loadDiversificationScore()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Portfolios</span>
        </button>
        
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{portfolio.name}</h1>
            <p className="mt-2 text-gray-600">{portfolio.description}</p>
          </div>
          
          <button
            onClick={() => setShowAddAssetModal(true)}
            className="btn btn-primary flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Asset</span>
          </button>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BarChart3 className="h-8 w-8 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Value</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${portfolio.totalValue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Target className="h-8 w-8 text-gray-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Cost</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${portfolio.totalCost.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {portfolio.totalGainLoss >= 0 ? (
                <TrendingUp className="h-8 w-8 text-success-600" />
              ) : (
                <TrendingDown className="h-8 w-8 text-danger-600" />
              )}
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Gain/Loss</p>
              <p className={`text-2xl font-semibold ${
                portfolio.totalGainLoss >= 0 ? 'text-success-600' : 'text-danger-600'
              }`}>
                ${portfolio.totalGainLoss.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BarChart3 className="h-8 w-8 text-gray-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Return</p>
              <p className={`text-2xl font-semibold ${
                portfolio.totalGainLossPercentage >= 0 ? 'text-success-600' : 'text-danger-600'
              }`}>
                {portfolio.totalGainLossPercentage.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Diversification Score and Assets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <AssetList
            assets={portfolio.assets}
            onAssetRemoved={handleAssetRemoved}
          />
        </div>
        
        <div>
          <DiversificationCard
            score={diversificationScore}
            isLoading={isLoadingScore}
          />
        </div>
      </div>

      {showAddAssetModal && (
        <AddAssetModal
          portfolioId={portfolio.id}
          onClose={() => setShowAddAssetModal(false)}
          onAssetAdded={handleAssetAdded}
        />
      )}
    </div>
  )
}
