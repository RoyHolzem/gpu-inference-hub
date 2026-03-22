export interface GPU {
  id: string
  name: string
  vendor: 'nvidia'
  category: 'consumer' | 'datacenter'
  vram: number // GB
  vramType: string
  bandwidth: number // GB/s
  tflops_fp16: number
  tflops_fp8?: number
  tdp: number // Watts
  releaseYear: number
  msrp?: number
  architecture: string
  nvlink?: string
  multiGpu?: boolean
}

export interface GPUPricing {
  gpuId: string
  provider: 'vast' | 'runpod' | 'lambda' | 'aws' | 'azure' | 'gcp'
  pricePerHour: number
  spotPrice?: number
  availability: 'high' | 'medium' | 'low' | 'unavailable'
  location: string
  lastUpdated: Date
}

export interface ModelRequirement {
  name: string
  parameters: string
  vram_fp16: number
  vram_int4: number
  minGPU: string
  recommendedGPU: string
}

export interface DemandData {
  region: string
  gpuType: string
  demand: number // 0-100
  trend: 'up' | 'down' | 'stable'
}

export interface NewsItem {
  id: string
  source: 'twitter' | 'blog' | 'news'
  title: string
  content: string
  author?: string
  url?: string
  timestamp: Date
  tags: string[]
}
