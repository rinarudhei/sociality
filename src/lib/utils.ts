import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateAvatarFallback(name: string): string {
  if (!name) {
    return 'XX';
  }

  if (name.length === 1) {
    return `${name}${name}`;
  }

  const names = name.split(' ');
  const firstLetter = names[0][0].toUpperCase();
  let secondLetter = '';
  if (names.length < 2) {
    secondLetter = names[0][1];
  } else {
    secondLetter = names[1][0].toUpperCase();
  }

  return `${firstLetter}${secondLetter}`;
}
