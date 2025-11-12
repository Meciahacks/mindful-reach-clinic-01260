import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";
import logo from "@/assets/logo.png";

const Hero = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-background/60 to-secondary/30 backdrop-blur-sm" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 text-center animate-in fade-in duration-1000">
        <img 
          src={logo} 
          alt="MindfulCare Logo" 
          className="w-24 h-24 mx-auto mb-6 animate-in zoom-in duration-700"
        />
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
          Your Journey to{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Better Mental Health
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl mx-auto">
          Professional online therapy and counseling services tailored to your needs. 
          Connect with licensed therapists from the comfort of your home.
        </p>
        <Button 
          size="lg" 
          onClick={scrollToContact}
          className="text-lg px-8 py-6 hover:scale-105 transition-transform shadow-lg"
        >
          Start Your Journey
        </Button>
      </div>
    </section>
  );
};

export default Hero;
