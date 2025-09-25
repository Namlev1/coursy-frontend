'use client';
import { useState } from 'react';
import { PlatformConfig } from '@/types/platformConfig';

interface AddVideoFormProps {
  config: PlatformConfig;
  onTitleChange?: (title: string) => void;
  onDescriptionChange?: (description: string) => void;
  onFileChange?: (file: File | null) => void;
  onSubmit?: (data: {
    title: string;
    description: string;
    file: File | null;
  }) => void;
}

export default function AddVideoForm({
  config,
  onTitleChange,
  onDescriptionChange,
  onFileChange,
  onSubmit,
}: AddVideoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    onTitleChange?.(newTitle);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newDescription = e.target.value;
    setDescription(newDescription);
    onDescriptionChange?.(newDescription);
  };

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
    onFileChange?.(selectedFile);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    handleFileChange(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files?.[0] || null;
    if (droppedFile && droppedFile.type.startsWith('video/')) {
      handleFileChange(droppedFile);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ title, description, file });
  };

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
            Add a New Video
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                className="form-input w-full border rounded-lg px-4 py-3 transition-all focus:ring-2 focus:outline-none"
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
                className="form-textarea w-full border rounded-lg px-4 py-3 transition-all focus:ring-2 focus:outline-none resize-vertical"
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

            {/* File Upload Field */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: config.colors.textPrimary }}
              >
                Video File
              </label>
              <div
                className={`flex justify-center px-6 py-8 border-2 border-dashed rounded-lg transition-all cursor-pointer ${
                  dragOver ? 'border-opacity-80' : 'border-opacity-40'
                }`}
                style={{
                  backgroundColor: config.colors.background,
                  borderColor: dragOver
                    ? config.colors.primary
                    : config.colors.secondary,
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() =>
                  document.getElementById('video-file-upload')?.click()
                }
              >
                <div className="space-y-2 text-center">
                  <div className="text-4xl mb-2">☁️</div>
                  {file ? (
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: config.colors.textPrimary }}
                      >
                        {file.name}
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: config.colors.textSecondary }}
                      >
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flex text-sm justify-center">
                        <label
                          className="relative cursor-pointer rounded-md font-medium hover:opacity-80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2"
                          style={
                            {
                              color: config.colors.primary,
                              '--tw-ring-color': config.colors.primary,
                            } as React.CSSProperties
                          }
                          htmlFor="video-file-upload"
                        >
                          <span>Upload a file</span>
                          <input
                            className="sr-only"
                            id="video-file-upload"
                            name="video-file-upload"
                            type="file"
                            accept="video/*"
                            onChange={handleFileInputChange}
                          />
                        </label>
                        <p
                          className="pl-1"
                          style={{ color: config.colors.textSecondary }}
                        >
                          or drag and drop
                        </p>
                      </div>
                      <p
                        className="text-xs"
                        style={{ color: config.colors.textSecondary }}
                      >
                        MP4, AVI, MOV up to 500MB
                      </p>
                    </>
                  )}
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
                type="submit"
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.9';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
              >
                Add Video
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
