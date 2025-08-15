# DoD-funding-humanoids
# Embodied AI & Robotics DoD Funding Dashboard

This web application provides targeted searches for U.S. government funding opportunities in embodied AI, robotics, sim-to-real, digital twin, and autonomy technologies. Search logic is focused on the needs of advanced defense startups and growth-stage teams looking for shaping, capture, and prototype engagements across DoD, NASA, DOE, and related agencies.

## Features

- **Three search categories:**
 - Shaping Stage (Sources Sought, RFI, Forecasts): For pipeline shaping, 6-98 month window.
 - Near-Term Capture (Active Solicitations): For immediate capture, ready for proposals.
 - High-Dollar Prototypes ($500k - $25M): OTAs, BAAs, SBIR/STTR, prototype projects.

- Boolean-powered, defense-focused opportunity aggregation using agency, tech domain, and contract type search logic.
- Results table with direct links to SAM.gov opportunities.
- Clean, executive-optimized UI for rapid opportunity assessment.
- Responsive design for web and mobile.

## Quick Start

1. **Clone this repository:**
 ```
 git clone https://github.com/msh-run/DoD-funding-humanoids.git
 ```

2. **Deploy locally:**
 Open `index.html` in your browser or serve via a static server (suggested for Chrome).
 ```
 # Python static server example
 python3 -m http.server
 ```

3. **Live deployment options:**
 - [GitHub Pages](https://pages.github.com/)
 - Netlify, Vercel, AWS Amplify

4. **Customization:**
 - Edit keyword lists in JS for new tech domains or agencies.
 - Replace mock data with live data feeds or official SAM.gov API integration for robust automation.

## Technology Stack

- HTML5, CSS3 (custom theme)
- JavaScript ES6 (frontend logic)
- No server/backend required (static deployment)

## For questions or enhancements
Open an issue or email msh-run for strategic feature requests, pipeline extensions, or DoD-specific logic improvements.
