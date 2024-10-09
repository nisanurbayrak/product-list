export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  text: string;
  isActive: boolean;
  desc: string;
  categoryId?: number;
}
