'use client';
import { InputHTMLAttributes, forwardRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    containerClassName?: string;
    textClassName?: string;
    labelClassName?: string;
    isCurrency?: boolean;
    currencySymbol?: string;
    icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({
        label,
        error,
        containerClassName = '',
        textClassName = '',
        labelClassName = '',
        isCurrency = false,
        currencySymbol = 'đ',
        value,
        onChange,
        icon,
        ...props
    }, ref) => {
        const [displayValue, setDisplayValue] = useState('');

        useEffect(() => {
            if (props.type === 'number' || isCurrency) {
                setDisplayValue(Number(value).toLocaleString());
            } else {
                setDisplayValue(String(value || ''));
            }
        }, [value]);

        return (
            <div className={cn('w-full', containerClassName)}>
                {label && (
                    <label className={cn('block text-sm font-medium text-gray-700 mb-2', labelClassName)}>
                        {label}
                    </label>
                )}
                <div className="relative">
                    {isCurrency && (
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                            {currencySymbol}
                        </div>
                    )}
                    {icon && (
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={cn(
                            'w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200',
                            isCurrency ? 'pl-8 pr-4' : 'px-4',
                            icon && 'pl-10',
                            error && 'border-red-500 focus:ring-red-500 ',
                            textClassName,
                        )}
                        value={value}
                        onChange={onChange}
                        {...props}
                    />
                </div>
                {isCurrency && <p className={`mt-2 ${textClassName}`}>Số tiền: {displayValue} {currencySymbol}</p>}
                {error && (
                    <p className="mt-1 text-sm text-red-600">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
