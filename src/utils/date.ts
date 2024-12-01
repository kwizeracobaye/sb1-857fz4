import { format } from 'date-fns';

export function formatDate(date: string): string {
  return format(new Date(date), 'MMM d, yyyy h:mm a');
}

export function calculateRemainingDays(checkInDate: string, numberOfDays: number): number {
  const checkIn = new Date(checkInDate);
  const now = new Date();
  const diffTime = numberOfDays * 24 * 60 * 60 * 1000 - (now.getTime() - checkIn.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}