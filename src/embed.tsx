import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Create embed function
function embedBoltPlayer(elementId: string) {
  const targetElement = document.getElementById(elementId);
  if (targetElement) {
    createRoot(targetElement).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  }
}

// Export to window
declare global {
  interface Window {
    embedBoltPlayer: typeof embedBoltPlayer;
  }
}
window.embedBoltPlayer = embedBoltPlayer;

// Create the embed code generator
export function generateEmbedCode(height = '300'): string {
  return `<iframe width="100%" height="${height}" scrolling="no" frameborder="no" allow="autoplay" src="${window.location.origin}/player.html"></iframe>`;
}

export { embedBoltPlayer };