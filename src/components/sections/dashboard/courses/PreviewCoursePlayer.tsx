'use client';

import React, { useEffect, useRef } from 'react';

const CoursePlayer = ({
  title = 'Mastering Digital Marketing',
  description = 'This comprehensive course covers all aspects of digital marketing, from SEO and content marketing to social media and email campaigns. Learn to create effective strategies and measure your success.',
  videoSrc = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  poster = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
}) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    // Load Video.js CSS and JS
    const loadVideoJS = async () => {
      // Load CSS
      if (!document.querySelector('link[href*="video-js.css"]')) {
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = 'https://vjs.zencdn.net/8.6.1/video-js.css';
        document.head.appendChild(cssLink);
      }

      // Load JS
      if (!window.videojs) {
        const script = document.createElement('script');
        script.src = 'https://vjs.zencdn.net/8.6.1/video.min.js';
        script.onload = initializePlayer;
        document.head.appendChild(script);
      } else {
        initializePlayer();
      }
    };

    const initializePlayer = () => {
      if (videoRef.current && window.videojs && !playerRef.current) {
        playerRef.current = window.videojs(videoRef.current, {
          controls: true,
          responsive: true,
          fluid: true,
          playbackRates: [0.5, 1, 1.25, 1.5, 2],
          poster: poster,
          sources: [
            {
              src: videoSrc,
              type: 'video/mp4',
            },
          ],
        });

        // Add custom styling
        playerRef.current.ready(() => {
          playerRef.current.addClass('vjs-theme-custom');
        });
      }
    };

    loadVideoJS();

    // Cleanup
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [videoSrc, poster]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
      <style jsx>{`
        .vjs-theme-custom .vjs-control-bar {
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(10px);
        }

        .vjs-theme-custom .vjs-big-play-button {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border: none;
          border-radius: 50%;
          width: 80px;
          height: 80px;
          font-size: 2.5rem;
          transition: all 0.3s ease;
        }

        .vjs-theme-custom .vjs-big-play-button:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.05);
        }

        .vjs-theme-custom .vjs-play-control .vjs-icon-placeholder:before,
        .vjs-theme-custom .vjs-big-play-button .vjs-icon-placeholder:before {
          color: white;
        }

        .vjs-theme-custom .vjs-progress-control .vjs-progress-holder {
          height: 6px;
        }

        .vjs-theme-custom .vjs-progress-control .vjs-play-progress {
          background: #1383ec;
        }

        .vjs-theme-custom .vjs-volume-control .vjs-volume-level {
          background: #1383ec;
        }

        .video-js {
          border-radius: 0;
        }

        .video-js .vjs-tech {
          border-radius: 0;
        }
      `}</style>

      <div className="relative aspect-video">
        <video
          ref={videoRef}
          className="video-js vjs-default-skin w-full h-full"
          data-setup="{}"
          preload="metadata"
        />
      </div>

      <div className="p-6">
        <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-base">
          {description}
        </p>
      </div>
    </div>
  );
};

export default CoursePlayer;
