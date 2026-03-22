import { GPUPricing } from './types'

import { useState, useEffect } from 'react'

const VAST_API_URL = process.env.NEXT_PUBLIC_VAST_API_URL || 'https://vast.ai/api/v0'
const RUNPOD_API_URL = process.env.NEXT_PUBLIC_RUNPOD_API_URL || 'https://api.runpod.io/graphql'
const TWITTER_API_URL = process.env.NEXT_PUBLIC_TWITTER_API_URL || 'https://api.twitter.com/2'
const UPDATE_INTERVAL = parseInt(process.env.NEXT_PUBLIC_UPDATE_INTERVAL || '300000') // 5 minutes

const CURRENCY = process.env.NEXT_PUBLIC_CURRENCY || 'USD'

const EUR_TO_USD = 1.08'

// Vast.ai API hook
export function useVastPricing() {
  const [data, setData] = useState<GPUPricing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  
  useEffect(() => {
    fetchVastData()
    const interval = setInterval(fetchVastData, updateInterval)
    
    return () => clearInterval(interval)
  }, [])
  
  const fetchVastData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`${VAST_API_URL}/bundles/`, {
        headers: {
          'Accept': 'application/json',
        },
      })
      
      if (!response.ok) throw new Error('Vast.ai API failed')
      
      const result = await response.json()
      
      // Parse Vast.ai response
      const parsed: GPUPricing[] = parseVastResponse(result)
      setData(parsed)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }
  
  return { data, loading, error }
}

