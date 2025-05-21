"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaneTakeoff, PlaneLanding, User, Mail, Phone, MessageSquare, ShieldCheck } from 'lucide-react';
import { submitEnquiry } from "./actions";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from 'next/navigation';
import { useEffect } from "react";

const enquiryFormSchema = z.object({
  from: z.string().min(2, { message: "Departure location must be at least 2 characters." }),
  to: z.string().min(2, { message: "Destination must be at least 2 characters." }),
  stops: z.string().optional(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }).optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(500, { message: "Message must not exceed 500 characters." }),
  recaptchaToken: z.string().optional(), // Placeholder for reCAPTCHA token
});

type EnquiryFormValues = z.infer<typeof enquiryFormSchema>;

export default function EnquiryPage() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const destinationFromParams = searchParams.get('to');

  const form = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquiryFormSchema),
    defaultValues: {
      from: "",
      to: destinationFromParams || "",
      stops: "",
      name: "",
      email: "",
      phone: "",
      message: "",
      recaptchaToken: "mock-recaptcha-token", // Replace with actual reCAPTCHA integration
    },
  });

  useEffect(() => {
    if (destinationFromParams) {
      form.setValue('to', destinationFromParams);
    }
  }, [destinationFromParams, form]);

  async function onSubmit(data: EnquiryFormValues) {
    try {
      // In a real app, you would get the reCAPTCHA token here
      // For now, we use a mock token
      // data.recaptchaToken = await executeRecaptcha('enquiry_form');

      const result = await submitEnquiry(data);

      if (result.success) {
        toast({
          title: "Enquiry Submitted!",
          description: "Thank you for your enquiry. We will get back to you soon.",
        });
        form.reset();
      } else {
        toast({
          title: "Submission Failed",
          description: result.error || "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card className="shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-foreground">Plan Your Adventure</CardTitle>
          <CardDescription className="text-muted-foreground">
            Fill out the form below, and our travel experts will craft your perfect itinerary.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="from"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><PlaneTakeoff className="h-5 w-5 text-primary" />Departure Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., New York" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="to"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><PlaneLanding className="h-5 w-5 text-primary" />Destination</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Paris" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="stops"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><PlaneLanding className="h-5 w-5 text-primary opacity-70" />Optional Stops</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., London, Amsterdam (comma-separated)" {...field} />
                    </FormControl>
                    <FormDescription>
                      If you'd like to visit multiple cities, list them here.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><User className="h-5 w-5 text-primary" />Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><Mail className="h-5 w-5 text-primary" />Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><Phone className="h-5 w-5 text-primary" />Phone Number (Optional)</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+1 234 567 8900" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><MessageSquare className="h-5 w-5 text-primary" />Your Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your dream trip, preferences, number of travelers, approximate dates, budget, etc."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Placeholder for reCAPTCHA v2 */}
              <div className="space-y-2">
                <FormLabel className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-primary" />Security Check</FormLabel>
                <div className="bg-muted p-4 rounded-md border border-input">
                  <p className="text-sm text-muted-foreground">
                    [Google reCAPTCHA v2 will appear here]
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
                  </p>
                </div>
                 {/* Hidden field for reCAPTCHA token, managed by actual reCAPTCHA library */}
                 <FormField
                    control={form.control}
                    name="recaptchaToken"
                    render={({ field }) => (
                      <FormItem className="hidden">
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
              </div>

              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Submitting..." : "Submit Enquiry"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
