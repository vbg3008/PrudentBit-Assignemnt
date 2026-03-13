import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPatientAvatarUrl(patientId: number, photoUrl: string | null) {
  // If it's a real-looking image URL (not mockaroo garbage), use it
  if (photoUrl && (photoUrl.match(/\.(jpeg|jpg|gif|png|webp)/i) && !photoUrl.includes('gov.uk') && !photoUrl.includes('amazon') && !photoUrl.includes('flickr'))) {
    return photoUrl;
  }
  // Otherwise, use a reliable mock image service
  // Using pravatar.cc with patientId to get consistent results per patient
  return `https://i.pravatar.cc/150?u=${patientId}`;
}

