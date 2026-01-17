'use client'
import React from 'react';
import ParticleButton from '../component/ParticleButton';

const DemoParticleButtonPage = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#12091d',
      gap: '2rem'
    }}>
      <h1 style={{ color: '#fff', fontSize: '2rem', marginBottom: '1rem' }}>
        Particle Button Demo
      </h1>
      <ParticleButton
        style={{
          padding: '1rem 2.5rem',
          fontSize: '1.25rem',
          borderRadius: '1rem',
          border: 'none',
          background: 'linear-gradient(90deg, #392e4e 0%, #060010 100%)',
          color: '#fff',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 2px 16px 0 rgba(132,0,255,0.15)'
        }}
        particleCount={6}
        glowColor="132, 0, 255"
      >
        Hover Me!
      </ParticleButton>
    </div>
  );
};

export default DemoParticleButtonPage;
