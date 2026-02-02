// Financial Advisory Team Configuration
const advisors = [
  { id: 'equity', name: 'Alex Chen', role: 'Equity Strategist', avatar: '📊', color: '#6366f1' },
  { id: 'bonds', name: 'Sarah Miller', role: 'Fixed Income Specialist', avatar: '🏦', color: '#8b5cf6' },
  { id: 'realestate', name: 'Marcus Johnson', role: 'Real Estate Analyst', avatar: '🏠', color: '#10b981' },
  { id: 'alternatives', name: 'Elena Rodriguez', role: 'Alternatives Expert', avatar: '💎', color: '#f59e0b' },
  { id: 'risk', name: 'Dr. James Park', role: 'Risk Manager', avatar: '🛡️', color: '#ef4444' }
];

const manager = { name: 'Victoria Sterling', role: 'Chief Investment Officer', avatar: '👑' };

// Investment allocation model
let allocation = {
  'US Equities': { pct: 30, color: '#6366f1' },
  'International Equities': { pct: 15, color: '#8b5cf6' },
  'Fixed Income': { pct: 25, color: '#3b82f6' },
  'Real Estate': { pct: 15, color: '#10b981' },
  'Alternatives': { pct: 10, color: '#f59e0b' },
  'Cash Reserve': { pct: 5, color: '#64748b' }
};

// Initialize UI
document.addEventListener('DOMContentLoaded', () => {
  renderAdvisors();
  renderChart();
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Set deployment timestamp
  const now = new Date();
  document.getElementById('deployTime').textContent = now.toLocaleString();

  addManagerMessage("Welcome! I'm Victoria Sterling, your Chief Investment Officer. I've assembled a team of expert advisors to help deploy your $600,000 investment by February 1, 2026. Click 'Consult Team' to receive our comprehensive strategy.");
  
  document.getElementById('consultBtn').addEventListener('click', runConsultation);
  document.getElementById('sendBtn').addEventListener('click', sendMessage);
  document.getElementById('chatInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
});

function renderAdvisors() {
  const list = document.getElementById('advisorsList');
  list.innerHTML = advisors.map(a => `
    <div class="advisor-item" data-id="${a.id}">
      <div class="advisor-avatar" style="background: ${a.color}20">${a.avatar}</div>
      <div class="advisor-info">
        <h4>${a.name}</h4>
        <p>${a.role}</p>
      </div>
      <div class="advisor-status"></div>
    </div>
  `).join('');
}

function renderChart() {
  const ctx = document.getElementById('allocationChart').getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(allocation),
      datasets: [{
        data: Object.values(allocation).map(a => a.pct),
        backgroundColor: Object.values(allocation).map(a => a.color),
        borderWidth: 0,
        hoverOffset: 10
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: {
        legend: {
          position: 'right',
          labels: { color: '#8b8b9e', padding: 15, font: { size: 12 } }
        }
      }
    }
  });
}

function updateCountdown() {
  const target = new Date('2026-02-01T00:00:00');
  const now = new Date();
  const diff = target - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);
  document.getElementById('countdown').textContent = `${days} days (${months} months) remaining`;
  document.getElementById('timeHorizon').textContent = `${months} mo`;
}

// Chat functions
function addManagerMessage(text) {
  addMessage(manager.name, manager.avatar, text, 'manager');
}

function addAdvisorMessage(advisor, text) {
  addMessage(advisor.name, advisor.avatar, text, 'advisor');
}

function addMessage(name, avatar, text, type) {
  const container = document.getElementById('chatMessages');
  const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const msg = document.createElement('div');
  msg.className = 'chat-message';
  msg.innerHTML = `
    <div class="message-header">
      <div class="message-avatar">${avatar}</div>
      <span class="message-name">${name}</span>
      <span class="message-time">${time}</span>
    </div>
    <div class="message-content ${type}">${text}</div>
  `;
  container.appendChild(msg);
  container.scrollTop = container.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  addMessage('You', '👤', text, 'user');
  input.value = '';
  setTimeout(() => {
    addManagerMessage("I'll have the team analyze your question and provide insights. " + getManagerResponse(text));
  }, 800);
}

function getManagerResponse(q) {
  const lower = q.toLowerCase();
  if (lower.includes('risk')) return "Given your timeline to Feb 2026, I recommend a moderate risk approach. Dr. Park suggests keeping volatility under 12% annually.";
  if (lower.includes('stock') || lower.includes('equit')) return "Alex Chen recommends focusing on quality large-caps with strong dividends. Consider 45% total equity exposure split between US and international.";
  if (lower.includes('bond') || lower.includes('fixed')) return "Sarah Miller suggests investment-grade corporate bonds and Treasury inflation-protected securities for the fixed income allocation.";
  if (lower.includes('real estate') || lower.includes('reit')) return "Marcus Johnson recommends diversified REITs focusing on industrial and healthcare sectors with 15% allocation.";
  return "That's a great question. Let me coordinate with the team to provide a comprehensive answer. Our goal is maximizing risk-adjusted returns for your Feb 2026 deployment.";
}

// Consultation simulation
async function runConsultation() {
  const btn = document.getElementById('consultBtn');
  btn.disabled = true;
  btn.textContent = '🔄 Consulting...';
  
  addManagerMessage("Initiating team consultation. Each specialist will provide their analysis for your $600,000 investment...");
  
  const recommendations = [
    { advisor: advisors[0], title: '📈 US Large-Cap Growth', text: 'Allocate $180,000 (30%) to diversified US equities. Focus on quality companies with strong balance sheets and consistent dividend growth. Consider S&P 500 index funds as core holding.', alloc: '$180,000' },
    { advisor: advisors[0], title: '🌍 International Diversification', text: 'Invest $90,000 (15%) in developed international markets. Exposure to European and Asian markets provides geographic diversification and currency hedging benefits.', alloc: '$90,000' },
    { advisor: advisors[1], title: '🏦 Fixed Income Foundation', text: 'Deploy $150,000 (25%) in investment-grade bonds. Split between Treasury securities (10%) and corporate bonds (15%) for yield optimization while maintaining capital preservation.', alloc: '$150,000' },
    { advisor: advisors[2], title: '🏢 Real Estate Allocation', text: 'Commit $90,000 (15%) to diversified REITs. Focus on industrial, healthcare, and data center REITs which show resilience and growth potential in the current cycle.', alloc: '$90,000' },
    { advisor: advisors[3], title: '💎 Alternative Investments', text: 'Allocate $60,000 (10%) to alternatives including commodities and private credit. Provides inflation hedge and uncorrelated returns to traditional assets.', alloc: '$60,000' },
    { advisor: advisors[4], title: '🛡️ Risk Management', text: 'Maintain $30,000 (5%) cash reserve for opportunistic rebalancing. Implement stop-loss strategies and quarterly portfolio reviews to manage downside risk.', alloc: '$30,000' }
  ];
  
  for (let i = 0; i < recommendations.length; i++) {
    await delay(1500);
    const rec = recommendations[i];
    highlightAdvisor(rec.advisor.id);
    addAdvisorMessage(rec.advisor, `<strong>${rec.title}</strong><br>${rec.text}`);
    addRecommendation(rec.title, rec.text, rec.alloc);
  }
  
  await delay(1000);
  addManagerMessage("Team analysis complete. The recommended portfolio achieves optimal diversification with an expected annual return of 7-9% and volatility under 12%. We're ready to deploy your $600,000 by February 1, 2026. Shall I proceed with any specific allocation adjustments?");
  
  btn.disabled = false;
  btn.textContent = '🤖 Consult Team';
}

function highlightAdvisor(id) {
  document.querySelectorAll('.advisor-item').forEach(el => el.classList.remove('speaking'));
  const el = document.querySelector(`.advisor-item[data-id="${id}"]`);
  if (el) el.classList.add('speaking');
}

function addRecommendation(title, text, alloc) {
  const list = document.getElementById('recommendationsList');
  const item = document.createElement('div');
  item.className = 'recommendation-item';
  item.innerHTML = `<h4>${title}</h4><p>${text}</p><span class="allocation">${alloc}</span>`;
  list.appendChild(item);
}

const delay = ms => new Promise(r => setTimeout(r, ms));
