"use client";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useDebounceCallback } from "usehooks-ts";
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
import { signUpSchema } from "@/schemas/signUpSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Loader2 } from "lucide-react";

export function SignUpForm() {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debounced = useDebounceCallback(setUsername, 300);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMessage("");
        try {
          const response = await axios.get(
            `/api/check-username-unique?username=${username}`
          );
          setUsernameMessage(response.data.message);
        } catch (error) {
          const AxiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            AxiosError.response?.data.message ?? "Error while checking username"
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [username]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>("/api/signup", data);
      toast({
        title: "Success",
        description: response.data.message,
      });
      await router.replace(`/verify-code/${username}`);
      setIsSubmitting(false);
    } catch (error) {
      console.log("Error in signup of user: ", error);
      const AxiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Signup failed",
        description:
          AxiosError.response?.data.message ?? "Error while signing up",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container max-w-xl px-4 py-8 sm:p-6 md:p-8 space-y-6 sm:space-y-8 bg-white dark:bg-neutral-800 rounded-lg shadow-xl mx-auto">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-neutral-100 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
          Create your account
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-neutral-300">
          Join Ghost-Writes and start sending anonymous messages today!
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 sm:space-y-6"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-purple-700 dark:text-purple-300">
                  Username
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="ghostwriter123"
                    className="mt-1 dark:bg-neutral-800 dark:border-neutral-700"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      debounced(e.target.value);
                    }}
                  />
                </FormControl>
                {isCheckingUsername && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                <p
                  className={`text-sm ${usernameMessage === "Username is unique" ? "text-green-500" : "text-red-500"}`}
                >
                  {usernameMessage}
                </p>
                <FormMessage className="text-xs text-red-500 dark:text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-purple-700 dark:text-purple-300">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
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
              "Sign up for Ghost-Writes"
            )}
          </Button>
        </form>
      </Form>
      <div className="mt-4 sm:mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-neutral-300">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-medium text-purple-600 dark:text-purple-400 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
