import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const VolunteerSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    interests: [],
    availability: ''
  });

  const volunteerOpportunities = [
    {
      icon: "Calendar",
      title: "Event Coordinator",
      description: "Help organize tournaments, workshops, and community gatherings. Perfect for detail-oriented individuals who love bringing people together.",
      commitment: "4-6 hours/month",
      skills: ["Event Planning", "Communication", "Organization"]
    },
    {
      icon: "GraduationCap",
      title: "Chess Instructor",
      description: "Teach chess to beginners and children in our education programs. Share your passion for the game with the next generation.",
      commitment: "2-4 hours/week",
      skills: ["Chess Knowledge", "Teaching", "Patience"]
    },
    {
      icon: "Camera",
      title: "Content Creator",
      description: "Capture moments at events, create social media content, and help tell our community's story through visual storytelling.",
      commitment: "Flexible",
      skills: ["Photography", "Social Media", "Creativity"]
    },
    {
      icon: "Headphones",
      title: "Podcast Assistant",
      description: "Support podcast production, research guests, and help create engaging chess content for our growing audience.",
      commitment: "3-5 hours/month",
      skills: ["Research", "Audio Editing", "Chess Analysis"]
    }
  ];

  const interestOptions = [
    "Event Organization",
    "Teaching & Education", 
    "Content Creation",
    "Podcast Production",
    "Tournament Management",
    "Community Outreach",
    "Technical Support",
    "Marketing & Social Media"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestChange = (interest, checked) => {
    setFormData(prev => ({
      ...prev,
      interests: checked 
        ? [...prev?.interests, interest]
        : prev?.interests?.filter(i => i !== interest)
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    console.log('Volunteer application submitted:', formData);
    // Handle form submission
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
            Volunteer With Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join our team of passionate volunteers and help build the chess community. 
            Your skills and enthusiasm can make a real difference in players' lives.
          </p>
        </div>

        {/* Volunteer Opportunities */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {volunteerOpportunities?.map((opportunity, index) => (
            <div key={index} className="card p-8 hover-elevate transition-strategic">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={opportunity?.icon} size={24} className="text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    {opportunity?.title}
                  </h3>
                  <p className="text-accent font-medium text-sm">
                    {opportunity?.commitment}
                  </p>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {opportunity?.description}
              </p>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-primary">Required Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {opportunity?.skills?.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Volunteer Application Form */}
        <div className="bg-background rounded-2xl p-8 lg:p-12 shadow-strategic">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Ready to Make Your Move?
            </h3>
            <p className="text-muted-foreground">
              Fill out this form and we'll match you with volunteer opportunities that align with your skills and interests.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                type="text"
                name="name"
                value={formData?.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData?.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                required
              />
            </div>

            <Input
              label="Phone Number"
              type="tel"
              name="phone"
              value={formData?.phone}
              onChange={handleInputChange}
              placeholder="(555) 123-4567"
            />

            <div>
              <label className="form-label">Chess Experience Level</label>
              <select
                name="experience"
                value={formData?.experience}
                onChange={handleInputChange}
                className="form-input w-full"
                required
              >
                <option value="">Select your experience level</option>
                <option value="beginner">Beginner (Know the rules)</option>
                <option value="intermediate">Intermediate (Rated 800-1400)</option>
                <option value="advanced">Advanced (Rated 1400-1800)</option>
                <option value="expert">Expert (Rated 1800+)</option>
                <option value="instructor">Certified Instructor</option>
              </select>
            </div>

            <div>
              <label className="form-label mb-4">Areas of Interest (Select all that apply)</label>
              <div className="grid md:grid-cols-2 gap-3">
                {interestOptions?.map((interest, index) => (
                  <Checkbox
                    key={index}
                    label={interest}
                    checked={formData?.interests?.includes(interest)}
                    onChange={(e) => handleInterestChange(interest, e?.target?.checked)}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="form-label">Availability</label>
              <textarea
                name="availability"
                value={formData?.availability}
                onChange={handleInputChange}
                placeholder="Tell us about your availability (days, times, frequency)"
                className="form-input w-full h-24 resize-none"
                required
              />
            </div>

            <div className="text-center pt-4">
              <Button
                type="submit"
                variant="default"
                size="lg"
                iconName="Send"
                iconPosition="right"
                className="bg-accent hover:bg-accent/90"
              >
                Submit Application
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default VolunteerSection;