import React from 'react';

export default function Footer({ onPlay, onSave }) {
  return (
    <footer className="footer">
      <div className="footer-content">
        <button className="play-button" onClick={onPlay}>
          🎵 Play
        </button>
        <button className="save-button" onClick={onSave}>
          💾 Save as MP3
        </button>
      </div>
    </footer>
  );
}
