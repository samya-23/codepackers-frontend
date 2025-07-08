"use client";
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
import { useTranslation } from 'react-i18next';

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

const BackgroundBlob = () => (
  <>
    {/* Desktop-only blobs */}
    <div className="hidden sm:block absolute -top-32 -left-32 w-[500px] h-[500px] 
      bg-purple-400 rounded-full animate-pulse
      opacity-20 blur-3xl" />
    <div className="hidden sm:block absolute -bottom-32 -right-32 w-[500px] h-[500px] 
      bg-blue-400 rounded-full animate-pulse
      opacity-20 blur-3xl" />

    {/* Mobile-only blobs */}
    <div className="block sm:hidden absolute -top-28 -left-20 w-[350px] h-[350px] 
      bg-purple-400 rounded-full animate-pulse
      opacity-30 blur-2xl z-0" />
    <div className="block sm:hidden absolute -bottom-28 -right-20 w-[350px] h-[350px] 
      bg-blue-400 rounded-full animate-pulse
      opacity-30 blur-2xl z-0" />
  </>
);

const PatternOverlay = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
    <defs>
      <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="1" fill="#e2e8f0" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dots)" opacity="0.5 md:opacity-100" />
  </svg>
);

const ContactSection = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const backendUrl =
    import.meta.env.VITE_REACT_APP_BACKEND_URL || "http://localhost:8000";
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;

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
    t('contact.benefits.0'),
    t('contact.benefits.1'),
    t('contact.benefits.2'),
    t('contact.benefits.3'),
    t('contact.benefits.4'),
    t('contact.benefits.5'),
  ];

  const industries = [
    { key: "education", name: "Education" },
    { key: "healthcare", name: "Healthcare" },
    { key: "ecommerce", name: "E-commerce" },
    { key: "egovernance", name: "E-governance" },
    { key: "manufacturing", name: "Manufacturing" },
    { key: "telecom", name: "Telecom" },
    { key: "homelandSecurity", name: "Homeland Security" }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone } = formData;

    if (!name.trim()) {
      toast({ title: t('contact.toasts.nameRequired'), variant: "destructive" });
      return;
    }
    if (!email.trim()) {
      toast({ title: t('contact.toasts.emailRequired'), variant: "destructive" });
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
        title: t('contact.toasts.detailsSavedTitle'),
        description: t('contact.toasts.detailsSavedDescription'),
      });
    } catch (error) {
      toast({
        title: t('contact.toasts.submissionFailedTitle'),
        description: t('contact.toasts.submissionFailedDescription'),
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
          title: t('contact.toasts.emailSentTitle'),
          description: t('contact.toasts.emailSentDescription'),
        });
      }

      setModalMessage("");
      setQuerySent(true);
      setOpenModal(null);
    } catch (error) {
      console.error("Send Error", error);
      toast({
        title: t('contact.toasts.sendFailedTitle'),
        description: t('contact.toasts.sendFailedDescription'),
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
      className="relative py-12 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-slate-50 to-slate-100 overflow-hidden"
    >
      {/* Background */}
      <BackgroundBlob />
      <PatternOverlay />

      <div className="relative z-10 max-w-7xl mx-auto space-y-10 md:space-y-20">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center px-2"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 font-[Inter_Tight]">
            {t('contact.title')}{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              {t('contact.subtitle')}
            </span>
          </h2>
          <p className="mt-3 md:mt-4 text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto font-light">
            {t('contact.description')}
          </p>
        </motion.div>

        {/* Cards - Left and Right side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch px-2 sm:px-0">
          {/* Left Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-col h-full"
          >
            <Card className="h-full flex flex-col justify-between rounded-2xl md:rounded-3xl border border-gray-200 shadow-md bg-white/30 backdrop-blur-xl">
              <CardHeader className="p-4 md:p-6 pb-0">
                <CardTitle className="text-xl md:text-2xl font-bold text-gray-800">
                  {t('contact.leftCard.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-2 md:pt-4 text-sm text-gray-700 flex flex-col gap-4 md:gap-8 font-inter">
                {/* Benefits Grid */}
                <div>
                  <h4 className="text-sm md:text-base font-semibold text-gray-800 mb-3 md:mb-4">
                    {t('contact.leftCard.benefitsTitle')}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-6 gap-y-3 md:gap-y-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-2 md:gap-3">
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 mt-0.5" />
                        <span className="text-gray-800 text-xs md:text-[0.95rem] font-medium leading-snug">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Horizontal Divider */}
                <div className="border-t border-gray-300 my-2 md:my-0" />

                {/* Industries + Contact Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                  {/* Industries */}
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1 md:mb-2 tracking-wide">
                      {t('contact.leftCard.industriesTitle')}
                    </h4>
                    <div className="flex flex-col gap-1 md:gap-2">
                      {industries.map((industry, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs md:text-sm text-gray-800">
                          {industryIcons[industry.name] ?? (
                            <ShieldCheck className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                          )}
                          <span>{t(`contact.industries.${industry.key}`)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1 md:mb-2 tracking-wide">
                      {t('contact.leftCard.contactTitle')}
                    </h4>
                    <div className="space-y-1 md:space-y-2 text-xs md:text-sm text-gray-700">
                      {/* Location */}
                      <div className="flex items-center gap-2 md:gap-3 text-gray-800 font-semibold">
                        <div className="bg-red-100 rounded-full p-1">
                          <MapPin className="w-3 h-3 md:w-4 md:h-4 text-red-500" />
                        </div>
                        <span>India</span>
                      </div>

                      {/* Email 1 */}
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="bg-blue-100 rounded-full p-1">
                          <Mail className="w-3 h-3 md:w-4 md:h-4 text-blue-600" />
                        </div>
                        <span className="text-gray-800 break-all">suja.sharma@codepackers.com</span>
                      </div>

                      {/* Email 2 */}
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="bg-blue-100 rounded-full p-1">
                          <Mail className="w-3 h-3 md:w-4 md:h-4 text-blue-600" />
                        </div>
                        <span className="text-gray-800 break-all">vikas.tyagi@codepackers.com</span>
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
            <Card className="h-full flex flex-col justify-between rounded-2xl md:rounded-3xl border border-gray-200 shadow-md bg-white/30 backdrop-blur-xl px-4 md:px-6 py-6 md:py-8">
              <div className="space-y-3 md:space-y-4 text-center">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                  {t('contact.rightCard.title')}
                </h3>
                <p className="text-xs md:text-sm text-gray-500">
                  {t('contact.rightCard.description')}
                </p>
              </div>

              <div className="flex flex-col gap-3 md:gap-4 mt-4 md:mt-6">
                <Button
                  onClick={() =>
                    window.open(`https://wa.me/${whatsappNumber}`, "_blank", "noopener,noreferrer")
                  }
                  className="bg-[#25D366] hover:bg-[#1DA851] text-white w-full text-xs md:text-sm font-semibold py-2 h-auto"
                >
                  <img src="/icons/whatsapp-icon.svg" className="w-3 h-3 md:w-4 md:h-4 mr-2" alt="whatsapp" />
                  {t('contact.rightCard.whatsappButton')}
                </Button>

                <div className="text-center text-gray-400 text-xs">
                  {t('contact.rightCard.orDivider')}
                </div>

                <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4 text-left">
                  <div>
                    <Label htmlFor="name" className="text-xs md:text-sm">
                      {t('contact.form.nameLabel')} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t('contact.form.namePlaceholder')}
                      className="text-xs md:text-sm h-10 md:h-9"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-xs md:text-sm">
                      {t('contact.form.emailLabel')} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('contact.form.emailPlaceholder')}
                      className="text-xs md:text-sm h-10 md:h-9"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-xs md:text-sm">
                      {t('contact.form.phoneLabel')} <span className="text-gray-400 text-xs">({t('contact.form.phoneOptional')})</span>
                    </Label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t('contact.form.phonePlaceholder')}
                      className="text-xs md:text-sm h-10 md:h-9"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white mt-1 md:mt-2 font-semibold py-2 h-auto"
                    disabled={
                      !/^[A-Za-z\s]+$/.test(formData.name.trim()) ||
                      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
                    }
                  >
                    {t('contact.form.submitButton')}
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
        <DialogContent className="max-w-[95%] sm:max-w-md bg-white rounded-xl md:rounded-2xl shadow-2xl border border-gray-200">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl font-bold text-gray-800 mb-1 md:mb-2">
              {openModal === "email" ? t('contact.modal.emailTitle') : t('contact.modal.whatsappTitle')}
            </DialogTitle>
            <p className="text-gray-500 text-xs md:text-sm">
              {t('contact.modal.description')}
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
              setModalMessage(t('contact.modal.defaultMessage'))
            }
            className="cursor-pointer mb-2 p-3 md:p-4 rounded-lg md:rounded-xl border border-gray-200 bg-slate-50 hover:bg-purple-50 transition-all duration-200"
          >
            <div className="flex items-start gap-2 md:gap-3">
              <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-purple-600 mt-0.5" />
              <p className="text-xs md:text-sm text-gray-800 leading-snug">
                <span className="font-semibold">{t('contact.modal.defaultMessageLabel')}:</span> {t('contact.modal.defaultMessage')}
              </p>
            </div>
          </motion.div>

          <textarea
            className="w-full mt-1 md:mt-2 p-2 md:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-xs md:text-sm"
            rows={4}
            placeholder={t('contact.modal.textareaPlaceholder')}
            value={modalMessage}
            onChange={(e) => setModalMessage(e.target.value)}
          />

          <DialogFooter className="mt-3 md:mt-4">
            <Button
              type="button"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 h-auto"
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
                    title: t('contact.toasts.messageRequiredTitle'),
                    description: t('contact.toasts.messageRequiredDescription'),
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
Phone: ${formData.phone || t('contact.form.phoneNotProvided')}
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
              {t('contact.modal.sendButton')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ContactSection;