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
            const gradients = [
              'from-primary to-primary-glow',
              'from-secondary to-secondary-glow',
              'from-accent to-accent-glow',
              'from-primary via-accent to-secondary'
            ];
            return (
              <Card 
                key={index} 
                className="hover:shadow-[0_0_40px_rgba(79,209,197,0.3)] transition-all duration-300 hover:-translate-y-2 animate-fade-in border-2 hover:border-primary/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className={`w-12 h-12 bg-gradient-to-br ${gradients[index]} rounded-lg flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(79,209,197,0.4)] hover:shadow-[0_0_30px_rgba(79,209,197,0.6)] transition-all`}>
                    <Icon className="w-6 h-6 text-white" />
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
