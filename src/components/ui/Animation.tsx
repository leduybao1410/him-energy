'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

// Animation types
export type AnimationType = 'fadeIn' | 'fadeOut' | 'slideInLeft' | 'slideInRight' | 'slideInUp' | 'slideInDown' | 'slideOutLeft' | 'slideOutRight' | 'slideOutUp' | 'slideOutDown';

// Animation timing
export type AnimationTiming = 'fast' | 'normal' | 'slow';

// Animation delay
export type AnimationDelay = 'none' | 'short' | 'medium' | 'long';

interface BaseAnimationProps {
    children: ReactNode;
    animation?: AnimationType;
    timing?: AnimationTiming;
    delay?: AnimationDelay;
    className?: string;
    trigger?: 'onMount' | 'onScroll' | 'onHover' | 'manual';
    threshold?: number; // For scroll trigger
    once?: boolean; // For scroll trigger - animate only once
}

interface AnimationTextProps extends BaseAnimationProps {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

interface AnimationSectionProps extends BaseAnimationProps {
    id?: string;
    background?: 'white' | 'gray' | 'primary' | 'secondary' | 'gradient';
    padding?: 'sm' | 'md' | 'lg' | 'none';
}

// Animation duration classes
const timingClasses = {
    fast: 'duration-300',
    normal: 'duration-500',
    slow: 'duration-700'
};

// Animation delay classes
const delayClasses = {
    none: 'delay-0',
    short: 'delay-100',
    medium: 'delay-300',
    long: 'delay-500'
};

// Animation classes for different effects
const animationClasses = {
    fadeIn: 'opacity-1 animate-fade-in',
    fadeOut: 'opacity-0 animate-fade-out',
    slideInLeft: 'opacity-1 translate-x-0 animate-slide-in-left',
    slideInRight: 'opacity-1 translate-x-0 animate-slide-in-right',
    slideInUp: 'opacity-1 translate-y-0 animate-slide-in-up',
    slideInDown: 'opacity-1 translate-y-0 animate-slide-in-down',
    slideOutLeft: 'opacity-0 -translate-x-full animate-slide-out-left',
    slideOutRight: 'opacity-0 translate-x-full animate-slide-out-right',
    slideOutUp: 'opacity-0 -translate-y-full animate-slide-out-up',
    slideOutDown: 'opacity-0 translate-y-full animate-slide-out-down'
};

// Background classes for sections
const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    primary: 'bg-primary-600',
    secondary: 'bg-secondary-700',
    gradient: 'bg-gradient-to-r from-primary-600 to-secondary-600'
};

// Padding classes for sections
const paddingClasses = {
    sm: 'py-10',
    md: 'py-16',
    lg: 'py-20',
    none: 'p-0'
};

// Hook for scroll-based animations
const useScrollAnimation = (threshold: number = 0.1, once: boolean = true) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (once) {
                        observer.disconnect();
                    }
                } else if (!once) {
                    setIsVisible(false);
                }
            },
            { threshold }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [threshold, once]);

    return { ref, isVisible };
};

// Hook for hover animations
const useHoverAnimation = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    return { isHovered, handleMouseEnter, handleMouseLeave };
};

// Animation Text Component
export const AnimationText = ({
    children,
    animation = 'fadeIn',
    timing = 'normal',
    delay = 'none',
    className = '',
    trigger = 'onMount',
    threshold = 0.1,
    once = true,
    as: Component = 'div'
}: AnimationTextProps) => {
    const { ref, isVisible } = useScrollAnimation(threshold, once);
    const { isHovered, handleMouseEnter, handleMouseLeave } = useHoverAnimation();
    const [shouldAnimate, setShouldAnimate] = useState(false);

    useEffect(() => {
        if (trigger === 'onMount') {
            setShouldAnimate(true);
        } else if (trigger === 'onScroll' && isVisible) {
            setShouldAnimate(true);
        } else if (trigger === 'onHover' && isHovered) {
            setShouldAnimate(true);
        } else if (trigger === 'manual') {
            // Manual trigger - controlled by parent
            setShouldAnimate(true);
        }
    }, [trigger, isVisible, isHovered]);

    const getAnimationClass = () => {
        if (!shouldAnimate) {
            // Initial state - elements should be hidden/positioned for "In" animations
            if (animation.includes('In')) {
                // Return initial hidden state, not the animation class
                if (animation === 'fadeIn') return 'opacity-0';
                if (animation === 'slideInLeft') return 'opacity-0 -translate-x-full';
                if (animation === 'slideInRight') return 'opacity-0 translate-x-full';
                if (animation === 'slideInUp') return 'opacity-0 translate-y-full';
                if (animation === 'slideInDown') return 'opacity-0 -translate-y-full';
            } else if (animation.includes('Out')) {
                // For "Out" animations, start from visible state
                if (animation === 'fadeOut') return 'opacity-1';
                if (animation === 'slideOutLeft') return 'opacity-1 translate-x-0';
                if (animation === 'slideOutRight') return 'opacity-1 translate-x-0';
                if (animation === 'slideOutUp') return 'opacity-1 translate-y-0';
                if (animation === 'slideOutDown') return 'opacity-1 translate-y-0';
            }
            return '';
        }
        // When shouldAnimate is true, apply the animation class
        return animationClasses[animation];
    };

    const baseClasses = 'transition-all ease-out ';
    const animationClass = getAnimationClass();
    const timingClass = timingClasses[timing];
    const delayClass = delayClasses[delay];

    return (
        <Component
            ref={ref as any}
            className={cn(
                baseClasses,
                animationClass,
                timingClass,
                delayClass,
                className
            )}
            onMouseEnter={trigger === 'onHover' ? handleMouseEnter : undefined}
            onMouseLeave={trigger === 'onHover' ? handleMouseLeave : undefined}
        >
            {children}
        </Component>
    );
};

// Animation Section Component
export const AnimationSection = ({
    children,
    animation = 'fadeIn',
    timing = 'normal',
    delay = 'none',
    className = '',
    trigger = 'onScroll',
    threshold = 0.1,
    once = true,
    id,
    background = 'white',
    padding = 'lg'
}: AnimationSectionProps) => {
    const { ref, isVisible } = useScrollAnimation(threshold, once);
    const [shouldAnimate, setShouldAnimate] = useState(false);

    useEffect(() => {
        if (trigger === 'onMount') {
            setShouldAnimate(true);
        } else if (trigger === 'onScroll' && isVisible) {
            setShouldAnimate(true);
        }
    }, [trigger, isVisible]);

    const getAnimationClass = () => {
        if (!shouldAnimate) {
            // Initial state - elements should be hidden/positioned for "In" animations
            if (animation.includes('In')) {
                // Return initial hidden state, not the animation class
                if (animation === 'fadeIn') return 'opacity-0';
                if (animation === 'slideInLeft') return 'opacity-0 -translate-x-full';
                if (animation === 'slideInRight') return 'opacity-0 translate-x-full';
                if (animation === 'slideInUp') return 'opacity-0 translate-y-full';
                if (animation === 'slideInDown') return 'opacity-0 -translate-y-full';
            } else if (animation.includes('Out')) {
                // For "Out" animations, start from visible state
                if (animation === 'fadeOut') return 'opacity-1';
                if (animation === 'slideOutLeft') return 'opacity-1 translate-x-0';
                if (animation === 'slideOutRight') return 'opacity-1 translate-x-0';
                if (animation === 'slideOutUp') return 'opacity-1 translate-y-0';
                if (animation === 'slideOutDown') return 'opacity-1 translate-y-0';
            }
            return '';
        }
        // When shouldAnimate is true, apply the animation class
        return animationClasses[animation];
    };

    const baseClasses = 'w-full transition-all ease-out';
    const animationClass = getAnimationClass();
    const timingClass = timingClasses[timing];
    const delayClass = delayClasses[delay];
    const backgroundClass = backgroundClasses[background];
    const paddingClass = paddingClasses[padding];

    return (
        <section
            ref={ref}
            id={id}
            className={cn(
                baseClasses,
                animationClass,
                timingClass,
                delayClass,
                backgroundClass,
                paddingClass,
                className
            )}
        >
            {children}
        </section>
    );
};

// Export default as AnimationText for backward compatibility
export default AnimationText;
