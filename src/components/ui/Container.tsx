import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
    children: ReactNode;
    className?: string;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl';
}

const Container = ({
    children,
    className = '',
    maxWidth = '6xl'
}: ContainerProps) => {
    const maxWidthClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '4xl': 'max-w-4xl',
        '6xl': 'max-w-6xl'
    };

    return (
        <div className={cn('mx-auto px-4', maxWidthClasses[maxWidth], className)}>
            {children}
        </div>
    );
};

export default Container;
