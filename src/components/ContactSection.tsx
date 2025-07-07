import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  HeartPulse,
  ShoppingCart,
  Banknote,
  Factory,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { MapPin, Mail } from "lucide-react";


const industryIcons: Record<string, JSX.Element> = {
  Education: <GraduationCap className="w-4 h-4 text-blue-500" />,
  Healthcare: <HeartPulse className="w-4 h-4 text-pink-500" />,
  "E-commerce": <ShoppingCart className="w-4 h-4 text-green-500" />,
  "E-governance": <Banknote className="w-4 h-4 text-indigo-500" />,
  Manufacturing: <Factory className="w-4 h-4 text-yellow-500" />,
  Telecom: <Phone className="w-4 h-4 text-purple-500" />,
  "Homeland Security": <ShieldCheck className="w-4 h-4 text-red-500" />,
};


const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1,
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const ContactSection = () => {
  const { toast } = useToast();
  const backendUrl =
    import.meta.env.VITE_REACT_APP_BACKEND_URL || "http://localhost:8000";
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER ;//FALLBACK NOT ADDED

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [querySent, setQuerySent] = useState(false);
  const [openModal, setOpenModal] = useState<"email" | "whatsapp" | null>(null);
  const [modalMessage, setModalMessage] = useState("");
  const [visitorId, setVisitorId] = useState<string | null>(null);

  const benefits = [
    "AI agent Framework",
    "ERP system Framework",
    "Enterprise-grade security",
    "Multilingual capabilities",
    "Rapid deployment",
    "Scalable solutions",
  ];

  const industries = [
    "Education",
    "Healthcare",
    "E-commerce",
    "E-governance",
    "Manufacturing",
    "Telecom",
    "Homeland Security",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone } = formData;

    if (!name.trim()) {
      toast({ title: "Please enter your name.", variant: "destructive" });
      return;
    }
    if (!email.trim()) {
      toast({ title: "Please enter your email.", variant: "destructive" });
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/submit-form`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          message: "initial contact",
        }),
      });

      if (!response.ok) throw new Error("Failed to send data to backend");

      const result = await response.json();
      setVisitorId(result.id);
      setSubmitted(true);
      setQuerySent(false);

      toast({
        title: "Details Saved!",
        description: "Now you can send your query via Email or WhatsApp.",
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Could not save details. Try again.",
        variant: "destructive",
      });
    }
  };

  const handleFinalSend = async (platform: "email" | "whatsapp") => {
    if (!visitorId || !modalMessage.trim()) return;

    const payload = {
      method: platform,
      message: modalMessage.trim(),
    };

    try {
      const response = await fetch(`${backendUrl}/update-query/${visitorId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to mark as sent");

      if (platform === "email") {
        toast({
          title: "Email Sent",
          description: "Your message has been recorded. We'll get back soon.",
        });
      }

      setModalMessage("");
      setQuerySent(true);
      setOpenModal(null);
    } catch (error) {
      console.error("Send Error", error);
      toast({
        title: "Send Failed",
        description: "Could not send message. Try again.",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", phone: "" });
    setSubmitted(false);
    setQuerySent(false);
    setVisitorId(null);
  };

  return (
    <section
      id="contact"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-slate-50 to-slate-100 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-purple-400 opacity-20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-blue-400 opacity-20 rounded-full blur-3xl animate-pulse" />
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <pattern
            id="dots"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="#e2e8f0" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto space-y-20">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center"
        >
          <h2 className="text-5xl font-extrabold text-gray-900 font-[Inter_Tight]">
            Get{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Started
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto font-light">
            Ready to transform your enterprise communication with AI? Let's
            discuss how our platform can meet your specific needs.
          </p>
        </motion.div>

        {/* Cards - Left and Right side by side */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
  {/* Left Card */}
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={fadeUp}
    className="flex flex-col h-full"
  >
    <Card className="h-full flex flex-col justify-between rounded-3xl border border-gray-200 shadow-md bg-white/30 backdrop-blur-xl">
      <CardHeader className="p-6 pb-0">
        <CardTitle className="text-2xl font-bold text-gray-800">
          Why Choose Codepackers?
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-4 text-sm text-gray-700 flex flex-col gap-8 font-inter">
  {/* Benefits Grid */}
  <div>
    <h4 className="text-base font-semibold text-gray-800 mb-4">Core Benefits</h4>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
      {benefits.map((benefit, index) => (
        <div key={index} className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
          <span className="text-gray-800 text-[0.95rem] font-medium leading-snug">
            {benefit}
          </span>
        </div>
      ))}
    </div>
  </div>

  {/* Horizontal Divider */}
  <div className="border-t border-gray-300" />

  {/* Industries + Contact Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
    {/* Industries */}
    <div>
      <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2 tracking-wide">
        Industries We Serve
      </h4>
      <div className="flex flex-col gap-2">
        {industries.map((industry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm text-gray-800">
            {industryIcons[industry] ?? (
              <ShieldCheck className="w-4 h-4 text-gray-400" />
            )}
            <span>{industry}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Contact Info */}
    {/* Contact Info */}
<div>
  <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2 tracking-wide">
    Contact Us
  </h4>
  <div className="space-y-2 text-sm text-gray-700">
    {/* Location */}
    <div className="flex items-center gap-3 text-gray-800 font-semibold">
      <div className="bg-red-100 rounded-full p-1">
        <MapPin className="w-4 h-4 text-red-500" />
      </div>
      <span>India</span>
    </div>

    {/* Email 1 */}
    <div className="flex items-center gap-3">
      <div className="bg-blue-100 rounded-full p-1">
        <Mail className="w-4 h-4 text-blue-600" />
      </div>
      <span className="text-gray-800">suja.sharma@codepackers.com</span>
    </div>

    {/* Email 2 */}
    <div className="flex items-center gap-3">
      <div className="bg-blue-100 rounded-full p-1">
        <Mail className="w-4 h-4 text-blue-600" />
      </div>
      <span className="text-gray-800">vikas.tyagi@codepackers.com</span>
    </div>
  </div>
</div>

  </div>
</CardContent>




    </Card>
  </motion.div>

  {/* Right Card */}
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={fadeUp}
    className="flex flex-col h-full"
  >
    <Card className="h-full flex flex-col justify-between rounded-3xl border border-gray-200 shadow-md bg-white/30 backdrop-blur-xl px-6 py-8">
      <div className="space-y-4 text-center">
        <h3 className="text-2xl font-bold text-gray-800">Drop us a line!</h3>
        <p className="text-sm text-gray-500">
          Want to explore our AI solutions or schedule a live demo? Send us a WhatsApp or fill the form below. We're eager to assist!
        </p>
      </div>

      <div className="flex flex-col gap-4 mt-6">
        <Button
          onClick={() =>
            window.open(`https://wa.me/${whatsappNumber}`, "_blank", "noopener,noreferrer")
          }
          className="bg-[#25D366] hover:bg-[#1DA851] text-white w-full text-sm font-semibold"
        >
          <img src="/icons/whatsapp-icon.svg" className="w-4 h-4 mr-2" alt="whatsapp" />
          Message us on WhatsApp
        </Button>

        <div className="text-center text-gray-400 text-xs">— or fill the form —</div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="text-sm"
            />
          </div>
          <div>
            <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="text-sm"
            />
          </div>
          <div>
            <Label htmlFor="phone">
              Phone <span className="text-gray-400 text-sm">(optional)</span>
            </Label>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="10-digit mobile"
              className="text-sm"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white mt-2 font-semibold"
            disabled={
              !/^[A-Za-z\s]+$/.test(formData.name.trim()) ||
              !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
            }
          >
            Submit
          </Button>
        </form>
      </div>
    </Card>
  </motion.div>
</div>


      </div>

      {/* Modal */}
      <Dialog
        open={openModal !== null}
        onOpenChange={(open) => {
          if (!open && !querySent) setOpenModal(null);
        }}
      >
        <DialogContent className="sm:max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-800 mb-2">
              {openModal === "email" ? "Send via Email" : "Send via WhatsApp"}
            </DialogTitle>
            <p className="text-gray-500 text-sm">
              Please enter your query message below
            </p>
          </DialogHeader>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 8px 20px rgba(128, 90, 213, 0.2)",
            }}
            onClick={() =>
              setModalMessage(
                "I am interested to understand more about your solutions and services."
              )
            }
            className="cursor-pointer mb-2 p-4 rounded-xl border border-gray-200 bg-slate-50 hover:bg-purple-50 transition-all duration-200"
          >
            <div className="flex items-start gap-3">
              <MessageCircle className="w-5 h-5 text-purple-600 mt-1" />
              <p className="text-sm text-gray-800 leading-snug">
                <span className="font-semibold">Default message:</span> “I am
                interested to understand more about your solutions and
                services.”
              </p>
            </div>
          </motion.div>

          <textarea
            className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows={4}
            placeholder="Write your message..."
            value={modalMessage}
            onChange={(e) => setModalMessage(e.target.value)}
          />

          <DialogFooter className="mt-4">
            <Button
              type="button"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white"
              onClick={() => {
                const platform = openModal!;
                const trimmedMessage = modalMessage.trim();

                if (
                  !trimmedMessage ||
                  !formData.name.trim() ||
                  !formData.email.trim() ||
                  !visitorId
                ) {
                  toast({
                    title: "Message Required",
                    description: "Please type your message before sending.",
                    variant: "destructive",
                  });
                  return;
                }

                if (platform === "whatsapp") {
                  const fullMessage = `
Hello Team,

Visitor Details:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || "Not provided"}
Query ID: ${visitorId}

Message:
${trimmedMessage}
    `;
                  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    fullMessage
                  )}`;
                  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
                  handleFinalSend(platform);
                  return;
                }

                handleFinalSend(platform);
              }}
              disabled={!modalMessage.trim()}
            >
              Send Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ContactSection;