"use client";

import { useRef, useState, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import Footer from "./components/Footer"; // Import the Footer component

export default function Home() {
  const howItWorksRef = useRef(null);
  const fileInputRef = useRef(null); // Ref for file input
  const [file, setFile] = useState(null); // State to hold the uploaded file
  const [showPlayer, setShowPlayer] = useState(false); // State to show/hide full-screen player
  const waveformRef = useRef(null); // Ref for waveform container
  const wavesurferRef = useRef(null); // Ref for wavesurfer instance
  const [isPlaying, setIsPlaying] = useState(false); // State to track play/pause status

  const scrollToSection = () => {
    howItWorksRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setShowPlayer(true); // Show the full-screen player after file is uploaded
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Trigger the file input click
  };

  const handleClosePlayer = () => {
    setShowPlayer(false); // Hide the full-screen player
    if (wavesurferRef.current) {
      wavesurferRef.current.destroy(); // Destroy the wavesurfer instance when closing the player
    }
  };

  const togglePlayPause = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause(); // Toggle play/pause
      setIsPlaying(!isPlaying); // Update play/pause state
    }
  };

  const handleSave = () => {
    // Implement the save functionality here
    console.log("Saving audio as MP3...");
    // Add your saving logic here
  };

  useEffect(() => {
    if (file && waveformRef.current) {
      // Initialize WaveSurfer.js
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#A8DBA8",
        progressColor: "#3B8686",
        barWidth: 2,
        responsive: true,
        height: 128,
      });

      const reader = new FileReader();
      reader.onload = function (e) {
        wavesurferRef.current.loadBlob(new Blob([e.target.result]));
      };
      reader.readAsArrayBuffer(file);
    }

    // Cleanup on unmount
    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
    };
  }, [file]);

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

          {/* Hidden input for file upload */}
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
        <div className="fullscreen-player">
          <button className="close-button" onClick={handleClosePlayer}>
            ×
          </button>

          {/* Waveform Container */}
          <div ref={waveformRef} className="waveform-container"></div>
          {/* Footer Component */}
          <Footer onPlay={togglePlayPause} onSave={handleSave} />
        </div>
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
