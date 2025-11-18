import { ThumbnailSize, ThumbnailType } from '@/types/video';
import { UUID } from 'node:crypto';

export const API_BASE_URL =
  typeof window !== 'undefined' ? '' : 'http://localhost:8080';

export const getVideoThumbnailUrl = (
  videoId: string,
  size: ThumbnailSize = ThumbnailSize.SMALL,
  type?: ThumbnailType
): string => {
  const baseUrl = `${API_BASE_URL}/api/content/videos/${videoId}/thumbnail`;
  const params = new URLSearchParams();

  params.set('size', size.toString());

  if (type !== undefined) {
    params.set('type', type.toString());
  }

  return `${baseUrl}?${params.toString()}`;
};

export const getHero = (platformId: UUID): string => {
  return `${API_BASE_URL}/api/platforms/${platformId}/config/image/hero`;
};

export const getLogo = (platformId: UUID): string => {
  return `${API_BASE_URL}/api/platforms/${platformId}/config/image/logo`;
};

export const getMasterPlaylistUrl = (videoId: string) => {
  return `${API_BASE_URL}/api/content/videos/${videoId}/master.m3u8`;
};

export const getCourseImageUrl = (courseId: UUID): string => {
  return `${API_BASE_URL}/api/courses/${courseId}/image`;
};
