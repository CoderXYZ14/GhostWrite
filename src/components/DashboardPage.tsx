"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import { MessageCard } from "@/components/MessageCard";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
const initialMessages = [
  {
    id: 1,
    message: "What's your favorite movie?",
    timestamp: "Jan 30, 2024 6:15 PM",
  },
  {
    id: 2,
    message: "Share a favorite childhood memory.",
    timestamp: "Jan 4, 2024 9:01 PM",
  },
  {
    id: 3,
    message:
      "What's something you've always wanted to learn, but haven't had the chance yet?",
    timestamp: "Mar 13, 2024 2:06 AM",
  },
];

export default function DashboardPage() {
  const [acceptMessages, setAcceptMessages] = useState(true);
  const [messages, setMessages] = useState(initialMessages);
  const { toast } = useToast();
  const uniqueLink = "https://ghostwrites.app/u/username"; // Replace with actual user link

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(uniqueLink);
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

  const handleDeleteMessage = (id: number) => {
    setMessages(messages.filter((msg) => msg.id !== id));
    toast({
      title: "Message deleted",
      description: "The message has been removed from your dashboard.",
    });
  };

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
                  {uniqueLink}
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
                id="accept-messages"
                checked={acceptMessages}
                onCheckedChange={setAcceptMessages}
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
                      key={message.id}
                      message={message.message}
                      timestamp={message.timestamp}
                      onDelete={() => handleDeleteMessage(message.id)}
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
