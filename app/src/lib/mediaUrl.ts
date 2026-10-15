const configuredBase = (import.meta.env.VITE_NETSO_ASSET_BASE_URL ?? "").replace(/\/$/, "");

export function buildAssetUrl(path: string, base = configuredBase): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}
