import { PatientDirectory } from "@/components/dashboard/patient-directory";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import fs from 'fs/promises';
import path from 'path';

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
    <main className="">
      <DashboardHeader totalCount={initialCount} />
      
      <div className="">
        <PatientDirectory />
      </div>

   
    </main>
  );
}
