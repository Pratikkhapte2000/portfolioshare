'use client'

import { useState } from 'react'
import { X, Search } from 'lucide-react'
import { PortfolioService } from '@/lib/portfolio'
import { StockService } from '@/lib/stock'
import { StockData } from '@/types/stock'

interface AddAssetModalProps {
  portfolioId: number
  onClose: () => void
  onAssetAdded: () => void
}

export default function AddAssetModal({ portfolioId, onClose, onAssetAdded }: AddAssetModalProps) {
  const [tickerSymbol, setTickerSymbol] = useState('')
  const [quantity, setQuantity] = useState('')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState('')
  const [stockData, setStockData] = useState<StockData | null>(null)

  const handleSearch = async () => {
    if (!tickerSymbol.trim()) return
    
    setIsSearching(true)
    setError('')
    
    try {
      const data = await StockService.getStockData(tickerSymbol.toUpperCase())
      setStockData(data)
      setPurchasePrice(data.price.toString())
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsSearching(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await PortfolioService.addAsset(portfolioId, {
        tickerSymbol: tickerSymbol.toUpperCase(),
        assetName: stockData?.name || tickerSymbol,
        quantity: parseFloat(quantity),
        purchasePrice: parseFloat(purchasePrice),
      })
      onAssetAdded()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Add Asset</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="tickerSymbol" className="block text-sm font-medium text-gray-700">
                Ticker Symbol
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  id="tickerSymbol"
                  required
                  className="flex-1 input rounded-r-none"
                  placeholder="e.g., AAPL"
                  value={tickerSymbol}
                  onChange={(e) => setTickerSymbol(e.target.value.toUpperCase())}
                />
                <button
                  type="button"
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="btn btn-secondary rounded-l-none border-l-0"
                >
                  {isSearching ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            
            {stockData && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm">
                  <div className="font-medium text-gray-900">{stockData.name}</div>
                  <div className="text-gray-600">Current Price: ${stockData.price.toFixed(2)}</div>
                </div>
              </div>
            )}
            
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                required
                min="0"
                step="0.000001"
                className="input mt-1"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-700">
                Purchase Price
              </label>
              <input
                type="number"
                id="purchasePrice"
                required
                min="0"
                step="0.01"
                className="input mt-1"
                placeholder="Enter purchase price"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
              />
            </div>
            
            {error && (
              <div className="text-danger-600 text-sm">
                {error}
              </div>
            )}
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary"
              >
                {isLoading ? 'Adding...' : 'Add Asset'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
