'use client';

import { PlatformFormData } from '@/components/sections/dashboard/platform/CreatePlatformWidget';
import {
  Maximize,
  Play,
  Settings,
  SkipBack,
  SkipForward,
  VolumeX,
} from 'lucide-react';
import React from 'react';
import dynamic from 'next/dynamic';

interface MockVideoPlayerProps {
  formData: PlatformFormData;
}

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <div className="text-white">Loading player...</div>
    </div>
  ),
});

export default function MockVideoPlayer({ formData }: MockVideoPlayerProps) {
  return (
    <div className="lg:col-span-2">
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
        {/* Video Player */}
        <div className="relative aspect-video bg-black rounded-t-lg overflow-hidden group">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            width="100%"
            height="100%"
            controls={false}
            config={{
              file: {
                attributes: {
                  preload: 'metadata',
                },
              },
            }}
            light="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop"
          />

          {/* Invisible overlay to block clicks */}
          <div
            className="absolute inset-0 z-10 cursor-default"
            onClick={(e) => e.preventDefault()}
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
                className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: '#4b5563', // gray-600
                  accentColor: formData.colors.primary,
                }}
              />
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={(e) => e.preventDefault()}
                  className="text-white transition-colors"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = formData.colors.primary)
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'white')}
                >
                  <SkipBack size={20} />
                </button>

                <button
                  onClick={(e) => e.preventDefault()}
                  className={`text-white transition-colors hover:[color:${formData.colors.primary}]`}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = formData.colors.primary)
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'white')}
                >
                  <Play size={24} />
                </button>

                <button
                  onClick={(e) => e.preventDefault()}
                  className="text-white transition-colors"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = formData.colors.primary)
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'white')}
                >
                  <SkipForward size={20} />
                </button>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="text-white transition-colors"
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = formData.colors.primary)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = 'white')
                    }
                  >
                    <VolumeX size={20} />
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step="any"
                    onChange={(e) => e.preventDefault()}
                    className="w-16 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: '#4b5563', // gray-600
                      accentColor: formData.colors.primary,
                    }}
                  />
                </div>

                <span className="text-white text-sm">0:00 / 10:00</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="relative">
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="text-white transition-colors"
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = formData.colors.primary)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = 'white')
                    }
                  >
                    <Settings size={20} />
                  </button>
                </div>

                <button
                  className="text-white transition-colors"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = formData.colors.primary)
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'white')}
                  onClick={(e) => e.preventDefault()}
                >
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
                Introduction to HTML
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                Learn the fundamentals of HTML, CSS, and JavaScript to build
                modern websites.
              </p>
            </div>
          </div>
          <button
            className="flex min-w-[84px] items-center justify-center rounded-md h-10 px-4 text-white text-sm font-bold shadow-sm transition-all hover:opacity-90"
            style={{ backgroundColor: formData.colors.primary }}
            onClick={(e) => e.preventDefault()}
          >
            Add course to your learning
          </button>
        </div>
      </div>
    </div>
  );
}
