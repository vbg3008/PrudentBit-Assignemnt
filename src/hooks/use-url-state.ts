'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';

/**
 * Hook to manage URL search parameters in Next.js App Router
 */
export function useUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getParam = useCallback(
    (key: string, defaultValue: string = '') => {
      return searchParams.get(key) || defaultValue;
    },
    [searchParams]
  );

  const setParam = useCallback(
    (key: string, value: string | number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value.toString());
      } else {
        params.delete(key);
      }
      
      // Reset page when other params change (search, filter, sort)
      if (key !== 'page' && params.has('page')) {
        params.set('page', '1');
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const setParams = useCallback(
    (newParams: Record<string, string | number | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      
      Object.entries(newParams).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          params.set(key, value.toString());
        } else {
          params.delete(key);
        }
      });

      // Reset page if needed
      const hasMajorChange = Object.keys(newParams).some(k => k !== 'page');
      if (hasMajorChange && params.has('page')) {
        params.set('page', '1');
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const paramsObj = useMemo(() => {
    return {
      search: getParam('search'),
      medical_issue: getParam('medical_issue'),
      sort: getParam('sort', 'id'),
      order: getParam('order', 'asc') as 'asc' | 'desc',
      page: parseInt(getParam('page', '1'), 10),
      limit: parseInt(getParam('limit', '12'), 10),
      view: getParam('view', 'table') as 'table' | 'grid',
    };
  }, [getParam]);


  return {
    params: paramsObj,
    setParam,
    setParams,
  };
}
