import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, CheckCircle, Send, MessageSquare } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, message } = formData;
    if (!name || !email || !phone || !message) {
      toast({ title: "All fields are required.", variant: "destructive" });
      return;
    }

    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll contact you within 48 hours.",
    });
    setSubmitted(true);
  };

  const benefits = [
    "AI agent Framework",
    "ERP system Framework",
    "Enterprise-grade security",
    "Multilingual capabilities",
    "Rapid deployment",
    "Scalable solutions"
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Get <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Started</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to transform your enterprise communication with AI?
            Let’s discuss how our platform can meet your specific needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Why Choose Us Card */}
          <Card className="bg-white/70 backdrop-blur-lg border-white/20 shadow-xl lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Why Choose Codepackers?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className="bg-white/70 backdrop-blur-lg border-white/20 shadow-xl lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Drop Us a Line</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input type="text" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea name="message" rows={4} value={formData.message} onChange={handleChange} />
                </div>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Send
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2"
                    disabled={!submitted}
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send via Email</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2"
                    disabled={!submitted}
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send via WhatsApp</span>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Industries Served Section */}
        <div className="mt-12 text-center">
          <h4 className="font-semibold text-gray-900 mb-3">Serving Industries:</h4>
          <div className="flex flex-wrap justify-center gap-2">
            {["Education", "Healthcare", "E-commerce", "E-governance", "Manufacturing", "Telecom", "Homeland Security"].map((industry, index) => (
              <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700">
                {industry}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
