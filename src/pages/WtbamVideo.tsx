import React, { useRef, useEffect } from "react";
const WtbamVideo: React.FC = () => {
  const myCallback = () => {
    alert("end");
  };
  const videoSrc: string = "/assets/wtbam.mp4";
  const videoPlayer = useRef<HTMLVideoElement>(null);

  const playVideo = () => {
    videoPlayer.current!.play();
  };

  useEffect(() => {
    setTimeout(() => {
      playVideo();
    }, 3000);
  }, []);

  return (
    <div className="h-full w-full flex items-center justify-center bg-gray-400 backdrop-blur-sm bg-opacity-10">
      <div>
        <button onClick={playVideo}>play</button>
        <video autoPlay onEnded={myCallback} ref={videoPlayer} muted={false}>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag. I suggest you upgrade
          your browser.
        </video>
      </div>
    </div>
  );
};

export default WtbamVideo;
