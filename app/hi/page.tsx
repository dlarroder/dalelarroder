'use client';

import MainLayout from '@/layouts/MainLayout';

function WelcomePage() {
  return (
    <div style={welcomePageStyle}>
      <h1 style={welcomeTextStyle}>hii</h1>
      <p style={welcomeSubTextStyle}>enjoy your stay!</p>
    </div>
  );
}

const welcomePageStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '70vh',
  textAlign: 'center',
  fontFamily: 'var(--font-medium)',
  margin: 0,
  padding: 0,
  overflow: 'hidden',
};

const welcomeTextStyle = {
  fontSize: '2.5rem',
  fontWeight: 'bold',
  color: 'var(--text)',
  marginBottom: '1rem',
  fontFamily: 'var(--font-extrabold)',
};

const welcomeSubTextStyle = {
  fontSize: '1.2rem',
  color: 'var(--text)',
  fontFamily: 'var(--font-medium)',
};

export default function Uses() {
  return (
    <MainLayout>
      <WelcomePage />
    </MainLayout>
  );
}
