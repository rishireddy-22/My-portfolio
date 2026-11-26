/**
 * ====================================================================
 * PORTFOLIO MOCK DATA
 * ====================================================================
 * All profile details, education timeline, skills, projects, and resume
 * configurations reside here. In standalone mode or when the Spring Boot
 * backend is unreachable, the application falls back seamlessly to this data.
 */

export const mockProfile = {
  name: "Rishi Swar",
  initials: "RS",
  title: "Data Analyst & BI Specialist",
  tagline: "Bridging the gap between raw numbers and decisive business strategy through SQL modeling, exploratory analysis, and interactive dashboard storytelling.",
  bio: "Aspiring Data Analyst currently pursuing my Master of Computer Applications (MCA) with a strong foundation in computer applications and business acumen from my B.Com studies. Driven by curiosity, I specialize in dissecting complex business datasets, uncovering underlying trends, crafting intuitive dashboards in Power BI and Tableau, and writing high-efficiency SQL queries that fuel informed decision-making.",
  photoUrl: "/profile.png",
  email: "rishiswar22@gmail.com",
  phone: "+91 7569541880",
  phoneDisplay: "+91 75695 41880",
  location: "Anantapur, Andhra Pradesh, India",
  linkedin: "https://www.linkedin.com/in/rishi-swar-bb5468450",
  github: "https://github.com/your-username", // Replace with your GitHub profile
  typingRoles: [
    "Data Analyst",
    "SQL Enthusiast",
    "Dashboard Builder",
    "Insight Storyteller"
  ],
  stats: [
    { label: "Completed Projects", value: "3+", sub: "End-to-End Analytics" },
    { label: "B.Com CGPA", value: "7.8", sub: "Graduated with Distinction" },
    { label: "MCA Status", value: "Pursuing", sub: "SVIS College, SK University" },
    { label: "Core Analytics Tools", value: "10+", sub: "SQL, BI & Python Stack" }
  ]
};

export const mockEducation = [
  {
    id: 1,
    degree: "MCA (Master of Computer Applications)",
    institution: "SVIS College",
    university: "SK University, Anantapur",
    startYear: 2024,
    endYear: null, // "Present" while ongoing
    status: "ONGOING", // "ONGOING" or "COMPLETED"
    score: "", // When empty: shows "CGPA: Will be updated"
    scoreType: "CGPA",
    description: "Specializing in Advanced Database Systems, Data Structures, Python Programming, and Statistical Computing for Analytics."
  },
  {
    id: 2,
    degree: "B.Com (Computers)",
    institution: "Saraswati Degree College",
    university: "SK University, Anantapur",
    startYear: 2021,
    endYear: 2024,
    status: "COMPLETED",
    score: "7.8",
    scoreType: "CGPA",
    description: "Built strong foundations in Financial Accounting, Business Statistics, Management Information Systems, and Computer Applications."
  }
];

export const mockSkills = [
  {
    category: "Languages & Querying",
    skills: [
      { id: 1, name: "SQL", level: 92, note: "Window Functions, CTEs, Joins, Indexing" },
      { id: 2, name: "Python", level: 82, note: "Scripting, Automation, Data Wrangling" }
    ]
  },
  {
    category: "Analysis Libraries",
    skills: [
      { id: 3, name: "Pandas", level: 88, note: "Dataframes, Reshaping, Cleaning" },
      { id: 4, name: "NumPy", level: 84, note: "Array operations, Numerical analysis" },
      { id: 5, name: "Matplotlib & Seaborn", level: 80, note: "Statistical plots, Distributions" }
    ]
  },
  {
    category: "BI Tools",
    skills: [
      { id: 6, name: "Power BI", level: 90, note: "DAX, Data Modeling, KPI Cards" },
      { id: 7, name: "Tableau", level: 84, note: "Interactive Stories, LOD Expressions" },
      { id: 8, name: "Microsoft Excel", level: 90, note: "XLOOKUP, Pivot Tables, Power Query" }
    ]
  },
  {
    category: "Database",
    skills: [
      { id: 9, name: "MySQL", level: 86, note: "Schema Design, Normalization, Stored Procs" }
    ]
  },
  {
    category: "Concepts",
    skills: [
      { id: 10, name: "Data Cleaning", level: 95, note: "Missing value imputation, Deduplication" },
      { id: 11, name: "Exploratory Data Analysis (EDA)", level: 92, note: "Outlier detection, Correlation matrix" },
      { id: 12, name: "Business Statistics", level: 85, note: "Hypothesis testing, Probability, Distributions" },
      { id: 13, name: "Executive Dashboards", level: 92, note: "User-centric design, High-density metrics" },
      { id: 14, name: "Insight Storytelling", level: 90, note: "Converting findings into executive strategy" }
    ]
  }
];

export const mockProjects = [
  {
    id: 1,
    title: "Retail Sales Performance Dashboard",
    category: "Power BI",
    techStack: ["SQL", "Power BI", "Excel", "Data Modeling", "DAX"],
    thumbnailUrl: "/projects/project1_retail_sales_dashboard.png",
    images: ["/projects/project1_retail_sales_dashboard.png"],
    shortDescription: "Interactive sales dashboard built to track $4.82M revenue, profit margins (18.4%), and regional product velocity.",
    fullDescription: "An interactive sales dashboard built to help a retail business understand where its revenue and profit come from. I cleaned and joined sales, product and customer tables using SQL, then built a Power BI dashboard tracking total revenue, profit margin, order volume and average order value. The analysis showed a strong seasonal peak in Q4. Electronics was the top revenue category, and profit margins differed noticeably between regions. The dashboard lets managers filter by month, category and region to decide on stock levels and promotions.",
    problemStatement: "The business needed clear visibility into $4.82M across multiple retail channels to identify revenue streams, product margin variances, and inventory demand peaks.",
    approach: "Cleaned and joined sales, product, and customer relational tables in SQL, established star schema data modeling, and crafted a multi-metric Power BI dashboard with dynamic filtering by month, category, and sales region.",
    toolsUsed: ["SQL", "Power BI", "Excel"],
    insights: [
      "Demonstrated a strong seasonal peak in Q4, reaching nearly $500K in monthly revenue in December.",
      "Identified Electronics as the primary revenue generator ($1.6M+), followed by Clothing ($1.2M) and Home items.",
      "Highlighted noticeable regional profit margin differences (North at 22% vs East at 15%), enabling targeted regional stock levels and promotional pricing."
    ],
    liveUrl: "https://app.powerbi.com",
    githubUrl: "https://github.com/your-username/retail-sales-dashboard"
  },
  {
    id: 2,
    title: "Customer Churn Analysis & Prediction",
    category: "Python",
    techStack: ["Python", "Pandas", "Matplotlib", "Scikit-Learn", "Jupyter Notebook"],
    thumbnailUrl: "/projects/project2_customer_churn_analysis.png",
    images: ["/projects/project2_customer_churn_analysis.png"],
    shortDescription: "End-to-end churn analysis & 81% accuracy predictive classification model identifying retention drivers across 7,000+ accounts.",
    fullDescription: "An end-to-end analysis of why telecom customers cancel their service, covering about 7,000 customers. I cleaned the data, explored churn patterns, and trained a classification model to predict which customers are likely to leave. Churn was highest among month-to-month contract customers and in the first year of service. Contract type, tenure and monthly charges were the strongest churn drivers. The model reached about 81% accuracy and flags at-risk customers so the business can target them with retention offers.",
    problemStatement: "A telecommunications business was facing a 26.5% churn rate putting $1.4M revenue at risk without proactive classification of departing subscribers.",
    approach: "Cleaned and prepared 7,043 customer records, explored tenure and contract churn correlations, and trained a predictive machine learning classification model to flag at-risk subscribers.",
    toolsUsed: ["Python (Pandas, Matplotlib, Scikit-learn)", "Jupyter Notebook"],
    insights: [
      "Discovered churn was dramatically highest (>40%) among month-to-month contract customers compared to one-year (11%) and two-year (<4%) contracts.",
      "Identified steep churn risk within the first year of customer tenure (months 1–12) before retention stabilizes.",
      "Model achieved 81% prediction accuracy, confirming contract type, tenure, and monthly charges as the strongest drivers to target with proactive retention incentives."
    ],
    liveUrl: "https://github.com/your-username/customer-churn-analysis",
    githubUrl: "https://github.com/your-username/customer-churn-analysis"
  },
  {
    id: 3,
    title: "Marketing Campaign Performance Analysis",
    category: "Tableau",
    techStack: ["Excel", "Tableau", "Marketing ROI", "Funnel Analysis"],
    thumbnailUrl: "/projects/project3_marketing_campaign_analysis.png",
    images: ["/projects/project3_marketing_campaign_analysis.png"],
    shortDescription: "Cross-channel marketing ROI, conversion funnel, and CAC analysis across $310K spend on 6 acquisition channels.",
    fullDescription: "An analysis of a year of marketing spend across six channels (Email, Google Ads, Instagram, Facebook, YouTube, LinkedIn) to find which ones deliver the best return. I calculated ROI, conversion rate and cost per acquisition for each channel and built a Tableau dashboard showing the conversion funnel from impressions to customers. Email and Google Ads gave the highest ROI, while LinkedIn gave the lowest. Based on this, I recommended moving budget from low-return channels to high-return ones.",
    problemStatement: "Marketing teams allocated $310K across six diverse channels with an average $24 CAC but lacked visibility into comparative channel returns and funnel drop-offs.",
    approach: "Calculated annual return on investment (ROI), conversion rates, and acquisition costs per channel in Excel, then developed an interactive Tableau conversion funnel dashboard mapping impressions to customers.",
    toolsUsed: ["Excel", "Tableau"],
    insights: [
      "Email delivered the highest ROI (5.4x) followed by Google Ads (3.8x), while LinkedIn yielded the lowest return (1.6x).",
      "Mapped the full conversion funnel: 4.7% overall conversion rate with 18% click-through, 6% lead qualification, and 1.5% final customer acquisition.",
      "Provided strategic recommendation to reallocate budget from underperforming channels (LinkedIn) into high-return drivers (Email, Google Ads), accelerating Q4 revenue."
    ],
    liveUrl: "https://public.tableau.com",
    githubUrl: "https://github.com/your-username/marketing-campaign-analysis"
  }
];

export const mockResume = {
  fileUrl: "/resume.pdf",
  updatedAt: "November 2026"
};
