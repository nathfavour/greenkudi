import { PropsWithChildren, HTMLAttributes } from "react";

interface CardProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  padding?: "sm" | "md" | "lg";
  interactive?: boolean;
}

const paddingMap = {
  sm: "p-3",
  md: "p-5",
  lg: "p-7",
};

export function Card({
  as: Component = "div",
  padding = "md",
  interactive = false,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <Component
      className={clsx(
        "rounded-xl border bg-white shadow-sm",
        paddingMap[padding],
        interactive &&
          "transition-colors hover:border-[--primary]/40 focus-within:border-[--primary]/50",
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
