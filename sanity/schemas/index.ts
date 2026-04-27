import service from './service';
import industry from './industry';
import insight from './insight';
import faq from './faq';
import testimonial from './testimonial';
import kpi from './kpi';
import teamMember from './teamMember';
import legalPage from './legalPage';
import siteSettings from './siteSettings';
import redirect from './redirect';
import { localeString, localeText, localePortableText, seo } from './objects';

export const schemaTypes = [
  service, industry, insight, faq, testimonial, kpi, teamMember, legalPage, siteSettings, redirect,
  localeString, localeText, localePortableText, seo,
];
