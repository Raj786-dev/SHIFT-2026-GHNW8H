/**
 * EcoDispose: Smart EV Battery Disposal & Recycling System
 * Team: CodeXtra
 * 
 * Full Connected Platform Architecture & Logic
 */

// ============================================================================
// 1. Core Data Models & Seed Data
// ============================================================================

const ROUTES = {
  repair: {
    key: 'repair',
    label: 'Repair or repack (reuse in vehicle)',
    badgeClass: 'tag-triage-repair',
    co2Kg: 420,
    color: '#10b981',
    description: 'Pack retains high electrochemical integrity. Minor module balance or BMS refurbishment will return it to road service.'
  },
  storage: {
    key: 'storage',
    label: 'Storage use (solar, inverter, lights)',
    badgeClass: 'tag-triage-storage',
    co2Kg: 310,
    color: '#f59e0b',
    description: 'SOH is below EV acceleration requirements but ideal for stationary BESS (solar microgrids, UPS, peak shaving).'
  },
  recycle: {
    key: 'recycle',
    label: 'Recycler (unsafe or dead pack)',
    badgeClass: 'tag-triage-recycle',
    co2Kg: 160,
    color: '#ef4444',
    description: 'Thermal instability, severe cell degradation, or structural breach. Must be routed to a certified zero-landfill recycler.'
  }
};

const SEED_BATTERIES = [
  {
    id: 'EB-101',
    owner: 'Rohan Sharma',
    city: 'Pune, MH',
    model: 'Tata Nexon EV Max (40.5 kWh)',
    chemistry: 'LiFePO4 (LFP)',
    ageYears: 1.5,
    cycles: 280,
    ratedVoltage: 400,
    measuredVoltage: 392, // 2% drop
    peakTemp: 36,
    hasDamage: false,
    status: 'Registered', // Registered -> Collected -> Tested -> Done
    timeline: {
      registered: 'Today, 09:15 AM',
      collected: null,
      tested: null,
      done: null
    }
  },
  {
    id: 'EB-102',
    owner: 'Priya Patel',
    city: 'Pune, MH',
    model: 'Ather 450X Gen 3 (3.7 kWh)',
    chemistry: 'NMC 622',
    ageYears: 3.5,
    cycles: 920,
    ratedVoltage: 51.1,
    measuredVoltage: 47.5, // 7.04% drop
    peakTemp: 42,
    hasDamage: false,
    status: 'Registered',
    timeline: {
      registered: 'Yesterday, 04:30 PM',
      collected: null,
      tested: null,
      done: null
    }
  },
  {
    id: 'EB-103',
    owner: 'Amit Verma',
    city: 'Mumbai, MH',
    model: 'MG ZS EV (44.5 kWh)',
    chemistry: 'Li-ion NMC',
    ageYears: 5.0,
    cycles: 1450,
    ratedVoltage: 400,
    measuredVoltage: 320, // 20% drop
    peakTemp: 54, // 9°C above 45
    hasDamage: true, // Physical Swelling & Impact
    status: 'Registered',
    timeline: {
      registered: '2 days ago',
      collected: null,
      tested: null,
      done: null
    }
  },
  {
    id: 'EB-104',
    owner: 'Sunil Joshi',
    city: 'Pune, MH',
    model: 'Mahindra XUV400 (39.4 kWh)',
    chemistry: 'NMC 532',
    ageYears: 2.0,
    cycles: 440,
    ratedVoltage: 400,
    measuredVoltage: 388, // 3% drop
    peakTemp: 39,
    hasDamage: false,
    status: 'Done', // Completed prior
    timeline: {
      registered: '10 days ago',
      collected: '8 days ago',
      tested: '5 days ago',
      done: 'Yesterday'
    }
  }
];

const SEED_VENDORS = [
  {
    id: 'V-101',
    name: 'AutoVolt Solutions',
    type: 'repair',
    typeLabel: 'Repair / Repack Partner',
    distanceKm: 3.4,
    rating: 4.8,
    reviews: 142,
    coords: [18.5204, 73.8567],
    specialty: 'Automotive battery packs, BMS calibration & module rebalancing',
    cert: 'ARAI Certified • ISO 9001:2015',
    turnaround: '2-4 business days'
  },
  {
    id: 'V-102',
    name: 'VoltCraft Battery Lab',
    type: 'repair',
    typeLabel: 'Repair / Repack Partner',
    distanceKm: 7.2,
    rating: 4.7,
    reviews: 89,
    coords: [18.5314, 73.8446],
    specialty: 'Thermal barrier replacement, busbar soldering, 2-wheeler packs',
    cert: 'EV Guild Verified Workshop',
    turnaround: '3-5 business days'
  },
  {
    id: 'V-103',
    name: 'SunGrid Energy Storage',
    type: 'storage',
    typeLabel: '2nd-Life Storage Buyer',
    distanceKm: 5.8,
    rating: 4.9,
    reviews: 210,
    coords: [18.5089, 73.8291],
    specialty: '10kWh-100kWh commercial solar storage conversion & UPS integration',
    cert: 'MNRE Approved BESS Integrator',
    turnaround: 'Immediate Purchase Offer'
  },
  {
    id: 'V-104',
    name: 'VoltVault Microgrid Corp',
    type: 'storage',
    typeLabel: '2nd-Life Storage Buyer',
    distanceKm: 11.2,
    rating: 4.6,
    reviews: 74,
    coords: [18.5524, 73.8920],
    specialty: 'Telecom tower backup power units and agrarian microgrids',
    cert: 'CleanTech Alliance Certified',
    turnaround: '2 business days'
  },
  {
    id: 'V-105',
    name: 'GreenCycle Certified Materials',
    type: 'recycle',
    typeLabel: 'Certified Recycler',
    distanceKm: 14.5,
    rating: 4.9,
    reviews: 312,
    coords: [18.5684, 73.7712],
    specialty: 'Zero-landfill hydrometallurgical lithium, cobalt & nickel extraction',
    cert: 'CPCB Authorized • EPR Compliant #MH-401',
    turnaround: 'Hazmat Safe Dispatch'
  },
  {
    id: 'V-106',
    name: 'EcoMetals Closed-Loop Recovery',
    type: 'recycle',
    typeLabel: 'Certified Recycler',
    distanceKm: 22.0,
    rating: 4.8,
    reviews: 184,
    coords: [18.4900, 73.9300],
    specialty: 'Black mass refining, thermal de-activation of swollen modules',
    cert: 'State Pollution Board Licensed',
    turnaround: 'Certified Manifest in 24h'
  }
];

const SEED_QUOTES = [
  {
    id: 'QR-501',
    batteryId: 'EB-101',
    batteryModel: 'Tata Nexon EV Max (40.5 kWh)',
    vendorId: 'V-101',
    vendorName: 'AutoVolt Solutions',
    servicePath: 'Repair & Repack',
    quoteAmount: '₹18,500 ($225)',
    remarks: 'Includes module balancing and 12-month road warranty.',
    status: 'Pending Acceptance', // Pending Quote -> Pending Acceptance -> Accepted
    createdAt: 'Today, 10:00 AM'
  }
];

// ============================================================================
// 2. Health Assessment Formula Engine
// ============================================================================

/**
 * Calculates battery health score and triage route based on transparent rules:
 * - Base score: 100
 * - Age: 4 points per year, up to 32
 * - Charge cycles: 1 point per 40 cycles, up to 35
 * - Voltage below rated: 1.5 points per % below rated, up to 30
 * - Peak temperature above 45 °C: 1.5 points per °C above 45, up to 15
 * - Swelling, leaking or physical damage: 40 points
 * 
 * Triage result:
 * - Score >= 70 -> Repair or repack (reuse in vehicle)
 * - Score 40 to 69 -> Storage use (solar, inverter, lights)
 * - Score below 40, or any physical damage -> Recycler
 */
function assess(battery) {
  const ageYears = Number(battery.ageYears) || 0;
  const cycles = Number(battery.cycles) || 0;
  const ratedV = Number(battery.ratedVoltage) || 1;
  const measuredV = Number(battery.measuredVoltage) || ratedV;
  const peakTemp = Number(battery.peakTemp) || 25;
  const hasDamage = Boolean(battery.hasDamage);

  // 1. Age deduction: 4 pts per yr, max 32
  const ageDeduction = Math.min(ageYears * 4, 32);

  // 2. Cycle deduction: 1 pt per 40 cycles, max 35
  const cycleDeduction = Math.min(cycles / 40, 35);

  // 3. Voltage drop deduction: 1.5 pts per % below rated, max 30
  let voltageDropPct = 0;
  if (measuredV < ratedV) {
    voltageDropPct = ((ratedV - measuredV) / ratedV) * 100;
  }
  const voltageDeduction = Math.min(voltageDropPct * 1.5, 30);

  // 4. Peak temp deduction: 1.5 pts per °C above 45°C, max 15
  let tempDeduction = 0;
  if (peakTemp > 45) {
    tempDeduction = Math.min((peakTemp - 45) * 1.5, 15);
  }

  // 5. Physical damage deduction: 40 points
  const damageDeduction = hasDamage ? 40 : 0;

  const totalDeductions = ageDeduction + cycleDeduction + voltageDeduction + tempDeduction + damageDeduction;
  const rawScore = 100 - totalDeductions;
  const healthScore = Math.max(0, Math.min(100, Math.round(rawScore)));

  // Triage logic
  let routeKey = 'recycle';
  if (hasDamage || healthScore < 40) {
    routeKey = 'recycle';
  } else if (healthScore >= 70) {
    routeKey = 'repair';
  } else {
    routeKey = 'storage';
  }

  return {
    score: healthScore,
    routeKey,
    route: ROUTES[routeKey],
    deductions: {
      age: { label: `Age degradation (${ageYears} yrs)`, pts: Math.round(ageDeduction * 10) / 10 },
      cycles: { label: `Cycle wear (${cycles} cycles)`, pts: Math.round(cycleDeduction * 10) / 10 },
      voltage: { label: `Voltage drop (${voltageDropPct.toFixed(1)}% below rated)`, pts: Math.round(voltageDeduction * 10) / 10 },
      temp: { label: `Thermal stress (${peakTemp}°C peak)`, pts: Math.round(tempDeduction * 10) / 10 },
      damage: { label: `Physical damage / swelling`, pts: damageDeduction }
    },
    totalDeductions: Math.round(totalDeductions * 10) / 10,
    hasCriticalHazard: hasDamage || peakTemp > 45 || healthScore < 40
  };
}

// ============================================================================
// 3. Application State & Storage
// ============================================================================

const AppState = {
  activeRole: 'owner', // 'owner' | 'vendor' | 'recycler'
  currentFilter: 'all',
  vendorFilter: 'all',
  searchQuery: '',
  selectedBatteryId: 'EB-101',
  batteries: [],
  vendors: [...SEED_VENDORS],
  quotes: [...SEED_QUOTES],
  alerts: [],
  leafletMap: null,
  mapMarkers: []
};

function loadState() {
  const saved = localStorage.getItem('ecodispose_state_v2');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      AppState.batteries = parsed.batteries || SEED_BATTERIES;
      AppState.quotes = parsed.quotes || SEED_QUOTES;
    } catch (e) {
      console.warn('Failed to parse localStorage, resetting to seed data.', e);
      AppState.batteries = JSON.parse(JSON.stringify(SEED_BATTERIES));
      AppState.quotes = JSON.parse(JSON.stringify(SEED_QUOTES));
    }
  } else {
    AppState.batteries = JSON.parse(JSON.stringify(SEED_BATTERIES));
    AppState.quotes = JSON.parse(JSON.stringify(SEED_QUOTES));
  }

  generateSystemAlerts();
}

function saveState() {
  localStorage.setItem('ecodispose_state_v2', JSON.stringify({
    batteries: AppState.batteries,
    quotes: AppState.quotes
  }));
}

function resetToSeedData() {
  localStorage.removeItem('ecodispose_state_v2');
  AppState.batteries = JSON.parse(JSON.stringify(SEED_BATTERIES));
  AppState.quotes = JSON.parse(JSON.stringify(SEED_QUOTES));
  AppState.selectedBatteryId = 'EB-101';
  generateSystemAlerts();
  renderAll();
  showToast('State successfully reset to demonstration seed data', 'success');
}

function generateSystemAlerts() {
  AppState.alerts = [];
  
  // Check for hazardous batteries
  AppState.batteries.forEach(b => {
    const assessment = assess(b);
    if (assessment.hasCriticalHazard) {
      AppState.alerts.push({
        id: `alert-hazard-${b.id}`,
        type: 'danger',
        title: `CRITICAL SAFETY ALERT: ${b.id}`,
        message: `Pack ${b.id} flagged for thermal anomaly or physical casing damage (${b.peakTemp}°C / Swelling: ${b.hasDamage ? 'YES' : 'NO'}). Auto-routed to Certified Recycler to prevent informal fire risk.`,
        time: 'Active Notice'
      });
    }
  });

  // Check for quotes
  AppState.quotes.forEach(q => {
    if (q.status === 'Pending Acceptance') {
      AppState.alerts.push({
        id: `alert-quote-${q.id}`,
        type: 'info',
        title: `New Vendor Quote for ${q.batteryId}`,
        message: `${q.vendorName} offered ${q.quoteAmount} for ${q.servicePath}. Review under "My Requests".`,
        time: q.createdAt
      });
    }
  });

  updateUnreadAlertBadge();
}

// ============================================================================
// 4. View Rendering & UI Updates
// ============================================================================

function renderAll() {
  updateSummaryBand();
  renderBatteryList();
  renderSelectedBatteryDetail();
  renderOwnerQuotesTable();
  renderVendorDirectory();
  renderVendorPortalInbox();
  renderRecyclerManifest();
  renderAlertsDrawer();
}

/**
 * 4.1 Summary Band Calculation
 */
function updateSummaryBand() {
  const total = AppState.batteries.length;
  let repairCount = 0;
  let storageCount = 0;
  let recycleCount = 0;
  let totalCo2Avoided = 0;

  AppState.batteries.forEach(b => {
    const assessment = assess(b);
    if (assessment.routeKey === 'repair') repairCount++;
    else if (assessment.routeKey === 'storage') storageCount++;
    else recycleCount++;

    // Calculate CO2 avoided for completed journeys
    if (b.status === 'Done') {
      totalCo2Avoided += assessment.route.co2Kg;
    }
  });

  const retainedCount = repairCount + storageCount;
  const retainedPct = total > 0 ? Math.round((retainedCount / total) * 100) : 0;
  const openQuotesCount = AppState.quotes.filter(q => q.status !== 'Accepted').length;

  // Update DOM elements
  document.getElementById('stat-total-batteries').innerText = total;
  document.getElementById('stat-retained-percent').innerText = `${retainedPct}%`;
  document.getElementById('stat-open-requests').innerText = openQuotesCount;
  document.getElementById('stat-co2-avoided').innerText = totalCo2Avoided.toLocaleString();

  // Counts on stream distribution
  document.getElementById('count-repair').innerText = repairCount;
  document.getElementById('count-storage').innerText = storageCount;
  document.getElementById('count-recycle').innerText = recycleCount;

  // Stream progress bar segments
  const repairPct = total > 0 ? (repairCount / total) * 100 : 0;
  const storagePct = total > 0 ? (storageCount / total) * 100 : 0;
  const recyclePct = total > 0 ? (recycleCount / total) * 100 : 0;

  document.getElementById('bar-repair').style.width = `${repairPct}%`;
  document.getElementById('bar-storage').style.width = `${storagePct}%`;
  document.getElementById('bar-recycle').style.width = `${recyclePct}%`;

  // Header badges
  document.getElementById('vendor-request-count').innerText = AppState.quotes.filter(q => q.status === 'Pending Quote' || q.status === 'Pending Acceptance').length;
  document.getElementById('recycler-hazard-count').innerText = recycleCount;
}

/**
 * 4.2 Battery List Component
 */
function renderBatteryList() {
  const container = document.getElementById('battery-list-container');
  if (!container) return;

  const query = AppState.searchQuery.toLowerCase();
  const filter = AppState.currentFilter;

  const filtered = AppState.batteries.filter(b => {
    const assessment = assess(b);
    const matchesFilter = (filter === 'all') || (assessment.routeKey === filter);
    const matchesSearch = 
      b.id.toLowerCase().includes(query) ||
      b.model.toLowerCase().includes(query) ||
      b.owner.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  document.getElementById('filter-all-count').innerText = AppState.batteries.length;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 10px; color: var(--text-muted);">
        <p>No batteries matching criteria found.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(b => {
    const assessment = assess(b);
    const isSelected = b.id === AppState.selectedBatteryId;
    const scoreBadgeClass = `score-badge-${assessment.routeKey}`;
    const triageBadgeClass = `tag-triage-${assessment.routeKey}`;

    return `
      <div class="battery-item-card ${isSelected ? 'selected' : ''} ${b.hasDamage ? 'danger-flag' : ''}" 
           onclick="selectBattery('${b.id}')">
        <div class="item-left">
          <div class="item-score-badge ${scoreBadgeClass}">
            <span>${assessment.score}</span>
          </div>
          <div class="item-details">
            <h4>
              ${b.id} 
              ${b.hasDamage ? '<span class="hazard-badge">⚠️ HAZARD</span>' : ''}
            </h4>
            <div class="item-subtext">${b.model} • ${b.owner}</div>
          </div>
        </div>
        <div class="item-right">
          <span class="tag-triage ${triageBadgeClass}">${assessment.route.key.toUpperCase()}</span>
          <span class="tag-status-text">Status: ${b.status}</span>
        </div>
      </div>
    `;
  }).join('');
}

function selectBattery(id) {
  AppState.selectedBatteryId = id;
  renderBatteryList();
  renderSelectedBatteryDetail();
}

/**
 * 4.3 Selected Battery Detailed Diagnostics
 */
function renderSelectedBatteryDetail() {
  const detailEmpty = document.getElementById('detail-empty-state');
  const detailContent = document.getElementById('detail-content');
  const battery = AppState.batteries.find(b => b.id === AppState.selectedBatteryId);

  if (!battery) {
    detailEmpty.style.display = 'block';
    detailContent.style.display = 'none';
    return;
  }

  detailEmpty.style.display = 'none';
  detailContent.style.display = 'block';

  const assessment = assess(battery);

  // Top header elements
  document.getElementById('detail-id').innerText = battery.id;
  document.getElementById('detail-status').innerText = battery.status;
  document.getElementById('detail-triage').innerText = assessment.route.label;
  document.getElementById('detail-triage').className = `triage-badge tag-triage-${assessment.routeKey}`;
  document.getElementById('detail-model').innerText = battery.model;
  document.getElementById('detail-owner').innerText = `Owner: ${battery.owner} | Location: ${battery.city} | Chemistry: ${battery.chemistry}`;

  // Circular Gauge SVG
  const circlePath = document.getElementById('gauge-circle-path');
  circlePath.setAttribute('stroke-dasharray', `${assessment.score}, 100`);
  circlePath.className = `circle-fill color-${assessment.routeKey}`;
  document.getElementById('gauge-score-value').innerText = assessment.score;
  document.getElementById('gauge-score-value').style.color = assessment.route.color;
  
  const verdictText = assessment.routeKey === 'repair' ? 'High Residual SOH (Road Ready)' :
                      assessment.routeKey === 'storage' ? 'Medium Residual SOH (BESS Eligible)' :
                      'Critical Degradation / Hazardous Pack';
  document.getElementById('gauge-verdict-text').innerText = verdictText;

  // Deductions list
  const deductionsContainer = document.getElementById('deductions-list');
  deductionsContainer.innerHTML = Object.entries(assessment.deductions).map(([key, item]) => {
    const isZero = item.pts === 0;
    return `
      <div class="deduction-item">
        <span class="deduction-name">${item.label}</span>
        <span class="deduction-pts ${isZero ? 'zero' : ''}">${isZero ? '0' : `-${item.pts}`} pts</span>
      </div>
    `;
  }).join('');

  // Recommendation Callout
  const recCallout = document.getElementById('recommendation-callout');
  recCallout.className = `recommendation-callout ${assessment.routeKey}-style`;
  document.getElementById('rec-icon').innerText = assessment.routeKey === 'repair' ? '🛠️' : (assessment.routeKey === 'storage' ? '⚡' : '⚠️');
  document.getElementById('rec-title').innerText = `Triage Recommendation: ${assessment.route.label}`;
  document.getElementById('rec-desc').innerText = assessment.route.description;

  // Lifecycle Stepper
  updateLifecycleTimeline(battery);
}

function updateLifecycleTimeline(battery) {
  const steps = ['registered', 'collected', 'tested', 'done'];
  const statusIndexMap = {
    'Registered': 0,
    'Collected': 1,
    'Tested': 2,
    'Done': 3
  };

  const currentIndex = statusIndexMap[battery.status] ?? 0;

  steps.forEach((step, idx) => {
    const nodeEl = document.getElementById(`step-${step}`);
    const timeEl = document.getElementById(`step-time-${step}`);
    
    if (idx <= currentIndex) {
      nodeEl.classList.add('active');
      if (idx < currentIndex) nodeEl.classList.add('done');
    } else {
      nodeEl.classList.remove('active', 'done');
    }

    if (battery.timeline && battery.timeline[step]) {
      timeEl.innerText = battery.timeline[step];
    } else {
      timeEl.innerText = idx <= currentIndex ? 'Completed' : 'Pending';
    }
  });

  // Connectors
  document.getElementById('conn-1-2').classList.toggle('active', currentIndex >= 1);
  document.getElementById('conn-2-3').classList.toggle('active', currentIndex >= 2);
  document.getElementById('conn-3-4').classList.toggle('active', currentIndex >= 3);
}

/**
 * 4.4 Simulate Status Progression
 */
function advanceSelectedBatteryStatus() {
  const battery = AppState.batteries.find(b => b.id === AppState.selectedBatteryId);
  if (!battery) return;

  const nextStatusMap = {
    'Registered': 'Collected',
    'Collected': 'Tested',
    'Tested': 'Done',
    'Done': 'Registered'
  };

  const nextStatus = nextStatusMap[battery.status];
  battery.status = nextStatus;

  const nowString = 'Just now';
  if (!battery.timeline) battery.timeline = {};

  if (nextStatus === 'Registered') {
    battery.timeline = { registered: 'Just now', collected: null, tested: null, done: null };
  } else if (nextStatus === 'Collected') {
    battery.timeline.collected = nowString;
  } else if (nextStatus === 'Tested') {
    battery.timeline.tested = nowString;
  } else if (nextStatus === 'Done') {
    battery.timeline.done = nowString;
    const assessment = assess(battery);
    showToast(`🎉 Journey Complete! Diverted ${battery.id} from landfill. +${assessment.route.co2Kg} kg CO₂ saved!`, 'success');
  }

  saveState();
  renderAll();
  showToast(`Updated ${battery.id} status to: "${nextStatus}"`, 'success');
}

/**
 * 4.5 Owner Quotes Table
 */
function renderOwnerQuotesTable() {
  const tbody = document.getElementById('owner-quotes-tbody');
  if (!tbody) return;

  if (AppState.quotes.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 24px;">No active quote requests. Pick a partner from the directory below to request a quote.</td></tr>`;
    return;
  }

  tbody.innerHTML = AppState.quotes.map(q => {
    const isAccepted = q.status === 'Accepted';
    const isPendingVendor = q.status === 'Pending Quote';

    let actionBtn = '';
    if (isAccepted) {
      actionBtn = `<span style="color: var(--color-repair); font-weight: 700;">✓ Confirmed</span>`;
    } else if (isPendingVendor) {
      actionBtn = `<span style="color: var(--text-muted); font-size: 0.78rem;">Awaiting Vendor</span>`;
    } else {
      actionBtn = `<button class="btn btn-primary btn-sm" onclick="acceptQuote('${q.id}')">Accept Quote</button>`;
    }

    return `
      <tr>
        <td><strong>${q.id}</strong></td>
        <td>${q.batteryId} <span style="font-size: 0.75rem; color: var(--text-secondary);">(${q.batteryModel})</span></td>
        <td>${q.vendorName}</td>
        <td><span class="tag-triage tag-triage-repair">${q.servicePath}</span></td>
        <td><strong>${q.quoteAmount}</strong></td>
        <td><span style="font-size: 0.8rem; color: var(--text-secondary);">${q.remarks || 'Standard diagnostic package'}</span></td>
        <td><span class="status-badge" style="${isAccepted ? 'background: rgba(16, 185, 129, 0.2); color: var(--color-repair);' : ''}">${q.status}</span></td>
        <td>${actionBtn}</td>
      </tr>
    `;
  }).join('');
}

function acceptQuote(quoteId) {
  const quote = AppState.quotes.find(q => q.id === quoteId);
  if (!quote) return;

  quote.status = 'Accepted';

  // Automatically advance battery status to 'Collected' if it's currently Registered
  const battery = AppState.batteries.find(b => b.id === quote.batteryId);
  if (battery && battery.status === 'Registered') {
    battery.status = 'Collected';
    if (!battery.timeline) battery.timeline = {};
    battery.timeline.collected = 'Booking Confirmed';
  }

  // Raise system alert
  AppState.alerts.unshift({
    id: `alert-booking-${Date.now()}`,
    type: 'success',
    title: `Booking Confirmed: ${quote.batteryId}`,
    message: `You accepted quote from ${quote.vendorName} (${quote.quoteAmount}). Logistics pickup scheduled.`,
    time: 'Just now'
  });

  saveState();
  renderAll();
  showToast(`Booking Confirmed! ${quote.vendorName} will collect ${quote.batteryId}.`, 'success');
}

/**
 * 4.6 Vendor Directory & Interactive Map
 */
function renderVendorDirectory() {
  const container = document.getElementById('vendor-cards-list');
  if (!container) return;

  const filter = AppState.vendorFilter;
  const filteredVendors = AppState.vendors.filter(v => filter === 'all' || v.type === filter);

  document.getElementById('vfilter-all-count').innerText = AppState.vendors.length;

  container.innerHTML = filteredVendors.map(v => {
    return `
      <div class="vendor-card">
        <div class="vendor-card-header">
          <div>
            <h4 class="vendor-name">${v.name}</h4>
            <div class="vendor-meta-row">
              <span class="vendor-rating">★ ${v.rating} (${v.reviews} reviews)</span>
              <span>•</span>
              <span class="vendor-distance">${v.distanceKm} km away</span>
            </div>
          </div>
          <span class="tag-triage tag-triage-${v.type}">${v.typeLabel}</span>
        </div>
        <p class="vendor-specialty">${v.specialty}</p>
        <div class="vendor-card-footer">
          <span class="vendor-cert-pill">${v.cert}</span>
          <button class="btn btn-secondary btn-sm" onclick="openQuoteModalForVendor('${v.id}')">Request Quote</button>
        </div>
      </div>
    `;
  }).join('');

  updateMapMarkers(filteredVendors);
}

function initLeafletMap() {
  const mapElement = document.getElementById('vendor-map');
  if (!mapElement || typeof L === 'undefined') return;

  try {
    AppState.leafletMap = L.map('vendor-map').setView([18.5204, 73.8567], 12);
    
    // OpenStreetMap Tile Layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(AppState.leafletMap);

    // Initial markers
    updateMapMarkers(AppState.vendors);
  } catch (err) {
    console.warn('Leaflet map initialization skipped or offline:', err);
    mapElement.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: var(--text-secondary); text-align: center; padding: 20px;">
        <div>
          <span style="font-size: 2rem;">🗺️</span>
          <h4>Interactive Partner Network</h4>
          <p style="font-size: 0.8rem; margin-top: 4px;">6 verified vendors located in the Pune/Mumbai metropolitan radius.</p>
        </div>
      </div>
    `;
  }
}

function updateMapMarkers(vendorsToRender) {
  if (!AppState.leafletMap || typeof L === 'undefined') return;

  // Clear previous markers
  AppState.mapMarkers.forEach(m => AppState.leafletMap.removeLayer(m));
  AppState.mapMarkers = [];

  vendorsToRender.forEach(v => {
    const color = ROUTES[v.type]?.color || '#10b981';
    
    // Custom icon SVG
    const customIcon = L.divIcon({
      className: 'custom-map-pin',
      html: `<div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 0 8px ${color};"></div>`,
      iconSize: [16, 16]
    });

    const marker = L.marker(v.coords, { icon: customIcon }).addTo(AppState.leafletMap);
    marker.bindPopup(`
      <div style="font-family: var(--font-main); color: #0b0f19;">
        <strong>${v.name}</strong><br>
        <span style="font-size: 0.75rem;">${v.typeLabel} • ${v.distanceKm} km</span><br>
        <button style="margin-top: 6px; padding: 3px 8px; font-size: 0.75rem; background: #10b981; color: #fff; border: none; border-radius: 4px; cursor: pointer;"
                onclick="openQuoteModalForVendor('${v.id}')">Request Quote</button>
      </div>
    `);

    AppState.mapMarkers.push(marker);
  });
}

/**
 * 4.7 Vendor Portal View
 */
function renderVendorPortalInbox() {
  const container = document.getElementById('vendor-inbox-container');
  if (!container) return;

  if (AppState.quotes.length === 0) {
    container.innerHTML = `<div style="text-align: center; padding: 30px; color: var(--text-muted);">No quote inquiries received yet.</div>`;
    return;
  }

  container.innerHTML = AppState.quotes.map(q => {
    const battery = AppState.batteries.find(b => b.id === q.batteryId) || SEED_BATTERIES[0];
    const assessment = assess(battery);

    return `
      <div class="vendor-request-card">
        <div class="req-header">
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="id-badge">${q.id}</span>
              <span class="status-badge">${q.status}</span>
              <span class="tag-triage tag-triage-${assessment.routeKey}">${assessment.route.label}</span>
            </div>
            <h3 style="margin-top: 6px;">${battery.id} - ${battery.model}</h3>
            <div style="font-size: 0.8rem; color: var(--text-secondary);">Owner: ${battery.owner} • Attached Diagnostics Score: <strong>${assessment.score}/100</strong></div>
          </div>
          <div style="text-align: right; font-size: 0.8rem; color: var(--text-muted);">
            Sent: ${q.createdAt}
          </div>
        </div>

        <div class="req-telemetry-grid">
          <div>
            <span class="req-item-label">Pack Age</span>
            <div class="req-item-val">${battery.ageYears} yrs</div>
          </div>
          <div>
            <span class="req-item-label">Cycles</span>
            <div class="req-item-val">${battery.cycles}</div>
          </div>
          <div>
            <span class="req-item-label">Voltage</span>
            <div class="req-item-val">${battery.measuredVoltage}V / ${battery.ratedVoltage}V</div>
          </div>
          <div>
            <span class="req-item-label">Peak Temp</span>
            <div class="req-item-val" style="${battery.peakTemp > 45 ? 'color: var(--color-recycle);' : ''}">${battery.peakTemp}°C</div>
          </div>
          <div>
            <span class="req-item-label">Damage</span>
            <div class="req-item-val" style="${battery.hasDamage ? 'color: var(--color-recycle);' : ''}">${battery.hasDamage ? 'YES' : 'NONE'}</div>
          </div>
        </div>

        <div class="req-quote-form">
          <div class="form-group" style="flex: 1; margin-bottom: 0;">
            <label style="font-size: 0.75rem;">Price Quote (₹ / $):</label>
            <input type="text" id="quote-price-input-${q.id}" class="form-control" value="${q.quoteAmount !== 'Awaiting Quote' ? q.quoteAmount : '₹18,500 ($225)'}">
          </div>
          <div class="form-group" style="flex: 2; margin-bottom: 0;">
            <label style="font-size: 0.75rem;">Technical Remarks & Warranty:</label>
            <input type="text" id="quote-remarks-input-${q.id}" class="form-control" value="${q.remarks || 'Full diagnostic inspection & cell rebalance'}">
          </div>
          <button class="btn btn-primary" onclick="vendorSendQuote('${q.id}')">
            Send Quote to Owner
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function vendorSendQuote(quoteId) {
  const quote = AppState.quotes.find(q => q.id === quoteId);
  if (!quote) return;

  const priceInput = document.getElementById(`quote-price-input-${quoteId}`);
  const remarksInput = document.getElementById(`quote-remarks-input-${quoteId}`);

  quote.quoteAmount = priceInput ? priceInput.value : '₹18,000';
  quote.remarks = remarksInput ? remarksInput.value : 'Standard service turnaround';
  quote.status = 'Pending Acceptance';

  AppState.alerts.unshift({
    id: `alert-quote-${Date.now()}`,
    type: 'info',
    title: `Quote Sent for ${quote.batteryId}`,
    message: `${quote.vendorName} sent proposal of ${quote.quoteAmount}. Switched to Owner view for acceptance.`,
    time: 'Just now'
  });

  saveState();
  renderAll();
  showToast(`Quote dispatched to battery owner (${quote.batteryId})!`, 'success');
}

/**
 * 4.8 Recycler View Manifest
 */
function renderRecyclerManifest() {
  const container = document.getElementById('recycler-manifest-grid');
  if (!container) return;

  // Filter batteries that require recycling (<40 score or physical damage)
  const deadOrUnsafePacks = AppState.batteries.filter(b => {
    const assessment = assess(b);
    return assessment.routeKey === 'recycle';
  });

  if (deadOrUnsafePacks.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">No hazardous or end-of-life battery packs currently in hazmat transit queue.</div>`;
    return;
  }

  container.innerHTML = deadOrUnsafePacks.map(b => {
    const assessment = assess(b);
    return `
      <div class="manifest-card">
        <div class="manifest-header">
          <div>
            <span class="id-badge">${b.id}</span>
            <h3 style="margin-top: 4px;">${b.model}</h3>
            <div style="font-size: 0.78rem; color: var(--text-secondary);">Owner: ${b.owner} • ${b.city}</div>
          </div>
          <span class="tag-triage tag-triage-recycle">END-OF-LIFE</span>
        </div>

        <div class="hazmat-warning-box">
          <strong>⚠️ HAZMAT AUDIT DETAILS:</strong><br>
          • Health Score: <strong>${assessment.score}/100</strong><br>
          • Peak Recorded Temp: <strong style="color: var(--color-recycle);">${b.peakTemp}°C</strong> (Thermal Runaway Risk)<br>
          • Physical Swelling / Damage: <strong style="color: var(--color-recycle);">${b.hasDamage ? 'CRITICAL STRUCTURAL BREACH' : 'None'}</strong><br>
          • Target Recovery: 95% Lithium Carbonate & Cobalt Cathode Mass
        </div>

        <div style="display: flex; gap: 8px; justify-content: flex-end;">
          <button class="btn btn-secondary btn-sm" onclick="generateEprCertificate('${b.id}')">EPR Certificate</button>
          <button class="btn btn-danger btn-sm" onclick="confirmRecyclerIngestion('${b.id}')">Confirm Safe Disposal</button>
        </div>
      </div>
    `;
  }).join('');
}

function confirmRecyclerIngestion(batteryId) {
  const battery = AppState.batteries.find(b => b.id === batteryId);
  if (!battery) return;

  battery.status = 'Done';
  if (!battery.timeline) battery.timeline = {};
  battery.timeline.done = 'Disposed & Recycled';

  saveState();
  renderAll();
  showToast(`Hazmat intake confirmed for ${battery.id}. Closed-loop raw material extraction logged.`, 'success');
}

function generateEprCertificate(batteryId) {
  showToast(`📄 EPR Compliance Certificate generated for ${batteryId} (ISO 14040). Ready for regulatory audit.`, 'success');
}

/**
 * 4.9 Alerts Drawer & Badges
 */
function renderAlertsDrawer() {
  const container = document.getElementById('alerts-list');
  if (!container) return;

  if (AppState.alerts.length === 0) {
    container.innerHTML = `<p style="color: var(--text-muted); text-align: center; padding: 20px;">No alerts at this time.</p>`;
    return;
  }

  container.innerHTML = AppState.alerts.map(a => {
    return `
      <div class="alert-item ${a.type === 'danger' ? 'alert-danger' : ''}">
        <strong>${a.title}</strong>
        <p style="margin-top: 4px; font-size: 0.78rem;">${a.message}</p>
        <div class="alert-item-time">${a.time}</div>
      </div>
    `;
  }).join('');
}

function updateUnreadAlertBadge() {
  const dot = document.getElementById('unread-alert-dot');
  if (dot) {
    dot.classList.toggle('active', AppState.alerts.length > 0);
  }
}

// ============================================================================
// 5. User Interactions & Event Handlers
// ============================================================================

function switchRole(role) {
  AppState.activeRole = role;

  // Update tabs
  document.getElementById('role-owner-btn').classList.toggle('active', role === 'owner');
  document.getElementById('role-vendor-btn').classList.toggle('active', role === 'vendor');
  document.getElementById('role-recycler-btn').classList.toggle('active', role === 'recycler');

  // Switch panels
  document.getElementById('owner-view').classList.toggle('active', role === 'owner');
  document.getElementById('vendor-view').classList.toggle('active', role === 'vendor');
  document.getElementById('recycler-view').classList.toggle('active', role === 'recycler');

  // Trigger leaflet map redraw if switching to owner
  if (role === 'owner' && AppState.leafletMap) {
    setTimeout(() => AppState.leafletMap.invalidateSize(), 200);
  }
}

function filterBatteries(filterKey) {
  AppState.currentFilter = filterKey;
  document.querySelectorAll('.pill-filters .pill-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filterKey);
  });
  renderBatteryList();
}

function handleSearch(val) {
  AppState.searchQuery = val;
  renderBatteryList();
}

function filterVendors(filterKey) {
  AppState.vendorFilter = filterKey;
  document.querySelectorAll('.vendor-filter-group .pill-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.vfilter === filterKey);
  });
  renderVendorDirectory();
}

function scrollToVendors() {
  const el = document.getElementById('vendor-map-section');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function toggleTheme() {
  const body = document.body;
  const isDark = body.classList.contains('dark-theme');
  body.classList.toggle('dark-theme', !isDark);
  body.classList.toggle('light-theme', isDark);

  document.getElementById('theme-icon').innerText = isDark ? '☀️' : '🌙';
}

function toggleAlertsDrawer(forceOpen) {
  const drawer = document.getElementById('alerts-drawer');
  const backdrop = document.getElementById('alerts-drawer-backdrop');
  const isOpen = drawer.classList.contains('active');

  const willOpen = forceOpen !== undefined ? forceOpen : !isOpen;
  drawer.classList.toggle('active', willOpen);
  backdrop.classList.toggle('active', willOpen);
}

function toggleDemoBanner(show) {
  const banner = document.getElementById('demo-banner');
  if (banner) banner.style.display = show ? 'block' : 'none';
}

// ============================================================================
// 6. Registration Modal & Live Preview Engine
// ============================================================================

function openRegisterModal() {
  document.getElementById('register-modal').classList.add('active');
  updateLiveRegistrationPreview();
}

function closeRegisterModal() {
  document.getElementById('register-modal').classList.remove('active');
}

function updateLiveRegistrationPreview() {
  const age = parseFloat(document.getElementById('reg-age').value) || 0;
  const cycles = parseInt(document.getElementById('reg-cycles').value) || 0;
  const ratedV = parseFloat(document.getElementById('reg-v-rated').value) || 1;
  const actualV = parseFloat(document.getElementById('reg-v-actual').value) || ratedV;
  const temp = parseInt(document.getElementById('reg-temp').value) || 25;
  const damage = document.getElementById('reg-damage').checked;

  // Labels
  document.getElementById('val-age').innerText = age;
  document.getElementById('val-cycles').innerText = cycles;
  document.getElementById('val-temp').innerText = temp;

  let vDropPct = 0;
  if (actualV < ratedV) {
    vDropPct = ((ratedV - actualV) / ratedV) * 100;
  }
  document.getElementById('val-v-drop').innerText = `${vDropPct.toFixed(1)}% below rated`;

  // Compute live assessment
  const tempBattery = {
    ageYears: age,
    cycles: cycles,
    ratedVoltage: ratedV,
    measuredVoltage: actualV,
    peakTemp: temp,
    hasDamage: damage
  };

  const preview = assess(tempBattery);

  // Update preview box
  const scoreEl = document.getElementById('preview-score');
  scoreEl.innerText = preview.score;
  scoreEl.style.color = preview.route.color;

  const pillEl = document.getElementById('preview-triage-pill');
  pillEl.innerText = preview.route.label;
  pillEl.className = `preview-triage-pill tag-triage-${preview.routeKey}`;

  // Update live deduction tally
  const deductionsListEl = document.getElementById('preview-deductions-list');
  deductionsListEl.innerHTML = Object.values(preview.deductions).map(d => {
    return `<li><span>${d.label}:</span> <strong style="color: ${d.pts > 0 ? 'var(--color-recycle)' : 'var(--color-repair)'}">${d.pts > 0 ? `-${d.pts}` : '0'} pts</strong></li>`;
  }).join('');

  document.getElementById('preview-co2-info').innerHTML = `🌱 Diverting this pack saves ~<strong>${preview.route.co2Kg} kg CO₂</strong>!`;
}

function handleRegisterSubmit(e) {
  e.preventDefault();

  const id = document.getElementById('reg-id').value.trim();
  const model = document.getElementById('reg-model').value.trim();
  const owner = document.getElementById('reg-owner').value.trim();
  const age = parseFloat(document.getElementById('reg-age').value) || 0;
  const cycles = parseInt(document.getElementById('reg-cycles').value) || 0;
  const ratedV = parseFloat(document.getElementById('reg-v-rated').value) || 400;
  const actualV = parseFloat(document.getElementById('reg-v-actual').value) || 400;
  const temp = parseInt(document.getElementById('reg-temp').value) || 25;
  const damage = document.getElementById('reg-damage').checked;

  const newBattery = {
    id: id || `EB-${Date.now().toString().slice(-3)}`,
    model: model || 'Generic EV Pack',
    owner: owner || 'EV Owner',
    city: 'Pune, MH',
    chemistry: 'Lithium-ion NMC',
    ageYears: age,
    cycles: cycles,
    ratedVoltage: ratedV,
    measuredVoltage: actualV,
    peakTemp: temp,
    hasDamage: damage,
    status: 'Registered',
    timeline: {
      registered: 'Just now',
      collected: null,
      tested: null,
      done: null
    }
  };

  AppState.batteries.unshift(newBattery);
  AppState.selectedBatteryId = newBattery.id;

  saveState();
  closeRegisterModal();
  generateSystemAlerts();
  renderAll();

  showToast(`🎉 Battery ${newBattery.id} registered! Health Score: ${assess(newBattery).score}/100`, 'success');
}

// ============================================================================
// 7. Request Quote Modal
// ============================================================================

let currentTargetVendorId = null;

function openQuoteModalForVendor(vendorId) {
  currentTargetVendorId = vendorId;
  const vendor = AppState.vendors.find(v => v.id === vendorId);
  if (!vendor) return;

  const modal = document.getElementById('quote-modal');
  modal.classList.add('active');

  document.getElementById('quote-vendor-summary').innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <div>
        <h4>${vendor.name}</h4>
        <span style="font-size: 0.78rem; color: var(--text-secondary);">${vendor.typeLabel} • ${vendor.distanceKm} km away</span>
      </div>
      <span class="tag-triage tag-triage-${vendor.type}">Verified Partner</span>
    </div>
  `;

  // Populate battery select dropdown
  const selectEl = document.getElementById('quote-battery-select');
  selectEl.innerHTML = AppState.batteries.map(b => {
    return `<option value="${b.id}" ${b.id === AppState.selectedBatteryId ? 'selected' : ''}>${b.id} - ${b.model} (${assess(b).score}/100)</option>`;
  }).join('');

  updateQuoteModalBatteryDetails();
}

function updateQuoteModalBatteryDetails() {
  const selectEl = document.getElementById('quote-battery-select');
  const batteryId = selectEl.value;
  const battery = AppState.batteries.find(b => b.id === batteryId);
  if (!battery) return;

  const assessment = assess(battery);
  document.getElementById('quote-attached-health').innerHTML = `
    <div style="background: var(--bg-surface); padding: 10px; border-radius: var(--radius-md); font-size: 0.8rem; border: 1px solid var(--border-subtle);">
      Attached Telemetry: SOH <strong>${assessment.score}/100</strong> | Age: <strong>${battery.ageYears} yrs</strong> | Cycles: <strong>${battery.cycles}</strong> | Temp: <strong>${battery.peakTemp}°C</strong>
    </div>
  `;
}

function closeQuoteModal() {
  document.getElementById('quote-modal').classList.remove('active');
}

function handleQuoteSubmit(e) {
  e.preventDefault();

  const batteryId = document.getElementById('quote-battery-select').value;
  const notes = document.getElementById('quote-notes').value.trim();
  const vendor = AppState.vendors.find(v => v.id === currentTargetVendorId);
  const battery = AppState.batteries.find(b => b.id === batteryId);

  if (!vendor || !battery) return;

  const newQuote = {
    id: `QR-${Math.floor(100 + Math.random() * 900)}`,
    batteryId: battery.id,
    batteryModel: battery.model,
    vendorId: vendor.id,
    vendorName: vendor.name,
    servicePath: vendor.typeLabel,
    quoteAmount: 'Awaiting Quote',
    remarks: notes || 'Inspection requested by owner',
    status: 'Pending Quote',
    createdAt: 'Just now'
  };

  AppState.quotes.unshift(newQuote);
  saveState();
  closeQuoteModal();
  renderAll();

  showToast(`Quote request sent to ${vendor.name} for ${battery.id}!`, 'success');
}

// ============================================================================
// 8. Interactive Demo Walkthrough
// ============================================================================

function runDemoStep(stepNumber) {
  document.querySelectorAll('.demo-step-btn').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.step) === stepNumber);
  });

  switch (stepNumber) {
    case 1:
      // Step 1: Click EB-103 (damaged, hot, low voltage). Red score, recycler route.
      switchRole('owner');
      selectBattery('EB-103');
      showToast('Step 1: Examined EB-103. Notice the RED health score (0/100) and critical thermal & swelling deductions.', 'danger');
      break;

    case 2:
      // Step 2: Click EB-101 (healthy), scroll to vendor map, open quote
      switchRole('owner');
      selectBattery('EB-101');
      scrollToVendors();
      setTimeout(() => {
        openQuoteModalForVendor('V-101');
        showToast('Step 2: Selected EB-101 (Healthy). Opened Quote Request modal for AutoVolt Solutions.', 'success');
      }, 400);
      break;

    case 3:
      // Step 3: Switch to Vendor tab. Request appears with score. Click send quote.
      closeQuoteModal();
      switchRole('vendor');
      showToast('Step 3: In Vendor Portal! Vendors review the health telemetry and send price quotes.', 'info');
      break;

    case 4:
      // Step 4: Switch back to Owner. Under "My requests", press Accept to confirm booking.
      switchRole('owner');
      const quotesSection = document.getElementById('owner-quotes-section');
      if (quotesSection) quotesSection.scrollIntoView({ behavior: 'smooth' });
      showToast('Step 4: Back in Owner View. Click "Accept Quote" on pending proposals to confirm booking.', 'success');
      break;

    case 5:
      // Step 5: Select battery, simulate status updates Registered -> Collected -> Tested -> Done.
      switchRole('owner');
      selectBattery('EB-101');
      advanceSelectedBatteryStatus();
      const detailSection = document.getElementById('detail-panel');
      if (detailSection) detailSection.scrollIntoView({ behavior: 'smooth' });
      showToast('Step 5: Simulated status update! Watch the lifecycle timeline progress toward completion.', 'success');
      break;

    case 6:
      // Step 6: Switch to Recycler tab to see only unsafe or dead packs waiting for pickup.
      switchRole('recycler');
      showToast('Step 6: Certified Recycler Manifest. Shows only high-risk packs (EB-103) with hazmat recovery tracking.', 'warning');
      break;
  }
}

// ============================================================================
// 9. Toast Notifications System
// ============================================================================

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = 'ℹ️';
  if (type === 'success') icon = '✅';
  if (type === 'warning') icon = '⚠️';
  if (type === 'danger') icon = '🚨';

  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}

// ============================================================================
// 10. Initialization on DOM Load
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  loadState();
  initLeafletMap();
  renderAll();

  // Initial greeting toast
  setTimeout(() => {
    showToast('Welcome to EcoDispose (Team CodeXtra)! Click any step on the top demo banner to test.', 'success');
  }, 600);
});
