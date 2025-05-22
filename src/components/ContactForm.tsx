
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    service: "general",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
        service: "general",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-on-scroll">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Full Name <span className="text-red-500">*</span>
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
            className="border-gray-300 focus:border-iconic-blue focus:ring-iconic-blue/20"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email Address <span className="text-red-500">*</span>
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            required
            className="border-gray-300 focus:border-iconic-blue focus:ring-iconic-blue/20"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">
            Phone Number
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className="border-gray-300 focus:border-iconic-blue focus:ring-iconic-blue/20"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="company" className="text-sm font-medium">
            Company Name
          </label>
          <Input
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Your Company"
            className="border-gray-300 focus:border-iconic-blue focus:ring-iconic-blue/20"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="service" className="text-sm font-medium">
          Interested In <span className="text-red-500">*</span>
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-iconic-blue focus:ring-1 focus:ring-iconic-blue/20"
        >
          <option value="general">General Inquiry</option>
          <option value="staymore">Stay More</option>
          <option value="ojas">OJAS (Ready Made Concrete)</option>
          <option value="avani">Avani (Tiles Retail)</option>
          <option value="yatra">Yatra (Escalators and Lifts)</option>
          <option value="ohoofoods">Ohoo Foods (Pickles)</option>
          <option value="righthomes">Right Homes (Construction)</option>
          <option value="hotels">Hotels (Sare)</option>
          <option value="wow">WOW (Mineral Water)</option>
          <option value="allinone">All in One (Activity Center)</option>
          <option value="empire">The Empire (Schools)</option>
          <option value="vertex">ICONIC Vertex (Software & IT)</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          Your Message <span className="text-red-500">*</span>
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your requirements or questions..."
          required
          className="min-h-[150px] border-gray-300 focus:border-iconic-blue focus:ring-iconic-blue/20"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-iconic-blue hover:bg-iconic-blue/90 text-white"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>

      <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
        By submitting this form, you agree to our{" "}
        <Link to="/privacy" className="text-iconic-blue hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
};

export default ContactForm;
