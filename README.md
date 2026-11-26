# Data Analytics Portfolio & Admin Suite

Full-stack portfolio and content management solution built for a **Data Analytics & BI specialist**.

## 📁 Repository Structure

```
.
├── portfolio-frontend/      # React 19 + Vite (JavaScript)
│   ├── src/
│   │   ├── components/      # Glassmorphism UI components (Navbar, Hero, Projects, Education, etc.)
│   │   ├── admin/           # Complete Admin Panel (/admin) for live content management
│   │   ├── services/        # API client with automatic offline fallback to mockData.js
│   │   └── styles/          # Pure CSS with CSS variables (White / Light theme default, Dark toggle)
│   └── public/              # High-resolution dashboard screenshots, portrait photo, resume PDF
│
└── portfolio-backend/       # Spring Boot 3.3.5 (Java 17+, Hibernate/JPA, MySQL)
    ├── src/main/java/com/portfolio/
    │   ├── entity/          # JPA entities (Profile, Education, Skill, Project, ResumeFile, etc.)
    │   ├── repository/      # Spring Data JPA repositories
    │   └── config/          # Security, CORS & application configuration
    └── pom.xml
```

---

## 🚀 Frontend Quickstart (`portfolio-frontend`)

```bash
cd portfolio-frontend
npm install
npm run dev
```
Open **`http://localhost:5173`** in your browser.

- **Public Portfolio**: `http://localhost:5173`
- **Admin Control Panel**: `http://localhost:5173/admin`
  - Default Username: `admin`
  - Default Password: `admin123`

---

## ☕ Backend Quickstart (`portfolio-backend`)

```bash
cd portfolio-backend
mvn spring-boot:run
```
Backend runs on `http://localhost:8080`.
