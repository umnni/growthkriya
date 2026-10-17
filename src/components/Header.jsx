
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import {
  ArrowUpRight,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Megaphone,
  Printer,
  Globe2,
} from "lucide-react";

import { media, printing } from "../data/site";

// ==========================================
// SERVICE DATA
// ==========================================

const excludedNames = new Set([
  "all media services",
  "all printing services",
]);

const filteredServices = (items = []) => {
  return items.filter(([name, url]) => {
    const title = name.trim().toLowerCase();

    return (
      !excludedNames.has(title) &&
      url !== "/services/media" &&
      url !== "/services/printing"
    );
  });
};

const mediaServices = filteredServices(media);
const printingServices = filteredServices(printing);

const mainLinksBefore = [
  ["Home", "/"],
  ["About Us", "/about"],
];

const mainLinksAfter = [
  ["Website Development", "/services/website-development"],
  ["Gifting", "/gifting"],
  ["Blogs", "/blogs"],
  ["Contact Us", "/contact"],
];

// ==========================================
// DESKTOP SERVICE COLUMN
// ==========================================

function ServiceColumn({
  title,
  icon: Icon,
  items,
  pathname,
  onSelect,
}) {
  return (
    <div className="min-w-0">
      <div className="mb-3 flex items-center gap-3 border-b border-white/10 pb-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00004d] text-[#cbd7ff]">
          <Icon size={19} strokeWidth={1.8} />
        </span>

        <div>
          <h3 className="text-[16px] font-bold text-white">
            {title}
          </h3>

          <p className="mt-0.5 text-[11px] text-white/45">
            {items.length} Services
          </p>
        </div>
      </div>

      <div className="grid gap-1">
        {items.map(([name, url]) => (
          <Link
            key={url}
            to={url}
            onClick={onSelect}
            className={`group flex min-h-[36px] items-center justify-between gap-3 rounded-lg px-3 py-2 text-[13px] font-medium leading-[1.4] transition-all duration-200 ${
              pathname === url
                ? "bg-[#00004d] text-white"
                : "text-white/75 hover:bg-white/[.07] hover:text-white"
            }`}
          >
            <span>{name}</span>

            <ArrowUpRight
              size={14}
              className="shrink-0 text-[#cbd7ff] opacity-0 transition-opacity group-hover:opacity-100"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// HEADER COMPONENT
// ==========================================

export default function Header() {
  const { pathname } = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCategory, setMobileCategory] = useState("");

  const headerRef = useRef(null);
  const closeTimeout = useRef(null);

  const isServicePage = [
    ...mediaServices,
    ...printingServices,
  ].some(([, url]) => pathname === url);

  // ==========================================
  // DROPDOWN CONTROL
  // ==========================================

  const clearCloseTimeout = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  };

  const openServices = () => {
    clearCloseTimeout();
    setServicesOpen(true);
  };

  const closeServicesDelayed = () => {
    clearCloseTimeout();

    closeTimeout.current = setTimeout(() => {
      setServicesOpen(false);
    }, 180);
  };

  // ==========================================
  // ROUTE CHANGE
  // ==========================================

  useEffect(() => {
    setServicesOpen(false);
    setMobileOpen(false);
    setMobileCategory("");
    clearCloseTimeout();
  }, [pathname]);

  // ==========================================
  // SCROLL EFFECT
  // ==========================================

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // ==========================================
  // OUTSIDE CLICK / ESCAPE
  // ==========================================

  useEffect(() => {
    const onOutsideClick = (event) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target)
      ) {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    };

    const onEscape = (event) => {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setMobileOpen(false);
        setMobileCategory("");
      }
    };

    document.addEventListener("pointerdown", onOutsideClick);
    document.addEventListener("keydown", onEscape);

    return () => {
      document.removeEventListener(
        "pointerdown",
        onOutsideClick
      );

      document.removeEventListener("keydown", onEscape);
      clearCloseTimeout();
    };
  }, []);

  // ==========================================
  // NAVIGATION STYLE
  // ==========================================

  const navClass = ({ isActive }) => {
    return `relative flex h-[84px] items-center whitespace-nowrap text-[15px] font-semibold leading-none tracking-[-0.01em] transition-colors duration-200 ${
      isActive
        ? "text-[#cbd7ff]"
        : "text-[#f2f2f4] hover:text-[#cbd7ff]"
    }`;
  };

  const renderLinks = (items) =>
    items.map(([name, url]) => (
      <NavLink
        key={url}
        to={url}
        end={url === "/"}
        className={navClass}
      >
        {name}
      </NavLink>
    ));

  const renderMobileServices = (items) => (
    <div className="grid gap-1 px-3 pb-4">
      {items.map(([name, url]) => (
        <Link
          key={url}
          to={url}
          onClick={() => setMobileOpen(false)}
          className={`flex items-center justify-between gap-3 rounded-lg px-4 py-2.5 text-[13px] font-medium leading-5 ${
            pathname === url
              ? "bg-[#00004d] text-white"
              : "text-white/70 hover:bg-white/10 hover:text-white"
          }`}
        >
          <span>{name}</span>
          <ChevronRight size={14} className="shrink-0" />
        </Link>
      ))}
    </div>
  );

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 w-full bg-[#1b1d1b] transition-shadow duration-300 ${
        scrolled
          ? "shadow-[0_8px_30px_rgba(0,0,0,.25)]"
          : ""
      }`}
    >
      {/* =====================================
          MAIN HEADER ROW
      ===================================== */}

      <div className="mx-auto grid h-[84px] w-full max-w-[1800px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 px-5 lg:px-6 xl:px-10 2xl:px-16">

        {/* LEFT: LOGO */}
        <div className="flex min-w-0 justify-start">
          <Link
            to="/"
            aria-label="Growth Kriya Home"
            className="relative shrink-0 whitespace-nowrap text-[23px] font-extrabold tracking-[-1.5px] text-white xl:text-[27px]"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            growth
            <span className="text-[#cbd7ff]">
              kriya
            </span>

            <span className="absolute -right-3 top-0 h-[7px] w-[7px] rounded-full bg-[#00004d]" />
          </Link>
        </div>

        {/* CENTER: DESKTOP NAV */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center justify-center gap-4 xl:gap-6 2xl:gap-8 min-[1200px]:flex"
        >
          {renderLinks(mainLinksBefore)}

          {/* SERVICES TRIGGER */}
          <div
            className="relative flex h-[84px] items-center"
            onMouseEnter={openServices}
            onMouseLeave={closeServicesDelayed}
          >

<button
  type="button"
  aria-haspopup="true"
  aria-expanded={servicesOpen}
  aria-controls="gk-mega-menu"
  onFocus={openServices}
  onClick={() => {
    clearCloseTimeout();
    setServicesOpen((prev) => !prev);
  }}
  className={`flex h-[84px] items-center gap-2 whitespace-nowrap !text-[15px] !font-semibold leading-none tracking-[-0.01em] transition-colors duration-200 ${
    servicesOpen || isServicePage
      ? "text-[#cbd7ff]"
      : "text-[#f2f2f4] hover:text-[#cbd7ff]"
  }`}
  style={{
    fontSize: "15px",
    fontWeight: 600,
  }}
>
  Services

  <ChevronDown
    size={16}
    strokeWidth={2}
    className={`transition-transform duration-200 ${
      servicesOpen ? "rotate-180" : ""
    }`}
  />
</button>

          </div>

          {renderLinks(mainLinksAfter)}
        </nav>

        {/* RIGHT: CTA BUTTON */}
        <div className="flex items-center justify-end gap-3">
          <Link
            to="/contact"
            className="hidden shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#00004d] px-5 py-3 text-[13px] font-extrabold text-white transition-all duration-200 hover:bg-[#292987] min-[1200px]:inline-flex xl:px-6 xl:py-3.5 xl:text-[14px]"
          >
            Let's Talk
            <ArrowUpRight size={17} />
          </Link>

          {/* MOBILE TOGGLE */}
          <button
            type="button"
            aria-label={
              mobileOpen
                ? "Close Navigation"
                : "Open Navigation"
            }
            aria-expanded={mobileOpen}
            onClick={() => {
              setMobileOpen((prev) => !prev);
              setServicesOpen(false);
            }}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/20 text-white min-[1200px]:hidden"
          >
            {mobileOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>
        </div>
      </div>

      {/* =====================================
          CENTERED COMPACT MEGA MENU
      ===================================== */}

      <div
        id="gk-mega-menu"
        onMouseEnter={openServices}
        onMouseLeave={closeServicesDelayed}
        className={`absolute left-1/2 top-[78px] hidden w-[min(920px,calc(100vw-64px))] -translate-x-1/2 transition-all duration-200 min-[1200px]:block ${
          servicesOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="overflow-hidden rounded-[22px] border border-white/10 bg-[#262927] shadow-[0_22px_60px_rgba(0,0,0,.4)]">

          {/* TOP BAR */}
          <div className="flex items-center justify-between gap-5 border-b border-white/10 px-6 py-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#cbd7ff]">
                Explore Our Expertise
              </p>

              <h2 className="mt-1 text-[18px] font-bold tracking-[-.02em] text-white">
                Services built around your brand
              </h2>
            </div>

            <Link
              to="/contact"
              onClick={() => setServicesOpen(false)}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-[12px] font-semibold text-white transition-colors hover:border-[#cbd7ff] hover:text-[#cbd7ff]"
            >
              Get a Quote
              <ArrowUpRight size={15} />
            </Link>
          </div>

          {/* TWO SERVICE COLUMNS */}
          <div className="grid max-h-[min(480px,calc(100vh-180px))] grid-cols-2 gap-7 overflow-y-auto overscroll-contain px-6 py-5">
            <ServiceColumn
              title="Media & Advertising"
              icon={Megaphone}
              items={mediaServices}
              pathname={pathname}
              onSelect={() => setServicesOpen(false)}
            />

            <ServiceColumn
              title="Printing & Production"
              icon={Printer}
              items={printingServices}
              pathname={pathname}
              onSelect={() => setServicesOpen(false)}
            />
          </div>

          {/* BOTTOM BAR */}
          <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-[#202320] px-6 py-3">
            <p className="text-[11px] text-white/50">
              Strategy · Creativity · Execution
            </p>

            <Link
              to="/contact"
              onClick={() => setServicesOpen(false)}
              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#cbd7ff] hover:text-white"
            >
              Custom Requirements
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* =====================================
          MOBILE NAVIGATION
      ===================================== */}

      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="max-h-[calc(100dvh-84px)] overflow-y-auto overscroll-contain border-t border-white/10 bg-[#1b1d1b] px-5 pb-8 pt-4 min-[1200px]:hidden"
        >
          <div className="mx-auto flex max-w-[700px] flex-col gap-1">

            {mainLinksBefore.map(([name, url]) => (
              <NavLink
                key={url}
                to={url}
                end={url === "/"}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-[15px] font-semibold ${
                    isActive
                      ? "bg-[#00004d] text-white"
                      : "text-white/85"
                  }`
                }
              >
                {name}
              </NavLink>
            ))}

            {/* MOBILE SERVICES */}
            <div className="my-2 overflow-hidden rounded-xl border border-white/10">

              <div className="border-b border-white/10 px-4 py-3">
                <p className="text-[15px] font-bold text-white">
                  Our Services
                </p>
              </div>

              {/* MEDIA */}
              <button
                type="button"
                onClick={() =>
                  setMobileCategory((current) =>
                    current === "media" ? "" : "media"
                  )
                }
                aria-expanded={mobileCategory === "media"}
                className="flex w-full items-center justify-between px-4 py-4 text-left text-[14px] font-semibold text-white"
              >
                <span className="flex items-center gap-3">
                  <Megaphone
                    size={18}
                    className="text-[#cbd7ff]"
                  />
                  Media & Advertising
                </span>

                <ChevronDown
                  size={17}
                  className={`transition-transform ${
                    mobileCategory === "media"
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {mobileCategory === "media" &&
                renderMobileServices(mediaServices)}

              <div className="mx-4 border-t border-white/10" />

              {/* PRINTING */}
              <button
                type="button"
                onClick={() =>
                  setMobileCategory((current) =>
                    current === "printing"
                      ? ""
                      : "printing"
                  )
                }
                aria-expanded={mobileCategory === "printing"}
                className="flex w-full items-center justify-between px-4 py-4 text-left text-[14px] font-semibold text-white"
              >
                <span className="flex items-center gap-3">
                  <Printer
                    size={18}
                    className="text-[#cbd7ff]"
                  />
                  Printing & Production
                </span>

                <ChevronDown
                  size={17}
                  className={`transition-transform ${
                    mobileCategory === "printing"
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {mobileCategory === "printing" &&
                renderMobileServices(printingServices)}
            </div>

            {/* WEBSITE DEVELOPMENT */}
            <NavLink
              to="/services/website-development"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-semibold ${
                  isActive
                    ? "bg-[#00004d] text-white"
                    : "text-white/85"
                }`
              }
            >
              <Globe2
                size={18}
                className="text-[#cbd7ff]"
              />
              Website Development
            </NavLink>

            {/* OTHER LINKS */}
            {mainLinksAfter
              .filter(([name]) =>
                name !== "Website Development"
              )
              .map(([name, url]) => (
                <NavLink
                  key={url}
                  to={url}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-[15px] font-semibold ${
                      isActive
                        ? "bg-[#00004d] text-white"
                        : "text-white/85"
                    }`
                  }
                >
                  {name}
                </NavLink>
              ))}

            {/* MOBILE CTA */}
            <Link
              to="/contact"
              className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-[#00004d] px-7 py-3.5 text-[14px] font-bold text-white"
            >
              Let's Talk
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
