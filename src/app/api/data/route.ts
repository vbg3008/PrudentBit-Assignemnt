import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Patient } from '@/types/patient';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const search = searchParams.get('search')?.toLowerCase() || '';
    const sortField = searchParams.get('sort') || '';
    const sortOrder = searchParams.get('order') || 'asc';
    const medicalIssue = searchParams.get('medical_issue')?.toLowerCase() || '';

    // Load data from JSON file
    const filePath = path.join(process.cwd(), 'src/data/patients.json');
    const jsonData = await fs.readFile(filePath, 'utf8');
    let patients: Patient[] = JSON.parse(jsonData);

    // Initial total before filtering? No, usually total is after filtering
    // Total matching counts

    // Filtering
    if (search) {
      patients = patients.filter(p => 
        p.patient_name.toLowerCase().includes(search) ||
        p.medical_issue.toLowerCase().includes(search) ||
        p.patient_id.toString().includes(search)
      );
    }

    if (medicalIssue) {
      patients = patients.filter(p => p.medical_issue.toLowerCase() === medicalIssue);
    }

    // Sorting
    if (sortField) {
      patients.sort((a, b) => {
        let valA: string | number = '';
        let valB: string | number = '';

        switch (sortField) {
          case 'name':
            valA = a.patient_name;
            valB = b.patient_name;
            break;
          case 'age':
            valA = a.age;
            valB = b.age;
            break;
          case 'issue':
            valA = a.medical_issue;
            valB = b.medical_issue;
            break;
          case 'id':
            valA = a.patient_id;
            valB = b.patient_id;
            break;
          default:
            valA = a.patient_id;
            valB = b.patient_id;
        }

        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    const total = patients.length;
    const startIndex = (page - 1) * limit;
    const paginatedData = patients.slice(startIndex, startIndex + limit);

    return NextResponse.json({
      data: paginatedData,
      total,
      page,
      limit
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
