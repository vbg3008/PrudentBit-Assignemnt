# Patient Directory Dashboard

A pixel-perfect healthcare admin dashboard built with **Next.js 15**, **TypeScript**, and **Tailwind CSS** — replicating a Figma design for a medical patient directory.

---

## 🖼️ Overview

The dashboard displays a searchable, filterable, sortable directory of 1,000 patients in two view modes:

| View | Description |
|------|-------------|
| **Table View** | Virtualized scrollable table with compact rows |
| **Card View** | 4-column responsive grid of detailed patient cards |

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── page.tsx               # Server component — reads patient count from JSON
│   ├── layout.tsx             # Root layout — applies Manrope font
│   ├── globals.css            # Global CSS variables and Tailwind setup
│   └── api/patients/route.ts  # API route — serves paginated, filtered, sorted data
│
├── components/
│   └── dashboard/
│       ├── dashboard-header.tsx        # Blue banner with title, subtitle & decorative image
│       ├── patient-directory.tsx       # Main orchestrator — tabs, search, filters, data
│       ├── patient-table.tsx           # Virtualized table (TanStack Virtual)
│       ├── patient-row.tsx             # Individual table row component
│       ├── patient-grid.tsx            # 4-column CSS grid for card view
│       ├── patient-card.tsx            # Individual patient card
│       ├── patient-avatar.tsx          # Avatar with name-initials fallback
│       ├── search-bar.tsx              # Debounced search input
│       ├── sort-dropdown.tsx           # Sort by field/order dropdown
│       ├── disease-filter-dropdown.tsx # Filter patients by medical issue
│       ├── filter-chips.tsx            # Active filter pill tags with remove button
│       ├── dashboard-pagination.tsx    # Page navigation with Previous/Next
│       ├── filter-panel.tsx            # Extended filter panel (expandable)
│       └── error-boundary.tsx          # Error boundary wrapper
│
├── hooks/
│   ├── use-patients.ts    # Main data hook — wraps React Query + URL state
│   ├── use-url-state.ts   # Syncs filter/sort/page params with the URL
│   └── use-debounce.ts    # Debounce utility for search input
│
├── store/
│   └── use-ui-store.ts    # Zustand store — persists selected view mode (table/card)
│
├── types/
│   ├── schema.ts          # Zod schemas: Patient, Contact, ApiResponse
│   └── patient.ts         # Additional TypeScript types
│
├── lib/
│   ├── api.ts             # fetchPatients() — calls the internal API route
│   └── utils.ts           # Helpers: getPatientAvatarUrl(), cn(), etc.
│
└── data/
    └── patients.json      # Source data — 1,000 patient records
```

---

## ✨ Features

### Header
- Solid blue banner (`#3B82F6`), `150px` tall
- "Patient Directory" title at `40px` bold white
- "{count} Patient Found" subtitle at `24px`
- `Group 10.png` decorative medical pattern on the right (served from `/public`)

### Dashboard Controls
- **Table View / Card View** tabs — active tab has a blue underline
- **PDF Export** button (top-right of tabs row)
- **Search bar** — `56px` height, debounced `300ms`, search & filter icons
- **Sort by** dropdown — sort by Name, Age, or ID in ascending/descending order
- **Disease filter** dropdown — filter by any of 10 medical conditions (with stethoscope icon, clear option, checkmark on active)
- **Filter chips** — pill tags showing active filters with a close (×) button
- **Active Filters: N** counter on the right

### Table View
- Virtualized with **TanStack Virtual** (`estimateSize: 56px` rows)
- Fixed `56px` row height with `1px` gray dividers
- Column headers in bold `#3B82F6` blue
- Columns: ID · Name · Age · Medical Issue · Address · Phone Number · Email · →
- "Phone Number" column has a sort indicator arrow
- Missing data shows **N/A** in bold red

### Card View
- 4-column CSS grid, `24px` gap, cards ~`260px` tall
- **Card header** — `#B5D1FE` light blue background containing:
  - `48px` circular avatar
  - Patient name (`16px` semi-bold) and ID (`14px`)
  - Age pill badge (blue `#3B82F6`, white text, rounded-full)
- **Medical issue tag** — colored rectangle with matching border:

  | Condition | Color |
  |-----------|-------|
  | Fever | 🔴 Red |
  | Headache | 🟠 Orange |
  | Sore throat | 🟡 Yellow |
  | Sprained ankle | 🟢 Green |
  | Rash | 🩷 Pink |
  | Ear infection | 🩵 Cyan |
  | Sinusitis | ⚪ Gray |
  | Stomach ache | 🟡 Yellow |
  | Broken arm | 🔵 Indigo |
  | Allergic reaction | 🟩 Teal |

- **Contact rows** — MapPin / Phone / Mail icons, red **N/A** for missing fields

### Avatar Fallback
- `PatientAvatar` component tries to load the remote photo URL
- On image load failure, renders a **styled initials circle** (e.g. "ZN" for "Zoe Normanvill")
- Initials color is deterministically chosen from a 7-color palette based on the patient name — consistent across renders

### Pagination
- "Previous" / "Next" buttons with arrow icons
- Page numbers formatted as `1 02 03 04 ...`
- Active page has a `#146EB4` blue background with white text
- Automatically hidden when there is only one page

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 15** (App Router) | Framework, routing, server components, API routes |
| **TypeScript** | Type safety throughout |
| **Tailwind CSS v4** | Utility-first styling |
| **TanStack React Query** | Server state, caching, `keepPreviousData` for smooth pagination |
| **TanStack Virtual** | Virtualized rendering for the 1,000-row table |
| **Zustand** | Client UI state (view mode persistence) |
| **Zod** | Runtime schema validation for API responses |
| **Manrope** | Google Font applied globally |
| **Lucide React** | Icons (Search, Phone, Mail, MapPin, Stethoscope, ChevronRight…) |
| **shadcn/ui** | Base UI primitives (DropdownMenu, Pagination, Skeleton…) |

---

## 🎨 Design Tokens

| Token | Value |
|---|---|
| Primary blue | `#3B82F6` |
| Secondary blue (active states) | `#146EB4` |
| Card header background | `#B5D1FE` |
| Font family | `Manrope` |
| Header height | `150px` |
| Search bar height | `56px` |
| Sort dropdown height | `59px` |
| Table row height | `56px` |
| Card border radius | `10px` |
| Card gap | `24px (gap-6)` |
| Avatar size (card) | `48px` |
| Avatar size (table) | `40px` |

---

## 📡 API

### `GET /api/patients`

| Parameter | Type | Default | Description |
|---|---|---|---|
| `page` | number | `1` | Page number |
| `limit` | number | `12` | Records per page |
| `search` | string | `""` | Filter by name |
| `sort` | string | `"id"` | Sort field: `id`, `name`, `age` |
| `order` | string | `"asc"` | Sort direction: `asc` or `desc` |
| `medical_issue` | string | `""` | Filter by exact medical issue |
| `view` | string | `"table"` | Current view (persisted in URL) |

Returns:
```json
{
  "data": [ ...Patient[] ],
  "total": 1000,
  "page": 1,
  "limit": 12
}
```

---

## 📝 Notes

- All filter and sort state is **synced to the URL** via `useUrlState`, making the page shareable and refreshable.
- The patient data lives in `src/data/patients.json` — no external database required.
- The `PatientTable` uses **virtual scrolling** so it renders only the visible rows, keeping performance smooth even with large datasets.
