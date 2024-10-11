export interface Product {
  id: any;
  name: string;
  price: number;
  image: string;
  text: string;
  isActive: boolean;
  desc: string;
  categoryId?: number;
}
