# Claude Flow / Hive Setup for WealthFlow AI

This guide explains how to use Claude Flow's multi-agent orchestration with the WealthFlow financial advisory team.

## Prerequisites

```bash
# Install Claude Flow CLI
npm install -g @claude-flow/cli@latest

# Or use npx (no install)
npx @claude-flow/cli@latest --version
```

## Quick Start

### 1. Initialize Claude Flow in the Project

```bash
cd /path/to/wealthflow-ai
npx @claude-flow/cli@latest init --wizard
```

Or with preset configuration:

```bash
npx @claude-flow/cli@latest init --preset hierarchical
```

### 2. Start the Daemon

```bash
npx @claude-flow/cli@latest daemon start
```

### 3. Initialize Swarm with Financial Team

```bash
# Hierarchical topology - Financial Manager coordinates all advisors
npx @claude-flow/cli@latest swarm init \
  --topology hierarchical \
  --max-agents 6 \
  --strategy specialized
```

## Spawning Financial Agents

### Spawn Individual Agents

```bash
# Financial Manager (Coordinator)
npx @claude-flow/cli@latest agent spawn \
  -t coordinator \
  --name financial-manager \
  --config .claude/agents/financial-manager.md

# Equity Strategist
npx @claude-flow/cli@latest agent spawn \
  -t researcher \
  --name equity-strategist \
  --config .claude/agents/equity-strategist.md

# Fixed Income Specialist
npx @claude-flow/cli@latest agent spawn \
  -t researcher \
  --name fixed-income-specialist \
  --config .claude/agents/fixed-income-specialist.md

# Real Estate Analyst
npx @claude-flow/cli@latest agent spawn \
  -t researcher \
  --name real-estate-analyst \
  --config .claude/agents/real-estate-analyst.md

# Alternatives Advisor
npx @claude-flow/cli@latest agent spawn \
  -t researcher \
  --name alternatives-advisor \
  --config .claude/agents/alternatives-advisor.md

# Portfolio Risk Manager
npx @claude-flow/cli@latest agent spawn \
  -t reviewer \
  --name portfolio-risk-manager \
  --config .claude/agents/portfolio-risk-manager.md
```

### Spawn All Agents at Once (Script)

```bash
#!/bin/bash
# spawn-team.sh

AGENTS_DIR=".claude/agents"

declare -A AGENT_TYPES=(
  ["financial-manager"]="coordinator"
  ["equity-strategist"]="researcher"
  ["fixed-income-specialist"]="researcher"
  ["real-estate-analyst"]="researcher"
  ["alternatives-advisor"]="researcher"
  ["portfolio-risk-manager"]="reviewer"
)

for agent in "${!AGENT_TYPES[@]}"; do
  echo "Spawning $agent..."
  npx @claude-flow/cli@latest agent spawn \
    -t "${AGENT_TYPES[$agent]}" \
    --name "$agent" \
    --config "$AGENTS_DIR/$agent.md"
done

echo "All agents spawned. Check status:"
npx @claude-flow/cli@latest agent list
```

## Running Advisory Sessions

### Full Team Consultation

```bash
# Route a task through the swarm
npx @claude-flow/cli@latest hooks route \
  --task "Analyze optimal allocation for $600,000 investment with Feb 2026 deployment date"
```

### Query Specific Agent

```bash
# Ask equity strategist
npx @claude-flow/cli@latest task create \
  --agent equity-strategist \
  --prompt "What's your current view on US large-cap equities vs international?"

# Ask risk manager
npx @claude-flow/cli@latest task create \
  --agent portfolio-risk-manager \
  --prompt "Run stress test for 60/40 portfolio against 2008 GFC scenario"
```

### Coordinated Analysis

```bash
# Financial manager coordinates all advisors
npx @claude-flow/cli@latest task create \
  --agent financial-manager \
  --prompt "Gather recommendations from all advisors for $600k moderate-risk portfolio. Resolve any conflicts and present unified strategy."
```

## Memory & Learning

### Store Investment Patterns

```bash
# Store successful strategies
npx @claude-flow/cli@latest memory store \
  --namespace patterns \
  --key "moderate-risk-allocation" \
  --value "30% US equity, 15% intl equity, 25% bonds, 15% real estate, 10% alts, 5% cash"

# Store market insights
npx @claude-flow/cli@latest memory store \
  --namespace market-views \
  --key "2024-q1-outlook" \
  --value "Cautiously optimistic on equities, defensive on duration, overweight alternatives"
```

### Search Past Recommendations

```bash
# Find relevant patterns
npx @claude-flow/cli@latest memory search \
  --query "moderate risk portfolio allocation" \
  --namespace patterns

# List all stored insights
npx @claude-flow/cli@latest memory list --namespace market-views
```

## Hive-Mind Consensus

### Initialize Hive for Team Decisions

```bash
# Byzantine fault-tolerant consensus for investment decisions
npx @claude-flow/cli@latest hive-mind init \
  --topology hierarchical-mesh \
  --consensus byzantine
```

### Request Team Consensus

```bash
# All advisors vote on allocation decision
npx @claude-flow/cli@latest hive-mind propose \
  --topic "Increase equity allocation from 45% to 55%" \
  --quorum 4
```

## Monitoring

### Check Agent Status

```bash
# List all agents
npx @claude-flow/cli@latest agent list

# Check specific agent
npx @claude-flow/cli@latest agent status financial-manager

# View agent logs
npx @claude-flow/cli@latest agent logs equity-strategist
```

### Swarm Status

```bash
# Overall swarm health
npx @claude-flow/cli@latest swarm status

# Watch mode
npx @claude-flow/cli@latest status --watch
```

### System Diagnostics

```bash
# Run health checks
npx @claude-flow/cli@latest doctor --fix
```

## Integration with Claude Code

### Add MCP Server

```bash
claude mcp add claude-flow -- npx -y @claude-flow/cli@latest
```

### Use in Claude Code Session

When working in Claude Code, spawn agents using the Task tool:

```javascript
// Spawn financial manager as coordinator
Task({
  prompt: "You are Victoria Sterling, CIO. Coordinate the advisory team to analyze a $600k investment.",
  subagent_type: "coordinator",
  description: "Financial Manager coordination",
  run_in_background: true
})

// Spawn specialists in parallel
Task({
  prompt: "Analyze US and international equity allocation for moderate-risk investor.",
  subagent_type: "researcher", 
  description: "Equity analysis",
  run_in_background: true
})
```

## Configuration File

Create `claude-flow.config.json` in project root:

```json
{
  "project": {
    "name": "wealthflow-ai",
    "description": "AI Financial Advisory Platform"
  },
  "swarm": {
    "topology": "hierarchical",
    "maxAgents": 6,
    "strategy": "specialized",
    "consensus": "raft"
  },
  "agents": {
    "configDir": ".claude/agents",
    "defaultModel": "opus"
  },
  "memory": {
    "backend": "hybrid",
    "namespaces": ["patterns", "market-views", "client-profiles", "recommendations"]
  },
  "investment": {
    "principal": 600000,
    "targetDate": "2026-02-01",
    "riskTolerance": "moderate"
  }
}
```

## Example Workflow

```bash
# 1. Start daemon
npx @claude-flow/cli@latest daemon start

# 2. Initialize swarm
npx @claude-flow/cli@latest swarm init --topology hierarchical --max-agents 6

# 3. Run full advisory session
npx @claude-flow/cli@latest task create \
  --agent financial-manager \
  --prompt "Run complete portfolio analysis for new client: 
    - Principal: \$600,000
    - Target: February 1, 2026  
    - Risk: Moderate
    - Needs: Growth with capital preservation
    
    Coordinate with all advisors and deliver unified recommendation."

# 4. Check results
npx @claude-flow/cli@latest task status --latest

# 5. Store successful strategy
npx @claude-flow/cli@latest memory store \
  --namespace recommendations \
  --key "client-001-initial" \
  --value "$(npx @claude-flow/cli@latest task output --latest)"
```

## Useful Commands Reference

| Command | Description |
|---------|-------------|
| `daemon start` | Start background daemon |
| `swarm init` | Initialize multi-agent swarm |
| `agent spawn` | Create new agent |
| `agent list` | List all agents |
| `task create` | Assign task to agent |
| `memory store` | Save data to memory |
| `memory search` | Search stored data |
| `hooks route` | Route task to best agent |
| `doctor` | System diagnostics |

## Support

- Documentation: https://github.com/ruvnet/claude-flow
- Issues: https://github.com/ruvnet/claude-flow/issues
