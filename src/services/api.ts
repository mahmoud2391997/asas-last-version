
import { User, Product, Sale, Customer } from '../../types';

const API_BASE_URL = '/api';

async function fetchData<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch from ${endpoint}: ${response.statusText}`);
  }
  return response.json();
}

export const getUsers = () => fetchData<User[]>('/users');
export const getProducts = () => fetchData<Product[]>('/products');
export const getSales = () => fetchData<Sale[]>('/sales');
export const getCustomers = () => fetchData<Customer[]>('/customers');

// Add other API functions here as needed
