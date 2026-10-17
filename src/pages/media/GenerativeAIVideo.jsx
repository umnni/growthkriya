
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Play,
  Sparkles,
  Film,
  WandSparkles,
  Clapperboard,
  Layers3,
  Zap,
  MonitorPlay,
  Instagram,
  Megaphone,
  Package,
  Lightbulb,
  FilePenLine,
  Video,
  Scissors,
  CheckCircle2,
  ChevronDown,
  MoveUpRight,
} from "lucide-react";

const capabilities = [
  {
    number: "01",
    icon: Film,
    title: "AI Brand Films",
    description:
      "Concept-led brand films designed to communicate your brand personality through engaging visual storytelling.",
    label: "BRAND STORYTELLING",
  },
  {
    number: "02",
    icon: Instagram,
    title: "Social Media Reels",
    description:
      "Short-form, platform-conscious creative videos designed for digital campaigns and social media engagement.",
    label: "SHORT-FORM CONTENT",
  },
  {
    number: "03",
    icon: Package,
    title: "Product Videos",
    description:
      "Creative product visualisations that communicate features, benefits and presentation with a distinctive look.",
    label: "PRODUCT COMMUNICATION",
  },
  {
    number: "04",
    icon: Megaphone,
    title: "Campaign Creatives",
    description:
      "Advertising-led video concepts for announcements, promotional campaigns and marketing communication.",
    label: "CAMPAIGN CONTENT",
  },
  {
    number: "05",
    icon: MonitorPlay,
    title: "Explainer Videos",
    description:
      "Simplified visual narratives that help audiences understand products, services and business ideas.",
    label: "EXPLAIN & EDUCATE",
  },
  {
    number: "06",
    icon: Sparkles,
    title: "Launch Teasers",
    description:
      "Bold, attention-focused visuals to create interest around upcoming products, events and brand launches.",
    label: "CREATE ANTICIPATION",
  },
];

const steps = [
  {
    no: "01",
    icon: Lightbulb,
    title: "Discover & Conceptualise",
    description:
      "We begin with your audience, brand direction, creative brief and communication objective.",
  },
  {
    no: "02",
    icon: FilePenLine,
    title: "Script & Storyboard",
    description:
      "The concept is translated into a narrative, scene sequence and visual direction.",
  },
  {
    no: "03",
    icon: WandSparkles,
    title: "AI Visual Production",
    description:
      "We develop visual sequences using suitable AI-assisted creative production techniques.",
  },
  {
    no: "04",
    icon: Scissors,
    title: "Edit & Refine",
    description:
      "Selected visuals are assembled with pacing, transitions, typography and audio as needed.",
  },
  {
    no: "05",
    icon: CheckCircle2,
    title: "Review & Deliver",
    description:
      "We review the output against the approved brief and prepare agreed delivery formats.",
  },
];

const faqs = [
  {
    question: "What is generative AI video production?",
    answer:
      "It is a creative production approach that uses generative AI tools to help create or transform visual content, combined with human creative direction, scripting, editing and review.",
  },
  {
    question: "Can AI videos be used for advertising campaigns?",
    answer:
      "Yes. AI-assisted videos can be developed for promotional campaigns, provided that brand, platform, licensing and applicable advertising requirements are reviewed.",
  },
  {
    question: "Can you create videos for Instagram and other platforms?",
    answer:
      "Projects can be planned around vertical, square and landscape formats based on platform requirements and the agreed production scope.",
  },
  {
    question: "What do you need to start a video project?",
    answer:
      "A project brief describing your product or service, target audience, objective, preferred style, references, duration and intended usage is a useful starting point.",
  },
  {
    question: "Will every AI-generated scene look exactly as requested?",
    answer:
      "Generative outputs can vary. Some ideas require iterations, editing or an alternative production approach to achieve a suitable final result.",
  },
];

function Eyebrow({ children, light = false }) {
  return (
    <div className={`mb-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.2em] ${
      light ? "text-[#b9c6ff]" : "text-[#00004d]"
    }`}>
      <span className={`h-[7px] w-[7px] rounded-full ${
        light ? "bg-[#cbd7ff]" : "bg-[#00004d]"
      }`} />
      {children}
    </div>
  );
}

function SectionHeading({ eyebrow, title, accent, description, light = false }) {
  return (
    <div className="max-w-[850px]">
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2 className={`text-[clamp(37px,5vw,74px)] font-extrabold leading-[1.08] tracking-[-.065em] ${
        light ? "text-white" : "text-[#171925]"
      }`}>
        {title}
        <span className={light ? "text-[#b9c6ff]" : "text-[#00004d]"}>
          {accent}
        </span>
      </h2>
      {description && (
        <p className={`mt-6 max-w-[630px] text-[15px] leading-8 md:text-[17px] ${
          light ? "text-white/60" : "text-[#686b7c]"
        }`}>
          {description}
        </p>
      )}
    </div>
  );
}

function VideoArtwork() {
  return (
    <div className="relative mx-auto w-full max-w-[580px]">
      <div className="pointer-events-none absolute inset-[-20px] rounded-[45px] bg-[#5964d8]/20 blur-[70px]" />

      <div className="relative aspect-[1.04] overflow-hidden rounded-[28px] border border-white/20 bg-[#101535] p-4 shadow-[0_35px_90px_rgba(0,0,0,.35)] sm:p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,rgba(139,151,255,.24),transparent_48%)]" />

        <div className="relative flex items-center justify-between">
          <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.16em] text-white/55">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#a9b4ff]" />
            Creative studio
          </span>
          <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] text-white/65">
            AI / MOTION
          </span>
        </div>

        <div className="relative mt-6 grid h-[74%] grid-cols-[1.15fr_.85fr] gap-3">
          <div className="relative flex flex-col justify-end overflow-hidden rounded-[20px] bg-gradient-to-br from-[#4a46ad] via-[#25246e] to-[#0d1239] p-5">
            <div className="absolute -right-20 top-8 h-56 w-56 rounded-full border-[35px] border-[#c3c8ff]/30 blur-[1px]" />
            <div className="absolute right-0 top-16 h-44 w-44 rotate-45 rounded-[38px] border border-white/30 bg-white/10 shadow-2xl" />
            <Sparkles className="relative mb-4 text-[#d1d7ff]" size={30} />
            <p className="relative text-[clamp(25px,3vw,43px)] font-black leading-[.98] tracking-[-.07em] text-white">
              IMAGINE
              <br />
              BEYOND.
            </p>
            <p className="relative mt-3 text-[10px] uppercase tracking-[.17em] text-white/55">
              FRAME 001 / CREATIVE VISION
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded-[18px] bg-gradient-to-br from-[#b9c3ff] to-[#4645b1]">
              <div className="absolute h-36 w-36 rotate-45 rounded-[32px] border-[18px] border-[#fff]/40 shadow-xl" />
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/45 bg-white/20 backdrop-blur-md">
                <Play size={23} fill="white" className="ml-1 text-white" />
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-between rounded-[18px] bg-[#242d70] p-4">
              <div className="flex items-center justify-between">
                <Video size={24} className="text-[#cbd7ff]" />
                <span className="text-[10px] text-white/55">9:16</span>
              </div>
              <div>
                <div className="mb-3 flex gap-1">
                  {[45, 70, 35, 80, 50, 65, 38, 58].map((height, i) => (
                    <span
                      key={i}
                      className="w-full rounded-full bg-[#cbd7ff]/70"
                      style={{ height: `${height / 3}px` }}
                    />
                  ))}
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[.13em] text-white/75">
                  Visual Sequence
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-4 flex items-center gap-3">
          <div className="flex-1 overflow-hidden rounded-full bg-white/10">
            <div className="h-1.5 w-[64%] rounded-full bg-[#b5c0ff]" />
          </div>
          <span className="text-[10px] font-mono text-white/50">00:16 / 00:25</span>
        </div>
      </div>

      <div className="absolute -bottom-5 -left-3 flex items-center gap-3 rounded-2xl border border-white/15 bg-[#252a60] px-5 py-4 text-white shadow-2xl sm:-left-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#cbd7ff] text-[#00004d]">
          <Zap size={20} />
        </span>
        <div>
          <p className="text-[12px] font-bold">Ideas in motion</p>
          <p className="text-[10px] text-white/50">Creative-first production</p>
        </div>
      </div>
    </div>
  );
}

export default function GenerativeAIVideo() {
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    document.title = "Generative AI Video Production | Growth Kriya";
  }, []);

  return (
    <main className="overflow-hidden bg-[#f8f8f6] text-[#171925]">

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#080b2d] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_40%,rgba(78,82,180,.26),transparent_50%)]" />
        <div className="pointer-events-none absolute -left-40 bottom-0 h-[450px] w-[450px] rounded-full border border-white/10" />

        <div className="relative mx-auto grid min-h-[760px] max-w-[1440px] items-center gap-16 px-5 pb-28 pt-40 md:px-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-12 lg:pt-44 xl:px-16">
          <div data-aos="fade-up">
            <Eyebrow light>Growth Kriya / Media & Advertising</Eyebrow>

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.05] px-4 py-2 text-[11px] font-bold uppercase tracking-[.14em] text-[#cbd7ff]">
              <WandSparkles size={15} />
              Generative AI Video Production
            </div>

            <h1 className="text-[clamp(49px,6.2vw,92px)] font-extrabold leading-[1.02] tracking-[-.075em]">
              Your vision.
              <br />
              New creative
              <br />
              <span className="text-[#bbc6ff]">possibilities.</span>
            </h1>

            <p className="mt-8 max-w-[570px] text-[16px] leading-8 text-white/65 md:text-[18px]">
              AI-assisted video production that brings creative concepts,
              brand storytelling and advertising ideas into motion.
              Designed for brands ready to communicate differently.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-[14px] font-bold text-[#00004d] transition hover:bg-[#cbd7ff]"
              >
                Discuss Your Video Project <ArrowUpRight size={18} />
              </Link>
              <a
                href="#capabilities"
                className="inline-flex items-center gap-3 rounded-full border border-white/20 px-7 py-4 text-[14px] font-semibold text-white hover:bg-white/10"
              >
                Explore Solutions <ArrowRight size={18} />
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-6 border-t border-white/15 pt-6 text-[11px] font-bold uppercase tracking-[.12em] text-white/45">
              <span>Creative Direction</span>
              <span>AI-Assisted Visuals</span>
              <span>Post-Production</span>
            </div>
          </div>

          <div data-aos="fade-left" data-aos-delay="100">
            <VideoArtwork />
          </div>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="border-b border-[#e6e8f1] bg-white py-16 md:py-24">
        <div className="mx-auto grid max-w-[1440px] items-start gap-7 px-5 md:px-10 lg:grid-cols-[.65fr_1.35fr] lg:gap-20 xl:px-16">
          <Eyebrow>The Creative Shift</Eyebrow>
          <h2 className="text-[clamp(31px,4vw,59px)] font-extrabold leading-[1.17] tracking-[-.055em]">
            Powerful storytelling begins with an idea.
            <span className="text-[#00004d]">
              {" "}Technology helps us explore what that idea can become.
            </span>
          </h2>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section id="capabilities" className="scroll-mt-28 py-24 lg:py-32">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 xl:px-16">
          <SectionHeading
            eyebrow="01 / What We Create"
            title="Content that moves."
            accent=" Ideas that connect."
            description="From short-form social content to campaign-driven visual storytelling, our video concepts are built around communication goals rather than technology alone."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item, index) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.number}
                  data-aos="fade-up"
                  data-aos-delay={(index % 3) * 75}
                  className="group flex min-h-[335px] flex-col justify-between rounded-[25px] border border-[#e3e5ef] bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#a8b3df] hover:shadow-[0_18px_50px_rgba(0,0,77,.06)] md:p-8"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef0ff] text-[#00004d] transition-colors group-hover:bg-[#00004d] group-hover:text-white">
                      <Icon size={26} strokeWidth={1.6} />
                    </span>
                    <span className="text-[12px] font-bold text-[#9a9eb2]">{item.number} /</span>
                  </div>
                  <div className="mt-10">
                    <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[.17em] text-[#777da6]">
                      {item.label}
                    </p>
                    <h3 className="text-[25px] font-extrabold tracking-[-.045em]">{item.title}</h3>
                    <p className="mt-4 text-[14px] leading-7 text-[#686b7c]">{item.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CREATIVE DIRECTION */}
      <section className="bg-[#ecedfa] py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1440px] items-center gap-16 px-5 md:px-10 lg:grid-cols-2 lg:gap-24 xl:px-16">
          <div data-aos="fade-right">
            <div className="relative overflow-hidden rounded-[28px] bg-[#00004d] p-6 text-white sm:p-10">
              <div className="absolute -right-20 -top-20 h-[260px] w-[260px] rounded-full border-[35px] border-white/10" />
              <div className="relative flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-[.2em] text-[#b9c6ff]">
                  A creative framework
                </span>
                <Clapperboard size={24} className="text-[#cbd7ff]" />
              </div>

              <div className="relative mt-16 space-y-3">
                {[
                  ["01", "Human imagination"],
                  ["02", "Visual experimentation"],
                  ["03", "Creative refinement"],
                ].map(([number, title]) => (
                  <div
                    key={number}
                    className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/[.05] px-5 py-5"
                  >
                    <span className="text-[12px] font-bold text-[#b9c6ff]">{number}</span>
                    <span className="text-[clamp(18px,2vw,26px)] font-bold tracking-[-.04em]">{title}</span>
                  </div>
                ))}
              </div>

              <p className="relative mt-12 text-[13px] leading-7 text-white/55">
                AI supports the creative process. Direction, judgement and brand relevance remain central to the work.
              </p>
            </div>
          </div>

          <div data-aos="fade-up">
            <SectionHeading
              eyebrow="02 / Our Approach"
              title="Human ideas."
              accent=" AI possibilities."
              description="We combine creative direction with AI-assisted techniques to explore original visual concepts, communicate messages and develop content appropriate for each platform."
            />

            <div className="mt-9 space-y-5">
              {[
                "Creative concepts aligned with brand objectives",
                "Visual direction based on the intended audience",
                "Format-conscious output for digital platforms",
                "Editing, pacing and narrative refinement",
              ].map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <CheckCircle2 size={21} className="mt-1 shrink-0 text-[#00004d]" />
                  <p className="text-[15px] font-medium leading-7 text-[#42465b]">{item}</p>
                </div>
              ))}
            </div>

            <Link
              to="/contact"
              className="mt-10 inline-flex items-center gap-2 border-b-2 border-[#00004d] pb-2 text-[14px] font-bold text-[#00004d]"
            >
              Let's Explore Your Idea <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="bg-[#080b2d] py-24 text-white lg:py-32">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 xl:px-16">
          <SectionHeading
            eyebrow="03 / Production Workflow"
            title="From concept"
            accent=" to creation."
            description="A structured process that helps turn an initial creative brief into a coherent video project."
            light
          />

          <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.no}
                  data-aos="fade-up"
                  data-aos-delay={index * 60}
                  className="rounded-[22px] border border-white/15 bg-white/[.035] p-6"
                >
                  <div className="flex items-start justify-between">
                    <Icon size={26} strokeWidth={1.6} className="text-[#bbc6ff]" />
                    <span className="text-[12px] font-bold text-white/40">{step.no}</span>
                  </div>
                  <div className="mt-16 border-t border-white/15 pt-7">
                    <h3 className="text-[20px] font-extrabold leading-tight tracking-[-.04em]">{step.title}</h3>
                    <p className="mt-4 text-[13px] leading-7 text-white/55">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FORMATS */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 xl:px-16">
          <div className="grid items-end gap-8 lg:grid-cols-2">
            <SectionHeading
              eyebrow="04 / Platform-Ready Thinking"
              title="One story."
              accent=" Different screens."
              description="Video concepts can be adapted to the environment where they are intended to be seen."
            />
            <p className="max-w-[400px] text-[15px] leading-8 text-[#686b7c] lg:justify-self-end">
              From vertical social content to landscape presentations, format planning begins with how audiences consume the message.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[
              {
                label: "Vertical",
                ratio: "9:16",
                use: "Short-form videos & reels",
                shape: "h-[160px] w-[90px]",
              },
              {
                label: "Square",
                ratio: "1:1",
                use: "Social feed campaigns",
                shape: "h-[135px] w-[135px]",
              },
              {
                label: "Landscape",
                ratio: "16:9",
                use: "Presentations & brand films",
                shape: "h-[100px] w-[178px]",
              },
            ].map((format) => (
              <div key={format.label} className="rounded-[24px] border border-[#e4e5ef] bg-white p-7">
                <div className="flex h-[210px] items-center justify-center rounded-[18px] bg-[#eef0fa]">
                  <div className={`${format.shape} flex items-center justify-center rounded-xl border-2 border-[#00004d]/30 bg-gradient-to-br from-[#00004d] to-[#5b62bf] shadow-xl`}>
                    <Play size={22} className="text-white" fill="white" />
                  </div>
                </div>
                <div className="mt-6 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-[24px] font-extrabold tracking-[-.04em]">{format.label}</h3>
                    <p className="mt-2 text-[13px] text-[#686b7c]">{format.use}</p>
                  </div>
                  <span className="rounded-full bg-[#eef0fa] px-3 py-2 text-[12px] font-bold text-[#00004d]">{format.ratio}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 md:px-10 lg:grid-cols-[.82fr_1.18fr] lg:gap-20 xl:px-16">
          <SectionHeading
            eyebrow="05 / FAQs"
            title="Your questions."
            accent=" Answered."
            description="A few common things to know before discussing an AI-assisted video project."
          />

          <div className="overflow-hidden rounded-[24px] border border-[#e3e5ef]">
            {faqs.map((faq, index) => (
              <div key={faq.question} className={index < faqs.length - 1 ? "border-b border-[#e3e5ef]" : ""}>
                <button
                  type="button"
                  aria-expanded={openFaq === index}
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  className="flex w-full items-center justify-between gap-5 px-6 py-6 text-left"
                >
                  <span className="text-[15px] font-bold leading-6">{faq.question}</span>
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                    openFaq === index ? "bg-[#00004d] text-white" : "bg-[#eef0fa] text-[#00004d]"
                  }`}>
                    <ChevronDown size={17} className={`transition-transform ${openFaq === index ? "rotate-180" : ""}`} />
                  </span>
                </button>
                {openFaq === index && (
                  <p className="px-6 pb-7 text-[14px] leading-8 text-[#686b7c]">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f8f8f6] px-5 py-24 md:px-10 xl:px-16">
        <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[30px] bg-[#00004d] px-7 py-20 text-center text-white md:px-12 md:py-28">
          <div className="absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full border border-white/10" />
          <div className="relative">
            <Eyebrow light>Start Your Creative Project</Eyebrow>
            <h2 className="mx-auto max-w-[920px] text-[clamp(42px,6vw,83px)] font-extrabold leading-[1.08] tracking-[-.065em]">
              The next great visual
              <br />
              <span className="text-[#cbd7ff]">starts with an idea.</span>
            </h2>
            <p className="mx-auto mt-7 max-w-[560px] text-[16px] leading-8 text-white/65">
              Tell us about the video you have in mind. Let's explore the creative direction together.
            </p>
            <Link
              to="/contact"
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-[14px] font-bold text-[#00004d] hover:bg-[#cbd7ff]"
            >
              Start a Conversation <MoveUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
