'use client'

import { motion } from 'framer-motion'
import { Cpu, Building2, Zap, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Cpu className="w-8 h-8 text-accent-green" />
            <span className="text-xl font-bold">GPU Inference Hub</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="w-2 h-2 rounded-full bg-accent-green pulse-live" />
            Live Data
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
              <span className="gradient-text">Find Your Perfect GPU</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Compare GPUs for AI inference. Live pricing from Vast.ai & RunPod. 
              Purchase links for consumer cards. Enterprise quotes for data centers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Split Section */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Personal Use - LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link href="/personal" className="block h-full">
                <div className="h-full bg-gradient-to-br from-card to-surface border-2 border-accent-green/30 rounded-2xl p-8 card-hover glow-green group cursor-pointer">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-accent-green/10 flex items-center justify-center group-hover:bg-accent-green/20 transition-colors">
                      <Zap className="w-7 h-7 text-accent-green" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Personal Use</h2>
                      <p className="text-gray-400">Consumer GPUs</p>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6">
                    RTX gaming cards for local AI inference. Run Llama, Mistral, and more on your own hardware.
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">RTX 5090</span>
                      <span className="font-mono text-accent-green">32GB VRAM</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">RTX 4090</span>
                      <span className="font-mono text-accent-green">24GB VRAM</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">RTX 3090</span>
                      <span className="font-mono text-accent-green">24GB VRAM</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500">Purchase from</div>
                      <div className="text-2xl font-bold text-accent-green">€299</div>
                    </div>
                    <ArrowRight className="w-6 h-6 text-accent-green group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Enterprise Use - RIGHT */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link href="/enterprise" className="block h-full">
                <div className="h-full bg-gradient-to-br from-card to-surface border-2 border-accent-purple/30 rounded-2xl p-8 card-hover glow-purple group cursor-pointer">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-accent-purple/10 flex items-center justify-center group-hover:bg-accent-purple/20 transition-colors">
                      <Building2 className="w-7 h-7 text-accent-purple" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Enterprise Use</h2>
                      <p className="text-gray-400">Data Center GPUs</p>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6">
                    NVIDIA data center GPUs for production AI workloads. Training and inference at scale.
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">B200</span>
                      <span className="font-mono text-accent-purple">192GB VRAM</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">H200</span>
                      <span className="font-mono text-accent-purple">141GB VRAM</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">H100</span>
                      <span className="font-mono text-accent-purple">80GB VRAM</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">A100</span>
                      <span className="font-mono text-accent-purple">40/80GB VRAM</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500">Rent from</div>
                      <div className="text-2xl font-bold text-accent-purple">€0.52/hr</div>
                    </div>
                    <ArrowRight className="w-6 h-6 text-accent-purple group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 py-16 bg-surface/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-3xl font-bold text-accent-green mb-2">10+</div>
              <div className="text-sm text-gray-400">Consumer GPUs</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-3xl font-bold text-accent-purple mb-2">6</div>
              <div className="text-sm text-gray-400">Enterprise GPUs</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-3xl font-bold text-accent-blue mb-2">2</div>
              <div className="text-sm text-gray-400">Live APIs</div>
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
            Live data from Vast.ai & RunPod • Updated every 5 minutes
          </p>
        </div>
      </footer>
    </main>
  )
}
