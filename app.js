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
const results
