import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GPU Inference Hub | Live GPU Comparison Platform',
  description: 'Real-time GPU pricing and comparison for AI inference. Personal & Enterprise solutions.',
  keywords: 'GPU, AI, inference, LLM, RTX 5090, H100, A100, cloud pricing, vast.ai, runpod',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
