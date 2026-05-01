import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

// ─── Env Validation ───────────────────────────────────────────────────────────
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
if (!backendUrl) throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined");

const REFRESH_URL = "/auth/refresh";

// ─── Refresh Queue (handles concurrent 401s) ──────────────────────────────────
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(null)));
  failedQueue = [];
};

// ─── Instance ─────────────────────────────────────────────────────────────────
const apiPrivate: AxiosInstance = axios.create({
  baseURL: `${backendUrl}/api`,
  withCredentials: true, // sends accessToken + refreshToken cookies automatically
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── Response Interceptor ─────────────────────────────────────────────────────
apiPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    const is401 = error.response?.status === 401;
    const isRefreshRoute = original.url === REFRESH_URL;

    // Don't intercept non-401s, already-retried requests, or the refresh route itself
    if (!is401 || original._retry || isRefreshRoute) {
      return Promise.reject(error);
    }

    // ── Concurrent request handling ──
    // If a refresh is already in progress, queue this request
    // and wait for the refresh to complete before retrying
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(() => apiPrivate(original))
        .catch((err) => Promise.reject(err));
    }

    original._retry = true;
    isRefreshing = true;

    try {
      
      await apiPrivate.post(REFRESH_URL);

      // Unblock all queued requests
      processQueue(null);

      // Retry the original request with the new accessToken cookie
      return apiPrivate(original);
    } catch (err) {
      // Refresh failed — session is invalid, reject all queued requests
      processQueue(err);

      // Redirect to login only if not already there
      if (
        typeof window !== "undefined" &&
        !window.location.pathname.startsWith("/signin&signup-auth")
      ) {
        window.location.href = "/signin&signup-auth";
      }

      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);

export default apiPrivate;

// ─── Error Utility ────────────────────────────────────────────────────────────
export function parseErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? "Something went wrong";
  }
  return "An unexpected error occurred";
}