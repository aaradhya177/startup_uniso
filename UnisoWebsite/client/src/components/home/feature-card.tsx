import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  color: "blue" | "purple" | "orange";
  buttonText?: string;
  buttonAction?: () => void;
  children?: ReactNode;
}

export default function FeatureCard({
  title,
  description,
  icon,
  color,
  buttonText,
  buttonAction,
  children,
}: FeatureCardProps) {
  const colorClasses = {
    blue: {
      bg: "bg-blue-50",
      iconBg: "bg-blue-100",
      iconColor: "text-primary-500",
      button: "bg-primary-500 hover:bg-primary-600",
    },
    purple: {
      bg: "bg-purple-50",
      iconBg: "bg-purple-100",
      iconColor: "text-secondary-500",
      button: "bg-secondary-500 hover:bg-purple-600",
    },
    orange: {
      bg: "bg-orange-50",
      iconBg: "bg-orange-100",
      iconColor: "text-accent-500",
      button: "bg-accent-500 hover:bg-orange-600",
    },
  };

  const classes = colorClasses[color];

  return (
    <div className={cn("feature-card rounded-trendy p-6 shadow-crisp", classes.bg)}>
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-heavy mb-3 text-gray-800">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
        <div className={cn("p-3 rounded-trendy flex items-center justify-center", classes.iconBg)}>
          {icon}
        </div>
      </div>
      
      {children && <div className="mt-4">{children}</div>}
      
      {buttonText && (
        <div className="mt-4">
          <Button 
            className={cn("text-white px-5 py-2.5 rounded-lg font-medium transition-colors", classes.button)}
            onClick={buttonAction}
          >
            {buttonText}
          </Button>
        </div>
      )}
    </div>
  );
}
