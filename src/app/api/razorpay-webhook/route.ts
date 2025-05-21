import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET;
const EMPLOYEE_EMAIL = process.env.EMPLOYEE_EMAIL_ADDRESS || "employee@example.com"; // Should be consistent with actions.ts

async function sendEmail(to: string, subject: string, htmlContent: string): Promise<boolean> {
  // Placeholder for email sending logic (e.g., using Resend or Nodemailer)
  console.log(`Webhook Email supposedly sent to: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`HTML Content: ${htmlContent}`);
  // Simulate email sending success
  return true;
}

export async function POST(request: NextRequest) {
  if (!RAZORPAY_WEBHOOK_SECRET) {
    console.error("Razorpay webhook secret is not configured.");
    return NextResponse.json({ error: "Webhook secret not configured." }, { status: 500 });
  }

  const signature = request.headers.get('x-razorpay-signature');
  const bodyText = await request.text(); // Read body as text for signature verification

  if (!signature) {
    return NextResponse.json({ error: "Missing Razorpay signature." }, { status: 400 });
  }

  try {
    const shasum = crypto.createHmac('sha256', RAZORPAY_WEBHOOK_SECRET);
    shasum.update(bodyText);
    const digest = shasum.digest('hex');

    if (digest !== signature) {
      console.warn("Invalid Razorpay signature.");
      return NextResponse.json({ error: "Invalid signature." }, { status: 403 });
    }

    // Signature is valid, parse the body as JSON
    const event = JSON.parse(bodyText);

    if (event.event === 'payment_link.paid') {
      const paymentLink = event.payload.payment_link.entity;
      const customerEmail = paymentLink.customer.email;
      const customerName = paymentLink.customer.name || 'Valued Customer';
      const amount = paymentLink.amount / 100; // Amount is in paise
      const currency = paymentLink.currency;
      const paymentLinkId = paymentLink.id;
      const shortUrl = paymentLink.short_url;

      // Send payment success email to client
      const clientEmailSubject = `Payment Successful for your WanderLust Concierge Booking!`;
      const clientEmailBody = `
        <h1>Thank You for Your Payment!</h1>
        <p>Dear ${customerName},</p>
        <p>We are pleased to inform you that your payment of ${currency} ${amount.toFixed(2)} for payment link ID ${paymentLinkId} has been successfully processed.</p>
        <p>Your travel consultant will be in touch shortly with the next steps for your booking.</p>
        <p>Payment Link: <a href="${shortUrl}">${shortUrl}</a></p>
        <p>Thank you for choosing WanderLust Concierge!</p>
      `;
      await sendEmail(customerEmail, clientEmailSubject, clientEmailBody);

      // Send notification email to employee
      const employeeEmailSubject = `Payment Received: Booking for ${customerName} (ID: ${paymentLinkId})`;
      const employeeEmailBody = `
        <h1>Payment Received!</h1>
        <p>A payment has been successfully processed for a booking.</p>
        <p><strong>Customer Name:</strong> ${customerName}</p>
        <p><strong>Customer Email:</strong> ${customerEmail}</p>
        <p><strong>Amount:</strong> ${currency} ${amount.toFixed(2)}</p>
        <p><strong>Payment Link ID:</strong> ${paymentLinkId}</p>
        <p><strong>Payment Link URL:</strong> <a href="${shortUrl}">${shortUrl}</a></p>
        <p>Please follow up with the client regarding their booking.</p>
      `;
      await sendEmail(EMPLOYEE_EMAIL, employeeEmailSubject, employeeEmailBody);

      return NextResponse.json({ message: "Webhook processed successfully for payment_link.paid" }, { status: 200 });
    } else {
      console.log("Received Razorpay event:", event.event);
      return NextResponse.json({ message: `Webhook received for event: ${event.event}, but not processed.` }, { status: 200 });
    }

  } catch (error) {
    console.error("Error processing Razorpay webhook:", error);
    if (error instanceof SyntaxError) {
        return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
    }
    return NextResponse.json({ error: "Webhook processing failed." }, { status: 500 });
  }
}
