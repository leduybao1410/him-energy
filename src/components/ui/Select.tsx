import { SelectHTMLAttributes, forwardRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    className?: string;
    containerClassName?: string;
    textClassName?: string;
    labelClassName?: string;
    children: ReactNode;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({
        label,
        error,
        className = '',
        containerClassName = '',
        textClassName = '',
        labelClassName = '',
        children,
        ...props
    }, ref) => {
        return (
            <div className={cn('w-full', containerClassName)}>
                {label && (
                    <label className={cn('block text-sm font-medium text-gray-700 mb-2', labelClassName)}>
                        {label}
                    </label>
                )}
                <select
                    ref={ref}
                    className={cn(
                        'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200',
                        error && 'border-red-500 focus:ring-red-500',
                        textClassName,
                        className
                    )}
                    {...props}
                >
                    {children}
                </select>
                {error && (
                    <p className="mt-1 text-sm text-red-600">{error}</p>
                )}
            </div>
        );
    }
);

Select.displayName = 'Select';

export default Select;
