interface LogoProps {
  className?: string;
  size?: number;
}

const Logo = ({ className = "", size = 48 }: LogoProps) => {
  return (
    <img
      src="/valkyrie-logo.svg"
      alt="Valkyrie"
      width={size}
      height={size}
      className={`text-valkyrie-charcoal ${className}`}
    />
  );
};

export default Logo; 