import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";

const Therapists = () => {
  const therapists = [];

  return (
    <section id="therapists" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Meet Our Therapists</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our team of experienced, licensed professionals is here to support you on your mental health journey
          </p>
        </div>

      </div>
    </section>
  );
};

export default Therapists;
