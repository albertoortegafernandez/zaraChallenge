export interface ProductColor {
  name: string;
  hexCode: string;
  imageUrl: string;
}

export interface ProductStorage {
  capacity: string;
  price: number;
}

export interface ProductSummary {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
}

export interface ProductSpecs {
  screen?: string;
  resolution?: string;
  processor?: string;
  mainCamera?: string;
  selfieCamera?: string;
  battery?: string;
  os?: string;
  screenRefreshRate?: string;
  [key: string]: string | undefined;
}

export interface ProductDetail extends ProductSummary {
  description?: string;
  rating?: number;
  specs: ProductSpecs;
  colorOptions: ProductColor[];
  storageOptions: ProductStorage[];
  similarProducts: ProductSummary[];
}

export interface CartItem {
  lineId: string;
  productId: string;
  name: string;
  brand: string;
  imageUrl: string;
  color: ProductColor;
  storage: ProductStorage;
  price: number;
}
