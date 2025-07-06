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
import { MessageCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, MapPin } from "lucide-react";
import { motion } from "framer-motion";

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
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "9835775694"; // ✅ ADDED
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [querySent, setQuerySent] = useState(false);
  const [openModal, setOpenModal] = useState<"email" | "whatsapp" | null>(
    null
  );
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

    if (!name || !email || !phone) {
      toast({ title: "All fields are required.", variant: "destructive" });
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

      if (!response.ok) {
        throw new Error("Failed to send data to backend");
      }

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
      const response = await fetch(
        `${backendUrl}/update-query/${visitorId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

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
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 opacity-20 rounded-full blur-2xl animate-pulse" />
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
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

        {/* Combined Benefits + Industries + Form Side by Side */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
  {/* Left Side: Merged Card */}
  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
    <motion.div whileHover={{ scale: 1.02 }}>
      <Card className="h-full bg-white/30 backdrop-blur-2xl border border-white/20 shadow-xl flex flex-col justify-between">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">
            Why Choose Codepackers?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">{benefit}</span>
            </div>
          ))}
          <div className="mt-6">
            <h4 className="font-semibold text-gray-900 mb-2">Serving Industries:</h4>
            <div className="flex flex-wrap gap-2">
              {industries.map((industry, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-blue-50 text-blue-700"
                >
                  {industry}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  </motion.div>

  {/* Right Side: Form Card (unchanged) */}
  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
    <Card className="h-full bg-white/30 backdrop-blur-2xl border border-white/20 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">
          Drop Your Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={submitted ? handleReset : handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="Your Number" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" />
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              {submitted ? "Submit Another Response" : "Submit"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpenModal("email")}
              disabled={!submitted || querySent}
            >
              <img src="/icons/email-icon.svg" className="w-4 h-4 mr-2" alt="email" />
              Send via Email
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpenModal("whatsapp")}
              disabled={!submitted || querySent}
            >
              <img src="/icons/whatsapp-icon.svg" className="w-4 h-4 mr-2" alt="whatsapp" />
              Send via WhatsApp
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </motion.div>
</div>


        {/* Form */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <Card className="bg-white/30 backdrop-blur-2xl border border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Drop Your Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={submitted ? handleReset : handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="Your Number" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" />
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    {submitted ? "Submit Another Response" : "Submit"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpenModal("email")}
                    disabled={!submitted || querySent}
                  >
                    <img src="/icons/email-icon.svg" className="w-4 h-4 mr-2" alt="email" />
                    Send via Email
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpenModal("whatsapp")}
                    disabled={!submitted || querySent}
                  >
                    <img src="/icons/whatsapp-icon.svg" className="w-4 h-4 mr-2" alt="whatsapp" />
                    Send via WhatsApp
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Modal */}
      <Dialog open={openModal !== null} onOpenChange={(open) => {
        if (!open && !querySent) setOpenModal(null);
      }}>
        <DialogContent className="sm:max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200">
  <DialogHeader>
    <DialogTitle className="text-2xl font-bold text-gray-800 mb-2">
      {openModal === "email" ? "Send via Email" : "Send via WhatsApp"}
    </DialogTitle>
    <p className="text-gray-500 text-sm">Please enter your query message below</p>
  </DialogHeader>

  {/* Fancy Default Message Card with Animation */}
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
      <span className="font-semibold">Default message:</span>{" "}
      “I am interested to understand more about your solutions and services.”
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
        if (!trimmedMessage || !formData.name || !formData.email || !formData.phone || !visitorId) return;

        if (platform === "whatsapp") {
          const fullMessage = `
Hello Team,

Visitor Details:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Query ID: ${visitorId}

Message:
${trimmedMessage}
`;
          const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(fullMessage)}`;
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