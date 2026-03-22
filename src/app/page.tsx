'use client'

import { motion } from 'framer-motion'
import { Cpu, TrendingUp, Zap, Star, ChevronRight, RefreshCw } from 'lucide-react'
import { useState, useEffect } from 'react'
import { consumerGPUs, getCompatibleModels, getModelCompatibility, popularModels } from '@/lib/gpu-data'
import { useLivePricing } from '@/lib/api'
import { GPU } from '@/lib/types'
import { Currency } from '@/lib/currency'
import TwitterFeed from '@/components/TwitterFeed'
import LivePricingCard from '@/components/LivePricingCard'

export default function Home() {
  const [selectedGPU, setSelectedGPU] = useState<GPU | null>(null)
  const [showModels, setShowModels] = useState(false)
  const [currency, setCurrency] = useState<Currency>('EUR')
  const { pricing, loading, error } = useLivePricing()

  const compatibleModels = selectedGPU ? getCompatibleModels(selectedGPU.vram) : []

  const handleGPUClick = (gpu: GPU) => {
    setSelectedGPU(gpu)
    setShowModels(true)
  }

  const toggleCurrency = () => {
    setCurrency(currency === 'USD' ? 'EUR' : 'USD')
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Cpu className="w-8 h-8 text-accent-green" />
            <span className="text-xl font-bold">GPU Inference Hub</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Currency Toggle */}
            <button
              onClick={toggleCurrency}
              className="px-3 py-1 rounded-lg text-sm font-mono transition-colors bg-surface border border-border hover:border-accent-green"
            >
              {currency === 'USD' ? 'USD ($)' : 'EUR (€)'}
            </button>
            
            {/* Live Indicator */}
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-accent-green pulse-live" />
              <span className="text-gray-400">Live Data</span>
            </div>

            {/* Refresh Button */}
            <button 
              onClick={() => window.location.reload()}
              className="p-2 hover:bg-surface rounded-lg transition-colors"
              title="Refresh pricing"
            >
              <RefreshCw className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Which GPU for Which Model?</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Select your GPU. See which LLMs you can run locally. Live pricing from Vast.ai & RunPod.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Left Column - GPU Selection & Models (3 cols) */}
            <div className="lg:col-span-3">
              {/* GPU Selection Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold mb-2">Select Your GPU</h2>
                <p className="text-gray-400 mb-4">Click on a GPU to see compatible models and live pricing</p>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
                {consumerGPUs.map((gpu, index) => (
                  <motion.div
                    key={gpu.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleGPUClick(gpu)}
                    className={`
                      relative cursor-pointer transition-all duration-300
                      ${selectedGPU?.id === gpu.id 
                        ? 'ring-2 ring-accent-green scale-105' 
                        : 'hover:scale-105'}
                    `}
                  >
                    <div className="bg-gradient-to-br from-card to-surface border border-border rounded-xl p-6 h-full">
                      {/* GPU Icon */}
                      <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-accent-green/10 flex items-center justify-center">
                        <Cpu className="w-8 h-8 text-accent-green" />
                      </div>

                      {/* GPU Name */}
                      <h3 className="text-center font-bold mb-2">{gpu.name}</h3>

                      {/* Specs */}
                      <div className="text-center text-sm text-gray-400 space-y-1">
                        <div className="font-semibold text-accent-green">{gpu.vram} GB</div>
                        <div>{gpu.architecture}</div>
                        <div className="text-xs">{gpu.releaseYear}</div>
                      </div>

                      {/* Live Price Badge */}
                      {pricing.length > 0 && (
                        <div className="mt-3 text-center">
                          <div className="text-xs text-gray-500 mb-1">From</div>
                          <div className="text-sm font-mono text-accent-green">
                            {(() => {
                              const gpuPricing = pricing.filter(p => p.gpuId === gpu.id)
                              if (gpuPricing.length > 0) {
                                const lowest = gpuPricing.reduce((min, p) => 
                                  p.pricePerHour < min.pricePerHour ? p : min
                                )
                                const price = currency === 'EUR' 
                                  ? (lowest.pricePerHour * 0.93).toFixed(2)
                                  : lowest.pricePerHour.toFixed(2)
                                return `${currency === 'EUR' ? '€' : '$'}${price}/hr`
                              }
                              return '—'
                            })()}
                          </div>
                        </div>
                      )}

                      {/* Performance Badge */}
                      {gpu.id === 'rtx-5090' && (
                        <div className="absolute -top-2 -right-2 bg-accent-green text-black text-xs px-2 py-1 rounded-full font-bold">
                          FASTEST
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Model Compatibility Section */}
              {showModels && selectedGPU && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-16"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold">
                        Models for {selectedGPU.name}
                      </h2>
                      <p className="text-gray-400">
                        {selectedGPU.vram} GB VRAM • {compatibleModels.length} compatible models
                      </p>
                    </div>
                    <button
                      onClick={() => setShowModels(false)}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      Clear Selection
                    </button>
                  </div>

                  {/* Live Pricing Card */}
                  {pricing.length > 0 && (
                    <div className="mb-6">
                      <LivePricingCard 
                        gpuName={selectedGPU.name}
                        gpuId={selectedGPU.id}
                        pricing={pricing}
                        currency={currency}
                      />
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {compatibleModels.map((model, index) => {
                      const compatibility = getModelCompatibility(model, selectedGPU.vram)
                      
                      return (
                        <motion.div
                          key={model.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="bg-card border border-border rounded-xl p-6"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-bold mb-1">{model.name}</h3>
                              <p className="text-sm text-gray-400">{model.provider}</p>
                            </div>
                            {model.trending && (
                              <Star className="w-5 h-5 text-yellow-500 fill-current" />
                            )}
                          </div>

                          <div className="flex items-center gap-3 mb-4">
                            <span className="text-xs px-2 py-1 rounded-full bg-accent-green/20 text-accent-green">
                              {model.parameters}
                            </span>
                            <span className="text-xs px-2 py-1 rounded-full bg-accent-purple/20 text-accent-purple">
                              {model.category}
                            </span>
                          </div>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-400">VRAM Required</span>
                              <span className="font-mono">
                                {compatibility.precision === 'FP16' 
                                  ? `${model.vramRequired.fp16} GB` 
                                  : `${model.vramRequired.int4} GB`}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-400">Precision</span>
                              <span className={`font-semibold ${
                                compatibility.precision === 'FP16' ? 'text-accent-green' : 'text-yellow-500'
                              }`}>
                                {compatibility.precision}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-400">Quality</span>
                              <span>{compatibility.quality}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-400">Downloads</span>
                              <span>{model.downloads}</span>
                            </div>
                          </div>

                          <a
                            href={`https://huggingface.co/${model.huggingfaceId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-2 bg-surface border border-border rounded-lg hover:border-accent-green transition-colors text-sm"
                          >
                            View on Hugging Face
                            <ChevronRight className="w-4 h-4" />
                          </a>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              )}

              {/* All Models (if no GPU selected) */}
              {!showModels && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-16"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold">Popular Models</h2>
                      <p className="text-gray-400">Latest from Hugging Face, Llama, and more</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {popularModels.slice(0, 9).map((model, index) => (
                      <motion.div
                        key={model.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-card border border-border rounded-xl p-6"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-bold mb-1">{model.name}</h3>
                            <p className="text-sm text-gray-400">{model.provider}</p>
                          </div>
                          {model.trending && (
                            <TrendingUp className="w-5 h-5 text-accent-green" />
                          )}
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs px-2 py-1 rounded-full bg-accent-green/20 text-accent-green">
                            {model.parameters}
                          </span>
                          <span className="text-xs px-2 py-1 rounded-full bg-accent-purple/20 text-accent-purple">
                            {model.category}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-sm mb-4">
                          <span className="text-gray-400">Downloads</span>
                          <span className="font-semibold">{model.downloads}</span>
                        </div>

                        <div className="text-xs text-gray-500">
                          VRAM: {model.vramRequired.fp16} GB (FP16) / {model.vramRequired.int4} GB (INT4)
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Column - Twitter Feed (1 col) */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <TwitterFeed />
              </div>
            </div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
          >
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-3xl font-bold text-accent-green mb-2">{consumerGPUs.length}</div>
              <div className="text-sm text-gray-400">Consumer GPUs</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-3xl font-bold text-accent-purple mb-2">{popularModels.length}</div>
              <div className="text-sm text-gray-400">Popular Models</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-3xl font-bold text-accent-blue mb-2">32 GB</div>
              <div className="text-sm text-gray-400">Max Consumer VRAM</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-500" />
                <span className="text-3xl font-bold">5 min</span>
              </div>
              <div className="text-sm text-gray-400">Refresh Rate</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Cpu className="w-6 h-6 text-accent-green" />
            <span className="font-semibold">GPU Inference Hub</span>
          </div>
          <p className="text-sm text-gray-500">
            Live data from Hugging Face, Vast.ai, RunPod • Updated every 5 minutes • EUR prices based on 1.08 USD/EUR
          </p>
        </div>
      </footer>
    </main>
  )
}
