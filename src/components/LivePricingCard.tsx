'use client'

import { motion } from 'framer-motion'
import { Zap, TrendingDown, Clock, MapPin } from 'lucide-react'
import { useState, useEffect } from 'react'
import { GPUPricing } from '@/lib/types'
import { formatPrice, Currency } from '@/lib/currency'

interface LivePricingCardProps {
  gpuName: string
  gpuId: string
  pricing: GPUPricing[]
  currency: Currency
}

export default function LivePricingCard({ gpuName, gpuId, pricing, currency }: LivePricingCardProps) {
  const [displayPricing, setDisplayPricing] = useState<GPUPricing[]>([])

  useEffect(() => {
    // Filter and sort pricing by best price
    const filtered = pricing
      .filter(p => p.gpuId === gpuId)
      .sort((a, b) => a.pricePerHour - b.pricePerHour)
    
    setDisplayPricing(filtered)
  }, [pricing, gpuId])

  if (displayPricing.length === 0) {
    return (
      <div className="bg-surface border border-border rounded-lg p-4 text-center">
        <div className="text-gray-500 text-sm mb-2">No live pricing available</div>
        <div className="text-2xl font-bold text-gray-600">{formatPrice(0, currency)}/hr</div>
      </div>
    )
  }

  const lowestPrice = displayPricing[0]
  const savings = lowestPrice.spotPrice 
    ? ((lowestPrice.pricePerHour - lowestPrice.spotPrice) / lowestPrice.pricePerHour * 100).toFixed(0)
    : null

  return (
    <div className="bg-surface border border-border rounded-lg p-4">
      {/* Best Price */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-400">Best Price</span>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              lowestPrice.provider === 'vast' 
                ? 'bg-accent-green/20 text-accent-green'
                : lowestPrice.provider === 'runpod'
                ? 'bg-accent-purple/20 text-accent-purple'
                : 'bg-accent-blue/20 text-accent-blue'
            }`}>
              {lowestPrice.provider === 'vast' ? 'Vast.ai' : 
               lowestPrice.provider === 'runpod' ? 'RunPod' : 
               lowestPrice.provider.toUpperCase()}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              lowestPrice.availability === 'high' ? 'bg-green-900/50 text-green-400' :
              lowestPrice.availability === 'medium' ? 'bg-yellow-900/50 text-yellow-400' :
              'bg-red-900/50 text-red-400'
            }`}>
              {lowestPrice.availability}
            </span>
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-accent-green">
            {formatPrice(lowestPrice.pricePerHour, currency)}
          </span>
          <span className="text-gray-500 text-sm">/hr</span>
        </div>
        
        {/* Spot Price */}
        {lowestPrice.spotPrice && lowestPrice.spotPrice > 0 && (
          <div className="flex items-center gap-2 mt-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="text-sm text-gray-400">
              Spot: <span className="text-yellow-500 font-semibold">{formatPrice(lowestPrice.spotPrice, currency)}/hr</span>
              <span className="text-green-500 ml-1">(-{savings}%)</span>
            </span>
          </div>
        )}
      </div>

      {/* All Providers */}
      {displayPricing.length > 1 && (
        <div className="space-y-2 pt-3 border-t border-border">
          {displayPricing.slice(1, 4).map((price, idx) => (
            <div key={`${price.provider}-${idx}`} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3 text-gray-500" />
                <span className="text-gray-400">{price.provider}</span>
                {price.location && (
                  <span className="text-gray-600">({price.location})</span>
                )}
              </div>
              <span className="font-mono">{formatPrice(price.pricePerHour, currency)}/hr</span>
            </div>
          ))}
        </div>
      )}

      {/* Last Updated */}
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border text-xs text-gray-500">
        <Clock className="w-3 h-3" />
        <span>Updated {new Date(lowestPrice.lastUpdated).toLocaleTimeString()}</span>
      </div>
    </div>
  )
}
