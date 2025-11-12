import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How does online therapy work?",
      answer: "Online therapy works through secure video calls, phone calls, or messaging. You'll meet with your licensed therapist at scheduled times from the comfort of your home. Sessions are just as effective as in-person therapy and offer more flexibility.",
    },
    {
      question: "How long is each therapy session?",
      answer: "Standard therapy sessions are 50 minutes long. However, we offer flexible scheduling options including 30-minute check-ins and 90-minute intensive sessions based on your needs.",
    },
    {
      question: "Is my information confidential and secure?",
      answer: "Absolutely. We use HIPAA-compliant, encrypted platforms for all communications. Your privacy is our top priority, and all therapists follow strict confidentiality guidelines as required by their professional licenses.",
    },
    {
      question: "Do you accept insurance?",
      answer: "We accept most major insurance plans. Our team can verify your coverage and help you understand your benefits. We also offer affordable self-pay options and sliding scale fees for those without insurance.",
    },
    {
      question: "What if I need to cancel or reschedule?",
      answer: "We understand that life happens. You can cancel or reschedule appointments up to 24 hours in advance without any charges. Cancellations with less than 24 hours notice may incur a fee.",
    },
    {
      question: "How do I know if online therapy is right for me?",
      answer: "Online therapy is ideal if you value convenience, have a busy schedule, or prefer the comfort of your own space. It's effective for most mental health concerns including anxiety, depression, stress, and relationship issues. We offer a free consultation to help you decide.",
    },
    {
      question: "What should I expect in my first session?",
      answer: "Your first session is an opportunity to meet your therapist, discuss your concerns, and develop initial goals. Your therapist will ask questions to understand your situation better and explain how they can help. There's no pressure - it's a safe space for you to share at your own pace.",
    },
    {
      question: "Can I switch therapists if needed?",
      answer: "Yes, absolutely. Finding the right therapist fit is important for successful therapy. If you feel your current therapist isn't the right match, we'll help you connect with another professional who better suits your needs at no additional cost.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about our online therapy services
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full animate-fade-in" style={{ animationDelay: "200ms" }}>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left hover:text-primary transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
