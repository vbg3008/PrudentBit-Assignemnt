'use client';



interface DashboardHeaderProps {
  totalCount: number;
}

import Image from 'next/image';

export function DashboardHeader({ totalCount }: DashboardHeaderProps) {
  return (
    <div className="relative w-full bg-[#3B82F6] h-[150px] overflow-hidden flex items-center px-6 md:px-12">
      {/* Abstract Medical Pattern (Blue Crosses) */}
      <div className="absolute right-0 top-0 h-full w-1/2 opacity-80 pointer-events-none select-none overflow-hidden">
        <Image
          src="/Group 10.png"
          alt="Medical Pattern"
          fill
          style={{ objectFit: 'cover', objectPosition: 'right center' }}
          priority
        />
      </div>

      <div className="relative z-10 w-full max-w-[1650px] mx-auto">
        <h1 className="text-[40px] leading-tight font-bold text-white">
          Patient Directory
        </h1>
        <p className="text-[24px] text-white/90">
          {totalCount.toLocaleString()} Patient Found
        </p>
      </div>
    </div>
  );
}
