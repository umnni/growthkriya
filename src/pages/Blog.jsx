
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Search,
  CalendarDays,
  BookOpen,
  LoaderCircle,
} from "lucide-react";
import { getBlogs } from "../services/blogApi";

const categories = [
  "All",
  "Insights",
  "Media",
  "Printing",
  "Gifting",
  "Digital",
  "Branding",
];

function dateText(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    document.title = "Blogs & Insights | Growth Kriya";

    let active = true;

    getBlogs()
      .then((result) => {
        if (active) setBlogs(result.blogs || []);
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    return blogs.filter((blog) => {
      const categoryMatch =
        category === "All" || blog.category === category;

      const searchMatch = [
        blog.title,
        blog.excerpt,
        blog.category,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [blogs, search, category]);

  return (
    <main className="min-h-screen bg-[#f8f8f6] text-[#191b25]">
      <section className="relative overflow-hidden bg-[#00004d] px-5 pb-24 pt-44 text-white md:px-10 lg:pb-32 xl:px-16">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[540px] w-[540px] rounded-full border border-white/10" />

        <div
          className="relative mx-auto max-w-[1440px]"
          data-aos="fade-up"
        >
          <p className="mb-6 text-[12px] font-extrabold uppercase tracking-[.2em] text-[#cbd7ff]">
            Growth Kriya / Journal
          </p>

          <h1
            className="max-w-[1000px] text-[clamp(52px,7vw,108px)] font-extrabold leading-[1.03] tracking-[-.075em]"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Ideas, insights
            <br />
            & <span className="text-[#cbd7ff]">inspiration.</span>
          </h1>

          <p className="mt-8 max-w-[610px] text-[17px] leading-8 text-white/65">
            Explore ideas and perspectives on creativity,
            advertising, branding, printing, gifting and
            digital experiences.
          </p>

          <a
            href="#articles"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-[14px] font-extrabold text-[#00004d] hover:bg-[#cbd7ff]"
          >
            Explore Articles
            <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <section
        id="articles"
        className="mx-auto max-w-[1440px] scroll-mt-24 px-5 py-24 md:px-10 lg:py-32 xl:px-16"
      >
        <div className="mb-12 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <div>
            <p className="mb-5 text-[12px] font-extrabold uppercase tracking-[.2em] text-[#00004d]">
              01 / The Journal
            </p>
            <h2
              className="text-[clamp(38px,5vw,74px)] font-extrabold leading-[1.1] tracking-[-.065em]"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Latest <span className="text-[#00004d]">stories.</span>
            </h2>
          </div>

          <div className="relative w-full lg:max-w-[340px]">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#00004d]"
            />
            <input
              type="search"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-[#dfe1ed] bg-white py-4 pl-12 pr-5 text-[14px] outline-none focus:border-[#00004d]"
            />
          </div>
        </div>

        <div className="mb-12 flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-full border px-5 py-2.5 text-[13px] font-bold transition ${
                category === item
                  ? "border-[#00004d] bg-[#00004d] text-white"
                  : "border-[#dfe1ed] bg-white text-[#55586e] hover:border-[#00004d]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex min-h-[260px] items-center justify-center gap-3 text-[#00004d]">
            <LoaderCircle className="animate-spin" size={22} />
            Loading articles...
          </div>
        ) : error ? (
          <div className="rounded-[24px] bg-white p-12 text-center">
            <h3 className="font-bold">Unable to load blogs</h3>
            <p className="mt-3 text-[14px] text-[#777989]">
              {error}
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-[25px] border border-[#e3e5f0] bg-white px-6 py-20 text-center">
            <BookOpen
              size={40}
              className="mx-auto text-[#00004d]"
            />
            <h3 className="mt-5 text-[26px] font-extrabold">
              No articles found
            </h3>
            <p className="mt-3 text-[#777989]">
              {blogs.length === 0
                ? "Our stories will appear here soon."
                : "Try another category or search term."}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((blog, index) => (
              <Link
                to={`/blogs/${blog.slug}`}
                key={blog.id}
                data-aos="fade-up"
                data-aos-delay={(index % 3) * 75}
                className="group overflow-hidden rounded-[25px] border border-[#e7e8f0] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,77,.07)]"
              >
                <div className="relative h-[250px] overflow-hidden bg-[#e5eaff]">
                  {blog.featuredImage ? (
                    <img
                      src={blog.featuredImage}
                      alt={blog.imageAlt || blog.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[#00004d]">
                      <BookOpen size={55} strokeWidth={1.3} />
                    </div>
                  )}

                  <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-[11px] font-extrabold text-[#00004d]">
                    {blog.category}
                  </span>
                </div>

                <div className="p-7">
                  <div className="mb-5 flex items-center gap-2 text-[12px] text-[#898c9e]">
                    <CalendarDays size={15} />
                    {dateText(blog.publishedAt)}
                  </div>

                  <h3 className="line-clamp-2 text-[25px] font-extrabold leading-[1.25] tracking-[-.045em]">
                    {blog.title}
                  </h3>

                  <p className="mt-4 line-clamp-3 text-[14px] leading-7 text-[#696b7e]">
                    {blog.excerpt ||
                      blog.content?.slice(0, 150)}
                  </p>

                  <div className="mt-7 inline-flex items-center gap-2 text-[13px] font-extrabold text-[#00004d]">
                    Read Article
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="px-5 pb-24 md:px-10 xl:px-16">
        <div className="mx-auto max-w-[1440px] rounded-[30px] bg-[#00004d] px-7 py-16 text-center text-white md:py-24">
          <p className="mb-5 text-[12px] font-bold uppercase tracking-[.2em] text-[#cbd7ff]">
            Let's Work Together
          </p>

          <h2 className="text-[clamp(38px,5vw,72px)] font-extrabold leading-[1.1] tracking-[-.06em]">
            Ideas are better
            <br />
            when brought to life.
          </h2>

          <Link
            to="/contact"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-[14px] font-bold text-[#00004d] hover:bg-[#cbd7ff]"
          >
            Start a Conversation <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
