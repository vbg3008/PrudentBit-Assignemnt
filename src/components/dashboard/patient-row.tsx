import { memo } from 'react';
import { Patient } from '@/types/schema';
import { ChevronRight } from 'lucide-react';
import { PatientAvatar } from './patient-avatar';

interface PatientRowProps {
  patient: Patient;
  style?: React.CSSProperties;
}

const ISSUE_COLORS: Record<string, string> = {
  'fever': 'bg-[#FEE2E2] text-[#EF4444]',
  'headache': 'bg-[#FFEDD5] text-[#F97316]',
  'sore throat': 'bg-[#FEF9C3] text-[#EAB308]',
  'sprained ankle': 'bg-[#DCFCE7] text-[#22C55E]',
  'rash': 'bg-[#FCE7F3] text-[#EC4899]',
  'ear infection': 'bg-[#CFFAFE] text-[#06B6D4]',
};

export const PatientRow = memo(function PatientRow({ patient, style }: PatientRowProps) {
  const contact = patient.contact?.[0] || {};
  const address = contact.address || null;
  const phone = contact.number || null;
  const email = contact.email || null;

  return (
    <div 
      style={style}
      className="grid grid-cols-[100px_1.5fr_80px_1fr_2fr_1.2fr_1.8fr_40px] items-center border-b border-gray-100 hover:bg-gray-50 transition-colors px-6 h-[56px] text-[14px] bg-white group cursor-pointer"
      role="row"
    >
      <div className="text-gray-500 pr-2">
        ID-{patient.patient_id.toString().padStart(4, '0')}
      </div>
      <div className="flex items-center gap-3 truncate pr-2">
        <PatientAvatar
          patientId={patient.patient_id}
          photoUrl={patient.photo_url}
          name={patient.patient_name}
          size={40}
        />
        <span className="font-medium text-gray-900 truncate">
          {patient.patient_name}
        </span>
      </div>
      <div className="text-gray-700 pr-2">{patient.age}</div>
      <div className="pr-2">
        <span 
          className={`px-3 py-1 rounded-md text-[12px] font-medium inline-block capitalize ${getIssueColor(patient.medical_issue)}`}
        >
          {patient.medical_issue}
        </span>
      </div>
      <div className="truncate pr-2 text-gray-700">{address || <span className="text-red-500 font-bold">N/A</span>}</div>
      <div className="truncate pr-2 text-gray-700">{phone || <span className="text-red-500 font-bold">N/A</span>}</div>
      <div className="truncate pr-2 text-gray-700">{email || <span className="text-red-500 font-bold">N/A</span>}</div>
      <div className="flex justify-end text-gray-400 group-hover:text-gray-600">
        <ChevronRight className="h-5 w-5" />
      </div>
    </div>
  );
});

function getIssueColor(issue: string) {
  const normalized = issue.toLowerCase();
  return ISSUE_COLORS[normalized] || 'bg-gray-100 text-gray-600';
}

