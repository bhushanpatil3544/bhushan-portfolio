# Bhushan Shelke — Data Engineer & AI Specialist Portfolio

Personal portfolio website for **Bhushan Shelke** (`bhushanshelke.dev`), tailored specifically for **Data Engineering**, **Big Data**, and **Applied AI / RAG** roles.

---

## 🚀 Live Features
- **Modern Data Engineer Aesthetic**: Dark-mode-first terminal style with light/dark theme switching, glowing gradients, and responsive layout.
- **10 Core Sections**:
  1. **Hero / Home**: Headline, typing role animation, quick stats, primary CTAs, and verified social links.
  2. **About Me**: Narrative bio, fast facts, and university/cultural leadership roles.
  3. **Technical Skills**: Interactive category cards with real-time live search filter.
  4. **Projects**: Category filter tabs (Data Engineering, GenAI & RAG, Machine Learning & CV, Backend Systems) with architecture highlights, problem statements, and GitHub links.
  5. **Professional Experience**: Interactive career journey timeline detailing C-DAC postgraduate work and engineering leadership.
  6. **Education**: C-DAC PGCP-BDA, B.E. in IT (SGBAU), and higher secondary credentials.
  7. **Certifications**: Verified credentials (AWS Academy Cloud Foundations, Python CPF, Deloitte Forage, Excel VBA, SunBeam PreCAT).
  8. **Achievements**: Visual spotlight for 1st Place Hackathon Winner at C-DAC Mumbai, sports, and cultural achievements.
  9. **Resume**: Direct PDF download and browser preview modal.
  10. **Contact**: Quick copy-to-clipboard for Email & Phone with toast notifications, social links, and recruiter inquiry form.
- **Search Engine Optimization (SEO)**:
  - JSON-LD Structured Data Schema (`@type: Person` & `WebSite`)
  - Open Graph & Twitter Card metadata
  - XML Sitemap (`sitemap.xml`) & `robots.txt`
  - Canonical link `https://bhushanshelke.dev/`

---

## 💻 Running the Website Locally

You can run this project locally without any dependencies using Python's built-in HTTP server:

```bash
# 1. Navigate to the project directory
cd C:\Users\user\.gemini\antigravity\scratch\bhushanshelke-portfolio

# 2. Start a local server
python -m http.server 8000
```

Then open your browser and visit: **`http://localhost:8000`**

---

## 🌐 Deploying to Production

### Option A: GitHub Pages (Recommended & Free)
1. Initialize git and push to a new GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Bhushan Shelke portfolio"
   git branch -M main
   git remote add origin https://github.com/bhushanpatil3544/bhushanshelke.dev.git
   git push -u origin main
   ```
2. Go to **Settings → Pages** on GitHub.
3. Under **Build and deployment → Source**, choose **Deploy from a branch** (select `main` / `root`).
4. Under **Custom domain**, enter: `bhushanshelke.dev` and check **Enforce HTTPS**.

### Option B: Cloudflare Pages / Vercel / Netlify
1. Log in to [Vercel](https://vercel.com) or [Cloudflare Pages](https://pages.cloudflare.com) or [Netlify](https://www.netlify.com).
2. Import your GitHub repository or drag-and-drop the `bhushanshelke-portfolio` folder.
3. Keep default settings (Framework: *Other*, Root directory: `./`).
4. Click **Deploy**.

---

## 🔗 Connecting Your Custom Domain (`bhushanshelke.dev`)

In your Domain Registrar (Namecheap, GoDaddy, Hostinger, Cloudflare Registrar, or Google Domains):

1. **Configure Apex A Records**:
   | Type | Host / Name | Value / Target | TTL |
   | :--- | :--- | :--- | :--- |
   | `A` | `@` | `185.199.108.153` | Automatic / 300 |
   | `A` | `@` | `185.199.109.153` | Automatic / 300 |
   | `A` | `@` | `185.199.110.153` | Automatic / 300 |
   | `A` | `@` | `185.199.111.153` | Automatic / 300 |

2. **Configure CNAME Record for `www`**:
   | Type | Host / Name | Value / Target | TTL |
   | :--- | :--- | :--- | :--- |
   | `CNAME` | `www` | `bhushanpatil3544.github.io` | Automatic / 300 |

---

## 🔍 Google Search Console Setup & Sitemap Submission

To rank high when recruiters search **"Bhushan Shelke"**:

1. Go to [Google Search Console](https://search.google.com/search-console).
2. Click **Add Property** and select **Domain** (`bhushanshelke.dev`) or **URL prefix** (`https://bhushanshelke.dev`).
3. Verify ownership via DNS TXT record or HTML verification tag.
4. Once verified, navigate to **Sitemaps** in the left sidebar.
5. Enter `sitemap.xml` under **Add a new sitemap** and click **Submit**.
6. Google will automatically index the site structure and rich JSON-LD data!

---

## 📁 Project Structure

```
bhushanshelke-portfolio/
├── index.html                    # Semantic HTML5 & JSON-LD Structured Data
├── styles.css                    # Modern Data Engineering Design System
├── script.js                     # Dynamic Filters, Theme Switcher & Interactions
├── robots.txt                    # Search Engine Crawler Directives
├── sitemap.xml                   # XML Sitemap for Google Search Indexing
├── CNAME                         # Custom Domain Declaration (bhushanshelke.dev)
├── README.md                     # Documentation & Deployment Guide
└── assets/
    └── Bhushan_Shelke_Resume.pdf # Downloadable Master Resume
```
