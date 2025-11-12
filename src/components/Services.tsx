import { Video, MessageCircle, UserCheck, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      icon: Video,
      title: "Video Sessions",
      description: "Face-to-face therapy through secure video calls. Connect with your therapist in real-time from anywhere.",
    },
    {
      icon: MessageCircle,
      title: "Messaging Support",
      description: "Send messages to your therapist between sessions. Get support when you need it most.",
    },
    {
      icon: UserCheck,
      title: "Specialized Therapy",
      description: "CBT, DBT, anxiety, depression, relationships, trauma, and more. Find the right specialist for you.",
    },
    {
      icon: Shield,
      title: "Complete Privacy",
      description: "HIPAA-compliant platform with end-to-end encryption. Your privacy and safety are our priority.",
    },
  ];

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">How We Help</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the therapy format that works best for you. All our services are designed 
            to provide you with flexible, professional mental health support.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
