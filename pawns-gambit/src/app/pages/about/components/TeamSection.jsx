import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import aboutService from '../../../../services/aboutService';
import LoadingSpinner from '../../../../components/ui/LoadingSpinner';
import ErrorMessage from '../../../../components/ui/ErrorMessage';

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTeamMembers = async () => {
      try {
        setLoading(true);
        const data = await aboutService.fetchTeamMembers();
        console.log('📋 Team members loaded:', data);
        setTeamMembers(data);
      } catch (err) {
        console.error('❌ Failed to load team members:', err);
        setError('Failed to load team members. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadTeamMembers();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <ErrorMessage message={error} />
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
            Meet Our Team
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionate chess enthusiasts and community builders working together to create 
            an exceptional experience for every member of The Pawns Gambit family.
          </p>
        </div>

        {teamMembers.length === 0 ? (
          <p className="text-center text-muted-foreground">No team members found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => {
              const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';
              const photoUrl = member.photo?.url
                ? (member.photo.url.startsWith('http') ? member.photo.url : `${API_BASE}${member.photo.url}`)
                : null;

              // Strapi now returns socialLinks as array [{ platform, url }, ...]
              const socialLinks = Array.isArray(member.socialLinks) ? member.socialLinks : [];

              console.log('👤 Rendering member:', member.name, 'Photo URL:', photoUrl);

              const iconMap = {
                linkedin: 'Linkedin',
                twitter: 'Twitter',
                instagram: 'Instagram',
                facebook: 'Facebook',
                youtube: 'Youtube',
                youtube_short: 'Youtube',
              };

              return (
                <div key={member.id} className="card p-6 text-center hover-elevate transition-strategic">
                  <div className="relative mb-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto shadow-strategic">
                      {photoUrl ? (
                        <Image
                          src={photoUrl}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <Icon name="User" size={32} className="text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <Icon name="Star" size={14} className="text-white" />
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-primary mb-1">
                    {member.name}
                  </h3>
                  <p className="text-accent font-medium mb-4">
                    {member.role}
                  </p>
                  {member.bio && (
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {member.bio}
                    </p>
                  )}

                  {socialLinks.length > 0 && (
                    <div className="flex justify-center space-x-3">
                      {socialLinks.map(({ platform, url }) => {
                        const key = (platform || '').toLowerCase();
                        const iconName = iconMap[key] || 'Globe';
                        return (
                          <a
                            key={platform + url}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-quick"
                            title={platform}
                          >
                            <Icon name={iconName} size={14} />
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSection;