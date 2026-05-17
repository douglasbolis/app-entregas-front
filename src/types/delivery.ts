/**
 * Represents a single delivery item with its associated details.
 */
export interface Delivery {
  /** Unique identifier for the delivery. */
  id: string;
  /** The name of the client receiving the delivery. */
  clientName: string;
  /** A summarized address for quick display (e.g., street and number). */
  addressSummary: string;
  /** The complete, detailed address for navigation and delivery. */
  fullAddress: string;
  /** The client's phone number, optional. */
  clientPhone?: string;
  /** The current status of the delivery. */
  status: 'pending' | 'out-for-delivery' | 'delivered' | 'address-not-found' | 'client-not-found';
}
