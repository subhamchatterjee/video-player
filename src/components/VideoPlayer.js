import React, { useEffect, useState, useRef } from 'react';

const VideoPlayer = () => {
  const videoRef = useRef();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/video")
    .then((res) => res.json())
    .then((data) => {
      setLoading(false);
      if(data?.status && data?.url && videoRef?.current) {
        videoRef.current.src = data.url;
      }
    }).catch((err) => {
      console.log("error in fetching video url", err);
    });
  }, []);

  const seek = (type) => {
    let currentTime = videoRef?.current?.currentTime || 0;
    if(type === "forward") {
      videoRef.current.currentTime = currentTime + 5;
    } else if(type === "backward") {
      videoRef.current.currentTime = currentTime - 5;
    }
  }

  return (
    <div className="video-player-container">
      {!loading ? (
        <div className="video-player">
          <div className="arrow arrow-left" onClick={() => seek("backward")} title="5 secs backward">&#8249;</div>
          <video ref={videoRef} controls width="100%" />
          <div className="arrow arrow-right" onClick={() => seek("forward")} title="5 secs forward">&#8250;</div>
        </div>
      ) : (
        <div className="loading-video">
          Loading...
        </div>
      )}
    </div>
  )
}

export default VideoPlayer;