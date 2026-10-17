
import { useEffect, useMemo, useState } from "react";
import {
  LogIn, LogOut, Plus, Save, Trash2, UploadCloud,
  Search, FileText, Eye, ImagePlus, LoaderCircle,
  ExternalLink, LayoutDashboard, BookOpen
} from "lucide-react";

import {
  getAdminSession,
  adminLogin,
  adminLogout,
  getAdminBlogs,
  saveBlog,
  deleteBlog,
  uploadBlogImage,
} from "../services/blogApi";

import RichTextEditor, {
  normaliseBlogContent,
} from "../components/RichTextEditor";

const emptyBlog = {
  id: "",
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "Insights",
  author: "Growth Kriya",
  featuredImage: "",
  imageAlt: "",
  seoTitle: "",
  seoDescription: "",
  status: "draft",
};

const categories = [
  "Insights", "Media", "Printing",
  "Gifting", "Digital", "Branding"
];

const inputClass =
  "mt-2 w-full rounded-xl border border-[#dfe1ed] bg-white px-4 py-3 text-[14px] outline-none focus:border-[#00004d]";

function makeSlug(text) {
  return text.toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function StatusBadge({ status }) {
  return (
    <span className="rounded-full bg-[#e5eaff] px-3 py-1 text-[11px] font-bold capitalize text-[#00004d]">
      {status || "draft"}
    </span>
  );
}

export default function BlogAdmin() {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [csrf, setCsrf] = useState("");

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [blogs, setBlogs] = useState([]);
  const [selected, setSelected] = useState({ ...emptyBlog });
  const [editorKey, setEditorKey] = useState(0);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [working, setWorking] = useState(false);
  const [uploading, setUploading] = useState(false);

  const refreshBlogs = async () => {
    const result = await getAdminBlogs();
    setBlogs(result.blogs || []);
  };

  useEffect(() => {
    let active = true;
    document.title = "Blog Admin | Growth Kriya";

    getAdminSession()
      .then(async (result) => {
        if (!active) return;

        setAuthenticated(result.authenticated);
        setCsrf(result.csrfToken || "");

        if (result.authenticated) {
          const data = await getAdminBlogs();
          if (active) setBlogs(data.blogs || []);
        }
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setChecking(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        `${blog.title} ${blog.category}`
          .toLowerCase()
          .includes(search.toLowerCase());

      return matchesSearch &&
        (filter === "all" || blog.status === filter);
    });
  }, [blogs, search, filter]);

  const publishedCount = blogs.filter(
    (blog) => blog.status === "published"
  ).length;

  const update = (key, value) => {
    setSelected((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const openBlog = (blog) => {
    setSelected({
      ...blog,
      content: normaliseBlogContent(blog.content),
    });

    setEditorKey((prev) => prev + 1);
    setError("");
    setMessage("");
  };

  const newBlog = () => {
    setSelected({ ...emptyBlog });
    setEditorKey((prev) => prev + 1);
    setError("");
    setMessage("");
  };

  const login = async (e) => {
    e.preventDefault();
    setWorking(true);
    setError("");

    try {
      const result = await adminLogin(
        credentials.username,
        credentials.password
      );

      setAuthenticated(true);
      setCsrf(result.csrfToken || "");
      setCredentials({
        username: "",
        password: "",
      });

      await refreshBlogs();
    } catch (err) {
      setError(err.message);
    } finally {
      setWorking(false);
    }
  };

  const logout = async () => {
    setError("");

    try {
      await adminLogout(csrf);

      setAuthenticated(false);
      setCsrf("");
      setBlogs([]);
      newBlog();
    } catch (err) {
      setError(err.message);
    }
  };

  const save = async (status) => {
    const content = normaliseBlogContent(selected.content);

    const temporary = document.createElement("div");
    temporary.innerHTML = content;

    const plainText =
      temporary.textContent?.trim() || "";

    if (!selected.title.trim() || !plainText) {
      setError("Blog title aur content required hain.");
      return;
    }

    setWorking(true);
    setError("");
    setMessage("");

    try {
      const result = await saveBlog({
        ...selected,
        slug: selected.slug || makeSlug(selected.title),
        content,
        status,
      }, csrf);

      setSelected({
        ...result.blog,
        content: normaliseBlogContent(result.blog.content),
      });

      await refreshBlogs();

      setMessage(
        status === "published"
          ? "Blog successfully published."
          : "Draft saved successfully."
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setWorking(false);
    }
  };

  const remove = async () => {
    if (!selected.id) return;

    if (!window.confirm(
      `Delete "${selected.title}" permanently?`
    )) {
      return;
    }

    setWorking(true);
    setError("");
    setMessage("");

    try {
      await deleteBlog(selected.id, csrf);
      await refreshBlogs();
      newBlog();
      setMessage("Blog deleted successfully.");
    } catch (err) {
      setError(err.message);
    } finally {
      setWorking(false);
    }
  };

  const upload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setMessage("");

    if (file.size > 3 * 1024 * 1024) {
      setError("Maximum image size 3MB honi chahiye.");
      e.target.value = "";
      return;
    }

    setUploading(true);

    try {
      const result = await uploadBlogImage(file, csrf);

      update("featuredImage", result.url);

      setMessage(
        "Image uploaded. Ab blog save kar do."
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center gap-3 bg-[#f3f4fa] pt-24">
        <LoaderCircle className="animate-spin text-[#00004d]" />
        Checking session...
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f3f4fa] px-5 py-36">
        <div className="w-full max-w-[440px] rounded-[28px] bg-white p-8 shadow-[0_20px_70px_rgba(0,0,77,.08)] md:p-11">
          <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#00004d] text-white">
            <LogIn size={28} />
          </div>

          <p className="mb-3 text-[12px] font-extrabold uppercase tracking-[.18em] text-[#00004d]">
            Growth Kriya CMS
          </p>

          <h1 className="text-[35px] font-extrabold tracking-[-.055em]">
            Admin Login
          </h1>

          <p className="mt-3 text-[14px] leading-7 text-[#777989]">
            Sign in to manage your blog posts.
          </p>

          <form onSubmit={login} className="mt-9 space-y-5">
            <label className="block text-[13px] font-bold">
              Username
              <input
                required
                autoComplete="username"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
                className={inputClass}
              />
            </label>

            <label className="block text-[13px] font-bold">
              Password
              <input
                required
                type="password"
                autoComplete="current-password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className={inputClass}
              />
            </label>

            {error && (
              <p role="alert" className="text-[13px] text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={working}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#00004d] px-6 py-4 text-[14px] font-bold text-white disabled:opacity-50"
            >
              {working
                ? "Signing in..."
                : "Login to Dashboard"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f3f4fa] px-4 pb-20 pt-32 md:px-8">
      <div className="mx-auto max-w-[1500px]">

        {/* DASHBOARD HEADER */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-5">
          <div>
            <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[.2em] text-[#00004d]">
              Growth Kriya / Content Management
            </p>

            <h1 className="text-[clamp(30px,4vw,48px)] font-extrabold tracking-[-.055em]">
              Blog Dashboard
            </h1>

            <p className="mt-2 text-[14px] text-[#777989]">
              Create, edit, format and publish your blogs.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="/blogs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#dfe1ed] bg-white px-5 py-3 text-[13px] font-bold"
            >
              View Website <ExternalLink size={15} />
            </a>

            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-full bg-[#00004d] px-5 py-3 text-[13px] font-bold text-white"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {/* DASHBOARD STATS */}
        <div className="mb-7 grid gap-4 sm:grid-cols-3">
          {[
            ["Total Blogs", blogs.length, LayoutDashboard],
            ["Published", publishedCount, BookOpen],
            ["Drafts", blogs.length - publishedCount, FileText],
          ].map(([title, number, Icon]) => (
            <div
              key={title}
              className="flex items-center justify-between rounded-[20px] bg-white p-6"
            >
              <div>
                <p className="text-[12px] font-semibold text-[#777989]">
                  {title}
                </p>
                <p className="mt-2 text-[30px] font-extrabold text-[#00004d]">
                  {number}
                </p>
              </div>

              <Icon size={27} className="text-[#00004d]" />
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">

          {/* BLOG LIST */}
          <aside className="self-start overflow-hidden rounded-[22px] border border-[#e2e3ef] bg-white lg:sticky lg:top-[105px]">
            <div className="border-b border-[#e8e9f0] p-5">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-[18px] font-extrabold">
                  All Blogs
                </h2>

                <span className="rounded-full bg-[#eef0fa] px-3 py-1 text-[12px] font-bold text-[#00004d]">
                  {blogs.length}
                </span>
              </div>

              <button
                type="button"
                onClick={newBlog}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#00004d] px-5 py-3 text-[13px] font-bold text-white"
              >
                <Plus size={17} /> Create New Blog
              </button>

              <div className="relative mt-5">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999baa]"
                />

                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search blogs..."
                  className="w-full rounded-xl border border-[#e1e3ee] py-3 pl-10 pr-3 text-[13px] outline-none focus:border-[#00004d]"
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {["all", "published", "draft"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setFilter(item)}
                    className={`rounded-full px-3 py-2 text-[11px] font-bold capitalize ${
                      filter === item
                        ? "bg-[#00004d] text-white"
                        : "bg-[#eef0fa] text-[#53566e]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="max-h-[600px] overflow-y-auto p-3">
              {filtered.length === 0 ? (
                <p className="p-5 text-center text-[13px] text-[#858797]">
                  No blogs found.
                </p>
              ) : (
                filtered.map((blog) => (
                  <button
                    key={blog.id}
                    type="button"
                    onClick={() => openBlog(blog)}
                    className={`mb-2 flex w-full items-start gap-3 rounded-xl p-3 text-left transition ${
                      selected.id === blog.id
                        ? "bg-[#e5eaff]"
                        : "hover:bg-[#f5f6fb]"
                    }`}
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#eef0fa]">
                      {blog.featuredImage ? (
                        <img
                          src={blog.featuredImage}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <FileText
                          size={23}
                          className="text-[#00004d]"
                        />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-[13px] font-bold leading-5">
                        {blog.title}
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <StatusBadge status={blog.status} />
                        <span className="text-[10px] text-[#888a9b]">
                          {blog.category}
                        </span>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </aside>

          {/* MAIN BLOG EDITOR */}
          <section className="min-w-0 rounded-[22px] border border-[#e2e3ef] bg-white p-5 md:p-8">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#e7e8f0] pb-6">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[.18em] text-[#00004d]">
                  {selected.id
                    ? "Edit Existing Article"
                    : "Create New Article"}
                </p>

                <h2 className="mt-2 text-[28px] font-extrabold tracking-[-.04em]">
                  Blog Editor
                </h2>
              </div>

              <StatusBadge status={selected.status} />
            </div>

            <div className="grid gap-6 md:grid-cols-2">

              {/* TITLE */}
              <label className="block text-[13px] font-bold md:col-span-2">
                Blog Title *
                <input
                  value={selected.title}
                  onChange={(e) => {
                    const title = e.target.value;

                    setSelected((prev) => ({
                      ...prev,
                      title,
                      slug: !prev.id
                        ? makeSlug(title)
                        : prev.slug,
                    }));
                  }}
                  placeholder="Enter blog title"
                  className={inputClass}
                />
              </label>

              {/* SLUG */}
              <label className="block text-[13px] font-bold">
                URL Slug *
                <input
                  value={selected.slug}
                  onChange={(e) =>
                    update("slug", makeSlug(e.target.value))
                  }
                  placeholder="your-blog-url"
                  className={inputClass}
                />
              </label>

              {/* CATEGORY */}
              <label className="block text-[13px] font-bold">
                Category
                <select
                  value={selected.category}
                  onChange={(e) =>
                    update("category", e.target.value)
                  }
                  className={inputClass}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>

              {/* AUTHOR */}
              <label className="block text-[13px] font-bold">
                Author
                <input
                  value={selected.author}
                  onChange={(e) =>
                    update("author", e.target.value)
                  }
                  className={inputClass}
                />
              </label>

              {/* STATUS */}
              <label className="block text-[13px] font-bold">
                Current Status
                <input
                  readOnly
                  value={selected.status}
                  className={`${inputClass} bg-[#f5f6fa] capitalize`}
                />
              </label>

              {/* EXCERPT */}
              <label className="block text-[13px] font-bold md:col-span-2">
                Short Excerpt
                <textarea
                  rows={3}
                  value={selected.excerpt}
                  onChange={(e) =>
                    update("excerpt", e.target.value)
                  }
                  placeholder="Short description for blog cards..."
                  className={`${inputClass} resize-y`}
                />
              </label>

              {/* RICH TEXT EDITOR */}
              <div className="min-w-0 md:col-span-2">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-[15px] font-extrabold">
                      Blog Content *
                    </h3>

                    <p className="mt-1 text-[12px] text-[#8a8c9b]">
                      Fonts, colours, headings, lists,
                      alignment and links.
                    </p>
                  </div>

                  <span className="rounded-full bg-[#e5eaff] px-3 py-2 text-[11px] font-bold text-[#00004d]">
                    Rich Text Editor
                  </span>
                </div>

                <RichTextEditor
                  key={editorKey}
                  initialContent={selected.content}
                  onChange={(html) => update("content", html)}
                />
              </div>

              {/* FEATURED IMAGE */}
              <div className="md:col-span-2">
                <h3 className="mb-4 text-[17px] font-extrabold">
                  Featured Image
                </h3>

                <div className="overflow-hidden rounded-[20px] border border-dashed border-[#bfc5df] bg-[#f7f8fc] p-5">
                  {selected.featuredImage ? (
                    <div className="relative mb-5 overflow-hidden rounded-xl">
                      <img
                        src={selected.featuredImage}
                        alt={selected.imageAlt || "Blog cover"}
                        className="max-h-[300px] w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          update("featuredImage", "")
                        }
                        className="absolute right-3 top-3 rounded-full bg-white px-4 py-2 text-[12px] font-bold text-red-600 shadow"
                      >
                        Remove Image
                      </button>
                    </div>
                  ) : (
                    <div className="flex min-h-[160px] flex-col items-center justify-center text-[#9297b1]">
                      <ImagePlus size={37} />

                      <p className="mt-3 text-[13px]">
                        No cover image selected
                      </p>
                    </div>
                  )}

                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#00004d] px-6 py-3 text-[13px] font-bold text-white">
                    <UploadCloud size={17} />

                    {uploading
                      ? "Uploading..."
                      : "Upload Cover Image"}

                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={upload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>

                  <p className="mt-3 text-[11px] text-[#858797]">
                    JPG, PNG or WebP. Maximum 3MB.
                    Recommended 1200 × 675 px.
                  </p>
                </div>
              </div>

              {/* IMAGE ALT */}
              <label className="block text-[13px] font-bold md:col-span-2">
                Image Alt Text
                <input
                  value={selected.imageAlt}
                  onChange={(e) =>
                    update("imageAlt", e.target.value)
                  }
                  placeholder="Describe featured image"
                  className={inputClass}
                />
              </label>

              {/* SEO */}
              <div className="border-t border-[#e7e8f0] pt-7 md:col-span-2">
                <h3 className="text-[21px] font-extrabold">
                  SEO Settings
                </h3>

                <p className="mt-2 text-[13px] text-[#888a9b]">
                  Custom page title and meta description.
                </p>
              </div>

              <label className="block text-[13px] font-bold md:col-span-2">
                SEO Title
                <input
                  value={selected.seoTitle}
                  onChange={(e) =>
                    update("seoTitle", e.target.value)
                  }
                  placeholder="SEO page title"
                  className={inputClass}
                />
              </label>

              <label className="block text-[13px] font-bold md:col-span-2">
                SEO Description
                <textarea
                  rows={3}
                  value={selected.seoDescription}
                  onChange={(e) =>
                    update("seoDescription", e.target.value)
                  }
                  placeholder="Search engine description..."
                  className={`${inputClass} resize-y`}
                />
              </label>
            </div>

            {/* FEEDBACK */}
            {error && (
              <div
                role="alert"
                className="mt-7 rounded-xl bg-red-50 p-4 text-[13px] text-red-700"
              >
                {error}
              </div>
            )}

            {message && (
              <div
                role="status"
                className="mt-7 rounded-xl bg-[#eef0fa] p-4 text-[13px] font-semibold text-[#00004d]"
              >
                {message}
              </div>
            )}

            {/* BUTTONS */}
            <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-[#e7e8f0] pt-7">

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled={working || uploading}
                  onClick={() => save("draft")}
                  className="inline-flex items-center gap-2 rounded-full border border-[#00004d] px-6 py-3.5 text-[13px] font-bold text-[#00004d] disabled:opacity-50"
                >
                  <Save size={17} /> Save Draft
                </button>

                <button
                  type="button"
                  disabled={working || uploading}
                  onClick={() => save("published")}
                  className="inline-flex items-center gap-2 rounded-full bg-[#00004d] px-6 py-3.5 text-[13px] font-bold text-white disabled:opacity-50"
                >
                  <Eye size={17} />

                  {working
                    ? "Saving..."
                    : "Publish Blog"}
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                {selected.id &&
                  selected.status === "published" && (
                    <a
                      href={`/blogs/${selected.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#eef0fa] px-5 py-3.5 text-[13px] font-bold text-[#00004d]"
                    >
                      View Blog
                      <ExternalLink size={16} />
                    </a>
                  )}

                {selected.id && (
                  <button
                    type="button"
                    disabled={working}
                    onClick={remove}
                    className="inline-flex items-center gap-2 rounded-full bg-red-50 px-5 py-3.5 text-[13px] font-bold text-red-600 disabled:opacity-50"
                  >
                    <Trash2 size={17} />
                    Delete
                  </button>
                )}
              </div>
            </div>

            <p className="mt-5 text-[12px] leading-6 text-[#9294a2]">
              Save Draft keeps the article hidden.
              Publish Blog makes it visible to visitors.
              Remember to save after editing.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
