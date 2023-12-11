import React from "react";

const VideoPlayer = ({ lesson }) => {
  // Check if lesson is undefined
  if (!lesson) {
    return null; // or some default content/message
  }

  return (
    <div className="video-player">
      {lesson.videoUrl && typeof lesson.videoUrl === "string" ? (
        // Display video from URL
        <iframe
          width="400"
          height="200"
          src={lesson.videoUrl}
          title={lesson.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      ) : lesson.uploadedVideo ? (
        // Display uploaded video
        <video
          src={`http://localhost:8080/videos/${lesson.uploadedVideo}`}
          alt={lesson.title}
          controls
        />
      ) : (
        // Handle case where neither videoReference nor uploadedVideo is available
        <p>No video available for this lesson.</p>
      )}
    </div>
  );
};

export default VideoPlayer;
