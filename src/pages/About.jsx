
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Target,
  Eye,
  Lightbulb,
  Layers3,
  BadgeCheck,
  Handshake,
  Compass,
  PenTool,
  Rocket,
  MoveUpRight,
  Megaphone,
  Printer,
  Gift,
  Globe2,
} from "lucide-react";

const images = {
  hero: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1400&auto=format&fit=crop&q=85",
  about: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1100&auto=format&fit=crop&q=85",
  creative: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1000&auto=format&fit=crop&q=85",
};

const strengths = [
  {
    icon: Layers3,
    number: "01",
    title: "Integrated Solutions",
    description:
      "From media planning and printing to corporate gifting and digital experiences, we bring multiple brand needs together.",
  },
  {
    icon: Lightbulb,
    number: "02",
    title: "Creative Thinking",
    description:
      "We combine fresh ideas with practical execution to create brand experiences that feel relevant and memorable.",
  },
  {
    icon: BadgeCheck,
    number: "03",
    title: "Quality-Focused Execution",
    description:
      "We pay attention to design, production and delivery details, because every brand touchpoint matters.",
  },
  {
    icon: Handshake,
    number: "04",
    title: "Collaborative Approach",
    description:
      "We believe in clear communication, strong relationships and working closely with clients throughout the process.",
  },
];

const capabilities = [
  {
    icon: Megaphone,
    title: "Media & Advertising",
    description:
      "Creative and strategic media solutions that help brands connect with the right audience.",
    link: "/services/media",
  },
  {
    icon: Printer,
    title: "Printing & Production",
    description:
      "Brand collateral, premium printing and production solutions designed to make an impression.",
    link: "/services/printing",
  },
  {
    icon: Gift,
    title: "Corporate Gifting",
    description:
      "Personalised gifts, welcome kits and branded merchandise that strengthen connections.",
    link: "/gifting",
  },
  {
    icon: Globe2,
    title: "Digital Experiences",
    description:
      "Website development and digital solutions that create a stronger online brand presence.",
    link: "/services/website-development",
  },
];

const process = [
  {
    number: "01",
    icon: Compass,
    title: "Discover",
    description:
      "We understand your brand, business objectives, audience and specific requirements.",
  },
  {
    number: "02",
    icon: PenTool,
    title: "Strategise & Create",
    description:
      "We develop ideas and solutions that align with your goals and brand identity.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Execute & Deliver",
    description:
      "We bring the plan to life with coordinated execution and attention to every detail.",
  },
];

function SectionLabel({ number, children, light = false }) {
  return (
    <p
      className={`mb-5 flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[.22em] ${
        light ? "text-[#cbd7ff]" : "text-[#00004d]"
      }`}
    >
      <span
        className={`h-[7px] w-[7px] rounded-full ${
          light ? "bg-[#cbd7ff]" : "bg-[#00004d]"
        }`}
      />
      {number} / {children}
    </p>
  );
}

export default function About() {
  return (
    <main className="overflow-hidden bg-[#f8f8f6] text-[#191b25]">

      {/* HERO SECTION */}
      <section className="relative isolate min-h-[650px] overflow-hidden bg-[#00004d] text-white lg:min-h-[720px]">
        <div className="absolute inset-0">
          <img
            src={images.hero}
            alt="Modern creative workspace"
            className="h-full w-full object-cover opacity-[.18]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#00004d] via-[#00004d]/95 to-[#00004d]/65" />
        </div>

        <div className="pointer-events-none absolute -right-36 -top-36 h-[520px] w-[520px] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-16 -top-16 h-[360px] w-[360px] rounded-full border border-white/10" />

        <div className="relative mx-auto flex min-h-[650px] max-w-[1440px] flex-col justify-center px-5 pb-24 pt-40 md:px-10 lg:min-h-[720px] xl:px-16">
          <div className="max-w-[1050px]" data-aos="fade-up">
            <SectionLabel number="01" light>
              About Growth Kriya
            </SectionLabel>

            <h1
              className="text-[clamp(52px,7.5vw,116px)] font-extrabold leading-[.99] tracking-[-.075em]"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              We don't just
              <br />
              think growth.
              <br />
              <span className="text-[#cbd7ff]">We create it.</span>
            </h1>

            <p className="mt-9 max-w-[620px] text-[16px] leading-8 text-white/75 md:text-[19px] md:leading-9">
              Growth Kriya is an integrated creative and brand solutions
              agency bringing together media, printing, corporate gifting
              and digital experiences to help businesses make a lasting
              impact.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-[14px] font-extrabold text-[#00004d] transition hover:bg-[#cbd7ff]"
              >
                Let's Work Together
                <ArrowUpRight size={18} />
              </Link>

              <a
                href="#our-story"
                className="inline-flex items-center gap-3 text-[14px] font-semibold text-white/80 transition hover:text-white"
              >
                Discover Our Story
                <ArrowRight size={18} />
              </a>
            </div>
          </div>

          <div className="absolute bottom-8 left-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[.2em] text-white/50 md:left-10 xl:left-16">
            <span className="h-[1px] w-12 bg-white/40" />
            Strategy. Creativity. Execution.
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section
        id="our-story"
        className="mx-auto grid max-w-[1440px] items-center gap-16 px-5 py-24 md:px-10 lg:grid-cols-2 lg:gap-24 lg:py-36 xl:px-16"
      >
        <div className="relative" data-aos="fade-right">
          <div className="overflow-hidden rounded-[30px]">
            <img
              src={images.about}
              alt="Creative team collaborating"
              loading="lazy"
              className="h-[420px] w-full object-cover md:h-[590px]"
            />
          </div>

          <div className="absolute -bottom-7 right-0 max-w-[260px] rounded-tl-[24px] rounded-bl-[24px] bg-[#00004d] p-7 text-white shadow-xl md:-right-5">
            <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#cbd7ff]">
              Our Belief
            </p>
            <p className="mt-3 text-[23px] font-extrabold leading-tight tracking-[-.04em]">
              Great ideas deserve great execution.
            </p>
          </div>
        </div>

        <div data-aos="fade-up">
          <SectionLabel number="02">Who We Are</SectionLabel>

          <h2
            className="text-[clamp(38px,4.6vw,70px)] font-extrabold leading-[1.1] tracking-[-.065em]"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            One partner.
            <br />
            <span className="text-[#00004d]">Many possibilities.</span>
          </h2>

          <p className="mt-8 text-[16px] leading-8 text-[#646779]">
            Every successful brand is built through meaningful connections,
            consistent communication and thoughtful experiences.
          </p>

          <p className="mt-5 text-[16px] leading-8 text-[#646779]">
            At Growth Kriya, we bring creative thinking and practical
            solutions together. Our services span media and advertising,
            printing and production, corporate gifting and web development,
            helping brands connect their ideas with real-world execution.
          </p>

          <p className="mt-5 text-[16px] leading-8 text-[#646779]">
            Whether it's building visibility, creating brand collateral,
            developing digital experiences or delivering memorable
            merchandise, our approach is centred on understanding each
            project's purpose.
          </p>

          <div className="mt-9 border-l-[3px] border-[#00004d] bg-[#eef0fa] px-6 py-5">
            <p className="text-[17px] font-bold leading-7 text-[#00004d]">
              We believe that growth happens when strategy, creativity and
              execution move in the same direction.
            </p>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY STRIP */}
      <section className="border-y border-[#e6e7ec] bg-white py-9">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-center gap-x-12 gap-y-5 px-5 text-center text-[13px] font-extrabold uppercase tracking-[.15em] text-[#00004d] md:justify-between md:px-10 xl:px-16">
          <span>Think Creatively</span>
          <span className="text-[#9da4c3]">✳</span>
          <span>Plan Strategically</span>
          <span className="text-[#9da4c3]">✳</span>
          <span>Execute Precisely</span>
          <span className="text-[#9da4c3]">✳</span>
          <span>Grow Together</span>
        </div>
      </section>

      {/* MISSION AND VISION */}
      <section className="bg-[#f0f1f8] py-24 lg:py-32">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 xl:px-16">
          <SectionLabel number="03">What Drives Us</SectionLabel>

          <div className="mb-14 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <h2
              className="max-w-[800px] text-[clamp(38px,5vw,76px)] font-extrabold leading-[1.08] tracking-[-.065em]"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Driven by purpose.
              <br />
              <span className="text-[#00004d]">Focused on impact.</span>
            </h2>
            <p className="max-w-[320px] text-[15px] leading-7 text-[#666a7e]">
              The thinking behind every solution we develop and every
              relationship we build.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <div
              data-aos="fade-up"
              className="group relative overflow-hidden rounded-[28px] bg-[#00004d] p-8 text-white md:p-12"
            >
              <div className="mb-14 flex items-start justify-between">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                  <Target size={29} strokeWidth={1.6} />
                </div>
                <span className="text-[13px] font-semibold text-white/40">
                  01 /
                </span>
              </div>

              <h3 className="text-[34px] font-extrabold tracking-[-.05em] md:text-[42px]">
                Our Mission
              </h3>

              <p className="mt-5 max-w-[500px] text-[16px] leading-8 text-white/70">
                To empower businesses with creative, practical and
                integrated brand solutions that improve visibility,
                strengthen engagement and support sustainable growth.
              </p>

              <ArrowUpRight
                size={24}
                className="absolute bottom-8 right-8 text-[#cbd7ff]"
              />
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="group relative overflow-hidden rounded-[28px] border border-[#dfe2f1] bg-white p-8 md:p-12"
            >
              <div className="mb-14 flex items-start justify-between">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eef0fa] text-[#00004d]">
                  <Eye size={29} strokeWidth={1.6} />
                </div>
                <span className="text-[13px] font-semibold text-[#9195ae]">
                  02 /
                </span>
              </div>

              <h3 className="text-[34px] font-extrabold tracking-[-.05em] md:text-[42px]">
                Our Vision
              </h3>

              <p className="mt-5 max-w-[500px] text-[16px] leading-8 text-[#686b7c]">
                To become a trusted creative growth partner for brands
                seeking thoughtful ideas, seamless collaboration and
                impactful experiences across physical and digital channels.
              </p>

              <ArrowUpRight
                size={24}
                className="absolute bottom-8 right-8 text-[#00004d]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 lg:py-36 xl:px-16">
        <div className="mb-14 grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <SectionLabel number="04">
              The Growth Kriya Difference
            </SectionLabel>
            <h2
              className="text-[clamp(39px,5vw,76px)] font-extrabold leading-[1.08] tracking-[-.065em]"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Why brands
              <br />
              <span className="text-[#00004d]">work with us.</span>
            </h2>
          </div>

          <p className="max-w-[430px] text-[16px] leading-8 text-[#666a7e] lg:justify-self-end">
            We focus on the bigger picture while taking care of the
            details that make every project successful.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {strengths.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.number}
                data-aos="fade-up"
                data-aos-delay={(index % 2) * 100}
                className="group rounded-[25px] border border-[#e6e6ed] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#b7bddb] hover:shadow-[0_16px_45px_rgba(0,0,77,.07)] md:p-9"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef0fa] text-[#00004d] transition-colors group-hover:bg-[#00004d] group-hover:text-white">
                    <Icon size={25} strokeWidth={1.7} />
                  </div>
                  <span className="text-[13px] font-bold text-[#a0a2b3]">
                    {item.number}
                  </span>
                </div>

                <h3 className="mt-10 text-[26px] font-extrabold tracking-[-.045em]">
                  {item.title}
                </h3>

                <p className="mt-4 max-w-[490px] text-[15px] leading-8 text-[#686b7c]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section className="bg-[#00004d] py-24 text-white lg:py-32">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 xl:px-16">
          <SectionLabel number="05" light>
            What We Bring Together
          </SectionLabel>

          <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <h2
              className="text-[clamp(39px,5.5vw,80px)] font-extrabold leading-[1.07] tracking-[-.065em]"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Different services.
              <br />
              <span className="text-[#cbd7ff]">One shared purpose.</span>
            </h2>
            <p className="max-w-[330px] text-[15px] leading-8 text-white/60">
              Connected creative and execution capabilities built around
              your brand's needs.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {capabilities.map((item, index) => {
              const Icon = item.icon;

              return (
                <Link
                  to={item.link}
                  key={item.title}
                  data-aos="fade-up"
                  data-aos-delay={(index % 2) * 100}
                  className="group flex min-h-[265px] flex-col justify-between rounded-[24px] border border-white/20 p-7 transition-all duration-300 hover:border-[#cbd7ff] hover:bg-white/10 md:p-9"
                >
                  <div className="flex items-start justify-between">
                    <Icon size={29} strokeWidth={1.5} className="text-[#cbd7ff]" />
                    <MoveUpRight
                      size={23}
                      className="text-white/60 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </div>

                  <div className="mt-12">
                    <h3 className="text-[25px] font-extrabold tracking-[-.045em]">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-[410px] text-[14px] leading-7 text-white/60">
                      {item.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* OUR PROCESS */}
      <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 lg:py-36 xl:px-16">
        <SectionLabel number="06">How We Work</SectionLabel>

        <div className="mb-14 grid items-end gap-6 lg:grid-cols-2">
          <h2
            className="text-[clamp(39px,5vw,74px)] font-extrabold leading-[1.09] tracking-[-.065em]"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            From the first idea
            <br />
            <span className="text-[#00004d]">to final impact.</span>
          </h2>

          <p className="max-w-[390px] text-[16px] leading-8 text-[#686b7c] lg:justify-self-end">
            A collaborative approach designed to keep creativity,
            communication and execution aligned.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {process.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.number}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="rounded-[25px] border border-[#e4e5ed] bg-white p-7 md:p-9"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-extrabold text-[#00004d]">
                    {item.number} /
                  </span>
                  <Icon size={26} strokeWidth={1.5} className="text-[#00004d]" />
                </div>

                <div className="mt-16 h-[1px] w-full bg-[#e6e7ed]" />

                <h3 className="mt-8 text-[27px] font-extrabold tracking-[-.05em]">
                  {item.title}
                </h3>

                <p className="mt-4 text-[15px] leading-7 text-[#686b7c]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* IMAGE + BRAND STATEMENT */}
      <section className="bg-[#eef0fa] py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 md:px-10 lg:grid-cols-2 lg:gap-20 xl:px-16">
          <div data-aos="fade-up">
            <SectionLabel number="07">Our Commitment</SectionLabel>

            <h2
              className="text-[clamp(39px,4.6vw,70px)] font-extrabold leading-[1.1] tracking-[-.065em]"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Your brand.
              <br />
              Your ambition.
              <br />
              <span className="text-[#00004d]">Our commitment.</span>
            </h2>

            <p className="mt-7 max-w-[520px] text-[16px] leading-8 text-[#686b7c]">
              We value every opportunity to turn a business challenge
              into a creative possibility. Our goal is to build
              meaningful partnerships and deliver solutions that
              support each brand's journey.
            </p>

            <Link
              to="/contact"
              className="mt-9 inline-flex items-center gap-3 border-b-2 border-[#00004d] pb-2 text-[15px] font-extrabold text-[#00004d]"
            >
              Let's Connect
              <ArrowUpRight size={18} />
            </Link>
          </div>

          <div
            data-aos="fade-left"
            className="overflow-hidden rounded-[28px]"
          >
            <img
              src={images.creative}
              alt="Creative professionals working together"
              loading="lazy"
              className="h-[390px] w-full object-cover md:h-[500px]"
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-white px-5 py-24 md:px-10 lg:py-32 xl:px-16">
        <div
          data-aos="fade-up"
          className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[30px] bg-[#00004d] px-7 py-16 text-center text-white md:px-12 md:py-24"
        >
          <div className="pointer-events-none absolute -left-40 -top-40 h-[400px] w-[400px] rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-48 -right-32 h-[500px] w-[500px] rounded-full border border-white/10" />

          <div className="relative">
            <p className="mb-6 text-[12px] font-bold uppercase tracking-[.22em] text-[#cbd7ff]">
              Let's Create Something Meaningful
            </p>

            <h2
              className="mx-auto max-w-[850px] text-[clamp(42px,6vw,88px)] font-extrabold leading-[1.08] tracking-[-.065em]"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Let's turn your ideas
              <br />
              <span className="text-[#cbd7ff]">into impact.</span>
            </h2>

            <p className="mx-auto mt-7 max-w-[530px] text-[16px] leading-8 text-white/65">
              Have a project in mind? We'd love to explore how we
              can bring your vision to life.
            </p>

            <Link
              to="/contact"
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-[15px] font-extrabold text-[#00004d] transition-colors hover:bg-[#cbd7ff]"
            >
              Start a Conversation
              <ArrowUpRight size={19} />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
