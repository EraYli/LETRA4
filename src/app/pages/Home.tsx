import Header from "../components/Header";
import Hero from "../components/Hero";
import WhySection from "../components/WhySection";
import ModulesSection from "../components/ModulesSection";
import StatsSection from "../components/StatsSection";
import HowItWorksSection from "../components/HowItWorksSection";
import CTABanner from "../components/CTABanner";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-['Nunito',sans-serif] text-gray-800 overflow-x-hidden">
      <Header />
      <Hero />
      <WhySection />
      <ModulesSection />
      <StatsSection />
      <HowItWorksSection />
      <CTABanner />
      <Footer />
    </div>
  );
}
