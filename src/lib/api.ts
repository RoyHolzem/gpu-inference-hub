// API integration module - currently using mock data
// This file can be expanded later with actual API integrations

export interface GPUPricing {
  gpuId: string
  provider: string
  pricePerHour: number
  spotPrice?: number
  availability: string
  location: string
  lastUpdated: Date
}

export interface NewsItem {
  id: string
  title: string
  content: string
  author?: string
  url?: string
  timestamp: Date
  tags: string[]
}
