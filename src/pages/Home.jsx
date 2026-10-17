
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight, ArrowRight, MoveUpRight, Sparkles,
  Megaphone, Package, Globe2, Gift, CheckCircle2, Send
} from 'lucide-react';

const photo = {
  hero: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1400&auto=format&fit=crop&q=85',
  media: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1100&auto=format&fit=crop&q=85',
  printing: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=1100&auto=format&fit=crop&q=85',
  gifting: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=1100&auto=format&fit=crop&q=85',
  web: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1100&auto=format&fit=crop&q=85',
};

const services = [
  {
    n: '01',
    title: 'Media & Advertising',
    desc: 'From digital and broadcast to outdoor and transit, we put brands where attention lives.',
    to: '/services/media',
    img: photo.media,
    icon: Megaphone
  },
  {
    n: '02',
    title: 'Printing & Production',
    desc: 'Premium print, brand collateral, merchandise and packaging made to leave an impression.',
    to: '/services/printing',
    img: photo.printing,
    icon: Package
  },
  {
    n: '03',
    title: 'Corporate Gifting',
    desc: 'Thoughtful welcome kits, custom merchandise and premium gifts that build real connections.',
    to: '/gifting',
    img: photo.gifting,
    icon: Gift
  },
  {
    n: '04',
    title: 'Web & Digital Experiences',
    desc: 'Beautiful, functional websites and digital experiences created to turn interest into action.',
    to: '/services/website-development',
    img: photo.web,
    icon: Globe2
  }
];

const SectionHead = ({ eyebrow, title, sub }) => (
  <div className="mb-10 flex flex-col justify-between gap-5 md:mb-14 md:flex-row md:items-end">
    <div>
      <p className="mb-5 flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[.24em] text-[#00004d]">
        <span className="h-2 w-2 rounded-full bg-[#00004d]" />
        {eyebrow}
      </p>
      <h2
        className="max-w-[750px] text-[clamp(38px,5vw,74px)] font-extrabold leading-[1.09] tracking-[-.065em]"
        style={{ fontFamily: 'Manrope,sans-serif' }}
      >
        {title}
      </h2>
    </div>
    {sub && (
      <p className="max-w-[320px] text-[15px] leading-7 text-[#62667b] md:text-right">
        {sub}
      </p>
    )}
  </div>
);

function ContactForm() {
  const [status, setStatus] = useState('');
  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: '', message: ''
  });

  const set = (key, val) => setForm(s => ({ ...s, [key]: val }));

  const submit = e => {
    e.preventDefault();
    setStatus('Email app open ho rahi hai. Send press karke enquiry submit karein.');
    const body = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nService: ${form.service}\n\nProject: ${form.message}`;
    window.location.href = `mailto:?subject=${encodeURIComponent('Growth Kriya Project Enquiry')}&body=${encodeURIComponent(body)}`;
  };

  const inputClass = "mt-2 w-full rounded-xl border border-[#d9dced] bg-white px-4 py-3.5 text-[15px] outline-none focus:border-[#00004d]";

  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
      <label className="text-[13px] font-semibold">
        Your Name *
        <input required value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your full name" className={inputClass} />
      </label>

      <label className="text-[13px] font-semibold">
        Email Address *
        <input required type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="name@company.com" className={inputClass} />
      </label>

      <label className="text-[13px] font-semibold">
        Phone Number
        <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" className={inputClass} />
      </label>

      <label className="text-[13px] font-semibold">
        Interested In
        <select value={form.service} onChange={e => set('service', e.target.value)} className={inputClass}>
          <option value="">Select a service</option>
          {['Media & Advertising', 'Printing & Production', 'Corporate Gifting', 'Website Development', 'Something Else'].map(v => (
            <option key={v}>{v}</option>
          ))}
        </select>
      </label>

      <label className="text-[13px] font-semibold sm:col-span-2">
        Tell us about your project
        <textarea required rows="4" value={form.message} onChange={e => set('message', e.target.value)} placeholder="What are you looking to create?" className={`${inputClass} resize-y`} />
      </label>

      <div className="flex flex-wrap items-center justify-between gap-3 sm:col-span-2">
        <p aria-live="polite" className="max-w-[340px] text-[12px] text-[#555875]">
          {status || 'No backend connected yet. This demo opens your email app.'}
        </p>
        <button type="submit" className="inline-flex items-center gap-3 rounded-full bg-[#1c211c] px-7 py-4 text-[14px] font-bold text-white hover:bg-[#292987]">
          Send Enquiry <Send size={16} />
        </button>
      </div>
    </form>
  );
}

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#f6f5f0]">

      {/* HERO */}
      <section className="relative isolate bg-[#1b1e1b] pb-16 pt-[155px] text-white md:pb-24 md:pt-[190px]">
        <div className="pointer-events-none absolute right-[-12%] top-20 h-[450px] w-[450px] rounded-full bg-[#8494ef]/[.08] blur-[110px]" />

        <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-5 md:px-10 lg:grid-cols-[1.1fr_.9fr] xl:px-16">
          <div data-aos="fade-up">
            <p className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/20 px-4 py-2 text-[12px] font-semibold uppercase tracking-[.14em] text-[#cbd7ff]">
              <Sparkles size={15} /> Ideas are good. Impact is better.
            </p>

            <h1
              className="max-w-[770px] text-[clamp(51px,6.5vw,112px)] font-extrabold leading-[.98] tracking-[-.078em]"
              style={{ fontFamily: 'Manrope,sans-serif' }}
            >
              Make your<br />
              brand <span className="text-[#cbd7ff]">impossible</span><br />
              to ignore<span className="text-[#cbd7ff]">.</span>
            </h1>

            <p className="mt-8 max-w-[525px] text-[16px] leading-8 text-white/65 md:text-[18px]">
              From the first big idea to the final touchpoint. Media, printing, gifting and digital—all moving your brand forward.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link to="/contact" className="inline-flex items-center gap-3 rounded-full bg-[#00004d] px-7 py-4 text-[15px] font-extrabold text-white hover:bg-[#292987]">
                Let's build something <ArrowUpRight size={19} />
              </Link>
              <a href="#services" className="inline-flex items-center gap-2 px-4 py-3 text-[15px] font-semibold text-white/85 hover:text-[#cbd7ff]">
                Explore our work <ArrowRight size={18} />
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/20 pt-6 text-[12px] font-semibold uppercase tracking-[.13em] text-white/45">
              <span>One Partner</span>
              <span>360° Thinking</span>
              <span>Built to Execute</span>
            </div>
          </div>

          <div className="relative" data-aos="fade-left" data-aos-delay="150">
            <div className="aspect-[.94] overflow-hidden rounded-[34px] bg-[#e5eaff]">
              <img src={photo.hero} className="h-full w-full object-cover" alt="Creative brand identity materials arranged on a desk" />
            </div>

            <div className="absolute -bottom-6 -left-4 rotate-[-7deg] rounded-[20px] bg-[#00004d] px-6 py-5 text-white shadow-xl md:-left-10">
              <p className="text-[11px] font-bold uppercase tracking-[.15em]">Our Philosophy</p>
              <p className="mt-1 text-[25px] font-extrabold leading-tight tracking-[-.05em]">
                Think big.<br />Execute bigger. ↗
              </p>
            </div>

            <div className="absolute -right-3 -top-5 flex h-20 w-20 items-center justify-center rounded-full border border-[#cbd7ff]/40 bg-[#252a22] text-[11px] font-bold uppercase tracking-wider text-[#cbd7ff] md:h-28 md:w-28">
              Made to<br />stand out
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE STRIP */}
      <div className="overflow-hidden bg-[#00004d] py-4 text-white">
        <div className="flex min-w-max animate-none items-center justify-center gap-9 px-4 text-[13px] font-extrabold uppercase tracking-[.15em] md:gap-16">
          MEDIA <span>✳</span> PRINTING <span>✳</span> GIFTING <span>✳</span> DIGITAL <span>✳</span> EXPERIENCES <span>✳</span> REAL GROWTH
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="mx-auto grid max-w-[1440px] gap-8 px-5 py-24 md:px-10 lg:grid-cols-[.7fr_1.3fr] lg:py-36 xl:px-16">
        <div data-aos="fade-up">
          <p className="text-[12px] font-extrabold uppercase tracking-[.22em] text-[#00004d]">
            01 / Who we are
          </p>
          <div className="mt-8 inline-flex h-20 w-20 rotate-[-13deg] items-center justify-center rounded-[20px] bg-[#cbd7ff] text-[40px]">
            ✳
          </div>
        </div>

        <div data-aos="fade-up" data-aos-delay="100">
          <h2 className="text-[clamp(39px,5vw,76px)] font-extrabold leading-[1.1] tracking-[-.065em]" style={{ fontFamily: 'Manrope,sans-serif' }}>
            Too many vendors.<br />
            <span className="text-[#8385a0]">Not enough clarity?</span><br />
            We change that.
          </h2>

          <p className="mt-8 max-w-[680px] text-[17px] leading-8 text-[#62667b]">
            Growth Kriya brings strategy, media, production, gifting and digital execution under one roof. Less back-and-forth, stronger brand consistency and one team accountable for making things happen.
          </p>

          <Link to="/about" className="mt-8 inline-flex items-center gap-3 border-b-2 border-[#1b1e1b] pb-2 text-[15px] font-extrabold">
            Get to know us <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-[#eef1ff] py-24 lg:py-32">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 xl:px-16">
          <SectionHead
            eyebrow="02 / What we do"
            title={<>One team. <span className="text-[#777b9a]">Every touchpoint.</span></>}
            sub="Four connected capabilities. One clear goal: give your brand the attention and impact it deserves."
          />

          <div className="grid gap-5 md:grid-cols-2">
            {services.map((s, i) => (
              <Link
                to={s.to}
                key={s.n}
                data-aos="fade-up"
                data-aos-delay={i % 2 * 100}
                className="group overflow-hidden rounded-[28px] bg-white"
              >
                <div className="relative h-[260px] overflow-hidden md:h-[300px]">
                  <img src={s.img} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#00004d] text-white transition-transform group-hover:rotate-45">
                    <ArrowUpRight size={22} />
                  </div>
                </div>

                <div className="flex gap-4 p-6 md:p-8">
                  <p className="pt-1 text-[13px] font-bold text-[#00004d]">{s.n}</p>
                  <div>
                    <h3 className="text-[26px] font-extrabold tracking-[-.05em] md:text-[32px]">{s.title}</h3>
                    <p className="mt-3 max-w-[450px] text-[15px] leading-7 text-[#62667b]">{s.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-[#1b1e1b] py-24 text-white lg:py-32">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 xl:px-16">
          <p className="mb-8 text-[12px] font-extrabold uppercase tracking-[.2em] text-[#cbd7ff]">
            03 / The Growth Kriya advantage
          </p>

          <div className="grid items-end gap-10 lg:grid-cols-[1.3fr_.7fr]">
            <h2 data-aos="fade-up" className="text-[clamp(43px,6vw,88px)] font-extrabold leading-[1.07] tracking-[-.065em]" style={{ fontFamily: 'Manrope,sans-serif' }}>
              Understand first.<br />
              <span className="text-[#cbd7ff]">Execute second.</span><br />
              Grow together.
            </h2>
            <p className="max-w-[390px] text-[16px] leading-8 text-white/60">
              Great execution starts with asking better questions. We make every channel, creative and physical touchpoint work towards the bigger picture.
            </p>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {[
              ['01', 'Discover', 'We get to know your brand, audience, challenges and opportunities.'],
              ['02', 'Create', 'We connect strategy to the right media, production and experiences.'],
              ['03', 'Deliver', 'We coordinate the details and execute with clear accountability.']
            ].map(([num, title, desc]) => (
              <div data-aos="fade-up" key={num} className="rounded-[24px] border border-white/15 p-7">
                <p className="text-[14px] font-bold text-[#cbd7ff]">{num} /</p>
                <h3 className="mt-8 text-[28px] font-extrabold tracking-[-.05em]">{title}</h3>
                <p className="mt-3 text-[15px] leading-7 text-white/55">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 lg:py-32 xl:px-16">
        <SectionHead
          eyebrow="04 / Made for ambitious teams"
          title={<>Whatever your industry,<br /><span className="text-[#8185a5]">make it memorable.</span></>}
          sub="We work across industries and tailor every solution to the audience you're trying to reach."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            'Startups & D2C',
            'Corporate & Enterprise',
            'Education & Institutions',
            'Retail & Lifestyle',
            'Events & Experiences',
            'Real Estate',
            'Hospitality & Travel',
            'Growing Local Brands'
          ].map((item, i) => (
            <div key={item} data-aos="fade-up" data-aos-delay={(i % 4) * 50} className="flex min-h-[110px] items-end justify-between rounded-[20px] border border-[#d6d9ee] bg-white p-5 transition-colors hover:bg-[#e5eaff]">
              <span className="max-w-[170px] text-[18px] font-bold leading-snug">{item}</span>
              <MoveUpRight size={18} />
            </div>
          ))}
        </div>
      </section>

      {/* GIFTING */}
      <section className="bg-[#e5eaff] py-20 lg:py-28">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 px-5 md:px-10 lg:flex-row lg:items-center xl:px-16">
          <div data-aos="fade-up">
            <p className="mb-4 text-[12px] font-extrabold uppercase tracking-[.18em]">
              05 / Beyond ordinary gifts
            </p>
            <h2 className="max-w-[860px] text-[clamp(39px,5.8vw,78px)] font-extrabold leading-[1.08] tracking-[-.07em]" style={{ fontFamily: 'Manrope,sans-serif' }}>
              Your brand deserves to be remembered.
            </h2>
            <p className="mt-5 max-w-[680px] text-[16px] leading-7">
              Premium gifting, welcome kits, sustainable merchandise and custom packaging that keep your brand close.
            </p>
          </div>

          <Link to="/gifting" className="inline-flex shrink-0 items-center gap-3 self-start rounded-full bg-[#1b1e1b] px-7 py-4 text-[15px] font-bold text-white hover:bg-white hover:text-[#1b1e1b]">
            Explore Gifting <ArrowUpRight size={19} />
          </Link>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 md:px-10 lg:grid-cols-[.9fr_1.1fr] lg:py-36 xl:px-16">
        <div data-aos="fade-up">
          <p className="mb-6 text-[12px] font-extrabold uppercase tracking-[.2em] text-[#00004d]">
            06 / Let's make it happen
          </p>

          <h2 className="text-[clamp(45px,5.5vw,80px)] font-extrabold leading-[1.05] tracking-[-.065em]" style={{ fontFamily: 'Manrope,sans-serif' }}>
            Big idea?<br />
            Let's bring it <span className="text-[#00004d]">to life.</span>
          </h2>

          <p className="mt-7 max-w-[400px] text-[16px] leading-8 text-[#62667b]">
            Tell us what you're building, planning or dreaming up. We'll help you work out the next move.
          </p>

          <div className="mt-10 flex items-center gap-3 text-[14px] font-semibold">
            <CheckCircle2 className="text-[#00004d]" size={20} />
            One connected growth partner.
          </div>
        </div>

        <div data-aos="fade-up" data-aos-delay="100" className="rounded-[30px] border border-[#e0e2f0] bg-[#f0f1ff] p-6 shadow-[0_18px_55px_rgba(20,35,15,.05)] md:p-9">
          <h3 className="mb-7 text-[26px] font-extrabold tracking-[-.05em]">
            Tell us about your project <span className="text-[#00004d]">↗</span>
          </h3>
          <ContactForm />
        </div>
      </section>

    </main>
  );
}
