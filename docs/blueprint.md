# **App Name**: WanderLust Concierge

## Core Features:

- Informational Pages: Home, About, Destinations and Contact pages with static content.
- Inquiry Form: A form for users to submit travel inquiries, including destination, dates, and contact information. Will need fields for name, email, phone, message, from, to and optional stops.
- reCAPTCHA Integration: Google reCAPTCHA v2 integration to protect against spam submissions.
- Email Submission: Backend logic to send the inquiry form details via email to a configured employee email address using Resend or Nodemailer.
- Payment Confirmation: Webhook endpoint (/api/razorpay-webhook) to verify Razorpay signatures and, on 'payment_link.paid' event, trigger confirmation emails to both client and employee.

## Style Guidelines:

- Primary color: Soft lavender (#D0BFFF) to evoke feelings of relaxation and luxury.
- Background color: Light gray (#F0F0F5) to provide a clean and modern backdrop, ensuring readability and visual comfort.
- Accent color: Muted purple (#9473C6) to draw attention to important elements without overwhelming the user.
- Clean and readable sans-serif font for body text.
- Simple and elegant line icons for destinations and travel-related services.
- Responsive layout that adapts to different screen sizes, ensuring a seamless experience on both desktop and mobile devices.
- Subtle transitions and animations to enhance user engagement, such as fading in images or smooth scrolling.