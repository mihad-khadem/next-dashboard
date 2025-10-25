```markdown
# ⚡ Next.js Advanced Dashboard (Frontend)

A **modern, enterprise-grade admin dashboard** built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Shadcn/UI** — engineered for performance, scalability, and developer experience.

---

## 🚀 Overview

This project is a **frontend-only implementation** of a dynamic dashboard UI designed for modern SaaS platforms and admin panels.  
It includes **route-group-based architecture**, **dark/light mode**, **state management**, **animations**, and **data visualization** support.

---

## ✨ Features

| Type             | Feature                                                     |
| ---------------- | ----------------------------------------------------------- |
| ⚙️ Framework     | Built with **Next.js 15 (App Router)** & **TypeScript**     |
| 🎨 Styling       | **Tailwind CSS**, **Shadcn/UI**, and custom utility classes |
| 🌗 Theming       | Dark/Light mode toggle via `next-themes`                    |
| 🧠 State         | Managed by **Zustand** for sidebar/theme                    |
| 🔄 Data          | Handled by **React Query + Axios** with interceptors        |
| 🧾 Validation    | **React Hook Form** + **Zod** for reliable input handling   |
| 📊 Charts        | **Recharts / ApexCharts** for interactive analytics         |
| 💫 Animations    | **Framer Motion** for smooth transitions                    |
| 🌍 i18n          | Multi-language support using **i18next**                    |
| 🧩 UI Components | Modular design system powered by **Shadcn/UI**              |
| 🔐 Structure     | Clean & scalable **App Router-based folder architecture**   |

---

## 🧱 Folder Structure
```

app/
└─ (dashboard)/
├─ layout.tsx
├─ page.tsx
├─ users/
│ └─ page.tsx
├─ products/
│ └─ page.tsx
├─ reports/
│ └─ page.tsx
└─ settings/
└─ page.tsx
components/
├─ layout/
│ ├─ sidebar.tsx
│ ├─ navbar.tsx
│ └─ theme-toggle.tsx
├─ ui/
├─ charts/
├─ tables/
└─ widgets/
hooks/
└─ use-theme.ts
store/
└─ use-sidebar.ts
lib/
├─ utils.ts
├─ axios-client.ts
└─ theme-provider.tsx
styles/
└─ globals.css
types/
└─ index.d.ts

````

This structure is designed for **clarity, modularity, and long-term maintainability.**

---

## 🧰 Tech Stack

| Category | Tools |
|-----------|-------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + Shadcn/UI |
| **Theme** | next-themes |
| **State Management** | Zustand |
| **Data Fetching** | React Query + Axios |
| **Forms & Validation** | React Hook Form + Zod |
| **Charts** | ApexCharts / Recharts |
| **Animation** | Framer Motion |
| **Icons** | Lucide React / Radix Icons |
| **i18n** | i18next + react-i18next |

---

## ⚙️ Installation

```bash
# 1️⃣ Clone the repository
git clone https://github.com/mihad-khadem/react-dashboard.git

# 2️⃣ Move into the project directory
cd react-dashboard

# 3️⃣ Install dependencies
npm install

# 4️⃣ Run the development server
npm run dev
````

Then visit 👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🧩 Environment Setup

If needed, create a `.env.local` file in the root directory for your configuration.

Example:

```bash
NEXT_PUBLIC_API_URL=https://api.example.com
```

---

## 🎨 Styling Configuration

Tailwind and Shadcn/UI are pre-configured.
To extend or add new Shadcn components:

```bash
npx shadcn@latest add button card input dialog table dropdown-menu
```

Global styles live in `styles/globals.css`.

---

## 🧠 State Management

Zustand manages UI-level states like:

- Sidebar open/close state
- Theme preference
- Layout toggles

Example hook (`store/use-sidebar.ts`):

```ts
import { create } from "zustand";

interface SidebarState {
  isOpen: boolean;
  toggle: () => void;
}

export const useSidebar = create<SidebarState>((set) => ({
  isOpen: true,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
```

---

## 🌗 Theme Provider

Dark/light mode uses `next-themes`.

```tsx
// lib/theme-provider.tsx
"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <NextThemesProvider attribute="class">{children}</NextThemesProvider>;
}
```

---

## 📊 Charts

To use charts:

```tsx
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
```

Supports multiple chart types (line, area, bar, pie).

---

## 🌍 i18n Setup

To add multilingual support:

```bash
npm install i18next react-i18next
```

Create translation files under `/public/locales/{lang}/common.json`.

---

## 🚧 Roadmap

- [ ] Add authentication (NextAuth / Clerk)
- [ ] Add server actions for CRUD
- [ ] Integrate Prisma + PostgreSQL backend
- [ ] Role-based access (RBAC)
- [ ] Analytics dashboard (Realtime)
- [ ] Deploy on Vercel with CI/CD

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature
   ```

3. Commit and push your changes
4. Open a Pull Request 🚀

---

## 📜 License

Licensed under the **MIT License** — free for personal & commercial use.

---

## 👤 Author

**Mihad Khadem**
📍 Dhaka, Bangladesh
🌐 [Portfolio](https://mihad-khadem.github.io/portfolio.website/)
🐙 [GitHub](https://github.com/mihad-khadem)
💼 [LinkedIn](https://www.linkedin.com/in/mihad-khadem-6510b6222/)

> 💬 “Built for developers who aim for clean architecture, performance, and scalability.”
