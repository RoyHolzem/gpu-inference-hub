# GPU Inference Hub - Implementation Plan

## Overview
A GPU comparison platform with Personal (consumer) and Enterprise (data center) sections.

## Landing Page Design
**Split Screen Layout:**
- **LEFT: Personal Use** - Consumer GPUs (RTX 3060 → RTX 5090)
- **RIGHT: Enterprise Use** - Data Center GPUs (A100 → B200)

## Features

### 1. Personal Use Section (Consumer GPUs)
**GPUs:**
- RTX 3060 (12GB) - €329 MSRP
- RTX 3070 (8GB) - €499 MSRP  
- RTX 3080 (10GB) - €699 MSRP
- RTX 3090 (24GB) - €1,499 MSRP
- RTX 4060 (8GB) - €299 MSRP
- RTX 4070 (12GB) - €599 MSRP
- RTX 4080 (16GB) - €1,199 MSRP
- RTX 4090 (24GB) - €1,599 MSRP
- RTX 5090 (32GB) - €1,999 MSRP (new release)

**Data Sources:**
- Amazon.de (German Amazon)
- Caseking.de
- Mindfactory.de
- Alternate.de

**Features:**
- Purchase price (updated from retailers)
- "Buy Now" button → Amazon DE product page
- Live rental pricing from Vast.ai & RunPod
- Model compatibility (which LLMs can run)

### 2. Enterprise Use Section (Data Center GPUs)
**GPUs:**
- A100 40GB - ~€10,000
- A100 80GB - ~€15,000
- H100 PCIe - ~€30,000
- H100 SXM - ~€35,000
- H200 - ~€40,000
- B200 - ~€50,000 (estimated, not yet available)

**Data Sources:**
- Static MSRP pricing
- Enterprise resellers: CDW, Insight, SHI
- Contact for quote

**Features:**
- MSRP pricing
- "Request Quote" button → contact form
- Live rental pricing from Vast.ai & RunPod
- Model compatibility for large models

### 3. Live Rental Pricing
**APIs:**
- **Vast.ai:** `https://vast.ai/api/v0/bundles/` (no auth needed)
- **RunPod:** `https://api.runpod.io/graphql` (public queries)

**Display:**
- Price per hour (€/hr or $/hr)
- Spot pricing with savings %
- Availability (high/medium/low)
- Auto-refresh every 5 minutes
- If API fails: show €0.00

### 4. Currency Support
- EUR (€) default
- USD ($) toggle
- Exchange rate: 1 USD = 0.93 EUR (static for now)

### 5. Model Compatibility
**Models tracked:**
- Phi-3 Mini (3.8B) - 2GB min
- Llama 3.1 8B - 4GB min (INT4)
- Mistral 7B - 3.5GB min (INT4)
- Llama 3.1 70B - 35GB min (INT4)
- Mixtral 8x7B - 24GB min (INT4)
- Llama 3.1 405B - 203GB min (INT4)

**Display:**
- "Can run: [model list]" for each GPU
- Precision (FP16 vs INT4)
- VRAM required

## File Structure
```
src/
├── app/
│   ├── page.tsx              # Landing with Personal/Enterprise split
│   ├── personal/page.tsx     # Consumer GPU details
│   └── enterprise/page.tsx   # Enterprise GPU details
├── components/
│   ├── GPUCard.tsx
│   ├── PricingCard.tsx
│   └── ModelCompatibility.tsx
└── lib/
    ├── api.ts                # Vast.ai & RunPod integration
    ├── gpu-data.ts           # GPU specs & purchase prices
    ├── currency.ts           # EUR/USD conversion
    └── types.ts
```

## Implementation Order
1. ✅ Create PLAN.md
2. 🔄 Update landing page (page.tsx) with split design
3. 🔄 Add purchase prices to gpu-data.ts
4. 🔄 Implement Vast.ai API integration
5. 🔄 Implement RunPod API integration
6. 🔄 Update Personal page with consumer GPUs
7. 🔄 Update Enterprise page with data center GPUs
8. 🧪 Test build
9. 📦 Commit to staging

## Environment Variables (for Amplify)
```
NEXT_PUBLIC_VAST_API_URL=https://vast.ai/api/v0
NEXT_PUBLIC_RUNPOD_API_URL=https://api.runpod.io/graphql
NEXT_PUBLIC_CURRENCY=EUR
```

---
Created: 2026-03-22
Status: In Progress
