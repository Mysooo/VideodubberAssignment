// Home.jsx

"use client";

import { useRef, useState } from "react";
import AudioPlayer from "./components/AudioPlayer"; // Import the AudioPlayer component

export default function Home() {
  const howItWorksRef = useRef(null);
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);

  const scrollToSection = () => {
    howItWorksRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setShowPlayer(true);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleClosePlayer = () => {
    setShowPlayer(false);
    setFile(null); // Reset the file state
  };

  return (
    <>
      {!showPlayer ? (
        <div className="container">
          <div className="top" id="navbar">
            <a onClick={scrollToSection}>HOW IT WORKS</a>
            <a href="#">JOINER</a>
          </div>

          <p className="description">
            Audio Cutter
            <br />
            Free editor to trim and cut any audio file online
          </p>

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="audio/mp3"
            onChange={handleFileUpload}
          />

          <button className="custom-button" onClick={handleButtonClick}>
            Browse Files
          </button>
        </div>
      ) : (
        <AudioPlayer file={file} onClose={handleClosePlayer} />
      )}

      <div ref={howItWorksRef} className="how-it-works-section">
        <h2>How to cut audio</h2>
        <div className="content-box">
          <p>
            This app can be used to trim and/or cut audio tracks, remove an
            audio fragment. Fade in and fade out your music easily to make the
            audio harmoniously.
          </p>
          <p>
            It's fast and easy to use. You can save the audio file in any format
            (codec parameters are configured).
          </p>
          <p>
            It works directly in the browser, no need to install any software,
            and it's available for mobile devices.
          </p>
        </div>
        <div className="privacy-section">
          <h3>Privacy and Security Guaranteed</h3>
          <p>This is a serverless app. Your files do not leave your device.</p>
        </div>
      </div>
    </>
  );
}
