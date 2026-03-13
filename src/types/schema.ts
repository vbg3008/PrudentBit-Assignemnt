import { z } from 'zod';

export const ContactSchema = z.object({
  address: z.string().nullable(),
  number: z.string().nullable(),
  email: z.string().nullable(),
});

export const PatientSchema = z.object({
  patient_id: z.number(),
  patient_name: z.string(),
  age: z.number(),
  photo_url: z.string().nullable(),
  contact: z.array(ContactSchema),
  medical_issue: z.string(),
});

export const ApiResponseSchema = z.object({
  data: z.array(PatientSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
});

export type Patient = z.infer<typeof PatientSchema>;
export type Contact = z.infer<typeof ContactSchema>;
export type ApiResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
};
