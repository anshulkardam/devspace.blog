import z from 'zod';

export const updateUserSchema = z.object({
  email: z.email().max(50, 'Email must be less than 50 characters').optional(),
  username: z
    .string()
    .max(20, 'Username must be less than 20 characters')
    .optional(),
  firstName: z
    .string()
    .max(20, 'First Name must be less than 20 characters')
    .optional(),
  lastName: z
    .string()
    .max(20, 'Last Name must be less than 20 characters')
    .optional(),
  socialLinks: z
    .object({
      website: z
        .string()
        .max(100, 'Website must be less than 100 characters')
        .optional(),
      facebook: z
        .string()
        .max(100, 'Facebook must be less than 100 characters')
        .optional(),
      instagram: z
        .string()
        .max(100, 'Instagram must be less than 100 characters')
        .optional(),
      x: z.string().max(100, 'X must be less than 100 characters').optional(),
      youtube: z
        .string()
        .max(100, 'Youtube must be less than 100 characters')
        .optional(),
      linkedin: z
        .string()
        .max(100, 'LinkedIn must be less than 100 characters')
        .optional(),
    })
    .optional(),
});
