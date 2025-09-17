'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks/redux';
import { login } from '@/store/slices/authSlice';
import Cookies from 'js-cookie';
import { UserResponse } from '@/types/user';
import { Role } from '@/types/enums';

export default function StoreHydration() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const hydrateStore = async () => {
      const encodedUserData = Cookies.get('userData');

      if (!encodedUserData) {
        return; // User not logged in
      }

      const decodedUserData = atob(encodedUserData);
      const userData: UserResponse = JSON.parse(decodedUserData);

      // Update Redux state
      dispatch(
        login({
          user: {
            id: userData.id,
            platformId: userData.platformId,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
          },
          role: userData.roleName as Role,
        })
      );
    };

    hydrateStore();
  }, [dispatch]);

  return null;
}
