type LogoProps = {
  className?: string;
  alt?: string;
};

export function Logo({ className, alt = "TourTap" }: LogoProps) {
  return <img className={className} src="/logo.svg" alt={alt} width={159} height={75} />;
}
