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
  title: "Data Analyst • SQL • Python • Power BI",
  tagline: "Bridging the gap between raw numbers and decisive business strategy through SQL modeling, exploratory analysis, and interactive dashboard storytelling.",
  bio: "MCA student with a strong base in SQL, Python and data visualization. I clean raw data, explore it to find patterns, and turn it into dashboards and simple insights that help people make decisions. Looking for a Data Analyst internship or entry-level role where I can learn, contribute and grow.",
  photoUrl: "/profile.png",
  email: "rishiswar22@gmail.com",
  phone: "+91 7569541880",
  phoneDisplay: "+91 75695 41880",
  location: "Anantapur, Andhra Pradesh, India",
  linkedin: "https://www.linkedin.com/in/rishi-swar",
  github: "https://github.com/rishireddy-22",
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
    title: "Sales Dashboard",
    category: "Power BI",
    techStack: ["Power BI", "Excel", "SQL", "DAX", "Data Modeling"],
    thumbnailUrl: "/projects/project1_retail_sales_dashboard.png",
    images: ["/projects/project1_retail_sales_dashboard.png"],
    shortDescription: "Interactive Power BI & Excel dashboard tracking sales by product, region, and month with DAX measures and filters.",
    fullDescription: "Built an interactive dashboard to track sales by product, region and month. Cleaned the data and created DAX measures, slicers and filters to highlight top products and weak regions to support business decisions.",
    problemStatement: "The business needed clear visibility into retail sales performance across multiple channels to identify revenue streams, product margin variances, and inventory demand peaks.",
    approach: "Cleaned and joined sales, product, and customer relational tables in SQL and Excel, established star schema data modeling, and crafted a multi-metric Power BI dashboard with dynamic filtering by month, category, and sales region.",
    toolsUsed: ["Power BI", "Excel", "SQL", "DAX"],
    insights: [
      "Built an interactive dashboard to track sales by product, region and month.",
      "Cleaned the data and created DAX measures, slicers and dynamic filters.",
      "Highlighted top revenue products and weak regions to support inventory decisions and promotional pricing."
    ],
    liveUrl: "https://app.powerbi.com",
    githubUrl: "https://github.com/rishireddy-22/sales-dashboard"
  },
  {
    id: 2,
    title: "Customer Churn Analysis",
    category: "Python",
    techStack: ["Python", "Pandas", "Matplotlib", "Seaborn", "Jupyter Notebook"],
    thumbnailUrl: "/projects/project2_customer_churn_analysis.png",
    images: ["/projects/project2_customer_churn_analysis.png"],
    shortDescription: "Exploratory customer churn analysis in Python uncovering cancellation drivers and retention opportunities.",
    fullDescription: "Analysed customer data to find why customers leave. Cleaned the dataset and explored it with charts to spot patterns, and summarised key churn factors in a short insights report.",
    problemStatement: "A telecommunications business was facing customer attrition without proactive classification and understanding of departing subscribers.",
    approach: "Cleaned and prepared customer records, explored tenure and contract correlations using Pandas and Matplotlib, and summarized churn distributions.",
    toolsUsed: ["Python (Pandas, Matplotlib)", "Jupyter Notebook"],
    insights: [
      "Analysed customer data to find why customers leave.",
      "Cleaned the dataset and explored it with charts to spot patterns.",
      "Summarised key churn factors in a short actionable insights report."
    ],
    liveUrl: "https://github.com/rishireddy-22/customer-churn-analysis",
    githubUrl: "https://github.com/rishireddy-22/customer-churn-analysis"
  },
  {
    id: 3,
    title: "SQL Retail Insights",
    category: "Database",
    techStack: ["MySQL", "SQL Queries", "Window Functions", "CTEs", "Aggregations"],
    thumbnailUrl: "/projects/sql-retail.svg",
    images: ["/projects/sql-retail.svg"],
    shortDescription: "Answered retail sales and customer questions using SQL joins, aggregations, subqueries, and window functions.",
    fullDescription: "Answered retail sales and customer questions using SQL. Used joins, aggregations, subqueries and window functions to present clear results as structured tables and business summaries.",
    problemStatement: "Business stakeholders required deep-dive answers into multi-table transactional records, customer buying frequencies, and product performance.",
    approach: "Wrote high-efficiency SQL queries leveraging multi-table joins, aggregations, CTEs, and window functions to compute sales KPIs.",
    toolsUsed: ["MySQL", "SQL", "Database Modeling"],
    insights: [
      "Answered retail sales and customer questions using SQL.",
      "Used joins, aggregations, subqueries and window functions.",
      "Presented results as simple, readable tables and summaries."
    ],
    liveUrl: "https://github.com/rishireddy-22/sql-retail-insights",
    githubUrl: "https://github.com/rishireddy-22/sql-retail-insights"
  },
  {
    id: 4,
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
      "Provided strategic recommendation to reallocate budget from underperforming channels into high-return drivers, accelerating revenue."
    ],
    liveUrl: "https://public.tableau.com",
    githubUrl: "https://github.com/rishireddy-22/marketing-campaign-analysis"
  }
];

export const mockResume = {
  fileUrl: "/resume.pdf",
  updatedAt: "November 2026"
};
