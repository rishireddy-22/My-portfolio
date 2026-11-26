import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to execute API calls with loading, error, and cached fallback handling.
 *
 * @param {Function} fetcher - Async function returning data
 * @param {Array} dependencies - Trigger array for refetching
 */
export function useFetch(fetcher, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    try {
      const result = await fetcher();
      if (isMounted) {
        setData(result);
      }
    } catch (err) {
      if (isMounted) {
        console.error('[useFetch] Error fetching data:', err);
        setError(err);
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [fetcher]);

  useEffect(() => {
    execute();
  }, [execute, ...dependencies]);

  return { data, loading, error, refetch: execute };
}
