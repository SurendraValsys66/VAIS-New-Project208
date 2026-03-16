import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Zap } from "lucide-react";

interface OnlineMarketingConferenceTemplateProps {
  onUseTemplate?: () => void;
  isPreview?: boolean;
}

export const OnlineMarketingConferenceTemplate: React.FC<
  OnlineMarketingConferenceTemplateProps
> = ({ onUseTemplate, isPreview = false }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    company: "",
    location: "",
    jobRole: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-400 via-cyan-300 to-orange-200 py-20 px-4 md:px-0 min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        {isPreview && onUseTemplate && (
          <button
            onClick={onUseTemplate}
            className="absolute top-6 right-6 z-20 bg-white text-teal-600 hover:bg-gray-100 font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
          >
            <Zap className="w-5 h-5" />
            Use This Template
          </button>
        )}

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <p className="text-white text-sm uppercase tracking-widest mb-2 opacity-80">
            Learn more about internet marketing in london
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Online Marketing Conference
          </h1>
          <p className="text-white text-2xl font-semibold mb-8">26 - 28 Nov, 2021</p>
          <Button className="bg-white text-teal-600 hover:bg-gray-100 font-bold px-8 py-6 rounded-full">
            Register Now
          </Button>
        </div>
      </section>

      {/* Get Fresh Perspective Section */}
      <section className="py-16 px-4 md:px-0">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Get a fresh perspective
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Listen to over 10 speakers that have made it in the digital world of marketing,
                around over 50 scheduled workshops and a lot more at the conference. Get real
                insights and inspiration you need to take your marketing to the next level.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg h-48 flex items-center justify-center text-white font-bold">
                Speaker Image
              </div>
              <div className="bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-lg h-48 flex items-center justify-center text-gray-800 font-bold">
                Speaker Image
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Highlights Section */}
      <section className="py-16 px-4 md:px-0 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Inborn Street San Francisco</h3>
              <p className="text-gray-600">
                You are organized in a way that is and needs to go beyond the day one 's official
                theme of the same time, a unique [?] of online marketing.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Virtual only stays - Be there!</h3>
              <p className="text-gray-600">
                Suit your own gathering in shore shores worth during the there is no world of online
                marketing. Come and experience the benefits without the need to leave something out.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">The beginners workshop - Learn more!</h3>
              <p className="text-gray-600">
                Suited to people who are going to shore down worth during the there is no world of
                online marketing. Experience the journey of online marketing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 md:px-0 bg-gradient-to-r from-teal-500 to-cyan-500">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Attending Users" },
              { number: "50+", label: "Scheduled Talks" },
              { number: "10+", label: "Inspiring Speakers" },
              { number: "100%", label: "Live Streaming" },
            ].map((stat, index) => (
              <div key={index} className="text-white">
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm font-medium opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section className="py-16 px-4 md:px-0">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Speakers</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Listen to over 10 speakers that have made it in the digital world of marketing, around 50
            scheduled workshops and a lot more at the conference. Get real insights and inspiration you
            need to take your marketing to the next level.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {[
              { name: "Sarah Johnson", role: "Marketing Expert" },
              { name: "John Miller", role: "Brand Strategist" },
            ].map((speaker, index) => (
              <Card
                key={index}
                className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`h-48 ${index === 0 ? "bg-teal-400" : "bg-pink-300"}`}></div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-bold text-gray-900">{speaker.name}</h3>
                  <p className="text-gray-600">{speaker.role}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="bg-teal-50 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">August 31st, 2021</h3>
            <p className="text-gray-600 mb-6">
              Suit your own gathering in shore shores worth during the there is no world of online
              marketing. Come and experience the benefits without the need to leave something out.
            </p>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="py-16 px-4 md:px-0 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            Register for the Conference 2021
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Register with your details and you'll be registered for the world's leading digital marketing event.
          </p>

          {/* Event Details */}
          <div className="bg-white rounded-lg p-8 mb-8 border border-gray-200">
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: "📅",
                  title: "Event Date",
                  details: ["26th November, 2021", "Doors open at 10:00 AM"],
                },
                {
                  icon: "📍",
                  title: "Venue",
                  details: ["123 Main Street", "San Francisco, CA 94105"],
                },
                {
                  icon: "🎤",
                  title: "What's Included",
                  details: ["50+ Inspiring speakers", "Networking Lunch, Digital materials"],
                },
                {
                  icon: "💺",
                  title: "Limited Seats",
                  details: ["Only 500 seats available", "Early bird seats to avoid missing out."],
                },
              ].map((item, index) => (
                <div key={index} className="border-l-4 border-teal-500 pl-6">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h4>
                  {item.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Registration Details</h3>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Full Name *
                </label>
                <Input
                  type="text"
                  name="fullName"
                  placeholder="e.g. John"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="rounded-lg border-gray-300"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Email Address *
                </label>
                <Input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="rounded-lg border-gray-300"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Contact Number *
                </label>
                <Input
                  type="tel"
                  name="contactNumber"
                  placeholder="+1 (555) 000-0000"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  className="rounded-lg border-gray-300"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Company / Organisation
                </label>
                <Input
                  type="text"
                  name="company"
                  placeholder="Your Company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="rounded-lg border-gray-300"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Location *
                </label>
                <Input
                  type="text"
                  name="location"
                  placeholder="Select your city"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="rounded-lg border-gray-300"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Job Role *
                </label>
                <select
                  name="jobRole"
                  value={formData.jobRole}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                >
                  <option value="">Select your role</option>
                  <option value="manager">Manager</option>
                  <option value="executive">Executive</option>
                  <option value="specialist">Specialist</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Anything else you'd like to know? *
              </label>
              <textarea
                placeholder="Leave organizations, special needs, or available info"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                rows={4}
              ></textarea>
            </div>

            <Button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-full text-lg"
            >
              REGISTER NOW
            </Button>

            <p className="text-gray-500 text-xs mt-4 text-center">
              By registering you agree to our Terms of Service and Privacy Policy. We respect your
              privacy.
            </p>
          </form>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-teal-400 via-cyan-300 to-orange-200 py-20 px-4 md:px-0 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What are you waiting for?
          </h2>
          <p className="text-white text-lg mb-8 opacity-90">
            Get your seat for the world's leading digital marketing event.
          </p>
          <Button className="bg-white text-teal-600 hover:bg-gray-100 font-bold px-8 py-6 rounded-full text-lg">
            Register Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default OnlineMarketingConferenceTemplate;
