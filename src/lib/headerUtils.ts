import { headers } from 'next/headers';
import { UUID } from 'node:crypto';

export const PLATFORM_ID_HEADER = 'X-Platform-Id';

export async function getPlatformId() {
  const headersList = await headers();
  const platformId = headersList.get(PLATFORM_ID_HEADER);

  if (!platformId) {
    throw new Error('Platform ID not found in headers');
  }

  return platformId as UUID;
}
