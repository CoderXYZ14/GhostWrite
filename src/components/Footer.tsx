import { Ghost } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background max-w-7xl border-t dark:border-white/50">
      <div className="  mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Ghost className="h-8 w-8 text-purple-600" />
            <span className="ml-2 text-xl font-bold">Ghost Writes</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 Ghost Writes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
