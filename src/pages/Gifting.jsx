
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Gift,
  Package,
  Leaf,
  PenLine,
  BookOpen,
  BriefcaseBusiness,
  Check,
  Lightbulb,
  Palette,
  Truck,
  MoveUpRight,
  Sparkles,
  BadgeCheck,
  Boxes,
} from "lucide-react";

import giftingHero from "../assets/images/gifting-hero.jpg";
import giftingCorporate from "../assets/images/gifting-corporate.jpg";
import giftingBrand from "../assets/images/gifting-brand.jpg";

const categories = [
  {
    number: "01",
    title: "Corporate Welcome Kits",
    description:
      "Curated onboarding and welcome kits designed to make a memorable first impression.",
    icon: BriefcaseBusiness,
    tags: ["Employee Onboarding", "Client Welcome"],
  },
  {
    number: "02",
    title: "Premium Diaries & Notebooks",
    description:
      "Elegant stationery and personalised notebooks for everyday brand visibility.",
    icon: BookOpen,
    tags: ["Corporate Stationery", "Custom Branding"],
  },
  {
    number: "03",
    title: "Branded Merchandise",
    description:
      "Useful, thoughtfully selected merchandise that keeps your brand part of daily life.",
    icon: Gift,
    tags: ["Corporate Merchandise", "Event Giveaways"],
  },
  {
    number: "04",
    title: "Sustainable Gifting",
    description:
      "Reusable gifting options including jute and canvas products for conscious brands.",
    icon: Leaf,
    tags: ["Reusable Products", "Eco-Conscious Choices"],
  },
  {
    number: "05",
    title: "Premium Pens & Accessories",
    description:
      "Refined writing instruments and branded accessories for professional occasions.",
    icon: PenLine,
    tags: ["Premium Pens", "Business Gifts"],
  },
  {
    number: "06",
    title: "Custom Gift Packaging",
    description:
      "Personalised gift boxes and packaging solutions for a distinctive unboxing experience.",
    icon: Package,
    tags: ["Premium Boxes", "Custom Packaging"],
  },
];

const advantages = [
  {
    icon: Palette,
    title: "Brand-Led Presentation",
    text: "We focus on gifting ideas that complement your identity, style and occasion.",
  },
  {
    icon: Boxes,
    title: "Versatile Gifting Options",
    text: "Explore a range of merchandise, stationery, kits and packaging solutions.",
  },
  {
    icon: BadgeCheck,
    title: "Attention to Detail",
    text: "From materials to finishing touches, presentation is an important part of the experience.",
  },
  {
    icon: Lightbulb,
    title: "Thoughtful Ideas",
    text: "We help connect the gifting experience with the people and purpose behind it.",
  },
];

const steps = [
  {
    number: "01",
    icon: Lightbulb,
    title: "Share Your Idea",
    text: "Tell us about your occasion, audience, branding requirements and approximate quantity.",
  },
  {
    number: "02",
    icon: Palette,
    title: "Explore Possibilities",
    text: "We discuss suitable products, personalisation and presentation options.",
  },
  {
    number: "03",
    icon: Truck,
    title: "Production & Delivery",
    text: "After confirmation, the selected gifting solution moves towards production and fulfilment.",
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

export default function Gifting() {
  return (
    <main className="overflow-hidden bg-[#f8f8f6] text-[#191b25]">

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#00004d] text-white">
        <div className="mx-auto grid min-h-[700px] max-w-[1440px] items-center gap-14 px-5 pb-20 pt-40 md:px-10 lg:grid-cols-2 lg:gap-20 lg:pb-28 lg:pt-44 xl:px-16">

          <div data-aos="fade-up">
            <SectionLabel number="01" light>
              Corporate Gifting Solutions
            </SectionLabel>

            <h1
              className="text-[clamp(49px,6.5vw,94px)] font-extrabold leading-[1.03] tracking-[-.075em]"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              More than
              <br />
              just a gift.
              <br />
              <span className="text-[#cbd7ff]">
                A lasting
                <br />
                impression.
              </span>
            </h1>

            <p className="mt-8 max-w-[510px] text-[16px] leading-8 text-white/70 md:text-[18px]">
              Thoughtful corporate gifting, branded merchandise and
              customised experiences that help your brand build
              meaningful connections.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-[14px] font-extrabold text-[#00004d] transition hover:bg-[#cbd7ff]"
              >
                Enquire About Gifting
                <ArrowUpRight size={18} />
              </Link>

              <a
                href="#gift-collection"
                className="inline-flex items-center gap-2 text-[14px] font-semibold text-white/80 transition hover:text-white"
              >
                Explore Collection
                <ArrowRight size={18} />
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/20 pt-6 text-[11px] font-bold uppercase tracking-[.13em] text-white/55">
              <span>Thoughtful Gifting</span>
              <span>Custom Branding</span>
              <span>Premium Presentation</span>
            </div>
          </div>

          <div className="relative" data-aos="fade-left">
            <div className="aspect-[.9] overflow-hidden rounded-[30px] bg-white/10">
              <img
                src={giftingHero}
                alt="Premium gifting presentation"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -left-3 rounded-[20px] bg-white px-6 py-5 text-[#00004d] shadow-xl md:-left-8">
              <Sparkles size={21} />
              <p className="mt-2 text-[12px] font-bold uppercase tracking-[.13em]">
                Make it meaningful
              </p>
              <p className="mt-1 text-[23px] font-extrabold leading-tight tracking-[-.05em]">
                Gift with purpose.
              </p>
            </div>

            <div className="absolute -right-3 -top-5 flex h-20 w-20 rotate-12 items-center justify-center rounded-full border border-white/30 bg-[#292987] text-center text-[10px] font-bold uppercase tracking-wider md:h-28 md:w-28">
              Create
              <br />
              Connections
            </div>
          </div>
        </div>
      </section>

      {/* INTRO STRIP */}
      <div className="bg-[#e5eaff] py-5">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 text-center text-[12px] font-extrabold uppercase tracking-[.16em] text-[#00004d] md:justify-between md:px-10 xl:px-16">
          <span>Welcome Kits</span>
          <span>✳</span>
          <span>Premium Merchandise</span>
          <span>✳</span>
          <span>Personalised Gifts</span>
          <span>✳</span>
          <span>Branded Experiences</span>
        </div>
      </div>

      {/* ABOUT GIFTING */}
      <section className="mx-auto grid max-w-[1440px] items-center gap-16 px-5 py-24 md:px-10 lg:grid-cols-2 lg:gap-24 lg:py-36 xl:px-16">

        <div className="relative" data-aos="fade-right">
          <div className="overflow-hidden rounded-[28px]">
            <img
              src={giftingCorporate}
              alt="Premium stationery and gifting materials"
              loading="lazy"
              className="h-[430px] w-full object-cover md:h-[570px]"
            />
          </div>

          <div className="absolute -bottom-6 right-0 max-w-[265px] rounded-l-[22px] bg-[#00004d] p-7 text-white md:-right-5">
            <Gift size={26} className="text-[#cbd7ff]" />
            <p className="mt-4 text-[22px] font-extrabold leading-snug tracking-[-.04em]">
              Every detail tells a story.
            </p>
          </div>
        </div>

        <div data-aos="fade-up">
          <SectionLabel number="02">
            The Art of Corporate Gifting
          </SectionLabel>

          <h2
            className="text-[clamp(38px,4.8vw,72px)] font-extrabold leading-[1.1] tracking-[-.065em]"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Thoughtful gifts.
            <br />
            <span className="text-[#00004d]">
              Stronger connections.
            </span>
          </h2>

          <p className="mt-8 text-[16px] leading-8 text-[#686b7c]">
            Corporate gifting is about more than exchanging products.
            It's an opportunity to express appreciation, celebrate
            milestones and create positive associations with your brand.
          </p>

          <p className="mt-5 text-[16px] leading-8 text-[#686b7c]">
            Growth Kriya brings together branded merchandise, welcome
            kits, premium stationery and customised packaging to help
            businesses create memorable gifting experiences.
          </p>

          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {[
              "Employee Welcome Kits",
              "Corporate Celebrations",
              "Client Appreciation",
              "Event Merchandise",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-[14px] font-bold text-[#292b3a]"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e5eaff] text-[#00004d]">
                  <Check size={15} strokeWidth={2.5} />
                </span>
                {item}
              </div>
            ))}
          </div>

          <Link
            to="/contact"
            className="mt-10 inline-flex items-center gap-3 border-b-2 border-[#00004d] pb-2 text-[15px] font-extrabold text-[#00004d]"
          >
            Discuss Your Requirements
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>

      {/* GIFT COLLECTION */}
      <section
        id="gift-collection"
        className="bg-[#f0f1f8] py-24 lg:py-32"
      >
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 xl:px-16">
          <SectionLabel number="03">
            Explore Our Gifting Solutions
          </SectionLabel>

          <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <h2
              className="text-[clamp(39px,5vw,76px)] font-extrabold leading-[1.08] tracking-[-.065em]"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Gifts that speak
              <br />
              <span className="text-[#00004d]">
                for your brand.
              </span>
            </h2>

            <p className="max-w-[345px] text-[15px] leading-8 text-[#686b7c]">
              From everyday essentials to premium presentation,
              explore gifting options suited to different business occasions.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.number}
                  data-aos="fade-up"
                  data-aos-delay={(index % 3) * 80}
                  className="group flex min-h-[350px] flex-col justify-between rounded-[26px] border border-[#e1e3f0] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#acb4d9] hover:shadow-[0_18px_50px_rgba(0,0,77,.06)] md:p-8"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="flex h-15 w-15 items-center justify-center rounded-[18px] bg-[#eef0fa] text-[#00004d] transition-colors group-hover:bg-[#00004d] group-hover:text-white">
                        <Icon size={27} strokeWidth={1.6} />
                      </div>
                      <span className="text-[12px] font-bold text-[#a0a3b9]">
                        {item.number} /
                      </span>
                    </div>

                    <h3 className="mt-10 text-[25px] font-extrabold leading-snug tracking-[-.045em]">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-[15px] leading-7 text-[#686b7c]">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#f0f1fa] px-3 py-2 text-[11px] font-semibold text-[#00004d]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-[24px] bg-[#00004d] p-7 text-white md:flex-row md:items-center md:p-9">
            <div>
              <h3 className="text-[23px] font-extrabold tracking-[-.04em]">
                Looking for something specific?
              </h3>
              <p className="mt-2 text-[14px] leading-7 text-white/65">
                Share your gifting idea and branding requirements with us.
              </p>
            </div>

            <Link
              to="/contact"
              className="inline-flex shrink-0 items-center gap-3 rounded-full bg-white px-6 py-3.5 text-[13px] font-extrabold text-[#00004d] hover:bg-[#cbd7ff]"
            >
              Request a Quote
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* BRANDING EXPERIENCE */}
      <section className="mx-auto grid max-w-[1440px] items-center gap-16 px-5 py-24 md:px-10 lg:grid-cols-2 lg:gap-24 lg:py-36 xl:px-16">
        <div data-aos="fade-up">
          <SectionLabel number="04">
            Personalised Brand Experiences
          </SectionLabel>

          <h2
            className="text-[clamp(39px,4.7vw,70px)] font-extrabold leading-[1.1] tracking-[-.065em]"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            It's the little
            <br />
            details that make
            <br />
            <span className="text-[#00004d]">
              a big difference.
            </span>
          </h2>

          <p className="mt-8 max-w-[530px] text-[16px] leading-8 text-[#686b7c]">
            A memorable gift combines the right product with thoughtful
            presentation. Personalised branding, packaging and finishing
            details help make a gifting experience feel more distinctive.
          </p>

          <div className="mt-9 space-y-5">
            {[
              "Custom logo and brand personalisation",
              "Premium packaging and gift presentation",
              "Product selection for different occasions",
              "Corporate and event gifting concepts",
            ].map((item) => (
              <div key={item} className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e5eaff] text-[#00004d]">
                  <Check size={17} />
                </span>
                <p className="pt-1 text-[15px] font-semibold text-[#36394a]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative" data-aos="fade-left">
          <div className="overflow-hidden rounded-[28px]">
            <img
              src={giftingBrand}
              alt="Creative branding and packaging materials"
              loading="lazy"
              className="h-[430px] w-full object-cover md:h-[580px]"
            />
          </div>

          <div className="absolute -bottom-6 -left-3 rounded-[20px] bg-[#00004d] px-7 py-6 text-white md:-left-6">
            <p className="text-[11px] font-bold uppercase tracking-[.16em] text-[#cbd7ff]">
              Made for your brand
            </p>
            <p className="mt-2 text-[24px] font-extrabold leading-tight tracking-[-.05em]">
              Personal. Practical.
              <br />
              Memorable.
            </p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 xl:px-16">
          <SectionLabel number="05">
            Why Growth Kriya
          </SectionLabel>

          <div className="mb-14 grid items-end gap-6 lg:grid-cols-2">
            <h2
              className="text-[clamp(39px,5vw,74px)] font-extrabold leading-[1.08] tracking-[-.065em]"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Gifting with
              <br />
              <span className="text-[#00004d]">
                intention.
              </span>
            </h2>

            <p className="max-w-[390px] text-[15px] leading-8 text-[#686b7c] lg:justify-self-end">
              We believe meaningful gifting begins with understanding
              your brand and the people receiving your gifts.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {advantages.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  data-aos="fade-up"
                  data-aos-delay={(index % 4) * 70}
                  className="rounded-[24px] border border-[#e7e7ed] bg-[#fafafd] p-7"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e5eaff] text-[#00004d]">
                    <Icon size={25} strokeWidth={1.7} />
                  </div>

                  <h3 className="mt-9 text-[22px] font-extrabold leading-snug tracking-[-.045em]">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-[14px] leading-7 text-[#686b7c]">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-[#00004d] py-24 text-white lg:py-32">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 xl:px-16">
          <SectionLabel number="06" light>
            Our Gifting Process
          </SectionLabel>

          <div className="mb-16 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <h2
              className="text-[clamp(39px,5vw,76px)] font-extrabold leading-[1.08] tracking-[-.065em]"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              From your idea
              <br />
              <span className="text-[#cbd7ff]">
                to a thoughtful gift.
              </span>
            </h2>

            <p className="max-w-[340px] text-[15px] leading-8 text-white/60">
              A simple, collaborative process built around your
              requirements and gifting occasion.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="rounded-[25px] border border-white/20 p-8 md:p-9"
                >
                  <div className="flex items-start justify-between">
                    <Icon
                      size={29}
                      strokeWidth={1.5}
                      className="text-[#cbd7ff]"
                    />
                    <span className="text-[13px] font-bold text-white/50">
                      {step.number} /
                    </span>
                  </div>

                  <div className="mt-16 h-[1px] w-full bg-white/20" />

                  <h3 className="mt-8 text-[25px] font-extrabold tracking-[-.045em]">
                    {step.title}
                  </h3>

                  <p className="mt-4 text-[15px] leading-8 text-white/60">
                    {step.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OCCASIONS */}
      <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 lg:py-32 xl:px-16">
        <SectionLabel number="07">
          Made for Every Occasion
        </SectionLabel>

        <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h2
            className="text-[clamp(38px,5vw,73px)] font-extrabold leading-[1.08] tracking-[-.065em]"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Every occasion
            <br />
            <span className="text-[#00004d]">
              deserves a gesture.
            </span>
          </h2>

          <p className="max-w-[350px] text-[15px] leading-8 text-[#686b7c]">
            Meaningful gifting concepts for the people, occasions
            and milestones that matter to your business.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Employee Onboarding",
            "Festive Corporate Gifting",
            "Client Appreciation",
            "Company Milestones",
            "Events & Conferences",
            "Employee Recognition",
          ].map((item, index) => (
            <div
              key={item}
              data-aos="fade-up"
              data-aos-delay={(index % 3) * 60}
              className="group flex min-h-[125px] items-end justify-between rounded-[20px] border border-[#e3e4ec] bg-white p-6 transition-all hover:border-[#b4b9d7] hover:bg-[#eef0fa]"
            >
              <h3 className="max-w-[220px] text-[19px] font-extrabold leading-snug tracking-[-.035em]">
                {item}
              </h3>

              <MoveUpRight
                size={20}
                className="shrink-0 text-[#00004d] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </div>
          ))}
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
              Corporate Gifting Enquiries
            </p>

            <h2
              className="mx-auto max-w-[950px] text-[clamp(42px,6vw,86px)] font-extrabold leading-[1.08] tracking-[-.065em]"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Let's make your
              <br />
              <span className="text-[#cbd7ff]">
                next gift unforgettable.
              </span>
            </h2>

            <p className="mx-auto mt-7 max-w-[530px] text-[16px] leading-8 text-white/65">
              Planning gifts for your team, clients or upcoming event?
              Tell us what you have in mind.
            </p>

            <Link
              to="/contact"
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-[15px] font-extrabold text-[#00004d] transition hover:bg-[#cbd7ff]"
            >
              Get a Gifting Quote
              <ArrowUpRight size={19} />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
