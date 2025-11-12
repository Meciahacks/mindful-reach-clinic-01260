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
          {badges.map((badge, index) => {
            const colors = ['primary', 'secondary', 'accent', 'primary'];
            const glowColors = [
              'rgba(79,209,197,0.3)',
              'rgba(255,107,53,0.3)',
              'rgba(76,206,172,0.3)',
              'rgba(79,209,197,0.3)'
            ];
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-lg bg-card hover:shadow-[0_0_40px] transition-all duration-300 animate-fade-in hover:-translate-y-2 border-2 border-transparent hover:border-primary/30"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  boxShadow: `0 0 0 ${glowColors[index]}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 40px ${glowColors[index]}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 0 ${glowColors[index]}`;
                }}
              >
                <badge.icon className={`w-12 h-12 text-${colors[index]} mb-4 drop-shadow-[0_0_10px_${glowColors[index]}]`} />
                <h3 className="text-lg font-semibold text-foreground mb-2">{badge.title}</h3>
                <p className="text-sm text-muted-foreground">{badge.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
