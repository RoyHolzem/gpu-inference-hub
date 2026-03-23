# GPU Inference Hub - Branch Comparison

## Master Branch (Production)
**URL:** https://master.d2n4ylgu9f0pc8.amplifyapp.com/

### Current Features:
- ✅ Grid-based GPU selection (RTX cards)
- ✅ Click GPU → shows compatible models
- ✅ Model compatibility checker
- ✅ Hugging Face integration
- ✅ Live pricing APIs (Vast.ai, RunPod)
- ✅ EUR/USD currency toggle
- ✅ Twitter news feed (right sidebar)
- ✅ Dark cyberpunk theme
- ✅ Model cards with VRAM requirements

### Issues:
- ❌ No Personal vs Enterprise split
- ❌ All GPUs mixed together (consumer + enterprise)
- ❌ No purchase pricing
- ❌ No retailer links

### File Structure:
```
src/app/
├── page.tsx (Grid of all GPUs)
├── personal/page.tsx (Not used)
└── enterprise/page.tsx (Not used)
```

---

## Staging Branch
**URL:** https://staging.d2n4ylgu9f0pc8.amplifyapp.com/

### Current Features:
- ✅ **Personal | Enterprise split** on landing page
- ✅ LEFT side: Personal (RTX consumer GPUs)
- ✅ RIGHT side: Enterprise (A100, H100, B200)
- ✅ Separate pages for /personal and /enterprise
- ✅ PLAN.md with roadmap
- ✅ Purchase pricing fields added to types
- ✅ Retailer interface defined

### Issues:
- ❌ Not fully implemented
- ❌ Missing live pricing integration
- ❌ Missing model compatibility
- ❌ Missing Twitter feed
- ❌ Missing Hugging Face integration

### File Structure:
```
src/app/
├── page.tsx (Split screen: Personal | Enterprise)
├── personal/page.tsx (RTX consumer GPUs)
└── enterprise/page.tsx (Data center GPUs)
```

---

## Desired Combined Version (The Masterpiece)

### Landing Page:
- **Split screen design:**
  - **LEFT:** Personal Use (green theme)
    - RTX 3060 → RTX 5090
    - Purchase prices (Amazon DE, Caseking, Mindfactory)
    - "Buy Now" buttons
    - Model compatibility for consumer cards
  
  - **RIGHT:** Enterprise Use (purple theme)
    - A100, H100, H200, B200
    - Rental pricing (Vast.ai, RunPod)
    - "Request Quote" buttons
    - Model compatibility for large models

### Features to Keep from Master:
1. ✅ Live pricing APIs (Vast.ai, RunPod)
2. ✅ Model compatibility checker
3. ✅ Hugging Face integration (latest models)
4. ✅ Twitter news feed (right sidebar)
5. ✅ EUR/USD currency toggle
6. ✅ Dark cyberpunk theme
7. ✅ Model cards with VRAM requirements
8. ✅ GPU comparison features

### Features to Keep from Staging:
1. ✅ Personal | Enterprise split landing page
2. ✅ Separate /personal and /enterprise pages
3. ✅ Purchase pricing fields
4. ✅ Retailer links

### New Features to Add:
1. ✅ Purchase prices for consumer GPUs (Amazon DE, etc.)
2. ✅ "Buy Now" buttons for consumer GPUs
3. ✅ "Request Quote" for enterprise GPUs
4. ✅ Working live pricing from Vast.ai & RunPod
5. ✅ Model search functionality
6. ✅ Better error handling when APIs fail
7. ✅ Mobile responsive design

---

## Implementation Plan

### Phase 1: Merge Code
1. Checkout staging branch
2. Copy best features from master:
   - Live pricing API integration
   - Twitter feed component
   - Hugging Face integration
   - Currency conversion
   - Model compatibility logic

### Phase 2: Fix Landing Page
1. Keep split screen design (Personal | Enterprise)
2. Add live pricing to cards
3. Add purchase links to Personal side
4. Add rental pricing to Enterprise side

### Phase 3: Enhance Detail Pages
1. /personal page:
   - Grid of RTX cards
   - Live pricing from Vast.ai & RunPod
   - Purchase links to Amazon DE, Caseking
   - Model compatibility
   
2. /enterprise page:
   - Grid of A100, H100, B200
   - Live rental pricing
   - Contact for quote
   - Model compatibility for large models

### Phase 4: Polish
1. Test all APIs
2. Error handling
3. Loading states
4. Mobile responsive
5. Build and test
6. Deploy to staging

---

## Environment Variables Needed
```
NEXT_PUBLIC_VAST_API_URL=https://vast.ai/api/v0
NEXT_PUBLIC_RUNPOD_API_URL=https://api.runpod.io/graphql
NEXT_PUBLIC_HUGGINGFACE_API_URL=https://huggingface.co/api
NEXT_PUBLIC_CURRENCY=EUR
```

---

## Success Criteria
- [ ] Landing page shows Personal | Enterprise split
- [ ] Personal side shows RTX cards with purchase prices
- [ ] Enterprise side shows A100, H100, B200 with rental prices
- [ ] Live pricing from Vast.ai works
- [ ] Live pricing from RunPod works
- [ ] Model compatibility shows for each GPU
- [ ] Twitter feed works (right sidebar)
- [ ] EUR/USD toggle works
- [ ] All links work (Amazon, retailers)
- [ ] Build succeeds
- [ ] Deploys to staging successfully

---

Created: 2026-03-23
Status: Ready for GLM DevOps to implement
