import type {
  Course,
  Speaker,
  LiveSession,
  UserProgress,
  LearningGoal,
  Badge,
  Certificate,
  CalendarEvent,
  Category,
  UserStats,
} from '@/components/elearning/types'

// =============================================================================
// Initial Data (seeded from sample-data.json)
// =============================================================================

const initialCourses: Course[] = [
  {
    id: 'course-001',
    title: 'Digital Literacy Fundamentals',
    description: 'Learn to use smartphones, apps, and the internet safely. Perfect for beginners who want to get comfortable with technology.',
    category: 'digital-literacy',
    duration: 180,
    totalModules: 12,
    format: 'video',
    level: 'beginner',
    language: 'hindi',
    isMandatory: false,
    isTrending: true,
    thumbnailUrl: '/images/courses/digital-literacy.jpg',
    instructorName: 'Priya Sharma',
    rating: 4.8,
    enrolledCount: 12450,
    chapters: [
      {
        title: 'Getting Started with Your Smartphone',
        lessons: [
          { title: 'What Is a Smartphone and Why It Matters', duration: 12 },
          { title: 'Setting Up Your Phone for the First Time', duration: 15 },
          { title: 'Basic Navigation, Gestures & Settings', duration: 18 },
        ],
      },
      {
        title: 'Connecting to the Internet',
        lessons: [
          { title: 'Understanding Wi-Fi vs. Mobile Data', duration: 14 },
          { title: 'Browsing the Web Safely', duration: 16 },
          { title: 'Finding & Installing Apps from Play Store', duration: 12 },
        ],
      },
      {
        title: 'Staying Safe Online',
        lessons: [
          { title: 'Recognizing Fake Websites & Phishing Links', duration: 18 },
          { title: 'Creating Strong Passwords & PINs', duration: 14 },
          { title: 'Managing App Permissions & Privacy Settings', duration: 16 },
        ],
      },
      {
        title: 'Everyday Digital Tools',
        lessons: [
          { title: 'Using Google Maps for Navigation', duration: 15 },
          { title: 'Making Video Calls on WhatsApp & Google Meet', duration: 14 },
          { title: 'Your Digital Future: Next Steps', duration: 16 },
        ],
      },
    ],
  },
  {
    id: 'course-002',
    title: 'Cyber Security & Online Safety',
    description: 'Protect yourself from online fraud, scams, and cyber threats. Learn to recognize fake messages, secure your accounts, and stay safe while using UPI and online banking.',
    category: 'cyber-security',
    duration: 90,
    totalModules: 6,
    format: 'interactive',
    level: 'beginner',
    language: 'hindi',
    isMandatory: true,
    isTrending: false,
    thumbnailUrl: '/images/courses/cyber-security.jpg',
    instructorName: 'Anjali Verma',
    rating: 4.9,
    enrolledCount: 28340,
    chapters: [
      {
        title: 'Understanding Online Threats',
        lessons: [
          { title: 'Common Scams Targeting Women in India Today', duration: 18 },
          { title: 'How Fraudsters Find and Target Their Victims', duration: 14 },
        ],
      },
      {
        title: 'Protecting Your Money',
        lessons: [
          { title: 'Safe UPI & Net Banking Practices', duration: 20 },
          { title: 'Recognizing Fake Payment Requests & QR Codes', duration: 16 },
        ],
      },
      {
        title: 'Staying Secure & Taking Action',
        lessons: [
          { title: 'Securing Your Social Media & Email Accounts', duration: 14 },
          { title: 'What to Do If You Are Scammed: Reporting & Recovery', duration: 8 },
        ],
      },
    ],
  },
  {
    id: 'course-003',
    title: 'Starting Your First Business',
    description: 'A step-by-step guide to turning your skills into a business. Learn about pricing, finding customers, managing money, and growing your venture.',
    category: 'business',
    duration: 240,
    totalModules: 16,
    format: 'mixed',
    level: 'beginner',
    language: 'hindi',
    isMandatory: false,
    isTrending: true,
    thumbnailUrl: '/images/courses/first-business.jpg',
    instructorName: 'Meera Patel',
    rating: 4.7,
    enrolledCount: 8920,
    chapters: [
      {
        title: 'Discovering Your Business Idea',
        lessons: [
          { title: 'Turning Your Skills & Hobbies into a Product or Service', duration: 16 },
          { title: 'Market Research Without Leaving Your Neighbourhood', duration: 18 },
          { title: 'Validating Your Idea with Real Customers', duration: 14 },
        ],
      },
      {
        title: 'Setting Up Your Business',
        lessons: [
          { title: 'Choosing a Business Name and Structure', duration: 12 },
          { title: 'Registering on Udyam Portal (MSME) — Step by Step', duration: 18 },
          { title: 'Opening a Business Bank Account & Understanding GST Basics', duration: 16 },
          { title: 'Pricing Your Products for Profit, Not Just Cost', duration: 20 },
        ],
      },
      {
        title: 'Getting Your First Customers',
        lessons: [
          { title: 'Word of Mouth & Community Marketing Strategies', duration: 14 },
          { title: 'Creating Your WhatsApp Business Profile & Catalog', duration: 16 },
          { title: 'Listing on Local Platforms, Bazaars & Online Marketplaces', duration: 18 },
        ],
      },
      {
        title: 'Managing Money & Steady Growth',
        lessons: [
          { title: 'Basic Bookkeeping Using a Simple Notebook or App', duration: 16 },
          { title: 'Understanding Profit, Loss & Cash Flow', duration: 18 },
          { title: 'Reinvesting Wisely: When to Spend and When to Save', duration: 14 },
          { title: 'Handling Tax, Insurance & Government Schemes for Women', duration: 16 },
        ],
      },
      {
        title: 'Scaling Up & Next Steps',
        lessons: [
          { title: 'Building a Support Network: SHGs, Mentors & Online Communities', duration: 12 },
          { title: 'Your 90-Day Business Launch Plan', duration: 16 },
        ],
      },
    ],
  },
  {
    id: 'course-004',
    title: 'WhatsApp for Business',
    description: 'Master WhatsApp Business to connect with customers, showcase products, and manage orders. Includes catalog setup and automated replies.',
    category: 'digital-literacy',
    duration: 60,
    totalModules: 5,
    format: 'video',
    level: 'beginner',
    language: 'hindi',
    isMandatory: false,
    isTrending: true,
    thumbnailUrl: '/images/courses/whatsapp-business.jpg',
    instructorName: 'Sunita Rao',
    rating: 4.6,
    enrolledCount: 15780,
    chapters: [
      {
        title: 'WhatsApp Business Basics',
        lessons: [
          { title: 'Downloading, Installing & Setting Up WhatsApp Business', duration: 12 },
          { title: 'Building a Professional Business Profile That Attracts Customers', duration: 14 },
        ],
      },
      {
        title: 'Connecting & Selling to Customers',
        lessons: [
          { title: 'Quick Replies, Away Messages & Greeting Automation', duration: 16 },
          { title: 'Creating & Sharing Your Product Catalog', duration: 18 },
        ],
      },
      {
        title: 'Growing with WhatsApp',
        lessons: [
          { title: 'Broadcast Lists, Labels & Managing Orders at Scale', duration: 10 },
        ],
      },
    ],
  },
  {
    id: 'course-005',
    title: 'Personal Finance Basics',
    description: 'Take control of your money. Learn budgeting, saving, and smart spending habits that will help you and your family build financial security.',
    category: 'personal-finance',
    duration: 120,
    totalModules: 8,
    format: 'video',
    level: 'beginner',
    language: 'hindi',
    isMandatory: false,
    isTrending: false,
    thumbnailUrl: '/images/courses/personal-finance.jpg',
    instructorName: 'Kavita Joshi',
    rating: 4.5,
    enrolledCount: 6540,
    chapters: [
      {
        title: 'Understanding Your Money',
        lessons: [
          { title: 'Where Does Your Money Come From? Income & Expenses Explained', duration: 16 },
          { title: 'Tracking Daily Expenses: Simple Methods That Work', duration: 14 },
        ],
      },
      {
        title: 'Budgeting for Your Family',
        lessons: [
          { title: 'The 50-30-20 Rule Adapted for Indian Households', duration: 18 },
          { title: 'Creating a Monthly Budget You Can Actually Stick To', duration: 16 },
        ],
      },
      {
        title: 'Saving Smart',
        lessons: [
          { title: 'Building an Emergency Fund: How Much & Where to Keep It', duration: 16 },
          { title: 'Savings Schemes: Post Office, SHG, Jan Dhan & RD Accounts', duration: 18 },
        ],
      },
      {
        title: 'Planning Your Financial Future',
        lessons: [
          { title: 'Goal-Based Saving for Education, Health & Business', duration: 14 },
          { title: 'Your Personal Financial Action Plan & Next Steps', duration: 8 },
        ],
      },
    ],
  },
  {
    id: 'course-006',
    title: 'Confident Communication',
    description: 'Build confidence in speaking with customers, negotiating prices, and presenting yourself professionally.',
    category: 'communication',
    duration: 150,
    totalModules: 10,
    format: 'interactive',
    level: 'intermediate',
    language: 'hindi',
    isMandatory: false,
    isTrending: false,
    thumbnailUrl: '/images/courses/communication.jpg',
    instructorName: 'Deepa Nair',
    rating: 4.4,
    enrolledCount: 4230,
    chapters: [
      {
        title: 'Building Your Voice',
        lessons: [
          { title: 'Overcoming the Fear of Speaking in Public & to Strangers', duration: 18 },
          { title: 'Body Language, Eye Contact & First Impressions', duration: 16 },
          { title: 'Speaking Clearly, Slowly & with Confidence', duration: 14 },
        ],
      },
      {
        title: 'Winning Customer Conversations',
        lessons: [
          { title: 'Explaining Your Product\'s Value Without Sounding Pushy', duration: 16 },
          { title: 'Handling Objections & "It\'s Too Expensive" Gracefully', duration: 18 },
          { title: 'Asking for the Sale and Following Up', duration: 14 },
        ],
      },
      {
        title: 'Negotiation & Difficult Conversations',
        lessons: [
          { title: 'Negotiating Prices with Suppliers & Wholesalers', duration: 16 },
          { title: 'Resolving Conflicts with Customers Professionally', duration: 14 },
        ],
      },
      {
        title: 'Professional Presence',
        lessons: [
          { title: 'Speaking Up in Meetings, SHG Sessions & Group Settings', duration: 14 },
          { title: 'Conclusion: Your 30-Day Communication Practice Plan', duration: 10 },
        ],
      },
    ],
  },
  {
    id: 'course-007',
    title: 'Product Photography with Your Phone',
    description: 'Learn to take beautiful photos of your products using just your smartphone. Perfect for selling on the marketplace.',
    category: 'business',
    duration: 45,
    totalModules: 4,
    format: 'video',
    level: 'beginner',
    language: 'hindi',
    isMandatory: false,
    isTrending: true,
    thumbnailUrl: '/images/courses/product-photography.jpg',
    instructorName: 'Lakshmi Iyer',
    rating: 4.8,
    enrolledCount: 9870,
    chapters: [
      {
        title: 'The Basics of a Great Photo',
        lessons: [
          { title: 'Using Natural Light Effectively at Home', duration: 12 },
          { title: 'Setting Up a Simple Studio with a White Sheet & Cardboard', duration: 11 },
        ],
      },
      {
        title: 'Shooting & Editing Like a Pro',
        lessons: [
          { title: 'Framing, Angles & Capturing Perfect Product Shots', duration: 12 },
          { title: 'Editing Photos with Free Apps (Snapseed, Lightroom Mobile)', duration: 10 },
        ],
      },
    ],
  },
  {
    id: 'course-009',
    title: 'Sustainable Business Ideas for Women',
    description: 'Discover eco-friendly and sustainable business opportunities that are low-cost, high-impact, and in demand. Learn how to build a green business that helps your community and the planet.',
    category: 'business',
    duration: 200,
    totalModules: 14,
    format: 'mixed',
    level: 'beginner',
    language: 'hindi',
    isMandatory: false,
    isTrending: true,
    thumbnailUrl: '/images/courses/sustainable-business.jpg',
    instructorName: 'Asha Bhatt',
    rating: 4.7,
    enrolledCount: 5320,
    chapters: [
      {
        title: 'What Is a Sustainable Business?',
        lessons: [
          { title: 'Understanding Sustainability: Why It Matters for You and India', duration: 14 },
          { title: 'Green Business vs. Regular Business: What Changes?', duration: 12 },
          { title: 'Spotting Sustainable Opportunities in Your Community', duration: 16 },
        ],
      },
      {
        title: 'Eco-Friendly Product Businesses',
        lessons: [
          { title: 'Making and Selling Natural/Herbal Products (soaps, oils, cleaners)', duration: 18 },
          { title: 'Cloth Bags, Jute Crafts & Upcycled Fashion from Home', duration: 16 },
          { title: 'Organic Farming, Kitchen Gardens & Selling Surplus Produce', duration: 18 },
        ],
      },
      {
        title: 'Sustainable Service Businesses',
        lessons: [
          { title: 'Waste Collection, Composting & Recycling Services', duration: 14 },
          { title: 'Repair, Reuse & Refurbish: Building a Local Service Business', duration: 16 },
          { title: 'Green Catering: Cooking with Local, Seasonal Ingredients', duration: 14 },
        ],
      },
      {
        title: 'Funding & Selling Your Green Business',
        lessons: [
          { title: 'Government Schemes & Grants for Eco-Entrepreneurs', duration: 16 },
          { title: 'Selling on Green Marketplaces and Local Eco-Networks', duration: 14 },
          { title: 'Telling Your Brand Story: Why Customers Pay More for Green', duration: 14 },
        ],
      },
      {
        title: 'Growing Sustainably',
        lessons: [
          { title: 'Measuring Your Business\'s Environmental & Social Impact', duration: 14 },
          { title: 'Your 6-Month Sustainable Business Launch Plan', duration: 14 },
        ],
      },
    ],
  },
  {
    id: 'course-010',
    title: 'Zero-Waste Home & Business',
    description: 'Learn practical zero-waste techniques for your home and business. Turn waste into income, reduce costs, and attract eco-conscious customers.',
    category: 'business',
    duration: 120,
    totalModules: 8,
    format: 'video',
    level: 'beginner',
    language: 'hindi',
    isMandatory: false,
    isTrending: false,
    thumbnailUrl: '/images/courses/zero-waste.jpg',
    instructorName: 'Nandita Krishnan',
    rating: 4.5,
    enrolledCount: 3180,
    chapters: [
      {
        title: 'Zero-Waste Basics',
        lessons: [
          { title: 'Understanding the 5 Rs: Refuse, Reduce, Reuse, Recycle, Rot', duration: 16 },
          { title: 'Waste Audit: Tracking What You Throw Away at Home & Work', duration: 14 },
        ],
      },
      {
        title: 'Turning Waste into Income',
        lessons: [
          { title: 'Composting Kitchen Waste & Selling Organic Fertilizer', duration: 16 },
          { title: 'Upcycling Old Clothes, Bottles & Packaging into Products', duration: 18 },
          { title: 'Connecting with Recyclers, Kabadiwala Networks & Waste Buyers', duration: 14 },
        ],
      },
      {
        title: 'Running a Zero-Waste Business',
        lessons: [
          { title: 'Eco-Friendly Packaging: Low-Cost Alternatives to Plastic', duration: 16 },
          { title: 'Marketing Your Zero-Waste Practices to Attract Customers', duration: 14 },
          { title: 'Building a Zero-Waste Policy for Your Shop or Home Business', duration: 12 },
        ],
      },
    ],
  },
  {
    id: 'course-011',
    title: 'Sanitary Pad Manufacturing: Start Your Own Unit',
    description: 'Learn to set up a low-cost sanitary pad manufacturing business from scratch. Covers raw materials, machines, quality standards, packaging, and how to sell to schools, SHGs, and local markets.',
    category: 'business',
    duration: 180,
    totalModules: 12,
    format: 'mixed',
    level: 'beginner',
    language: 'hindi',
    isMandatory: false,
    isTrending: true,
    thumbnailUrl: '/images/courses/sanitary-pad-manufacturing.jpg',
    instructorName: 'Rekha Devi',
    rating: 4.9,
    enrolledCount: 7640,
    chapters: [
      {
        title: 'Understanding the Opportunity',
        lessons: [
          { title: 'Why Sanitary Pad Manufacturing Is a High-Impact Business in India', duration: 14 },
          { title: 'Market Overview: Rural & Urban Demand, Competition & Pricing', duration: 16 },
          { title: 'Success Stories: Women-Led Pad Units Across India', duration: 12 },
        ],
      },
      {
        title: 'Raw Materials & Equipment',
        lessons: [
          { title: 'Core Materials: SAP Granules, Cellulose Pulp, Non-Woven Fabric & PE Film', duration: 18 },
          { title: 'Manual vs. Semi-Automatic Machines: Cost, Output & What to Choose', duration: 16 },
          { title: 'Where to Source Materials & Machines at Low Cost', duration: 14 },
        ],
      },
      {
        title: 'Manufacturing Process Step by Step',
        lessons: [
          { title: 'Preparing the Absorbent Core: Layering & Bonding', duration: 16 },
          { title: 'Wrapping, Sealing & Cutting Pads to Size', duration: 14 },
          { title: 'Quality Checks: Absorption, Leak-Proof Testing & Hygiene Standards', duration: 16 },
          { title: 'Packaging, Labelling & Sterilisation for Safe Use', duration: 14 },
        ],
      },
      {
        title: 'Setting Up & Running Your Unit',
        lessons: [
          { title: 'Space, Power & Investment Needed to Get Started', duration: 14 },
          { title: 'Licenses & Certifications: BIS Standards & MSME Registration', duration: 16 },
        ],
      },
      {
        title: 'Selling & Growing Your Business',
        lessons: [
          { title: 'Selling to Schools, Anganwadis, SHGs & Government Schemes (PM Suvidha)', duration: 16 },
          { title: 'Pricing for Profit and Building a Local Brand', duration: 14 },
        ],
      },
    ],
  },
  {
    id: 'course-012',
    title: 'Spirulina Farming: Grow & Sell a Superfood',
    description: 'Learn to cultivate spirulina — a high-protein superfood algae — at home or in a small unit. Covers tank setup, water chemistry, harvesting, drying, and selling to health stores, gyms, and online.',
    category: 'business',
    duration: 160,
    totalModules: 11,
    format: 'mixed',
    level: 'beginner',
    language: 'hindi',
    isMandatory: false,
    isTrending: true,
    thumbnailUrl: '/images/courses/spirulina-farming.jpg',
    instructorName: 'Dr. Sunita Pillai',
    rating: 4.8,
    enrolledCount: 4210,
    chapters: [
      {
        title: 'Introduction to Spirulina',
        lessons: [
          { title: 'What Is Spirulina and Why the World Is Buying It', duration: 12 },
          { title: 'Market Demand in India: Health Stores, Gyms & Export', duration: 14 },
          { title: 'Is Spirulina Farming Right for You? Investment & Returns', duration: 12 },
        ],
      },
      {
        title: 'Setting Up Your Cultivation Unit',
        lessons: [
          { title: 'Space Requirements: Rooftop, Backyard & Indoor Options', duration: 14 },
          { title: 'Building or Buying Tanks: Materials, Size & Cost', duration: 16 },
          { title: 'Water Chemistry: pH, Temperature, Nutrients & Light Needs', duration: 18 },
        ],
      },
      {
        title: 'Growing & Harvesting',
        lessons: [
          { title: 'Inoculating Your Culture: Getting the Starter Right', duration: 14 },
          { title: 'Daily Maintenance: Stirring, Testing & Troubleshooting', duration: 16 },
          { title: 'Harvesting, Washing & Drying Spirulina at Home', duration: 16 },
        ],
      },
      {
        title: 'Selling Your Spirulina',
        lessons: [
          { title: 'Powder, Tablets & Fresh Paste: Choosing Your Product Format', duration: 14 },
          { title: 'Packaging, Food Safety Compliance & Pricing for Profit', duration: 14 },
        ],
      },
    ],
  },
  {
    id: 'course-013',
    title: 'Aquaponics: Farm Fish & Vegetables Together',
    description: 'Set up a profitable aquaponics system that grows fish and vegetables using the same water. Ideal for small spaces — rooftops, backyards, or community plots.',
    category: 'business',
    duration: 210,
    totalModules: 14,
    format: 'video',
    level: 'beginner',
    language: 'hindi',
    isMandatory: false,
    isTrending: true,
    thumbnailUrl: '/images/courses/aquaponics.jpg',
    instructorName: 'Girija Menon',
    rating: 4.7,
    enrolledCount: 3870,
    chapters: [
      {
        title: 'How Aquaponics Works',
        lessons: [
          { title: 'The Fish-Plant Cycle: Nature\'s Self-Sustaining Loop Explained', duration: 14 },
          { title: 'Aquaponics vs. Soil Farming vs. Hydroponics: Pros & Cons', duration: 12 },
          { title: 'Real Examples: Women Running Aquaponics Units in India', duration: 12 },
        ],
      },
      {
        title: 'Designing Your System',
        lessons: [
          { title: 'System Types: Media Bed, NFT, DWC — Which Is Best for You?', duration: 16 },
          { title: 'Space & Budget Planning: Starting from ₹5,000', duration: 14 },
          { title: 'Tanks, Pumps, Pipes & Grow Beds: Sourcing Locally', duration: 16 },
        ],
      },
      {
        title: 'Fish & Plants',
        lessons: [
          { title: 'Best Fish for India: Tilapia, Catfish & Rohu', duration: 14 },
          { title: 'Best Crops: Leafy Greens, Herbs, Tomatoes & Chilies', duration: 14 },
          { title: 'Feeding Fish, Water Testing & Preventing Disease', duration: 16 },
        ],
      },
      {
        title: 'Harvesting & Selling',
        lessons: [
          { title: 'When & How to Harvest Fish and Vegetables', duration: 14 },
          { title: 'Selling to Restaurants, Homes, Schools & Local Markets', duration: 16 },
          { title: 'Scaling Up: From Home Unit to Community Enterprise', duration: 16 },
          { title: 'Government Schemes for Aquaculture & Horticulture Support', duration: 16 },
        ],
      },
    ],
  },
  {
    id: 'course-014',
    title: 'Bamboo Technology & Business',
    description: 'Turn bamboo — India\'s fastest-growing natural resource — into a livelihood. Learn bamboo processing, product making (furniture, décor, agarbatti sticks, straws), and how to sell locally and online.',
    category: 'business',
    duration: 190,
    totalModules: 13,
    format: 'mixed',
    level: 'beginner',
    language: 'hindi',
    isMandatory: false,
    isTrending: false,
    thumbnailUrl: '/images/courses/bamboo-tech.jpg',
    instructorName: 'Malati Bora',
    rating: 4.6,
    enrolledCount: 2950,
    chapters: [
      {
        title: 'Bamboo as a Business Resource',
        lessons: [
          { title: 'Why Bamboo? Fast Growth, Low Cost, High Demand', duration: 12 },
          { title: 'Types of Bamboo in India & Their Commercial Uses', duration: 14 },
          { title: 'National Bamboo Mission: Grants & Support for Entrepreneurs', duration: 14 },
        ],
      },
      {
        title: 'Processing Bamboo',
        lessons: [
          { title: 'Harvesting, Treating & Seasoning Bamboo to Prevent Rot', duration: 16 },
          { title: 'Basic Tools & Machines for Cutting, Splitting & Shaping', duration: 16 },
          { title: 'Making Bamboo Boards & Sheets for Furniture & Construction', duration: 14 },
        ],
      },
      {
        title: 'Bamboo Product Ideas',
        lessons: [
          { title: 'Agarbatti Sticks: High-Volume, Low-Investment Production', duration: 16 },
          { title: 'Bamboo Straws, Cutlery & Eco-Tableware for Restaurants', duration: 14 },
          { title: 'Bamboo Furniture, Baskets & Home Décor for Local & Online Markets', duration: 16 },
          { title: 'Bamboo Flooring & Construction Panels: B2B Opportunity', duration: 14 },
        ],
      },
      {
        title: 'Selling Bamboo Products',
        lessons: [
          { title: 'Pricing, Branding & Packaging Your Bamboo Products', duration: 14 },
          { title: 'Selling on Marketplaces, Government Tenders & Export Platforms', duration: 14 },
          { title: 'Building a Bamboo Cooperative with Other Women in Your Village', duration: 16 },
        ],
      },
    ],
  },
  {
    id: 'course-008',
    title: 'Understanding Loans & Credit',
    description: 'Learn how loans work, what interest rates mean, and how to borrow responsibly.',
    category: 'personal-finance',
    duration: 75,
    totalModules: 5,
    format: 'mixed',
    level: 'intermediate',
    language: 'hindi',
    isMandatory: false,
    isTrending: false,
    thumbnailUrl: '/images/courses/loans-credit.jpg',
    instructorName: 'Rekha Menon',
    rating: 4.3,
    enrolledCount: 3210,
    chapters: [
      {
        title: 'How Credit Works',
        lessons: [
          { title: 'What Is a Loan and How Banks Decide to Lend', duration: 18 },
          { title: 'Understanding Interest Rates, EMIs & Loan Tenure', duration: 16 },
        ],
      },
      {
        title: 'Loan Options for Women Entrepreneurs',
        lessons: [
          { title: 'Mudra Loans, SHG Credit & Microfinance Explained', duration: 18 },
          { title: 'Comparing Loan Offers: Banks, NBFCs & Digital Lenders', duration: 14 },
        ],
      },
      {
        title: 'Borrowing Wisely',
        lessons: [
          { title: 'When to Borrow, When to Wait & How to Stay Debt-Free', duration: 9 },
        ],
      },
    ],
  },
]

const initialSpeakers: Speaker[] = [
  {
    id: 'speaker-001',
    name: 'Vandana Luthra',
    title: 'Founder, VLCC',
    bio: 'Started VLCC from a small clinic in Delhi, now a wellness empire across 330+ locations in 14 countries.',
    avatarUrl: '/images/speakers/vandana-luthra.jpg',
    expertise: ['entrepreneurship', 'business-growth', 'wellness'],
  },
  {
    id: 'speaker-002',
    name: 'Kalpana Saroj',
    title: 'Chairperson, Kamani Tubes',
    bio: 'From a child bride in a small village to leading a ₹100 crore company.',
    avatarUrl: '/images/speakers/kalpana-saroj.jpg',
    expertise: ['resilience', 'manufacturing', 'turnaround'],
  },
  {
    id: 'speaker-003',
    name: 'Falguni Nayar',
    title: 'Founder & CEO, Nykaa',
    bio: 'Left a successful banking career at 50 to start Nykaa.',
    avatarUrl: '/images/speakers/falguni-nayar.jpg',
    expertise: ['e-commerce', 'late-start', 'retail'],
  },
  {
    id: 'speaker-004',
    name: 'Ritu Kumar',
    title: 'Fashion Designer',
    bio: 'Pioneer of the Indian fashion industry who started with hand-block printing.',
    avatarUrl: '/images/speakers/ritu-kumar.jpg',
    expertise: ['fashion', 'crafts', 'branding'],
  },
]

const initialLiveSessions: LiveSession[] = [
  {
    id: 'session-001',
    title: 'From Kitchen to Company: My Entrepreneurship Journey',
    description: 'Vandana Luthra shares how she started VLCC from scratch.',
    speakerId: 'speaker-001',
    courseId: 'course-003',
    type: 'guest-speaker',
    scheduledAt: '2026-02-05T18:00:00+05:30',
    duration: 60,
    registeredCount: 2340,
    maxCapacity: 5000,
    isUpcoming: true,
    thumbnailUrl: '/images/sessions/vandana-talk.jpg',
  },
  {
    id: 'session-002',
    title: 'Overcoming Obstacles: A Story of Courage',
    description: "Kalpana Saroj's incredible journey.",
    speakerId: 'speaker-002',
    courseId: null,
    type: 'guest-speaker',
    scheduledAt: '2026-02-12T17:00:00+05:30',
    duration: 75,
    registeredCount: 1890,
    maxCapacity: 5000,
    isUpcoming: true,
    thumbnailUrl: '/images/sessions/kalpana-talk.jpg',
  },
  {
    id: 'session-003',
    title: 'Selling Online: 3-Day Bootcamp',
    description: 'Intensive bootcamp covering everything from product listing to customer service.',
    speakerId: null,
    courseId: 'course-004',
    type: 'bootcamp',
    scheduledAt: '2026-02-20T10:00:00+05:30',
    duration: 180,
    registeredCount: 450,
    maxCapacity: 500,
    isUpcoming: true,
    thumbnailUrl: '/images/sessions/selling-bootcamp.jpg',
  },
  {
    id: 'session-004',
    title: "It's Never Too Late: Starting at 50",
    description: 'Falguni Nayar discusses her decision to leave banking and start Nykaa at 50.',
    speakerId: 'speaker-003',
    courseId: null,
    type: 'guest-speaker',
    scheduledAt: '2026-03-08T18:30:00+05:30',
    duration: 60,
    registeredCount: 3120,
    maxCapacity: 5000,
    isUpcoming: true,
    thumbnailUrl: '/images/sessions/falguni-talk.jpg',
  },
]

const initialUserProgress: UserProgress[] = [
  {
    id: 'progress-001',
    courseId: 'course-001',
    completedModules: 8,
    percentComplete: 67,
    lastAccessedAt: '2026-01-25T14:30:00+05:30',
    status: 'in-progress',
    enrolledAt: '2026-01-10T09:00:00+05:30',
  },
  {
    id: 'progress-002',
    courseId: 'course-002',
    completedModules: 6,
    percentComplete: 100,
    lastAccessedAt: '2026-01-20T11:45:00+05:30',
    status: 'completed',
    enrolledAt: '2026-01-05T10:00:00+05:30',
    completedAt: '2026-01-20T11:45:00+05:30',
  },
  {
    id: 'progress-003',
    courseId: 'course-003',
    completedModules: 3,
    percentComplete: 19,
    lastAccessedAt: '2026-01-24T16:00:00+05:30',
    status: 'in-progress',
    enrolledAt: '2026-01-15T08:30:00+05:30',
  },
  {
    id: 'progress-004',
    courseId: 'course-007',
    completedModules: 0,
    percentComplete: 0,
    lastAccessedAt: null,
    status: 'enrolled',
    enrolledAt: '2026-01-26T10:00:00+05:30',
  },
]

const initialLearningGoals: LearningGoal[] = [
  {
    id: 'goal-001',
    title: 'Start my own business',
    description: 'I want to turn my tailoring skills into a small business',
    isActive: true,
    createdAt: '2026-01-05T09:00:00+05:30',
  },
  {
    id: 'goal-002',
    title: 'Learn to use technology',
    description: 'I want to be comfortable using smartphones and the internet',
    isActive: true,
    createdAt: '2026-01-05T09:00:00+05:30',
  },
]

const initialBadges: Badge[] = [
  {
    id: 'badge-001',
    title: 'Safety Champion',
    description: 'Completed the Cyber Security & Online Safety course',
    iconUrl: '/images/badges/safety-champion.svg',
    earnedAt: '2026-01-20T11:45:00+05:30',
    courseId: 'course-002',
    shareUrl: '/share/badge/safety-champion-abc123',
  },
  {
    id: 'badge-002',
    title: 'First Steps',
    description: 'Enrolled in your first course',
    iconUrl: '/images/badges/first-steps.svg',
    earnedAt: '2026-01-05T10:00:00+05:30',
    courseId: null,
    shareUrl: '/share/badge/first-steps-def456',
  },
  {
    id: 'badge-003',
    title: 'Goal Setter',
    description: 'Set your first learning goals',
    iconUrl: '/images/badges/goal-setter.svg',
    earnedAt: '2026-01-05T09:15:00+05:30',
    courseId: null,
    shareUrl: '/share/badge/goal-setter-ghi789',
  },
]

const initialCertificates: Certificate[] = [
  {
    id: 'cert-001',
    title: 'Cyber Security & Online Safety',
    issuedAt: '2026-01-20T11:45:00+05:30',
    courseId: 'course-002',
    certificateUrl: '/certificates/cert-001.pdf',
    shareUrl: '/share/certificate/cyber-security-abc123',
    validUntil: '2027-01-20T11:45:00+05:30',
  },
]

const initialCalendarEvents: CalendarEvent[] = [
  {
    id: 'event-001',
    title: 'Continue: Digital Literacy Fundamentals',
    type: 'course-reminder',
    courseId: 'course-001',
    sessionId: null,
    scheduledAt: '2026-01-27T10:00:00+05:30',
    isCompleted: false,
  },
  {
    id: 'event-002',
    title: 'Live: From Kitchen to Company',
    type: 'live-session',
    courseId: null,
    sessionId: 'session-001',
    scheduledAt: '2026-02-05T18:00:00+05:30',
    isCompleted: false,
  },
  {
    id: 'event-003',
    title: 'Bootcamp: Selling Online (Day 1)',
    type: 'bootcamp',
    courseId: null,
    sessionId: 'session-003',
    scheduledAt: '2026-02-20T10:00:00+05:30',
    isCompleted: false,
  },
  {
    id: 'event-004',
    title: 'Deadline: Complete Business Course Module 5',
    type: 'deadline',
    courseId: 'course-003',
    sessionId: null,
    scheduledAt: '2026-01-30T23:59:00+05:30',
    isCompleted: false,
  },
]

const categories: Category[] = [
  { id: 'digital-literacy', label: 'Digital Literacy', icon: 'smartphone' },
  { id: 'business', label: 'Business', icon: 'briefcase' },
  { id: 'communication', label: 'Communication', icon: 'message-circle' },
  { id: 'personal-finance', label: 'Personal Finance', icon: 'wallet' },
  { id: 'cyber-security', label: 'Cyber Security', icon: 'shield' },
  { id: 'entrepreneurship', label: 'Entrepreneurship', icon: 'rocket' },
]

const initialUserStats: UserStats = {
  coursesCompleted: 1,
  coursesInProgress: 3,
  totalLearningMinutes: 245,
  currentStreak: 5,
  longestStreak: 12,
  badgesEarned: 3,
  certificatesEarned: 1,
}

// =============================================================================
// Module-level mutable store (resets on server restart — prototype only)
// =============================================================================

interface ELearningStore {
  courses: Course[]
  speakers: Speaker[]
  liveSessions: LiveSession[]
  userProgress: UserProgress[]
  learningGoals: LearningGoal[]
  badges: Badge[]
  certificates: Certificate[]
  calendarEvents: CalendarEvent[]
  categories: Category[]
  userStats: UserStats
}

let store: ELearningStore = {
  courses: structuredClone(initialCourses),
  speakers: structuredClone(initialSpeakers),
  liveSessions: structuredClone(initialLiveSessions),
  userProgress: structuredClone(initialUserProgress),
  learningGoals: structuredClone(initialLearningGoals),
  badges: structuredClone(initialBadges),
  certificates: structuredClone(initialCertificates),
  calendarEvents: structuredClone(initialCalendarEvents),
  categories,
  userStats: structuredClone(initialUserStats),
}

// =============================================================================
// Read operations
// =============================================================================

export function getELearningData(): ELearningStore {
  return structuredClone(store)
}

export function getCourses(params?: { category?: string; search?: string }): Course[] {
  let courses = structuredClone(store.courses)
  if (params?.category) {
    courses = courses.filter((c) => c.category === params.category)
  }
  if (params?.search) {
    const q = params.search.toLowerCase()
    courses = courses.filter(
      (c) => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
    )
  }
  return courses
}

export function getCourseById(id: string): Course | null {
  return structuredClone(store.courses.find((c) => c.id === id) ?? null)
}

export function getLiveSessions(): LiveSession[] {
  return structuredClone(store.liveSessions)
}

export function getUserStats(): UserStats {
  return structuredClone(store.userStats)
}

export function getBadges(): Badge[] {
  return structuredClone(store.badges)
}

export function getCertificates(): Certificate[] {
  return structuredClone(store.certificates)
}

export function getCalendarEvents(): CalendarEvent[] {
  return structuredClone(store.calendarEvents)
}

export function getSessionById(id: string) {
  return structuredClone(store.liveSessions.find((s) => s.id === id) ?? null)
}

export function getSpeakerById(id: string) {
  return structuredClone(store.speakers.find((s) => s.id === id) ?? null)
}

export function getUserProgressForCourse(courseId: string) {
  return structuredClone(store.userProgress.find((p) => p.courseId === courseId) ?? null)
}

export function isRegisteredForSession(sessionId: string): boolean {
  return store.calendarEvents.some((e) => e.sessionId === sessionId)
}

// =============================================================================
// Write operations
// =============================================================================

export function enrollInCourse(courseId: string): UserProgress | null {
  if (!store.courses.find((c) => c.id === courseId)) return null
  if (store.userProgress.find((p) => p.courseId === courseId)) return null

  const newProgress: UserProgress = {
    id: `progress-${Date.now()}`,
    courseId,
    completedModules: 0,
    percentComplete: 0,
    lastAccessedAt: null,
    status: 'enrolled',
    enrolledAt: new Date().toISOString(),
  }

  store.userProgress.push(newProgress)
  store.userStats.coursesInProgress += 1

  // Award First Steps badge if first enrollment
  if (store.userProgress.length === 1) {
    store.badges.push({
      id: `badge-${Date.now()}`,
      title: 'First Steps',
      description: 'Enrolled in your first course',
      iconUrl: '/images/badges/first-steps.svg',
      earnedAt: new Date().toISOString(),
      courseId: null,
      shareUrl: `/share/badge/first-steps-${Date.now()}`,
    })
  }

  return structuredClone(newProgress)
}

export function updateCourseProgress(
  courseId: string,
  completedModules: number
): UserProgress | null {
  const progress = store.userProgress.find((p) => p.courseId === courseId)
  if (!progress) return null

  const course = store.courses.find((c) => c.id === courseId)
  if (!course) return null

  const wasCompleted = progress.status === 'completed'
  progress.completedModules = completedModules
  progress.percentComplete = Math.round((completedModules / course.totalModules) * 100)
  progress.lastAccessedAt = new Date().toISOString()

  if (completedModules >= course.totalModules && !wasCompleted) {
    progress.status = 'completed'
    progress.completedAt = new Date().toISOString()
    store.userStats.coursesCompleted += 1
    store.userStats.coursesInProgress = Math.max(0, store.userStats.coursesInProgress - 1)

    // Award course completion certificate
    store.certificates.push({
      id: `cert-${Date.now()}`,
      title: course.title,
      issuedAt: new Date().toISOString(),
      courseId,
      certificateUrl: `/certificates/cert-${Date.now()}.pdf`,
      shareUrl: `/share/certificate/${courseId}-${Date.now()}`,
      validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    })
    store.userStats.certificatesEarned += 1
  } else if (progress.status === 'enrolled' && completedModules > 0) {
    progress.status = 'in-progress'
  }

  return structuredClone(progress)
}

export function registerForSession(sessionId: string): { registered: boolean; session: LiveSession | null } {
  const session = store.liveSessions.find((s) => s.id === sessionId)
  if (!session || !session.isUpcoming) return { registered: false, session: null }
  if (session.registeredCount >= session.maxCapacity) return { registered: false, session: null }

  session.registeredCount += 1

  // Add calendar event
  store.calendarEvents.push({
    id: `event-${Date.now()}`,
    title: `Live: ${session.title}`,
    type: session.type === 'bootcamp' ? 'bootcamp' : 'live-session',
    courseId: session.courseId,
    sessionId,
    scheduledAt: session.scheduledAt,
    isCompleted: false,
  })

  return { registered: true, session: structuredClone(session) }
}

export function createLearningGoal(
  goal: Omit<LearningGoal, 'id' | 'createdAt'>
): LearningGoal {
  const newGoal: LearningGoal = {
    ...goal,
    id: `goal-${Date.now()}`,
    createdAt: new Date().toISOString(),
  }
  store.learningGoals.push(newGoal)
  return structuredClone(newGoal)
}
