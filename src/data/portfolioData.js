export const portfolioData = {
  personal: {
    name: "Elsayed Galal Mouawad",
    title: "Senior Data Analyst & Business Intelligence Specialist",
    location: "Saudi Arabia",
    email: "Elsayedg637@gmail.com",
    phone: "+966561031084",
    statusBadge: "Available for Strategic BI & Architecture Roles",
    summary: "Computer Science foundation combined with MBA studies. Specialized in Kimball dimensional modeling, enterprise Power BI architecture, advanced DAX, and real-time operational telemetry.",
    profileImg: "/profile.png",
    socials: {
      linkedin: "https://www.linkedin.com/in/elsayed-galal-104564245/",
      github: "https://github.com/ElsayedGalal",
      cvPath: "/Elsayed_Galal_CV.pdf"
    }
  },

  metrics: [
    { value: "20+", label: "Service Hubs Monitored", detail: "Real-time Hajj operational telemetry" },
    { value: "60%", label: "Latency Cut", detail: "Automated ingestion & reporting pipelines" },
    { value: "36M", label: "Longitudinal Records", detail: "Unified historical single source of truth" },
    { value: "100%", label: "Production Deployments", detail: "Live cloud analytics applications" }
  ],

  projects: [
    // ==========================================
    // Tier 1: Core Enterprise Architectures (المشاريع الاستراتيجية الكبرى)
    // ==========================================
    
    // 1. إثراء الجود - منظومة الحج وقياس الرضا
    {
      id: "ithraa-telemetry-ecosystem",
      title: "Enterprise Pilgrim Telemetry & Experience Ecosystem",
      badge: "Hajj Operations Telemetry",
      category: "Enterprise BI & Kimball Modeling",
      tier: "featured",
      featured: true,
      techStack: ["Enterprise Power BI", "Advanced DAX", "Kimball Star Schema", "Crowd Telemetry"],
      summary: "Architected end-to-end analytical pipelines across 20+ service hubs and 130K+ pilgrims, tracking CSAT (96%), CES (97.3%), and NPS (94.8%) alongside real-time geospatial movement between Makkah, Mina, and Arafat.",
      impact: "Slashed executive reporting cycles by 60% with instant threshold anomaly alerts.",
      images: [
        "/projects/ithraa/csat-1447.png",
        "/projects/ithraa/crowd-movement-1446.jpeg",
        "/projects/ithraa/admin-summary-1446.jpeg",
        "/projects/ithraa/reception-1446.jpeg"
      ],

    },

   // 2. منصة الرصد الذكي للسلامة والعمليات الميدانية (HSE AI Agent Platform)
    {
      id: "hse-ai-agent-platform",
      title: "HSE AI Agent Platform: Live Monitoring & Incident Governance",
      badge: "Production Cloud App & AI Agents",
      category: "Computer Vision & HSE Governance",
      tier: "featured",
      featured: true,
      techStack: ["Full-Stack Cloud App", "Computer Vision (YOLOv8)", "Automated Ticketing", "Financial Telemetry"],
      summary: "Production-grade health, safety, and operational governance platform deployed live on Replit. Automates multi-site monitoring across Riyadh, Jeddah, and Makkah with real-time camera feeds, financial penalty avoidance tracking (SAR 14,500+), and digital incident ticket resolution.",
      impact: "Automated manual HSE site audit cycles and unified multi-site violation tracking with direct cost avoidance metrics.",
      images: [
        "/projects/HSE AI Agent Platform/live-command-center.png",
        "/projects/HSE AI Agent Platform/incident-tickets.png",
        "/projects/HSE AI Agent Platform/multisite-supervision.png",
        "/projects/HSE AI Agent Platform/financial-reports.png"
      ],
      githubUrl: "https://github.com/ElsayedGalal/hse-ai-agent-platform",
      liveUrl: "https://asset-manager--elsayedg637.replit.app/"
    },

    // 3. بوابة أبناء المطرفي للعمليات الميدانية
    {
      id: "al-matrafi-platform",
      title: "Al-Matrafi Smart Operations AI Platform",
      badge: "Fleet Telematics & Executive Copilot",
      category: "Operational Intelligence & AI Agents",
      tier: "featured",
      featured: false,
      techStack: ["Fleet Telematics", "Productivity S-Curve", "Executive AI Copilot", "Risk Forecasting"],
      summary: "Enterprise field operations suite for Al-Matrafi Group, integrating fleet telematics, S-Curve project progress tracking, proactive delay risk algorithms, and an interactive executive AI copilot for instant cross-project intelligence.",
      impact: "Unified operational progress and fleet safety telemetry into a proactive decision engine.",
      images: [
        "/projects/al-matrafi/al-matrafi-productivity.png",
        "/projects/al-matrafi/al-matrafi-hse-telematics.png",
        "/projects/al-matrafi/al-matrafi-decision-engine.png",
        "/projects/al-matrafi/al-matrafi-copilot.png"
      ],
      githubUrl: "https://github.com/ElsayedGalal/Al-Matrafi-Smart-Operations-AI-Field-Analytics-Platform",
      liveUrl: "https://al-matrafi-smart-operations-ai-field-analytics-platform-bof6qg.streamlit.app/"
    },

    // 4. شركة جبل عمر للتطوير - تدقيق واسترداد المرافق
    {
      id: "jabal-omar-charges",
      title: "Commercial Utility Allocation & OPEX Recovery Architecture",
      badge: "Enterprise Real Estate BI",
      category: "Asset Management & Cost Allocation",
      tier: "featured",
      featured: false,
      techStack: ["Power BI Architecture", "Advanced DAX", "Time-Intelligence", "5-Stream Sub-Metering"],
      summary: "Synthesized 36 months of longitudinal utility and tenant billing records for Jabal Omar Development Company, auditing direct/indirect costs and isolating 5 sub-metering streams across retail zones and floors.",
      impact: "Unified tenant consumption variance and eliminated billing reconciliation disputes.",
      images: [
        "/projects/jabal-omar/charges-breakdown.png",
        "/projects/jabal-omar/tenant-variance.png",
        "/projects/jabal-omar/retail-submetering.png"
      ],
      githubUrl: "https://github.com/ElsayedGalal/Jabal-Omar-Utility-Facilities-BI",
  
    },

    // 5. شركة الشعاع الصاعد & AI Safety Sentinel
    {
      id: "rising-ray-sentinel-showcase",
      title: "Geospatial Operational Risk & Edge Vision Sentinel",
      badge: "Edge Vision & Spatial Risk",
      category: "Computer Vision (YOLOv8) & Geospatial BI",
      tier: "featured",
      featured: true,
      techStack: [
        "YOLOv8x-Customized",
        "Spatial Power BI",
        "RTSP Live Stream Pipeline",
        "OCC AI Assistant",
        "Financial Risk Telemetry"
      ],
      summary: "End-to-end operational safety and spatial risk ecosystem integrating custom YOLOv8 edge computer vision (92.6% mAP, 14.2ms latency across 8 PPE classes) with live geospatial risk intelligence across Makkah & Jeddah branches. Audits daily field compliance and tracks $226,000 in operational violations.",
      impact: "Eliminated manual HSE site inspection cycles and linked edge violation detection directly to financial risk dashboards.",
      images: [
        "/projects/rising-ray/ppe-detection.webp",
        "/projects/rising-ray/spatial-violations.jpeg",
        "/projects/rising-ray/daily-reporting.jpeg"
      ],
      githubUrl: "https://github.com/ElsayedGalal/ai-safety-sentinel-showcase",

    },


    // ==========================================
    // Tier 2: Domain Analytics Labs (المعمل التحليلي)
    // ==========================================
    
    // 6. فودافون - عمليات مراكز الاتصال
    {
      id: "vodafone-cs-analytics",
      title: "Telecommunications Operations & SLA Intelligence",
      badge: "Telecom Operations",
      category: "Customer Operations & SLA Analytics",
      tier: "lab",
      featured: false,
      techStack: ["Power BI", "SQL", "SLA Enforcement", "Agent Telemetry"],
      summary: "Comprehensive evaluation of call center throughput, average handling time (AHT), and resolution variance across telecom customer operations.",
      impact: "Delivered actionable diagnostic visibility into frontline agent performance.",
      images: [
        "/projects/labs/vodafone-telecom.png"
      ],
      githubUrl: "https://github.com/ElsayedGalal/Vodafone-Call-Center-Analysis",

    },

    // 7. سلاسل الإمداد والتوزيع الإقليمي
    {
      id: "regional-sales-supply-chain",
      title: "Regional Sales & Supply Chain Optimization",
      badge: "Supply Chain Analytics",
      category: "Logistics & Margin Modeling",
      tier: "lab",
      featured: false,
      techStack: ["Power BI", "Power Query M", "Supply Chain Modeling"],
      summary: "Modeled regional logistics flows, warehouse fulfillment cycles, and distribution unit economics to isolate margin leakages.",
      impact: "Enhanced commercial visibility across regional multi-tier supply chains.",
      images: [
        "/projects/labs/supply-chain-matrix.png"
      ],
      githubUrl: "https://github.com/ElsayedGalal/Regional-Sales-SupplyChain-Analytics",

    },

    // 8. حركة التجارة الدولية والاستيراد والتصدير
    {
      id: "global-macroeconomic-trade",
      title: "Global Macroeconomic Trade & Logistics Engine",
      badge: "Global Macro Intelligence",
      category: "Macro Trade & Commodity Analytics",
      tier: "lab",
      featured: false,
      techStack: ["Power BI", "Data Wrangling", "Geographic Mapping"],
      summary: "Visual analytics engine tracking cross-border bilateral trade flows, commodity price trends, and customs tariff telemetry.",
      impact: "Synthesized multi-country logistics data into unified executive views.",
      images: [
        "/projects/labs/global-trade-flows.jpg"
      ],
      githubUrl: "https://github.com/ElsayedGalal/Global-Trade-Import-Export-Analytics",

    }
  ],

  education: [
    {
      degree: "Master of Business Administration (MBA)",
      institution: "Royale Business College – United Kingdom",
      period: "July 2026 – Present",
      focus: "Strategic Business Governance, Cost Variance Modeling & Capital Allocation"
    },
    {
      degree: "Bachelor of Science in Computer Science & Information Systems",
      institution: "Faculty of Computers and Information – Zagazig University",
      period: "September 2016 – May 2020",
      focus: "Relational Database Management Systems (RDBMS), Software Engineering, Algorithms"
    }
  ],

  credentials: [
    { title: "Microsoft Certified: Power BI Data Analyst Associate (PL-300 Candidate)", issuer: "Microsoft" },
    { title: "IBM Data Analyst Professional Certificate (9-Course Specialization)", issuer: "IBM & Coursera" },
    { title: "Data Analysis Professional Nanodegree", issuer: "Udacity & MCIT Egypt FWD" },
    { title: "Mobile Application Developer Mastery Award", issuer: "IBM Skills Academy" },
    { title: "English CEFR B2 Upper Intermediate (EF SET Certified)", issuer: "EF Standard English Test" }
  ]
};