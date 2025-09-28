import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface IconCardProps {
    icon: ReactNode;
    title: string;
    description: string;
    className?: string;
    iconBg?: 'primary' | 'secondary' | 'cyan';
}

const IconCard = ({
    icon,
    title,
    description,
    className = '',
    iconBg = 'primary'
}: IconCardProps) => {
    const iconBgClasses = {
        primary: 'bg-gradient-to-r from-primary-500 to-secondary-500',
        secondary: 'bg-gradient-to-r from-secondary-500 to-cyan-600',
        cyan: 'bg-gradient-to-r from-secondary-500 to-primary-600'
    };

    return (
        <div className={cn('text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300', className)}>
            <div className={cn('w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4', iconBgClasses[iconBg])}>
                <div className="w-8 h-8 text-white">
                    {icon}
                </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

export default IconCard;
