# WealthFlow AI

AI-powered Financial Advisory Platform for deploying $600K investment by Feb 1, 2026.

## Features
- 5 Specialized Financial Advisors
- Chief Investment Officer (Manager Agent)
- Interactive portfolio allocation chart
- Real-time consultation simulation
- Modern dark theme with glassmorphism

## Tech Stack
- HTML5, CSS3 (Grid, Flexbox, Custom Properties)
- Vanilla JavaScript
- Chart.js for visualizations

## Deployment

This site automatically deploys to GitHub Pages when commits are pushed to the `main` branch.

### Setup GitHub Pages (one-time)
1. Go to your repository Settings
2. Navigate to Pages (under "Code and automation")
3. Under "Build and deployment", select:
   - Source: **GitHub Actions**
4. Push a commit to trigger the first deployment

The workflow will deploy the `/static` directory to GitHub Pages.

## Run Locally
```bash
node server.js
# Open http://localhost:8000
```

