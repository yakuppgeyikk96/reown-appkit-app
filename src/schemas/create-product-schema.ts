import { z } from "zod";

const createProductSchema = z.object({
  type: z.enum(["software", "design"], {
    required_error: "Product type is required",
  }),
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().positive("Price must be greater than 0"),
  mainImages: z.array(z.instanceof(File)).min(1, "Main image is required"),
  productFiles: z.array(z.instanceof(File)).min(1, "Product files is required"),
});

export default createProductSchema;
