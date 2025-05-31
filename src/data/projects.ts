// Define Project type for TypeScript
export type Project = {
    id: string;
    title: string;
    icon: string;
    technologies: string[];
    shortDesc: string;
    images: {
        src: string;
        alt: string;
        width: number;
        height: number;
    }[];
    caseStudy: {
        role: string;
        challenge: string;
        solution: string;
        impact: string;
        learnings: string;
    };
};

// Projects data
export const projects: Project[] = [    {
        id: 'ecommerce',
        title: "The Six Pack Chef – E-Commerce Platform",
        icon: '🍽️', 
        technologies: ["PHP", "Laravel", "Vue.js", "MySQL", "PayMaya", "PayMongo", "Redis","Cron Jobs"],
        shortDesc: "A subscription-based Laravel e-commerce platform for fitness-focused meal delivery with dynamic cart and recurring payment features.",
        images: [
            {
                src: '/project-images/sixpackchef/The-Six-Pack-Chef-05-30-2025_10_40_PM.png',
                alt: 'E-commerce homepage',
                width: 1200,
                height: 800
            },
            {
                src: '/project-images/sixpackchef/Meal-Plan-The-Six-Pack-Chef-05-30-2025_10_41_PM.png',
                alt: 'Meal plan selection page',
                width: 1200,
                height: 800
            },
            {
                src: '/project-images/sixpackchef/The-Six-Pack-Chef-05-31-2025_04_09_PM.png',
                alt: 'E-commerce homepage Mobile View',
                width: 1200,
                height: 800
            },
            {
                src: '/project-images/sixpackchef/Meal-Plan-The-Six-Pack-Chef-05-31-2025_04_10_PM.png',
                alt: 'Meal plan selection page Mobile View',
                width: 1200,
                height: 800
            },
            {
                src: '/project-images/sixpackchef/image.png',
                alt: 'Meal plan selection page (redesign)',
                width: 1200,
                height: 800
            },
        ],
        caseStudy: {
            role: "Full-Stack Developer",
            challenge: "Build a flexible meal subscription system with custom plan management and secure payment integration.",
            solution: "Developed a dynamic cart system, integrated PayMongo and PayMaya, and built admin panels for order tracking. Implemented scheduled job for data synchronization and payment processing.",
            impact: "Enhanced operational efficiency and user experience; significantly reduced support workload.",
            learnings: "Advanced understanding of e-commerce architecture, payment logic, and scheduled order workflows."
        }
    },    {
        id: 'cms',
        title: "ClickUp CMS Form Builder",
        icon: '🧩',
        technologies: ["Node.js", "React.js", "MongoDB", "ClickUp API", "Material UI"],
        shortDesc: "Custom-built form tool allowing users to create ClickUp-compatible forms with custom field mapping and advanced input logic.",
        images: [
            {
                src: '/project-images/clickup api, cms/goconstellation-utilities-yr6r9-ondigitalocean-app-form-67aa206072fcc052492e7b7f-05-30-2025_11_50_PM.png',
                alt: 'CMS content management dashboard',
                width: 1200,
                height: 800
            },
            {
                src: '/project-images/clickup api, cms/goconstellation-utilities-yr6r9-ondigitalocean-app-form-builder-edit-67aa206072fcc052492e7b7f-05-30-2025_11_51_PM.png',
                alt: 'Form builder interface',
                width: 1200,
                height: 800
            }
        ],
        caseStudy: {
            role: "Full-Stack Developer",
            challenge: "Overcome limitations of native ClickUp forms, especially around handling custom fields.",
            solution: "Created a React-based form builder integrated with ClickUp's API to dynamically update custom task fields with flexible mapping.",
            impact: "Enabled automation of task creation for operations teams; reduced manual entry and increased productivity.",
            learnings: "Improved ability to build admin-focused tools with third-party APIs and advanced form control logic."
        }
    },    {
        id: 'reservation',
        title: "Sip & Gogh Website",
        icon: '🖌️', 
        technologies: ["PHP", "Laravel", "JavaScript", "MySQL"],
        shortDesc: "A Laravel-based website for the Philippines' first paint-and-sip studio, featuring studio listings, event highlights, and online booking functionality.",
        images: [
            {
                src: '/project-images/sip & gogh/Paint-and-Sip-Studio-Philippines-Sip-Gogh-05-30-2025_11_29_PM.png',
                alt: 'Studio homepage with booking options',
                width: 1200,
                height: 800
            },
            {
                src: '/project-images/sip & gogh/Workshops-Sip-Gogh-05-30-2025_11_28_PM.png',
                alt: 'Available workshops listing',
                width: 1200,
                height: 800
            },
            {
                src: '/project-images/sip & gogh/Book-Workshop-Sip-Gogh-05-30-2025_11_30_PM.png',
                alt: 'Workshop booking interface',
                width: 1200,
                height: 800
            },
            {
                src: '/project-images/sip & gogh/Events-Sip-Gogh-05-31-2025_04_09_PM.png',
                alt: 'Available workshops listing Mobile View',
                width: 1200,
                height: 800
            },
            {
                src: '/project-images/sip & gogh/Paint-and-Sip-Studio-Philippines-Sip-Gogh-05-31-2025_04_08_PM.png',
                alt: 'Studio homepage with booking options Mobile View',
                width: 1200,
                height: 800
            }
        ],
        caseStudy: {
            role: "Web Developer",
            challenge: "Create a visually appealing and user-friendly site to support event bookings and brand visibility.",
            solution: "Developed a responsive, SEO-optimized Laravel site with a custom booking module, mobile support, and design aligned with the brand's creative aesthetic.",
            impact: "Increased customer engagement and online bookings; improved brand presentation and accessibility across devices.",
            learnings: "Balanced visual creativity with backend efficiency; improved skills in UX-driven booking systems."
        }
    },    {
        id: 'chrome-extension',
        title: "Chrome Extension – Prompt Manager for ChatGPT",
        icon: '🧪', 
        technologies: ["JavaScript", "Chrome APIs", "HTML", "CSS"],
        shortDesc: "A productivity Chrome extension for saving, organizing, and reusing AI prompts with support for variables and template sharing.",
        images: [
            {
                src: '/project-images/Prompt List Chrome Extension/Screenshot 2025-05-30 230215.png',
                alt: 'Chrome extension popup interface',
                width: 1200,
                height: 800
            },
            {
                src: '/project-images/Prompt List Chrome Extension/Screenshot 2025-05-30 230301.png',
                alt: 'Extension options page',
                width: 1200,
                height: 800
            }
        ],
        caseStudy: {
            role: "Extension Developer",
            challenge: "Help users save time and reduce repetition when working with AI tools like ChatGPT.",
            solution: "Developed a browser extension using Chrome APIs and JavaScript to manage, search, and reuse prompt templates easily.",
            impact: "Increased productivity for freelancers and internal teams; improved AI usage consistency.",
            learnings: "Gained real-world experience with browser extension APIs and local storage UX patterns."
        }
    },{
        id: 'ai-chatbot',
        title: "AI Article Writing Tool",
        icon: '🧠', 
        technologies: ["OpenAI (GPT)", "Anthropic (Claude)", "Node.js", "React.js","Material UI"],
        shortDesc: "A web-based tool for generating SEO-optimized articles using OpenAI and Anthropic Claude for marketing and blog automation.",
        images: [
            {
                src: '/project-images/Article Writing Tool/AI-Writing-Tool-05-30-2025_11_13_PM.png',
                alt: 'AI writing tool interface',
                width: 1200,
                height: 800
            },
            {
                src: '/project-images/Article Writing Tool/AI-Writing-Tool-05-30-2025_11_14_PM.png',
                alt: 'Content generation workflow',
                width: 1200,
                height: 800
            },
            {
                src: '/project-images/Article Writing Tool/AI-Writing-Tool-05-30-2025_11_16_PM.png',
                alt: 'Generated content result',
                width: 1200,
                height: 800
            }
        ],
        caseStudy: {
            role: "Full-Stack Developer",
            challenge: "Enable users to generate high-quality content tailored to tone and length, using different LLMs.",
            solution: "Built a tool integrating OpenAI and Claude APIs, with custom prompt controls, tone settings, and caching for efficiency.",
            impact: "Reduced writing workload and increased scalability for content agencies and marketers.",
            learnings: "Gained deep integration experience with multiple LLMs and implemented token-efficient AI workflows."
        }
    },    {
        id: 'education-platform',
        title: "Ateneo Center for Continuing Education (CCE) Website",
        icon: '🎓', 
        technologies: ["PHP", "Laravel", "JavaScript", "MySQL"],
        shortDesc: "University website for showcasing professional development programs, enabling course search, registration, and inquiries.",
        images: [
            {
                src: '/project-images/CCE/Homepage-Ateneo-Graduate-School-of-Business-05-30-2025_11_40_PM.png',
                alt: 'Platform homepage',
                width: 1200,
                height: 800
            },
            {
                src: '/project-images/CCE/Calendar-Ateneo-Graduate-School-of-Business-05-30-2025_11_42_PM.png',
                alt: 'Scheduling calendar interface',
                width: 1200,
                height: 800
            },
            {
                src: '/project-images/CCE/Programs-Ateneo-Graduate-School-of-Business-05-30-2025_11_41_PM.png',
                alt: 'Service programs listing',
                width: 1200,
                height: 800
            }
        ],
        caseStudy: {
            role: "Backend & Content Developer",
            challenge: "Improve course visibility, search, and registration features while minimizing manual content updates.",
            solution: "Enhanced backend data handling, built dynamic course listings.",
            impact: "Reduced content management effort; increased enrollment inquiries and improved user retention.",
            learnings: "Improved backend performance in data-heavy platforms."
        }
    },
];
