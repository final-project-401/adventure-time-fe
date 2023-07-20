import React from 'react';
import { Card, Image, Text } from '@mantine/core';

const teamMembersContent = [
    {
        name: 'Joshua Coffey',
        imageSrc: '/assets/Josh.png',
        information: 'I am a full-stack web developer attending Code Fellows. I have a passion for producing products that people love using and troubleshooting.'
    },
    {
        name: 'Kenya Womack',
        imageSrc: '/assets/Kenya.png',
        information: ''

    },
    {
        name: 'Justin Mathieu',
        imageSrc: '/assets/Justin.png',
        information: 'Excited to begin a career in software development and build awesome things, while continuing to learn as much as possible!'

    },
    {
        name: 'Tricia Sawyer',
        imageSrc: '/assets/Tricia.png',
        information: 'Full Stack Software Developer, furthering my knowledge through my education at DeltaV code school.'

    },
    {
        name: 'Tim Maupin',
        imageSrc: '/assets/Tim.png',
        information: ''

    },
    {
        name: 'Donna Ada',
        imageSrc: '/assets/Donna.png',
        information: 'Aspiring full-stack developer looking to make a difference one web application at a time || Currently learning at codefellows'

    },
];

const About = () => {
    const TeamMembers = ({ name, imageSrc, information }) => {

        return (
            <Card shadow="sm" padding="lg">
                <div>
                    <Image src={imageSrc} alt={name} width={150} height={150} radius="l" />
                    <Text>
                        {name}
                    </Text>
                    <Text>{information}</Text>
                </div>
            </Card>
        );
    };
    
    // return (
        //   <MantineProvider>
        //     <div>
        //       <h1>About Our Team</h1>
        //       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        //         {teamMembersContent.map((member, index) => (
        //           <TeamMembers key={index} {...member} />
        //         ))}
        //       </div>
        //     </div>
        //   </MantineProvider>
    //   );
    };


export default About;