import type { Delivery } from '../../types/delivery';
import api from './base';

/**
 * Service for interacting with delivery-related API endpoints.
 */
export const deliveryService = {
  /**
   * Fetches a list of pending deliveries.
   * @returns {Promise<Delivery[]>} A promise that resolves to an array of pending deliveries.
   * @throws {Error} If the API call fails.
   */
  getPendingDeliveries: async (): Promise<Delivery[]> => {
    try {
      const response = await api.get<Delivery[]>('/api/deliveries/pending');
      return response.data;
    } catch (error) {
      console.error('Error fetching pending deliveries:', error);
      throw new Error('Failed to fetch pending deliveries');
    }
  },

  /**
   * Fetches the detailed information for a specific delivery by its ID.
   * @param {string} id - The ID of the delivery to fetch.
   * @returns {Promise<Delivery>} A promise that resolves to the detailed delivery object.
   * @throws {Error} If the API call fails or the delivery is not found.
   */
  getDeliveryDetails: async (id: string): Promise<Delivery> => {
    try {
      const response = await api.get<Delivery>(`/api/deliveries/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching delivery details for ID ${id}:`, error);
      throw new Error(`Failed to fetch delivery details for ID ${id}`);
    }
  },
};
