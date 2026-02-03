import { z } from 'zod';


export const regUserSchema = z.object({
    name: z.string().min(3).max(20),
    email: z.string(),
    password: z.string().min(8).max(12)
})

export const loginUserSchema = z.object({
    email: z.string(),
    password: z.string().min(8).max(12)
})


export const createRoomSchema = z.object({
    name: z.string().min(3).max(20)
})