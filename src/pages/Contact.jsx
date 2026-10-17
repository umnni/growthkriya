
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDownRight,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  ChevronDown,
  Megaphone,
  Printer,
  Gift,
  Globe2,
  MessagesSquare,
  Clock3,
  Lightbulb,
  Handshake,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const services = [
  "Media & Advertising",
  "Printing & Production",
  "Corporate Gifting",
  "Website Development",
  "Multiple Services",
  "Other Enquiry",
];

const contactOptions = [
  {
    number: "01",
    icon: Megaphone,
    title: "Media & Advertising",
    description:
      "Looking to build brand visibility through media campaigns, advertising or creative promotions?",
    service: "Media & Advertising",
  },
  {
    number: "02",
    icon: Printer,
    title: "Printing & Production",
    description:
      "Need premium stationery, printed materials, merchandise or customised packaging?",
    service: "Printing & Production",
  },
  {
    number: "03",
    icon: Gift,
    title: "Corporate Gifting",
    description:
      "Planning memorable gifting experiences for clients, employees or special occasions?",
    service: "Corporate Gifting",
  },
  {
    number: "04",
    icon: Globe2,
    title: "Website Development",
    description:
      "Have a website or digital experience in mind? Share your ideas and requirements.",
    service: "Website Development",
  },
];

const benefits = [
  {
    icon: MessagesSquare,
    title: "Clear Communication",
    description:
      "Tell us what you have in mind so we can understand your project requirements.",
  },
  {
    icon: Lightbulb,
    title: "Creative Thinking",
    description:
      "Explore practical and creative ideas suited to your brand objectives.",
  },
  {
    icon: Handshake,
    title: "Collaborative Approach",
    description:
      "We believe strong projects begin with meaningful conversations.",
  },
  {
    icon: ShieldCheck,
    title: "Integrated Solutions",
    description:
      "Discuss multiple requirements across media, printing, gifting and digital.",
  },
];

const faqs = [
  {
    question: "What services does Growth Kriya provide?",
    answer:
      "Growth Kriya offers media and advertising, printing and production, corporate gifting, website development and other brand-focused solutions.",
  },
  {
    question: "Can I enquire about multiple services together?",
    answer:
      "Yes. You can choose Multiple Services in the contact form and describe all your requirements in the message field.",
  },
  {
    question: "Can I request customised corporate gifting?",
    answer:
      "Yes. Share your preferred gifting category, branding requirements, quantity and budget. The team can review your requirements and discuss possible options.",
  },
  {
    question: "What information should I include in my enquiry?",
    answer:
      "Include the service you need, your project goals, expected quantity or scope, preferred timeline and any additional requirements.",
  },
  {
    question: "Can I discuss a project before finalising the requirements?",
    answer:
      "You can submit an initial enquiry outlining your idea. Detailed requirements can be discussed during the next conversation.",
  },
];

const initialForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  budget: "",
  message: "",
  consent: false,
};

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

function ContactForm({ selectedService, setSelectedService }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setStatus("");
  };

  const chooseService = (value) => {
    setSelectedService(value);
    update("service", value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Frontend demo only.
    // Connect this handler to a PHP/API backend to deliver emails.
    setStatus(
      "Your details are ready, but the enquiry has not been sent yet. Email integration is pending."
    );
  };

  const inputClass =
    "mt-2.5 w-full rounded-[13px] border border-[#dedfeb] bg-white px-4 py-[15px] text-[14px] text-[#191b25] outline-none transition placeholder:text-[#a0a2b0] focus:border-[#00004d] focus:ring-2 focus:ring-[#00004d]/10";

  return (
    <form onSubmit={handleSubmit} className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
      <label className="block text-[13px] font-bold text-[#292b39]">
        Full Name <span className="text-[#00004d]">*</span>
        <input
          type="text"
          required
          autoComplete="name"
          placeholder="Enter your full name"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className={inputClass}
        />
      </label>

      <label className="block text-[13px] font-bold text-[#292b39]">
        Company / Organisation
        <input
          type="text"
          autoComplete="organization"
          placeholder="Your company name"
          value={form.company}
          onChange={(e) => update("company", e.target.value)}
          className={inputClass}
        />
      </label>

      <label className="block text-[13px] font-bold text-[#292b39]">
        Email Address <span className="text-[#00004d]">*</span>
        <input
          type="email"
          required
          autoComplete="email"
          placeholder="name@company.com"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className={inputClass}
        />
      </label>

      <label className="block text-[13px] font-bold text-[#292b39]">
        Phone Number <span className="text-[#00004d]">*</span>
        <input
          type="tel"
          required
          autoComplete="tel"
          minLength={8}
          placeholder="+91 XXXXX XXXXX"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          className={inputClass}
        />
      </label>

      <label className="block text-[13px] font-bold text-[#292b39]">
        Service Required <span className="text-[#00004d]">*</span>
        <div className="relative">
          <select
            required
            value={selectedService || form.service}
            onChange={(e) => chooseService(e.target.value)}
            className={`${inputClass} appearance-none pr-10`}
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          <ChevronDown
            size={17}
            className="pointer-events-none absolute bottom-[19px] right-4 text-[#00004d]"
          />
        </div>
      </label>

      <label className="block text-[13px] font-bold text-[#292b39]">
        Estimated Budget
        <div className="relative">
          <select
            value={form.budget}
            onChange={(e) => update("budget", e.target.value)}
            className={`${inputClass} appearance-none pr-10`}
          >
            <option value="">Select budget (optional)</option>
            <option value="Under ₹25,000">Under ₹25,000</option>
            <option value="₹25,000 – ₹50,000">₹25,000 – ₹50,000</option>
            <option value="₹50,000 – ₹1,00,000">₹50,000 – ₹1,00,000</option>
            <option value="₹1,00,000 – ₹5,00,000">₹1,00,000 – ₹5,00,000</option>
            <option value="Above ₹5,00,000">Above ₹5,00,000</option>
            <option value="Need guidance">Need guidance</option>
          </select>
          <ChevronDown
            size={17}
            className="pointer-events-none absolute bottom-[19px] right-4 text-[#00004d]"
          />
        </div>
      </label>

      <label className="block text-[13px] font-bold text-[#292b39] sm:col-span-2">
        Tell Us About Your Project <span className="text-[#00004d]">*</span>
        <textarea
          required
          rows={6}
          placeholder="Tell us about your project, objectives, requirements or anything you'd like us to know..."
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className={`${inputClass} resize-y`}
        />
      </label>

      <label className="flex cursor-pointer items-start gap-3 sm:col-span-2">
        <input
          type="checkbox"
          required
          checked={form.consent}
          onChange={(e) => update("consent", e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-[#00004d]"
        />
        <span className="text-[12px] leading-6 text-[#777989]">
          I agree to be contacted by Growth Kriya regarding my enquiry.
        </span>
      </label>

      <div className="flex flex-col items-start justify-between gap-5 border-t border-[#e7e8ef] pt-6 sm:col-span-2 md:flex-row md:items-center">
        <p className="max-w-[340px] text-[12px] leading-6 text-[#858797]">
          This form is a frontend preview. Email delivery will be
          enabled after backend integration.
        </p>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-3 rounded-full bg-[#00004d] px-8 py-4 text-[14px] font-bold text-white transition hover:bg-[#292987]"
        >
          Submit Enquiry
          <Send size={17} />
        </button>
      </div>

      {status && (
        <div
          role="status"
          className="rounded-xl border border-[#cbd1ef] bg-[#eef0fa] px-5 py-4 text-[13px] leading-6 text-[#00004d] sm:col-span-2"
        >
          {status}
        </div>
      )}
    </form>
  );
}

export default function Contact() {
  const [selectedService, setSelectedService] = useState("");
  const [openFaq, setOpenFaq] = useState(0);

  const selectEnquiry = (service) => {
    setSelectedService(service);
    document.getElementById("contact-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="overflow-hidden bg-[#f8f8f6] text-[#191b25]">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#00004d] text-white">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-[420px] w-[420px] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute bottom-[-250px] left-[-200px] h-[500px] w-[500px] rounded-full bg-[#292987]/40 blur-[120px]" />

        <div className="relative mx-auto grid min-h-[620px] max-w-[1440px] items-center gap-14 px-5 pb-24 pt-40 md:px-10 lg:grid-cols-[1.15fr_.85fr] lg:pb-32 lg:pt-44 xl:px-16">
          <div data-aos="fade-up">
            <SectionLabel number="01" light>
              Contact Growth Kriya
            </SectionLabel>

            <h1
              className="text-[clamp(54px,7.2vw,112px)] font-extrabold leading-[.98] tracking-[-.075em]"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Let's start
              <br />
              something
              <br />
              <span className="text-[#cbd7ff]">great.</span>
            </h1>

            <p className="mt-8 max-w-[560px] text-[16px] leading-8 text-white/70 md:text-[18px]">
              Have a project, an idea or a challenge? Tell us what
              you're looking to achieve. Great collaborations
              begin with a conversation.
            </p>

            <a
              href="#contact-form"
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-[14px] font-extrabold text-[#00004d] transition hover:bg-[#cbd7ff]"
            >
              Send an Enquiry
              <ArrowUpRight size={18} />
            </a>
          </div>

          <div
            data-aos="fade-left"
            className="relative hidden lg:flex lg:items-center lg:justify-center"
          >
            <div className="relative flex h-[390px] w-[390px] items-center justify-center rounded-full border border-white/20 xl:h-[440px] xl:w-[440px]">
              <div className="absolute inset-9 rounded-full border border-white/15" />
              <div className="absolute inset-[75px] rounded-full bg-white/[.07]" />

              <div className="relative flex h-44 w-44 flex-col items-center justify-center rounded-full bg-white text-[#00004d] shadow-2xl">
                <MessagesSquare size={40} strokeWidth={1.5} />
                <span className="mt-3 text-[13px] font-extrabold uppercase tracking-[.12em]">
                  Let's Talk
                </span>
              </div>

              <div className="absolute -left-3 top-12 flex h-20 w-20 items-center justify-center rounded-[24px] bg-[#cbd7ff] text-[#00004d] shadow-xl">
                <Lightbulb size={31} strokeWidth={1.6} />
              </div>

              <div className="absolute -right-1 bottom-12 flex h-20 w-20 items-center justify-center rounded-[24px] bg-[#292987] text-white shadow-xl">
                <Handshake size={31} strokeWidth={1.6} />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[.18em] text-white/50 md:left-10 xl:left-16">
          <span className="h-[1px] w-10 bg-white/40" />
          Ideas start here
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto grid max-w-[1440px] gap-10 px-5 py-24 md:px-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end lg:py-32 xl:px-16">
        <div data-aos="fade-up">
          <SectionLabel number="02">
            Let's Connect
          </SectionLabel>

          <h2
            className="text-[clamp(39px,5vw,76px)] font-extrabold leading-[1.08] tracking-[-.065em]"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Every big idea
            <br />
            starts with
            <br />
            <span className="text-[#00004d]">a conversation.</span>
          </h2>
        </div>

        <div data-aos="fade-up" data-aos-delay="100">
          <p className="max-w-[510px] text-[17px] leading-9 text-[#686b7c]">
            Whether you're planning a campaign, developing brand
            collateral, organising corporate gifts or building a
            digital presence, we'd love to understand what you need.
          </p>

          <p className="mt-5 max-w-[510px] text-[16px] leading-8 text-[#686b7c]">
            Choose the service you're interested in or simply tell
            us about your project. Let's explore what's possible.
          </p>
        </div>
      </section>

      {/* QUICK ENQUIRY OPTIONS */}
      <section className="bg-[#f0f1f8] py-24 lg:py-32">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 xl:px-16">
          <SectionLabel number="03">
            How Can We Help?
          </SectionLabel>

          <div className="mb-12 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <h2
              className="text-[clamp(39px,5vw,74px)] font-extrabold leading-[1.08] tracking-[-.065em]"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Tell us what
              <br />
              <span className="text-[#00004d]">you have in mind.</span>
            </h2>

            <p className="max-w-[350px] text-[15px] leading-8 text-[#686b7c]">
              Select a service to begin your enquiry and share
              the details with our team.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {contactOptions.map((item, index) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.number}
                  type="button"
                  data-aos="fade-up"
                  data-aos-delay={(index % 2) * 100}
                  onClick={() => selectEnquiry(item.service)}
                  className="group flex min-h-[275px] flex-col justify-between rounded-[25px] border border-[#e3e4ef] bg-white p-7 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#b5bcdf] hover:shadow-[0_15px_45px_rgba(0,0,77,.06)] md:p-9"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-15 w-15 items-center justify-center rounded-[18px] bg-[#eef0fa] text-[#00004d] transition-colors group-hover:bg-[#00004d] group-hover:text-white">
                      <Icon size={28} strokeWidth={1.6} />
                    </div>
                    <ArrowUpRight
                      size={23}
                      className="text-[#00004d] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </div>

                  <div className="mt-10">
                    <p className="mb-3 text-[11px] font-extrabold tracking-[.16em] text-[#9396ad]">
                      {item.number} /
                    </p>
                    <h3 className="text-[26px] font-extrabold tracking-[-.045em]">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-[450px] text-[15px] leading-7 text-[#686b7c]">
                      {item.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* MAIN CONTACT FORM */}
      <section
        id="contact-form"
        className="scroll-mt-[95px] py-24 lg:py-36"
      >
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 md:px-10 lg:grid-cols-[.78fr_1.22fr] lg:gap-20 xl:px-16">
          <div data-aos="fade-up">
            <SectionLabel number="04">
              Start Your Project
            </SectionLabel>

            <h2
              className="text-[clamp(42px,5vw,74px)] font-extrabold leading-[1.08] tracking-[-.065em]"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Have an idea?
              <br />
              <span className="text-[#00004d]">
                Let's hear it.
              </span>
            </h2>

            <p className="mt-7 max-w-[440px] text-[16px] leading-8 text-[#686b7c]">
              Fill out the enquiry form with your project details.
              Share as much as you can about your requirements.
            </p>

            <div className="mt-12 space-y-7 border-t border-[#e1e2ea] pt-9">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[15px] bg-[#e5eaff] text-[#00004d]">
                  <Mail size={21} />
                </span>
                <div>
                  <h3 className="text-[15px] font-extrabold">
                    Email Enquiries
                  </h3>
                  <p className="mt-2 text-[13px] leading-6 text-[#777989]">
                    Official email address to be added after
                    client confirmation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[15px] bg-[#e5eaff] text-[#00004d]">
                  <Phone size={21} />
                </span>
                <div>
                  <h3 className="text-[15px] font-extrabold">
                    Phone / WhatsApp
                  </h3>
                  <p className="mt-2 text-[13px] leading-6 text-[#777989]">
                    Business contact number to be added after
                    client confirmation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[15px] bg-[#e5eaff] text-[#00004d]">
                  <MapPin size={21} />
                </span>
                <div>
                  <h3 className="text-[15px] font-extrabold">
                    Office Location
                  </h3>
                  <p className="mt-2 text-[13px] leading-6 text-[#777989]">
                    Verified office address to be added.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 rounded-[22px] bg-[#e5eaff] p-7">
              <Sparkles size={25} className="text-[#00004d]" />
              <p className="mt-4 text-[20px] font-extrabold leading-snug tracking-[-.035em] text-[#00004d]">
                Good conversations create great possibilities.
              </p>
              <p className="mt-3 text-[13px] leading-7 text-[#555a7b]">
                Let's understand your requirements and work
                towards a meaningful solution.
              </p>
            </div>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="rounded-[28px] border border-[#e2e3ef] bg-white p-6 shadow-[0_20px_65px_rgba(0,0,77,.045)] md:p-10 lg:p-12"
          >
            <div className="mb-9 flex flex-col justify-between gap-4 border-b border-[#e7e8ef] pb-8 sm:flex-row sm:items-start">
              <div>
                <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[.17em] text-[#00004d]">
                  Project Enquiry
                </p>
                <h3 className="text-[29px] font-extrabold tracking-[-.05em] md:text-[36px]">
                  Tell us about your project.
                </h3>
                <p className="mt-3 text-[14px] leading-7 text-[#858797]">
                  Complete the details below to prepare your enquiry.
                </p>
              </div>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#00004d] text-white">
                <ArrowUpRight size={22} />
              </div>
            </div>

            <ContactForm
              selectedService={selectedService}
              setSelectedService={setSelectedService}
            />
          </div>
        </div>
      </section>

      {/* WHY CONNECT */}
      <section className="bg-[#00004d] py-24 text-white lg:py-32">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 xl:px-16">
          <SectionLabel number="05" light>
            Why Connect With Us
          </SectionLabel>

          <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <h2
              className="text-[clamp(39px,5vw,76px)] font-extrabold leading-[1.08] tracking-[-.065em]"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              The right partner.
              <br />
              <span className="text-[#cbd7ff]">
                The right conversation.
              </span>
            </h2>

            <p className="max-w-[340px] text-[15px] leading-8 text-white/60">
              Every project begins with understanding the
              people, ideas and goals behind it.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  data-aos="fade-up"
                  data-aos-delay={(index % 4) * 70}
                  className="rounded-[24px] border border-white/20 p-7"
                >
                  <Icon
                    size={28}
                    strokeWidth={1.6}
                    className="text-[#cbd7ff]"
                  />

                  <h3 className="mt-12 text-[22px] font-extrabold leading-snug tracking-[-.045em]">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-[14px] leading-7 text-white/60">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-24 lg:py-36 xl:px-16">
        <div data-aos="fade-up">
          <SectionLabel number="06">
            Frequently Asked Questions
          </SectionLabel>

          <h2
            className="text-[clamp(39px,4.8vw,69px)] font-extrabold leading-[1.1] tracking-[-.065em]"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Questions?
            <br />
            <span className="text-[#00004d]">
              We've got answers.
            </span>
          </h2>

          <p className="mt-7 max-w-[410px] text-[16px] leading-8 text-[#686b7c]">
            Here are a few things that might help before
            starting your next project with Growth Kriya.
          </p>

          <Link
            to="/faq"
            className="mt-8 inline-flex items-center gap-3 border-b-2 border-[#00004d] pb-2 text-[15px] font-extrabold text-[#00004d]"
          >
            View FAQ Page
            <ArrowUpRight size={18} />
          </Link>
        </div>

        <div data-aos="fade-up" data-aos-delay="100">
          <div className="overflow-hidden rounded-[24px] border border-[#e3e4ed] bg-white">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className={`${
                  index !== faqs.length - 1
                    ? "border-b border-[#e7e8ef]"
                    : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenFaq(openFaq === index ? -1 : index)
                  }
                  aria-expanded={openFaq === index}
                  className="flex w-full items-center justify-between gap-5 px-6 py-6 text-left md:px-8"
                >
                  <span className="text-[15px] font-extrabold leading-6 text-[#252738] md:text-[17px]">
                    {faq.question}
                  </span>

                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                      openFaq === index
                        ? "bg-[#00004d] text-white"
                        : "bg-[#eef0fa] text-[#00004d]"
                    }`}
                  >
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-300 ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </button>

                {openFaq === index && (
                  <div className="px-6 pb-7 md:px-8">
                    <p className="max-w-[650px] text-[14px] leading-8 text-[#686b7c]">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
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
              Let's Make It Happen
            </p>

            <h2
              className="mx-auto max-w-[900px] text-[clamp(42px,6vw,86px)] font-extrabold leading-[1.08] tracking-[-.065em]"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Your next big idea
              <br />
              <span className="text-[#cbd7ff]">
                starts here.
              </span>
            </h2>

            <p className="mx-auto mt-7 max-w-[540px] text-[16px] leading-8 text-white/65">
              Let's connect, explore possibilities and create
              something meaningful for your brand.
            </p>

            <a
              href="#contact-form"
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-[15px] font-extrabold text-[#00004d] transition hover:bg-[#cbd7ff]"
            >
              Start Your Project
              <ArrowUpRight size={19} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
