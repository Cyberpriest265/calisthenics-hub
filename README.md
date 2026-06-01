# ⚡ CalisthenicsHub

> A high-performance, conversion-optimized marketing website and personal brand platform for calisthenics coaching. Built statically with Next.js for blazing fast performance.

---

## 🗂️ Project Structure

```
calisthenics-hub/
├── frontend/         # Next.js Web App (Static/SSG ready)
├── docs/             # Project documentation (FRD, NFR, Architecture)
├── raycast/          # Design system & visual reference
└── README.md
```

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 15, React 19, TypeScript |
| **Styling** | Vanilla CSS (Raycast design system) |
| **Architecture** | Static Site Generation (SSG) |
| **Deployment** | Vercel (Edge Network) |
| **Newsletter** | Placeholder (Ready for ConvertKit/Mailchimp) |

---

## ✅ Core Features

- 🏠 **Landing Page** — High-converting hero section and instructor showcase.
- 📚 **Programs & Coaching** — Catalog of offerings linking to external payment/delivery platforms (e.g., Kajabi, Teachable).
- ✉️ **Newsletter Capture** — Privacy-conscious email collection architecture.
- 🎨 **Premium UI/UX** — Suspended glassmorphism navbars, dark-mode void aesthetic, and fluid animations.
- ⚡ **Ultimate Performance** — Zero backend dependencies, purely frontend driven for 100% uptime and instant loads.
- 🛡️ **Maximum Security** — No sensitive user data collection, no passwords, no databases.

---

## 🛠️ Local Development Setup

### Prerequisites
- Node.js v18+
- Git

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/calisthenics-hub.git
cd calisthenics-hub
```

### 2. Frontend setup
```bash
cd frontend
npm install
```

### 3. Start development server
```bash
npm run dev
```

### 4. Open in browser
| URL | Page |
|---|---|
| `http://localhost:3000` | Landing Page |

---

## 🔒 Security & Privacy Notes

- This platform does **not** process payments or store user passwords.
- All course sales and delivery are securely offloaded to specialized external third-party platforms.
- The architecture is intentionally "static-first" to eliminate database attack vectors and API vulnerabilities.

---

## 📄 Documentation

See the [`/docs`](./docs/) folder for detailed specifications:
- [Functional Requirements Document (FRD)](./docs/FRD.md)
- [Non-Functional Requirements (NFR)](./docs/NFR.md)
