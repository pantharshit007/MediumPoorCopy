import z from "zod";

export const signupInput = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  password: z.string().min(6),
});

export const loginInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
export const createBlog = z.object({
  title: z.string().max(20, "Title must be at most 20 characters long"),
  content: z.string().max(50, "Content must be at most 50 characters long"),
  //   authorId: z.string().regex(uuidPattern, "Wrong Author Id"),
});

export const updateBlog = z.object({
  title: z.string().max(20, "Title must be at most 20 characters long"),
  content: z.string().max(50, "Content must be at most 50 characters long"),
});

// type inference
export type SignupInput = z.infer<typeof signupInput>;
export type LoginInput = z.infer<typeof loginInput>;
export type CreateBlog = z.infer<typeof createBlog>;
export type UpdateBlog = z.infer<typeof updateBlog>;
