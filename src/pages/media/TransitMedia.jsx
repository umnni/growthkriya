import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, ChevronDown, CheckCircle2, Sparkles, CirclePlay, ArrowLeft } from "lucide-react";

// All content, visuals and FAQ for Transit Media live IN THIS FILE.
// No ServicePage or ServiceArtwork dependency.
const service = {
  "group": "media",
  "title": "Transit Media",
  "kicker": "THE CITY IS YOUR CANVAS",
  "headline": "Move with the city.",
  "accent": "Stay with the audience.",
  "desc": "Place your message within the routes people travel every day, with transit-led brand visibility planned around location and audience movement.",
  "visual": "transit",
  "theme": [
    "#063f4c",
    "#4ce0d2",
    "#e4f9f5"
  ],
  "offer": [
    "Metro & station environments",
    "Bus and fleet branding",
    "Railway and transit touchpoints",
    "Route-based campaign planning"
  ],
  "steps": [
    "Identify high-relevance routes and commuter audiences",
    "Choose suitable transit placements and formats",
    "Adapt creatives to physical dimensions and viewing distance",
    "Plan production and coordinated display"
  ],
  "faq": [
    "What locations can a transit campaign cover?",
    "Placement depends on available inventory and permissions across selected transit networks."
  ],
  "highlights": [
    "Route-focused planning",
    "High-frequency visibility",
    "Real-world brand presence"
  ],
  "detail": [
    "The commuter journey",
    "Visibility is shaped by routes, dwell time, viewing angles and the rhythm of daily travel. Campaigns should be planned for each placement, not simply resized from digital banners."
  ]
};
const artwork = ["ROUTE / 01", "CITY EXPRESS", "NEXT STOP: YOUR BRAND", "▰ ▰ ▰ ▰", "An urban route-inspired creative window."];
const visualStyle = 2;

export default function TransitMedia() {
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${service.title} | Growth Kriya`;
    return () => { document.title = previousTitle; };
  }, []);

  const detailTitle = service.detail[0];
  const detailText = service.detail[1];
  const faqQuestions = [
    { q: service.faq[0], a: service.faq[1] },
    { q: `What is included in a ${service.title.toLowerCase()} project?`, a: `The exact scope depends on the brief. Typical discussions cover ${service.offer.slice(0, 3).join(", ").toLowerCase()}, suitable production choices, timelines and review requirements.` },
    { q: "How do we get started?", a: "Share your brand, intended audience, goals, timeline and any references. We can then discuss the suitable deliverables and practical next steps." },
    { q: "Can requirements be customised?", a: "Yes. Format, quantity, creative direction and production specifications can be discussed and finalised against an approved project brief." },
  ];

  return (
    <main className="overflow-hidden bg-[#f8f8f6] text-[#191b25]">
      {/* PAGE HERO — TRANSIT VISUAL */}
      <section className="relative overflow-hidden pt-[90px] text-white" style={{ backgroundColor: service.theme[0] }}>
        <div className="pointer-events-none absolute -right-32 -top-32 h-[540px] w-[540px] rounded-full border border-white/10" />
        <div className="mx-auto grid min-h-[620px] max-w-[1440px] items-center gap-12 px-5 py-20 md:px-10 lg:grid-cols-2 lg:gap-16 xl:px-16">
          <div data-aos="fade-up">
            <div className="mb-7 flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[.20em]" style={{ color: service.theme[1] }}>
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: service.theme[1] }} />
              GROWTH KRIYA / {service.group === "website" ? "DIGITAL" : service.group.toUpperCase()}
            </div>
            <div className="mb-6 inline-flex rounded-full border border-white/20 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-white/80">
              {service.title}
            </div>
            <h1 className="text-[clamp(44px,5.6vw,86px)] font-black leading-[1.04] tracking-[-.07em]">
              {service.headline}<br />
              <span style={{ color: service.theme[1] }}>{service.accent}</span>
            </h1>
            <p className="mt-7 max-w-[560px] text-[16px] leading-8 text-white/70 md:text-[18px]">{service.desc}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-[14px] font-bold" style={{ color: service.theme[0] }}>
                Discuss Your Project <ArrowUpRight size={18} />
              </Link>
              <a href="#solutions" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-[14px] font-semibold text-white transition hover:bg-white/10">
                Explore Solutions <ArrowRight size={17} />
              </a>
            </div>
          </div>

          <div data-aos="fade-left" className="relative mx-auto w-full max-w-[560px]">
            <div className="absolute -inset-8 rounded-full opacity-30 blur-[65px]" style={{ backgroundColor: service.theme[1] }} />
            <div className="relative min-h-[370px] overflow-hidden rounded-[30px] border border-white/25 p-6 shadow-[0_30px_80px_rgba(0,0,0,.28)] md:min-h-[430px] md:p-8"
              style={{ background: `linear-gradient(140deg, ${service.theme[0]} 5%, ${service.theme[1]}49 140%)` }}>
              <div className="relative z-10 flex items-center justify-between gap-3 text-[11px] font-bold uppercase tracking-[.18em] text-white/70">
                <span>{artwork[0]}</span><Sparkles size={20} />
              </div>
              {visualStyle === 0 && (
                <div className="absolute left-[14%] top-[24%] flex h-[58%] w-[72%] rotate-[-9deg] items-center justify-center rounded-[28px] border-[14px] border-white/20 bg-white/10 shadow-2xl">
                  <div className="h-[75%] w-[75%] rounded-full border-[30px] border-white/20" />
                </div>
              )}
              {visualStyle === 1 && (
                <div className="absolute inset-x-[16%] top-[23%] grid h-[54%] rotate-[7deg] grid-cols-3 gap-3">
                  {[1,2,3].map(n => <div key={n} className="rounded-[22px] border-2 border-white/30 bg-white/10 shadow-xl" style={{ transform: `translateY(${n*12}px)` }} />)}
                </div>
              )}
              {visualStyle === 2 && (
                <div className="absolute inset-x-[12%] top-[23%] flex h-[51%] items-center justify-center rounded-[24px] border-[8px] border-white/25 bg-black/25">
                  <CirclePlay size={85} strokeWidth={1} className="text-white/70" />
                </div>
              )}
              {visualStyle === 3 && (
                <div className="absolute inset-x-[12%] top-[25%] flex h-[48%] items-center justify-center gap-3">
                  {[36,55,83,43,96,68,44,86,56,39].map((h,i) => <span key={i} className="w-full rounded-full bg-white/35" style={{height: `${h}%`}} />)}
                </div>
              )}
              {visualStyle === 4 && (
                <div className="absolute left-[19%] top-[22%] h-[56%] w-[60%] rotate-[-7deg] rounded-[16px] border border-white/40 bg-white/15 p-5 shadow-2xl">
                  <div className="h-3 w-[60%] rounded-full bg-white/60" /><div className="mt-6 h-20 rounded-lg bg-white/15" />
                  <div className="mt-5 h-2 w-full rounded-full bg-white/30" /><div className="mt-3 h-2 w-3/4 rounded-full bg-white/30" />
                </div>
              )}
              <div className="absolute bottom-8 left-6 right-6 z-10 rounded-2xl border border-white/20 bg-black/30 p-5 backdrop-blur-md md:left-8 md:right-8">
                <div className="mb-2 text-[10px] font-bold uppercase tracking-[.15em]" style={{color: service.theme[1]}}>{artwork[1]}</div>
                <p className="text-[clamp(20px,2.5vw,35px)] font-black leading-tight tracking-[-.05em] text-white">{artwork[2]}</p>
                <p className="mt-2 text-[11px] text-white/60">{artwork[4]}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES: LOCAL CAPABILITIES */}
      <section id="solutions" className="scroll-mt-28 py-24 lg:py-32">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 xl:px-16">
          <p className="mb-5 text-[11px] font-extrabold uppercase tracking-[.19em]" style={{color:service.theme[0]}}>01 / WHAT WE CAN CREATE</p>
          <h2 className="max-w-[950px] text-[clamp(38px,5vw,72px)] font-black leading-[1.08] tracking-[-.06em]">Designed around <span style={{color:service.theme[0]}}>{service.title.toLowerCase()}.</span></h2>
          <p className="mt-6 max-w-[720px] text-[16px] leading-8 text-[#686b7c]">Explore the typical solutions and deliverables that can form part of a brief. Final specifications are agreed for each project.</p>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {service.offer.map((item,index) => (
              <article key={item} data-aos="fade-up" data-aos-delay={(index % 2)*80} className="group flex min-h-[220px] flex-col justify-between rounded-[25px] border border-[#e3e5ef] bg-white p-8 transition hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(0,0,77,.06)]">
                <div className="flex items-center justify-between"><span className="text-[12px] font-extrabold tracking-[.15em] text-[#969aaf]">0{index+1} /</span><ArrowUpRight size={20} style={{color:service.theme[0]}} /></div>
                <div className="mt-12"><h3 className="text-[clamp(22px,2.2vw,30px)] font-extrabold tracking-[-.045em]">{item}</h3><p className="mt-3 text-[14px] leading-7 text-[#777989]">{service.title} solutions shaped by communication goals, practical production requirements and the final audience experience.</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE-SPECIFIC EDITORIAL SPOTLIGHT */}
      <section className="py-24 lg:py-32" style={{backgroundColor:service.theme[2]}}>
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 md:px-10 lg:grid-cols-2 lg:gap-20 xl:px-16">
          <div data-aos="fade-up" className="rounded-[30px] p-9 text-white md:p-12" style={{backgroundColor: service.theme[0]}}>
            <p className="text-[11px] font-extrabold uppercase tracking-[.2em]" style={{color:service.theme[1]}}>02 / THE CREATIVE DETAIL</p>
            <div className="my-16 text-center text-[clamp(38px,5vw,72px)] font-black tracking-[-.07em]" style={{color:service.theme[1]}}>{artwork[3]}</div>
            <p className="border-t border-white/20 pt-5 text-[13px] text-white/65">{service.kicker}</p>
          </div>
          <div data-aos="fade-left">
            <p className="mb-5 text-[11px] font-extrabold uppercase tracking-[.2em]" style={{color:service.theme[0]}}>WHAT MAKES IT MATTER</p>
            <h2 className="text-[clamp(37px,4.5vw,65px)] font-black leading-[1.09] tracking-[-.065em]">{detailTitle}</h2>
            <p className="mt-7 text-[16px] leading-9 text-[#65697c]">{detailText}</p>
            <div className="mt-9 space-y-4">
              {service.highlights.map(item => <div key={item} className="flex items-center gap-3 border-b border-black/10 pb-4"><CheckCircle2 size={20} style={{color:service.theme[0]}} /><span className="text-[15px] font-semibold">{item}</span></div>)}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 xl:px-16">
          <p className="mb-5 text-[11px] font-extrabold uppercase tracking-[.18em]" style={{color:service.theme[0]}}>03 / HOW WE APPROACH IT</p>
          <h2 className="text-[clamp(38px,5vw,70px)] font-black leading-[1.07] tracking-[-.06em]">From brief to <span style={{color:service.theme[0]}}>execution.</span></h2>
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {service.steps.map((step,index) => (
              <div key={step} className="flex min-h-[240px] flex-col justify-between rounded-[23px] border border-[#e3e5ef] bg-white p-7">
                <span className="text-[13px] font-black" style={{color:service.theme[0]}}>0{index+1} /</span>
                <p className="text-[18px] font-bold leading-7 tracking-[-.02em]">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ: LOCAL AND INTERACTIVE */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:px-10 lg:grid-cols-[.8fr_1.2fr] xl:px-16">
          <div><p className="mb-5 text-[11px] font-extrabold uppercase tracking-[.18em]" style={{color:service.theme[0]}}>04 / FAQS</p>
            <h2 className="text-[clamp(38px,4.5vw,64px)] font-black leading-[1.08] tracking-[-.06em]">Good questions.<br /><span style={{color:service.theme[0]}}>Clear answers.</span></h2>
            <p className="mt-7 max-w-[380px] text-[15px] leading-8 text-[#686b7c]">Common questions about planning and delivering this service.</p>
          </div>
          <div className="overflow-hidden rounded-[24px] border border-[#e3e5ef]">
            {faqQuestions.map((faq,index) => (
              <div key={faq.q} className={index < faqQuestions.length - 1 ? "border-b border-[#e3e5ef]" : ""}>
                <button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index} className="flex w-full items-center justify-between gap-5 px-6 py-6 text-left">
                  <span className="text-[15px] font-bold leading-6">{faq.q}</span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full" style={{backgroundColor: openFaq === index ? service.theme[0] : service.theme[2], color:openFaq === index ? '#ffffff' : service.theme[0]}}>
                    <ChevronDown size={17} className={`transition-transform ${openFaq === index ? "rotate-180" : ""}`} />
                  </span>
                </button>
                {openFaq === index && <p className="px-6 pb-7 text-[14px] leading-8 text-[#686b7c]">{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 py-24 md:px-10 xl:px-16">
        <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[30px] px-7 py-20 text-center text-white md:px-12 md:py-28" style={{backgroundColor:service.theme[0]}}>
          <p className="mb-5 text-[11px] font-extrabold uppercase tracking-[.2em]" style={{color:service.theme[1]}}>LET'S CREATE SOMETHING MEANINGFUL</p>
          <h2 className="mx-auto max-w-[950px] text-[clamp(42px,5.7vw,79px)] font-black leading-[1.09] tracking-[-.065em]">Ready to explore <br /><span style={{color:service.theme[1]}}>{service.title.toLowerCase()}?</span></h2>
          <p className="mx-auto mt-6 max-w-[620px] text-[16px] leading-8 text-white/65">Share your requirements and let's discuss a direction suited to your brand.</p>
          <Link to="/contact" className="mt-9 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-[14px] font-extrabold" style={{color:service.theme[0]}}>Start a Conversation <ArrowUpRight size={18} /></Link>
        </div>
      </section>
    </main>
  );
}
