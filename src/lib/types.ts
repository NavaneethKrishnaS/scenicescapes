
import { z } from "zod";

export const enquiryFormSchema = z.object({
  name: z.string().min(2, { message: "Full Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }).optional().or(z.literal("")),
  pickupLocation: z.string().min(2, { message: "Pickup location must be at least 2 characters." }),
  finalDestination: z.string().min(2, { message: "Final Destination must be at least 2 characters." }),
  pickupDate: z.date().optional(),
  returnDate: z.date().optional(),
  adults: z.coerce.number({invalid_type_error: "Number of adults is required."}).int().min(1, { message: "At least one adult is required." }),
  children: z.coerce.number({invalid_type_error: "Invalid number."}).int().min(0, { message: "Number of children cannot be negative." }).optional(),
  numberOfRooms: z.coerce.number({invalid_type_error: "Invalid number of rooms."}).int().min(1, {message: "At least one room is required if specified."}).optional(),
  stops: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(500, { message: "Message must not exceed 500 characters." }),
  recaptchaToken: z.string().optional(), // Placeholder for reCAPTCHA token
}).refine(data => {
  if (data.pickupDate && data.returnDate) {
    return data.returnDate >= data.pickupDate;
  }
  return true;
}, {
  message: "Return date must be on or after the pickup date.",
  path: ["returnDate"], // Point the error to the returnDate field
});

export type EnquiryFormValues = z.infer<typeof enquiryFormSchema>;

