import { createClient } from 'next-sanity';

export const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-10-01',
  useCdn: true,
  token: process.env.SANITY_READ_TOKEN,
});

export const sanityFetch = async <T>({ query, params = {}, tags = [] }: { query: string; params?: Record<string, any>; tags?: string[] }): Promise<T> =>
  sanity.fetch<T>(query, params, { next: { tags, revalidate: 60 } });
