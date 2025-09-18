export interface Portfolio {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
  userId: number
  assets: PortfolioAsset[]
  totalValue: number
  totalCost: number
  totalGainLoss: number
  totalGainLossPercentage: number
}

export interface PortfolioAsset {
  id: number
  tickerSymbol: string
  assetName: string
  quantity: number
  purchasePrice: number
  currentPrice: number
  addedAt: string
  updatedAt: string
  totalValue: number
  totalCost: number
  gainLoss: number
  gainLossPercentage: number
  portfolioId?: number
}

export interface AddAssetRequest {
  tickerSymbol: string
  assetName: string
  quantity: number
  purchasePrice: number
}

export interface DiversificationScore {
  score: number
  rating: string
  description: string
  recommendations: string[]
  strengths: string[]
  weaknesses: string[]
}
