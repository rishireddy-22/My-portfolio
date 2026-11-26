# Rishi Swar — Premium Data Analytics Portfolio

A modern, high-performance, single-page portfolio website designed specifically for a **Data Analytics & BI specialist**. Built using **React + Vite** with a glossy white-and-black glassmorphism aesthetic, interactive chart animations, dynamic cursor light reflections, and a plug-and-play Spring Boot REST API integration layer.

---

## 🌟 Key Features

- **Monochrome Glossy Glassmorphism**: High-end frosted glass cards (`backdrop-filter: blur(16px)`), subtle borders, soft inner highlights, and a glossy top sheen.
- **Dynamic Mouse Reflection**: Interactive light sheen that tracks the cursor position across cards.
- **Theme Switcher**: Dark mode (near-black `#0a0a0a`, default) and Light mode (clean off-white `#f5f5f7`), with preference persistence in `localStorage`.
- **Typing Animation**: Dynamic headline cycling through "Data Analyst", "SQL Enthusiast", "Dashboard Builder", and "Insight Storyteller".
- **Floating Analytics Chart**: Real-time animated SVG/Recharts visualization floating beside the portrait frame.
- **Data-Driven Education Timeline**: Supports both `ONGOING` (pulsing status badge, "Present", dynamic score label) and `COMPLETED` (final score, graduation year) states automatically without touching JSX.
- **Project Case Studies & Glass Modal**: Responsive cards with category filters (*All / Power BI / Python / SQL / Excel*), live demo/GitHub links, and an animated glass modal showcasing problem statements, approaches, and measurable business insights.
- **Interactive Resume Preview**: In-browser PDF preview iframe with direct download and dynamic "Last updated" timestamps.
- **Contact Form & Direct Channels**: Contact form with validation and toast notifications, linked to `POST /api/contact`, plus verified links for email (`mailto:`), phone (`tel:`), LinkedIn, and GitHub.
- **Backend Ready**: Uses `axios` with `VITE_API_URL`. Automatically tries the Spring Boot endpoints first; if the backend is offline, it seamlessly falls back to `mockData.js`.

---

## 🚀 Quickstart

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### 1. Installation
```bash
cd portfolio-frontend
npm install
```

### 2. Environment Configuration
Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```
Default configuration:
```env
VITE_API_URL=http://localhost:8080/api
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
npm run preview
```

---

## ✏️ Customizing Data (`src/services/mockData.js`)

All personal details, education records, skills, projects, and resume files are centralized in:
📂 **`src/services/mockData.js`**

| Field | Description |
| :--- | :--- |
| `mockProfile.name` | Student's full name (e.g. `"Rishi Swar"`) |
| `mockProfile.typingRoles` | Array of titles cycled in the Hero typing animation |
| `mockProfile.email` | Contact email (triggers `mailto:`) |
| `mockProfile.phone` | Contact phone number (triggers `tel:`) |
| `mockProfile.linkedin` | LinkedIn profile URL |
| `mockProfile.github` | GitHub profile URL |
| `mockEducation` | Array of education items. Toggle `status: "ONGOING"` or `"COMPLETED"`. When `score` is empty, it displays `"CGPA: Will be updated"`. |
| `mockSkills` | Grouped skill objects with `name`, `level` (0–100), and `note`. |
| `mockProjects` | Array of project objects including `thumbnailUrl`, `problemStatement`, `approach`, and `insights`. |
| `mockResume` | `fileUrl` and `updatedAt` date string for the resume preview. |

---

## 🔌 Spring Boot REST API Integration

When you are ready to connect your Spring Boot backend, implement these endpoints on `http://localhost:8080/api`:

| Method | Endpoint | Response Schema |
| :--- | :--- | :--- |
| **GET** | `/api/profile` | `{ name, initials, title, tagline, bio, photoUrl, email, phone, location, linkedin, github, typingRoles, stats }` |
| **GET** | `/api/education` | `[{ id, degree, institution, university, startYear, endYear, status, score, scoreType, description }]` |
| **GET** | `/api/skills` | `[{ category, skills: [{ id, name, level, note }] }]` |
| **GET** | `/api/projects` | `[{ id, title, category, techStack, thumbnailUrl, images, shortDescription, fullDescription, problemStatement, approach, toolsUsed, insights, liveUrl, githubUrl }]` |
| **GET** | `/api/resume` | `{ fileUrl, updatedAt }` |
| **POST** | `/api/contact` | Body: `{ name, email, message }` $\rightarrow$ `{ success: true, message: "..." }` |

*Note: If any endpoint fails or is unreachable, the frontend automatically catches the error and serves the corresponding mock data, ensuring 100% uptime.*

---

## 🔐 Admin Control Panel (`/admin`)

The portfolio includes a **secure, full-featured Admin Control Panel** available at:
👉 **[http://localhost:5173/admin](http://localhost:5173/admin)**

### Default Login Credentials:
- **Username**: `admin`
- **Password**: `admin123` *(Change this in Settings after logging in)*

### Available Admin Sections:
1. **Dashboard (`/admin`)**: High-level telemetry, total projects, skills counter, unread inquiries, visits graph, and recent activity log.
2. **Education Manager (`/admin/education`)**:
   - Add new degrees or certifications.
   - Edit existing credentials.
   - **Ongoing vs. Completed**: When status is set to *Ongoing*, the end year is automatically disabled. When switched to *Completed*, completion year and final score are required.
   - **One-Click "Mark as Completed"**: Quick modal action to transition your ongoing MCA to completed with your final CGPA and graduation year.
3. **Projects Manager (`/admin/projects`)**:
   - Add unlimited projects with custom screenshots, tech chips, problem statement, approach, and business insights.
   - Toggle visibility (*Published / Draft*) and star as *Featured*.
   - Filter by tool (*Power BI, Python, Tableau, SQL, Excel*).
4. **Resume Manager (`/admin/resume`)**:
   - Drag-and-drop new PDF resumes (up to 5 MB).
   - In-browser live preview.
   - Version history archive with one-click restore and activation.
5. **Profile Manager (`/admin/profile`)**: Update name, bio, tagline, contact email, phone, location, and upload a new portrait photo.
6. **Skills Manager (`/admin/skills`)**: Adjust proficiency levels with a slider (0–100%) and group by category.
7. **Contact Messages (`/admin/messages`)**: Inbox for client and recruiter inquiries with unread badges, direct mailto reply, and deletion.
8. **Settings & Data Backup (`/admin/settings`)**: Change admin password, and download/import full JSON portfolio backups.

---

Themes are defined in `src/styles/theme.css`:
- **Dark Mode** (`[data-theme='dark']`): Near-black `#0a0a0a` background with frosted white glass highlights (`rgba(255, 255, 255, 0.06)`).
- **Light Mode** (`[data-theme='light']`): Clean `#f5f5f7` background with crisp glass cards and dark typography.
- **Typography**: Inter (Body) & Space Grotesk (Headings) via Google Fonts.
- **Colors**: Strictly white, black, and neutral grays with silver chart accents.
