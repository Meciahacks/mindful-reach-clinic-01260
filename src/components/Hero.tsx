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
        <div className="absolute inset-0 bg-gradient-to-br from-primary/50 via-background/70 to-secondary/40 backdrop-blur-sm animate-shimmer" 
             style={{ backgroundSize: "200% 200%" }} />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in-up">
        <img 
          src={logo} 
          alt="MindfulCare Logo" 
          className="w-24 h-24 mx-auto mb-6 animate-float drop-shadow-[0_0_30px_rgba(79,209,197,0.6)]"
        />
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground drop-shadow-lg">
          Your Journey to{" "}
          <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-shimmer"
                style={{ backgroundSize: "200% auto" }}>
            Better Mental Health
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-foreground/90 max-w-2xl mx-auto drop-shadow-md">
          Professional online therapy and counseling services tailored to your needs. 
          Connect with licensed therapists from the comfort of your home.
        </p>
        <Button 
          size="lg" 
          onClick={scrollToContact}
          className="text-lg px-8 py-6 hover:scale-110 transition-all duration-300 shadow-[0_0_30px_rgba(79,209,197,0.4)] hover:shadow-[0_0_50px_rgba(79,209,197,0.7)] animate-glow-pulse"
        >
          Start Your Journey
        </Button>
      </div>
    </section>
  );
};

export default Hero;
