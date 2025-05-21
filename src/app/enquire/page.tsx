
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { PlaneTakeoff, PlaneLanding, User, Mail, Phone, MessageSquare, ShieldCheck, CalendarIcon, UsersRound, Baby } from 'lucide-react';
import { submitEnquiry } from "./actions";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from 'next/navigation';
import { useEffect } from "react";
import type { EnquiryFormValues } from "@/lib/types";
import { enquiryFormSchema } from "@/lib/types";


export default function EnquiryPage() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const destinationFromParams = searchParams.get('to');

  const form = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquiryFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      pickupLocation: "",
      finalDestination: destinationFromParams || "",
      departureDate: undefined,
      returnDate: undefined,
      adults: 1,
      children: 0,
      stops: "",
      message: "",
      recaptchaToken: "mock-recaptcha-token", 
    },
  });

  useEffect(() => {
    if (destinationFromParams) {
      form.setValue('finalDestination', destinationFromParams);
    }
  }, [destinationFromParams, form]);

  async function onSubmit(data: EnquiryFormValues) {
    try {
      const result = await submitEnquiry(data);

      if (result.success) {
        toast({
          title: "Enquiry Submitted!",
          description: "Thank you for your enquiry. We will get back to you soon.",
        });
        form.reset({
          name: "",
          email: "",
          phone: "",
          pickupLocation: "",
          finalDestination: "", 
          departureDate: undefined,
          returnDate: undefined,
          adults: 1,
          children: 0,
          stops: "",
          message: "",
          recaptchaToken: "mock-recaptcha-token",
        });
      } else {
        let errorMessage = "An unexpected error occurred. Please try again.";
        if (typeof result.error === 'string') {
          errorMessage = result.error;
        } else if (result.error && 'flatten' in result.error) {
          // ZodError
          const fieldErrors = result.error.flatten().fieldErrors;
          const firstError = Object.values(fieldErrors).flat()[0];
          if (firstError) {
            errorMessage = firstError;
          } else if (result.error.flatten().formErrors.length > 0){
            errorMessage = result.error.flatten().formErrors[0];
          }
        }
        toast({
          title: "Submission Failed",
          description: errorMessage,
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
              
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="pickupLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><PlaneTakeoff className="h-5 w-5 text-primary" />Pickup Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., New York" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="finalDestination"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><PlaneLanding className="h-5 w-5 text-primary" />Final Destination</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Paris" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="departureDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="flex items-center gap-2"><CalendarIcon className="h-5 w-5 text-primary" />Departure Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0,0,0,0)) // Disable past dates
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="returnDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="flex items-center gap-2"><CalendarIcon className="h-5 w-5 text-primary" />Return Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < (form.getValues("departureDate") || new Date(new Date().setHours(0,0,0,0)))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                 <FormField
                  control={form.control}
                  name="adults"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><UsersRound className="h-5 w-5 text-primary" />Number of Adults</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" placeholder="1" {...field} onChange={e => field.onChange(parseInt(e.target.value,10) || 0 )}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="children"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><Baby className="h-5 w-5 text-primary" />Number of Children</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" placeholder="0" {...field} onChange={e => field.onChange(parseInt(e.target.value,10) || 0 )}/>
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
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><MessageSquare className="h-5 w-5 text-primary" />Your Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your dream trip, preferences, approximate dates, budget, etc."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
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
