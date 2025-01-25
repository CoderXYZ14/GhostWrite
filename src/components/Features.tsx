import { TypeIcon as type, type LucideIcon } from "lucide-react";

interface FeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function Feature({ icon: Icon, title, description }: FeatureProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900">
        <Icon className="h-6 w-6 text-purple-600 dark:text-purple-300" />
      </div>
      <h3 className="mt-4 text-lg font-medium">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
