'use client'

import { PortfolioAsset } from '@/types/portfolio'
import { TrendingUp, TrendingDown, Trash2, BarChart3 } from 'lucide-react'
import { PortfolioService } from '@/lib/portfolio'

interface AssetListProps {
  assets: PortfolioAsset[]
  onAssetRemoved: () => void
}

export default function AssetList({ assets, onAssetRemoved }: AssetListProps) {
  const handleRemoveAsset = async (tickerSymbol: string, portfolioId: number) => {
    if (window.confirm(`Are you sure you want to remove ${tickerSymbol} from this portfolio?`)) {
      try {
        await PortfolioService.removeAsset(portfolioId, tickerSymbol)
        onAssetRemoved()
      } catch (error) {
        console.error('Failed to remove asset:', error)
        alert('Failed to remove asset. Please try again.')
      }
    }
  }

  if (assets.length === 0) {
    return (
      <div className="card">
        <div className="text-center py-8">
          <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No assets</h3>
          <p className="mt-1 text-sm text-gray-500">
            Add assets to start tracking your portfolio.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="text-lg font-semibold text-gray-900">Assets</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Symbol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Purchase Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gain/Loss
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {assets.map((asset) => (
              <tr key={asset.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {asset.tickerSymbol}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {asset.assetName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {asset.quantity.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${asset.purchasePrice.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${asset.currentPrice.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${asset.totalValue.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center space-x-1">
                    {asset.gainLoss >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-success-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-danger-500" />
                    )}
                    <span
                      className={`font-medium ${
                        asset.gainLoss >= 0 ? 'text-success-600' : 'text-danger-600'
                      }`}
                    >
                      ${asset.gainLoss.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {asset.gainLossPercentage.toFixed(2)}%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => handleRemoveAsset(asset.tickerSymbol, asset.portfolioId || 0)}
                    className="text-danger-600 hover:text-danger-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
