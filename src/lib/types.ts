import { z } from "zod";

export const enquiryFormSchema = z.object({
  from: z.string().min(2, { message: "Departure location must be at least 2 characters." }),
  to: z.string().min(2, { message: "Destination must be at least 2 characters." }),
  stops: z.string().optional(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }).optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(500, { message: "Message must not exceed 500 characters." }),
  recaptchaToken: z.string().optional(), // Placeholder for reCAPTCHA token
});

export type EnquiryFormValues = z.infer<typeof enquiryFormSchema>;
