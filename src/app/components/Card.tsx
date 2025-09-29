import { PropsWithChildren, HTMLAttributes } from "react";

interface CardProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  padding?: "sm" | "md" | "lg";
  variant?: "default" | "elevated" | "interactive";
}

const paddingMap = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const variantMap = {
  default: "card",
  elevated: "card-elevated",
  interactive: "card-interactive",
};

export function Card({
  padding = "md",
  variant = "default",
  className = "",
  children,
  ...rest
}: CardProps) {
  const classes = [
    variantMap[variant],
    paddingMap[padding],
    className,
  ]
    .filter(Boolean)
    .join(" ");
    
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
