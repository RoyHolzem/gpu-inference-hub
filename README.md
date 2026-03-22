# GPU Inference Hub 🚀

**Live GPU comparison platform for AI inference** - Personal & Enterprise solutions.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6)
![License](https://img.shields.io/badge/License-MIT-green)

## 🔥 Features

- **100% Live Data** - Real-time pricing from Vast.ai, RunPod, AWS, Azure, GCP
- **Personal & Enterprise Split** - Consumer GPUs (RTX series) to Data Center GPUs (A100 to B200)
- **Model Calculator** - See which models run on which GPUs
- **Global Demand Analytics** - Interactive heatmaps showing GPU demand by region
- **News Feed** - Twitter integration for GPU and AI inference news
- **Dark Mode** - Cyberpunk-inspired design with neon accents

## 🎯 Use Cases

### Personal Use (Consumer GPUs)
- Local LLM inference
- Fine-tuning models
- Personal AI projects
- Learning and experimentation

**Supported GPUs:** RTX 3060 → RTX 5090

### Enterprise Use (Data Center GPUs)
- Production AI inference
- Large model deployment (70B+ parameters)
- Multi-GPU clusters
- High-availability deployments

**Supported GPUs:** A100 → H200 → B200

## 🏗️ Architecture

```
gpu-inference-hub/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Landing with Personal/Enterprise split
│   │   ├── personal/         # Consumer GPU comparison
│   │   └── enterprise/       # Data Center GPU comparison
│   ├── components/
│   │   ├── GPUCard.tsx       # GPU display card
│   │   ├── PricingChart.tsx  # Price history chart
│   │   └── DemandMap.tsx     # Global demand heatmap
│   └── lib/
│       ├── types.ts          # TypeScript definitions
│       ├── gpu-data.ts       # GPU specifications and mock pricing
│       └── api.ts            # Live API integrations
├── RESEARCH.md               # Deep research on GPU inference
└── package.json
```

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/RoyHolzem/gpu-inference-hub.git
cd gpu-inference-hub

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📊 Live Data Sources

| Provider | Data | Update Frequency |
|----------|------|------------------|
| Vast.ai | GPU availability, pricing | Real-time |
| RunPod | GPU types, pricing | Real-time |
| AWS EC2 | Instance pricing | Daily |
| Twitter/X | News feed | Real-time |

## 🎨 Design System

### Colors
- **Background:** `#0a0a0f` - Deep black
- **Surface:** `#13131a` - Card backgrounds
- **Accent Green:** `#00ff88` - Personal use theme
- **Accent Purple:** `#8b5cf6` - Enterprise use theme
- **Accent Blue:** `#3b82f6` - Highlights

### Typography
- **Font:** Inter (sans-serif)
- **Code:** JetBrains Mono

## 📈 GPU Market Stats (2026)

- **AI Inference Market:** $106B → $255B by 2030
- **NVIDIA Market Share:** 92%
- **Global GPU Demand:** Growing 2.25x per year
- **Inference vs Training:** Inference demand surpasses training by 2026

## 🔧 Deployment

### AWS Amplify

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Initialize
amplify init

# Add hosting
amplify add hosting

# Deploy
amplify publish
```

## 📝 Research

See [RESEARCH.md](./RESEARCH.md) for comprehensive research on:
- GPU VRAM requirements for LLM inference
- Precision impact (FP16, INT8, INT4)
- GPU specifications comparison
- Cloud pricing analysis
- Global demand statistics

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines first.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

Built with Next.js, Tailwind CSS, and real-time data. Deployed on AWS Amplify.

**Live Demo:** Coming soon
