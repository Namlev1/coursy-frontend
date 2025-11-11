import { cookies } from 'next/headers';
import { UUID } from 'crypto';

export async function getPlatformId() {
  const cookieStore = await cookies();
  const platformId = cookieStore.get('platformId')?.value;

  if (!platformId) {
    throw new Error('Platform ID not found in cookies');
  }

  return platformId as UUID;
}
