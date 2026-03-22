'use client'

import { motion } from 'framer-motion'
import { Cpu, Building2, Zap, TrendingUp, Globe, Twitter } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-grid relative overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Cpu className="w-8 h-8 text-accent-green" />
            <span className="text-xl font-bold">GPU Inference Hub</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-2 text-sm text-gray-400">
              <span className="w-2 h-2 rounded-full bg-accent-green pulse-live" />
              Live Data
            </span>
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
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Find Your Perfect GPU</span>
            </h1>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Real-time GPU comparison, live pricing from Vast.ai, RunPod, AWS, and global demand analytics.
              100% live data, updated every 5 minutes.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          >
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-3xl font-bold text-accent-green mb-2">50+</div>
              <div className="text-sm text-gray-400">GPU Models</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-3xl font-bold text-accent-blue mb-2">6</div>
              <div className="text-sm text-gray-400">Cloud Providers</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-3xl font-bold text-accent-purple mb-2">$106B</div>
              <div className="text-sm text-gray-400">Inference Market</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-3xl font-bold text-accent-orange mb-2">92%</div>
              <div className="text-sm text-gray-400">NVIDIA Share</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Split Section */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Personal Use */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
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
                    RTX 3060 to RTX 5090. Perfect for local LLM inference, fine-tuning, and personal AI projects.
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
                    <span className="text-sm text-gray-500">Starting from</span>
                    <span className="text-2xl font-bold text-accent-green">$0.03/hr</span>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Enterprise Use */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
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
                    A100 to B200. High-performance inference at scale. Multi-GPU clusters for 70B+ models.
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
                    <span className="text-sm text-gray-500">Starting from</span>
                    <span className="text-2xl font-bold text-accent-purple">$0.52/hr</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-surface/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Why GPU Inference Hub?</h2>
            <p className="text-gray-400 text-lg">Everything you need to make informed GPU decisions</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <TrendingUp className="w-10 h-10 text-accent-green mb-4" />
              <h3 className="text-xl font-semibold mb-3">Live Pricing</h3>
              <p className="text-gray-400">
                Real-time prices from Vast.ai, RunPod, Lambda Labs, AWS, Azure, and GCP. 
                Updated every 5 minutes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <Globe className="w-10 h-10 text-accent-blue mb-4" />
              <h3 className="text-xl font-semibold mb-3">Global Demand</h3>
              <p className="text-gray-400">
                Interactive heatmaps showing GPU demand by region. 
                Track availability and plan your deployments.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <Twitter className="w-10 h-10 text-accent-purple mb-4" />
              <h3 className="text-xl font-semibold mb-3">Live News Feed</h3>
              <p className="text-gray-400">
                Twitter integration for GPU and AI inference news. 
                Stay updated on releases, benchmarks, and market trends.
              </p>
            </motion.div>
          </div>
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
            Built with Next.js, Tailwind CSS, and real-time data. Deployed on AWS Amplify.
          </p>
          <div className="text-sm text-gray-500">
            © 2026 GPU Inference Hub
          </div>
        </div>
      </footer>
    </main>
  )
}
