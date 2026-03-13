import { PatientDirectory } from "@/components/dashboard/patient-directory";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import fs from 'fs/promises';
import path from 'path';
import { Suspense } from 'react';

export default async function Home() {
  // Get initial count from the data file on the server
  let initialCount = 0;
  try {
    const filePath = path.join(process.cwd(), 'src/data/patients.json');
    const jsonData = await fs.readFile(filePath, 'utf8');
    const patients = JSON.parse(jsonData);
    initialCount = patients.length;
  } catch (error) {
    console.error('Failed to read initial data:', error);
  }

  return (
    <main>
      <DashboardHeader totalCount={initialCount} />

      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        </div>
      }>
        <PatientDirectory />
      </Suspense>
    </main>
  );
}
