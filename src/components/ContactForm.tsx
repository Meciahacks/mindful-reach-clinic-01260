"use client";
import { useState,useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import PrivacyPolicyDialog from "./PrivacyPolicyDialog";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // simple field check
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill all required fields.");
      return;
    }





    setShowPrivacyPolicy(true);
  };

  const handlePrivacyAgree = async () => {
    setShowPrivacyPolicy(false);
    setIsSubmitting(true);
    console.log('****test****')    
    try {
       emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE,
      form.current,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    )
    .then(() => alert("Email sent!"))
    .catch(err => console.error("EmailJS Error:", err));
    toast.success("Your message has been sent successfully!");
    } catch (err) {
      toast.error("Unexpected error — please try again.");
    }

    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto animate-fade-in-up">
          <Card className="shadow-[0_0_50px_rgba(79,209,197,0.2)] border-2 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl md:text-4xl font-bold">
                Get Started Today
              </CardTitle>
              <CardDescription className="text-lg mt-2">
                Fill out the form below and we'll match you with the right therapist.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form ref={form}  onSubmit={handleSubmit} className="space-y-6">

                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>

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
