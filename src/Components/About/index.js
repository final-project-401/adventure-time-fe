import React from 'react';
import { Card, Image, Text } from '@mantine/core';

import Josh from '../../Images/Josh.png';
import Kenya from '../../Images/Kenya.png';
import Donna from '../../Images/Donna.png';
import Tricia from '../../Images/Tricia.png';
import Justin from '../../Images/Justin.png';
import Tim from '../../Images/Tim.png';
import linkedin from '../../assets/images/linkedin.png';
import github from '../../assets/images/github.png';

const teamMembersContent = [
    {
        name: 'Joshua Coffey',
        imageSrc: Josh,
        information: 'I am a full-stack web developer attending Code Fellows. I have a passion for producing products that people love using and troubleshooting.',
        githubLink: "https://github.com/Coff23",
        linkedinLink: "https://www.linkedin.com/in/joshuacoffey23/"
    },
    {
        name: 'Kenya Womack',
        imageSrc: Kenya,
        information: 'I have a mosaic background with many different qualifications and experiences. Currently I am a licensed real estate broker in Alabama. I am in school at Code Fellows training to become a Full Stack Software Engineer.',
        githubLink: "https://github.com/Coff23",
        linkedinLink: "https://www.linkedin.com/in/joshuacoffey23/"
    },
    {
        name: 'Justin Mathieu',
        imageSrc: Justin,
        information: 'Excited to begin a career in software development and build awesome things, while continuing to learn as much as possible!',
        githubLink: "https://github.com/Coff23",
        linkedinLink: "https://www.linkedin.com/in/joshuacoffey23/"

    },
    {
        name: 'Tricia Sawyer',
        imageSrc: Tricia,
        information: 'Full Stack Software Developer, furthering my knowledge through my education at DeltaV Code School.',
        githubLink: "https://github.com/Coff23",
        linkedinLink: "https://www.linkedin.com/in/joshuacoffey23/"

    },
    {
        name: 'Tim Maupin',
        imageSrc: Tim,
        information: '',
        githubLink: "https://github.com/Coff23",
        linkedinLink: "https://www.linkedin.com/in/joshuacoffey23/"

    },
    {
        name: 'Donna Ada',
        imageSrc: Donna,
        information: 'Full-stack developer looking to make a difference one web application at a time.',
        githubLink: "https://github.com/donnaada",
        linkedinLink: "https://www.linkedin.com/in/donnaada"

    },
];

const About = () => {
    const TeamMembers = ({ name, imageSrc, information, githubLink, linkedinLink }) => {
      return (
        <Card shadow="md" padding="lg">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Image src={imageSrc} alt={name} width={120} height={120} radius="80px" />
            <Text style={{ margin: '12px' }}>{name}</Text>
            <Text>{information}</Text>
            <div style={{ display: 'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', width:'30%'}}>
              <a href={githubLink} target='_blank' rel='noreferrer noopener'>
              <Image width={40}  src={github} alt={name} > </Image>
              </a>
              <a href={linkedinLink} target='_blank' rel='noreferrer noopener'>
                <Image width={40} src={linkedin} alt={name} ></Image>
              </a>
            </div>
          </div>
        </Card>
      );
    };
  
    return (
      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', paddingBottom: '10px', paddingTop: '5rem' }}>About Us</h1>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: '2rem' }}>
        Welcome to our company! We are a team of dedicated individuals passionate about providing excellent products and services.
      </p>
        <h1 style={{ textAlign: 'center', paddingBottom: '10px', paddingTop: '10rem' }}>About Our Team</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '25px' }}>
          {teamMembersContent.map((member, index) => (
            <TeamMembers key={index} {...member} />
          ))}
        </div>
      </div>
    );
  };


export default About;