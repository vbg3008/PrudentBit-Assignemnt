'use client';

import { useState } from 'react';
import { getPatientAvatarUrl } from '@/lib/utils';

interface PatientAvatarProps {
  patientId: number;
  photoUrl?: string | null;
  name: string;
  /** Pixel size of the avatar (width & height). Default: 48 */
  size?: number;
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('');
}

// Generates a deterministic soft color from the name
function getColor(name: string) {
  const palette = [
    { bg: '#DBEAFE', text: '#1D4ED8' }, // blue
    { bg: '#D1FAE5', text: '#065F46' }, // green
    { bg: '#FEE2E2', text: '#991B1B' }, // red
    { bg: '#FEF3C7', text: '#92400E' }, // amber
    { bg: '#EDE9FE', text: '#5B21B6' }, // violet
    { bg: '#FCE7F3', text: '#9D174D' }, // pink
    { bg: '#CFFAFE', text: '#155E75' }, // cyan
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return palette[Math.abs(hash) % palette.length];
}

export function PatientAvatar({ patientId, photoUrl, name, size = 48 }: PatientAvatarProps) {
  const [imgError, setImgError] = useState(false);
  const initials = getInitials(name);
  const color = getColor(name);
  const borderRadius = '50%';
  const style = { width: size, height: size, flexShrink: 0, borderRadius };

  if (imgError) {
    return (
      <div
        style={{ ...style, background: color.bg, color: color.text, fontSize: size * 0.35, fontWeight: 700 }}
        className="flex items-center justify-center border-2 border-white shadow-sm select-none"
      >
        {initials}
      </div>
    );
  }

  return (
    <div style={{ ...style, overflow: 'hidden' }} className="border-2 border-white shadow-sm">
      <img
        src={getPatientAvatarUrl(patientId, photoUrl ?? null)}
        alt={name}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        onError={() => setImgError(true)}
      />
    </div>
  );
}
