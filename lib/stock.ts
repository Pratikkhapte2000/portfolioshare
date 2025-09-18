import { api } from './api'
import { StockData } from '@/types/stock'

export class StockService {
  static async getStockData(symbol: string): Promise<StockData> {
    try {
      const response = await api.get<StockData>(`/stocks/${symbol}`)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch stock data')
    }
  }
}
