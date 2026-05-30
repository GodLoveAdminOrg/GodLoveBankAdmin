// Centralized server base URL.
// Override via VITE_API_BASE_URL in your .env (e.g. http://18.204.175.233:3001).
export const SERVER_URL =
  import.meta.env.VITE_API_BASE_URL || "http://18.204.175.233:3001";

// Build a full URL for a server-relative file/image path.
export const fileUrl = (path) =>
  path ? `${SERVER_URL}/${String(path).replace(/^\/+/, "")}` : null;
