import styles from "./card.module.scss";

export type CardVariant = "subtle" | "accent" | "mint" | "elevated";
export type CardPadding = "md" | "lg" | "none";

type CardProps = {
  variant?: CardVariant;
  padding?: CardPadding;
  className?: string;
  children: React.ReactNode;
};

function classNames(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function Card({
  variant = "subtle",
  padding = "md",
  className,
  children,
}: CardProps) {
  return (
    <article className={classNames(styles.card, styles[variant], styles[padding], className)}>
      {children}
    </article>
  );
}
