export function buildQueryString(params?: object | null): string {
  if (!params) return "";
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value == null) continue;
    if (Array.isArray(value)) {
      for (const item of value) {
        if (item != null) searchParams.append(key, String(item));
      }
    } else {
      searchParams.set(key, String(value));
    }
  }
  return searchParams.toString();
}
