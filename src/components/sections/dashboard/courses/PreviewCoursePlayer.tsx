'use client';
import React, { useState } from 'react';

import ReactPlayer from 'react-player';

interface CoursePlayerProps {
  title?: string;
  description?: string;
  videoUrl?: string;
}

const CoursePlayer: React.FC<CoursePlayerProps> = ({
  title = 'Mastering Digital Marketing',
  description = 'This comprehensive course covers all aspects of digital marketing, from SEO and content marketing to social media and email campaigns. Learn to create effective strategies and measure your success.',
  videoUrl = '/videos/file_example.mp4', // Changed this line
}) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);

  const handlePlay = () => setPlaying(true);
  const handlePause = () => setPlaying(false);
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
      <div className="relative aspect-video bg-black rounded-t-lg overflow-hidden">
        <ReactPlayer
          url={videoUrl} // Use the prop instead of hardcoded path
          width="100%"
          height="100%"
          playing={playing}
          volume={volume}
          muted={muted}
          controls={true}
          onPlay={handlePlay}
          onPause={handlePause}
          onError={(e) => console.error('Video error:', e)}
        />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default CoursePlayer;