import { api } from './api'
import { Portfolio, AddAssetRequest, DiversificationScore } from '@/types/portfolio'

export class PortfolioService {
  static async getPortfolios(): Promise<Portfolio[]> {
    try {
      const response = await api.get<Portfolio[]>('/portfolios')
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch portfolios')
    }
  }

  static async getPortfolio(id: number): Promise<Portfolio> {
    try {
      const response = await api.get<Portfolio>(`/portfolios/${id}`)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch portfolio')
    }
  }

  static async createPortfolio(name: string, description: string): Promise<Portfolio> {
    try {
      const response = await api.post<Portfolio>('/portfolios', {
        name,
        description,
      })
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create portfolio')
    }
  }

  static async addAsset(portfolioId: number, asset: AddAssetRequest): Promise<Portfolio> {
    try {
      const response = await api.post<Portfolio>(`/portfolios/${portfolioId}/assets`, asset)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to add asset')
    }
  }

  static async removeAsset(portfolioId: number, tickerSymbol: string): Promise<void> {
    try {
      await api.delete(`/portfolios/${portfolioId}/assets/${tickerSymbol}`)
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to remove asset')
    }
  }

  static async getDiversificationScore(portfolioId: number): Promise<DiversificationScore> {
    try {
      const response = await api.get<DiversificationScore>(`/portfolios/${portfolioId}/diversification-score`)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get diversification score')
    }
  }
}
