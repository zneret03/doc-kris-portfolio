// The canonical origin for metadata, sitemaps, structured data and social
// images. Social networks need absolute image URLs, so production must set
// NEXT_PUBLIC_SITE_URL (or run on Vercel, which provides its own URL).
export function getSiteUrl(env: NodeJS.ProcessEnv = process.env): URL {
  if (env.NEXT_PUBLIC_SITE_URL) {
    return new URL(env.NEXT_PUBLIC_SITE_URL);
  }

  const vercelHost = env.VERCEL_PROJECT_PRODUCTION_URL ?? env.VERCEL_URL;
  if (vercelHost) {
    return new URL(`https://${vercelHost}`);
  }

  return new URL(`http://localhost:${env.PORT ?? 3000}`);
}

export function absoluteUrl(path: string, env?: NodeJS.ProcessEnv): string {
  return new URL(path, getSiteUrl(env)).toString();
}

// Vercel preview deployments shouldn't compete with production in search.
export function isIndexable(env: NodeJS.ProcessEnv = process.env): boolean {
  return env.VERCEL_ENV !== "preview";
}
