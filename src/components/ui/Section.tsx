import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
    children: ReactNode;
    id?: string;
    className?: string;
    background?: 'white' | 'gray' | 'primary' | 'secondary' | 'gradient';
    padding?: 'sm' | 'md' | 'lg';
}

const Section = ({
    children,
    id,
    className = '',
    background = 'white',
    padding = 'lg'
}: SectionProps) => {
    const baseClasses = 'w-full';

    const backgroundClasses = {
        white: 'bg-white',
        gray: 'bg-gray-50',
        primary: 'bg-primary-600',
        secondary: 'bg-secondary-700',
        gradient: 'bg-gradient-to-r from-primary-600 to-secondary-600'
    };

    const paddingClasses = {
        sm: 'py-10',
        md: 'py-16',
        lg: 'py-20'
    };

    return (
        <section
            id={id}
            className={cn(
                baseClasses,
                backgroundClasses[background],
                paddingClasses[padding],
                className
            )}
        >
            {children}
        </section>
    );
};

export default Section;
