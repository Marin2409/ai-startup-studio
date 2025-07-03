import { cn } from "../../lib/utils";

const badgeVariants = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-white/[0.08] backdrop-blur-sm text-white hover:bg-white/[0.12] border border-white/[0.08]",
  outline: "border border-white/10 text-white",
};

export function Badge({ className, variant = "primary", ...props }) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  );
} 