'use client';
import { useState } from 'react';
import { PlatformConfig } from '@/types/platformConfig';

interface VideoMetadata {
  filename: string;
  filesize: string;
  duration: string;
}

interface VideoData {
  id: string;
  title: string;
  description: string;
  metadata: VideoMetadata;
  thumbnails: string[];
  selectedThumbnailIndex: number;
}

interface VideoManagementProps {
  config: PlatformConfig;
  videoId: string;
}

// Mock data - replace with actual API call
const mockVideoData: VideoData = {
  id: '1',
  title: 'Introduction to Course Platform',
  description:
    'Learn how to customize and manage your new course platform. This video covers the basics of theming, user management, and content creation.',
  metadata: {
    filename: 'intro_video.mp4',
    filesize: '128MB',
    duration: '12:34',
  },
  thumbnails: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAmFDj0VANLZqhn3H-p8Hv1xYpg_J-4asasS7jexX1CvreTF4MxR0cqJAiyxDjHPma3wLpAPpAAXtT55VfQUtrhXWiKSV3yS2A_fejcGGkZtqN0ZlXC-tiQosEX_NCWl_TkFlaHwSztqK0Gi6wgkmNfDOchgO35pDn3hVayyeiBmF2TjR8hhEBpXsuG5svr8xedWrAdnD9qMkBBNqDmWQQQtmgQt1IkjJzch4MeZMvqaxDL8zFkNmFcy0v8LP0TTsguyX5H6LGfmIE',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB375VRWYfnpMGtxKAcfljekcf0O8PWmRB5gtG8wBzccnZOyHqaOWdXQrsOuDz7ZzVGDz7zobVBJRvnakoF1ZAcH-6W9XUS87PUoi-qf0cyZ7yZN4eqAXR3XSgpICDjkaRMo8olRSsgaQSRgOzh956KXIbFH1Vx4aopgjo76pG2T4EEEcvF6apQwEyqF6vl-TTG82Rfv737aAbU-5jjxa17ScwD5LGqmjJ2UuWf0VIm_QATzRwl0U8IVw4bveuTp7gX0cRwQywuAU0',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCLVzyjcrbTFnDjo9Sw5T03652dmULDfBKAM0Q2CUaFvRr0ONheQZlTS8tfYVCysstKdCQUZyzAoOyjqg_yBkKt383T_eeS85X3yk8gIrSiscEyccOcIfVDjSqxBezxcsAww_LkPvsiw3jYXIl06MSDu9aDeAMPlITHrSZk_AYnaZ6pic_Fda3e9ZWV1b1UmfzTcokav29oVxwLz_2D_nlkFKzpQlZNoCzU6iRxTbN5LOfNUh0oGfzYGxxnIrlou2-rdYoFee2-nF8',
  ],
  selectedThumbnailIndex: 0,
};

export default function VideoManagement({
  config,
  videoId,
}: VideoManagementProps) {
  const [videoData, setVideoData] = useState<VideoData>(mockVideoData);
  const [title, setTitle] = useState(videoData.title);
  const [description, setDescription] = useState(videoData.description);
  const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState(
    videoData.selectedThumbnailIndex
  );

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleThumbnailSelect = (index: number) => {
    setSelectedThumbnailIndex(index);
  };

  const handleSubmit = async () => {
    // Mock API call - replace with actual implementation
    console.log('Saving video changes:', {
      videoId,
      title,
      description,
      selectedThumbnailIndex,
    });

    // Update local state
    setVideoData((prev) => ({
      ...prev,
      title,
      description,
      selectedThumbnailIndex,
    }));
  };

  const CheckCircleIcon = () => (
    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  );

  const AddPhotoIcon = () => (
    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
      <path d="M12 7c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1m0-2c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
    </svg>
  );

  return (
    <div className="flex items-center justify-center min-h-full w-full">
      <div className="w-full max-w-2xl px-4 py-8">
        <div
          className="rounded-lg shadow-lg p-8"
          style={{ backgroundColor: config.colors.background }}
        >
          <h1
            className="text-3xl font-bold text-center mb-8"
            style={{ color: config.colors.textPrimary }}
          >
            Video Management
          </h1>

          <div className="space-y-8">
            {/* Title Field */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="video-title"
                style={{ color: config.colors.textPrimary }}
              >
                Title
              </label>
              <input
                className="w-full border rounded-lg px-4 py-3 transition-all focus:ring-2 focus:outline-none"
                style={
                  {
                    backgroundColor: config.colors.background,
                    borderColor: config.colors.secondary,
                    color: config.colors.textPrimary,
                    '--tw-ring-color': config.colors.primary,
                  } as React.CSSProperties
                }
                id="video-title"
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="e.g., Introduction to Theming"
                onFocus={(e) => {
                  e.target.style.borderColor = config.colors.primary;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = config.colors.secondary;
                }}
              />
            </div>

            {/* Description Field */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="video-description"
                style={{ color: config.colors.textPrimary }}
              >
                Description
              </label>
              <textarea
                className="w-full border rounded-lg px-4 py-3 transition-all focus:ring-2 focus:outline-none resize-vertical"
                style={
                  {
                    backgroundColor: config.colors.background,
                    borderColor: config.colors.secondary,
                    color: config.colors.textPrimary,
                    '--tw-ring-color': config.colors.primary,
                  } as React.CSSProperties
                }
                id="video-description"
                rows={4}
                value={description}
                onChange={handleDescriptionChange}
                placeholder="A brief summary of the video content."
                onFocus={(e) => {
                  e.target.style.borderColor = config.colors.primary;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = config.colors.secondary;
                }}
              />
            </div>

            {/* Video Metadata */}
            <div>
              <h2
                className="text-lg font-medium mb-2"
                style={{ color: config.colors.textPrimary }}
              >
                Video Metadata
              </h2>
              <div
                className="rounded-lg p-4 space-y-2"
                style={{ backgroundColor: config.colors.secondary + '20' }}
              >
                <div className="flex justify-between text-sm">
                  <span
                    className="font-medium"
                    style={{ color: config.colors.textSecondary }}
                  >
                    Filename:
                  </span>
                  <span style={{ color: config.colors.textPrimary }}>
                    {videoData.metadata.filename}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span
                    className="font-medium"
                    style={{ color: config.colors.textSecondary }}
                  >
                    Filesize:
                  </span>
                  <span style={{ color: config.colors.textPrimary }}>
                    {videoData.metadata.filesize}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span
                    className="font-medium"
                    style={{ color: config.colors.textSecondary }}
                  >
                    Duration:
                  </span>
                  <span style={{ color: config.colors.textPrimary }}>
                    {videoData.metadata.duration}
                  </span>
                </div>
              </div>
            </div>

            {/* Thumbnail Selection */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: config.colors.textPrimary }}
              >
                Thumbnail
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {videoData.thumbnails.map((thumbnail, index) => (
                  <div
                    key={index}
                    className="relative group cursor-pointer border-2 rounded-lg transition-all"
                    style={{
                      borderColor:
                        selectedThumbnailIndex === index
                          ? config.colors.primary
                          : 'transparent',
                    }}
                    onClick={() => handleThumbnailSelect(index)}
                  >
                    <img
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-24 object-cover rounded-md"
                      src={thumbnail}
                    />
                    <div
                      className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity ${
                        selectedThumbnailIndex === index
                          ? 'opacity-100'
                          : 'opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      <CheckCircleIcon />
                    </div>
                  </div>
                ))}

                {/* Upload New Thumbnail Placeholder */}
                <div
                  className="relative flex justify-center items-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg opacity-50 cursor-not-allowed"
                  style={{
                    backgroundColor: config.colors.secondary + '20',
                    borderColor: config.colors.secondary,
                  }}
                >
                  <div className="space-y-1 text-center">
                    <div style={{ color: config.colors.textSecondary }}>
                      <AddPhotoIcon />
                    </div>
                    <div className="flex text-xs">
                      <span
                        className="cursor-not-allowed bg-transparent rounded-md font-medium"
                        style={{ color: config.colors.primary }}
                      >
                        Upload
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={
                  {
                    backgroundColor: config.colors.primary,
                    color: '#ffffff',
                    '--tw-ring-color': config.colors.primary,
                  } as React.CSSProperties
                }
                onClick={handleSubmit}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.9';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
