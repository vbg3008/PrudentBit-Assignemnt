'use client';

import { useQuery, useInfiniteQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchPatients, FetchParams } from '@/lib/api';
import { useUrlState } from './use-url-state';
import { useMemo } from 'react';

export function usePatients() {
  const { params, setParam, setParams } = useUrlState();

  // Unified query key for caching and synchronization
  const queryKey = useMemo(() => ['patients', params], [params]);

  const {
    data: response,
    isLoading,
    isPlaceholderData,
    error,
    refetch,
  } = useQuery({
    queryKey,
    queryFn: () => fetchPatients(params),
    placeholderData: keepPreviousData,
  });

  const setPage = (page: number) => setParam('page', page);
  const setSearch = (search: string) => setParam('search', search);
  const setSort = (sort: string, order: 'asc' | 'desc') => setParams({ sort, order, page: 1 });
  const setMedicalIssue = (medical_issue: string) => setParam('medical_issue', medical_issue);

  return {
    data: response?.data || [],
    total: response?.total || 0,
    loading: isLoading || isPlaceholderData,
    error: error instanceof Error ? error.message : null,
    params,
    setPage,
    setSearch,
    setSort,
    setMedicalIssue,
    setParam,
    setParams,
    refresh: refetch,
  };
}

