import { Product } from './product';
//model tanımlayarak türlerini belirleyeceğiz

export class ProductRepo {
  private products: Product[] = [
    {
      id: '',
      price: 0,
      name: '',
      isActive: false,
      image: '',
      desc: '',
      categoryId: 0,
    },
  ];
  getProducts() {
    return this.products.filter((p) => p.isActive);
  }

  getProductById(id: number): Product | undefined {
    return this.products.find((p) => p.id == id);
  }

  getProductsByCategoryId(id: number): Product[] {
    return this.products.filter((p) => p.categoryId == id);
  }
}
