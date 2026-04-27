// Sourced from https://www.dmcdubai.com (extracted 2026-04-27)
// Use this as the seed for Sanity siteSettings + service/industry docs.

export const siteContent = {
  company: {
    legalName: 'Decision Management Consultants',
    shortName: 'DMC',
    established: 1990,
    tagline: {
      en: 'Insight that drives business forward',
      ar: 'رؤى تدفع الأعمال إلى الأمام',
    },
    subTagline: {
      en: 'Global-standard advisory in company formation, digital strategy, and tax compliance',
      ar: 'استشارات بمعايير عالمية في تأسيس الشركات والاستراتيجية الرقمية والامتثال الضريبي',
    },
  },
  contact: {
    email: 'info@dmcdubai.com',
    phone: '+971 4 262 4023',
    phoneRaw: '+97142624023',
    whatsapp: '+97142624023',
    address: {
      en: '601, Hamid Bin Soughat Building, Opp. Crowne Plaza Hotel, Salahuddin Road, Deira, Dubai, PO Box 82961, United Arab Emirates',
      ar: '601، مبنى حامد بن صوغات، مقابل فندق كراون بلازا، شارع صلاح الدين، ديرة، دبي، ص.ب 82961، الإمارات العربية المتحدة',
    },
    hours: 'Monday – Friday: 9:00 AM – 6:30 PM',
  },
  social: {
    facebook: 'https://www.facebook.com/decisionmanagementconsultants',
    linkedin: 'https://www.linkedin.com/company/dmc-dubai/',
    instagram: 'https://www.instagram.com/dmcdubai/',
    twitter: 'https://x.com/mydmcdubai',
  },
  associatedBrands: ['Mideast Accounting', 'Fastlink Outsourcing'],
  trust: {
    yearsExperience: 35, // 1990 → 2026 (rounded; replace with confirmed value)
    clientsServed: 900,
    industriesServed: 7,
    googleRating: 4.8,
  },
  services: [
    { num: '01', slug: 'company-formation', en: 'Company Formation', ar: 'تأسيس الشركات', desc_en: 'Mainland, free zone and offshore company setup with end-to-end licensing.', desc_ar: 'تأسيس الشركات في البر الرئيسي والمناطق الحرة والأوفشور مع ترخيص كامل.' },
    { num: '02', slug: 'tax-advisory', en: 'Tax Advisory', ar: 'الاستشارات الضريبية', desc_en: 'VAT, corporate tax, ESR and transfer pricing — registration to filing.', desc_ar: 'ضريبة القيمة المضافة وضريبة الشركات والامتثال الاقتصادي وتسعير التحويل — من التسجيل إلى الإقرار.' },
    { num: '03', slug: 'digital-marketing', en: 'Digital Marketing', ar: 'التسويق الرقمي', desc_en: 'SEO, paid media and content strategy for UAE-based businesses.', desc_ar: 'تحسين محركات البحث والإعلانات المدفوعة والمحتوى للشركات في الإمارات.' },
    { num: '04', slug: 'visas-immigration', en: 'Visas & Immigration', ar: 'التأشيرات والإقامة', desc_en: 'Investor, employment, family and Golden Visa processing.', desc_ar: 'تأشيرات المستثمرين والعمل والعائلة والإقامة الذهبية.' },
    { num: '05', slug: 'pro-services', en: 'PRO & Government Liaison', ar: 'خدمات المعاملات الحكومية', desc_en: 'Document attestation, MOFA, MOL, GDRFA and licensing renewals.', desc_ar: 'تصديق الوثائق ومعاملات الجهات الحكومية وتجديد التراخيص.' },
    { num: '06', slug: 'accounting-bookkeeping', en: 'Accounting & Bookkeeping', ar: 'المحاسبة ومسك الدفاتر', desc_en: 'Outsourced accounting via Mideast Accounting — IFRS-compliant reporting.', desc_ar: 'محاسبة خارجية عبر Mideast Accounting — تقارير متوافقة مع المعايير الدولية.' },
  ],
  industries: [
    { slug: 'tourism-hospitality', en: 'Tourism, Hospitality & Leisure', ar: 'السياحة والضيافة والترفيه' },
    { slug: 'manufacturing', en: 'Manufacturing', ar: 'التصنيع' },
    { slug: 'consumer-business', en: 'Consumer Business', ar: 'الأعمال الاستهلاكية' },
    { slug: 'technology-media-telecom', en: 'Technology, Media & Telecom', ar: 'التكنولوجيا والإعلام والاتصالات' },
    { slug: 'it-services', en: 'IT Software & Hardware Services', ar: 'خدمات تكنولوجيا المعلومات' },
    { slug: 'real-estate-construction', en: 'Real Estate & Construction', ar: 'العقارات والإنشاءات' },
    { slug: 'retail-distribution-fmcg', en: 'Retail, Distribution & FMCG', ar: 'التجزئة والتوزيع والسلع الاستهلاكية' },
  ],
  navigation: ['home', 'services', 'industries', 'tools', 'insights', 'about', 'contact'],
} as const;
