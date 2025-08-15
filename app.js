// SAM.gov Defense Opportunity Search Dashboard JavaScript

// Search type configurations
const searchConfigs = {
 shaping: {
 title: 'Shaping Stage Opportunities',
 description: 'Early-stage opportunities including Sources Sought, RFI, and Pre-solicitations'
 },
 capture: {
 title: 'Near-Term Capture Opportunities',
 description: 'Active solicitations ready for proposal submission'
 },
 prototype: {
 title: 'High-Dollar Prototype Opportunities',
 description: 'Prototype and OTA opportunities with significant funding ($500K - $25M)'
 }
};

// Boolean-powered keywords for each search type
const keywordMap = {
 shaping: [
 "Humanoid Robotics", "Embodied AI", "Sim-to-Real", "Sim2Real",
 "Large Movement Model", "LMM", "Large Behavioral Model", "LBM",
 "Motion Capture", "Wearable Motion Data", "Human-Robot Interaction",
 "Robotics Data Infrastructure", "Defense AI", "AI-Enabled Robotics",
 "Autonomous Systems", "Autonomy", "Digital Twin",
 "Human Performance Modeling", "Unmanned Systems",
 "Manufacturing Robotics", "Logistics Robotics"
 ].join(' OR '),
 capture: [
 "Humanoid Robotics", "Embodied AI", "Sim-to-Real", "Sim2Real",
 "Large Movement Model", "LMM", "Large Behavioral Model", "LBM",
 "Motion Capture", "Wearable Motion Data", "Human-Robot Interaction",
 "Robotics Data Infrastructure", "Defense AI", "AI-Enabled Robotics",
 "Autonomous Systems", "Autonomy", "Digital Twin",
 "Human Performance Modeling", "Unmanned Systems",
 "Manufacturing Robotics", "Logistics Robotics"
 ].join(' OR '),
 prototype: [
 "Humanoid Robotics", "Embodied AI", "Sim-to-Real", "Sim2Real",
 "Large Movement Model", "LMM", "Large Behavioral Model", "LBM",
 "Motion Capture", "Wearable Motion Data", "Human-Robot Interaction",
 "Robotics Data Infrastructure", "Defense AI", "AI-Enabled Robotics",
 "Autonomous Systems", "Autonomy", "Digital Twin",
 "Human Performance Modeling", "Unmanned Systems",
 "Manufacturing Robotics", "Logistics Robotics"
 ].join(' OR ')
};

// DOM elements
const shapingBtn = document.getElementById('shapingBtn');
const captureBtn = document.getElementById('captureBtn');
const prototypeBtn = document.getElementById('prototypeBtn');
const clearBtn = document.getElementById('clearBtn');
const postedFromInput = document.getElementById('postedFrom');
const postedToInput = document.getElementById('postedTo');
const loadingIndicator = document.getElementById('loadingIndicator');
const resultsHeader = document.getElementById('resultsHeader');
const resultsTitle = document.getElementById('resultsTitle');
const resultsCount = document.getElementById('resultsCount');
const resultsTable = document.getElementById('resultsTable');
const resultsBody = document.getElementById('resultsBody');

// Event listeners for buttons
shapingBtn.addEventListener('click', () => fetchLiveOpportunities('shaping'));
captureBtn.addEventListener('click', () => fetchLiveOpportunities('capture'));
prototypeBtn.addEventListener('click', () => fetchLiveOpportunities('prototype'));
clearBtn.addEventListener('click', clearResults);

// Format date as MM/DD/YYYY
function formatInputDate(val) {
 if (!val) return "";
 const [year, month, day] = val.split("-");
 return `${month}/${day}/${year}`;
}

// UI helpers
function showLoading() {
 loadingIndicator.classList.remove('hidden');
 resultsHeader.classList.add('hidden');
 resultsTable.classList.add('hidden');
}
function hideLoading() {
 loadingIndicator.classList.add('hidden');
}
function clearResults() {
 resultsTitle.textContent = '';
 resultsCount.textContent = '';
 resultsHeader.classList.add('hidden');
 resultsBody.innerHTML = '';
 resultsTable.classList.add('hidden');
}

// Table type badge helper
function getOpportunityTypeClass(type) {
 if (!type) return '';
 type = type.toLowerCase();
 if (type.includes('sources sought')) return 'status--sources-sought';
 if (type.includes('information')) return 'status--rfi';
 if (type.includes('solicitation')) return 'status--solicitation';
 if (type.includes('transaction') || type.includes('ota')) return 'status--ota';
 return '';
}

// Format for display
function formatDate(dateString) {
 if (!dateString) return "";
 const date = new Date(dateString);
 if (isNaN(date)) return dateString;
 return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Show results in table
function displayResults(config, data) {
 resultsTitle.textContent = config.title;
 resultsCount.textContent = `${data.length} opportunities found`;
 resultsHeader.classList.remove('hidden');
 resultsTable.classList.remove('hidden');
 resultsBody.innerHTML = '';
 data.forEach(opportunity => {
 const row = document.createElement('tr');
 row.innerHTML = `
 <td><a href="${opportunity.link}" target="_blank" rel="noopener">${opportunity.title}</a></td>
 <td>${opportunity.agency}</td>
 <td><span class="status-badge ${getOpportunityTypeClass(opportunity.type)}">${opportunity.type || ""}</span></td>
 <td>${formatDate(opportunity.postedDate)}</td>
 <td>${formatDate(opportunity.responseDeadline)}</td>
 <td>${opportunity.estimatedValue}</td>
 `;
 resultsBody.appendChild(row);
 });
}

// Fetch live DoD opportunities from serverless API
async function fetchLiveOpportunities(searchType) {
 const config = searchConfigs[searchType];
 const postedFrom = formatInputDate(postedFromInput.value);
 const postedTo = formatInputDate(postedToInput.value);
 const keyword = keywordMap[searchType];

 showLoading();
 try {
 const url = `/api/sam-search?keyword=${encodeURIComponent(keyword)}&postedFrom=${postedFrom}&postedTo=${postedTo}&limit=25`;
 const response = await fetch(url);
 const data = await response.json();

 // Defensive parse in case SAM.gov structure changes
 const opportunities = (data.opportunitiesData || []).map(opp => ({
 title: opp.title || "",
 agency: opp.fullParentPathName || "",
 type: opp.type || "",
 postedDate: opp.postedDate || "",
 responseDeadline: opp.responseDeadLine || "",
 estimatedValue: (opp.award && opp.award.amount) ? `$${opp.award.amount.toLocaleString()}` : "TBD",
 link: opp.uiLink || (opp.links && opp.links[0] && opp.links.href) || "#"
 }));

 hideLoading();
 displayResults(config, opportunities);
 } catch (err) {
 hideLoading();
 alert("Error fetching opportunities: " + (err.message || err));
 }
}
