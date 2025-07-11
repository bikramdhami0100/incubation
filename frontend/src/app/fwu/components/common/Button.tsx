// components/common/Button.tsx
import Link from 'next/link';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  href,
  onClick,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
}) => {
  const baseStyles = "font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-all duration-150 ease-in-out transform active:scale-95";

  const variantStyles = {
    primary: 'bg-brand-accent hover:bg-yellow-500 text-white focus:ring-brand-accent',
    secondary: 'bg-brand-primary hover:bg-blue-700 text-white focus:ring-brand-primary',
    outline: 'bg-transparent hover:bg-brand-primary/10 border-2 border-brand-primary text-brand-primary focus:ring-brand-primary',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  );
};

export default Button;