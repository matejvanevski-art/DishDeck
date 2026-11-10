import { useCallback, useEffect, useState } from 'react';

export function useApi(request) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let isCurrentRequest = true;

    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const result = await request({ signal: controller.signal });

        if (isCurrentRequest) {
          setData(result);
        }
      } catch (err) {
        if (isCurrentRequest && err.name !== 'AbortError') {
          setError(err.message || 'Something went wrong. Please try again.');
        }
      } finally {
        if (isCurrentRequest) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isCurrentRequest = false;
      controller.abort();
    };
  }, [request, reloadCount]);

  const refetch = useCallback(() => {
    setReloadCount((currentCount) => currentCount + 1);
  }, []);

  return { data, loading, error, refetch };
}
