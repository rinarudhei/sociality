import * as z from 'zod';

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(1, { message: 'Name is required' })
      .max(255, { message: 'Name must be less than 255 characters' })
      .trim(),
    name: z
      .email({ message: 'Please enter a valid email address' })
      .min(1, { message: 'Email is required' })
      .max(255, { message: 'Email must be less than 255 characters' })
      .trim()
      .toLowerCase(),
    phone: z
      .string()
      .min(1, 'Phone number is required')
      .regex(/^\+[1-9]\d{1,14}$/, {
        message: 'Phone number must be in E.164 format (e.g., +1234567890)',
      }),
    password: z
      .string()
      .min(1, { message: 'Password is required' })
      .min(8, { message: 'Password must be at least 8 characters' })
      .max(100, { message: 'Password must be less than 100 characters' })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
      })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter',
      })
      .regex(/[0-9]/, {
        message: 'Password must contain at least one number',
      })
      .regex(/[^A-Za-z0-9]/, {
        message: 'Password must contain at least one special character',
      }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Please confirm your password' }),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: 'Password do not match',
    path: ['confirmPassword'],
  });
