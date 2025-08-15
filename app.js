// SAM.gov Defense Opportunity Search Dashboard JavaScript

// Mock data for the three search types
const mockData = {
 "shaping": [
 {
 "title": "Advanced Humanoid Robotics Research - Sources Sought",
 "agency": "DARPA",
 "type": "Sources Sought Notice",
 "postedDate": "2025-08-10",
 "responseDeadline": "2025-09-15",
 "estimatedValue": "TBD",
 "link": "https://sam.gov/opp/12345"
 },
 {
 "title": "Embodied AI for Military Applications - RFI",
 "agency": "AFRL",
 "type": "Request for Information",
 "postedDate": "2025-08-05",
 "responseDeadline": "2025-09-30",
 "estimatedValue": "TBD",
 "link": "https://sam.gov/opp/12346"
 },
 {
 "title": "Autonomous Systems Integration - Pre-solicitation",
 "agency": "Army Futures Command",
 "type": "Presolicitation Notice",
 "postedDate": "2025-08-12",
 "responseDeadline": "2025-10-15",
 "estimatedValue": "$1M - $10M",
 "link": "https://sam.gov/opp/12347"
 },
 {
 "title": "Digital Twin Technology for Naval Systems - Sources Sought",
 "agency": "NAVSEA",
 "type": "Sources Sought Notice",
 "postedDate": "2025-08-08",
 "responseDeadline": "2025-09-20",
 "estimatedValue": "TBD",
 "link": "https://sam.gov/opp/12348"
 },
 {
 "title": "Human Performance Modeling Research - RFI",
 "agency": "ONR",
 "type": "Request for Information",
 "postedDate": "2025-08-14",
 "responseDeadline": "2025-10-01",
 "estimatedValue": "TBD",
 "link": "https://sam.gov/opp/12349"
 }
 ],
 "capture": [
 {
 "title": "Robotics Data Infrastructure Development",
 "agency": "DARPA",
 "type": "Combined Synopsis/Solicitation",
 "postedDate": "2025-08-13",
 "responseDeadline": "2025-09-30",
 "estimatedValue": "$2.5M",
 "link": "https://sam.gov/opp/22345"
 },
 {
 "title": "AI-Enabled Manufacturing Robotics",
 "agency": "AFRL",
 "type": "Solicitation",
 "postedDate": "2025-08-09",
 "responseDeadline": "2025-10-15",
 "estimatedValue": "$3.2M",
 "link": "https://sam.gov/opp/22346"
 },
 {
 "title": "Motion Capture Systems for Training",
 "agency": "Army Futures Command",
 "type": "Solicitation",
 "postedDate": "2025-08-11",
 "responseDeadline": "2025-09-25",
 "estimatedValue": "$1.8M",
 "link": "https://sam.gov/opp/22347"
 },
 {
 "title": "Autonomous Maritime Logistics Systems",
 "agency": "NavalX",
 "type": "Combined Synopsis/Solicitation",
 "postedDate": "2025-08-07",
 "responseDeadline": "2025-10-05",
 "estimatedValue": "$4.1M",
 "link": "https://sam.gov/opp/22348"
 },
 {
 "title": "Human-Robot Interaction Interface Development",
 "agency": "SOCOM",
 "type": "Solicitation",
 "postedDate": "2025-08-15",
 "responseDeadline": "2025-10-20",
 "estimatedValue": "$2.9M",
 "link": "https://sam.gov/opp/22349"
 }
 ],
 "prototype": [
 {
 "title": "Next-Generation Humanoid Robot Platform",
 "agency": "DARPA",
 "type": "Other Transaction Authority",
 "postedDate": "2025-08-06",
 "responseDeadline": "2025-11-15",
 "estimatedValue": "$15M",
 "link": "https://sam.gov/opp/32345"
 },
 {
 "title": "Large Movement Model Development - SBIR Phase III",
 "agency": "AFRL",
 "type": "SBIR Phase III",
 "postedDate": "2025-08-12",
 "responseDeadline": "2025-10-30",
 "estimatedValue": "$8.5M",
 "link": "https://sam.gov/opp/32346"
 },
 {
 "title": "Autonomous Systems Command & Control - BAA",
 "agency": "Army Futures Command",
 "type": "Broad Agency Announcement",
 "postedDate": "2025-08-04",
 "responseDeadline": "2025-12-01",
 "estimatedValue": "$20M",
 "link": "https://sam.gov/opp/32347"
 },
 {
 "title": "Distributed Robotics Network Prototype",
 "agency": "ONR",
 "type": "Prototype Project",
 "postedDate": "2025-08-10",
 "responseDeadline": "2025-11-30",
 "estimatedValue": "$12M",
 "link": "https://sam.gov/opp/32348"
 },
 {
 "title": "Advanced Manufacturing Robotics Ecosystem",
 "agency": "NIST",
 "type": "Other Transaction Authority",
 "postedDate": "2025-08-14",
 "responseDeadline": "2025-12-15",
 "estimatedValue": "$25M",
 "link": "https://sam.gov/opp/32349"
 },
 {
 "title": "Wearable Motion Data Collection System",
 "agency": "MTEC",
 "type": "Prototype Project",
 "postedDate": "2025-08-08",
 "responseDeadline": "2025-11-01",
 "estimatedValue": "$6.8M",
 "link": "https://sam.gov/opp/32350"
 }
 ]
};

// Search type configurations
const searchConfigs = {
 'shaping': {
 title: 'Shaping Stage Opportunities',
 description: 'Early-stage opportunities including Sources Sought, RFI, and Pre-solicitations'
 },
 'capture': {
 title: 'Near-Term Capture Opportunities',
 description: 'Active solicitations ready for proposal submission'
 },
 'prototype': {
 title: 'High-Dollar Prototype Opportunities',
 description: 'Prototype and OTA opportunities with significant funding ($500K - $25M)'
 }
};

// DOM Elements
const shapingBtn = document.getElementById('shapingBtn');
const captureBtn = document.getElementById('captureBtn');
const prototypeBtn = document.getElementById('prototypeBtn');
const clearBtn = document.getElementById('clearBtn');
const loadingIndicator = document.getElementById('loadingIndicator');
const resultsSection = document.getElementById('resultsSection');
const resultsHeader = document.getElementById('resultsHeader');
const resultsTitle = document.getElementById('resultsTitle');
const resultsCount = document.getElementById('resultsCount');
const resultsTable = document.getElementById('resultsTable');
const resultsBody = document.getElementById('resultsBody');

// Event Listeners
shapingBtn.addEventListener('click', () => performSearch('shaping'));
captureBtn.addEventListener('click', () => performSearch('capture'));
prototypeBtn.addEventListener('click', () => performSearch('prototype'));
clearBtn.addEventListener('click', clearResults);

// Utility function to format dates
function formatDate(dateString) {
 const date = new Date(dateString);
 return date.toLocaleDateString('en-US', {
 year: 'numeric',
 month: 'short',
 day: 'numeric'
 });
}

// Function to get CSS class for opportunity type
function getOpportunityTypeClass(type) {
 if (type.toLowerCase().includes('sources sought')) {
 return 'status--sources-sought';
 } else if (type.toLowerCase().includes('information')) {
 return 'status--rfi';
 } else if (type.toLowerCase().includes('solicitation')) {
 return 'status--solicitation';
 } else if (type.toLowerCase().includes('transaction') || type.toLowerCase().includes('ota')) {
 return 'status--ota';
 }
 return '';
}

// Function to handle opportunity link clicks
function handleOpportunityClick(event, link) {
 // Allow the default link behavior to proceed
 // The target="_blank" will handle opening in new tab
 console.log('Opening opportunity:', link);
}

// Function to perform search simulation
function performSearch(searchType) {
 const config = searchConfigs[searchType];
 const data = mockData[searchType];

 // Show loading indicator
 showLoading();
 
 // Simulate network delay
 setTimeout(() => {
 hideLoading();
 displayResults(config, data);
 }, 1200);
}

// Function to show loading indicator
function showLoading() {
 loadingIndicator.classList.remove('hidden');
 resultsHeader.classList.add('hidden');
 resultsTable.classList.add('hidden');
}

// Function to hide loading indicator
function hideLoading() {
 loadingIndicator.classList.add('hidden');
}

// Function to display search results
function displayResults(config, data) {
 // Update results header
 resultsTitle.textContent = config.title;
 resultsCount.textContent = `${data.length} opportunities found`;
 resultsHeader.classList.remove('hidden');

 // Clear previous results
 resultsBody.innerHTML = '';

 // Populate table with results
 data.forEach(opportunity => {
 const row = document.createElement('tr');
 
 row.innerHTML = `
 <td>
 <a href="${opportunity.link}" target="_blank" class="opportunity-link" rel="noopener noreferrer">
 ${opportunity.title}
 </a>
 </td>
 <td>
 <span class="agency-name">${opportunity.agency}</span>
 </td>
 <td>
 <span class="opportunity-type ${getOpportunityTypeClass(opportunity.type)}">
 ${opportunity.type}
 </span>
 </td>
 <td class="date-cell">
 ${formatDate(opportunity.postedDate)}
 </td>
 <td class="date-cell">
 ${formatDate(opportunity.responseDeadline)}
 </td>
 <td class="value-cell">
 ${opportunity.estimatedValue}
 </td>
 `;
 
 resultsBody.appendChild(row);
 });

 // Show results table
 resultsTable.classList.remove('hidden');
 
 // Scroll to results
 resultsSection.scrollIntoView({ 
 behavior: 'smooth',
 block: 'start'
 });
}

// Function to clear results
function clearResults() {
 resultsHeader.classList.add('hidden');
 resultsTable.classList.add('hidden');
 resultsBody.innerHTML = '';
 
 // Scroll back to top
 window.scrollTo({ 
 top: 0, 
 behavior: 'smooth' 
 });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
 console.log('SAM.gov Defense Opportunity Search Dashboard initialized');
 
 // Ensure all elements start in correct state
 clearResults();
 hideLoading();
});
