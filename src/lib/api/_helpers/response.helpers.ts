export async function parseJsonResponse<T>(response: Response): Promise<T> {
  const data: unknown = await response.json();
  return data as T;
}

export async function parseApiError(response: Response): Promise<string> {
  const json: unknown = await response.json().catch(() => null);
  if (typeof json === "object" && json !== null && "message" in json) {
    const msg = (json as Record<string, unknown>)["message"];
    return typeof msg === "string" ? msg : "Operation failed";
  }
  return "Operation failed";
}
