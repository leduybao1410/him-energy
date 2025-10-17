import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const CONTENT_TYPE_APPLICATION_JSON = { 'Content-Type': 'application/json' };

export const placeholderImage = 'https://picsum.photos/200/300';

export const renderSlug = (name: string) => {
  // Remove Vietnamese tones & special characters, then replace spaces with '-'
  return name
    .toLowerCase()
    .normalize('NFD') // decompose Unicode characters
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .replace(/đ/g, 'd') // handle Vietnamese đ
    .replace(/[^a-z0-9\s-]/g, '') // remove non-alphanumeric, non-space, non-hyphen chars
    .replace(/\s+/g, '-') // replace whitespace with '-'
    .replace(/-+/g, '-') // collapse multiple '-' into one
    .replace(/^-+|-+$/g, ''); // remove leading/trailing hyphens
}