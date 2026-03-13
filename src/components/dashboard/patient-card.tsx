'use client';

import { memo } from 'react';
import { Patient } from '@/types/schema';
import { MapPin, Phone, Mail } from 'lucide-react';
import { PatientAvatar } from './patient-avatar';

interface PatientCardProps {
  patient: Patient;
}

const ISSUE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'fever':           { bg: '#FEE2E2', text: '#DC2626', border: '#FECACA' },
  'headache':        { bg: '#FFEDD5', text: '#EA580C', border: '#FED7AA' },
  'sore throat':     { bg: '#FEF9C3', text: '#CA8A04', border: '#FEF08A' },
  'sprained ankle':  { bg: '#DCFCE7', text: '#16A34A', border: '#BBF7D0' },
  'rash':            { bg: '#FCE7F3', text: '#DB2777', border: '#FBCFE8' },
  'ear infection':   { bg: '#CFFAFE', text: '#0891B2', border: '#A5F3FC' },
  'sinusitis':       { bg: '#F3F4F6', text: '#374151', border: '#D1D5DB' },
  'stomach ache':    { bg: '#FEF9C3', text: '#CA8A04', border: '#FEF08A' },
  'broken arm':      { bg: '#E0E7FF', text: '#4338CA', border: '#C7D2FE' },
  'allergic reaction': { bg: '#CCFBF1', text: '#0F766E', border: '#99F6E4' },
};

function getIssueStyle(issue: string) {
  return ISSUE_COLORS[issue.toLowerCase()] || { bg: '#F3F4F6', text: '#374151', border: '#D1D5DB' };
}

export const PatientCard = memo(function PatientCard({ patient }: PatientCardProps) {
  const contact = patient.contact?.[0] || {};
  const address = contact.address || null;
  const phone = contact.number || null;
  const email = contact.email || null;
  const issueStyle = getIssueStyle(patient.medical_issue);

  return (
    <div
      className="bg-white rounded-[10px] shadow-[0_2px_12px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col"
      style={{ minHeight: '260px' }}
    >
      {/* Card Header — Light blue background */}
      <div className="relative px-[18px] py-[16px] flex items-center gap-3" style={{ background: '#B5D1FE' }}>
        {/* Avatar */}
        <PatientAvatar
          patientId={patient.patient_id}
          photoUrl={patient.photo_url}
          name={patient.patient_name}
        />

        {/* Name + ID */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[16px] text-gray-900 truncate leading-tight">
            {patient.patient_name}
          </p>
          <p className="text-[14px] text-gray-600 leading-tight mt-0.5">
            ID-{patient.patient_id.toString().padStart(4, '0')}
          </p>
        </div>

        {/* Age Badge */}
        <div
          className="shrink-0 rounded-full px-3 py-1 text-[12px] font-medium text-white"
          style={{ background: '#3B82F6' }}
        >
          Age: {patient.age}
        </div>
      </div>

      {/* Card Body */}
      <div className="px-[18px] py-[14px] flex flex-col gap-[12px] flex-1">
        {/* Medical Issue Tag */}
        <div>
          <span
            className="inline-block text-[13px] font-semibold px-3 py-1 rounded-md capitalize"
            style={{
              background: issueStyle.bg,
              color: issueStyle.text,
              border: `1px solid ${issueStyle.border}`,
            }}
          >
            {patient.medical_issue}
          </span>
        </div>

        {/* Contact Details */}
        <div className="flex flex-col gap-[10px]">
          {/* Address */}
          <div className="flex items-start gap-2.5">
            <MapPin className="h-[20px] w-[20px] shrink-0 text-gray-400 mt-0.5" strokeWidth={1.5} />
            {address
              ? <span className="text-[14px] text-gray-700 line-clamp-1">{address}</span>
              : <span className="text-[14px] font-semibold text-red-500">N/A</span>
            }
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2.5">
            <Phone className="h-[20px] w-[20px] shrink-0 text-gray-400" strokeWidth={1.5} />
            {phone
              ? <span className="text-[14px] text-gray-700">{phone}</span>
              : <span className="text-[14px] font-semibold text-red-500">N/A</span>
            }
          </div>

          {/* Email */}
          <div className="flex items-center gap-2.5">
            <Mail className="h-[20px] w-[20px] shrink-0 text-gray-400" strokeWidth={1.5} />
            {email
              ? <span className="text-[14px] text-gray-700 truncate">{email}</span>
              : <span className="text-[14px] font-semibold text-red-500">N/A</span>
            }
          </div>
        </div>
      </div>
    </div>
  );
});
