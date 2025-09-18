'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { PortfolioService } from '@/lib/portfolio'

interface CreatePortfolioModalProps {
  onClose: () => void
  onPortfolioCreated: () => void
}

export default function CreatePortfolioModal({ onClose, onPortfolioCreated }: CreatePortfolioModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await PortfolioService.createPortfolio(name, description)
      onPortfolioCreated()
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
            <h3 className="text-lg font-medium text-gray-900">Create New Portfolio</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Portfolio Name
              </label>
              <input
                type="text"
                id="name"
                required
                className="input mt-1"
                placeholder="Enter portfolio name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                className="input mt-1"
                placeholder="Enter portfolio description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                {isLoading ? 'Creating...' : 'Create Portfolio'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
