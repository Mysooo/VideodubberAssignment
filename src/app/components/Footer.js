import React from "react";

const Footer = ({ onPlay, onCut, onRemove, start, end }) => {
  return (
    <div className="footer-container">
      {/* Play/Pause Button */}
      <button className="footer-btn play-btn" onClick={onPlay}>
        ⏯️
      </button>

      {/* Start and End Time Display */}
      <div className="footer-time">
        <span className="start-time">Start: {start.toFixed(2)}s</span>
        <span className="end-time">End: {end.toFixed(2)}s</span>
      </div>

      {/* Download Button */}
      <div className="footer-actions">
        <button className="footer-btn download-btn" onClick={onCut}>
          ✂️ Cut
        </button>
        <button className="footer-btn remove-btn" onClick={onRemove}>
          🗑️ Remove
        </button>
      </div>
    </div>
  );
};

export default Footer;
