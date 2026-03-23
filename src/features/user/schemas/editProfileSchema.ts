import z, { email } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const checkFileType = (file: File) => {
  return file && ACCEPTED_IMAGE_TYPES.includes(file.type);
};

export const editProfileSchema = z.object({
  avatarUrl: z.string().optional(),
  avatar: z
    .any()
    .optional()
    .refine(
      (file: File | undefined) => {
        if (!file) return true;

        return file instanceof File && file.size < MAX_FILE_SIZE;
      },
      {
        message: 'File is required: (max 5MB)',
      }
    ),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\+[1-9]\d{1,14}$/, {
      message: 'Phone number must be in E.164 format (e.g., +1234567890)',
    }),
  name: z
    .string({ message: 'Please enter name' })
    .min(1, { message: 'Name is is required' })
    .max(100, { message: 'Name must be less than 100 characters' })
    .trim(),

  username: z
    .string({ message: 'Please enter username' })
    .min(1, { message: 'Username is is required' })
    .max(20, { message: 'Username must be less than 20 characters' })
    .trim(),

  email: z
    .email({ message: 'Please enter a valid email address' })
    .min(1, { message: 'Email is required' })
    .max(255, { message: 'Email must be less than 255 characters' })
    .trim()
    .toLowerCase(),

  bio: z
    .string({ message: 'Please enter bio' })
    .min(1, { message: 'Bio is is required' })
    .max(255, { message: 'Bio must be less than 255 characters' })
    .trim(),
});
