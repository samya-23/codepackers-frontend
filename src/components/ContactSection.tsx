
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for your interest. Our team will contact you within 48 hours.",
    });
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
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
            Let's discuss how our platform can meet your specific needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Benefits & Contact Info */}
          {/* Benefits */}
          <Card className="bg-white/70 backdrop-blur-lg border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Why Choose Codepackers?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-white/70 backdrop-blur-lg border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">India</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-purple-600" />
                <span className="text-gray-700">suja.sharma@codepackers.com</span>
              </div>
              <div className="pt-4">
                <h4 className="font-semibold text-gray-900 mb-3">Serving Industries:</h4>
                <div className="flex flex-wrap gap-2">
                  {["Education", "Healthcare", "E-commerce", "E-governance", "Manufacturing", "Telecom", "Homeland Security"].map((industry, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700">
                      {industry}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
