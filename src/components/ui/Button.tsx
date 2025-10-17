import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    onClick,
    type = 'button',
    disabled = false
}: ButtonProps) => {
    const baseClasses = 'z-50 cursor-pointer font-semibold rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-2 justify-center';

    const variantClasses = {
        primary: 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white shadow-lg shadow-primary-500/25',
        secondary: 'bg-gradient-to-r from-secondary-500 to-cyan-600 hover:from-secondary-600 hover:to-cyan-700 text-white shadow-lg shadow-secondary-500/25',
        outline: 'border-2 border-white/30 hover:border-white/60 text-white hover:bg-white/10',
        ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
    };

    const sizeClasses = {
        sm: 'py-2 px-4 text-sm',
        md: 'py-4 px-8 text-base',
        lg: 'py-6 px-12 text-lg'
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={cn(
                baseClasses,
                variantClasses[variant],
                sizeClasses[size],
                disabled && 'opacity-50 cursor-not-allowed hover:scale-100',
                className
            )}
        >
            {children}
        </button>
    );
};

export default Button;
