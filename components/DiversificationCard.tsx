'use client'

import { DiversificationScore } from '@/types/portfolio'
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'

interface DiversificationCardProps {
  score: DiversificationScore | null
  isLoading: boolean
}

export default function DiversificationCard({ score, isLoading }: DiversificationCardProps) {
  if (isLoading) {
    return (
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-900">Diversification Score</h3>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      </div>
    )
  }

  if (!score) {
    return (
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-900">Diversification Score</h3>
        </div>
        <div className="text-center py-8">
          <AlertTriangle className="mx-auto h-8 w-8 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">Unable to calculate score</p>
        </div>
      </div>
    )
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success-600'
    if (score >= 60) return 'text-primary-600'
    if (score >= 40) return 'text-yellow-600'
    return 'text-danger-600'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-success-100'
    if (score >= 60) return 'bg-primary-100'
    if (score >= 40) return 'bg-yellow-100'
    return 'bg-danger-100'
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="text-lg font-semibold text-gray-900">Diversification Score</h3>
      </div>
      
      <div className="space-y-4">
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${getScoreBgColor(score.score)}`}>
            <span className={`text-2xl font-bold ${getScoreColor(score.score)}`}>
              {score.score.toFixed(0)}
            </span>
          </div>
          <div className="mt-2">
            <div className={`text-lg font-semibold ${getScoreColor(score.score)}`}>
              {score.rating}
            </div>
            <div className="text-sm text-gray-600">
              {score.description}
            </div>
          </div>
        </div>

        {score?.strengths?.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
              <CheckCircle className="h-4 w-4 text-success-500 mr-1" />
              Strengths
            </h4>
            <ul className="space-y-1">
              {score.strengths.map((strength, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <span className="text-success-500 mr-2">•</span>
                  {strength}
                </li>
              ))}
            </ul>
          </div>
        )}

        {score?.weaknesses?.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
              <AlertTriangle className="h-4 w-4 text-danger-500 mr-1" />
              Areas for Improvement
            </h4>
            <ul className="space-y-1">
              {score.weaknesses.map((weakness, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <span className="text-danger-500 mr-2">•</span>
                  {weakness}
                </li>
              ))}
            </ul>
          </div>
        )}

        {score?.recommendations?.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
              <TrendingUp className="h-4 w-4 text-primary-500 mr-1" />
              Recommendations
            </h4>
            <ul className="space-y-1">
              {score.recommendations.map((recommendation, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <span className="text-primary-500 mr-2">•</span>
                  {recommendation}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
