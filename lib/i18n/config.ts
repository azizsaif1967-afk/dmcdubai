export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';
export const dir = (l: string) => (l === 'ar' ? 'rtl' : 'ltr');
