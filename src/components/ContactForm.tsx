import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { z } from "zod";
import PrivacyPolicyDialog from "./PrivacyPolicyDialog";
import { sendFormSubmissionEmail } from "@/services/resendEmailService";

const contactSchema = z.object({ 
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().max(20, "Phone must be less than 20 characters").optional(),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [pendingFormData, setPendingFormData] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validatedData = contactSchema.parse(formData);
      setPendingFormData(validatedData);
      setShowPrivacyPolicy(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast.error(firstError.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const handlePrivacyAgree = async () => {
    setShowPrivacyPolicy(false);
    setIsSubmitting(true);

    try {
      if (!pendingFormData) {
        toast.error("No form data to submit");
        setIsSubmitting(false);
        return;
      }

      // Send email via backend API
      await sendFormSubmissionEmail(pendingFormData);

      // Success
      toast.success("Thank you for your message! We'll get back to you shortly.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setPendingFormData(null);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to submit your message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto animate-fade-in-up">
          <Card className="shadow-[0_0_50px_rgba(79,209,197,0.2)] border-2 border-primary/20 hover:border-primary/40 transition-all duration-300">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl md:text-4xl font-bold">Get Started Today</CardTitle>
              <CardDescription className="text-lg mt-2">
                Fill out the form below and we'll match you with the right therapist for your needs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    maxLength={100}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    maxLength={255}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    maxLength={20}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Tell us about yourself *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="What brings you here today? What are you hoping to work on?"
                    rows={5}
                    required
                    maxLength={1000}
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    {formData.message.length}/1000 characters
                  </p>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full shadow-[0_0_30px_rgba(79,209,197,0.3)] hover:shadow-[0_0_50px_rgba(79,209,197,0.6)] transition-all duration-300 hover:scale-105"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  Your information is confidential and secure. We typically respond within 24 hours.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <PrivacyPolicyDialog
        isOpen={showPrivacyPolicy}
        onClose={() => setShowPrivacyPolicy(false)}
        onAgree={handlePrivacyAgree}
        showAgreeButton={true}
      />
    </section>
  );
};

export default ContactForm;

