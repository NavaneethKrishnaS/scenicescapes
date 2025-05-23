
"use server";

import { z } from "zod";
import type { EnquiryFormValues } from "@/lib/types";
import { enquiryFormSchema } from "@/lib/types";
import { format } from "date-fns";

// In a real application, these would be in .env
const EMPLOYEE_EMAIL = process.env.EMPLOYEE_EMAIL_ADDRESS || "employee@example.com";
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

async function verifyRecaptcha(token: string | undefined): Promise<boolean> {
  if (!RECAPTCHA_SECRET_KEY || !token) {
    console.warn("reCAPTCHA secret key or token is missing. Skipping verification for development.");
    // For development without reCAPTCHA setup, allow submission.
    // In production, this should be `return false;` or throw an error if token is required.
    return true; 
  }

  // This is a conceptual fetch. The actual API endpoint and parameters might differ.
  // const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  //   body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
  // });
  // const data = await response.json();
  // return data.success;
  console.log("Mock reCAPTCHA verification for token:", token);
  return true; // Mock success
}

async function sendEmail(to: string, subject: string, htmlContent: string): Promise<boolean> {
  // Placeholder for email sending logic (e.g., using Resend or Nodemailer)
  console.log(`Email supposedly sent to: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`HTML Content: ${htmlContent}`);
  // Simulate email sending success
  return true;
}

export async function submitEnquiry(data: EnquiryFormValues): Promise<{ success: boolean; error?: string | Zod.ZodError<EnquiryFormValues>; }> {
  const validationResult = enquiryFormSchema.safeParse(data);
  if (!validationResult.success) {
    console.error("Form validation failed:", validationResult.error.flatten().fieldErrors);
    return { success: false, error: validationResult.error };
  }

  const { recaptchaToken, ...formData } = validationResult.data;

  const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
  if (!isRecaptchaValid) {
    return { success: false, error: "reCAPTCHA verification failed. Please try again." };
  }

  const emailSubject = `New Travel Enquiry from ${formData.name}`;
  const emailBody = `
    <h1>New Travel Enquiry</h1>
    <p><strong>Name:</strong> ${formData.name}</p>
    <p><strong>Email:</strong> ${formData.email}</p>
    <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
    <hr />
    <p><strong>Pickup Location:</strong> ${formData.pickupLocation}</p>
    <p><strong>Final Destination:</strong> ${formData.finalDestination}</p>
    <p><strong>Pickup Date:</strong> ${formData.pickupDate ? format(formData.pickupDate, "PPP") : 'Not specified'}</p>
    <p><strong>Return Date:</strong> ${formData.returnDate ? format(formData.returnDate, "PPP") : 'Not specified'}</p>
    <hr />
    <p><strong>Number of Adults:</strong> ${formData.adults}</p>
    <p><strong>Number of Children:</strong> ${formData.children !== undefined && formData.children !== null ? formData.children : '0'}</p>
    <p><strong>Preferred Number of Rooms:</strong> ${formData.numberOfRooms !== undefined && formData.numberOfRooms !== null ? formData.numberOfRooms : 'Not specified'}</p>
    <p><strong>Optional Stops:</strong> ${formData.stops || 'None'}</p>
    <hr />
    <p><strong>Message:</strong></p>
    <p>${formData.message.replace(/\n/g, '<br>')}</p>
  `;

  try {
    const emailSent = await sendEmail(EMPLOYEE_EMAIL, emailSubject, emailBody);
    if (emailSent) {
      return { success: true };
    } else {
      return { success: false, error: "Failed to send enquiry email. Please try again later." };
    }
  } catch (error) {
    console.error("Error submitting enquiry:", error);
    return { success: false, error: "An unexpected error occurred while submitting your enquiry." };
  }
}

