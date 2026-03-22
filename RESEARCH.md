# GPU Inference Hub - Deep Research

## Executive Summary

This document compiles comprehensive research on GPU capabilities for AI inference, market dynamics, and cloud pricing across providers. The goal is to build a live data platform that helps users determine which GPU can run which AI models, compare real-time pricing across providers, and track global GPU demand trends.

---

## 1. GPU VRAM Requirements for LLM Inference

### Core Formula
**Rule of Thumb:** 2GB VRAM per 1B parameters at FP16 precision for inference.

### Precision Impact on VRAM
| Precision | Bytes per Parameter | VRAM for 7B Model | VRAM for 70B Model |
|-----------|---------------------|-------------------|-------------------|
| FP32      | 4 bytes             | 28 GB             | 280 GB            |
| FP16      | 2 bytes             | 14 GB             | 140 GB            |
| INT8      | 1 byte              | 7 GB              | 70 GB             |
| FP8       | 1 byte              | 7 GB              | 70 GB             |
| INT4      | 0.5 bytes           | 3.5 GB            | 35 GB             |
| FP4       | 0.5 bytes           | 3.5 GB            | 35 GB             |

### Model Size Categories & VRAM Requirements

**Small Models (1B - 3B parameters)**
- VRAM: 2-8 GB
- Suitable for: RTX 3060, RTX 4060, consumer laptops
- Use cases: Chatbots, simple NLP tasks

**Medium Models (7B - 13B parameters)**
- VRAM: 14-26 GB (FP16), 4-13 GB (INT4)
- Suitable for: RTX 3090, RTX 4090, RTX 5090
- Use cases: Code assistants, content generation, summarization

**Large Models (30B - 70B parameters)**
- VRAM: 60-140 GB (FP16), 15-35 GB (INT4)
- Suitable for: A100 40GB/80GB, H100, multi-GPU setups
- Use cases: Complex reasoning, research, enterprise applications

**Extra Large Models (100B+ parameters)**
- VRAM: 200+ GB (FP16), 50+ GB (INT4)
- Suitable for: H200, B200, multi-GPU clusters
- Use cases: Foundation models, AGI research

### Additional VRAM Considerations

**KV Cache Memory:**
- Required for context window during inference
- Longer context = more KV cache
- 4K context: ~1-2 GB additional
- 32K context: ~8-16 GB additional
- 128K context: ~32-64 GB additional

**Batch Size Impact:**
- Batch size 1: Base VRAM requirement
- Batch size 8: +20-40% VRAM
- Batch size 32: +50-100% VRAM

---

## 2. GPU Specifications - Consumer Line (Personal Use)

### NVIDIA RTX Series Comparison

| GPU | VRAM | Memory Bus | Bandwidth | TFLOPS (FP16) | Release | MSRP |
|-----|------|------------|-----------|---------------|---------|------|
| RTX 3060 | 12 GB | 192-bit | 360 GB/s | 12.7 | 2021 | $329 |
| RTX 3070 | 8 GB | 256-bit | 448 GB/s | 22.1 | 2020 | $499 |
| RTX 3080 | 10 GB | 320-bit | 760 GB/s | 34.1 | 2020 | $699 |
| RTX 3090 | 24 GB | 384-bit | 936 GB/s | 71.1 | 2020 | $1,499 |
| RTX 3090 Ti | 24 GB | 384-bit | 1,008 GB/s | 80.0 | 2022 | $1,999 |
| RTX 4060 | 8 GB | 128-bit | 272 GB/s | 15.1 | 2023 | $299 |
| RTX 4070 | 12 GB | 192-bit | 504 GB/s | 29.1 | 2023 | $599 |
| RTX 4070 Ti | 12 GB | 192-bit | 504 GB/s | 44.1 | 2023 | $799 |
| RTX 4080 | 16 GB | 256-bit | 717 GB/s | 64.6 | 2022 | $1,199 |
| RTX 4090 | 24 GB | 384-bit | 1,008 GB/s | 82.6 | 2022 | $1,599 |
| **RTX 5090** | **32 GB** | **512-bit** | **1,792 GB/s** | **167.0** | **2025** | **$1,999** |

### RTX 5090 Deep Dive (Blackwell Architecture)

**Key Specs:**
- VRAM: 32 GB GDDR7
- Bandwidth: 1,792 GB/s
- FP4 throughput: ~2x FP8 rate
- LLM benchmark: 5,841 tokens/sec @ batch 8, 1024 tokens
- Context window: Up to 139K tokens in 4-bit quantization
- Performance vs RTX 4090: +72% faster
- Performance vs A100: 2.6x faster in some benchmarks

**Models RTX 5090 Can Run:**
- 7B-13B models: Full FP16, multiple concurrent
- 30B-70B models: INT4 quantization, full context
- 100B+ models: INT4 with limited context or offloading

---

## 3. GPU Specifications - Enterprise Line

### NVIDIA Data Center GPUs

| GPU | VRAM | Memory Type | Bandwidth | TFLOPS (FP16) | TDP | Release |
|-----|------|-------------|-----------|---------------|-----|---------|
| A100 40GB | 40 GB | HBM2e | 1.55 TB/s | 312 | 400W | 2020 |
| A100 80GB | 80 GB | HBM2e | 1.94 TB/s | 312 | 400W | 2020 |
| H100 SXM | 80 GB | HBM3 | 3.35 TB/s | 1,979 | 700W | 2022 |
| H100 PCIe | 80 GB | HBM2e | 2.0 TB/s | 1,513 | 350W | 2022 |
| H200 SXM | 141 GB | HBM3e | 4.8 TB/s | 1,979 | 700W | 2024 |
| B200 | 192 GB | HBM3e | 8.0 TB/s | 4,500 | 1000W | 2025 |
| GB200 NVL72 | 1,440 GB | HBM3e | 64 TB/s | 36,000 | 120kW | 2025 |

### Enterprise GPU Capabilities

**A100 (Ampere Architecture)**
- Best for: 7B-70B inference, fine-tuning
- Multi-instance GPU (MIG): Up to 7 instances
- NVLink 3rd gen: 600 GB/s
- Sweet spot for cost/performance in 2025-2026

**H100 (Hopper Architecture)**
- Best for: 70B-200B inference, training
- FP8 native support: 2.2x higher token gen vs FP16
- NVLink 4th gen: 900 GB/s
- Transformer Engine acceleration
- 30% lower latency vs A100

**H200 (Hopper Refresh)**
- Best for: Large model inference (100B+), long context
- 76% more memory than H100
- Same TFLOPS as H100, better for memory-bound workloads
- Ideal for 128K+ context windows

**B200 (Blackwell Architecture)**
- Best for: Next-gen models (200B+), multi-modal
- 192 GB VRAM: Run 175B+ models in FP8
- 2.5x H100 performance
- FP4 precision support
- NVLink 5th gen: 1.8 TB/s per GPU

---

## 4. Cloud GPU Pricing Comparison

### Provider Overview

| Provider | Model | Price Range | Billing | Notes |
|----------|-------|-------------|---------|-------|
| Vast.ai | Marketplace | $0.03-$5/hr | Per-second | Lowest prices, variable reliability |
| RunPod | On-demand | $0.19-$3.19/hr | Per-second | Good balance of price/reliability |
| Lambda Labs | On-demand | $0.50-$2.50/hr | Per-second | Enterprise-grade |
| AWS EC2 | Reserved | $0.90-$32/hr | Per-hour | Most expensive, full ecosystem |
| Azure | Reserved | $0.90-$27/hr | Per-hour | Enterprise integration |
| GCP | Reserved | $0.80-$28/hr | Per-second | Auto-scaling |

### Detailed Pricing by GPU (2026 Data)

**Consumer GPUs:**

| GPU | Vast.ai | RunPod | AWS EC2 |
|-----|---------|--------|---------|
| RTX 3060 | $0.03/hr | $0.15/hr | N/A |
| RTX 3090 | $0.20/hr | $0.40/hr | N/A |
| RTX 4090 | $0.60/hr | $0.79/hr | N/A |
| RTX 5090 | $1.20/hr | $1.49/hr | N/A |

**Enterprise GPUs:**

| GPU | Vast.ai | RunPod | Lambda | AWS EC2 |
|-----|---------|--------|--------|---------|
| A100 40GB | $0.52/hr | $0.60/hr | $0.70/hr | $1.89/hr |
| A100 80GB | $0.80/hr | $1.19/hr | $1.10/hr | $3.20/hr |
| H100 PCIe | $1.50/hr | $1.89/hr | $2.00/hr | $4.50/hr |
| H100 SXM | $2.10/hr | $2.69/hr | $2.50/hr | $6.50/hr |
| H200 | $3.20/hr | $3.99/hr | $3.80/hr | $8.00/hr |
| B200 | $4.50/hr | $5.49/hr | $5.20/hr | $12.00/hr |

### Spot/Interruptible Pricing (60-80% savings)

| GPU | Vast.ai Spot | RunPod Spot | Savings |
|-----|--------------|-------------|---------|
| RTX 4090 | $0.25/hr | $0.35/hr | 60% |
| A100 80GB | $0.40/hr | $0.55/hr | 50% |
| H100 SXM | $1.20/hr | $1.50/hr | 45% |

---

## 5. Global GPU Demand & Market Statistics

### Market Size & Growth

- **AI Inference Market (2025):** $106.15 billion
- **AI Inference Market (2030):** $254.98 billion
- **CAGR:** 19.2%
- **AI Data Center GPU Market (2025):** $10.51 billion
- **AI Data Center GPU Market (2033):** $51.78 billion
- **CAGR:** 22.06%

### Key Market Insights

**Inference vs Training:**
- Inference demand expected to surpass training by 2026
- Inference captured biggest market share in 2025
- 90% of production AI workloads are inference

**NVIDIA Dominance:**
- 92% discrete GPU market share (early 2025)
- Hyperscaler capex: Microsoft, Google, Amazon, Meta spending $380B+ on AI infrastructure in 2025
- Global AI compute growing 2.25x per year (10x by 2027)

### Regional GPU Demand (2026 Estimates)

| Region | Market Share | Market Size | Key Drivers |
|--------|--------------|-------------|-------------|
| North America | 38-46% | $7.1B | Hyperscalers, startups |
| Europe | 22-26% | $4.1B | Enterprise, research |
| Asia-Pacific | 24-28% | $4.5B | Manufacturing, services |
| China | 8-12% | $1.8B | Domestic AI push |
| Rest of World | 4-6% | $0.8B | Emerging markets |

### Compute Growth Forecast

- March 2025 baseline: ~10M H100-equivalents
- December 2027 projection: 100M H100-equivalents
- Growth rate: 2.25x per year
- Key constraint: HBM3e memory production (SK Hynix, Samsung, Micron)

---

## 6. Model-to-GPU Mapping

### Popular Models & GPU Requirements

| Model | Parameters | VRAM (FP16) | VRAM (INT4) | Minimum GPU | Recommended GPU |
|-------|------------|-------------|-------------|-------------|-----------------|
| Phi-3 Mini | 3.8B | 8 GB | 2 GB | RTX 3060 | RTX 4060 |
| Llama 3.1 8B | 8B | 16 GB | 4 GB | RTX 3090 | RTX 4070 |
| Mistral 7B | 7B | 14 GB | 3.5 GB | RTX 3090 | RTX 4070 |
| Llama 3.1 70B | 70B | 140 GB | 35 GB | A100 80GB x2 | H100 80GB |
| Mixtral 8x7B | 47B | 94 GB | 24 GB | A100 80GB | H100 80GB |
| Llama 3.1 405B | 405B | 810 GB | 203 GB | H200 x8 | B200 x4 |
| GPT-4 class | ~1.8T | N/A | 450 GB | B200 x24 | GB200 NVL72 |

### Quantization Impact

**4-bit Quantization (INT4/FP4):**
- 4x memory reduction
- 5-10% quality loss (model dependent)
- 2-3x faster inference
- Enables 70B models on RTX 5090 (32 GB)

**8-bit Quantization (INT8/FP8):**
- 2x memory reduction
- 1-2% quality loss
- 1.5-2x faster inference
- H100 native FP8 support

---

## 7. API Data Sources for Live Platform

### Pricing APIs

**Vast.ai API:**
- Endpoint: `https://vast.ai/api/v0/bundles/`
- Data: Real-time GPU availability, pricing, specs
- Update frequency: Real-time

**RunPod API:**
- Endpoint: `https://api.runpod.io/graphql`
- Data: GPU types, pricing, availability
- GraphQL queries for custom data

**AWS EC2 Pricing:**
- Endpoint: `https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonEC2/current/index.json`
- Data: All instance pricing including GPU instances
- Update frequency: Daily

### Twitter/X Integration

**Twitter API v2:**
- Search endpoints for hashtags: #GPU, #AIInference, #LLM, #H100, #A100
- Streaming for real-time updates
- Requires API key

**Alternative: Nitter feeds for:**
- @NVIDIA
- @runpod
- @vast_ai
- @LambdaLabs
- #GPUInference

### Global Demand Data

**Sources:**
- SemiAnalysis GPU demand reports
- NVIDIA quarterly earnings
- Cloud provider utilization metrics
- HBM production reports (SK Hynix, Samsung, Micron)

---

## 8. Technical Architecture Recommendations

### Frontend Stack
- **Framework:** React 18+ with Next.js 14
- **Styling:** Tailwind CSS + Framer Motion for animations
- **Charts:** Recharts or D3.js for visualizations
- **Real-time:** WebSocket for live price updates

### Backend Stack
- **API:** AWS AppSync (GraphQL) or API Gateway + Lambda
- **Data Fetching:** Lambda functions with scheduled refresh
- **Caching:** ElastiCache (Redis) for API responses
- **Database:** DynamoDB for historical pricing data

### Data Pipeline
1. Scheduled Lambda (every 5 min) → Fetch from Vast.ai, RunPod, AWS APIs
2. Store in DynamoDB with timestamp
3. Push updates via WebSocket to connected clients
4. Aggregate for global/continental demand visualization

### Amplify Deployment
- Amplify Hosting with SSR
- Cognito for user auth (optional)
- CloudFront for global CDN
- Route 53 for custom domain

---

## 9. Key Differentiators & Features

### Unique Value Props

1. **100% Live Data:** Real-time pricing from multiple providers
2. **Model Calculator:** Input model → get GPU recommendations
3. **Price Alerts:** Notify when GPU drops below target price
4. **Demand Visualization:** Interactive global heatmaps
5. **News Feed:** Twitter integration for GPU/AI inference news
6. **Comparison Tool:** Side-by-side GPU comparison
7. **Cost Calculator:** Estimate monthly costs for workloads

### Visual Design

- **Theme:** Dark mode default, cyberpunk/tech aesthetic
- **Colors:** Deep purple/black background, neon accents (green for low prices, red for high demand)
- **Animations:** Smooth transitions, real-time number updates
- **Layout:** Split screen (Personal | Enterprise) on landing
- **Cards:** GPU cards with live price badges, availability indicators

---

## 10. Implementation Roadmap

### Phase 1: Foundation (Week 1)
- [x] Research and documentation
- [ ] Repo setup with Amplify configuration
- [ ] Basic React app with routing
- [ ] Landing page with Personal/Enterprise split

### Phase 2: Data Integration (Week 2)
- [ ] Vast.ai API integration
- [ ] RunPod API integration
- [ ] AWS EC2 pricing integration
- [ ] Data caching layer

### Phase 3: UI Components (Week 3)
- [ ] GPU comparison cards
- [ ] Model-to-GPU calculator
- [ ] Price charts and graphs
- [ ] Global demand heatmap

### Phase 4: Advanced Features (Week 4)
- [ ] Twitter/X news feed
- [ ] Price alert system
- [ ] User authentication
- [ ] Favorites/watchlist

### Phase 5: Polish & Deploy (Week 5)
- [ ] Responsive design
- [ ] Performance optimization
- [ ] SEO optimization
- [ ] Production deployment

---

## 11. References & Sources

1. RunPod GPU Pricing: https://www.runpod.io/pricing
2. Vast.ai Marketplace: https://vast.ai
3. NVIDIA GPU Specs: https://www.nvidia.com/en-us/data-center/
4. GPU Price Comparison: https://getdeploying.com/gpus
5. RTX 5090 Benchmarks: https://www.runpod.io/blog/rtx-5090-llm-benchmarks
6. VRAM Calculator: https://apxml.com/tools/vram-calculator
7. AI Inference Market: https://www.marketsandmarkets.com/Market-Reports/ai-inference-market-189921964.html
8. Global GPU Demand: https://patentpc.com/blog/the-ai-chip-boom-market-growth-and-demand-for-gpus-npus-latest-data
9. NVIDIA Market Share: https://carboncredits.com/nvidia-controls-92-of-the-gpu-market-in-2025/
10. Compute Forecast 2027: https://ai-2027.com/research/compute-forecast

---

*Last Updated: March 22, 2026*
*Research compiled by Nyx for GPU Inference Hub project*
