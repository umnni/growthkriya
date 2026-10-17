
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { media, printing, extraServices } from '../data/site';

const items = [
  ...media,
  ...printing,
  ...extraServices,
  ['About Us', '/about'],
  ['Gifting', '/gifting'],
  ['Blogs', '/blogs'],
  ['Contact Us', '/contact'],
  ['FAQ', '/faq'],
  ['Privacy Policy', '/privacy-policy'],
  ['Brand Policy', '/brand-policy']
];

export default function Placeholder() {
  const { pathname } = useLocation();

  const name =
    items.find(i => i[1] === pathname)?.[0] ||
    pathname.split('/').filter(Boolean).at(-1)?.replaceAll('-', ' ') ||
    'Page';

  return (
    <main className="min-h-[72vh] bg-[#f6f5f0] px-5 pb-28 pt-44 md:px-10">
      <div className="mx-auto max-w-[1100px]">
        <p className="mb-6 text-[12px] font-extrabold uppercase tracking-[.2em] text-[#00004d]">
          Growth Kriya / Coming next
        </p>

        <h1
          className="max-w-[900px] text-[clamp(45px,7vw,95px)] font-extrabold leading-[1.05] tracking-[-.065em] capitalize"
          style={{ fontFamily: 'Manrope,sans-serif' }}
        >
          {name}
          <span className="text-[#00004d]">.</span>
        </h1>

        <p className="mt-7 max-w-[650px] text-[17px] leading-8 text-[#62667b]">
          This route is ready for the next development phase.
          The individual service content and visuals will be added
          after approval of the homepage direction.
        </p>

        <Link
          to="/"
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#00004d] px-7 py-4 text-white"
        >
          <ArrowLeft size={17} />
          Back to Home
        </Link>
      </div>
    </main>
  );
}
