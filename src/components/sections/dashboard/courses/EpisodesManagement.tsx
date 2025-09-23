'use client';

import { useState } from 'react';
import { PlatformConfig } from '@/types/platformConfig';

interface Episode {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
}

interface EpisodesManagementProps {
  config: PlatformConfig;
  initialEpisodes?: Episode[];
  onEpisodeAdd?: (episode: Episode) => void;
  onEpisodeEdit?: (id: number, episode: Episode) => void;
  onEpisodeDelete?: (id: number) => void;
}

const defaultEpisodes: Episode[] = [
  {
    id: 1,
    title: '1. Introduction to Data Science',
    description: 'An overview of the data science field and its importance.',
    thumbnail:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBs7kQ46EFANaOOE_iuEHF0wWeR1mrOHv_qkwZP1zg8k9zSSY9K3CwvO0jrhJ7nrtvE07wCqqWat0tJdEWAbL-cxXrOpiqox3N_Qf4LY9_pm1y5vz3dZcizD2OJ27ghpv0Z1xWx2xG37JtjjScPdDsMCY_7JrMCgO_B4fFNxRoTpOzQHiQq_4qwlBNWTi6Tg7XKPefGlDHpNwpkjvhrQc0T9JbsRE6ajdPRkVrCgvX94r46w_SuwITpapVw82YAZ_Hq2mdSc_VRtv4',
  },
  {
    id: 2,
    title: '2. Machine Learning Fundamentals',
    description: 'Core concepts of machine learning algorithms.',
    thumbnail:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDx3cNcST8s0y9jUeNaADYZYtEI3njzDU5CfU33W600tTk-u-7zcq26qAemvrJbt9NmQE3PELcytvTo9mmwvKUIvjT0dOXy1Ibxtk2b-O8V9qTukd3PDEyWrQJAIGPoQTti9NqyhVZ8p1X_AU169dTa5WDbpFeRTMG2XbBF5qsM11ZebaNilSGBekYfJ26c9AjijfzhPXv07NY-99ZCaryNxToGUCE-km-dE168AP72EbdhmCDHmSpzO6BWSdOMjKFD-ae8GdQjhEQ',
  },
  {
    id: 3,
    title: '3. Statistical Modeling Techniques',
    description:
      'Learn about various statistical models and their applications.',
    thumbnail:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDoqHfGJNlQ_2rFNaga3h3MLZZEhQYBN4cebvsIP4VNtWIJoE9rauTGeax5uc3J0FswjIxTs9feWi4jURE-X_ksOnrsNcxNJgEZw4dqQLMdNTRDHzGHIwvpjmYFi2xne1tk7tkAU1toWtLtm0KYaY64U-t288aY0kual2QWyspazT8WOdNeg9mMFCPKpBh3YkYYdzucc0g5plHfgOlwK0bugJxszbWByXbywZqwPEO_5_KnAfSLTQa9Q1x8w2K3BhLOV0Qdlt7H8xc',
  },
  {
    id: 4,
    title: '4. Data Visualization Best Practices',
    description: 'How to create effective and compelling data visualizations.',
    thumbnail:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAfkypf1JB_0iTwmZXDm4Ah18NTtDm1vlwiu5J6_rsbqFU4MpDNZ5OSP6BbSeac9ghGxZXfQET93IM_ywSUCC083CP0Yxpeo8vy9jLU5_rIXjGGcxjjqebqtkj3OmzHQdFJTJ-aML01ZvY1qHcBl0vQyAn7gzvKXH7kao50npjdS7jmdTinapNf75bkPUks6xJwBI7kGPJVpKqoh_446P61gxr5JWKmKWlICdDO3kZcUEuRBd52xGPxQKZb0QPDqenKeEnqQQzW6es',
  },
];

export default function EpisodesManagement({
  config,
  initialEpisodes = defaultEpisodes,
  onEpisodeAdd,
  onEpisodeEdit,
  onEpisodeDelete,
}: EpisodesManagementProps) {
  const [episodes, setEpisodes] = useState<Episode[]>(initialEpisodes);

  const handleAddEpisode = () => {
    const newEpisode: Episode = {
      id: Math.max(...episodes.map((e) => e.id)) + 1,
      title: `${episodes.length + 1}. New Episode`,
      description: 'Enter episode description here.',
      thumbnail: 'https://via.placeholder.com/56x56?text=New',
    };

    setEpisodes((prev) => [...prev, newEpisode]);
    onEpisodeAdd?.(newEpisode);
  };

  const handleEditEpisode = (id: number) => {
    // In a real app, this would open a modal or navigate to edit page
    console.log(`Editing episode ${id}`);
    onEpisodeEdit?.(id, episodes.find((e) => e.id === id)!);
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
        <button
          onClick={handleAddEpisode}
          className="text-white text-sm font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
          style={{ backgroundColor: config.colors.primary }}
        >
          Add Episode
        </button>
      </div>

      <ul className="space-y-3">
        {episodes.map((episode) => (
          <li
            key={episode.id}
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
              <img
                alt="Episode thumbnail"
                className="size-14 rounded-lg object-cover"
                src={episode.thumbnail}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/56x56?text=Episode';
                }}
              />
            </div>

            <div className="flex-1 overflow-hidden">
              <p
                className="font-bold truncate"
                style={{ color: config.colors.textPrimary }}
              >
                {episode.title}
              </p>
              <p
                className="text-sm truncate"
                style={{ color: config.colors.textSecondary }}
              >
                {episode.description}
              </p>
            </div>

            <button
              onClick={() => handleEditEpisode(episode.id)}
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
              aria-label={`Edit ${episode.title}`}
            >
              <EditIcon />
            </button>
          </li>
        ))}
      </ul>

      {episodes.length === 0 && (
        <div
          className="text-center py-8"
          style={{ color: config.colors.textSecondary }}
        >
          <p>No episodes yet. Click "Add Episode" to get started.</p>
        </div>
      )}
    </div>
  );
}
