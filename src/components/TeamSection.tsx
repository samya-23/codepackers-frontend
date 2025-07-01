import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Award, MapPin, Target } from 'lucide-react';

const TeamSection = () => {

    const handleCardClick = (link: string) => {
    window.open(link, '_blank');
  };


  const leadership = [
    {
      name: "Sujagya",
      role: "Chief Innovation Officer",
      description: "Overall vision, driving innovation in AI and enterprise solutions",
      link: "https://www.linkedin.com/in/sujagya/"
    },
    {
      name: "Vikas", 
      role: "Chief Business officer",
      description: "Business Development, Commercials and customer relationships",
      link: "http://www.linkedin.com/in/vikastyagi1974"

    },
   
  ];

  const teamRoles = [
    "Product Specialists",
    "Software Architects", 
    "Software Developers",
    "UI/UX Designers",
    "Software Testers",
    "Business Analysts",
    "DevOps Engineers",
    "Customer Relationship Team",
    "Support Team",
    "Research & Development"
  ];

  return (
    <section id="team" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Team</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Led by experienced professionals and powered by a diverse team of specialists, 
            we deliver excellence across all aspects of software development and operations.
          </p>
        </div>

        {/* Company Info */}
        {/* <div className="bg-white/50 backdrop-blur-lg rounded-3xl p-8 border border-white/20 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Location</h3>
              <p className="text-gray-600">India</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Focus</h3>
              <p className="text-gray-600">Enterprise AI Solutions</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expertise</h3>
              <p className="text-gray-600">Multiple Domains</p>
            </div>
          </div>
        </div> */}

        {/* Leadership */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">Leadership Team</h3>
          <div className="flex flex-col md:flex-row md:justify-center md:gap-8">
            {leadership.map((leader, index) => (
              <Card key={index} className="bg-white/60 backdrop-blur-lg border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer" onClick={() => handleCardClick(leader.link)}>
                <CardHeader className="text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center mx-auto mb-4">
                    {/* <img src={`/src/${leader.name}.png`} alt={`${leader.name}`} className="w-full h-full object-cover" /> */}
                    <img src={`/assets/${leader.name.toLowerCase()}.png`} alt={`${leader.name}`} className="w-full h-full object-cover" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">{leader.name}</CardTitle>
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white w-fit mx-auto">
                    {leader.role}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">{leader.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Composition */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
            Expert <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Team Composition</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {teamRoles.map((role, index) => (
              <div key={index} className="bg-white/70 rounded-xl p-4 text-center border border-white/40 hover:bg-white/90 transition-colors">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">{role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
