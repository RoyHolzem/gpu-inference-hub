'use client'

import { motion } from 'framer-motion'
import { Building2, ArrowLeft, Search } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import GPUCard from '@/components/GPUCard'
import { datacenterGPUs, mockPricing, modelRequirements } from '@/lib/gpu-data'

export default function EnterprisePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'vram' | 'performance'>('vram')
  const [currency, setCurrency] = useState<'$' | '€'>('$')

  const toggleCurrency = () => {
    setCurrency(currency === '$' ? '€' : '$')
  }

  const filteredGPUs = datacenterGPUs
    .filter(gpu => gpu.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'vram') return b.vram - a.vram
      if (sortBy === 'performance') return b.tflops_fp16 - a.tflops_fp16
      return 0
    })

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-surface rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3">
              <Building2 className="w-8 h-8 text-accent-purple" />
              <div>
                <h1 className="text-xl font-bold">Enterprise Use</h1>
                <p className="text-xs text-gray-500">Data Center GPUs (A100 to B200)</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleCurrency}
              className="px-3 py-1 rounded-lg text-sm font-mono transition-colors bg-surface border border-border hover:border-accent-purple"
            >
              {currency === '$' ? 'USD ($)' : 'EUR (€)'}
            </button>
            <span className="flex items-center gap-2 text-sm text-gray-400">
              <span className="w-2 h-2 rounded-full bg-accent-purple pulse-live" />
              {datacenterGPUs.length} GPUs
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search GPUs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-accent-purple transition-colors"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy('vram')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                sortBy === 'vram' ? 'bg-accent-purple text-white' : 'bg-surface border border-border'
              }`}
            >
              VRAM
            </button>
            <button
              onClick={() => setSortBy('performance')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                sortBy === 'performance' ? 'bg-accent-purple text-white' : 'bg-surface border border-border'
              }`}
            >
              Performance
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-xl p-6 mb-8"
        >
          <h3 className="text-lg font-semibold mb-4">Large Model Requirements</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-gray-400">Model</th>
                  <th className="text-left py-2 text-gray-400">Parameters</th>
                  <th className="text-left py-2 text-gray-400">VRAM (FP16)</th>
                  <th className="text-left py-2 text-gray-400">VRAM (INT4)</th>
                  <th className="text-left py-2 text-gray-400">Recommended</th>
                </tr>
              </thead>
              <tbody>
                {modelRequirements.slice(3).map((model) => (
                  <tr key={model.name} className="border-b border-border/50">
                    <td className="py-2 font-medium">{model.name}</td>
                    <td className="py-2 text-gray-400">{model.parameters}</td>
                    <td className="py-2 text-accent-purple">{model.vram_fp16} GB</td>
                    <td className="py-2 text-yellow-500">{model.vram_int4} GB</td>
                    <td className="py-2 text-gray-300">{model.recommendedGPU}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGPUs.map((gpu, index) => {
            const gpuPricing = mockPricing.filter(p => p.gpuId === gpu.id)
            return (
              <motion.div
                key={gpu.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <GPUCard gpu={gpu} pricing={gpuPricing} accentColor="purple" currency={currency} />
              </motion.div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
