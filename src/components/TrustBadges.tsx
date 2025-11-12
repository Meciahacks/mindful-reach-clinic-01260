import { Shield, Award, Lock, Users } from "lucide-react";

const TrustBadges = () => {
  const badges = [
    {
      icon: Shield,
      title: "Licensed Therapists",
      description: "All therapists are certified and licensed professionals",
    },
    {
      icon: Lock,
      title: "HIPAA Compliant",
      description: "Your privacy and data security are our top priority",
    },
    {
      icon: Award,
      title: "10+ Years Experience",
      description: "Trusted by thousands of clients worldwide",
    },
    {
      icon: Users,
      title: "5000+ Sessions",
      description: "Successfully completed therapy sessions",
    },
  ];

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-card hover:shadow-lg transition-shadow animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <badge.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">{badge.title}</h3>
              <p className="text-sm text-muted-foreground">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
