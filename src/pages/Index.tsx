import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import Services from "@/components/Services";
import Therapists from "@/components/Therapists";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import useParallax from "@/hooks/useParallax";
import useScrollReveal from "@/hooks/useScrollReveal";

const Index = () => {
  useParallax();
  useScrollReveal();

  return (
    <div className="min-h-screen">
      <Navigation />

      <div data-parallax data-speed="0.05" data-reveal>
        <Hero />
      </div>

      <div data-parallax data-speed="0.035" data-reveal data-stagger="120">
        <Mission />
      </div>

      <div data-parallax data-speed="0.045" data-reveal>
        <Services />
      </div>

      <div data-parallax data-speed="0.04" data-reveal>
        <Therapists />
      </div>

          <div data-parallax data-speed="0.03" data-reveal>
        <FAQ />
      </div>
      <div data-parallax data-speed="0.02" data-reveal>
        <ContactForm />
      </div>

      <Footer />
    </div>
  );
};

export default Index;
