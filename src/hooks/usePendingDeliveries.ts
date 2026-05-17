/**
 * Custom hook for managing pending deliveries state, including fetching, sorting, and refresh functionality.
 * @param {SortBy} [sortBy='none'] - The criteria to sort deliveries by.
 * @returns {{ deliveries: Delivery[], loading: boolean, error: string | null, fetchPendingDeliveries: () => Promise<void>, pullToRefresh: () => void }}
 */
export function usePendingDeliveries(sortBy: SortBy = 'none') {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Sorts an array of deliveries based on the provided sortBy criteria.
   * @param {Delivery[]} deliveriesToSort - The array of deliveries to sort.
   * @returns {Delivery[]} The sorted array of deliveries.
   */
  const sortDeliveries = useCallback((deliveriesToSort: Delivery[]): Delivery[] => {
    if (sortBy === 'none') return deliveriesToSort;

    return [...deliveriesToSort].sort((a, b) => {
      if (sortBy === 'status') {
        return a.status.localeCompare(b.status);
      } else if (sortBy === 'clientName') {
        return a.clientName.localeCompare(b.clientName);
      }
      return 0;
    });
  }, [sortBy]);

  /**
   * Fetches pending deliveries from the API, sorts them, and updates the state.
   */
  const fetchPendingDeliveries = useCallback(async () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const sortDeliveries = useCallback((deliveriesToSort: Delivery[]): Delivery[] => {
    if (sortBy === 'none') return deliveriesToSort;

    return [...deliveriesToSort].sort((a, b) => {
      if (sortBy === 'status') {
        return a.status.localeCompare(b.status);
      } else if (sortBy === 'clientName') {
        return a.clientName.localeCompare(b.clientName);
      }
      return 0;
    });
  }, [sortBy]);

  const fetchPendingDeliveries = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await deliveryService.getPendingDeliveries();
      setDeliveries(sortDeliveries(data));
    } catch (err: any) {
      setError(err.message || 'Failed to fetch pending deliveries');
      setDeliveries([]); // Clear deliveries on error
    } finally {
      setLoading(false);
    }
  }, [sortDeliveries]);

  useEffect(() => {
    fetchPendingDeliveries();
  }, [fetchPendingDeliveries]);

  const pullToRefresh = useCallback(() => {
    // This will trigger a re-fetch of deliveries
    fetchPendingDeliveries();
  }, [fetchPendingDeliveries]);

  return {
    deliveries,
    loading,
    error,
    fetchPendingDeliveries,
    pullToRefresh,
  };
}
