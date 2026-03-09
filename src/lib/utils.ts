import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dayjs from 'dayjs';

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

export function generateUploadTimeDiffString(createdAt: string): string {
  const uploadTime = dayjs(createdAt);
  const now = dayjs();

  const yearDiff = now.diff(uploadTime, 'year', false);
  const monthDiff = now.diff(uploadTime, 'month', false);
  const weekDiff = now.diff(uploadTime, 'week', false);
  const dayDiff = now.diff(uploadTime, 'day', false);
  const hourDiff = now.diff(uploadTime, 'hour', false);
  const minuteDiff = now.diff(uploadTime, 'minute', false);
  const secondDiff = now.diff(uploadTime, 'second', false);

  if (yearDiff > 0) {
    return `${yearDiff} ${yearDiff === 1 ? 'year' : 'years'} ago`;
  }
  if (monthDiff > 0) {
    return `${monthDiff} ${monthDiff === 1 ? 'month' : 'months'} ago`;
  }
  if (weekDiff > 0) {
    return `${weekDiff} ${weekDiff === 1 ? 'week' : 'weeks'} ago`;
  }
  if (dayDiff > 0) {
    return `${dayDiff} ${dayDiff === 1 ? 'day' : 'days'} ago`;
  }
  if (hourDiff > 0) {
    return `${hourDiff} ${hourDiff === 1 ? 'hour' : 'hours'} ago`;
  }
  if (minuteDiff > 0) {
    return `${minuteDiff} ${minuteDiff === 1 ? 'minute' : 'minutes'} ago`;
  }

  return `${secondDiff} seconds ago`;
}
