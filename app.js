// SAM.gov Defense Opportunity Search Dashboard JavaScript

// DOM elements
const searchBtn = document.getElementById('searchBtn');
const exportBtn = document.getElementById('exportBtn');
const keywordsInput = document.getElementById('keywordsInput');
const postedFromInput = document.getElementById('postedFrom');
const postedToInput = document.getElementById('postedTo');
const typeSelect = document.getElementById('typeSelect');
const loadingIndicator = document.getElementById('loadingIndicator');
const resultsHeader = document.getElementById('resultsHeader');
const resultsTitle = document.getElementById('resultsTitle');
const resultsCount = document.getElementById('resultsCount');
const resultsTable = document.getElementById('resultsTable');
const resultsBody = document.getElementById('resultsBody');

let latestResults = [];

// Event listeners
searchBtn.addEventListener('click', handleUserSearch);
exportBtn.addEventListener('click', exportResultsToCSV);

// Utility functions
function formatInputDate(val) {
 if (!val) return "";
 const [year, month, day] = val.split("-");
 return `${month}/${day}/${year}`;
}

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

function getOpportunityTypeClass(type) {
 if (!type) return '';
 type = type.toLowerCase();
 if (type.includes('sources sought')) return 'status--sources-sought';
 if (type.includes('information')) return 'status--rfi';
 if (type.includes('solicitation')) return 'status--solicitation';
 if (type.includes('transaction') || type.includes('ota')) return 'status--ota';
 return '';
}

function formatDate(dateString) {
 if (!dateString) return "";
 const date = new Date(dateString);
 if (isNaN(date)) return dateString;
 return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// MAIN SEARCH LOGIC
async function handleUserSearch() {
 const keywords = (keywordsInput.value || "").trim();
 const oppType = typeSelect.value;

 if (!keywords) {
 alert("Please enter one or more keywords.");
 return;
 }
 const postedFrom = formatInputDate(postedFromInput.value);
 const postedTo = formatInputDate(postedToInput.value);

 showLoading();
 try {
 const url = `/api/sam-search?keyword=${encodeURIComponent(keywords)}&postedFrom=${postedFrom}&postedTo=${postedTo}&limit=50`;
 const response = await fetch(url);
 const data = await response.json();

 // Map and filter by type if selected
 let opportunities = (data.opportunitiesData || []).map(opp => ({
 title: opp.title || "",
 agency: opp.fullParentPathName || "",
 type: opp.type || "",
 postedDate: opp.postedDate || "",
 responseDeadline: opp.responseDeadLine || "",
 estimatedValue: (opp.award && opp.award.amount) ? `$${opp.award.amount.toLocaleString()}` : "TBD",
 link: opp.uiLink || (opp.links && opp.links[0] && opp.links.href) || "#"
 }));

 // Local filter for opportunity type
 if (oppType) {
 const oppTypeLower = oppType.toLowerCase();
 opportunities = opportunities.filter(opp =>
 (opp.type || "").toLowerCase().includes(oppTypeLower)
 );
 }

 latestResults = opportunities; // Save for export
 hideLoading();
 displayResults(opportunities, `Results for "${keywords}"${oppType ? ' (' + oppType + ')' : ''}`);
 } catch (err) {
 hideLoading();
 alert("Error fetching opportunities: " + (err.message || err));
 }
}

function displayResults(data, searchTitle) {
 resultsTitle.textContent = searchTitle || "";
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

// EXPORT TO CSV
function exportResultsToCSV() {
 if (!latestResults.length) {
 alert("No results to export.");
 return;
 }

 const header = ["Title", "Agency", "Type", "Posted Date", "Response Deadline", "Estimated Value", "Link"];
 const rows = latestResults.map(opp => [
 `"${opp.title.replace(/"/g, '""')}"`,
 `"${opp.agency.replace(/"/g, '""')}"`,
 `"${opp.type.replace(/"/g, '""')}"`,
 `"${formatDate(opp.postedDate)}"`,
 `"${formatDate(opp.responseDeadline)}"`,
 `"${(opp.estimatedValue || "").replace(/"/g, '""')}"`,
 `"${opp.link}"`
 ].join(","));

 const csvContent = [header.join(","), ...rows].join("\r\n");

 const blob = new Blob([csvContent], {type: "text/csv"});
 const url = URL.createObjectURL(blob);

 const a = document.createElement("a");
 a.href = url;
 a.download = "sam-opportunities.csv";
 document.body.appendChild(a);
 a.click();
 document.body.removeChild(a);
 URL.revokeObjectURL(url);
}
