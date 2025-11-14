import logo from "@/assets/unveiled-echo-logo.jpg";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Unveiled Echo" className="w-12 h-12 object-contain" />
              <span className="text-xl font-bold">Unveiled Echo</span>
            </div>
            <p className="text-muted-foreground">
              Professional online therapy and counseling services. 
              Your journey to better mental health starts here.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Our Therapists</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>support@unveiledecho.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>1-800-THERAPY</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Available Nationwide</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-8 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Unveiled Echo. All rights reserved.</p>
          <p className="text-sm mt-2">
            If you're experiencing a mental health crisis, please call the National Suicide Prevention Lifeline at 988.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
