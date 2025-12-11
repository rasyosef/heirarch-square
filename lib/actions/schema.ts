import z from "zod";

export const UserSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(6, "Password must have at least 6 characters")
})


const MAX_FILE_SIZE = 5 * 1024 * 1024; // Define the maximum file size (e.g., 5MB)
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]; // Define accepted image MIME types

export const ProductAddSchema = z.object({
  name: z.string().min(8,
    "Product name must be at least 8 characters."
  ).max(128,
    "Product name must be less than 128 characters."
  ),
  description: z.string().max(512,
    "Product description must be less than 512 characters."
  ),
  image: z.file("An image file is required").refine(
    (file) => file.size <= MAX_FILE_SIZE,
    "File size must be less than 5MB."
  ).refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    "Only .jpg, .jpeg, .png and .webp formats are accepted."
  ),
  price: z.coerce.number().int().min(1, "Price must be at least $1.")
})


export const ProductEditSchema = z.object({
  name: z.string().min(8,
    "Product name must be at least 8 characters."
  ).max(128,
    "Product name must be less than 128 characters."
  ),
  description: z.string().max(512,
    "Product description must be less than 512 characters."
  ),
  price: z.coerce.number().int().min(1, "Price must be at least $1.")
})