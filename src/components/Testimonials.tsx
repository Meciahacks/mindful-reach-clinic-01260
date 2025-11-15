import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Jennifer M.",
      rating: 5,
      text: "The online therapy sessions have been life-changing. My therapist is so understanding and I feel comfortable opening up from the privacy of my home.",
      role: "Client for 8 months",
    },
    {
      name: "David K.",
      rating: 5,
      text: "I was skeptical about online therapy at first, but the convenience and quality of care exceeded my expectations. Highly recommend!",
      role: "Client for 6 months",
    },
    {
      name: "Maria S.",
      rating: 5,
      text: "Finding a therapist who truly understands my needs was easier than I thought. The platform is user-friendly and the sessions are professional.",
      role: "Client for 1 year",
    },
    {
      name: "Robert T.",
      rating: 5,
      text: "After struggling with anxiety for years, I finally found the help I needed. My therapist has given me tools that have genuinely improved my daily life.",
      role: "Client for 4 months",
    },
  ];

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      {/* Decorative parallax background: visible so parallax is noticeable */}
      <div
        data-parallax-bg
        data-speed="0.12"
        className="absolute inset-0 -z-10 pointer-events-none bg-gradient-to-br from-secondary/30 via-accent/20 to-transparent"
        style={{ transform: 'translate3d(0,0,0)', willChange: 'transform' }}
      />

      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 text-foreground">What Our Clients Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real experiences from real people who have transformed their lives through therapy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="hover:shadow-[0_0_40px_rgba(255,107,53,0.3)] transition-all duration-300 hover:-translate-y-2 animate-slide-in-right border-2 hover:border-secondary/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-secondary text-secondary drop-shadow-[0_0_8px_rgba(255,107,53,0.6)] animate-pulse" style={{ animationDelay: `${i * 100}ms`, animationDuration: "2s" }} />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
