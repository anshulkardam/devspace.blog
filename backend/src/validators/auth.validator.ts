import { z } from 'zod';

export const registerSchema = z.object({
  email: z
    .email('Email is Required')
    .max(50, 'Email must be less than 50 characters'),
  password: z.string('Password is Required').min(4),
  username: z
    .string('Username is Required')
    .max(20, 'Username must be less than 20 characters'),
  role: z.enum(['user', 'admin'], 'Please select a valid role').optional(),
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

export const loginSchema = z
  .object({
    username: z.string().optional(),
    email: z.email().optional(),
    password: z.string().min(4),
  })
  .refine((data) => data.username || data.email, {
    error: 'Either Username or email is required',
    path: ['username', 'email'],
  });
