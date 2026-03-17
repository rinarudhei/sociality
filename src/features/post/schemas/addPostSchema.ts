import z, { file } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const checkFileType = (files: File[]) => {
  return files && ACCEPTED_IMAGE_TYPES.includes(files[0]?.type);
};

export const fileUploadSchema = z.object({
  image: z
    .any()
    .refine(
      (files: File[]) => {
        return (
          files &&
          files.length === 1 &&
          files[0] instanceof File &&
          files[0].size < MAX_FILE_SIZE
        );
      },
      {
        message: 'File is required: (max 5MB)',
      }
    )
    .refine(checkFileType, {
      message: 'Only jpg, png, and webp formats are supported.',
    }),
  caption: z
    .string({ message: 'Please enter photo caption' })
    .min(1, { message: 'Caption is is required' })
    .trim(),
});
