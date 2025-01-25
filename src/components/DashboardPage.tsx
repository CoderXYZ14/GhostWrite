"use client";

import { useCallback, useEffect, useState } from "react";
import { Copy } from "lucide-react";
import { MessageCard } from "@/components/MessageCard";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Message } from "@/model/User";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { User } from "next-auth";

const initialMessages = [
  {
    content: "What's your favorite movie?",
    createdAt: new Date("2024-01-30T18:15:00"),
  },
  {
    content: "Share a favorite childhood memory.",
    createdAt: new Date("2024-01-04T21:01:00"),
  },
  {
    content:
      "What's something you've always wanted to learn, but haven't had the chance yet?",
    createdAt: new Date("2024-03-13T02:06:00"),
  },
];

export default function DashboardPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLaoding, setIsSwitchLoading] = useState(false);

  //we are using optimistic ui ie in frontend shows ui chnages but not done immediately in backend

  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      toast({
        title: "Link copied!",
        description: "Your unique link has been copied to clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try copying the link manually.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((msg) => msg._id !== messageId));
    toast({
      title: "Message deleted",
      description: "The message has been removed from your dashboard.",
    });
  };

  const { data: session } = useSession();
  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });

  const { register, watch, setValue } = form;

  const acceptMessages = watch("acceptMessages");
  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages");
      setValue("acceptMessages", response.data.isAcceptingMessages);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ||
          "Failed to fetch message acceptance status",
        variant: "destructive",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(false);
      setIsSwitchLoading(false);
      try {
        const response = await axios.get<ApiResponse>("/api/get-messages");
        setMessages(response.data.messages || []);
        if (refresh) {
          toast({
            title: "Refreshed messages",
            description: "Showing latest messages",
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast({
          title: "Error",
          description:
            axiosError.response?.data.message ||
            "Failed to fetch message acceptance status",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        setIsSwitchLoading(false);
      }
    },
    [setIsLoading, setMessages]
  );

  useEffect(() => {
    if (!session || !session.user) return;
    fetchMessages();
    fetchAcceptMessage();
  }, [session, setValue, fetchAcceptMessage, fetchMessages]);

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });
      setValue("acceptMessages", !acceptMessages);
      toast({
        title: response.data.message,
        variant: "default",
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ||
          "Failed to fetch message acceptance status",
        variant: "destructive",
      });
    }
  };

  const { username } = (session?.user as User) || "shahwaiz";

  const baseUrl = "http://localhost:3000/dashboard";
  const profileUrl = `${baseUrl}/u/${username}`;

  // if (!session || !session.user) {
  //   return <div>Pleast login</div>;
  // }
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-6">
            User Dashboard
          </h1>

          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                Copy Your Unique Link
              </h2>
              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap bg-white/40 p-2 rounded-lg">
                <div className="flex-1 p-3 bg-muted rounded-lg text-sm text-muted-foreground break-all">
                  {profileUrl}
                </div>
                <Button onClick={copyToClipboard} className="shrink-0">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between bg-white/40 mx-auto p-4">
              <div className="space-y-0.5">
                <Label htmlFor="accept-messages">Accept Messages</Label>
                <p className="text-sm text-muted-foreground">
                  Toggle to control whether you can receive new messages
                </p>
              </div>
              <Switch
                {...register("acceptMessages")}
                id="accept-messages"
                checked={acceptMessages}
                onCheckedChange={handleSwitchChange}
                disabled={isSwitchLaoding}
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                Messages
              </h2>
              {messages.length > 0 ? (
                <div className="grid gap-4">
                  {messages.map((message) => (
                    <MessageCard
                      key={message?.id}
                      message={message}
                      onMessageDelete={() => handleDeleteMessage(message.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No messages yet. Share your link to start receiving anonymous
                  messages!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
