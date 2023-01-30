export interface product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: object;
  quantity: undefined | number;
  productId: undefined | number;
}

export interface signup {
  name: string;
  email: string;
  password: string;
}
export interface login {
  email: string;
  password: string;
}

export interface cart {
  id: number | undefined;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: object;
  quantity: undefined | number;
  userId: number;
  productId: number;
}

export interface priceSummary{
  price: number,
  discount: number,
  tax: number,
  delivery: number,
  total: number
}