import { useRef, useState, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import Footer from "./Footer"; // Import the Footer component

const AudioPlayer = ({ file, onClose }) => {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Toggle play/pause functionality
  const togglePlayPause = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
      setIsPlaying((prev) => !prev);
    }
  };

  // Handle mouse down (start of selection)
  const handleMouseDown = (event) => {
    const { offsetX } = event.nativeEvent;
    const duration = wavesurferRef.current.getDuration();
    const percentage = offsetX / waveformRef.current.clientWidth;
    const start = percentage * duration;
    setSelectionStart(start);
    setIsDragging(true);
  };

  // Handle mouse movement (selection range)
  const handleMouseMove = (event) => {
    if (!isDragging) return;
    const { offsetX } = event.nativeEvent;
    const duration = wavesurferRef.current.getDuration();
    const percentage = offsetX / waveformRef.current.clientWidth;
    const end = percentage * duration;
    setSelectionEnd(end);
  };

  // Handle mouse up (end of selection)
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Logic for cutting selected audio
  const cutAudio = () => {
    const start = selectionStart;
    const end = selectionEnd;
    console.log(`Cutting audio from ${start} to ${end}`);
    // Implement actual cutting logic here
  };

  // Logic for removing selected audio
  const removeAudio = () => {
    const start = selectionStart;
    const end = selectionEnd;
    console.log(`Removing audio from ${start} to ${end}`);
    // Implement actual removal logic here
  };

  // Initialize WaveSurfer and load the audio file
  useEffect(() => {
    if (file && waveformRef.current) {
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

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
    };
  }, [file]);

  return (
    <div className="fullscreen-player">
      {/* Close Button */}
      <button className="close-button" onClick={onClose}>
        ×
      </button>

      {/* Waveform Display */}
      <div
        ref={waveformRef}
        className="waveform-container"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // To stop dragging when the mouse leaves the container
      >
        {/* Selection Range */}
        <div
          className="selection-range"
          style={{
            left: `${(selectionStart / wavesurferRef.current?.getDuration()) * 100}%`,
            width: `${((selectionEnd - selectionStart) / wavesurferRef.current?.getDuration()) * 100}%`,
          }}
        >
          {/* Start Handle */}
          <div className="handle start-handle" />

          {/* End Handle */}
          <div className="handle end-handle" />
        </div>
      </div>

      {/* Footer with Play, Cut, and Remove Options */}
      <Footer
        onPlay={togglePlayPause}
        onCut={cutAudio}
        onRemove={removeAudio}
        start={selectionStart}
        end={selectionEnd}
      />
    </div>
  );
};

export default AudioPlayer;
