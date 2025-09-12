// store/slices/themeSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    background: string;
    textPrimary: string;
    textSecondary: string;
  };
  courseListLayout: 'Grid' | 'List' | 'Table' | 'Album';
  videoPlayerType: 'Minimal' | 'Advanced' | 'Branded' | 'Cinema';
}

interface ThemeState {
  theme: Theme | null;
  loading: boolean;
  error: string | null;
  platformId: string | null;
  lastFetched: number | null;
  cacheExpiry: number;
  initialized: boolean;
  // Cache themes for multiple platforms
  themeCache: Record<string, { theme: Theme; timestamp: number }>;
}

const initialState: ThemeState = {
  theme: null,
  loading: false,
  error: null,
  platformId: null,
  lastFetched: null,
  cacheExpiry: 60 * 60 * 1000, // 1 hour
  initialized: false,
  themeCache: {},
};

export const fetchTheme = createAsyncThunk(
  'theme/fetchTheme',
  async (platformId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/platforms/${platformId}/theme`,
        {
          // Add any necessary headers or options
          cache: 'no-cache', // Ensure fresh data when we do fetch
        }
      );

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `Failed to fetch platform theme: ${response.status}.\n${errorBody}`
        );
      }

      const theme = (await response.json()) as Theme;
      return { theme, platformId };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error occurred'
      );
    }
  }
);

export const initializeTheme = createAsyncThunk(
  'theme/initializeTheme',
  async (platformId: string, { getState, dispatch }) => {
    const state = getState() as { theme: ThemeState };
    const now = Date.now();

    // Check if we have cached theme for this platform
    const cachedTheme = state.theme.themeCache[platformId];
    const isExpired =
      !cachedTheme || now - cachedTheme.timestamp > state.theme.cacheExpiry;

    if (!cachedTheme || isExpired) {
      // Need to fetch fresh theme
      return dispatch(fetchTheme(platformId));
    } else {
      // Use cached theme
      return { theme: cachedTheme.theme, platformId, fromCache: true };
    }
  }
);

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setPlatformId: (state, action: PayloadAction<string>) => {
      const newPlatformId = action.payload;

      // If platform changed, load cached theme if available
      if (state.platformId !== newPlatformId) {
        state.platformId = newPlatformId;
        const cachedTheme = state.themeCache[newPlatformId];

        if (cachedTheme) {
          const now = Date.now();
          const isExpired = now - cachedTheme.timestamp > state.cacheExpiry;

          if (!isExpired) {
            state.theme = cachedTheme.theme;
            state.lastFetched = cachedTheme.timestamp;
          }
        } else {
          // No cached theme, will need to fetch
          state.theme = null;
          state.lastFetched = null;
        }
      }
    },
    clearTheme: (state) => {
      state.theme = null;
      state.error = null;
      state.lastFetched = null;
      state.initialized = false;
    },
    clearAllThemeCache: (state) => {
      state.themeCache = {};
      state.theme = null;
      state.lastFetched = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setCacheExpiry: (state, action: PayloadAction<number>) => {
      state.cacheExpiry = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTheme.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTheme.fulfilled, (state, action) => {
        const { theme, platformId } = action.payload;
        const now = Date.now();

        state.loading = false;
        state.theme = theme;
        state.error = null;
        state.lastFetched = now;
        state.initialized = true;

        // Cache the theme
        state.themeCache[platformId] = {
          theme,
          timestamp: now,
        };
      })
      .addCase(fetchTheme.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.initialized = true;
      })
      .addCase(initializeTheme.fulfilled, (state, action) => {
        if (action.payload && 'fromCache' in action.payload) {
          // Theme was loaded from cache
          const { theme, platformId } = action.payload;
          state.theme = theme;
          state.platformId = platformId;
        }
        state.initialized = true;
      });
  },
});

export const {
  setPlatformId,
  clearTheme,
  clearAllThemeCache,
  clearError,
  setCacheExpiry,
} = themeSlice.actions;

export default themeSlice.reducer;
