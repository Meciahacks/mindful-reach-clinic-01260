import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";

const Therapists = () => {
  const therapists = [
    {
      name: "Dr. Sarah Mitchell",
      credentials: "PhD, Licensed Clinical Psychologist",
      specializations: ["Anxiety", "Depression", "Trauma"],
      bio: "15+ years helping clients overcome anxiety and depression through evidence-based cognitive behavioral therapy.",
      image: null,
    },
    {
      name: "Dr. James Chen",
      credentials: "PsyD, Licensed Marriage & Family Therapist",
      specializations: ["Relationships", "Family Therapy", "Communication"],
      bio: "Specializing in couples counseling and family dynamics with a compassionate, solution-focused approach.",
      image: null,
    },
    {
      name: "Dr. Emily Rodriguez",
      credentials: "MD, Psychiatrist",
      specializations: ["PTSD", "Grief", "Life Transitions"],
      bio: "Combining medication management with psychotherapy to provide comprehensive mental health care.",
      image: null,
    },
    {
      name: "Dr. Michael Thompson",
      credentials: "LCSW, Clinical Social Worker",
      specializations: ["Stress Management", "Career Counseling", "Self-Esteem"],
      bio: "Helping professionals navigate work-life balance and build resilience through practical coping strategies.",
      image: null,
    },
  ];

  return (
    <section id="therapists" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Meet Our Therapists</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our team of experienced, licensed professionals is here to support you on your mental health journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {therapists.map((therapist, index) => (
            <Card
              key={index}
              className="hover:shadow-[0_0_40px_rgba(79,209,197,0.3)] transition-all duration-300 hover:-translate-y-2 animate-scale-in border-2 hover:border-primary/50 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center shadow-[0_0_30px_rgba(79,209,197,0.4)] group-hover:shadow-[0_0_50px_rgba(79,209,197,0.6)] transition-all group-hover:scale-110 duration-300">
                  <User className="w-12 h-12 text-white" />
                </div>
                <CardTitle className="text-xl">{therapist.name}</CardTitle>
                <CardDescription className="text-sm">{therapist.credentials}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4 justify-center">
                  {therapist.specializations.map((spec) => (
                    <Badge key={spec} variant="secondary" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground text-center">{therapist.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Therapists;
