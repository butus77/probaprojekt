import React from 'react';
import Link from 'next/link'; // For Next.js Link component when as="a"

type ButtonVariant = 'primary' | 'ghost';
type ButtonAs = 'button' | 'a';

type ButtonProps<T extends ButtonAs> = {
  variant?: ButtonVariant;
  as?: T;
  href?: T extends 'a' ? string : never; // href is only required if as is 'a'
} & (T extends 'a' ? React.ComponentPropsWithoutRef<'a'> : React.ComponentPropsWithoutRef<'button'>);

const Button = React.forwardRef(
  <T extends ButtonAs = 'button'>({
    variant = 'primary',
    as,
    href,
    className,
    children,
    ...props
  }: ButtonProps<T>, ref: T extends 'a' ? React.Ref<HTMLAnchorElement> : React.Ref<HTMLButtonElement>) => {
    const baseClasses = 'inline-flex items-center justify-center font-bold py-2 px-4 rounded transition-colors duration-200';
    const variantClasses = {
      primary: 'bg-blue-500 text-white hover:bg-blue-600 btn-primary',
      ghost: 'bg-transparent text-blue-500 hover:bg-blue-100 btn-ghost',
    };

    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className || ''}`;

    if (as === 'a' && href) {
      return (
        <Link href={href} passHref legacyBehavior>
          <a ref={ref as React.Ref<HTMLAnchorElement>} className={combinedClasses} {...(props as React.ComponentPropsWithoutRef<'a'>)}>
            {children}
          </a>
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={combinedClasses}
        {...(props as React.ComponentPropsWithoutRef<'button'>)}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
