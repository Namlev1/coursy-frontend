'use client';
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import {
  Maximize,
  Pause,
  Play,
  Settings,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { getMasterPlaylistUrl } from '@/lib/apiClient';
import { Video } from '@/types/video';

interface CoursePlayerProps {
  videos: Video[];
  current: number;
  isPreview?: boolean;

  videoUrl?: string;
  duration?: number;
  watchedTime?: number;
  onComplete?: () => void;
}

const CoursePlayer: React.FC<CoursePlayerProps> = ({
  videos,
  current,
  watchedTime = 0,
  onComplete,
}) => {
  const playerRef = useRef<ReactPlayer>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [showTimestamps, setShowTimestamps] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [seeking, setSeeking] = useState(false);

  const { title, description, id } = videos[current];
  const videoUrl = getMasterPlaylistUrl(id);
  const [videoDuration, setVideoDuration] = useState(0);

  // Resume from last watched position
  useEffect(() => {
    if (watchedTime > 0 && playerRef.current) {
      playerRef.current.seekTo(watchedTime, 'seconds');
    }
  }, [watchedTime]);

  const handlePlay = () => setPlaying(true);
  const handlePause = () => setPlaying(false);

  const handleProgress = (progress: any) => {
    if (!seeking) {
      setPlayed(progress.played);
      setPlayedSeconds(progress.playedSeconds);
    }
  };

  const handleDuration = (duration: number) => {
    setVideoDuration(duration);
  };

  const handleEnded = () => {
    setPlaying(false);
    onComplete?.();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setMuted(newVolume === 0);
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPlayed = parseFloat(e.target.value);
    setPlayed(newPlayed);
    setSeeking(true);
  };

  const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    setSeeking(false);
    const newPlayed = parseFloat((e.target as HTMLInputElement).value);
    playerRef.current?.seekTo(newPlayed);
  };

  const skipForward = () => {
    const newTime = Math.min(playedSeconds + 10, videoDuration);
    playerRef.current?.seekTo(newTime, 'seconds');
  };

  const skipBackward = () => {
    const newTime = Math.max(playedSeconds - 10, 0);
    playerRef.current?.seekTo(newTime, 'seconds');
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
      {/* Video Player */}
      <div className="relative aspect-video bg-black rounded-t-lg overflow-hidden group">
        <ReactPlayer
          ref={playerRef}
          url={videoUrl}
          width="100%"
          height="100%"
          playing={playing}
          volume={volume}
          muted={muted}
          playbackRate={playbackRate}
          controls={false}
          onPlay={handlePlay}
          onPause={handlePause}
          onProgress={handleProgress}
          onDuration={handleDuration}
          onEnded={handleEnded}
          onError={(e) => console.error('Video error:', e)}
          config={{
            file: {
              attributes: {
                preload: 'metadata',
              },
            },
          }}
        />

        {/* Custom Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Progress Bar */}
          <div className="mb-4">
            <input
              type="range"
              min={0}
              max={1}
              step="any"
              value={played}
              onChange={handleSeekChange}
              onMouseUp={handleSeekMouseUp}
              className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={skipBackward}
                className="text-white hover:text-blue-400 transition-colors"
              >
                <SkipBack size={20} />
              </button>

              <button
                onClick={() => setPlaying(!playing)}
                className="text-white hover:text-blue-400 transition-colors"
              >
                {playing ? <Pause size={24} /> : <Play size={24} />}
              </button>

              <button
                onClick={skipForward}
                className="text-white hover:text-blue-400 transition-colors"
              >
                <SkipForward size={20} />
              </button>

              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  {muted || volume === 0 ? (
                    <VolumeX size={20} />
                  ) : (
                    <Volume2 size={20} />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step="any"
                  value={muted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <span className="text-white text-sm">
                {formatTime(playedSeconds)} / {formatTime(videoDuration)}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  <Settings size={20} />
                </button>
                {showSettings && (
                  <div className="absolute bottom-8 right-0 bg-black/90 rounded-lg p-3 min-w-32">
                    <div className="text-white text-sm mb-2">
                      Playback Speed
                    </div>
                    <select
                      value={playbackRate}
                      onChange={(e) =>
                        setPlaybackRate(parseFloat(e.target.value))
                      }
                      className="bg-gray-700 text-white text-sm rounded px-2 py-1 w-full"
                    >
                      <option value={0.5}>0.5x</option>
                      <option value={0.75}>0.75x</option>
                      <option value={1}>1x</option>
                      <option value={1.25}>1.25x</option>
                      <option value={1.5}>1.5x</option>
                      <option value={2}>2x</option>
                    </select>
                  </div>
                )}
              </div>

              <button className="text-white hover:text-blue-400 transition-colors">
                <Maximize size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Info and Progress */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
