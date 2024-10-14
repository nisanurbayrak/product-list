import { Category } from './category';
export class CategoryRepo {
  private categories: Category[] = [
    { id: 1, name: 'Telefon', isActive: true },
    { id: 2, name: 'Laptop', isActive: true },
    { id: 3, name: 'TV', isActive: false },
  ];

  getCategory() {
    return this.categories.filter((c) => c);
  }
  getCategoryById(id: number) {
    return this.categories.find((c) => c.id == id);
  }
}
