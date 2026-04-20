import { API_BASE_URL, API_KEY } from './config';

export class ApiError extends Error {
  public readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

export async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const headers = new Headers(init.headers);
  headers.set('x-api-key', API_KEY);
  if (!headers.has('Accept')) headers.set('Accept', 'application/json');

  const response = await fetch(url, { ...init, headers });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const body = (await response.json()) as { message?: string };
      if (body && typeof body.message === 'string') message = body.message;
    } catch {
      /* body is not JSON */
    }
    throw new ApiError(message, response.status);
  }

  return (await response.json()) as T;
}
