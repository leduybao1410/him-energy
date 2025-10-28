import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
    children: ReactNode;
    id?: string;
    className?: string;
    background?: 'white' | 'gray' | 'primary' | 'secondary' | 'gradient' | 'super-light' | 'extra-light' | 'light-grey' | 'dark-grey' | 'medium-grey';
    padding?: 'sm' | 'md' | 'lg';
    backgroundImage?: string;
}

const Section = ({
    children,
    id,
    className = '',
    background = 'white',
    padding = 'lg',
    backgroundImage = '',
}: SectionProps) => {
    const baseClasses = 'w-full';

    const backgroundClasses = {
        white: 'bg-white',
        gray: 'bg-gray-50',
        primary: 'bg-primary-600',
        secondary: 'bg-secondary-700',
        gradient: 'bg-gradient-to-r from-primary-600 to-secondary-600',
        'light-grey': 'bg-black/50',
        'dark-grey': 'bg-black/90',
        'medium-grey': 'bg-black/70',
        'extra-light': 'bg-black/50',
        'super-light': 'bg-black/30',
    };

    const paddingClasses = {
        sm: 'py-10',
        md: 'py-16',
        lg: 'py-20'
    };

    return (
        <section
            id={id}
            style={backgroundImage ? {
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundBlendMode: 'overlay'
            } : {}}
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
