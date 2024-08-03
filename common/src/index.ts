import z from "zod"

export const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5),
    firstName: z.string(),
    lastName: z.string()
})

export const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5),
})

export const blogSchema = z.object({
    title: z.string(),
    content: z.string()
})

export const blogupdateSchema = z.object({
    title: z.string(),
    content: z.string()
})

export type SignupInput = z.infer<typeof signupSchema>

export type SigninInput = z.infer<typeof signinSchema>

export type blogInput = z.infer<typeof blogSchema>

export type blogupdateInput = z.infer<typeof blogupdateSchema>