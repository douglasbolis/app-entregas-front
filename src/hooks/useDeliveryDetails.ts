import { useState, useEffect } from 'react';
import { deliveryService } from '../services/api/deliveryService';
import type { Delivery } from '../types/delivery';

export function useDeliveryDetails(deliveryId: string) {
  const [delivery, setDelivery] = useState<Delivery | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeliveryDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await deliveryService.getDeliveryDetails(deliveryId);
        setDelivery(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch delivery details');
        setDelivery(null);
      } finally {
        setLoading(false);
      }
    };

    if (deliveryId) {
      fetchDeliveryDetails();
    } else {
      setLoading(false);
    }
  }, [deliveryId]);

  return {
    delivery,
    loading,
    error,
  };
}
