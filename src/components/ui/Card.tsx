import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    padding?: 'sm' | 'md' | 'lg';
}

const Card = ({
    children,
    className = '',
    hover = false,
    padding = 'md'
}: CardProps) => {
    const baseClasses = 'bg-white rounded-2xl shadow-lg transition-all duration-300';

    const hoverClasses = hover ? 'hover:shadow-xl hover:-translate-y-2' : '';

    const paddingClasses = {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8'
    };

    return (
        <div className={cn(
            baseClasses,
            hoverClasses,
            paddingClasses[padding],
            className
        )}>
            {children}
        </div>
    );
};

export default Card;
