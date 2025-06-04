// ... existing code ...
import { API_WORKER_URL } from '@/config/env';

export async function fetchProducts() {
  const response = await fetch(`${API_WORKER_URL}/products`); // Example endpoint
// ... existing code ...
}