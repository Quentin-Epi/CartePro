export async function api<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`/api${path}`, options);

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status}`,
    );
  }

  return response.json() as Promise<T>;
}

// e.g.: const health = await api<{ status: string }>("/health");
// const url = await api<{ url: string }>("api_url sans api au début")
