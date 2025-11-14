import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import Services from "@/components/Services";
import Therapists from "@/components/Therapists";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Mission />
      <Services />
      <Therapists />
      <FAQ />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
