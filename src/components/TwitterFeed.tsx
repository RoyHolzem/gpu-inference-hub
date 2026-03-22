'use client'

import { motion } from 'framer-motion'
import { Twitter, ExternalLink, TrendingUp } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Tweet {
  id: string
  text: string
  author_name: string
  author_username: string
  created_at: string
  public_metrics: {
    like_count: number
    retweet_count: number
    reply_count: number
  }
}

export default function TwitterFeed() {
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulated Twitter data for demo (replace with actual Twitter API)
    const mockTweets: Tweet[] = [
      {
        id: '1',
        text: '🔥 RTX 5090 benchmarks are insane! 5,841 tokens/sec on Llama 3.1 70B with INT4 quantization. Local AI just got real.',
        author_name: 'AI Hardware News',
        author_username: 'aihw_news',
        created_at: new Date(Date.now() - 3600000).toISOString(),
        public_metrics: { like_count: 234, retweet_count: 89, reply_count: 12 }
      },
      {
        id: '2',
        text: 'NVIDIA B200 announced - 192GB HBM3e, 8TB/s bandwidth. Training GPT-4 class models in hours, not weeks.',
        author_name: 'GPU Benchmark',
        author_username: 'gpubenchmark',
        created_at: new Date(Date.now() - 7200000).toISOString(),
        public_metrics: { like_count: 567, retweet_count: 234, reply_count: 45 }
      },
      {
        id: '3',
        text: 'Llama 3.2 released! New 1B and 3B models perfect for edge deployment. Runs on RTX 3060 with full context.',
        author_name: 'Hugging Face',
        author_username: 'huggingface',
        created_at: new Date(Date.now() - 14400000).toISOString(),
        public_metrics: { like_count: 892, retweet_count: 456, reply_count: 78 }
      },
      {
        id: '4',
        text: 'Vast.ai prices dropping! H100 SXM now under $2.10/hr. Perfect time for large model inference.',
        author_name: 'Cloud GPU Deals',
        author_username: 'cloudgpudeals',
        created_at: new Date(Date.now() - 21600000).toISOString(),
        public_metrics: { like_count: 345, retweet_count: 167, reply_count: 34 }
      },
      {
        id: '5',
        text: 'Mistral releases new 12B model - outperforms Llama 3.1 13B while using 30% less VRAM. Game changer for consumer GPUs.',
        author_name: 'ML Research',
        author_username: 'mlresearch',
        created_at: new Date(Date.now() - 28800000).toISOString(),
        public_metrics: { like_count: 678, retweet_count: 312, reply_count: 56 }
      }
    ]

    // Simulate API call
    setTimeout(() => {
      setTweets(mockTweets)
      setLoading(false)
    }, 500)
  }, [])

  const formatTimeAgo = (dateString: string): string => {
    const now = new Date()
    const date = new Date(dateString)
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    return `${Math.floor(diffHours / 24)}d ago`
  }

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Twitter className="w-5 h-5 text-blue-400" />
          <h3 className="font-semibold">GPU & AI News</h3>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-surface rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-surface rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Twitter className="w-5 h-5 text-blue-400" />
          <h3 className="font-semibold">GPU & AI News</h3>
        </div>
        <span className="text-xs text-gray-500">Live feed</span>
      </div>

      <div className="space-y-4">
        {tweets.map((tweet, index) => (
          <motion.div
            key={tweet.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border-b border-border/50 pb-4 last:border-0"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                {tweet.author_name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm">{tweet.author_name}</span>
                  <span className="text-gray-500 text-xs">@{tweet.author_username}</span>
                  <span className="text-gray-600 text-xs">• {formatTimeAgo(tweet.created_at)}</span>
                </div>
                <p className="text-sm text-gray-300 mb-2">{tweet.text}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>❤️ {tweet.public_metrics.like_count}</span>
                  <span>🔄 {tweet.public_metrics.retweet_count}</span>
                  <span>💬 {tweet.public_metrics.reply_count}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <a
          href="https://twitter.com/search?q=GPU%20OR%20AI%20OR%20inference&src=typed_query"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          View more on Twitter
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}
