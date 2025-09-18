'use client'

import { Portfolio } from '@/types/portfolio'
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react'

interface PortfolioListProps {
  portfolios: Portfolio[]
  onPortfolioSelect: (portfolio: Portfolio) => void
  onPortfolioUpdate: () => void
}

export default function PortfolioList({ portfolios, onPortfolioSelect, onPortfolioUpdate }: PortfolioListProps) {
  if (portfolios.length === 0) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No portfolios</h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by creating a new portfolio.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {portfolios.map((portfolio) => (
        <div
          key={portfolio.id}
          onClick={() => onPortfolioSelect(portfolio)}
          className="card cursor-pointer hover:shadow-lg transition-shadow duration-200"
        >
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900">{portfolio.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{portfolio.description}</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Total Value</span>
              <span className="text-lg font-semibold text-gray-900">
                ${portfolio.totalValue.toLocaleString()}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Total Cost</span>
              <span className="text-sm text-gray-900">
                ${portfolio.totalCost.toLocaleString()}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Gain/Loss</span>
              <div className="flex items-center space-x-1">
                {portfolio.totalGainLoss >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-success-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-danger-500" />
                )}
                <span
                  className={`text-sm font-medium ${
                    portfolio.totalGainLoss >= 0 ? 'text-success-600' : 'text-danger-600'
                  }`}
                >
                  ${portfolio.totalGainLoss.toLocaleString()}
                </span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Assets</span>
              <span className="text-sm text-gray-900">
                {portfolio.assets.length} {portfolio.assets.length === 1 ? 'asset' : 'assets'}
              </span>
            </div>
            
            <div className="pt-2 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Return</span>
                <span
                  className={`text-sm font-medium ${
                    portfolio.totalGainLossPercentage >= 0 ? 'text-success-600' : 'text-danger-600'
                  }`}
                >
                  {portfolio.totalGainLossPercentage.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
