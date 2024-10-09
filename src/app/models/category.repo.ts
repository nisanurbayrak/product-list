import { Category } from './category';
export class CategoryRepo {
  private categories: Category[] = [
    { id: 1, categoryName: 'Telefon', isActive: true },
    { id: 2, categoryName: 'Laptop', isActive: true },
    { id: 3, categoryName: 'TV', isActive: false },
  ];

  getCategory() {
    return this.categories.filter((c) => c);
  }
  getCategoryById(id: number) {
    return this.categories.find((c) => c.id == id);
  }
}
