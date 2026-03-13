'use client';

import { usePatients } from '@/hooks/use-patients';
import { SearchBar } from './search-bar';
import { SortDropdown } from './sort-dropdown';
import { DiseaseFilterDropdown } from './disease-filter-dropdown';
import { PatientTable } from './patient-table';
import { PatientGrid } from './patient-grid';
import { DashboardPagination as PaginationPanel } from './dashboard-pagination';
import { FilterChips } from './filter-chips';
import { useUIStore } from '@/store/use-ui-store';
import { DashboardErrorBoundary } from './error-boundary';
import { useMemo } from 'react';
import { ListFilter } from 'lucide-react';

export function PatientDirectory() {

  const { viewMode: storeViewMode, setViewMode: setStoreViewMode } = useUIStore();
  const {
    data,
    total,
    loading,
    params,
    setPage,
    setSearch,
    setSort,
    setParam,
    setMedicalIssue,
  } = usePatients();

  // Use URL view param if available, otherwise fallback to store
  const viewMode = params.view || storeViewMode;
  const setViewMode = (mode: 'table' | 'grid') => {
    setStoreViewMode(mode);
    setParam('view', mode);
  };

  const activeFilters = useMemo(() => {
    const filters: { label: string; value: string; type: string }[] = [];

    if (params.medical_issue) {
      const label = params.medical_issue.charAt(0).toUpperCase() + params.medical_issue.slice(1);
      filters.push({ label: 'Disease', value: label, type: 'medical_issue' });
    }
    if (params.search) {
      filters.push({ label: 'Search', value: `"${params.search}"`, type: 'search' });
    }
    if (params.sort && params.sort !== 'id') {
      const sortLabel = `${params.sort.charAt(0).toUpperCase() + params.sort.slice(1)} (${params.order === 'asc' ? '↑' : '↓'})`;
      filters.push({ label: 'Sort', value: sortLabel, type: 'sort' });
    }

    return filters;
  }, [params.medical_issue, params.search, params.sort, params.order]);

  const handleRemoveFilter = (type: string) => {
    if (type === 'medical_issue') setMedicalIssue('');
    if (type === 'search') setSearch('');
    if (type === 'sort') setSort('id', 'asc');
  };

  return (
    <DashboardErrorBoundary>
      <div className="max-w-[1650px] mx-auto w-full px-6 md:px-12 mt-[30px] relative z-10 pb-20">
        <div className="bg-white rounded-none flex flex-col gap-6">
          
          {/* Row 1: View Switch Tabs + PDF Export */}
          <div className="flex items-center justify-between border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setViewMode('table')}
                className={`pb-4 px-6 text-[16px] font-medium transition-all relative ${
                  viewMode === 'table'
                    ? 'text-[#3B82F6] border-b-2 border-[#3B82F6]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Table View
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`pb-4 px-6 text-[16px] font-medium transition-all relative ${
                  viewMode === 'grid'
                    ? 'text-[#3B82F6] border-b-2 border-[#3B82F6]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Card View
              </button>
            </div>

            <div className="flex items-center gap-2 text-gray-600 shrink-0">
              <ListFilter className="h-5 w-5 text-blue-400" />
              <span className="text-[14px]">
                Active Filters: <span className="font-semibold text-blue-500">{activeFilters.length}</span>
              </span>
            </div>

          
          </div>

          {/* Row 2: Search + Sorting + Disease Filter */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex-1">
              <SearchBar value={params.search} onChange={setSearch} />
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-[16px] text-blue-500 font-medium whitespace-nowrap">Sort by:</span>
              <SortDropdown 
                sortField={params.sort}
                sortOrder={params.order}
                name="Choose Sort Option"
                onChange={setSort}
              />
            
              <DiseaseFilterDropdown
                value={params.medical_issue || ''}
                name=" Disease"
                onChange={setMedicalIssue}
              />
            </div>
          </div>

          {/* Row 3: Filter Chips */}
          {activeFilters.length > 0 && (
            <div className="flex items-center gap-4">
              <FilterChips 
                filters={activeFilters} 
                onRemove={handleRemoveFilter} 
              />
            </div>
          )}

          {/* Data Display Area */}
          <div className="min-h-[500px]">
            {viewMode === 'table' ? (
              <PatientTable patients={data} loading={loading} />
            ) : (
              <PatientGrid patients={data} loading={loading} />
            )}
          </div>

          {/* Pagination Section */}
          <div className="flex justify-center mt-6">
            <PaginationPanel
              currentPage={params.page}
              totalItems={total}
              itemsPerPage={params.limit}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </DashboardErrorBoundary>
  );

}

