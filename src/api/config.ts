const DEFAULT_BASE_URL = 'https://prueba-tecnica-api-tienda-moviles.onrender.com';
const DEFAULT_API_KEY = '87909682e6cd74208f41a6ef39fe4191';

declare const __API_BASE_URL__: string | undefined;
declare const __API_KEY__: string | undefined;

const resolve = (name: '__API_BASE_URL__' | '__API_KEY__'): string | undefined => {
  try {
    const value = name === '__API_BASE_URL__' ? __API_BASE_URL__ : __API_KEY__;
    return typeof value === 'string' ? value : undefined;
  } catch {
    return undefined;
  }
};

export const API_BASE_URL = resolve('__API_BASE_URL__') || DEFAULT_BASE_URL;
export const API_KEY = resolve('__API_KEY__') || DEFAULT_API_KEY;
