import React from 'react';
import { Card, Image, Text } from '@mantine/core';

import Josh from '../../Images/Josh.png';
import Kenya from '../../Images/Kenya.png';
import Donna from '../../Images/Donna.png';
import Tricia from '../../Images/Tricia.png';
import Justin from '../../Images/Justin.png';
import Tim from '../../Images/Tim.png';


const teamMembersContent = [
    {
        name: 'Joshua Coffey',
        imageSrc: Josh,
        information: 'I am a full-stack web developer attending Code Fellows. I have a passion for producing products that people love using and troubleshooting.'
    },
    {
        name: 'Kenya Womack',
        imageSrc: Kenya,
        information: ''

    },
    {
        name: 'Justin Mathieu',
        imageSrc: Justin,
        information: 'Excited to begin a career in software development and build awesome things, while continuing to learn as much as possible!'

    },
    {
        name: 'Tricia Sawyer',
        imageSrc: Tricia,
        information: 'Full Stack Software Developer, furthering my knowledge through my education at DeltaV Code School.'

    },
    {
        name: 'Tim Maupin',
        imageSrc: Tim,
        information: ''

    },
    {
        name: 'Donna Ada',
        imageSrc: Donna,
        information: 'Aspiring full-stack developer looking to make a difference one web application at a time || Currently learning at codefellows'

    },
];

const About = () => {
    const TeamMembers = ({ name, imageSrc, information }) => {
      return (
        <Card shadow="md" padding="lg">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Image src={imageSrc} alt={name} width={120} height={120} radius="80px" />
            <Text style={{ margin: '12px' }}>{name}</Text>
            <Text>{information}</Text>
          </div>
        </Card>
      );
    };
  
    return (
      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', paddingBottom: '10px' }}>About Our Team</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '25px' }}>
          {teamMembersContent.map((member, index) => (
            <TeamMembers key={index} {...member} />
          ))}
        </div>
      </div>
    );
  };


export default About;