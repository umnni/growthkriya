import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Gifting from "./pages/Gifting";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import BlogAdmin from "./admin/BlogAdmin";
import Placeholder from "./pages/Placeholder";
import GenerativeAIVideo from "./pages/media/GenerativeAIVideo";

import TransitMedia from "./pages/media/TransitMedia";
import EventsActivations from "./pages/media/EventsActivations";
import InfluencerMarketing from "./pages/media/InfluencerMarketing";
import ProductPhotoshoot from "./pages/media/ProductPhotoshoot";
import RadioAdvertising from "./pages/media/RadioAdvertising";
import CinemaAdvertising from "./pages/media/CinemaAdvertising";
import TelevisionAdvertising from "./pages/media/TelevisionAdvertising";
import WallPainting from "./pages/media/WallPainting";
import OutdoorAdvertising from "./pages/media/OutdoorAdvertising";
import DigitalMarketing from "./pages/media/DigitalMarketing";

import PremiumDiaries from "./pages/printing/PremiumDiaries";
import SustainableCollection from "./pages/printing/SustainableCollection";
import WelcomeKit from "./pages/printing/WelcomeKit";
import NewspaperInserts from "./pages/printing/NewspaperInserts";
import Brochures from "./pages/printing/Brochures";
import PremiumMetalPen from "./pages/printing/PremiumMetalPen";
import VisitingCards from "./pages/printing/VisitingCards";
import Caps from "./pages/printing/Caps";
import Flyers from "./pages/printing/Flyers";
import KappaBoardBox from "./pages/printing/KappaBoardBox";
import TabloidNewspaper from "./pages/printing/TabloidNewspaper";
import WebsiteDevelopment from "./pages/WebsiteDevelopment";

function SiteLayout() {
  const {pathname} = useLocation();
  useEffect(() => {
    window.scrollTo({top:0,behavior:"instant"});
    const timeout = setTimeout(() => AOS.refresh(), 80);
    return () => clearTimeout(timeout);
  }, [pathname]);
  useEffect(() => {
    AOS.init({duration:750,once:true,offset:90,easing:"ease-out-cubic",disable:window.matchMedia("(prefers-reduced-motion: reduce)").matches});
  }, []);
  return <>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/gifting" element={<Gifting />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blogs" element={<Blog />} />
      <Route path="/blogs/:slug" element={<BlogDetails />} />
      <Route path="/admin/blogs" element={<BlogAdmin />} />
      <Route path="/services/media/generative-ai-video-production" element={<GenerativeAIVideo />} />
      <Route path="/services/media/transit-media" element={<TransitMedia />} />
      <Route path="/services/media/events-activations" element={<EventsActivations />} />
      <Route path="/services/media/influencer-marketing" element={<InfluencerMarketing />} />
      <Route path="/services/media/product-photoshoot" element={<ProductPhotoshoot />} />
      <Route path="/services/media/radio-advertising" element={<RadioAdvertising />} />
      <Route path="/services/media/cinema-advertising" element={<CinemaAdvertising />} />
      <Route path="/services/media/television-advertising" element={<TelevisionAdvertising />} />
      <Route path="/services/media/wall-painting-advertising" element={<WallPainting />} />
      <Route path="/services/media/outdoor-advertising" element={<OutdoorAdvertising />} />
      <Route path="/services/media/digital-marketing" element={<DigitalMarketing />} />
      <Route path="/services/printing/premium-diaries" element={<PremiumDiaries />} />
      <Route path="/services/printing/jute-canvas" element={<SustainableCollection />} />
      <Route path="/services/printing/welcome-kit" element={<WelcomeKit />} />
      <Route path="/services/printing/newspaper-inserts" element={<NewspaperInserts />} />
      <Route path="/services/printing/brochures" element={<Brochures />} />
      <Route path="/services/printing/premium-metal-pen" element={<PremiumMetalPen />} />
      <Route path="/services/printing/visiting-cards" element={<VisitingCards />} />
      <Route path="/services/printing/caps" element={<Caps />} />
      <Route path="/services/printing/flyers" element={<Flyers />} />
      <Route path="/services/printing/kappa-board-box" element={<KappaBoardBox />} />
      <Route path="/services/printing/tabloid-newspaper" element={<TabloidNewspaper />} />
      <Route path="/services/website-development" element={<WebsiteDevelopment />} />
      <Route path="*" element={<Placeholder />} />
    </Routes>
    <Footer />
  </>;
}
export default function App() {return <BrowserRouter><SiteLayout/></BrowserRouter>;}
