"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";
import axios, { type AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { verifySchema } from "@/schemas/verifySchema";
import type { ApiResponse } from "@/types/ApiResponse";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const VerifyAccount = () => {
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`/api/verify-code`, {
        username: params.username,
        code: data.code,
      });

      toast({
        title: "Success",
        description: response.data.message,
      });

      router.replace("/signin");
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Verification failed",
        description:
          axiosError.response?.data.message ?? "Error while verifying account",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
          Create your account
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Join Ghost-Writes and start sending anonymous messages today!
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormLabel className="sr-only">Verification Code</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field} className="">
                    <InputOTPGroup className="gap-2">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup className="gap-2">
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify Account"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default VerifyAccount;
