// API Integration for GPU Inference Hub
// All pricing data comes from live APIs - no mock data

import { GPUPricing } from './types'
import { useState, useEffect } from 'react'

const VAST_API_URL = process.env.NEXT_PUBLIC_VAST_API_URL || 'https://vast.ai/api/v0'
const RUNPOD_API_URL = process.env.NEXT_PUBLIC_RUNPOD_API_URL || 'https://api.runpod.io/graphql'
const HUGGINGFACE_API_URL = process.env.NEXT_PUBLIC_HUGGINGFACE_API_URL || 'https://huggingface.co/api'

// Hugging Face API - Get trending models
export async function fetchHuggingFaceModels() {
  try {
    // Get trending LLM models
    const response = await fetch(
      `${HUGGINGFACE_API_URL}/models?filter=text-generation&sort=downloads&direction=-1&limit=20`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      }
    )

    if (!response.ok) {
      console.error('Hugging Face API failed:', response.status)
      return []
    }

    const data = await response.json()
    return parseHuggingFaceData(data)
  } catch (error) {
    console.error('Hugging Face fetch error:', error)
    return []
  }
}

function parseHuggingFaceData(models: any[]) {
  return models
    .filter(model => model.pipeline_tag === 'text-generation' || model.tags?.includes('text-generation'))
    .map(model => {
      // Extract parameter count from model name or tags
      const params = extractParameterCount(model.modelId)
      
      return {
        id: model.modelId,
        name: model.modelId.split('/')[1] || model.modelId,
        provider: model.modelId.split('/')[0] || 'Unknown',
        parameters: params,
        downloads: formatNumber(model.downloads),
        trending: model.trending || false,
        tags: model.tags || [],
        lastUpdated: model.lastModified,
        huggingfaceId: model.modelId,
      }
    })
}

function extractParameterCount(modelId: string): string {
  const match = modelId.match(/(\d+)[BbMm]/)
  if (match) {
    const num = parseInt(match[1])
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}B`
    }
    return `${num}B`
  }
  return 'Unknown'
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(0)}M+`
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(0)}K+`
  }
  return num.toString()
}

// React hook for Hugging Face models
export function useHuggingFaceModels() {
  const [models, setModels] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    
    const fetchModels = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const data = await fetchHuggingFaceModels()
        
        if (mounted) {
          setModels(data)
          if (data.length === 0) {
            setError('Unable to fetch latest models from Hugging Face')
          }
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch models')
          setModels([])
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    fetchModels()
    
    // Refresh every 10 minutes
    const interval = setInterval(fetchModels, 10 * 60 * 1000)
    
    return () => {
      mounted = false
      clearInterval(interval)
    }
  }, [])

  return { models, loading, error }
}

// Vast.ai API
export async function fetchVastPricing(): Promise<GPUPricing[]> {
  try {
    const response = await fetch(`${VAST_API_URL}/bundles/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
    
    if (!response.ok) {
      console.error('Vast.ai API failed:', response.status)
      return []
    }
    
    const data = await response.json()
    return parseVastData(data)
  } catch (error) {
    console.error('Vast.ai fetch error:', error)
    return []
  }
}

function parseVastData(data: any[]): GPUPricing[] {
  const gpuMap: Record<string, string> = {
    'RTX 3060': 'rtx-3060',
    'RTX 3070': 'rtx-3070',
    'RTX 3080': 'rtx-3080',
    'RTX 3090': 'rtx-3090',
    'RTX 4060': 'rtx-4060',
    'RTX 4070': 'rtx-4070',
    'RTX 4070 Ti': 'rtx-4070ti',
    'RTX 4080': 'rtx-4080',
    'RTX 4090': 'rtx-4090',
    'RTX 5090': 'rtx-5090',
    'A100': 'a100-80gb',
    'A100-SXM': 'a100-80gb',
    'A100-PCIE': 'a100-40gb',
    'H100': 'h100-sxm',
    'H100-SXM': 'h100-sxm',
    'H100-PCIE': 'h100-pcie',
    'H200': 'h200',
    'B200': 'b200',
  }
  
  return (data || [])
    .filter((item: any) => item.gpu_name && item.dph_total)
    .map((item: any) => {
      const gpuName = Object.keys(gpuMap).find(key => 
        item.gpu_name.includes(key)
      )
      
      if (!gpuName) return null
      
      return {
        gpuId: gpuMap[gpuName],
        provider: 'vast' as const,
        pricePerHour: parseFloat(item.dph_total || 0),
        spotPrice: item.dph_total ? parseFloat(item.dph_total) * 0.7 : undefined,
        availability: getAvailability(item.num_gpus || 0),
        location: item.geolocation || 'Unknown',
        lastUpdated: new Date(),
      }
    })
    .filter(Boolean) as GPUPricing[]
}

function getAvailability(numGpus: number): 'high' | 'medium' | 'low' | 'unavailable' {
  if (numGpus >= 50) return 'high'
  if (numGpus >= 10) return 'medium'
  if (numGpus >= 1) return 'low'
  return 'unavailable'
}

// RunPod GraphQL API
export async function fetchRunPodPricing(): Promise<GPUPricing[]> {
  const query = `
    query {
      gpuTypes {
        id
        displayName
        memoryInGb
        securePrice
        communityPrice
        secureSpotPrice
        communitySpotPrice
        availability {
          gpuCount
        }
      }
    }
  `
  
  try {
    const response = await fetch(RUNPOD_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })
    
    if (!response.ok) {
      console.error('RunPod API failed:', response.status)
      return []
    }
    
    const data = await response.json()
    return parseRunPodData(data.data?.gpuTypes || [])
  } catch (error) {
    console.error('RunPod fetch error:', error)
    return []
  }
}

function parseRunPodData(gpuTypes: any[]): GPUPricing[] {
  const gpuMap: Record<string, string> = {
    'NVIDIA RTX 3060': 'rtx-3060',
    'NVIDIA RTX 3070': 'rtx-3070',
    'NVIDIA RTX 3080': 'rtx-3080',
    'NVIDIA RTX 3090': 'rtx-3090',
    'NVIDIA RTX 4060': 'rtx-4060',
    'NVIDIA RTX 4070': 'rtx-4070',
    'NVIDIA RTX 4070 Ti': 'rtx-4070ti',
    'NVIDIA RTX 4080': 'rtx-4080',
    'NVIDIA RTX 4090': 'rtx-4090',
    'NVIDIA RTX 5090': 'rtx-5090',
    'NVIDIA A100 80GB': 'a100-80gb',
    'NVIDIA A100 40GB': 'a100-40gb',
    'NVIDIA H100 80GB': 'h100-sxm',
    'NVIDIA H100': 'h100-pcie',
    'NVIDIA H200': 'h200',
    'NVIDIA B200': 'b200',
  }
  
  return gpuTypes
    .map((gpu: any) => {
      const gpuId = gpuMap[gpu.displayName]
      if (!gpuId) return null
      
      const price = gpu.securePrice || gpu.communityPrice || 0
      const spotPrice = gpu.secureSpotPrice || gpu.communitySpotPrice
      const availability = gpu.availability?.gpuCount > 10 ? 'high' : 
                          gpu.availability?.gpuCount > 0 ? 'medium' : 'low'
      
      if (price === 0) return null
      
      return {
        gpuId,
        provider: 'runpod' as const,
        pricePerHour: price,
        spotPrice: spotPrice || undefined,
        availability: availability as 'high' | 'medium' | 'low',
        location: 'Global',
        lastUpdated: new Date(),
      }
    })
    .filter(Boolean) as GPUPricing[]
}

// Combined fetch - returns empty array if both APIs fail
export async function fetchAllPricing(): Promise<GPUPricing[]> {
  const [vastPricing, runpodPricing] = await Promise.all([
    fetchVastPricing(),
    fetchRunPodPricing(),
  ])
  
  return [...vastPricing, ...runpodPricing]
}

// React hook for live pricing
export function useLivePricing() {
  const [pricing, setPricing] = useState<GPUPricing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    
    const fetchPricing = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const data = await fetchAllPricing()
        
        if (mounted) {
          setPricing(data)
          if (data.length === 0) {
            setError('No pricing data available')
          }
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch pricing')
          setPricing([])
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    fetchPricing()
    
    // Refresh every 5 minutes
    const interval = setInterval(fetchPricing, 5 * 60 * 1000)
    
    return () => {
      mounted = false
      clearInterval(interval)
    }
  }, [])

  return { pricing, loading, error }
}
