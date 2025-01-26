"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";

export function SignInForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        identifier: data.identifier,
        password: data.password,
      });

      if (result?.error) {
        toast({
          title: "Login failed",
          description: "Incorrect username or password",
          variant: "destructive",
        });
      }

      if (result?.url) {
        router.replace("/dashboard");
      }
    } catch (error) {
      console.error("Failed to sign in: ", error);
      toast({
        title: "An error occurred",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container max-w-xl px-4 py-8 sm:p-6 md:p-8 space-y-6 sm:space-y-8 bg-white dark:bg-neutral-800 rounded-lg shadow-xl mx-auto">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-neutral-100 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
          Login your account
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-neutral-300">
          Welcome back and start sending anonymous messages again!
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 sm:space-y-6"
        >
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-purple-700 dark:text-purple-300">
                  Email / Username
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="email / username"
                    className="mt-1 dark:bg-neutral-800 dark:border-neutral-700"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-xs text-red-500 dark:text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-purple-700 dark:text-purple-300">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="mt-1 dark:bg-neutral-800 dark:border-neutral-700"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-xs text-red-500 dark:text-red-400" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:from-purple-500 dark:to-blue-400 dark:hover:from-purple-600 dark:hover:to-blue-500"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </>
            ) : (
              "Sign In for Ghost-Writes"
            )}
          </Button>
        </form>
      </Form>
      <div className="mt-4 sm:mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-neutral-300">
          Don't have an account?
          <Link
            href="/signup"
            className="font-medium text-purple-600 dark:text-purple-400 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
