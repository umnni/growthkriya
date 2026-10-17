
import { Link } from 'react-router-dom';
import { ArrowUpRight, MoveUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#191c1a] text-white">
      <div className="mx-auto max-w-[1440px] px-5 pb-8 pt-20 md:px-10 xl:px-16">
        <div className="grid gap-12 border-b border-white/15 pb-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link
              to="/"
              className="text-[34px] font-extrabold tracking-[-2px]"
              style={{ fontFamily: 'Manrope,sans-serif' }}
            >
              growth<span className="text-[#cbd7ff]">kriya</span>.
            </Link>

            <p className="mt-6 max-w-[290px] text-[15px] leading-7 text-white/60">
              One partner. Total growth execution. Strategy, creativity and
              real-world impact—together.
            </p>

            <Link
              to="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/35 px-5 py-3 text-[14px] font-semibold hover:bg-white hover:text-black"
            >
              Start a project <ArrowUpRight size={16} />
            </Link>
          </div>

          <div>
            <h3 className="mb-6 font-bold text-[#cbd7ff]">Explore</h3>
            <div className="flex flex-col gap-3 text-[15px] text-white/65">
              {[
                ['Home', '/'],
                ['About Us', '/about'],
                ['Gifting', '/gifting'],
                ['Blogs', '/blogs'],
                ['Contact Us', '/contact']
              ].map(([t, u]) => (
                <Link className="hover:text-white" key={u} to={u}>
                  {t}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-6 font-bold text-[#cbd7ff]">What We Do</h3>
            <div className="flex flex-col gap-3 text-[15px] text-white/65">
              {[
                ['Media Solutions', '/services/media'],
                ['Printing Solutions', '/services/printing'],
                ['Website Development', '/services/website-development'],
                ['Corporate Gifting', '/gifting']
              ].map(([t, u]) => (
                <Link className="hover:text-white" key={u} to={u}>
                  {t}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-6 font-bold text-[#cbd7ff]">Let's Connect</h3>
            <p className="text-[15px] leading-7 text-white/65">
              Got a bold idea? We'd love to hear about it.
            </p>

            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 text-[18px] font-bold"
            >
              Get in touch <MoveUpRight size={19} />
            </Link>

            <p className="mt-5 text-[12px] text-white/45">
              Contact details to be confirmed with client.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-5 pt-7 text-[13px] text-white/50 md:flex-row">
          <p>
            © {new Date().getFullYear()} Growth Kriya. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/brand-policy" className="hover:text-white">
              Brand Policy
            </Link>
            <Link to="/faq" className="hover:text-white">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
