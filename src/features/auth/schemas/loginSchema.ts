import * as z from 'zod';

export const loginSchema = z.object({
  email: z
    .email({ message: 'Please enter a valid email address' })
    .min(1, { message: 'Email is required' })
    .max(255, { message: 'Email must be less than 255 characters' })
    .trim()
    .toLowerCase(),

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
});
