import { Heart, Users, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Mission = () => {
  return (
    <section id="mission" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Our Mission</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We believe everyone deserves access to quality mental health care. 
            Our mission is to make professional therapy accessible, affordable, and stigma-free.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="border-2 hover:border-primary transition-all hover:shadow-lg">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Compassionate Care</h3>
              <p className="text-muted-foreground">
                Our therapists provide empathetic, judgment-free support tailored to your unique journey.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-2 hover:border-secondary transition-all hover:shadow-lg">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Accessible Support</h3>
              <p className="text-muted-foreground">
                Connect with licensed therapists anytime, anywhere. Therapy that fits your schedule and lifestyle.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-2 hover:border-accent transition-all hover:shadow-lg">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Professional Excellence</h3>
              <p className="text-muted-foreground">
                All therapists are licensed, experienced professionals committed to your wellbeing and growth.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Mission;
