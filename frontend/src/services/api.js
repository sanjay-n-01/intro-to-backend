const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.message || "Something went wrong. Please try again.");
  }
  return payload;
}

export const loginUser = (credentials) =>
  request("/users/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

export const registerUser = (userData) =>
  request("/users/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });

export const logoutUser = (email) =>
  request("/users/logout", {
    method: "POST",
    body: JSON.stringify({ email }),
  });

export const getPosts = () => request("/posts/getPosts");

export const createPost = (postData) =>
  request("/posts/create", {
    method: "POST",
    body: JSON.stringify(postData),
  });

export const updatePost = (id, postData) =>
  request(`/posts/updatePost/${id}`, {
    method: "PATCH",
    body: JSON.stringify(postData),
  });

export const deletePost = (id) =>
  request(`/posts/deletePost/${id}`, { method: "DELETE" });
