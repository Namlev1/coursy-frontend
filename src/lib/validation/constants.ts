export const VALIDATION_LIMITS = {
  COURSE: {
    NAME: {
      MIN_LENGTH: 5,
      MAX_LENGTH: 50,
    },
    DESCRIPTION: {
      MIN_LENGTH: 1,
      MAX_LENGTH: 4000,
    },
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 72,
  },
  FIRST_NAME: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 50,
  },
  LAST_NAME: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 50,
  },
  EMAIL: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 60,
  },
  PLATFORM: {
    NAME: {
      MIN_LENGTH: 2,
      MAX_LENGTH: 50,
    },
    DESCRIPTION: {
      MIN_LENGTH: 1,
      MAX_LENGTH: 4000,
    },
    SUBDOMAIN: {
      MIN_LENGTH: 1,
      MAX_LENGTH: 63,
    },
    HERO_TITLE: {
      MIN_LENGTH: 1,
      MAX_LENGTH: 63,
    },
    HERO_SUBTITLE: {
      MIN_LENGTH: 1,
      MAX_LENGTH: 4000,
    },
    CTA_TEXT: {
      MIN_LENGTH: 1,
      MAX_LENGTH: 63,
    },
  },
} as const;

export const PASSWORD_REGEXES = {
  UPPERCASE: /[A-Z]/,
  LOWERCASE: /[a-z]/,
  DIGIT: /[0-9]/,
  SPECIAL_CHAR: /[^A-Za-z0-9]/,
  REPEATING_CHARS: /(.)\\1{2,}/,
} as const;

export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
