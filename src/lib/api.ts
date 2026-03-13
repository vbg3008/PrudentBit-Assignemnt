import apiClient from './api-client';
import { ApiResponse, Patient, ApiResponseSchema } from '@/types/schema';

export interface FetchParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  medical_issue?: string;
}

export async function fetchPatients(params: FetchParams = {}): Promise<ApiResponse<Patient>> {
  const { data } = await apiClient.get<ApiResponse<Patient>>('/data', {
    params,
  });
  
  // Runtime validation with Zod (Optional but recommended for reliability)
  // return ApiResponseSchema.parse(data); 
  
  return data;
}
