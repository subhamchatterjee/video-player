import React, { useEffect, useState, useRef } from 'react';
import logo from '../logo.svg';

const VideoPlayer = () => {
  const SEEK_SECONDS = 5;
  const videoRef = useRef();
  const [error, setError] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

  const seek = (type) => {
    let currentTime = videoRef?.current?.currentTime || 0;
    if(type === "forward") {
      videoRef.current.currentTime = currentTime + SEEK_SECONDS;
    } else if(type === "backward") {
      videoRef.current.currentTime = currentTime - SEEK_SECONDS;
    }
  }

  const showError = () => {
    setError("Video could not be loaded! Please try refreshing the page again.");
  }

  const getVideoUrl = () => {
    fetch("http://localhost:8000/video")
    .then((res) => res.json())
    .then((data) => {
      if(data?.success && data?.url) {
        setVideoUrl(data.url);
      } else {
        showError();
      }
    }).catch((err) => {
      console.log("error in fetching video url", err);
      showError();
    });
  }

  useEffect(() => {
    if(videoUrl && videoRef?.current) {
      videoRef.current.src = videoUrl;
    }
  }, [videoUrl]);

  useEffect(() => {
    getVideoUrl();
  }, []);

  if(error) {
    return (
      <div className="video-player-container">
        <div className="error">{error}</div>
      </div>
    )
  }

  return (
    <div className="video-player-container">
      {videoUrl ? (
        <div className="video-player">
          <div className="arrow arrow-left" onClick={() => seek("backward")} title="5 secs backward">&#8249;</div>
          <video ref={videoRef} controls width="100%" />
          <div className="arrow arrow-right" onClick={() => seek("forward")} title="5 secs forward">&#8250;</div>
        </div>
      ) : (
        <div className="loading-video">
          Loading
          <img src={logo} className="loader" alt="loader" />
        </div>
      )}
    </div>
  )
}

export default VideoPlayer;