# Claude Code Prompt: Headless Financial Advisory Agent System

Copy and paste this prompt into Claude Code to generate a complete headless agent system:

---

## PROMPT START

Build a **headless multi-agent financial advisory system** in TypeScript/Node.js that helps invest $600,000 by Feb 1, 2026. No UI - pure backend agents that can be called via API or CLI.

### Architecture Requirements

**1. Agent Framework**
- Create a base `Agent` class with: `name`, `role`, `analyze()`, `recommend()`, `communicate()`
- Agents should maintain memory/context between calls
- Support async message passing between agents
- Include confidence scores with all recommendations

**2. Required Agents**

```typescript
// Financial Manager (Coordinator)
- Orchestrates all advisor agents
- Synthesizes recommendations into final portfolio
- Resolves conflicts between advisors
- Manages risk/return tradeoffs

// Equity Advisor
- Analyzes stock market conditions
- Recommends US and international equity allocation
- Monitors sector rotation and market timing
- Provides specific ETF/fund recommendations

// Fixed Income Advisor  
- Analyzes bond market and interest rates
- Recommends Treasury, corporate, municipal allocation
- Monitors yield curves and credit spreads
- Duration and credit quality recommendations

// Real Estate Advisor
- Analyzes REIT markets and property sectors
- Recommends residential, commercial, industrial exposure
- Monitors cap rates and occupancy trends
- Geographic diversification recommendations

// Alternatives Advisor
- Analyzes commodities, crypto, private credit
- Recommends inflation hedges
- Monitors correlation with traditional assets
- Alternative strategy recommendations

// Risk Manager
- Calculates portfolio VaR and drawdown scenarios
- Monitors correlation matrix across holdings
- Recommends position sizing and rebalancing
- Stress tests against market scenarios
```

**3. Data Models**

```typescript
interface Portfolio {
  totalValue: number;
  targetDate: Date;
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  allocations: Allocation[];
  lastRebalanced: Date;
}

interface Allocation {
  assetClass: string;
  targetPercent: number;
  currentPercent: number;
  amount: number;
  holdings: Holding[];
}

interface Holding {
  symbol: string;
  name: string;
  type: 'ETF' | 'stock' | 'bond' | 'REIT' | 'crypto' | 'commodity';
  shares: number;
  price: number;
  value: number;
}

interface Recommendation {
  agentId: string;
  action: 'buy' | 'sell' | 'hold' | 'rebalance';
  asset: string;
  amount: number;
  rationale: string;
  confidence: number; // 0-1
  priority: 'high' | 'medium' | 'low';
  timestamp: Date;
}

interface MarketConditions {
  spyTrend: 'bullish' | 'bearish' | 'neutral';
  volatilityIndex: number;
  interestRate: number;
  inflationRate: number;
  economicCycle: 'expansion' | 'peak' | 'contraction' | 'trough';
}
```

**4. Core Functions to Implement**

```typescript
// Main orchestration
async function runAdvisorySession(portfolio: Portfolio): Promise<Recommendation[]>

// Agent communication
async function broadcastToAgents(message: AgentMessage): Promise<AgentResponse[]>
async function requestConsensus(topic: string): Promise<ConsensusResult>

// Portfolio operations
function calculateOptimalAllocation(conditions: MarketConditions, risk: RiskProfile): Allocation[]
function rebalancePortfolio(current: Portfolio, target: Allocation[]): TradeOrder[]
function assessRisk(portfolio: Portfolio): RiskMetrics

// Market analysis
async function fetchMarketData(): Promise<MarketConditions>
function analyzeCorrelations(holdings: Holding[]): CorrelationMatrix
function runMonteCarloSimulation(portfolio: Portfolio, scenarios: number): SimulationResult
```

**5. CLI Interface**

```bash
# Run full advisory session
financial-advisor consult --portfolio ./portfolio.json

# Get specific agent recommendation
financial-advisor ask equity "Should I increase tech exposure?"

# Run risk analysis
financial-advisor risk analyze --stress-test

# Generate rebalancing trades
financial-advisor rebalance --dry-run

# Export recommendations
financial-advisor export --format json|csv|pdf
```

**6. API Endpoints (Express/Fastify)**

```
POST /api/consult          - Run full advisory session
POST /api/agent/:id/ask    - Query specific agent
GET  /api/portfolio        - Get current portfolio
POST /api/portfolio/rebalance - Execute rebalancing
GET  /api/risk/metrics     - Get risk analysis
POST /api/simulate         - Run simulation scenarios
```

**7. Configuration**

```typescript
const config = {
  investment: {
    principal: 600000,
    targetDate: new Date('2026-02-01'),
    riskTolerance: 'moderate',
    rebalanceThreshold: 0.05, // 5% drift triggers rebalance
  },
  agents: {
    consensusThreshold: 0.7, // 70% agreement needed
    maxRecommendationsPerSession: 10,
    confidenceMinimum: 0.6,
  },
  allocation: {
    usEquities: { min: 20, max: 40, target: 30 },
    intlEquities: { min: 10, max: 25, target: 15 },
    fixedIncome: { min: 15, max: 35, target: 25 },
    realEstate: { min: 5, max: 20, target: 15 },
    alternatives: { min: 0, max: 15, target: 10 },
    cash: { min: 3, max: 10, target: 5 },
  }
};
```

**8. File Structure**

```
src/
  agents/
    base-agent.ts
    financial-manager.ts
    equity-advisor.ts
    fixed-income-advisor.ts
    real-estate-advisor.ts
    alternatives-advisor.ts
    risk-manager.ts
  models/
    portfolio.ts
    recommendation.ts
    market.ts
  services/
    orchestrator.ts
    market-data.ts
    risk-calculator.ts
    rebalancer.ts
  api/
    server.ts
    routes.ts
  cli/
    index.ts
    commands/
  utils/
    logger.ts
    config.ts
  index.ts
package.json
tsconfig.json
README.md
```

**9. Key Behaviors**

- Agents should "debate" conflicting recommendations
- Manager resolves conflicts using weighted voting based on confidence scores
- All decisions logged with full rationale chain
- Support for backtesting recommendations against historical data
- Graceful degradation if market data unavailable

**10. Output Example**

```json
{
  "session": "2024-02-02T10:30:00Z",
  "portfolio": { "value": 600000, "targetDate": "2026-02-01" },
  "consensus": {
    "recommendation": "Maintain moderate allocation with slight defensive tilt",
    "confidence": 0.82,
    "agreementLevel": "4/5 agents agree"
  },
  "recommendations": [
    {
      "agent": "equity-advisor",
      "action": "rebalance",
      "detail": "Reduce US equity to 28%, increase international to 17%",
      "rationale": "US valuations stretched, international discount attractive",
      "confidence": 0.75
    },
    {
      "agent": "risk-manager",
      "action": "hold",
      "detail": "Current risk metrics within tolerance",
      "rationale": "VaR at 8.2%, below 10% threshold",
      "confidence": 0.88
    }
  ],
  "nextReview": "2024-03-02"
}
```

Generate the complete implementation with all agents, tests, and documentation. Use modern TypeScript patterns, proper error handling, and include unit tests for core logic.

## PROMPT END

---

## Usage Tips

1. **For Claude Code**: Paste the entire prompt above
2. **For iterative development**: Start with "Build the base Agent class and FinancialManager first"
3. **To add real market data**: Ask Claude to integrate with Alpha Vantage, Yahoo Finance, or Polygon.io APIs
4. **To add persistence**: Ask for SQLite or PostgreSQL integration for portfolio history
5. **To add AI reasoning**: Ask to integrate Claude API for natural language analysis in each agent
