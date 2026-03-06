import dayjs from 'dayjs';
import * as z from 'zod';

export const checkoutSchema = z.object({
  borrowDate: z.date(),
  borrowDuration: z.string(),
  returnAgreement: z.boolean().refine((val) => val === true, {
    message: 'You must accept the return agreement before continue.',
  }),
  acceptPolicy: z.boolean().refine((val) => val === true, {
    message: 'You must accept the library policy before continue.',
  }),
});
