export const API_URL = process.env.NEXT_PUBLIC_API_URL!;

/**
 * Converts any http:// image URL to https:// to avoid mixed-content
 * blocking when the frontend is served over HTTPS.
 */
export function toHttps(url?: string | null): string | undefined {
  if (!url) return undefined;
  return url.replace(/^http:\/\//i, "https://");
}
