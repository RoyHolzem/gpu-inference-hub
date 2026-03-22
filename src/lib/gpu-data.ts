import { GPUPricing } from './types'

import { consumerGPUs, datacenterGPUs, mockPricing } from './gpu-data'

import { fetchVastPricing, fetchRunPodPricing } from './api'

export const personalGPUs = datacenterGPUs, mockPricing,