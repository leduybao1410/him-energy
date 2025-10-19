import type { Config } from 'tailwindcss'
import { colors } from './src/constants/colors'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/constants/colors.ts',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors,
            animation: {
                'gradient-shift': 'gradient-shift 3s ease infinite',
                'glow': 'glow 2s ease-in-out infinite',
                'float': 'float 3s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                'fade-in': 'fade-in 0.5s ease-out forwards',
                'fade-out': 'fade-out 0.5s ease-out forwards',
                'slide-in-left': 'slide-in-left 0.5s ease-out forwards',
                'slide-in-right': 'slide-in-right 0.5s ease-out forwards',
                'slide-in-up': 'slide-in-up 0.5s ease-out forwards',
                'slide-in-down': 'slide-in-down 0.5s ease-out forwards',
                'slide-out-left': 'slide-out-left 0.5s ease-out forwards',
                'slide-out-right': 'slide-out-right 0.5s ease-out forwards',
                'slide-out-up': 'slide-out-up 0.5s ease-out forwards',
                'slide-out-down': 'slide-out-down 0.5s ease-out forwards',
            },
            keyframes: {
                'gradient-shift': {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },
                'glow': {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)' },
                    '50%': { boxShadow: '0 0 40px rgba(6, 182, 212, 0.6)' },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'pulse-glow': {
                    '0%, 100%': { opacity: '1', transform: 'scale(1)' },
                    '50%': { opacity: '0.8', transform: 'scale(1.05)' },
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'fade-out': {
                    '0%': { opacity: '1' },
                    '100%': { opacity: '0' },
                },
                'slide-in-left': {
                    '0%': { opacity: '0', transform: 'translateX(-100%)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                'slide-in-right': {
                    '0%': { opacity: '0', transform: 'translateX(100%)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                'slide-in-up': {
                    '0%': { opacity: '0', transform: 'translateY(100%)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'slide-in-down': {
                    '0%': { opacity: '0', transform: 'translateY(-100%)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'slide-out-left': {
                    '0%': { opacity: '1', transform: 'translateX(0)' },
                    '100%': { opacity: '0', transform: 'translateX(-100%)' },
                },
                'slide-out-right': {
                    '0%': { opacity: '1', transform: 'translateX(0)' },
                    '100%': { opacity: '0', transform: 'translateX(100%)' },
                },
                'slide-out-up': {
                    '0%': { opacity: '1', transform: 'translateY(0)' },
                    '100%': { opacity: '0', transform: 'translateY(-100%)' },
                },
                'slide-out-down': {
                    '0%': { opacity: '1', transform: 'translateY(0)' },
                    '100%': { opacity: '0', transform: 'translateY(100%)' },
                },
            },
        },
    },
    plugins: [],
}

export default config
