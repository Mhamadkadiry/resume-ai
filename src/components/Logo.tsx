import { Brain } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function Logo({ size = "md", showText = true }: LogoProps) {
  const sizeClasses = {
    sm: "size-6",
    md: "size-8",
    lg: "size-10",
  };

  const iconSizes = {
    sm: "size-4",
    md: "size-5",
    lg: "size-6",
  };

  return (
    <div className="flex items-center gap-2">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center rounded-lg shadow-lg">
        <div
          className={`${sizeClasses[size]} flex items-center justify-center`}
        >
          <Brain className={iconSizes[size]} />
        </div>
      </div>
      {showText && (
        <span className="font-medium text-foreground">Resume AI</span>
      )}
    </div>
  );
}
