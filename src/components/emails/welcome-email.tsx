import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface WaitlistWelcomeEmailProps {
  name: string;
}

export default function WaitlistWelcomeEmail({
  name,
}: WaitlistWelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to the Awalingo Waitlist!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>You're on the list, {name}! 🎉</Heading>
          
          <Section style={bodyContent}>
            <Text style={text}>
              Hi {name},
            </Text>
            <Text style={text}>
              Thank you for joining the early access waitlist for Awalingo. We are thrilled to have you! 
            </Text>
            <Text style={text}>
              We are working hard to build something special, and we'll let you know as soon as your spot opens up. 
            </Text>
            <Text style={text}>
              In the meantime, feel free to reply to this email if you have any questions or just want to say hi.
            </Text>
            
            <Text style={signature}>
              Best,<br />
              The Awalingo Team
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles for the email
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  borderRadius: '12px',
  border: '1px solid #e6ebf1',
  maxWidth: '600px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '40px',
  margin: '0 0 20px',
  padding: '0 48px',
};

const bodyContent = {
  padding: '0 48px',
};

const text = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
};

const signature = {
  ...text,
  marginTop: '32px',
  fontWeight: '600',
};
