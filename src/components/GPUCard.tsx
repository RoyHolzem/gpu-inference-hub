'use client'

import { motion } from 'framer-motion'
import { Cpu, Zap, DollarSign, MapPin, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { GPU, GPUPricing } from '@/lib/types'

interface GPUCardProps {
  gpu: GPU
  pricing: GPUPricing[]
  accentColor?: 'green' | 'purple' | 'blue'
}

export default function GPUCard({ gpu, pricing, accentColor = 'green' }: GPUCardProps) {
  const lowestPrice = pricing.reduce((min, p) => p.pricePerHour < min.pricePerHour ? p : min, pricing[0])
  const spotPrice = pricing.find(p => p.spotPrice)?.spotPrice

  const accentClasses = {
    green: 'border-accent-green/30 hover:border-accent-green/60 text-accent-green',
    purple: 'border-accent-purple/30 hover:border-accent-purple/60 text-accent-purple',
    blue: 'border-accent-blue/30 hover:border-accent-blue/60 text-accent-blue',
  }

  const glowClasses = {
    green: 'hover:shadow-[0_0_20px_rgba(0,255,136,0.2)]',
    purple: 'hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]',
    blue: 'hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        bg-card rounded-xl p-6 border-2 transition-all duration-300
        ${accentClasses[accentColor]}
        ${glowClasses[accentColor]}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold mb-1">{gpu.name}</h3>
          <p className="text-sm text-gray-500">{gpu.architecture} • {gpu.releaseYear}</p>
        </div>
        <div className={`w-10 h-10 rounded-lg bg-${accentColor}/10 flex items-center justify-center`}>
          <Cpu className={`w-5 h-5 text-accent-${accentColor}`} />
        </div>
      </div>

      {/* Specs */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">VRAM</p>
          <p className="text-lg font-semibold">{gpu.vram} GB</p>
          <p className="text-xs text-gray-500">{gpu.vramType}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Bandwidth</p>
          <p className="text-lg font-semibold">{gpu.bandwidth} GB/s</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">FP16 TFLOPS</p>
          <p className="text-lg font-semibold">{gpu.tflops_fp16}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">TDP</p>
          <p className="text-lg font-semibold">{gpu.tdp}W</p>
        </div>
      </div>

      {/* Pricing */}
      <div className="border-t border-border pt-4 mt-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-400">Best Price</span>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded-full bg-accent-${accentColor}/20`}>
              {lowestPrice.provider}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full bg-accent-${accentColor}/10`}>
              {lowestPrice.availability}
            </span>
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold">${lowestPrice.pricePerHour.toFixed(2)}</span>
          <span className="text-gray-500">/hr</span>
        </div>
        {spotPrice && (
          <div className="flex items-center gap-2 mt-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="text-sm text-gray-400">
              Spot: <span className="text-yellow-500 font-semibold">${spotPrice.toFixed(2)}/hr</span>
            </span>
          </div>
        )}
      </div>

      {/* Provider Prices */}
      <div className="mt-4 space-y-2">
        {pricing.slice(0, 3).map((p) => (
          <div key={`${p.provider}-${p.location}`} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3 text-gray-500" />
              <span className="text-gray-400">{p.provider}</span>
            </div>
            <span className="font-mono">${p.pricePerHour.toFixed(2)}/hr</span>
          </div>
        ))}
      </div>

      {/* MSRP */}
      {gpu.msrp && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">MSRP</span>
            <span className="font-semibold">${gpu.msrp.toLocaleString()}</span>
          </div>
        </div>
      )}
    </motion.div>
  )
}
