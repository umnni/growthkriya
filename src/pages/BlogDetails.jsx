
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DOMPurify from "dompurify";

import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  UserRound,
  BookOpen,
  LoaderCircle,
} from "lucide-react";

import { getBlogBySlug } from "../services/blogApi";

import {
  normaliseBlogContent
} from "../components/RichTextEditor";

function formatDate(value) {
  if (!value) return "";

  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogDetails() {
  const { slug } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    setLoading(true);
    setBlog(null);
    setError("");

    const oldTitle = document.title;
    const meta = document.querySelector(
      'meta[name="description"]'
    );

    const oldDescription = meta?.content || "";

    getBlogBySlug(slug)
      .then((result) => {
        if (!active) return;

        setBlog(result.blog);

        document.title =
          (result.blog.seoTitle || result.blog.title) +
          " | Growth Kriya";

        if (meta) {
          meta.content =
            result.blog.seoDescription ||
            result.blog.excerpt ||
            "";
        }
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      document.title = oldTitle;

      if (meta) {
        meta.content = oldDescription;
      }
    };
  }, [slug]);

  const safeHTML = useMemo(() => {
    if (!blog) return "";

    return DOMPurify.sanitize(
      normaliseBlogContent(blog.content),
      {
        USE_PROFILES: { html: true },
        FORBID_TAGS: [
          "script", "style", "iframe",
          "object", "embed", "form"
        ],
      }
    );
  }, [blog]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center gap-3 bg-[#f8f8f6] pt-24 text-[#00004d]">
        <LoaderCircle className="animate-spin" />
        Loading article...
      </main>
    );
  }

  if (error || !blog) {
    return (
      <main className="min-h-screen bg-[#f8f8f6] px-5 pb-24 pt-44 text-center">
        <h1 className="text-4xl font-extrabold">
          Article not found
        </h1>

        <p className="mt-5 text-[#686b7c]">
          This article may have been removed or unpublished.
        </p>

        <Link
          to="/blogs"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#00004d] px-6 py-3 text-white"
        >
          <ArrowLeft size={17} />
          Back to Blogs
        </Link>
      </main>
    );
  }

  return (
    <main className="overflow-hidden bg-[#f8f8f6] text-[#191b25]">

      {/* HERO */}
      <section className="bg-[#00004d] px-5 pb-20 pt-40 text-white md:px-10 lg:pb-28 xl:px-16">
        <div className="mx-auto max-w-[1100px]">
          <Link
            to="/blogs"
            className="mb-10 inline-flex items-center gap-2 text-[13px] font-bold text-[#cbd7ff]"
          >
            <ArrowLeft size={17} />
            Back to Blogs
          </Link>

          <p className="mb-6 text-[12px] font-extrabold uppercase tracking-[.2em] text-[#cbd7ff]">
            Growth Kriya / {blog.category}
          </p>

          <h1
            className="text-[clamp(42px,6vw,88px)] font-extrabold leading-[1.12] tracking-[-.065em]"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            {blog.title}
          </h1>

          {blog.excerpt && (
            <p className="mt-7 max-w-[850px] text-[17px] leading-8 text-white/65">
              {blog.excerpt}
            </p>
          )}

          <div className="mt-9 flex flex-wrap gap-7 text-[13px] text-white/65">
            <span className="flex items-center gap-2">
              <UserRound size={17} />
              {blog.author}
            </span>

            <span className="flex items-center gap-2">
              <CalendarDays size={17} />
              {formatDate(blog.publishedAt)}
            </span>
          </div>
        </div>
      </section>

      {/* ARTICLE */}
      <article className="mx-auto max-w-[1100px] px-5 pb-24 md:px-10 lg:pb-32">

        {blog.featuredImage && (
          <div className="relative -mt-10 mb-16 overflow-hidden rounded-[25px] bg-[#e5eaff]">
            <img
              src={blog.featuredImage}
              alt={blog.imageAlt || blog.title}
              className="max-h-[580px] w-full object-cover"
            />
          </div>
        )}

        <div className={blog.featuredImage ? "" : "pt-16"}>
          <div className="mx-auto max-w-[850px]">

            <div className="mb-10 flex items-center gap-3 text-[#00004d]">
              <BookOpen size={21} />

              <span className="text-[12px] font-extrabold uppercase tracking-[.16em]">
                Article
              </span>
            </div>

            <div
              className="gk-blog-content"
              dangerouslySetInnerHTML={{
                __html: safeHTML,
              }}
            />

            <div className="mt-16 flex flex-wrap items-center justify-between gap-5 border-t border-[#e2e3ec] pt-8">
              <Link
                to="/blogs"
                className="inline-flex items-center gap-2 font-bold text-[#00004d]"
              >
                <ArrowLeft size={18} />
                All Articles
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#00004d] px-6 py-3 text-[13px] font-bold text-white"
              >
                Let's Connect
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
