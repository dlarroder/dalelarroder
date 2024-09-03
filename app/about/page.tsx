'use client';

import { useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';

export default function About() {
  useEffect(() => {
    // Dynamically load Font Awesome CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
    document.head.appendChild(link);

    // Load Poppins font
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href =
      'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap';
    document.head.appendChild(fontLink);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(fontLink);
    };
  }, []);

  return (
    <MainLayout>
      <div style={containerStyle}>
        <header style={headerStyle}>
          <h1 style={titleStyle}>Hi, I’m Subash</h1>
          <p style={subtitleStyle}>Dev</p>
        </header>
        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>About Me</h2>
          <p style={textStyle}>
            I am a passionate developer and UI designer with experience in creating user-friendly
            interfaces and robust applications. I thrive in collaborative environments and enjoy
            solving complex problems through innovative solutions.
          </p>
        </section>
        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Skills</h2>
          <ul style={listStyle}>
            <li style={listItemStyle}>Front-end Development: React, Vue.js, HTML, CSS</li>
            <li style={listItemStyle}>UI/UX Design: Figma, Sketch, Adobe XD</li>
            <li style={listItemStyle}>Backend Development: Node.js, Express</li>
            <li style={listItemStyle}>Version Control: Git, GitHub</li>
          </ul>
        </section>
        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Projects</h2>
          <ul style={listStyle}>
            <li style={listItemStyle}>
              <a
                href="https://sarkardocs.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SarkarDocs"
              >
                SarkarDocs
              </a>
              : Restful API docs for devs.
            </li>
            <li style={listItemStyle}>
              <a
                href="https://github.com/Flux.git"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Flux Dev"
              >
                Flux Dev
              </a>
              : Schnell Image Generator API.
            </li>
          </ul>
        </section>
      </div>
    </MainLayout>
  );
}

// Styles for the portfolio page
const containerStyle = {
  padding: '20px',
  maxWidth: '800px',
  margin: 'auto',
  fontFamily: 'Poppins, sans-serif', // Use Poppins font
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '30px', // Increased margin for spacing
};

const titleStyle = {
  fontSize: '2.5rem',
  margin: '0 0 10px 0', // Margin adjustments for spacing
  fontWeight: '600', // Semi-bold for a clean look
  color: '#08a76d',
  fontFamily: 'Poppins, sans-serif', // Use Poppins font
};

const subtitleStyle = {
  fontSize: '1.5rem',
  fontWeight: '400',
  color: '#555',
  fontFamily: 'Poppins, sans-serif',
};

const sectionStyle = {
  marginBottom: '30px', // Increased margin for spacing
};

const sectionTitleStyle = {
  fontSize: '2rem',
  fontWeight: '600',
  color: '#fff',
  backgroundColor: '#154c79', // Purple background for highlight
  padding: '5px 10px', // Padding for text fitting
  borderRadius: '5px', // Slight rounding of corners
  display: 'inline-block', // Ensures background fits tightly around text
  fontFamily: 'Poppins, sans-serif',
};

const textStyle = {
  fontSize: '1.2rem',
  lineHeight: '1.6',
};

const listStyle = {
  listStyleType: 'none',
  padding: 0,
};

const listItemStyle = {
  marginBottom: '15px', // Increased margin for spacing
};
