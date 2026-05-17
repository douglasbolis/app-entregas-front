import api from './base';
import { Delivery } from '../../types/delivery';

export const historyService = {
  getDeliveryHistory: async (): Promise<Delivery[]> => {
    try {
      const response = await api.get<Delivery[]>('/deliveries/history');
      return response.data;
    } catch (error) {
      console.error('Error fetching delivery history:', error);
      throw new Error('Failed to fetch delivery history');
    }
  },
};
