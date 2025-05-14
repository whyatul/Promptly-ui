"use client";

import React from 'react';

interface CreditCardProps {
  color?: string;
  secondaryColor?: string;
  rotation?: string;
  scale?: number;
  zIndex?: number;
  offsetX?: string;
  offsetY?: string;
  customTransform?: string;
}

export const CreditCard: React.FC<CreditCardProps> = ({
  color = "#ccc",
  secondaryColor = "#aaa",
  rotation = "0deg",
  scale = 1,
  zIndex = 0,
  offsetX = "0px",
  offsetY = "0px",
  customTransform = "",
}) => {
  const cardStyle: React.CSSProperties = {
    width: '320px',
    height: '200px',
    background: `linear-gradient(135deg, ${color} 0%, ${secondaryColor} 100%)`,
    borderRadius: '15px',
    padding: '20px',
    color: 'white',
    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
    transform: `${customTransform} rotate(${rotation}) scale(${scale}) translate(${offsetX}, ${offsetY})`,
    position: 'absolute',
    zIndex: zIndex,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'transform 0.3s ease',
    willChange: 'transform',
    transformStyle: 'preserve-3d',
  };

  return (
    <div style={cardStyle} className="credit-card-ui">
      <div>
        <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Your Bank</div>
      </div>
      <div>
        <div style={{ fontSize: '1.5em', letterSpacing: '2px', fontFamily: 'monospace' }}>
          **** **** **** 1234
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <div>
            <div style={{ fontSize: '0.8em', opacity: 0.8 }}>Card Holder</div>
            <div style={{ fontSize: '1em' }}>Your Name</div>
          </div>
          <div>
            <div style={{ fontSize: '0.8em', opacity: 0.8 }}>Expires</div>
            <div style={{ fontSize: '1em' }}>12/25</div>
          </div>
        </div>
      </div>
    </div>
  );
};
