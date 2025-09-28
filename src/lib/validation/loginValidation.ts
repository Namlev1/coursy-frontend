import {
  createEmailValidator,
  createLengthValidator,
} from '@/lib/validation/validators';
import { VALIDATION_LIMITS } from '@/lib/validation/constants';

export const validateEmail = createEmailValidator();

export const validatePassword = createLengthValidator(
  'Password',
  VALIDATION_LIMITS.PASSWORD.MIN_LENGTH,
  VALIDATION_LIMITS.PASSWORD.MAX_LENGTH
);
