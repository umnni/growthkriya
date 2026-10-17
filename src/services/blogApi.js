
const API = "/api/blogs.php";

async function request(action, options = {}, params = {}) {
  const query = new URLSearchParams({
    action,
    ...params,
  });

  const response = await fetch(`${API}?${query.toString()}`, {
    credentials: "same-origin",
    cache: "no-store",
    ...options,
  });

  const data = await response.json().catch(() => ({
    message: "Invalid server response",
  }));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

function jsonOptions(data, token = "") {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": token,
    },
    body: JSON.stringify(data),
  };
}

export const getBlogs = () => request("list");

export const getBlogBySlug = (slug) =>
  request("post", {}, { slug });

export const getAdminSession = () =>
  request("session");

export const adminLogin = (username, password) =>
  request("login", jsonOptions({ username, password }));

export const adminLogout = (token) =>
  request("logout", jsonOptions({}, token));

export const getAdminBlogs = () =>
  request("admin-list");

export const saveBlog = (blog, token) =>
  request("save", jsonOptions(blog, token));

export const deleteBlog = (id, token) =>
  request("delete", jsonOptions({ id }, token));

export const uploadBlogImage = (file, token) => {
  const data = new FormData();
  data.append("image", file);

  return request("upload", {
    method: "POST",
    headers: { "X-CSRF-Token": token },
    body: data,
  });
};
