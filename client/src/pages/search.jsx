import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

// Complete template database
const allTemplates = [
    // Tech Templates
    {
      id: 1,
      title: "Software Engineer Resume",
      description: "Modern software engineer resume with 5+ years experience",
      tags: ["Tech", "Engineering", "React", "Node.js"],
      category: "Tech",
      preview: "Professional template with clean design",
      templateData: {
        personalInfo: {
          name: "John Smith",
          email: "john.smith@email.com",
          phone: "+1 (555) 123-4567",
          address: "San Francisco, CA"
        },
        summary: "Experienced software engineer with 5+ years developing scalable web applications",
        skills: ["JavaScript", "React", "Node.js", "Python", "AWS"],
        experience: [{
          position: "Senior Software Engineer",
          company: "Tech Corp",
          duration: "2021 - Present",
          description: "Led development of core platform features serving 1M+ users"
        }]
      }
    },
    {
      id: 2,
      title: "Data Scientist Resume",
      description: "Data scientist with machine learning background",
      tags: ["Tech", "Data Science", "ML", "Python", "Analytics"],
      category: "Tech",
      preview: "Technical template optimized for ATS",
      templateData: {
        personalInfo: {
          name: "Sarah Johnson",
          email: "sarah.j@email.com",
          phone: "+1 (555) 987-6543",
          address: "Boston, MA"
        },
        summary: "Data scientist specializing in machine learning and predictive analytics",
        skills: ["Python", "R", "TensorFlow", "SQL", "Tableau"],
        experience: [{
          position: "Data Scientist",
          company: "Analytics Inc",
          duration: "2020 - Present",
          description: "Developed ML models improving business efficiency by 30%"
        }]
      }
    },
    {
      id: 3,
      title: "DevOps Engineer Resume",
      description: "Cloud infrastructure and automation specialist",
      tags: ["Tech", "DevOps", "AWS", "Docker", "Kubernetes"],
      category: "Tech",
      preview: "Technical template with infrastructure focus",
      templateData: {
        personalInfo: {
          name: "Mike Chen",
          email: "mike.chen@email.com",
          phone: "+1 (555) 456-7890",
          address: "Seattle, WA"
        },
        summary: "DevOps engineer with expertise in cloud infrastructure and CI/CD",
        skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform"],
        experience: [{
          position: "DevOps Engineer",
          company: "Cloud Solutions",
          duration: "2019 - Present",
          description: "Automated deployment processes reducing release time by 60%"
        }]
      }
    },
    // Medical Templates
    {
      id: 4,
      title: "Registered Nurse Resume",
      description: "Experienced RN with critical care background",
      tags: ["Medical", "Nursing", "Healthcare", "Patient Care"],
      category: "Medical",
      preview: "Healthcare-focused professional template",
      templateData: {
        personalInfo: {
          name: "Emily Davis",
          email: "emily.davis@email.com",
          phone: "+1 (555) 234-5678",
          address: "Chicago, IL"
        },
        summary: "Dedicated registered nurse with 8+ years in critical care and emergency medicine",
        skills: ["Patient Care", "Emergency Response", "Electronic Health Records", "CPR Certified"],
        experience: [{
          position: "Registered Nurse - ICU",
          company: "Chicago General Hospital",
          duration: "2018 - Present",
          description: "Provided critical care to ICU patients with 98% patient satisfaction"
        }]
      }
    },
    {
      id: 5,
      title: "Medical Doctor Resume",
      description: "Board-certified physician with specialization",
      tags: ["Medical", "Doctor", "Healthcare", "Surgery"],
      category: "Medical",
      preview: "Professional medical template",
      templateData: {
        personalInfo: {
          name: "Dr. Robert Wilson",
          email: "dr.wilson@email.com",
          phone: "+1 (555) 345-6789",
          address: "Los Angeles, CA"
        },
        summary: "Board-certified internal medicine physician with 12+ years experience",
        skills: ["Internal Medicine", "Diagnosis", "Patient Relations", "Medical Research"],
        experience: [{
          position: "Internal Medicine Physician",
          company: "LA Medical Center",
          duration: "2015 - Present",
          description: "Diagnosed and treated complex medical conditions for 2000+ patients"
        }]
      }
    },
    // Non-Tech Templates
    {
      id: 6,
      title: "Marketing Manager Resume",
      description: "Creative marketing professional with digital expertise",
      tags: ["Non-Tech", "Marketing", "Digital", "Strategy", "Analytics"],
      category: "Non-Tech",
      preview: "Creative template with bold design elements",
      templateData: {
        personalInfo: {
          name: "Lisa Thompson",
          email: "lisa.thompson@email.com",
          phone: "+1 (555) 567-8901",
          address: "New York, NY"
        },
        summary: "Creative marketing manager with 6+ years driving brand growth and engagement",
        skills: ["Digital Marketing", "Brand Strategy", "Content Creation", "Analytics", "SEO"],
        experience: [{
          position: "Marketing Manager",
          company: "Brand Solutions",
          duration: "2019 - Present",
          description: "Increased brand awareness by 150% through integrated marketing campaigns"
        }]
      }
    },
    {
      id: 7,
      title: "Human Resources Manager Resume",
      description: "HR professional with talent acquisition focus",
      tags: ["Non-Tech", "HR", "Recruitment", "Management"],
      category: "Non-Tech",
      preview: "Professional HR template",
      templateData: {
        personalInfo: {
          name: "Jennifer Brown",
          email: "jennifer.brown@email.com",
          phone: "+1 (555) 678-9012",
          address: "Dallas, TX"
        },
        summary: "Strategic HR manager with 10+ years in talent acquisition and employee development",
        skills: ["Talent Acquisition", "Employee Relations", "Performance Management", "HRIS"],
        experience: [{
          position: "HR Manager",
          company: "Corporate Solutions",
          duration: "2017 - Present",
          description: "Reduced turnover by 35% through improved hiring and retention strategies"
        }]
      }
    },
    {
      id: 8,
      title: "Sales Representative Resume",
      description: "High-performing sales professional",
      tags: ["Non-Tech", "Sales", "Business Development", "Client Relations"],
      category: "Non-Tech",
      preview: "Results-focused sales template",
      templateData: {
        personalInfo: {
          name: "David Miller",
          email: "david.miller@email.com",
          phone: "+1 (555) 789-0123",
          address: "Miami, FL"
        },
        summary: "Top-performing sales representative with 7+ years exceeding quotas",
        skills: ["Sales Strategy", "Client Relations", "Negotiation", "CRM", "Lead Generation"],
        experience: [{
          position: "Senior Sales Representative",
          company: "Sales Corp",
          duration: "2018 - Present",
          description: "Consistently exceeded sales targets by 25%+ generating $2M+ revenue"
        }]
      }
    },
    // Other Templates
    {
      id: 9,
      title: "Graphic Designer Resume",
      description: "Creative designer with brand focus",
      tags: ["Others", "Design", "Creative", "Branding"],
      category: "Others",
      preview: "Creative design-focused template",
      templateData: {
        personalInfo: {
          name: "Alex Garcia",
          email: "alex.garcia@email.com",
          phone: "+1 (555) 890-1234",
          address: "Portland, OR"
        },
        summary: "Creative graphic designer with 5+ years in brand identity and digital design",
        skills: ["Adobe Creative Suite", "Brand Design", "UI/UX", "Typography", "Print Design"],
        experience: [{
          position: "Graphic Designer",
          company: "Design Studio",
          duration: "2019 - Present",
          description: "Created brand identities for 50+ clients increasing brand recognition"
        }]
      }
    },
    {
      id: 10,
      title: "Teacher Resume",
      description: "Experienced educator with curriculum development",
      tags: ["Others", "Education", "Teaching", "Curriculum"],
      category: "Others",
      preview: "Education-focused professional template",
      templateData: {
        personalInfo: {
          name: "Maria Rodriguez",
          email: "maria.rodriguez@email.com",
          phone: "+1 (555) 901-2345",
          address: "Austin, TX"
        },
        summary: "Dedicated educator with 9+ years developing engaging curriculum and improving student outcomes",
        skills: ["Curriculum Development", "Classroom Management", "Student Assessment", "Educational Technology"],
        experience: [{
          position: "High School Teacher",
          company: "Austin High School",
          duration: "2016 - Present",
          description: "Improved student test scores by 40% through innovative teaching methods"
        }]
      }
    },
    // Additional Tech Templates
    {
      id: 11,
      title: "Frontend Developer Resume",
      description: "Modern frontend developer specializing in React and Vue",
      tags: ["Tech", "Frontend", "React", "Vue", "TypeScript"],
      category: "Tech",
      preview: "Modern template with emphasis on UI/UX projects",
      templateData: {
        personalInfo: {
          name: "Emma Wilson",
          email: "emma.wilson@email.com",
          phone: "+1 (555) 111-2222",
          address: "San Jose, CA"
        },
        summary: "Frontend developer with 4+ years creating responsive web applications using modern frameworks",
        skills: ["React", "Vue.js", "TypeScript", "HTML5", "CSS3", "JavaScript", "Sass", "Webpack"],
        experience: [{
          position: "Frontend Developer",
          company: "UI/UX Solutions",
          duration: "2021 - Present",
          description: "Built 15+ responsive web applications with 99.9% uptime and optimized performance"
        }]
      }
    },
    {
      id: 12,
      title: "Backend Engineer Resume",
      description: "Senior backend engineer with microservices expertise",
      tags: ["Tech", "Backend", "API", "Microservices", "Java"],
      category: "Tech",
      preview: "Technical template focused on system architecture",
      templateData: {
        personalInfo: {
          name: "James Taylor",
          email: "james.taylor@email.com",
          phone: "+1 (555) 333-4444",
          address: "Austin, TX"
        },
        summary: "Backend engineer with 6+ years designing scalable microservices and APIs",
        skills: ["Java", "Spring Boot", "PostgreSQL", "Redis", "Docker", "Kafka", "REST APIs"],
        experience: [{
          position: "Senior Backend Engineer",
          company: "Enterprise Systems",
          duration: "2019 - Present",
          description: "Designed microservices architecture serving 5M+ requests daily with 99.99% availability"
        }]
      }
    },
    {
      id: 13,
      title: "Cybersecurity Analyst Resume",
      description: "Information security specialist with threat analysis focus",
      tags: ["Tech", "Security", "Analysis", "Compliance", "Risk"],
      category: "Tech",
      preview: "Security-focused professional template",
      templateData: {
        personalInfo: {
          name: "Rachel Green",
          email: "rachel.green@email.com",
          phone: "+1 (555) 555-6666",
          address: "Washington, DC"
        },
        summary: "Cybersecurity analyst with 7+ years protecting enterprise systems and data",
        skills: ["Security Analysis", "Penetration Testing", "SIEM", "Risk Assessment", "Compliance"],
        experience: [{
          position: "Senior Cybersecurity Analyst",
          company: "SecureFlow Corp",
          duration: "2018 - Present",
          description: "Reduced security incidents by 85% through proactive threat monitoring and analysis"
        }]
      }
    },
    // Additional Medical Templates
    {
      id: 14,
      title: "Physician Assistant Resume",
      description: "Certified PA with emergency medicine experience",
      tags: ["Medical", "PA", "Emergency", "Patient Care", "Diagnosis"],
      category: "Medical",
      preview: "Medical template with clinical focus",
      templateData: {
        personalInfo: {
          name: "Dr. Michael Brown",
          email: "michael.brown@email.com",
          phone: "+1 (555) 777-8888",
          address: "Phoenix, AZ"
        },
        summary: "Certified Physician Assistant with 6+ years in emergency medicine and urgent care",
        skills: ["Emergency Medicine", "Patient Assessment", "Diagnostic Procedures", "Medical Documentation"],
        experience: [{
          position: "Physician Assistant - Emergency",
          company: "Phoenix Emergency Center",
          duration: "2019 - Present",
          description: "Treated 1000+ emergency cases with 96% patient satisfaction rating"
        }]
      }
    },
    {
      id: 15,
      title: "Pharmacist Resume",
      description: "Licensed pharmacist with clinical pharmacy background",
      tags: ["Medical", "Pharmacy", "Clinical", "Medication", "Healthcare"],
      category: "Medical",
      preview: "Healthcare template for pharmacy professionals",
      templateData: {
        personalInfo: {
          name: "Dr. Lisa Chen",
          email: "lisa.chen@email.com",
          phone: "+1 (555) 999-0000",
          address: "Denver, CO"
        },
        summary: "Licensed pharmacist with 8+ years in clinical pharmacy and medication management",
        skills: ["Clinical Pharmacy", "Medication Therapy", "Patient Counseling", "Drug Safety"],
        experience: [{
          position: "Clinical Pharmacist",
          company: "Denver Medical Center",
          duration: "2017 - Present",
          description: "Managed medication therapy for 500+ patients improving treatment outcomes by 40%"
        }]
      }
    },
    // Additional Non-Tech Templates
    {
      id: 16,
      title: "Financial Analyst Resume",
      description: "Investment analyst with portfolio management expertise",
      tags: ["Non-Tech", "Finance", "Analysis", "Investment", "Banking"],
      category: "Non-Tech",
      preview: "Professional finance template",
      templateData: {
        personalInfo: {
          name: "Robert Anderson",
          email: "robert.anderson@email.com",
          phone: "+1 (555) 111-3333",
          address: "New York, NY"
        },
        summary: "Financial analyst with 5+ years in investment banking and portfolio management",
        skills: ["Financial Modeling", "Investment Analysis", "Excel", "Bloomberg Terminal", "Risk Management"],
        experience: [{
          position: "Senior Financial Analyst",
          company: "Goldman Sachs",
          duration: "2020 - Present",
          description: "Managed $50M+ investment portfolio with 15% average annual return"
        }]
      }
    },
    {
      id: 17,
      title: "Operations Manager Resume",
      description: "Operations leader with process optimization focus",
      tags: ["Non-Tech", "Operations", "Management", "Process", "Efficiency"],
      category: "Non-Tech",
      preview: "Management-focused professional template",
      templateData: {
        personalInfo: {
          name: "Patricia Davis",
          email: "patricia.davis@email.com",
          phone: "+1 (555) 222-4444",
          address: "Atlanta, GA"
        },
        summary: "Operations manager with 9+ years optimizing business processes and team leadership",
        skills: ["Process Optimization", "Team Leadership", "Project Management", "Quality Control"],
        experience: [{
          position: "Operations Manager",
          company: "Manufacturing Plus",
          duration: "2016 - Present",
          description: "Improved operational efficiency by 45% while reducing costs by $2M annually"
        }]
      }
    },
    // Additional Others Templates
    {
      id: 18,
      title: "UX/UI Designer Resume",
      description: "Digital designer with user experience focus",
      tags: ["Others", "Design", "UX", "UI", "Digital"],
      category: "Others",
      preview: "Creative template with design portfolio focus",
      templateData: {
        personalInfo: {
          name: "Jordan Martinez",
          email: "jordan.martinez@email.com",
          phone: "+1 (555) 333-5555",
          address: "San Francisco, CA"
        },
        summary: "UX/UI designer with 5+ years creating intuitive digital experiences for web and mobile",
        skills: ["User Experience Design", "User Interface Design", "Figma", "Adobe XD", "Prototyping"],
        experience: [{
          position: "Senior UX/UI Designer",
          company: "Design Studio Pro",
          duration: "2020 - Present",
          description: "Designed user interfaces for 25+ apps with 4.8+ app store ratings"
        }]
      }
    },
    {
      id: 19,
      title: "Project Manager Resume",
      description: "Certified PMP with agile methodology expertise",
      tags: ["Others", "Management", "Project", "Agile", "Leadership"],
      category: "Others",
      preview: "Professional management template",
      templateData: {
        personalInfo: {
          name: "Kevin Thompson",
          email: "kevin.thompson@email.com",
          phone: "+1 (555) 444-6666",
          address: "Chicago, IL"
        },
        summary: "PMP-certified project manager with 8+ years leading cross-functional teams and delivering complex projects",
        skills: ["Project Management", "Agile/Scrum", "Risk Management", "Stakeholder Communication"],
        experience: [{
          position: "Senior Project Manager",
          company: "Enterprise Solutions",
          duration: "2017 - Present",
          description: "Successfully delivered 50+ projects on time and under budget with 98% client satisfaction"
        }]
      }
    },
    {
      id: 20,
      title: "Content Writer Resume",
      description: "Digital content creator with SEO expertise",
      tags: ["Others", "Writing", "Content", "SEO", "Marketing"],
      category: "Others",
      preview: "Creative template for content professionals",
      templateData: {
        personalInfo: {
          name: "Sophia Johnson",
          email: "sophia.johnson@email.com",
          phone: "+1 (555) 666-7777",
          address: "Los Angeles, CA"
        },
        summary: "Content writer with 4+ years creating engaging digital content and SEO-optimized articles",
        skills: ["Content Writing", "SEO Optimization", "Social Media", "WordPress", "Google Analytics"],
        experience: [{
          position: "Senior Content Writer",
          company: "Digital Marketing Hub",
          duration: "2021 - Present",
          description: "Created 500+ articles generating 2M+ organic page views and 300% engagement increase"
        }]
      }
    },
    // MODERN TEMPLATE DESIGNS (21-30)
    {
      id: 21,
      title: "Modern Sidebar Resume",
      description: "Clean sidebar design with color accent for tech professionals",
      tags: ["Tech", "Modern", "Sidebar", "Clean", "Professional"],
      category: "Tech",
      preview: "Sidebar layout with left panel for skills and right for experience",
      designType: "sidebar",
      colorScheme: "blue",
      templateData: {
        personalInfo: {
          name: "Alex Rivera",
          email: "alex.rivera@email.com",
          phone: "+1 (555) 123-9876",
          address: "San Francisco, CA"
        },
        summary: "Full-stack developer with expertise in modern web technologies and cloud architecture",
        skills: ["React", "Node.js", "TypeScript", "AWS", "Docker", "GraphQL"],
        experience: [{
          position: "Full Stack Developer",
          company: "TechFlow Solutions",
          duration: "2021 - Present",
          description: "Built scalable web applications serving 100K+ users with modern tech stack"
        }]
      }
    },
    {
      id: 22,
      title: "Minimalist Two-Column Resume",
      description: "Ultra-clean two-column layout with plenty of white space",
      tags: ["Tech", "Minimalist", "Two-Column", "Clean", "Simple"],
      category: "Tech",
      preview: "Two-column layout with minimal design and focus on content",
      designType: "two-column",
      colorScheme: "minimal",
      templateData: {
        personalInfo: {
          name: "Maya Chen",
          email: "maya.chen@email.com",
          phone: "+1 (555) 234-8765",
          address: "Seattle, WA"
        },
        summary: "UI/UX Designer passionate about creating intuitive and accessible digital experiences",
        skills: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research", "HTML/CSS"],
        experience: [{
          position: "Senior UI/UX Designer",
          company: "Design Studio",
          duration: "2020 - Present",
          description: "Led design for 15+ mobile apps with average 4.8 star rating"
        }]
      }
    },
    {
      id: 23,
      title: "Creative Header Resume",
      description: "Bold header design with geometric elements for creative roles",
      tags: ["Others", "Creative", "Bold", "Design", "Modern"],
      category: "Others",
      preview: "Creative layout with bold header and modern typography",
      designType: "creative-header",
      colorScheme: "purple",
      templateData: {
        personalInfo: {
          name: "Jordan Blake",
          email: "jordan.blake@email.com",
          phone: "+1 (555) 345-7654",
          address: "Los Angeles, CA"
        },
        summary: "Creative director with 8+ years crafting compelling brand experiences and campaigns",
        skills: ["Brand Strategy", "Creative Direction", "Adobe Creative Suite", "Campaign Management"],
        experience: [{
          position: "Creative Director",
          company: "Brand Innovators",
          duration: "2018 - Present",
          description: "Directed creative campaigns generating $5M+ in client revenue"
        }]
      }
    },
    {
      id: 24,
      title: "Timeline Resume",
      description: "Unique timeline-based layout showcasing career progression",
      tags: ["Others", "Timeline", "Unique", "Career", "Visual"],
      category: "Others",
      preview: "Timeline layout showing career progression visually",
      designType: "timeline",
      colorScheme: "green",
      templateData: {
        personalInfo: {
          name: "Samuel Torres",
          email: "samuel.torres@email.com",
          phone: "+1 (555) 456-6543",
          address: "Chicago, IL"
        },
        summary: "Project manager with proven track record of delivering complex projects on time and under budget",
        skills: ["Agile", "Scrum", "Risk Management", "Team Leadership", "Budget Planning"],
        experience: [{
          position: "Senior Project Manager",
          company: "Global Projects Inc",
          duration: "2017 - Present",
          description: "Successfully delivered 30+ projects with combined value of $10M+"
        }]
      }
    },
    {
      id: 25,
      title: "Cards Layout Resume",
      description: "Modern card-based design with sectioned information blocks",
      tags: ["Tech", "Cards", "Modern", "Sectioned", "Clean"],
      category: "Tech",
      preview: "Card-based layout with modern design elements",
      designType: "cards",
      colorScheme: "teal",
      templateData: {
        personalInfo: {
          name: "Priya Patel",
          email: "priya.patel@email.com",
          phone: "+1 (555) 567-5432",
          address: "Austin, TX"
        },
        summary: "Data engineer specializing in big data processing and machine learning pipelines",
        skills: ["Python", "Apache Spark", "Kafka", "Kubernetes", "MLOps", "TensorFlow"],
        experience: [{
          position: "Senior Data Engineer",
          company: "DataFlow Technologies",
          duration: "2019 - Present",
          description: "Built data pipelines processing 1TB+ daily with 99.9% uptime"
        }]
      }
    },
    {
      id: 26,
      title: "Gradient Modern Resume",
      description: "Stylish gradient design perfect for tech and creative roles",
      tags: ["Tech", "Gradient", "Modern", "Stylish", "Contemporary"],
      category: "Tech",
      preview: "Modern gradient design with contemporary styling",
      designType: "gradient",
      colorScheme: "gradient-blue",
      templateData: {
        personalInfo: {
          name: "Ryan Johnson",
          email: "ryan.johnson@email.com",
          phone: "+1 (555) 678-4321",
          address: "Denver, CO"
        },
        summary: "Mobile app developer with expertise in iOS and Android development using native and cross-platform technologies",
        skills: ["Swift", "Kotlin", "React Native", "Flutter", "Firebase", "REST APIs"],
        experience: [{
          position: "Mobile App Developer",
          company: "Mobile Innovations",
          duration: "2020 - Present",
          description: "Developed 12+ mobile apps with 500K+ combined downloads"
        }]
      }
    },
    {
      id: 27,
      title: "Executive Summary Resume",
      description: "Executive-style layout with emphasis on achievements and leadership",
      tags: ["Non-Tech", "Executive", "Leadership", "Professional", "Corporate"],
      category: "Non-Tech",
      preview: "Executive layout emphasizing leadership and achievements",
      designType: "executive",
      colorScheme: "navy",
      templateData: {
        personalInfo: {
          name: "Victoria Sterling",
          email: "victoria.sterling@email.com",
          phone: "+1 (555) 789-3210",
          address: "Boston, MA"
        },
        summary: "Senior executive with 15+ years leading cross-functional teams and driving organizational growth",
        skills: ["Strategic Planning", "Team Leadership", "P&L Management", "Digital Transformation"],
        experience: [{
          position: "Vice President of Operations",
          company: "Fortune 500 Corp",
          duration: "2015 - Present",
          description: "Led operations for $100M+ business unit, achieving 25% YoY growth"
        }]
      }
    },
    {
      id: 28,
      title: "Skills-First Resume",
      description: "Skills-focused layout perfect for career changers and technical roles",
      tags: ["Tech", "Skills-focused", "Technical", "Modern", "Functional"],
      category: "Tech",
      preview: "Skills-first layout with prominent technical competencies",
      designType: "skills-first",
      colorScheme: "orange",
      templateData: {
        personalInfo: {
          name: "Marcus Thompson",
          email: "marcus.thompson@email.com",
          phone: "+1 (555) 890-2109",
          address: "Portland, OR"
        },
        summary: "Cloud architect transitioning from traditional IT to modern cloud-native solutions",
        skills: ["AWS", "Azure", "Terraform", "Docker", "Kubernetes", "Microservices", "DevOps"],
        experience: [{
          position: "Cloud Solutions Architect",
          company: "CloudTech Solutions",
          duration: "2021 - Present",
          description: "Architected cloud migrations for 20+ enterprise clients saving $2M+ annually"
        }]
      }
    },
    {
      id: 29,
      title: "Photo-Centric Resume",
      description: "Professional layout with prominent photo placement for client-facing roles",
      tags: ["Non-Tech", "Photo-centric", "Client-facing", "Professional", "Personal"],
      category: "Non-Tech",
      preview: "Photo-prominent layout for client-facing professionals",
      designType: "photo-centric",
      colorScheme: "warm",
      templateData: {
        personalInfo: {
          name: "Isabella Martinez",
          email: "isabella.martinez@email.com",
          phone: "+1 (555) 901-1987",
          address: "Miami, FL"
        },
        summary: "Client relationship manager with exceptional track record in account growth and customer satisfaction",
        skills: ["Client Relations", "Account Management", "Sales Strategy", "CRM", "Negotiation"],
        experience: [{
          position: "Senior Account Manager",
          company: "Client Solutions Group",
          duration: "2018 - Present",
          description: "Managed $5M+ portfolio with 98% client retention and 35% growth rate"
        }]
      }
    },
    {
      id: 30,
      title: "Infographic Resume",
      description: "Visual infographic-style resume with charts and progress bars",
      tags: ["Others", "Infographic", "Visual", "Creative", "Data-driven"],
      category: "Others",
      preview: "Infographic layout with visual elements and data representation",
      designType: "infographic",
      colorScheme: "multi-color",
      templateData: {
        personalInfo: {
          name: "Daniel Kim",
          email: "daniel.kim@email.com",
          phone: "+1 (555) 012-8765",
          address: "San Diego, CA"
        },
        summary: "Marketing analyst with expertise in data visualization and campaign performance optimization",
        skills: ["Data Analysis", "Tableau", "Google Analytics", "A/B Testing", "Marketing Automation"],
        experience: [{
          position: "Marketing Data Analyst",
          company: "Growth Marketing Co",
          duration: "2020 - Present",
          description: "Increased campaign ROI by 150% through data-driven optimization strategies"
        }]
      }
    },
    // PROFESSIONAL TEMPLATE DESIGNS (31-40)
    {
      id: 31,
      title: "Corporate Executive Resume",
      description: "Traditional corporate layout for C-level and senior management positions",
      tags: ["Non-Tech", "Corporate", "Executive", "Traditional", "Management"],
      category: "Non-Tech",
      preview: "Classic corporate design for executive positions",
      designType: "corporate",
      colorScheme: "classic-blue",
      templateData: {
        personalInfo: {
          name: "Robert Harrison",
          email: "robert.harrison@email.com",
          phone: "+1 (555) 123-4567",
          address: "New York, NY"
        },
        summary: "C-level executive with 20+ years transforming organizations and driving sustainable growth",
        skills: ["Strategic Leadership", "Organizational Development", "M&A", "Board Relations"],
        experience: [{
          position: "Chief Executive Officer",
          company: "Harrison Industries",
          duration: "2010 - Present",
          description: "Transformed $50M company into $200M market leader through strategic acquisitions"
        }]
      }
    },
    {
      id: 32,
      title: "Banking Professional Resume",
      description: "Conservative banking industry template with focus on compliance and risk",
      tags: ["Non-Tech", "Banking", "Finance", "Conservative", "Compliance"],
      category: "Non-Tech",
      preview: "Banking industry template with conservative styling",
      designType: "banking",
      colorScheme: "forest-green",
      templateData: {
        personalInfo: {
          name: "Elizabeth Morgan",
          email: "elizabeth.morgan@email.com",
          phone: "+1 (555) 234-5678",
          address: "Charlotte, NC"
        },
        summary: "Banking professional with 12+ years in risk management and regulatory compliance",
        skills: ["Risk Management", "Regulatory Compliance", "Financial Analysis", "Basel III"],
        experience: [{
          position: "Senior Risk Manager",
          company: "First National Bank",
          duration: "2016 - Present",
          description: "Implemented risk frameworks reducing regulatory violations by 90%"
        }]
      }
    },
    {
      id: 33,
      title: "Consulting Professional Resume",
      description: "Management consulting template emphasizing problem-solving and results",
      tags: ["Non-Tech", "Consulting", "Strategy", "Problem-solving", "Results"],
      category: "Non-Tech",
      preview: "Consulting template focused on achievements and problem-solving",
      designType: "consulting",
      colorScheme: "charcoal",
      templateData: {
        personalInfo: {
          name: "Michael Rodriguez",
          email: "michael.rodriguez@email.com",
          phone: "+1 (555) 345-6789",
          address: "Chicago, IL"
        },
        summary: "Management consultant with expertise in operational excellence and digital transformation",
        skills: ["Strategy Development", "Process Optimization", "Change Management", "Digital Transformation"],
        experience: [{
          position: "Senior Consultant",
          company: "McKinsey & Company",
          duration: "2018 - Present",
          description: "Led 15+ engagements generating $25M+ in client value through operational improvements"
        }]
      }
    },
    {
      id: 34,
      title: "Legal Professional Resume",
      description: "Attorney and legal professional template with emphasis on expertise areas",
      tags: ["Non-Tech", "Legal", "Attorney", "Professional", "Expertise"],
      category: "Non-Tech",
      preview: "Legal professional template with practice area focus",
      designType: "legal",
      colorScheme: "burgundy",
      templateData: {
        personalInfo: {
          name: "Sarah Thompson",
          email: "sarah.thompson@email.com",
          phone: "+1 (555) 456-7890",
          address: "Washington, DC"
        },
        summary: "Corporate attorney with 10+ years specializing in M&A transactions and securities law",
        skills: ["Corporate Law", "M&A Transactions", "Securities Regulation", "Contract Negotiation"],
        experience: [{
          position: "Senior Associate",
          company: "Wilson & Associates LLP",
          duration: "2017 - Present",
          description: "Closed $500M+ in M&A transactions for Fortune 500 clients"
        }]
      }
    },
    {
      id: 35,
      title: "Academic Professional Resume",
      description: "Academic and research-focused template for professors and researchers",
      tags: ["Others", "Academic", "Research", "Professor", "Education"],
      category: "Others",
      preview: "Academic template emphasizing research and publications",
      designType: "academic",
      colorScheme: "deep-blue",
      templateData: {
        personalInfo: {
          name: "Dr. James Wilson",
          email: "james.wilson@university.edu",
          phone: "+1 (555) 567-8901",
          address: "Stanford, CA"
        },
        summary: "Professor of Computer Science with 15+ years of research in artificial intelligence and machine learning",
        skills: ["Research", "Grant Writing", "Teaching", "Machine Learning", "Academic Writing"],
        experience: [{
          position: "Associate Professor",
          company: "Stanford University",
          duration: "2015 - Present",
          description: "Published 50+ peer-reviewed papers and secured $2M+ in research funding"
        }]
      }
    },
    {
      id: 36,
      title: "Investment Professional Resume",
      description: "Investment and wealth management template for financial advisors",
      tags: ["Non-Tech", "Investment", "Wealth", "Finance", "Advisory"],
      category: "Non-Tech",
      preview: "Investment professional template with portfolio focus",
      designType: "investment",
      colorScheme: "gold",
      templateData: {
        personalInfo: {
          name: "Amanda Foster",
          email: "amanda.foster@email.com",
          phone: "+1 (555) 678-9012",
          address: "San Francisco, CA"
        },
        summary: "Investment advisor managing $100M+ in client assets with focus on sustainable investing",
        skills: ["Portfolio Management", "Wealth Planning", "ESG Investing", "Client Relations"],
        experience: [{
          position: "Senior Investment Advisor",
          company: "Wealth Management Partners",
          duration: "2016 - Present",
          description: "Achieved 12% average annual returns while maintaining low-risk profiles"
        }]
      }
    },
    {
      id: 37,
      title: "Real Estate Professional Resume",
      description: "Real estate agent and broker template with transaction focus",
      tags: ["Non-Tech", "Real Estate", "Sales", "Broker", "Transactions"],
      category: "Non-Tech",
      preview: "Real estate template emphasizing sales achievements",
      designType: "real-estate",
      colorScheme: "earth-tones",
      templateData: {
        personalInfo: {
          name: "Carlos Mendez",
          email: "carlos.mendez@email.com",
          phone: "+1 (555) 789-0123",
          address: "Los Angeles, CA"
        },
        summary: "Top-performing real estate broker with $50M+ in annual sales volume",
        skills: ["Property Sales", "Market Analysis", "Client Relations", "Negotiation", "Property Valuation"],
        experience: [{
          position: "Senior Real Estate Broker",
          company: "Premier Properties",
          duration: "2017 - Present",
          description: "Consistently ranked in top 5% of agents with 200+ successful transactions"
        }]
      }
    },
    {
      id: 38,
      title: "Insurance Professional Resume",
      description: "Insurance industry template for agents and underwriters",
      tags: ["Non-Tech", "Insurance", "Risk", "Sales", "Underwriting"],
      category: "Non-Tech",
      preview: "Insurance professional template with risk assessment focus",
      designType: "insurance",
      colorScheme: "steel-blue",
      templateData: {
        personalInfo: {
          name: "Jennifer Walsh",
          email: "jennifer.walsh@email.com",
          phone: "+1 (555) 890-1234",
          address: "Hartford, CT"
        },
        summary: "Insurance professional with 8+ years in commercial underwriting and risk assessment",
        skills: ["Risk Assessment", "Underwriting", "Policy Analysis", "Client Consultation", "Claims Management"],
        experience: [{
          position: "Senior Commercial Underwriter",
          company: "Global Insurance Group",
          duration: "2018 - Present",
          description: "Underwrote $100M+ in commercial policies with 95% profitability rate"
        }]
      }
    },
    {
      id: 39,
      title: "Government Professional Resume",
      description: "Federal and state government employee template with security clearance focus",
      tags: ["Non-Tech", "Government", "Public Service", "Federal", "Clearance"],
      category: "Non-Tech",
      preview: "Government template emphasizing public service and clearances",
      designType: "government",
      colorScheme: "american-blue",
      templateData: {
        personalInfo: {
          name: "Thomas Anderson",
          email: "thomas.anderson@email.com",
          phone: "+1 (555) 901-2345",
          address: "Arlington, VA"
        },
        summary: "Federal analyst with Top Secret clearance and 12+ years in national security policy",
        skills: ["Policy Analysis", "Security Clearance", "Government Relations", "Research", "Briefing"],
        experience: [{
          position: "Senior Policy Analyst",
          company: "Department of Defense",
          duration: "2015 - Present",
          description: "Analyzed critical policy issues impacting national security operations"
        }]
      }
    },
    {
      id: 40,
      title: "Non-Profit Professional Resume",
      description: "Non-profit and social impact template emphasizing mission-driven work",
      tags: ["Others", "Non-Profit", "Social Impact", "Mission-driven", "Community"],
      category: "Others",
      preview: "Non-profit template focusing on social impact and community work",
      designType: "non-profit",
      colorScheme: "earth-green",
      templateData: {
        personalInfo: {
          name: "Maria Santos",
          email: "maria.santos@email.com",
          phone: "+1 (555) 012-3456",
          address: "Seattle, WA"
        },
        summary: "Non-profit leader with 10+ years developing programs that serve 10,000+ community members annually",
        skills: ["Program Development", "Grant Writing", "Community Outreach", "Volunteer Management"],
        experience: [{
          position: "Program Director",
          company: "Community Impact Foundation",
          duration: "2016 - Present",
          description: "Developed and managed programs serving 10,000+ individuals with $2M+ annual budget"
        }]
      }
    },
    // CREATIVE TEMPLATE DESIGNS (41-50)
    {
      id: 41,
      title: "Portfolio Designer Resume",
      description: "Creative portfolio-style resume perfect for designers and artists",
      tags: ["Others", "Portfolio", "Creative", "Designer", "Visual"],
      category: "Others",
      preview: "Portfolio-style layout showcasing creative work",
      designType: "portfolio",
      colorScheme: "vibrant",
      templateData: {
        personalInfo: {
          name: "Luna Rodriguez",
          email: "luna.rodriguez@email.com",
          phone: "+1 (555) 123-7890",
          address: "Brooklyn, NY"
        },
        summary: "Creative designer specializing in brand identity and digital experiences with 6+ years of award-winning work",
        skills: ["Brand Design", "Digital Art", "Typography", "Illustration", "UI/UX Design", "Motion Graphics"],
        experience: [{
          position: "Senior Brand Designer",
          company: "Creative Collective",
          duration: "2019 - Present",
          description: "Created brand identities for 30+ startups and won 5 design awards"
        }]
      }
    },
    {
      id: 42,
      title: "Startup Professional Resume",
      description: "Dynamic startup-focused resume with growth metrics and innovation highlights",
      tags: ["Tech", "Startup", "Growth", "Innovation", "Dynamic"],
      category: "Tech",
      preview: "Startup-style template emphasizing growth and innovation",
      designType: "startup",
      colorScheme: "neon",
      templateData: {
        personalInfo: {
          name: "Zoe Kim",
          email: "zoe.kim@email.com",
          phone: "+1 (555) 234-6789",
          address: "Palo Alto, CA"
        },
        summary: "Growth hacker and product manager with expertise in scaling startups from 0 to 1M users",
        skills: ["Growth Hacking", "Product Management", "A/B Testing", "Analytics", "User Acquisition"],
        experience: [{
          position: "Head of Growth",
          company: "TechStartup Inc",
          duration: "2020 - Present",
          description: "Scaled user base from 10K to 1M+ users with 300% YoY growth rate"
        }]
      }
    },
    {
      id: 43,
      title: "Media Professional Resume",
      description: "Media and entertainment industry template for content creators",
      tags: ["Others", "Media", "Entertainment", "Content", "Creative"],
      category: "Others",
      preview: "Media template for entertainment and content professionals",
      designType: "media",
      colorScheme: "hollywood",
      templateData: {
        personalInfo: {
          name: "Ethan Cooper",
          email: "ethan.cooper@email.com",
          phone: "+1 (555) 345-5678",
          address: "Hollywood, CA"
        },
        summary: "Content creator and media producer with 100M+ views across digital platforms",
        skills: ["Video Production", "Content Strategy", "Social Media", "Storytelling", "Brand Partnerships"],
        experience: [{
          position: "Content Producer",
          company: "Digital Media House",
          duration: "2018 - Present",
          description: "Produced viral content generating 100M+ views and $2M+ in ad revenue"
        }]
      }
    },
    {
      id: 44,
      title: "Artistic Resume",
      description: "Creative artistic template for painters, sculptors, and fine artists",
      tags: ["Others", "Art", "Creative", "Fine Arts", "Artistic"],
      category: "Others",
      preview: "Artistic template with creative elements and portfolio focus",
      designType: "artistic",
      colorScheme: "artist-palette",
      templateData: {
        personalInfo: {
          name: "Sofia Moreau",
          email: "sofia.moreau@email.com",
          phone: "+1 (555) 456-4321",
          address: "Santa Fe, NM"
        },
        summary: "Contemporary artist with exhibitions in 15+ galleries and collections in major museums",
        skills: ["Oil Painting", "Sculpture", "Mixed Media", "Gallery Relations", "Art Curation"],
        experience: [{
          position: "Professional Artist",
          company: "Independent Practice",
          duration: "2015 - Present",
          description: "Exhibited in 15+ galleries with works in MoMA and Whitney collections"
        }]
      }
    },
    {
      id: 45,
      title: "Influencer Resume",
      description: "Social media influencer and personal brand template",
      tags: ["Others", "Influencer", "Social Media", "Brand", "Digital"],
      category: "Others",
      preview: "Influencer template highlighting social media achievements",
      designType: "influencer",
      colorScheme: "social-media",
      templateData: {
        personalInfo: {
          name: "Ava Johnson",
          email: "ava.johnson@email.com",
          phone: "+1 (555) 567-3210",
          address: "Miami, FL"
        },
        summary: "Lifestyle influencer with 500K+ followers and proven track record in brand partnerships",
        skills: ["Content Creation", "Brand Partnerships", "Community Management", "Photography", "Video Editing"],
        experience: [{
          position: "Content Creator & Influencer",
          company: "Personal Brand",
          duration: "2019 - Present",
          description: "Built 500K+ following with $100K+ annual revenue from brand partnerships"
        }]
      }
    },
    {
      id: 46,
      title: "Music Professional Resume",
      description: "Music industry template for performers, producers, and music professionals",
      tags: ["Others", "Music", "Entertainment", "Performance", "Audio"],
      category: "Others",
      preview: "Music industry template with performance and production focus",
      designType: "music",
      colorScheme: "music-notes",
      templateData: {
        personalInfo: {
          name: "Marcus Williams",
          email: "marcus.williams@email.com",
          phone: "+1 (555) 678-2109",
          address: "Nashville, TN"
        },
        summary: "Music producer and songwriter with 50+ published tracks and Grammy nomination",
        skills: ["Music Production", "Songwriting", "Audio Engineering", "Live Performance", "Music Business"],
        experience: [{
          position: "Music Producer",
          company: "Sound Studios Nashville",
          duration: "2017 - Present",
          description: "Produced 50+ tracks for major artists with Grammy nomination in 2023"
        }]
      }
    },
    {
      id: 47,
      title: "Photography Resume",
      description: "Professional photographer template showcasing visual portfolio",
      tags: ["Others", "Photography", "Visual", "Creative", "Portfolio"],
      category: "Others",
      preview: "Photography template with visual portfolio emphasis",
      designType: "photography",
      colorScheme: "photo-tones",
      templateData: {
        personalInfo: {
          name: "Isabella Chang",
          email: "isabella.chang@email.com",
          phone: "+1 (555) 789-1098",
          address: "San Francisco, CA"
        },
        summary: "Professional photographer specializing in fashion and commercial photography with international clients",
        skills: ["Fashion Photography", "Commercial Photography", "Photo Editing", "Studio Lighting", "Client Relations"],
        experience: [{
          position: "Senior Photographer",
          company: "Elite Photography Studio",
          duration: "2018 - Present",
          description: "Shot campaigns for 25+ international brands including Vogue and Harper's Bazaar"
        }]
      }
    },
    {
      id: 48,
      title: "Freelancer Resume",
      description: "Freelance professional template highlighting diverse project experience",
      tags: ["Others", "Freelance", "Independent", "Diverse", "Project-based"],
      category: "Others",
      preview: "Freelancer template showcasing diverse project portfolio",
      designType: "freelancer",
      colorScheme: "freedom",
      templateData: {
        personalInfo: {
          name: "Noah Chen",
          email: "noah.chen@email.com",
          phone: "+1 (555) 890-9876",
          address: "Remote"
        },
        summary: "Freelance digital consultant helping 100+ businesses optimize their online presence and operations",
        skills: ["Digital Marketing", "Web Development", "Business Consulting", "Project Management", "Client Relations"],
        experience: [{
          position: "Freelance Digital Consultant",
          company: "Independent",
          duration: "2019 - Present",
          description: "Consulted for 100+ businesses generating $5M+ in combined client revenue"
        }]
      }
    },
    {
      id: 49,
      title: "Gaming Industry Resume",
      description: "Video game industry template for developers, designers, and producers",
      tags: ["Tech", "Gaming", "Game Development", "Interactive", "Entertainment"],
      category: "Tech",
      preview: "Gaming industry template with interactive design elements",
      designType: "gaming",
      colorScheme: "gaming",
      templateData: {
        personalInfo: {
          name: "Riley Park",
          email: "riley.park@email.com",
          phone: "+1 (555) 901-8765",
          address: "Seattle, WA"
        },
        summary: "Game developer with 7+ years creating award-winning mobile and console games",
        skills: ["Unity", "C#", "Game Design", "3D Modeling", "Mobile Development", "Console Development"],
        experience: [{
          position: "Senior Game Developer",
          company: "GameStudio Pro",
          duration: "2018 - Present",
          description: "Developed 8 award-winning games with 10M+ downloads and $5M+ revenue"
        }]
      }
    },
    {
      id: 50,
      title: "Architecture Resume",
      description: "Architect and design professional template with project showcase",
      tags: ["Others", "Architecture", "Design", "Construction", "Projects"],
      category: "Others",
      preview: "Architecture template highlighting design projects",
      designType: "architecture",
      colorScheme: "blueprint",
      templateData: {
        personalInfo: {
          name: "Oliver Martinez",
          email: "oliver.martinez@email.com",
          phone: "+1 (555) 012-7654",
          address: "Chicago, IL"
        },
        summary: "Licensed architect with 12+ years designing sustainable commercial and residential projects",
        skills: ["Architectural Design", "AutoCAD", "Revit", "Sustainable Design", "Project Management", "3D Modeling"],
        experience: [{
          position: "Senior Architect",
          company: "Design Architecture Firm",
          duration: "2015 - Present",
          description: "Designed 25+ LEED-certified buildings with combined value of $100M+"
        }]
      }
    },
    {
      id: 51,
      title: "Executive Sidebar Resume",
      description: "Professional executive template with prominent contact sidebar",
      tags: ["Tech", "Executive", "Management", "Leadership", "Corporate"],
      category: "Tech",
      preview: "Executive template with left contact sidebar",
      designType: "contact-sidebar",
      colorScheme: "executive-navy",
      templateData: {
        personalInfo: {
          name: "Sarah Johnson",
          email: "sarah.johnson@email.com",
          phone: "+1 (555) 123-8901",
          address: "New York, NY"
        },
        summary: "Executive leader with 15+ years driving digital transformation and team growth",
        skills: ["Strategic Planning", "Team Leadership", "Digital Transformation", "P&L Management", "Stakeholder Relations", "Innovation"],
        experience: [{
          position: "Chief Technology Officer",
          company: "TechCorp Solutions",
          duration: "2019 - Present",
          description: "Led digital transformation initiatives resulting in 40% efficiency improvement"
        }]
      }
    },
    {
      id: 52,
      title: "Academic Research Resume",
      description: "Formal academic template for researchers and professors",
      tags: ["Non-Tech", "Academic", "Research", "Professor", "Education"],
      category: "Non-Tech",
      preview: "Academic template with formal research layout",
      designType: "academic-formal",
      colorScheme: "academic-burgundy",
      templateData: {
        personalInfo: {
          name: "Dr. Michael Chen",
          email: "m.chen@university.edu",
          phone: "+1 (555) 234-9012",
          address: "Boston, MA"
        },
        summary: "Research professor with 12+ years in computational biology and 50+ publications",
        skills: ["Research Methodology", "Data Analysis", "Academic Writing", "Grant Writing", "Peer Review", "Computational Biology"],
        experience: [{
          position: "Associate Professor",
          company: "Harvard University",
          duration: "2018 - Present",
          description: "Published 25 peer-reviewed papers and secured $2M in research grants"
        }]
      }
    },
    {
      id: 53,
      title: "Legal Professional Resume",
      description: "Conservative legal template for attorneys and legal professionals",
      tags: ["Others", "Legal", "Attorney", "Law", "Corporate"],
      category: "Others",
      preview: "Legal template with professional conservative design",
      designType: "legal-professional",
      colorScheme: "legal-charcoal",
      templateData: {
        personalInfo: {
          name: "Jennifer Thompson",
          email: "j.thompson@lawfirm.com",
          phone: "+1 (555) 345-0123",
          address: "Washington, DC"
        },
        summary: "Corporate attorney with 10+ years in mergers & acquisitions and securities law",
        skills: ["Corporate Law", "M&A Transactions", "Securities Law", "Contract Negotiation", "Due Diligence", "Regulatory Compliance"],
        experience: [{
          position: "Senior Associate",
          company: "Wilson & Associates LLP",
          duration: "2017 - Present",
          description: "Led M&A transactions worth $500M+ and advised Fortune 500 companies"
        }]
      }
    },
    {
      id: 54,
      title: "Photo Header Resume",
      description: "Modern template with professional photo header section",
      tags: ["Others", "Photo", "Modern", "Creative", "Personal"],
      category: "Others",
      preview: "Modern template with photo header integration",
      designType: "photo-header",
      colorScheme: "photo-slate",
      templateData: {
        personalInfo: {
          name: "David Wilson",
          email: "david.wilson@email.com",
          phone: "+1 (555) 456-1234",
          address: "Los Angeles, CA"
        },
        summary: "Creative director with 8+ years building brands and leading design teams",
        skills: ["Brand Strategy", "Creative Direction", "Team Leadership", "Adobe Creative Suite", "UI/UX Design", "Marketing"],
        experience: [{
          position: "Creative Director",
          company: "Brand Agency",
          duration: "2019 - Present",
          description: "Managed creative campaigns for 20+ major brands with $10M+ budgets"
        }]
      }
    },
    {
      id: 55,
      title: "Financial Executive Resume",
      description: "Professional financial template for executives and advisors",
      tags: ["Others", "Finance", "Executive", "Banking", "Investment"],
      category: "Others",
      preview: "Financial template with executive styling",
      designType: "executive-finance",
      colorScheme: "finance-gold",
      templateData: {
        personalInfo: {
          name: "Robert Anderson",
          email: "r.anderson@finance.com",
          phone: "+1 (555) 567-2345",
          address: "Chicago, IL"
        },
        summary: "Financial executive with 18+ years in investment banking and portfolio management",
        skills: ["Investment Banking", "Portfolio Management", "Risk Analysis", "Financial Modeling", "Client Relations", "Regulatory Compliance"],
        experience: [{
          position: "Managing Director",
          company: "Goldman Sachs",
          duration: "2015 - Present",
          description: "Managed $2B+ portfolio and led investment strategies for high-net-worth clients"
        }]
      }
    },
    {
      id: 56,
      title: "Split Screen Resume",
      description: "Dynamic split-screen layout with color blocking",
      tags: ["Tech", "Modern", "Creative", "Split", "Dynamic"],
      category: "Tech",
      preview: "Split-screen template with dynamic color blocks",
      designType: "split-screen",
      colorScheme: "split-teal",
      templateData: {
        personalInfo: {
          name: "Lisa Garcia",
          email: "lisa.garcia@email.com",
          phone: "+1 (555) 678-3456",
          address: "Austin, TX"
        },
        summary: "UX designer with 6+ years creating intuitive digital experiences",
        skills: ["UX/UI Design", "User Research", "Prototyping", "Figma", "Adobe XD", "Design Systems"],
        experience: [{
          position: "Senior UX Designer",
          company: "Tech Startup",
          duration: "2020 - Present",
          description: "Designed user interfaces for apps with 1M+ active users"
        }]
      }
    },
    {
      id: 57,
      title: "Minimalist Grid Resume",
      description: "Clean grid-based layout for technical professionals",
      tags: ["Tech", "Minimalist", "Grid", "Clean", "Technical"],
      category: "Tech",
      preview: "Minimalist template with structured grid layout",
      designType: "minimalist-grid",
      colorScheme: "grid-mint",
      templateData: {
        personalInfo: {
          name: "Kevin Lee",
          email: "kevin.lee@email.com",
          phone: "+1 (555) 789-4567",
          address: "Seattle, WA"
        },
        summary: "Software architect with 12+ years designing scalable systems",
        skills: ["System Architecture", "Microservices", "Cloud Computing", "Java", "Python", "Kubernetes"],
        experience: [{
          position: "Principal Software Architect",
          company: "Amazon",
          duration: "2018 - Present",
          description: "Designed microservices architecture serving 50M+ requests daily"
        }]
      }
    },
    {
      id: 58,
      title: "Healthcare Professional Resume",
      description: "Medical template for healthcare professionals and specialists",
      tags: ["Medical", "Healthcare", "Doctor", "Nurse", "Clinical"],
      category: "Medical",
      preview: "Healthcare template with medical professional layout",
      designType: "healthcare-pro",
      colorScheme: "medical-blue",
      templateData: {
        personalInfo: {
          name: "Dr. Amanda Rodriguez",
          email: "a.rodriguez@hospital.com",
          phone: "+1 (555) 890-5678",
          address: "Miami, FL"
        },
        summary: "Board-certified cardiologist with 14+ years in interventional cardiology",
        skills: ["Interventional Cardiology", "Cardiac Catheterization", "Patient Care", "Medical Research", "Clinical Trials", "Teaching"],
        experience: [{
          position: "Attending Cardiologist",
          company: "Miami Heart Institute",
          duration: "2016 - Present",
          description: "Performed 500+ cardiac procedures with 98% success rate"
        }]
      }
    },
    {
      id: 59,
      title: "Startup Founder Resume",
      description: "Dynamic template for entrepreneurs and startup founders",
      tags: ["Others", "Startup", "Entrepreneur", "Founder", "Innovation"],
      category: "Others",
      preview: "Startup template with entrepreneurial focus",
      designType: "startup-dynamic",
      colorScheme: "startup-orange",
      templateData: {
        personalInfo: {
          name: "Alex Morgan",
          email: "alex.morgan@startup.com",
          phone: "+1 (555) 901-6789",
          address: "San Diego, CA"
        },
        summary: "Serial entrepreneur with 3 successful exits and 10+ years building startups",
        skills: ["Entrepreneurship", "Product Strategy", "Fundraising", "Team Building", "Market Analysis", "Business Development"],
        experience: [{
          position: "Co-Founder & CEO",
          company: "InnovateTech",
          duration: "2019 - Present",
          description: "Built SaaS platform to $5M ARR and raised $15M Series A funding"
        }]
      }
    },
    {
      id: 60,
      title: "Consulting Professional Resume",
      description: "Strategic consulting template for management consultants",
      tags: ["Others", "Consulting", "Strategy", "Management", "Business"],
      category: "Others",
      preview: "Consulting template with strategic focus",
      designType: "consulting-strategic",
      colorScheme: "consulting-steel",
      templateData: {
        personalInfo: {
          name: "Maria Gonzalez",
          email: "m.gonzalez@mckinsey.com",
          phone: "+1 (555) 012-7890",
          address: "Boston, MA"
        },
        summary: "Management consultant with 8+ years advising Fortune 500 companies",
        skills: ["Strategy Consulting", "Business Analysis", "Market Research", "Financial Modeling", "Change Management", "Client Relations"],
        experience: [{
          position: "Senior Consultant",
          company: "McKinsey & Company",
          duration: "2018 - Present",
          description: "Led strategy projects generating $50M+ value for clients across industries"
        }]
      }
    },
    {
      id: 61,
      title: "Tech Lead Resume",
      description: "Technical leadership template for senior developers and tech leads",
      tags: ["Tech", "Leadership", "Senior", "Developer", "Management"],
      category: "Tech",
      preview: "Tech lead template with leadership emphasis",
      designType: "tech-lead",
      colorScheme: "lead-purple",
      templateData: {
        personalInfo: {
          name: "James Kim",
          email: "james.kim@email.com",
          phone: "+1 (555) 123-8901",
          address: "San Jose, CA"
        },
        summary: "Tech lead with 10+ years building high-performance engineering teams",
        skills: ["Technical Leadership", "Full-Stack Development", "System Design", "Team Mentoring", "Agile Methodologies", "DevOps"],
        experience: [{
          position: "Principal Engineer",
          company: "Google",
          duration: "2019 - Present",
          description: "Led engineering team of 15 delivering products used by 100M+ users"
        }]
      }
    },
    {
      id: 62,
      title: "Sales Executive Resume",
      description: "Results-driven template for sales professionals and executives",
      tags: ["Others", "Sales", "Executive", "Revenue", "Business Development"],
      category: "Others",
      preview: "Sales template with performance metrics focus",
      designType: "sales-executive",
      colorScheme: "sales-red",
      templateData: {
        personalInfo: {
          name: "Thomas Brown",
          email: "t.brown@salesforce.com",
          phone: "+1 (555) 234-9012",
          address: "Atlanta, GA"
        },
        summary: "Sales executive with 12+ years driving revenue growth and building client relationships",
        skills: ["Enterprise Sales", "Account Management", "Revenue Growth", "CRM Systems", "Negotiation", "Team Leadership"],
        experience: [{
          position: "VP of Sales",
          company: "Salesforce",
          duration: "2017 - Present",
          description: "Grew regional revenue from $20M to $75M and managed 25-person sales team"
        }]
      }
    },
    {
      id: 63,
      title: "Product Manager Resume",
      description: "Product-focused template for product managers and product owners",
      tags: ["Tech", "Product", "Manager", "Strategy", "Innovation"],
      category: "Tech",
      preview: "Product manager template with product focus",
      designType: "product-manager",
      colorScheme: "product-indigo",
      templateData: {
        personalInfo: {
          name: "Rachel White",
          email: "rachel.white@email.com",
          phone: "+1 (555) 345-0123",
          address: "Portland, OR"
        },
        summary: "Product manager with 7+ years launching successful digital products",
        skills: ["Product Strategy", "User Research", "Data Analysis", "Agile Development", "Market Research", "Cross-functional Leadership"],
        experience: [{
          position: "Senior Product Manager",
          company: "Uber",
          duration: "2020 - Present",
          description: "Launched 3 major product features with 25% increase in user engagement"
        }]
      }
    },
    {
      id: 64,
      title: "Creative Portfolio Resume",
      description: "Artistic template for creative professionals and designers",
      tags: ["Others", "Creative", "Portfolio", "Design", "Art"],
      category: "Others",
      preview: "Creative template with portfolio showcase",
      designType: "creative-portfolio",
      colorScheme: "creative-rainbow",
      templateData: {
        personalInfo: {
          name: "Sophie Martin",
          email: "sophie.martin@email.com",
          phone: "+1 (555) 456-1234",
          address: "Brooklyn, NY"
        },
        summary: "Creative professional with 9+ years in brand design and visual storytelling",
        skills: ["Brand Design", "Visual Identity", "Illustration", "Typography", "Creative Strategy", "Adobe Creative Suite"],
        experience: [{
          position: "Senior Brand Designer",
          company: "Pentagram",
          duration: "2018 - Present",
          description: "Created brand identities for 15+ companies including 3 Fortune 500 brands"
        }]
      }
    },
    {
      id: 65,
      title: "Data Scientist Resume",
      description: "Analytics-focused template for data scientists and analysts",
      tags: ["Tech", "Data Science", "Analytics", "Machine Learning", "AI"],
      category: "Tech",
      preview: "Data science template with analytics focus",
      designType: "data-scientist",
      colorScheme: "data-cyan",
      templateData: {
        personalInfo: {
          name: "Daniel Zhang",
          email: "daniel.zhang@email.com",
          phone: "+1 (555) 567-2345",
          address: "Palo Alto, CA"
        },
        summary: "Data scientist with 6+ years applying ML to solve complex business problems",
        skills: ["Machine Learning", "Python", "R", "Statistical Analysis", "Deep Learning", "Data Visualization"],
        experience: [{
          position: "Senior Data Scientist",
          company: "Netflix",
          duration: "2019 - Present",
          description: "Built recommendation algorithms improving user engagement by 30%"
        }]
      }
    },
    {
      id: 66,
      title: "Operations Manager Resume",
      description: "Operations-focused template for managers and process experts",
      tags: ["Others", "Operations", "Management", "Process", "Efficiency"],
      category: "Others",
      preview: "Operations template with process optimization focus",
      designType: "operations-manager",
      colorScheme: "operations-forest",
      templateData: {
        personalInfo: {
          name: "Michelle Davis",
          email: "michelle.davis@email.com",
          phone: "+1 (555) 678-3456",
          address: "Phoenix, AZ"
        },
        summary: "Operations manager with 11+ years optimizing processes and reducing costs",
        skills: ["Operations Management", "Process Improvement", "Cost Reduction", "Supply Chain", "Quality Assurance", "Team Leadership"],
        experience: [{
          position: "Director of Operations",
          company: "Manufacturing Corp",
          duration: "2016 - Present",
          description: "Reduced operational costs by 25% and improved efficiency by 35%"
        }]
      }
    },
    {
      id: 67,
      title: "HR Professional Resume",
      description: "Human resources template for HR professionals and recruiters",
      tags: ["Non-Tech", "HR", "Human Resources", "Recruiting", "People"],
      category: "Non-Tech",
      preview: "HR template with people-focused design",
      designType: "hr-professional",
      colorScheme: "hr-coral",
      templateData: {
        personalInfo: {
          name: "Laura Wilson",
          email: "laura.wilson@email.com",
          phone: "+1 (555) 789-4567",
          address: "Denver, CO"
        },
        summary: "HR professional with 9+ years in talent acquisition and employee development",
        skills: ["Talent Acquisition", "Employee Relations", "Performance Management", "HR Analytics", "Compensation", "Training & Development"],
        experience: [{
          position: "Senior HR Manager",
          company: "Fortune 500 Company",
          duration: "2018 - Present",
          description: "Reduced hiring time by 40% and improved employee satisfaction by 25%"
        }]
      }
    },
    {
      id: 68,
      title: "Marketing Professional Resume",
      description: "Marketing-focused template for digital marketers and brand managers",
      tags: ["Others", "Marketing", "Digital", "Brand", "Growth"],
      category: "Others",
      preview: "Marketing template with growth metrics focus",
      designType: "marketing-professional",
      colorScheme: "marketing-magenta",
      templateData: {
        personalInfo: {
          name: "Christopher Taylor",
          email: "c.taylor@email.com",
          phone: "+1 (555) 890-5678",
          address: "Nashville, TN"
        },
        summary: "Marketing professional with 8+ years driving brand growth and digital campaigns",
        skills: ["Digital Marketing", "Brand Management", "Content Strategy", "SEO/SEM", "Social Media", "Marketing Analytics"],
        experience: [{
          position: "Marketing Director",
          company: "HubSpot",
          duration: "2019 - Present",
          description: "Increased brand awareness by 50% and generated 200% more qualified leads"
        }]
      }
    },
    {
      id: 69,
      title: "Project Manager Resume",
      description: "Project management template for PMs and scrum masters",
      tags: ["Others", "Project Management", "PM", "Scrum", "Agile"],
      category: "Others",
      preview: "Project management template with delivery focus",
      designType: "project-manager",
      colorScheme: "pm-olive",
      templateData: {
        personalInfo: {
          name: "Patricia Johnson",
          email: "p.johnson@email.com",
          phone: "+1 (555) 901-6789",
          address: "Minneapolis, MN"
        },
        summary: "Project manager with 10+ years delivering complex projects on time and budget",
        skills: ["Project Management", "Agile/Scrum", "Risk Management", "Stakeholder Communication", "Budget Management", "Team Coordination"],
        experience: [{
          position: "Senior Project Manager",
          company: "IBM",
          duration: "2017 - Present",
          description: "Delivered 15+ projects worth $20M+ with 95% on-time completion rate"
        }]
      }
    },
    {
      id: 70,
      title: "Quality Assurance Resume",
      description: "QA-focused template for testing professionals and quality engineers",
      tags: ["Tech", "QA", "Testing", "Quality", "Engineering"],
      category: "Tech",
      preview: "QA template with testing methodology focus",
      designType: "qa-professional",
      colorScheme: "qa-bronze",
      templateData: {
        personalInfo: {
          name: "Andrew Miller",
          email: "andrew.miller@email.com",
          phone: "+1 (555) 012-7890",
          address: "Raleigh, NC"
        },
        summary: "QA engineer with 7+ years ensuring software quality and testing automation",
        skills: ["Test Automation", "Manual Testing", "Selenium", "API Testing", "Performance Testing", "Bug Tracking"],
        experience: [{
          position: "Senior QA Engineer",
          company: "Microsoft",
          duration: "2019 - Present",
          description: "Reduced bug rate by 60% and automated 80% of regression test suite"
        }]
      }
    },
    {
      id: 71,
      title: "Software Engineer with Photo",
      description: "Modern sidebar template with prominent profile photo for tech professionals",
      tags: ["Tech", "Software", "Photo", "Modern", "Professional"],
      category: "Tech",
      preview: "Sidebar template with circular photo and dark theme",
      designType: "photo-sidebar",
      colorScheme: "tech-dark",
      templateData: {
        personalInfo: {
          name: "John Doe",
          email: "john.doe@email.com",
          phone: "+1 2345 6789",
          address: "#1 road, city/state-0011"
        },
        summary: "I am a software engineer with experience in a variety of programming languages and a track record of delivering high-quality code. I am skilled in problem-solving and have a strong background in computer science. I am a strong communicator and enjoy working collaboratively with others.",
        skills: ["SQL Database Management", "Linux/Unix Command line", "Python", "C++", "JAVA"],
        experience: [{
          position: "Senior Software Developer",
          company: "Company - Country",
          duration: "Jan 2022 - Dec 2023",
          description: "Developed and maintained software using Java, Python, and C++. Led cross-functional teams to deliver successful software projects"
        }, {
          position: "Web Developer", 
          company: "Company - Country",
          duration: "Jan 2021 - Dec 2021",
          description: "Developed and maintained various web applications using languages such as HTML, CSS, JavaScript, and PHP"
        }]
      }
    },
    {
      id: 72,
      title: "Marketing Manager Professional",
      description: "Clean professional template for marketing and business professionals",
      tags: ["Others", "Marketing", "Business", "Professional", "Clean"],
      category: "Others",
      preview: "Professional layout with contact sidebar and structured sections",
      designType: "professional-sidebar",
      colorScheme: "marketing-teal",
      templateData: {
        personalInfo: {
          name: "Richard Sanchez",
          email: "hello@reallygreatsite.com",
          phone: "+123-456-7890",
          address: "123 Anywhere St., Any City"
        },
        summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation.",
        skills: ["Project Management", "Public Relations", "Teamwork", "Time Management", "Leadership", "Effective Communication", "Critical Thinking"],
        experience: [{
          position: "Marketing Manager & Specialist",
          company: "Borcelle Studio",  
          duration: "2030 - PRESENT",
          description: "Develop and execute comprehensive marketing strategies and campaigns that align with the company's goals and objectives. Lead, mentor, and manage a high-performing marketing team."
        }, {
          position: "Marketing Manager & Specialist",
          company: "Fauget Studio",
          duration: "2025 - 2029", 
          description: "Create and manage the marketing budget, ensuring efficient allocation of resources and optimal spending. Oversee market research to identify emerging trends."
        }]
      }
    },
    {
      id: 73,
      title: "Student Resume Template",
      description: "Modern template designed for students and recent graduates with strengths focus",
      tags: ["Non-Tech", "Student", "Graduate", "Entry-Level", "Modern"],
      category: "Non-Tech", 
      preview: "Two-column layout with strengths and skills sections",
      designType: "student-modern",
      colorScheme: "student-purple",
      templateData: {
        personalInfo: {
          name: "Henry Jackson",
          email: "help@enhancv.com",
          phone: "linkedin.com",
          address: "Philadelphia, Pennsylvania"
        },
        summary: "High school student with experience as an intern at a major telecommunications company. Proven record of teamwork and problem-solving skills effectively implemented to increase project efficiency. Eager to apply these skills to new challenges. Skilled in Python and Java programming, and a dedicated community volunteer.",
        skills: ["Teamwork", "Time Management", "Problem Solving", "Critical Thinking", "Microsoft Office"],
        experience: [{
          position: "Intern",
          company: "Comcast Corporation",
          duration: "2020 - 2020",
          description: "Contributed to a team developing innovative solutions in telecommunications. Provided assistance to a team of 5 professionals resulting in a 15% increase in project efficiency."
        }]
      }
    },
    {
      id: 74,
      title: "Healthcare Professional Resume",
      description: "Clean medical template for healthcare professionals and doctors",
      tags: ["Medical", "Healthcare", "Doctor", "Nurse", "Clean"],
      category: "Medical",
      preview: "Professional medical layout with blue accents",
      designType: "medical-professional",
      colorScheme: "medical-navy",
      templateData: {
        personalInfo: {
          name: "Dr. Sarah Mitchell",
          email: "s.mitchell@hospital.com",
          phone: "+1 (555) 234-5678",
          address: "Boston, MA"
        },
        summary: "Board-certified physician with 10+ years of experience in internal medicine and patient care. Dedicated to providing exceptional healthcare services and improving patient outcomes.",
        skills: ["Internal Medicine", "Patient Care", "Medical Research", "Clinical Diagnosis", "Healthcare Management", "EMR Systems"],
        experience: [{
          position: "Attending Physician",
          company: "Boston Medical Center",
          duration: "2018 - Present",
          description: "Provide comprehensive medical care to diverse patient population, manage complex cases, mentor medical residents"
        }]
      }
    },
    {
      id: 75,
      title: "Finance Executive Resume",
      description: "Executive template for finance professionals and analysts",
      tags: ["Others", "Finance", "Executive", "Banking", "Professional"],
      category: "Others",
      preview: "Executive layout with gold accents for finance sector",
      designType: "finance-executive",
      colorScheme: "finance-navy",
      templateData: {
        personalInfo: {
          name: "Michael Chen",
          email: "m.chen@finance.com", 
          phone: "+1 (555) 345-6789",
          address: "New York, NY"
        },
        summary: "Senior finance executive with 15+ years of experience in investment banking, financial analysis, and portfolio management. Proven track record of driving revenue growth and optimizing financial performance.",
        skills: ["Financial Analysis", "Investment Banking", "Portfolio Management", "Risk Assessment", "Financial Modeling", "Regulatory Compliance"],
        experience: [{
          position: "Vice President of Finance",
          company: "Goldman Sachs",
          duration: "2019 - Present", 
          description: "Lead financial analysis for major client portfolios worth $500M+. Develop investment strategies and manage high-net-worth client relationships."
        }]
      }
    },
    {
      id: 76,
      title: "Creative Designer Portfolio",
      description: "Artistic template showcasing creative work and design skills",
      tags: ["Others", "Creative", "Design", "Portfolio", "Artistic"],
      category: "Others",
      preview: "Creative layout with visual elements for designers",
      designType: "creative-showcase",
      colorScheme: "creative-gradient",
      templateData: {
        personalInfo: {
          name: "Emma Rodriguez",
          email: "emma.design@email.com",
          phone: "+1 (555) 456-7890", 
          address: "Los Angeles, CA"
        },
        summary: "Creative designer with 8+ years of experience in brand design, UI/UX, and digital marketing. Passionate about creating visually compelling designs that drive engagement and results.",
        skills: ["Adobe Creative Suite", "UI/UX Design", "Brand Design", "Digital Marketing", "Typography", "Illustration"],
        experience: [{
          position: "Senior Creative Designer",
          company: "Design Studio Inc",
          duration: "2020 - Present",
          description: "Lead creative campaigns for major brands, design user interfaces for mobile apps with 1M+ downloads"
        }]
      }
    },
    {
      id: 77,
      title: "Engineering Manager Resume",
      description: "Technical leadership template for engineering managers",
      tags: ["Tech", "Engineering", "Management", "Leadership", "Senior"],
      category: "Tech",
      preview: "Technical leadership layout with project focus",
      designType: "engineering-manager",
      colorScheme: "engineering-green",
      templateData: {
        personalInfo: {
          name: "David Park",
          email: "d.park@tech.com",
          phone: "+1 (555) 567-8901",
          address: "Seattle, WA"
        },
        summary: "Engineering manager with 12+ years of experience leading high-performance teams and delivering complex software solutions. Expert in agile methodologies and technical strategy.",
        skills: ["Team Leadership", "Software Architecture", "Agile/Scrum", "Python", "AWS", "DevOps"],
        experience: [{
          position: "Engineering Manager",
          company: "Microsoft",
          duration: "2019 - Present",
          description: "Lead team of 15 engineers developing cloud services used by millions of users. Improved deployment frequency by 300%"
        }]
      }
    },
    {
      id: 78,
      title: "Legal Professional Resume",
      description: "Conservative professional template for legal practitioners",
      tags: ["Others", "Legal", "Law", "Attorney", "Conservative"],
      category: "Others", 
      preview: "Traditional legal layout with formal styling",
      designType: "legal-traditional",
      colorScheme: "legal-navy",
      templateData: {
        personalInfo: {
          name: "Jessica Thompson",
          email: "j.thompson@lawfirm.com",
          phone: "+1 (555) 678-9012",
          address: "Washington, DC"
        },
        summary: "Experienced attorney specializing in corporate law and litigation with 14+ years of practice. Strong track record in complex legal cases and client representation.",
        skills: ["Corporate Law", "Litigation", "Contract Law", "Legal Research", "Client Relations", "Court Proceedings"],
        experience: [{
          position: "Senior Partner",
          company: "Thompson & Associates",
          duration: "2015 - Present",
          description: "Lead corporate legal matters for Fortune 500 companies, manage team of 8 attorneys, 95% case success rate"
        }]
      }
    },
    {
      id: 79,
      title: "Education Professional Resume", 
      description: "Academic template for teachers and education professionals",
      tags: ["Non-Tech", "Education", "Teacher", "Academic", "Professional"],
      category: "Non-Tech",
      preview: "Educational layout with teaching focus",
      designType: "education-professional", 
      colorScheme: "education-blue",
      templateData: {
        personalInfo: {
          name: "Maria Garcia",
          email: "m.garcia@school.edu",
          phone: "+1 (555) 789-0123",
          address: "Chicago, IL"
        },
        summary: "Dedicated educator with 11+ years of experience in curriculum development and student engagement. Passionate about fostering learning environments that inspire student success.",
        skills: ["Curriculum Development", "Classroom Management", "Student Assessment", "Educational Technology", "Parent Communication", "Special Needs Support"],
        experience: [{
          position: "Senior Teacher",
          company: "Lincoln Elementary School",
          duration: "2018 - Present",
          description: "Teach 4th grade students, develop innovative lesson plans, improved student test scores by 25%"
        }]
      }
    },
    {
      id: 80,
      title: "Business Analyst Resume",
      description: "Professional template for business analysts and consultants",
      tags: ["Others", "Business", "Analyst", "Consulting", "Professional"],
      category: "Others",
      preview: "Business-focused layout with analytical emphasis", 
      designType: "business-analyst",
      colorScheme: "business-teal",
      templateData: {
        personalInfo: {
          name: "Robert Kim",
          email: "r.kim@consulting.com",
          phone: "+1 (555) 890-1234",
          address: "Dallas, TX"
        },
        summary: "Business analyst with 9+ years of experience in process optimization and data analysis. Skilled in identifying business opportunities and implementing strategic solutions.",
        skills: ["Business Analysis", "Data Analytics", "Process Improvement", "Project Management", "SQL", "Tableau"],
        experience: [{
          position: "Senior Business Analyst",
          company: "Deloitte Consulting",
          duration: "2019 - Present",
          description: "Analyze business processes for clients, identify $2M+ in cost savings opportunities, lead digital transformation projects"
        }]
      }
    },
    {
      id: 81,
      title: "Pharmaceutical Scientist Resume",
      description: "Scientific template for pharmaceutical and research professionals",
      tags: ["Medical", "Pharmaceutical", "Research", "Science", "Professional"],
      category: "Medical",
      preview: "Scientific layout with research focus",
      designType: "pharmaceutical-scientist",
      colorScheme: "pharma-blue",
      templateData: {
        personalInfo: {
          name: "Dr. Lisa Wang",
          email: "l.wang@pharma.com",
          phone: "+1 (555) 901-2345", 
          address: "San Diego, CA"
        },
        summary: "Pharmaceutical scientist with 13+ years in drug development and clinical research. Expert in regulatory compliance and new drug applications with 5 successful FDA approvals.",
        skills: ["Drug Development", "Clinical Research", "FDA Regulations", "Data Analysis", "Laboratory Management", "Scientific Writing"],
        experience: [{
          position: "Principal Scientist",
          company: "Johnson & Johnson",
          duration: "2017 - Present",
          description: "Lead drug development programs from preclinical to Phase III trials, manage $50M+ research budget"
        }]
      }
    },
    {
      id: 82,
      title: "Architecture Professional Resume",
      description: "Design-focused template for architects and urban planners",
      tags: ["Others", "Architecture", "Design", "Construction", "Creative"],
      category: "Others",
      preview: "Architectural layout with design elements",
      designType: "architecture-design",
      colorScheme: "architecture-grey",
      templateData: {
        personalInfo: {
          name: "Carlos Martinez",
          email: "c.martinez@architect.com",
          phone: "+1 (555) 012-3456",
          address: "Miami, FL"
        },
        summary: "Licensed architect with 16+ years of experience in commercial and residential design. Specialized in sustainable architecture and LEED-certified projects.",
        skills: ["Architectural Design", "AutoCAD", "Revit", "Sustainable Design", "Project Management", "3D Modeling"],
        experience: [{
          position: "Principal Architect",
          company: "Martinez Architecture Firm",
          duration: "2015 - Present",
          description: "Design award-winning sustainable buildings, manage projects worth $100M+, 15 LEED-certified projects completed"
        }]
      }
    },
    {
      id: 83,
      title: "Cybersecurity Specialist Resume",
      description: "Security-focused template for cybersecurity professionals",
      tags: ["Tech", "Security", "Cybersecurity", "IT", "Professional"],
      category: "Tech",
      preview: "Security-themed layout with tech focus",
      designType: "cybersecurity-pro",
      colorScheme: "security-red",
      templateData: {
        personalInfo: {
          name: "Alex Johnson",
          email: "a.johnson@security.com",
          phone: "+1 (555) 123-4567",
          address: "Austin, TX"
        },
        summary: "Cybersecurity specialist with 10+ years of experience in threat analysis and security architecture. Certified in multiple security frameworks with expertise in incident response.",
        skills: ["Penetration Testing", "Security Architecture", "Incident Response", "CISSP", "Ethical Hacking", "Risk Assessment"],
        experience: [{
          position: "Senior Security Analyst",
          company: "CyberDefense Inc",
          duration: "2019 - Present",
          description: "Lead security assessments for enterprise clients, reduced security incidents by 60%, manage SOC team of 12"
        }]
      }
    },
    {
      id: 84,
      title: "Hospitality Manager Resume",
      description: "Service-oriented template for hospitality and tourism professionals",
      tags: ["Others", "Hospitality", "Management", "Service", "Tourism"],
      category: "Others",
      preview: "Hospitality layout with service focus",
      designType: "hospitality-manager",
      colorScheme: "hospitality-warm",
      templateData: {
        personalInfo: {
          name: "Isabella Rodriguez",
          email: "i.rodriguez@hotel.com",
          phone: "+1 (555) 234-5678",
          address: "Las Vegas, NV"
        },
        summary: "Hospitality manager with 12+ years of experience in luxury hotel operations and guest services. Expert in revenue optimization and team leadership.",
        skills: ["Hotel Operations", "Guest Relations", "Revenue Management", "Team Leadership", "Event Planning", "Customer Service"],
        experience: [{
          position: "General Manager",
          company: "Luxury Resort & Spa",
          duration: "2018 - Present",
          description: "Manage 200-room luxury resort, increased guest satisfaction scores to 95%, oversee staff of 150+"
        }]
      }
    },
    {
      id: 85,
      title: "Environmental Scientist Resume",
      description: "Environmental template for sustainability and conservation professionals",
      tags: ["Others", "Environmental", "Science", "Sustainability", "Research"],
      category: "Others",
      preview: "Environmental layout with green theme",
      designType: "environmental-scientist",
      colorScheme: "environmental-green",
      templateData: {
        personalInfo: {
          name: "Dr. James Wilson",
          email: "j.wilson@environmental.org",
          phone: "+1 (555) 345-6789",
          address: "Portland, OR"
        },
        summary: "Environmental scientist with 14+ years of experience in climate research and sustainability consulting. Published researcher with expertise in environmental impact assessment.",
        skills: ["Environmental Assessment", "Climate Research", "Sustainability Consulting", "GIS", "Data Analysis", "Policy Development"],
        experience: [{
          position: "Senior Environmental Scientist",
          company: "EPA Regional Office",
          duration: "2016 - Present",
          description: "Lead environmental impact studies for major infrastructure projects, published 25+ peer-reviewed papers"
        }]
      }
    }
];

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('relevance');
  const [previewModal, setPreviewModal] = useState({ isOpen: false, template: null });

  // Add global styles to fix viewport issues
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.width = '100%';
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.width = '100%';
    
    return () => {
      // Cleanup styles when component unmounts
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.body.style.width = '';
      document.body.style.overflowX = '';
      document.documentElement.style.width = '';
    };
  }, []);

  const handleSearch = useCallback((e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      let filtered = allTemplates;
      
      // Filter by category
      if (selectedCategory !== 'All') {
        filtered = filtered.filter(template => template.category === selectedCategory);
      }
      
      // Filter by search query
      if (searchQuery.trim()) {
        filtered = filtered.filter(template => 
          template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }
      
      // Sort results
      if (sortBy === 'newest') {
        filtered = [...filtered].reverse();
      } else if (sortBy === 'popular') {
        filtered = [...filtered].sort((a, b) => b.id - a.id);
      }
      
      setSearchResults(filtered);
      setIsLoading(false);
    }, 800);
  }, [selectedCategory, sortBy, searchQuery]);

  // Load initial templates
  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  // Generate different preview layouts based on design type
  const generatePreviewLayout = (template) => {
    const { designType = 'standard', colorScheme = 'purple' } = template;
    
    // Color schemes
    const colors = {
      'blue': { primary: '#2563eb', secondary: '#dbeafe', accent: '#1d4ed8' },
      'minimal': { primary: '#374151', secondary: '#f9fafb', accent: '#6b7280' },
      'purple': { primary: '#7c3aed', secondary: '#f0f4ff', accent: '#a855f7' },
      'green': { primary: '#059669', secondary: '#d1fae5', accent: '#047857' },
      'teal': { primary: '#0d9488', secondary: '#ccfbf1', accent: '#0f766e' },
      'gradient-blue': { primary: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', secondary: '#dbeafe', accent: '#2563eb' },
      'navy': { primary: '#1e3a8a', secondary: '#ede9fe', accent: '#3730a3' },
      'orange': { primary: '#ea580c', secondary: '#fed7aa', accent: '#dc2626' },
      'warm': { primary: '#dc2626', secondary: '#fecaca', accent: '#b91c1c' },
      'multi-color': { primary: '#7c3aed', secondary: '#f0f4ff', accent: '#059669' },
      'classic-blue': { primary: '#1e40af', secondary: '#dbeafe', accent: '#3b82f6' },
      'forest-green': { primary: '#166534', secondary: '#dcfce7', accent: '#22c55e' },
      'charcoal': { primary: '#374151', secondary: '#f3f4f6', accent: '#6b7280' },
      'burgundy': { primary: '#991b1b', secondary: '#fee2e2', accent: '#dc2626' },
      'deep-blue': { primary: '#1e3a8a', secondary: '#dbeafe', accent: '#3b82f6' },
      'gold': { primary: '#d97706', secondary: '#fef3c7', accent: '#f59e0b' },
      'earth-tones': { primary: '#92400e', secondary: '#fef3c7', accent: '#d97706' },
      'steel-blue': { primary: '#475569', secondary: '#f1f5f9', accent: '#64748b' },
      'american-blue': { primary: '#1e40af', secondary: '#eff6ff', accent: '#3b82f6' },
      'earth-green': { primary: '#365314', secondary: '#f7fee7', accent: '#65a30d' },
      'vibrant': { primary: '#ec4899', secondary: '#fce7f3', accent: '#db2777' },
      'neon': { primary: '#10b981', secondary: '#d1fae5', accent: '#059669' },
      'hollywood': { primary: '#b91c1c', secondary: '#fee2e2', accent: '#dc2626' },
      'artist-palette': { primary: '#7c2d12', secondary: '#fed7aa', accent: '#ea580c' },
      'social-media': { primary: '#c2410c', secondary: '#fed7aa', accent: '#ea580c' },
      'music-notes': { primary: '#581c87', secondary: '#f3e8ff', accent: '#8b5cf6' },
      'photo-tones': { primary: '#374151', secondary: '#f9fafb', accent: '#6b7280' },
      'freedom': { primary: '#059669', secondary: '#d1fae5', accent: '#10b981' },
      'gaming': { primary: '#7c3aed', secondary: '#f3e8ff', accent: '#a855f7' },
      'blueprint': { primary: '#0369a1', secondary: '#e0f2fe', accent: '#0284c7' },
      'executive-navy': { primary: '#1e3a8a', secondary: '#f0f4ff', accent: '#3730a3' },
      'academic-burgundy': { primary: '#7f1d1d', secondary: '#fee2e2', accent: '#991b1b' },
      'legal-charcoal': { primary: '#374151', secondary: '#f9fafb', accent: '#4b5563' },
      'photo-slate': { primary: '#475569', secondary: '#f8fafc', accent: '#64748b' },
      'finance-gold': { primary: '#b45309', secondary: '#fef3c7', accent: '#d97706' },
      'split-teal': { primary: '#0f766e', secondary: '#ccfbf1', accent: '#14b8a6' },
      'grid-mint': { primary: '#065f46', secondary: '#d1fae5', accent: '#10b981' },
      'medical-blue': { primary: '#1e40af', secondary: '#dbeafe', accent: '#3b82f6' },
      'startup-orange': { primary: '#ea580c', secondary: '#fed7aa', accent: '#f97316' },
      'consulting-steel': { primary: '#475569', secondary: '#f1f5f9', accent: '#64748b' },
      'lead-purple': { primary: '#7c3aed', secondary: '#f3e8ff', accent: '#8b5cf6' },
      'sales-red': { primary: '#dc2626', secondary: '#fee2e2', accent: '#ef4444' },
      'product-indigo': { primary: '#4338ca', secondary: '#eef2ff', accent: '#6366f1' },
      'creative-rainbow': { primary: '#ec4899', secondary: '#fce7f3', accent: '#f59e0b' },
      'data-cyan': { primary: '#0891b2', secondary: '#cffafe', accent: '#06b6d4' },
      'operations-forest': { primary: '#166534', secondary: '#dcfce7', accent: '#22c55e' },
      'hr-coral': { primary: '#dc2626', secondary: '#fef2f2', accent: '#f87171' },
      'marketing-magenta': { primary: '#be185d', secondary: '#fce7f3', accent: '#ec4899' },
      'pm-olive': { primary: '#365314', secondary: '#f7fee7', accent: '#84cc16' },
      'qa-bronze': { primary: '#92400e', secondary: '#fef3c7', accent: '#d97706' },
      'tech-dark': { primary: '#1f2937', secondary: '#f9fafb', accent: '#3b82f6' },
      'marketing-teal': { primary: '#0f766e', secondary: '#f0fdfa', accent: '#14b8a6' },
      'student-purple': { primary: '#7c3aed', secondary: '#f5f3ff', accent: '#a855f7' },
      'medical-navy': { primary: '#1e3a8a', secondary: '#eff6ff', accent: '#3b82f6' },
      'finance-navy': { primary: '#1e40af', secondary: '#dbeafe', accent: '#2563eb' },
      'creative-gradient': { primary: '#ec4899', secondary: '#fdf2f8', accent: '#f59e0b' },
      'engineering-green': { primary: '#166534', secondary: '#f0fdf4', accent: '#22c55e' },
      'legal-navy': { primary: '#1e3a8a', secondary: '#f8fafc', accent: '#475569' },
      'education-blue': { primary: '#2563eb', secondary: '#eff6ff', accent: '#1d4ed8' },
      'business-teal': { primary: '#0d9488', secondary: '#f0fdfa', accent: '#14b8a6' },
      'pharma-blue': { primary: '#1e40af', secondary: '#dbeafe', accent: '#3b82f6' },
      'architecture-grey': { primary: '#374151', secondary: '#f9fafb', accent: '#6b7280' },
      'security-red': { primary: '#dc2626', secondary: '#fef2f2', accent: '#ef4444' },
      'hospitality-warm': { primary: '#ea580c', secondary: '#fff7ed', accent: '#f97316' },
      'environmental-green': { primary: '#059669', secondary: '#ecfdf5', accent: '#10b981' }
    };
    
    const currentColors = colors[colorScheme] || colors['purple'];
    
    switch (designType) {
      case 'sidebar':
        return (
          <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ width: '35%', backgroundColor: currentColors.primary, padding: '20px', color: 'white' }}>
              <div style={{ width: '60px', height: '60px', backgroundColor: 'white', borderRadius: '50%', marginBottom: '15px' }}></div>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.9)', height: '12px', borderRadius: '2px', marginBottom: '8px' }}></div>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.7)', height: '8px', borderRadius: '2px', marginBottom: '15px', width: '80%' }}></div>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.5)', height: '6px', borderRadius: '2px', marginBottom: '3px' }}></div>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.5)', height: '6px', borderRadius: '2px', width: '70%' }}></div>
            </div>
            <div style={{ flex: 1, padding: '20px' }}>
              <div style={{ height: '10px', backgroundColor: currentColors.accent, borderRadius: '2px', marginBottom: '10px', width: '60%' }}></div>
              <div style={{ height: '6px', backgroundColor: '#e5e7eb', borderRadius: '2px', marginBottom: '3px' }}></div>
              <div style={{ height: '6px', backgroundColor: '#e5e7eb', borderRadius: '2px', marginBottom: '15px', width: '80%' }}></div>
            </div>
          </div>
        );
      case 'two-column':
        return (
          <div style={{ display: 'flex', gap: '20px', height: '100%' }}>
            <div style={{ flex: 1 }}>
              <div style={{ height: '12px', backgroundColor: currentColors.primary, borderRadius: '2px', marginBottom: '8px' }}></div>
              <div style={{ height: '6px', backgroundColor: '#e5e7eb', borderRadius: '2px', marginBottom: '3px' }}></div>
              <div style={{ height: '6px', backgroundColor: '#e5e7eb', borderRadius: '2px', marginBottom: '15px', width: '80%' }}></div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ height: '10px', backgroundColor: currentColors.accent, borderRadius: '2px', marginBottom: '8px' }}></div>
              <div style={{ height: '6px', backgroundColor: '#f1f5f9', borderRadius: '2px', marginBottom: '3px' }}></div>
              <div style={{ height: '6px', backgroundColor: '#f1f5f9', borderRadius: '2px', width: '70%' }}></div>
            </div>
          </div>
        );
      case 'creative-header':
        return (
          <div>
            <div style={{ 
              height: '40px', 
              background: typeof currentColors.primary === 'string' && currentColors.primary.includes('gradient') 
                ? currentColors.primary 
                : `linear-gradient(45deg, ${currentColors.primary}, ${currentColors.accent})`,
              borderRadius: '8px 8px 0 0',
              marginBottom: '15px',
              position: 'relative'
            }}>
              <div style={{ position: 'absolute', top: '10px', left: '15px', width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%', opacity: 0.9 }}></div>
            </div>
            <div style={{ padding: '0 15px' }}>
              <div style={{ height: '8px', backgroundColor: currentColors.primary, borderRadius: '2px', marginBottom: '8px', width: '70%' }}></div>
              <div style={{ height: '6px', backgroundColor: '#e5e7eb', borderRadius: '2px', marginBottom: '3px' }}></div>
              <div style={{ height: '6px', backgroundColor: '#e5e7eb', borderRadius: '2px', width: '85%' }}></div>
            </div>
          </div>
        );
      case 'cards':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={{ backgroundColor: currentColors.secondary, padding: '10px', borderRadius: '6px' }}>
              <div style={{ height: '6px', backgroundColor: currentColors.primary, borderRadius: '2px', marginBottom: '5px' }}></div>
              <div style={{ height: '4px', backgroundColor: '#e5e7eb', borderRadius: '2px' }}></div>
            </div>
            <div style={{ backgroundColor: currentColors.secondary, padding: '10px', borderRadius: '6px' }}>
              <div style={{ height: '6px', backgroundColor: currentColors.accent, borderRadius: '2px', marginBottom: '5px' }}></div>
              <div style={{ height: '4px', backgroundColor: '#e5e7eb', borderRadius: '2px' }}></div>
            </div>
            <div style={{ backgroundColor: currentColors.secondary, padding: '10px', borderRadius: '6px', gridColumn: 'span 2' }}>
              <div style={{ height: '6px', backgroundColor: currentColors.primary, borderRadius: '2px', marginBottom: '5px', width: '60%' }}></div>
              <div style={{ height: '4px', backgroundColor: '#e5e7eb', borderRadius: '2px', marginBottom: '2px' }}></div>
              <div style={{ height: '4px', backgroundColor: '#e5e7eb', borderRadius: '2px', width: '80%' }}></div>
            </div>
          </div>
        );
      case 'timeline':
        return (
          <div style={{ position: 'relative', paddingLeft: '20px' }}>
            <div style={{ position: 'absolute', left: '8px', top: '0', bottom: '0', width: '2px', backgroundColor: currentColors.primary }}></div>
            <div style={{ position: 'relative', marginBottom: '15px' }}>
              <div style={{ position: 'absolute', left: '-13px', top: '2px', width: '8px', height: '8px', backgroundColor: currentColors.primary, borderRadius: '50%' }}></div>
              <div style={{ height: '8px', backgroundColor: currentColors.primary, borderRadius: '2px', marginBottom: '5px', width: '60%' }}></div>
              <div style={{ height: '5px', backgroundColor: '#e5e7eb', borderRadius: '2px', width: '80%' }}></div>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-13px', top: '2px', width: '8px', height: '8px', backgroundColor: currentColors.accent, borderRadius: '50%' }}></div>
              <div style={{ height: '8px', backgroundColor: currentColors.accent, borderRadius: '2px', marginBottom: '5px', width: '70%' }}></div>
              <div style={{ height: '5px', backgroundColor: '#e5e7eb', borderRadius: '2px', width: '90%' }}></div>
            </div>
          </div>
        );
      case 'contact-sidebar':
        return (
          <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ width: '30%', backgroundColor: currentColors.primary, padding: '15px', color: 'white' }}>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.9)', height: '10px', borderRadius: '2px', marginBottom: '6px' }}></div>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.7)', height: '6px', borderRadius: '2px', marginBottom: '3px' }}></div>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.7)', height: '6px', borderRadius: '2px', marginBottom: '10px', width: '80%' }}></div>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.5)', height: '4px', borderRadius: '2px', marginBottom: '2px' }}></div>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.5)', height: '4px', borderRadius: '2px', marginBottom: '2px', width: '70%' }}></div>
            </div>
            <div style={{ flex: 1, padding: '15px' }}>
              <div style={{ height: '12px', backgroundColor: currentColors.primary, borderRadius: '2px', marginBottom: '8px', width: '70%' }}></div>
              <div style={{ height: '6px', backgroundColor: '#e5e7eb', borderRadius: '2px', marginBottom: '3px' }}></div>
              <div style={{ height: '6px', backgroundColor: '#e5e7eb', borderRadius: '2px', marginBottom: '10px', width: '85%' }}></div>
              <div style={{ height: '8px', backgroundColor: currentColors.accent, borderRadius: '2px', marginBottom: '5px', width: '60%' }}></div>
            </div>
          </div>
        );
      case 'academic-formal':
        return (
          <div style={{ padding: '15px' }}>
            <div style={{ borderBottom: `2px solid ${currentColors.primary}`, paddingBottom: '10px', marginBottom: '15px' }}>
              <div style={{ height: '14px', backgroundColor: currentColors.primary, borderRadius: '2px', marginBottom: '5px', width: '70%' }}></div>
              <div style={{ height: '6px', backgroundColor: '#e5e7eb', borderRadius: '2px', width: '50%' }}></div>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <div style={{ height: '8px', backgroundColor: currentColors.accent, borderRadius: '2px', marginBottom: '5px', width: '40%' }}></div>
              <div style={{ height: '5px', backgroundColor: '#f1f5f9', borderRadius: '2px', marginBottom: '2px' }}></div>
              <div style={{ height: '5px', backgroundColor: '#f1f5f9', borderRadius: '2px', width: '90%' }}></div>
            </div>
            <div style={{ height: '8px', backgroundColor: currentColors.accent, borderRadius: '2px', marginBottom: '5px', width: '50%' }}></div>
            <div style={{ height: '5px', backgroundColor: '#f1f5f9', borderRadius: '2px', width: '80%' }}></div>
          </div>
        );
      case 'legal-professional':
        return (
          <div style={{ padding: '20px', backgroundColor: '#fefefe' }}>
            <div style={{ textAlign: 'center', borderBottom: `1px solid ${currentColors.primary}`, paddingBottom: '12px', marginBottom: '15px' }}>
              <div style={{ height: '12px', backgroundColor: currentColors.primary, borderRadius: '2px', marginBottom: '6px', width: '60%', margin: '0 auto 6px auto' }}></div>
              <div style={{ height: '6px', backgroundColor: '#e5e7eb', borderRadius: '2px', width: '40%', margin: '0 auto' }}></div>
            </div>
            <div style={{ height: '8px', backgroundColor: currentColors.accent, borderRadius: '2px', marginBottom: '8px', width: '50%' }}></div>
            <div style={{ height: '5px', backgroundColor: '#f1f5f9', borderRadius: '2px', marginBottom: '2px' }}></div>
            <div style={{ height: '5px', backgroundColor: '#f1f5f9', borderRadius: '2px', marginBottom: '2px', width: '85%' }}></div>
            <div style={{ height: '5px', backgroundColor: '#f1f5f9', borderRadius: '2px', width: '75%' }}></div>
          </div>
        );
      case 'photo-header':
        return (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', padding: '15px', backgroundColor: currentColors.secondary, marginBottom: '12px' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: currentColors.primary, borderRadius: '50%', marginRight: '12px' }}></div>
              <div style={{ flex: 1 }}>
                <div style={{ height: '10px', backgroundColor: currentColors.primary, borderRadius: '2px', marginBottom: '4px', width: '60%' }}></div>
                <div style={{ height: '6px', backgroundColor: '#e5e7eb', borderRadius: '2px', width: '40%' }}></div>
              </div>
            </div>
            <div style={{ padding: '0 15px' }}>
              <div style={{ height: '8px', backgroundColor: currentColors.accent, borderRadius: '2px', marginBottom: '8px', width: '50%' }}></div>
              <div style={{ height: '5px', backgroundColor: '#f1f5f9', borderRadius: '2px', marginBottom: '2px' }}></div>
              <div style={{ height: '5px', backgroundColor: '#f1f5f9', borderRadius: '2px', width: '80%' }}></div>
            </div>
          </div>
        );
      case 'executive-finance':
        return (
          <div style={{ padding: '15px', border: `2px solid ${currentColors.primary}` }}>
            <div style={{ textAlign: 'center', marginBottom: '15px' }}>
              <div style={{ height: '12px', backgroundColor: currentColors.primary, borderRadius: '2px', marginBottom: '6px', width: '70%', margin: '0 auto 6px auto' }}></div>
              <div style={{ height: '6px', backgroundColor: currentColors.accent, borderRadius: '2px', width: '50%', margin: '0 auto' }}></div>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <div style={{ flex: 1, height: '6px', backgroundColor: currentColors.secondary, borderRadius: '2px' }}></div>
              <div style={{ flex: 1, height: '6px', backgroundColor: currentColors.secondary, borderRadius: '2px' }}></div>
            </div>
            <div style={{ height: '8px', backgroundColor: currentColors.accent, borderRadius: '2px', marginBottom: '5px', width: '60%' }}></div>
            <div style={{ height: '5px', backgroundColor: '#f1f5f9', borderRadius: '2px', width: '85%' }}></div>
          </div>
        );
      case 'split-screen':
        return (
          <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ width: '50%', backgroundColor: currentColors.primary, padding: '15px', color: 'white' }}>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.9)', height: '10px', borderRadius: '2px', marginBottom: '8px', width: '80%' }}></div>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.7)', height: '6px', borderRadius: '2px', marginBottom: '3px' }}></div>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.7)', height: '6px', borderRadius: '2px', width: '70%' }}></div>
            </div>
            <div style={{ width: '50%', padding: '15px', backgroundColor: currentColors.secondary }}>
              <div style={{ height: '8px', backgroundColor: currentColors.accent, borderRadius: '2px', marginBottom: '8px', width: '70%' }}></div>
              <div style={{ height: '5px', backgroundColor: '#e5e7eb', borderRadius: '2px', marginBottom: '2px' }}></div>
              <div style={{ height: '5px', backgroundColor: '#e5e7eb', borderRadius: '2px', width: '85%' }}></div>
            </div>
          </div>
        );
      case 'minimalist-grid':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', padding: '10px' }}>
            <div style={{ gridColumn: 'span 2' }}>
              <div style={{ height: '10px', backgroundColor: currentColors.primary, borderRadius: '2px', marginBottom: '6px', width: '60%' }}></div>
              <div style={{ height: '6px', backgroundColor: '#e5e7eb', borderRadius: '2px', width: '40%' }}></div>
            </div>
            <div>
              <div style={{ height: '8px', backgroundColor: currentColors.accent, borderRadius: '2px', marginBottom: '5px' }}></div>
              <div style={{ height: '5px', backgroundColor: '#f1f5f9', borderRadius: '2px', marginBottom: '2px' }}></div>
              <div style={{ height: '5px', backgroundColor: '#f1f5f9', borderRadius: '2px', width: '80%' }}></div>
            </div>
            <div>
              <div style={{ height: '8px', backgroundColor: currentColors.accent, borderRadius: '2px', marginBottom: '5px' }}></div>
              <div style={{ height: '5px', backgroundColor: '#f1f5f9', borderRadius: '2px', marginBottom: '2px' }}></div>
              <div style={{ height: '5px', backgroundColor: '#f1f5f9', borderRadius: '2px', width: '75%' }}></div>
            </div>
          </div>
        );
      case 'healthcare-pro':
      case 'startup-dynamic':
      case 'consulting-strategic':
      case 'tech-lead':
      case 'sales-executive':
      case 'product-manager':
      case 'creative-portfolio':
      case 'data-scientist':
      case 'operations-manager':
      case 'hr-professional':
      case 'marketing-professional':
      case 'project-manager':
      case 'qa-professional':
      case 'photo-sidebar':
      case 'professional-sidebar':
      case 'student-modern':
      case 'medical-professional':
      case 'finance-executive':
      case 'creative-showcase':
      case 'engineering-manager':
      case 'legal-traditional':
      case 'education-professional':
      case 'business-analyst':
      case 'pharmaceutical-scientist':
      case 'architecture-design':
      case 'cybersecurity-pro':
      case 'hospitality-manager':
      case 'environmental-scientist':
        return (
          <div style={{ padding: '15px' }}>
            <div style={{ 
              height: '12px', 
              backgroundColor: currentColors.primary, 
              borderRadius: '2px', 
              marginBottom: '8px',
              width: '65%'
            }}></div>
            <div style={{ 
              height: '6px', 
              backgroundColor: currentColors.accent, 
              borderRadius: '2px', 
              marginBottom: '6px',
              width: '45%'
            }}></div>
            <div style={{ 
              height: '5px', 
              backgroundColor: '#e5e7eb', 
              borderRadius: '2px', 
              marginBottom: '2px' 
            }}></div>
            <div style={{ 
              height: '5px', 
              backgroundColor: '#e5e7eb', 
              borderRadius: '2px', 
              marginBottom: '10px',
              width: '85%' 
            }}></div>
            <div style={{ 
              height: '8px', 
              backgroundColor: currentColors.accent, 
              borderRadius: '2px', 
              marginBottom: '5px',
              width: '55%'
            }}></div>
            <div style={{ 
              height: '5px', 
              backgroundColor: '#f1f5f9', 
              borderRadius: '2px', 
              marginBottom: '2px' 
            }}></div>
            <div style={{ 
              height: '5px', 
              backgroundColor: '#f1f5f9', 
              borderRadius: '2px',
              width: '90%' 
            }}></div>
          </div>
        );
      default:
        return (
          <div>
            <div style={{ height: '12px', backgroundColor: currentColors.primary, borderRadius: '2px', marginBottom: '8px' }}></div>
            <div style={{ height: '8px', backgroundColor: '#e5e7eb', borderRadius: '2px', marginBottom: '4px', width: '60%' }}></div>
            <div style={{ height: '8px', backgroundColor: '#e5e7eb', borderRadius: '2px', marginBottom: '12px', width: '40%' }}></div>
            <div style={{ height: '6px', backgroundColor: '#f1f5f9', borderRadius: '2px', marginBottom: '3px' }}></div>
            <div style={{ height: '6px', backgroundColor: '#f1f5f9', borderRadius: '2px', marginBottom: '3px', width: '80%' }}></div>
            <div style={{ height: '6px', backgroundColor: '#f1f5f9', borderRadius: '2px', width: '90%' }}></div>
          </div>
        );
    }
  };

  // Preview Modal Component
  const PreviewModal = ({ template, onClose }) => {
    if (!template) return null;

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.8)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '32px',
          maxWidth: '800px',
          maxHeight: '90vh',
          width: '100%',
          overflow: 'auto',
          position: 'relative'
        }}>
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              backgroundColor: '#f3f4f6',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#6b7280'
            }}
          >
            ×
          </button>

          {/* Template Preview */}
          <div style={{
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            padding: '40px',
            marginBottom: '24px',
            minHeight: '600px'
          }}>
            {/* Dynamic Resume Template Design Preview */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '40px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              maxWidth: '600px',
              margin: '0 auto',
              minHeight: '500px'
            }}>
              {(() => {
                const { designType = 'standard', colorScheme = 'purple' } = template;
                const colors = {
                  'blue': { primary: '#2563eb', secondary: '#dbeafe', accent: '#1d4ed8' },
                  'minimal': { primary: '#374151', secondary: '#f9fafb', accent: '#6b7280' },
                  'purple': { primary: '#7c3aed', secondary: '#f0f4ff', accent: '#a855f7' },
                  'green': { primary: '#059669', secondary: '#d1fae5', accent: '#047857' },
                  'teal': { primary: '#0d9488', secondary: '#ccfbf1', accent: '#0f766e' },
                  'gradient-blue': { primary: '#3b82f6', secondary: '#dbeafe', accent: '#1d4ed8' },
                  'navy': { primary: '#1e3a8a', secondary: '#ede9fe', accent: '#3730a3' },
                  'orange': { primary: '#ea580c', secondary: '#fed7aa', accent: '#dc2626' },
                  'warm': { primary: '#dc2626', secondary: '#fecaca', accent: '#b91c1c' },
                  'multi-color': { primary: '#7c3aed', secondary: '#f0f4ff', accent: '#059669' },
                  'vibrant': { primary: '#ec4899', secondary: '#fce7f3', accent: '#db2777' },
                  'neon': { primary: '#10b981', secondary: '#d1fae5', accent: '#059669' },
                  'classic-blue': { primary: '#1e40af', secondary: '#dbeafe', accent: '#3b82f6' },
                  'forest-green': { primary: '#166534', secondary: '#dcfce7', accent: '#22c55e' },
                  'charcoal': { primary: '#374151', secondary: '#f3f4f6', accent: '#6b7280' },
                  'burgundy': { primary: '#991b1b', secondary: '#fee2e2', accent: '#dc2626' },
                  'deep-blue': { primary: '#1e3a8a', secondary: '#dbeafe', accent: '#3b82f6' },
                  'gold': { primary: '#d97706', secondary: '#fef3c7', accent: '#f59e0b' },
                  'earth-tones': { primary: '#92400e', secondary: '#fef3c7', accent: '#d97706' },
                  'steel-blue': { primary: '#475569', secondary: '#f1f5f9', accent: '#64748b' },
                  'american-blue': { primary: '#1e40af', secondary: '#eff6ff', accent: '#3b82f6' },
                  'earth-green': { primary: '#365314', secondary: '#f7fee7', accent: '#65a30d' },
                  'hollywood': { primary: '#b91c1c', secondary: '#fee2e2', accent: '#dc2626' },
                  'artist-palette': { primary: '#7c2d12', secondary: '#fed7aa', accent: '#ea580c' },
                  'social-media': { primary: '#c2410c', secondary: '#fed7aa', accent: '#ea580c' },
                  'music-notes': { primary: '#581c87', secondary: '#f3e8ff', accent: '#8b5cf6' },
                  'photo-tones': { primary: '#374151', secondary: '#f9fafb', accent: '#6b7280' },
                  'freedom': { primary: '#059669', secondary: '#d1fae5', accent: '#10b981' },
                  'gaming': { primary: '#7c3aed', secondary: '#f3e8ff', accent: '#a855f7' },
                  'blueprint': { primary: '#0369a1', secondary: '#e0f2fe', accent: '#0284c7' },
                  'executive-navy': { primary: '#1e3a8a', secondary: '#f0f4ff', accent: '#3730a3' },
                  'academic-burgundy': { primary: '#7f1d1d', secondary: '#fee2e2', accent: '#991b1b' },
                  'legal-charcoal': { primary: '#374151', secondary: '#f9fafb', accent: '#4b5563' },
                  'photo-slate': { primary: '#475569', secondary: '#f8fafc', accent: '#64748b' },
                  'finance-gold': { primary: '#b45309', secondary: '#fef3c7', accent: '#d97706' },
                  'split-teal': { primary: '#0f766e', secondary: '#ccfbf1', accent: '#14b8a6' },
                  'grid-mint': { primary: '#065f46', secondary: '#d1fae5', accent: '#10b981' },
                  'medical-blue': { primary: '#1e40af', secondary: '#dbeafe', accent: '#3b82f6' },
                  'startup-orange': { primary: '#ea580c', secondary: '#fed7aa', accent: '#f97316' },
                  'consulting-steel': { primary: '#475569', secondary: '#f1f5f9', accent: '#64748b' },
                  'lead-purple': { primary: '#7c3aed', secondary: '#f3e8ff', accent: '#8b5cf6' },
                  'sales-red': { primary: '#dc2626', secondary: '#fee2e2', accent: '#ef4444' },
                  'product-indigo': { primary: '#4338ca', secondary: '#eef2ff', accent: '#6366f1' },
                  'creative-rainbow': { primary: '#ec4899', secondary: '#fce7f3', accent: '#f59e0b' },
                  'data-cyan': { primary: '#0891b2', secondary: '#cffafe', accent: '#06b6d4' },
                  'operations-forest': { primary: '#166534', secondary: '#dcfce7', accent: '#22c55e' },
                  'hr-coral': { primary: '#dc2626', secondary: '#fef2f2', accent: '#f87171' },
                  'marketing-magenta': { primary: '#be185d', secondary: '#fce7f3', accent: '#ec4899' },
                  'pm-olive': { primary: '#365314', secondary: '#f7fee7', accent: '#84cc16' },
                  'qa-bronze': { primary: '#92400e', secondary: '#fef3c7', accent: '#d97706' },
                  'tech-dark': { primary: '#1f2937', secondary: '#f9fafb', accent: '#3b82f6' },
                  'marketing-teal': { primary: '#0f766e', secondary: '#f0fdfa', accent: '#14b8a6' },
                  'student-purple': { primary: '#7c3aed', secondary: '#f5f3ff', accent: '#a855f7' },
                  'medical-navy': { primary: '#1e3a8a', secondary: '#eff6ff', accent: '#3b82f6' },
                  'finance-navy': { primary: '#1e40af', secondary: '#dbeafe', accent: '#2563eb' },
                  'creative-gradient': { primary: '#ec4899', secondary: '#fdf2f8', accent: '#f59e0b' },
                  'engineering-green': { primary: '#166534', secondary: '#f0fdf4', accent: '#22c55e' },
                  'legal-navy': { primary: '#1e3a8a', secondary: '#f8fafc', accent: '#475569' },
                  'education-blue': { primary: '#2563eb', secondary: '#eff6ff', accent: '#1d4ed8' },
                  'business-teal': { primary: '#0d9488', secondary: '#f0fdfa', accent: '#14b8a6' },
                  'pharma-blue': { primary: '#1e40af', secondary: '#dbeafe', accent: '#3b82f6' },
                  'architecture-grey': { primary: '#374151', secondary: '#f9fafb', accent: '#6b7280' },
                  'security-red': { primary: '#dc2626', secondary: '#fef2f2', accent: '#ef4444' },
                  'hospitality-warm': { primary: '#ea580c', secondary: '#fff7ed', accent: '#f97316' },
                  'environmental-green': { primary: '#059669', secondary: '#ecfdf5', accent: '#10b981' }
                };
                const currentColors = colors[colorScheme] || colors['purple'];
                
                // Create full template preview based on design type
                if (designType === 'sidebar') {
                  return (
                    <div style={{ display: 'flex', height: '450px' }}>
                      <div style={{ 
                        width: '200px', 
                        backgroundColor: currentColors.primary, 
                        padding: '30px 20px', 
                        color: 'white',
                        borderRadius: '8px 0 0 8px'
                      }}>
                        <div style={{ 
                          width: '80px', 
                          height: '80px', 
                          backgroundColor: 'white', 
                          borderRadius: '50%', 
                          marginBottom: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: currentColors.primary,
                          fontWeight: 'bold'
                        }}>
                          PHOTO
                        </div>
                        <h1 style={{ fontSize: '18px', marginBottom: '8px', fontWeight: 'bold' }}>
                          {template.templateData.personalInfo.name}
                        </h1>
                        <div style={{ fontSize: '12px', marginBottom: '20px', opacity: 0.9 }}>
                          <div>{template.templateData.personalInfo.email}</div>
                          <div>{template.templateData.personalInfo.phone}</div>
                        </div>
                        <h3 style={{ fontSize: '14px', marginBottom: '10px', fontWeight: 'bold' }}>SKILLS</h3>
                        {template.templateData.skills.slice(0, 4).map((skill, i) => (
                          <div key={i} style={{ fontSize: '11px', marginBottom: '5px', opacity: 0.9 }}>• {skill}</div>
                        ))}
                      </div>
                      <div style={{ flex: 1, padding: '30px', borderRadius: '0 8px 8px 0' }}>
                        <h2 style={{ fontSize: '16px', color: currentColors.primary, marginBottom: '15px', fontWeight: 'bold' }}>
                          PROFESSIONAL SUMMARY
                        </h2>
                        <p style={{ fontSize: '12px', lineHeight: '1.5', marginBottom: '20px', color: '#374151' }}>
                          {template.templateData.summary}
                        </p>
                        <h2 style={{ fontSize: '16px', color: currentColors.primary, marginBottom: '15px', fontWeight: 'bold' }}>
                          WORK EXPERIENCE
                        </h2>
                        {template.templateData.experience.map((exp, i) => (
                          <div key={i} style={{ marginBottom: '15px' }}>
                            <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#1f2937' }}>{exp.position}</h3>
                            <div style={{ fontSize: '12px', color: currentColors.accent, fontWeight: '500' }}>{exp.company}</div>
                            <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '5px' }}>{exp.duration}</div>
                            <p style={{ fontSize: '11px', lineHeight: '1.4', color: '#374151' }}>{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                
                if (designType === 'contact-sidebar') {
                  return (
                    <div style={{ display: 'flex', height: '450px' }}>
                      <div style={{ 
                        width: '180px', 
                        backgroundColor: currentColors.primary, 
                        padding: '25px 20px', 
                        color: 'white'
                      }}>
                        <h1 style={{ fontSize: '16px', marginBottom: '6px', fontWeight: 'bold' }}>
                          {template.templateData.personalInfo.name}
                        </h1>
                        <div style={{ fontSize: '11px', marginBottom: '18px', opacity: 0.9 }}>
                          <div style={{ marginBottom: '3px' }}>{template.templateData.personalInfo.email}</div>
                          <div style={{ marginBottom: '3px' }}>{template.templateData.personalInfo.phone}</div>
                          <div>{template.templateData.personalInfo.address}</div>
                        </div>
                        <h3 style={{ fontSize: '13px', marginBottom: '8px', fontWeight: 'bold' }}>CONTACT</h3>
                        <h3 style={{ fontSize: '13px', marginTop: '15px', marginBottom: '8px', fontWeight: 'bold' }}>KEY SKILLS</h3>
                        {template.templateData.skills.slice(0, 5).map((skill, i) => (
                          <div key={i} style={{ fontSize: '10px', marginBottom: '4px', opacity: 0.9 }}>• {skill}</div>
                        ))}
                      </div>
                      <div style={{ flex: 1, padding: '25px' }}>
                        <h2 style={{ fontSize: '18px', color: currentColors.primary, marginBottom: '12px', fontWeight: 'bold' }}>
                          PROFESSIONAL SUMMARY
                        </h2>
                        <p style={{ fontSize: '13px', lineHeight: '1.5', marginBottom: '18px', color: '#374151' }}>
                          {template.templateData.summary}
                        </p>
                        <h2 style={{ fontSize: '18px', color: currentColors.primary, marginBottom: '12px', fontWeight: 'bold' }}>
                          EXPERIENCE
                        </h2>
                        {template.templateData.experience.map((exp, i) => (
                          <div key={i} style={{ marginBottom: '12px' }}>
                            <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#1f2937' }}>{exp.position}</h3>
                            <div style={{ fontSize: '13px', color: currentColors.accent, fontWeight: '500' }}>{exp.company}</div>
                            <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '4px' }}>{exp.duration}</div>
                            <p style={{ fontSize: '12px', lineHeight: '1.4', color: '#374151' }}>{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                
                if (designType === 'two-column') {
                  return (
                    <div style={{ display: 'flex', gap: '30px', height: '450px' }}>
                      <div style={{ flex: 1 }}>
                        <h1 style={{ fontSize: '22px', marginBottom: '8px', fontWeight: 'bold', color: currentColors.primary }}>
                          {template.templateData.personalInfo.name}
                        </h1>
                        <div style={{ fontSize: '12px', marginBottom: '20px', color: '#6b7280' }}>
                          <div>{template.templateData.personalInfo.email} | {template.templateData.personalInfo.phone}</div>
                          <div>{template.templateData.personalInfo.address}</div>
                        </div>
                        <h2 style={{ fontSize: '16px', color: currentColors.primary, marginBottom: '10px', fontWeight: 'bold' }}>
                          PROFESSIONAL SUMMARY
                        </h2>
                        <p style={{ fontSize: '12px', lineHeight: '1.5', marginBottom: '18px', color: '#374151' }}>
                          {template.templateData.summary}
                        </p>
                        <h2 style={{ fontSize: '16px', color: currentColors.primary, marginBottom: '10px', fontWeight: 'bold' }}>
                          EXPERIENCE
                        </h2>
                        {template.templateData.experience.slice(0, 2).map((exp, i) => (
                          <div key={i} style={{ marginBottom: '12px' }}>
                            <h3 style={{ fontSize: '13px', fontWeight: 'bold', color: '#1f2937' }}>{exp.position}</h3>
                            <div style={{ fontSize: '11px', color: currentColors.accent }}>{exp.company} | {exp.duration}</div>
                            <p style={{ fontSize: '10px', lineHeight: '1.4', color: '#374151' }}>{exp.description.substring(0, 100)}...</p>
                          </div>
                        ))}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h2 style={{ fontSize: '16px', color: currentColors.accent, marginBottom: '10px', fontWeight: 'bold' }}>
                          TECHNICAL SKILLS
                        </h2>
                        <div style={{ marginBottom: '18px' }}>
                          {template.templateData.skills.map((skill, i) => (
                            <div key={i} style={{ 
                              backgroundColor: currentColors.secondary, 
                              color: currentColors.primary,
                              padding: '4px 8px',
                              borderRadius: '12px',
                              fontSize: '10px',
                              fontWeight: '500',
                              display: 'inline-block',
                              margin: '2px 4px 2px 0'
                            }}>
                              {skill}
                            </div>
                          ))}
                        </div>
                        <h2 style={{ fontSize: '16px', color: currentColors.accent, marginBottom: '10px', fontWeight: 'bold' }}>
                          ACHIEVEMENTS
                        </h2>
                        <div style={{ fontSize: '11px', color: '#374151', lineHeight: '1.4' }}>
                          <div style={{ marginBottom: '6px' }}>• Led successful project implementations</div>
                          <div style={{ marginBottom: '6px' }}>• Improved team productivity by 30%</div>
                          <div style={{ marginBottom: '6px' }}>• Recognized for outstanding performance</div>
                          <div>• Mentored junior team members</div>
                        </div>
                      </div>
                    </div>
                  );
                }

                if (designType === 'split-screen') {
                  return (
                    <div style={{ display: 'flex', height: '450px' }}>
                      <div style={{ 
                        width: '50%', 
                        backgroundColor: currentColors.primary, 
                        padding: '30px 25px', 
                        color: 'white'
                      }}>
                        <h1 style={{ fontSize: '20px', marginBottom: '10px', fontWeight: 'bold' }}>
                          {template.templateData.personalInfo.name}
                        </h1>
                        <div style={{ fontSize: '12px', marginBottom: '20px', opacity: 0.9 }}>
                          <div>{template.templateData.personalInfo.email}</div>
                          <div>{template.templateData.personalInfo.phone}</div>
                          <div>{template.templateData.personalInfo.address}</div>
                        </div>
                        <h3 style={{ fontSize: '14px', marginBottom: '10px', fontWeight: 'bold' }}>ABOUT ME</h3>
                        <p style={{ fontSize: '11px', lineHeight: '1.5', marginBottom: '18px', opacity: 0.9 }}>
                          {template.templateData.summary.substring(0, 150)}...
                        </p>
                        <h3 style={{ fontSize: '14px', marginBottom: '10px', fontWeight: 'bold' }}>SKILLS</h3>
                        {template.templateData.skills.slice(0, 6).map((skill, i) => (
                          <div key={i} style={{ fontSize: '10px', marginBottom: '4px', opacity: 0.9 }}>• {skill}</div>
                        ))}
                      </div>
                      <div style={{ 
                        width: '50%', 
                        padding: '30px 25px', 
                        backgroundColor: currentColors.secondary 
                      }}>
                        <h2 style={{ fontSize: '18px', color: currentColors.primary, marginBottom: '15px', fontWeight: 'bold' }}>
                          EXPERIENCE
                        </h2>
                        {template.templateData.experience.map((exp, i) => (
                          <div key={i} style={{ marginBottom: '16px' }}>
                            <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#1f2937' }}>{exp.position}</h3>
                            <div style={{ fontSize: '12px', color: currentColors.accent, fontWeight: '500' }}>{exp.company}</div>
                            <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '5px' }}>{exp.duration}</div>
                            <p style={{ fontSize: '11px', lineHeight: '1.4', color: '#374151' }}>{exp.description.substring(0, 120)}...</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }

                if (designType === 'photo-header') {
                  return (
                    <div style={{ height: '450px' }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        padding: '25px', 
                        backgroundColor: currentColors.secondary, 
                        marginBottom: '20px',
                        borderRadius: '8px'
                      }}>
                        <div style={{ 
                          width: '80px', 
                          height: '80px', 
                          backgroundColor: currentColors.primary, 
                          borderRadius: '50%', 
                          marginRight: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '12px'
                        }}>
                          PHOTO
                        </div>
                        <div style={{ flex: 1 }}>
                          <h1 style={{ fontSize: '22px', marginBottom: '6px', fontWeight: 'bold', color: currentColors.primary }}>
                            {template.templateData.personalInfo.name}
                          </h1>
                          <div style={{ fontSize: '12px', color: '#6b7280' }}>
                            {template.templateData.personalInfo.email} | {template.templateData.personalInfo.phone}
                          </div>
                          <div style={{ fontSize: '12px', color: '#6b7280' }}>
                            {template.templateData.personalInfo.address}
                          </div>
                        </div>
                      </div>
                      <div style={{ padding: '0 25px' }}>
                        <h2 style={{ fontSize: '16px', color: currentColors.accent, marginBottom: '10px', fontWeight: 'bold' }}>
                          PROFESSIONAL SUMMARY
                        </h2>
                        <p style={{ fontSize: '13px', lineHeight: '1.5', marginBottom: '18px', color: '#374151' }}>
                          {template.templateData.summary}
                        </p>
                        <div style={{ display: 'flex', gap: '25px' }}>
                          <div style={{ flex: 2 }}>
                            <h2 style={{ fontSize: '16px', color: currentColors.accent, marginBottom: '10px', fontWeight: 'bold' }}>
                              EXPERIENCE
                            </h2>
                            {template.templateData.experience.slice(0, 2).map((exp, i) => (
                              <div key={i} style={{ marginBottom: '12px' }}>
                                <h3 style={{ fontSize: '13px', fontWeight: 'bold', color: '#1f2937' }}>{exp.position}</h3>
                                <div style={{ fontSize: '11px', color: currentColors.accent }}>{exp.company} | {exp.duration}</div>
                                <p style={{ fontSize: '11px', lineHeight: '1.4', color: '#374151' }}>{exp.description.substring(0, 100)}...</p>
                              </div>
                            ))}
                          </div>
                          <div style={{ flex: 1 }}>
                            <h2 style={{ fontSize: '16px', color: currentColors.accent, marginBottom: '10px', fontWeight: 'bold' }}>
                              SKILLS
                            </h2>
                            {template.templateData.skills.slice(0, 6).map((skill, i) => (
                              <div key={i} style={{ 
                                backgroundColor: currentColors.primary, 
                                color: 'white',
                                padding: '3px 8px',
                                borderRadius: '12px',
                                fontSize: '10px',
                                fontWeight: '500',
                                display: 'inline-block',
                                margin: '2px 4px 2px 0'
                              }}>
                                {skill}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
                
                // Default layout for other templates
                return (
                  <div style={{ height: '450px' }}>
                    <div style={{ 
                      borderBottom: `3px solid ${currentColors.primary}`, 
                      paddingBottom: '20px', 
                      marginBottom: '24px',
                      textAlign: designType === 'creative-header' ? 'center' : 'left'
                    }}>
                      <h1 style={{ 
                        fontSize: '28px', 
                        fontWeight: 'bold', 
                        color: designType === 'creative-header' ? 'white' : '#1f2937',
                        marginBottom: '8px',
                        padding: designType === 'creative-header' ? '20px' : '0',
                        background: designType === 'creative-header' ? `linear-gradient(135deg, ${currentColors.primary}, ${currentColors.accent})` : 'transparent',
                        borderRadius: designType === 'creative-header' ? '12px' : '0'
                      }}>
                        {template.templateData.personalInfo.name}
                      </h1>
                      <div style={{ 
                        color: designType === 'creative-header' ? 'white' : '#6b7280',
                        fontSize: '14px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '16px',
                        justifyContent: designType === 'creative-header' ? 'center' : 'flex-start',
                        padding: designType === 'creative-header' ? '0 20px 20px' : '0'
                      }}>
                        <span>{template.templateData.personalInfo.email}</span>
                        <span>{template.templateData.personalInfo.phone}</span>
                        <span>{template.templateData.personalInfo.address}</span>
                      </div>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                      <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: currentColors.primary, marginBottom: '8px' }}>
                        Professional Summary
                      </h2>
                      <p style={{ color: '#374151', lineHeight: '1.6', fontSize: '14px' }}>
                        {template.templateData.summary}
                      </p>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                      <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: currentColors.primary, marginBottom: '8px' }}>
                        Skills
                      </h2>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {template.templateData.skills.map((skill, index) => (
                          <span key={index} style={{
                            backgroundColor: currentColors.secondary,
                            color: currentColors.primary,
                            padding: '4px 12px',
                            borderRadius: '16px',
                            fontSize: '12px',
                            fontWeight: '500'
                          }}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                      <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: currentColors.primary, marginBottom: '12px' }}>
                        Work Experience
                      </h2>
                      {template.templateData.experience.map((exp, index) => (
                        <div key={index} style={{ marginBottom: '16px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
                              {exp.position}
                            </h3>
                            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>
                              {exp.duration}
                            </span>
                          </div>
                          <p style={{ fontSize: '14px', color: currentColors.primary, fontWeight: '500', marginBottom: '8px' }}>
                            {exp.company}
                          </p>
                          <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.5' }}>
                            {exp.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Modal Footer */}
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center'
          }}>
            <Link 
              to="/builder" 
              state={{ 
                templateData: template.templateData, 
                templateTitle: template.title,
                designType: template.designType,
                colorScheme: template.colorScheme
              }}
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: '600',
                textDecoration: 'none',
                fontSize: '14px'
              }}
            >
              Use This Template
            </Link>
            <button
              onClick={onClose}
              style={{
                backgroundColor: '#f3f4f6',
                color: '#6b7280',
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Close Preview
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      backgroundColor: '#f8fafc', 
      width: '100vw', 
      minHeight: '100vh',
      margin: 0, 
      padding: 0,
      boxSizing: 'border-box',
      overflowX: 'hidden'
    }}>
      {/* Hero Section */}
      <section style={{
        backgroundColor: 'white', 
        padding: '80px 24px 60px', 
        textAlign: 'center',
        width: '100%',
        boxSizing: 'border-box',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{maxWidth: '800px', margin: '0 auto'}}>
          <h1 style={{
            color: '#1f2937',
            fontSize: '42px',
            fontWeight: 'bold',
            marginBottom: '16px',
            lineHeight: '1.2'
          }}>
            Find the Perfect <span style={{color: '#7c3aed'}}>Resume Template</span>
          </h1>
          <p style={{
            color: '#6b7280',
            fontSize: '18px',
            marginBottom: '40px',
            maxWidth: '600px',
            margin: '0 auto 40px auto'
          }}>
            Search through thousands of professional resume templates and examples to find the perfect match for your career.
          </p>

          {/* Category Filters */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '32px',
            flexWrap: 'wrap'
          }}>
            {['All', 'Tech', 'Medical', 'Non-Tech', 'Others'].map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  handleSearch();
                }}
                style={{
                  padding: '8px 24px',
                  borderRadius: '25px',
                  border: selectedCategory === category ? 'none' : '2px solid #e2e8f0',
                  backgroundColor: selectedCategory === category ? '#7c3aed' : 'white',
                  color: selectedCategory === category ? 'white' : '#6b7280',
                  fontWeight: selectedCategory === category ? '600' : '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category) {
                    e.target.style.borderColor = '#7c3aed';
                    e.target.style.color = '#7c3aed';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category) {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.color = '#6b7280';
                  }
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} style={{
            display: 'flex',
            maxWidth: '600px',
            margin: '0 auto',
            gap: '12px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <div style={{
              flex: '1',
              minWidth: '300px',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af',
                pointerEvents: 'none'
              }}>
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by job title, industry, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '16px 16px 16px 48px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  fontSize: '16px',
                  color: '#1f2937',
                  backgroundColor: 'white',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#7c3aed';
                  e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !searchQuery.trim()}
              style={{
                background: searchQuery.trim() ? 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' : '#9ca3af',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '12px',
                fontWeight: '600',
                border: 'none',
                cursor: searchQuery.trim() ? 'pointer' : 'not-allowed',
                fontSize: '16px',
                boxShadow: searchQuery.trim() ? '0 8px 24px rgba(124,58,237,0.3)' : 'none',
                transition: 'all 0.3s ease',
                minWidth: '120px'
              }}
              onMouseEnter={(e) => {
                if (searchQuery.trim()) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 12px 32px rgba(124,58,237,0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (searchQuery.trim()) {
                  e.target.style.transform = 'translateY(0px)';
                  e.target.style.boxShadow = '0 8px 24px rgba(124,58,237,0.3)';
                }
              }}
            >
              {isLoading ? (
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid white',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  Searching...
                </div>
              ) : 'Search'}
            </button>
          </form>
        </div>
      </section>

      {/* Search Results */}
      <section style={{
        padding: '60px 24px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          {searchResults.length > 0 && (
            <>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '40px'
              }}>
                <h2 style={{
                  color: '#1f2937',
                  fontSize: '28px',
                  fontWeight: '700',
                  margin: 0
                }}>
                  Search Results ({searchResults.length})
                </h2>
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center'
                }}>
                  <span style={{color: '#6b7280', fontSize: '14px'}}>Sort by:</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      handleSearch();
                    }}
                    style={{
                      padding: '8px 12px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      backgroundColor: 'white',
                      color: '#374151',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="relevance">Relevance</option>
                    <option value="popular">Most Popular</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '24px',
                padding: '8px'
              }}>
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '20px',
                      padding: '24px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                      border: '1px solid #e5e7eb',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
                      e.currentTarget.style.borderColor = '#7c3aed';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0px) scale(1)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
                      e.currentTarget.style.borderColor = '#e5e7eb';
                    }}
                  >
                    {/* Enhanced Resume Preview */}
                    <div style={{
                      width: '100%',
                      height: '240px',
                      backgroundColor: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                      borderRadius: '16px',
                      marginBottom: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      border: '1px solid #e2e8f0'
                    }}>
                      {/* Template preview background pattern */}
                      <div style={{
                        position: 'absolute',
                        top: '-50%',
                        left: '-50%',
                        width: '200%',
                        height: '200%',
                        background: 'radial-gradient(circle, rgba(124, 58, 237, 0.03) 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                        animation: 'float 6s ease-in-out infinite'
                      }}></div>
                      
                      {/* Main preview container */}
                      <div style={{
                        width: '85%',
                        height: '85%',
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.12)',
                        padding: '16px',
                        overflow: 'hidden',
                        position: 'relative',
                        border: '1px solid rgba(124, 58, 237, 0.1)'
                      }}>
                        {generatePreviewLayout(result)}
                        
                        {/* Category badge overlay */}
                        <div style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          backgroundColor: result.category === 'Tech' ? '#3b82f6' : 
                                         result.category === 'Medical' ? '#10b981' : 
                                         result.category === 'Non-Tech' ? '#f59e0b' : '#8b5cf6',
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '10px',
                          fontWeight: '600',
                          opacity: 0.9
                        }}>
                          {result.category}
                        </div>
                      </div>
                      
                      {/* Decorative elements */}
                      <div style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '10px',
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(45deg, rgba(124, 58, 237, 0.1), rgba(168, 85, 247, 0.1))',
                        borderRadius: '50%',
                        opacity: 0.6
                      }}></div>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      marginBottom: '8px'
                    }}>
                      <h3 style={{
                        color: '#1f2937',
                        fontSize: '18px',
                        fontWeight: '700',
                        lineHeight: '1.3',
                        margin: '0',
                        flex: '1'
                      }}>{result.title}</h3>
                      
                      {/* Rating stars */}
                      <div style={{
                        display: 'flex',
                        gap: '2px',
                        marginLeft: '8px'
                      }}>
                        {[1,2,3,4,5].map(star => (
                          <span key={star} style={{
                            color: star <= (Math.floor(Math.random() * 2) + 4) ? '#fbbf24' : '#e5e7eb',
                            fontSize: '14px'
                          }}>★</span>
                        ))}
                      </div>
                    </div>
                    
                    <p style={{
                      color: '#6b7280',
                      fontSize: '14px',
                      marginBottom: '16px',
                      lineHeight: '1.5',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>{result.description}</p>

                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px',
                      marginBottom: '20px'
                    }}>
                      {result.tags.map((tag, index) => (
                        <span
                          key={index}
                          style={{
                            backgroundColor: '#f0f4ff',
                            color: '#7c3aed',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '500'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div style={{
                      display: 'flex',
                      gap: '12px',
                      width: '100%'
                    }}>
                      <button
                        onClick={() => setPreviewModal({ isOpen: true, template: result })}
                        style={{
                          flex: '1',
                          backgroundColor: 'white',
                          color: '#7c3aed',
                          padding: '14px 18px',
                          borderRadius: '12px',
                          fontWeight: '600',
                          border: '2px solid #e2e8f0',
                          cursor: 'pointer',
                          fontSize: '14px',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#f8fafc';
                          e.target.style.borderColor = '#7c3aed';
                          e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'white';
                          e.target.style.borderColor = '#e2e8f0';
                          e.target.style.transform = 'translateY(0px)';
                        }}
                      >
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Preview
                      </button>
                      <Link 
                        to="/builder" 
                        state={{ templateData: result.templateData, templateTitle: result.title }}
                        style={{
                          flex: '2',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                          color: 'white',
                          padding: '14px 20px',
                          borderRadius: '12px',
                          fontWeight: '600',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '14px',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          textDecoration: 'none',
                          position: 'relative',
                          overflow: 'hidden',
                          textAlign: 'center',
                          boxSizing: 'border-box'
                        }}
                        onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                        onMouseLeave={(e) => e.target.style.opacity = '1'}
                      >
                        ✨ Use Template
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {searchResults.length === 0 && !isLoading && (
            <div style={{
              textAlign: 'center',
              padding: '80px 20px',
              color: '#6b7280'
            }}>
              <div style={{
                width: '120px',
                height: '120px',
                backgroundColor: '#f8fafc',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px auto'
              }}>
                <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 style={{fontSize: '20px', fontWeight: '600', marginBottom: '8px', color: '#374151'}}>
                Start Your Search
              </h3>
              <p style={{fontSize: '16px', maxWidth: '400px', margin: '0 auto'}}>
                Enter keywords like job title, industry, or skills to find resume templates that match your needs.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Preview Modal */}
      {previewModal.isOpen && (
        <PreviewModal 
          template={previewModal.template} 
          onClose={() => setPreviewModal({ isOpen: false, template: null })}
        />
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}