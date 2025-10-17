import Arrivals from "@/components/arrivals/Arrivals";
import BrowseStyling from "@/components/browse/BrowseStyling";
import Contact from "@/components/cta/Contact";
import Footer from "@/components/footer/Footer";
import Header from "@/components/hero/Header";
import AnimationBar from "@/components/hero/hero-section/AnimationBar";
import Hero from "@/components/hero/hero-section/Hero";
import TopText from "@/components/hero/TopText";
import Testimonials from "@/components/testimonials/Testimonials";
import TopSelling from "@/components/top-selling/TopSelling";

export default async function Home() {
  return (
    <>
      <TopText />
      <Header />
      <main className="overflow-x-hidden">
        <Hero />
        <AnimationBar />
        <Arrivals />
        <TopSelling />
        <BrowseStyling />
        <Testimonials />
        <Contact className=" mb-20" />
      </main>
      <Footer />
    </>
  );
}
