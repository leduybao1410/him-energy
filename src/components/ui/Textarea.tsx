import { TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    className?: string;
    containerClassName?: string;
    textClassName?: string;
    labelClassName?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({
        label,
        error,
        className = '',
        containerClassName = '',
        textClassName = '',
        labelClassName = '',
        ...props
    }, ref) => {
        return (
            <div className={cn('w-full', containerClassName)}>
                {label && (
                    <label className={cn('block text-sm font-medium text-gray-700 mb-2', labelClassName)}>
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    className={cn(
                        'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none',
                        error && 'border-red-500 focus:ring-red-500',
                        textClassName,
                        className
                    )}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-sm text-red-600">{error}</p>
                )}
            </div>
        );
    }
);

Textarea.displayName = 'Textarea';

export default Textarea;
