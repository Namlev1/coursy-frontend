'use client';

import { ThumbnailSize, Video } from '@/types/video';
import { UUID } from 'node:crypto';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { getVideoThumbnailUrl } from '@/lib/apiClient';
import { useConfig } from '@/components/ConfigProvider';
import { Menu, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';

interface VideosManagementProps {
  videos: Video[];
  courseId: string;
}

export default function VideosManagement({ videos }: VideosManagementProps) {
  const config = useConfig();
  const params = useParams();

  const handleEditEpisode = (id: UUID) => {
    console.log(`Editing episode ${id}`);
  };

  const EditIcon = () => (
    <svg
      fill="currentColor"
      height="20"
      viewBox="0 0 256 256"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z" />
    </svg>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3
          className="text-xl font-bold"
          style={{ color: config.colors.textPrimary }}
        >
          Episodes
        </h3>
        <Menu as={'div'}>
          <Menu.Button
            className="text-white text-sm font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: config.colors.primary }}
          >
            Add content
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={
                        '/dashboard/courses/' + params.courseId + '/add/video'
                      }
                      className={`${active ? 'bg-gray-100' : ''} flex items-center px-4 py-2 text-sm text-gray-700`}
                    >
                      Video
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={
                        '/dashboard/courses/' + params.courseId + '/add/text'
                      }
                      className={`${active ? 'bg-gray-100' : ''} flex items-center px-4 py-2 text-sm text-gray-700`}
                    >
                      Text content
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={
                        '/dashboard/courses/' + params.courseId + '/add/quiz'
                      }
                      className={`${active ? 'bg-gray-100' : ''} flex items-center px-4 py-2 text-sm text-gray-700`}
                    >
                      Quiz
                    </Link>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      {(videos.length > 0 && (
        <ul className="space-y-3">
          {videos.map((video) => (
            <li
              key={video.id}
              className="flex items-center p-3 border rounded-lg hover:shadow-md transition-all duration-300"
              style={{
                backgroundColor: config.colors.background,
                borderColor: config.colors.secondary,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${config.colors.primary}80`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = config.colors.secondary;
              }}
            >
              <div className="flex-shrink-0 mr-4">
                <Image
                  src={getVideoThumbnailUrl(video.id, ThumbnailSize.SMALL)}
                  alt="Video thumbnail"
                  width={160}
                  height={150}
                  className="size-14 rounded-lg object-cover"
                />
              </div>

              <div className="flex-1 overflow-hidden">
                <p
                  className="font-bold truncate"
                  style={{ color: config.colors.textPrimary }}
                >
                  {video.title}
                </p>
                <p
                  className="text-sm truncate"
                  style={{ color: config.colors.textSecondary }}
                >
                  {video.description}
                </p>
              </div>

              <Link
                href={'/dashboard/courses/' + params.courseId + '/' + video.id}
                onClick={() => handleEditEpisode(video.id)}
                className="ml-4 p-2 rounded-full hover:opacity-80 transition-all"
                style={{
                  color: config.colors.textSecondary,
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = config.colors.primary;
                  e.currentTarget.style.backgroundColor = `${config.colors.primary}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = config.colors.textSecondary;
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                aria-label={`Edit ${video.title}`}
              >
                <EditIcon />
              </Link>
            </li>
          ))}
        </ul>
      )) || (
        <div
          className="text-center py-8"
          style={{ color: config.colors.textSecondary }}
        >
          <p>
            No course content yet. Click &#34;Add content&#34; to get started.
          </p>
        </div>
      )}
    </div>
  );
}
