import { X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MessageCardProps {
  message: string;
  timestamp: string;
  onDelete: () => void;
}

export function MessageCard({
  message,
  timestamp,
  onDelete,
}: MessageCardProps) {
  return (
    <Card className="relative group hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <p className="text-sm text-muted-foreground mb-2">{timestamp}</p>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={onDelete}
          >
            <X className="h-4 w-4 text-red-500" />
            <span className="sr-only">Delete message</span>
          </Button>
        </div>
        <p className="text-base text-foreground">{message}</p>
      </div>
    </Card>
  );
}
