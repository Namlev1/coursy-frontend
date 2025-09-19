import { headers } from 'next/headers';

export async function getPlatformId() {
  const headersList = await headers();
  const platformId = headersList.get('x-platform-id');

  if (!platformId) {
    throw new Error('Platform ID not found in headers');
  }

  return platformId;
}
