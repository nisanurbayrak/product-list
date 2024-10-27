import { Category } from './../category.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { AuthService } from 'src/app/authentication/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css'],
  providers: [CategoryService],
})
export class CategoryCreateComponent implements OnInit {
  error: string = '';
  selectedCategoryId: string = '';
  category: Category[];
  model: any = {
    id: '',
    name: '',
  };
  loading: boolean = false;
  isAdmin: boolean = false;
  isAuthenticated: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    if (this.authService && this.authService.user) {
      this.authService.user.subscribe((user) => {
        this.isAuthenticated = !!user;
        this.isAdmin = user?.email === environment.adminEmail;
      });
    }
  }

  saveCategory(name: any) {
    if (name.value == '' || name.value.length < 5) {
      this.error = 'Category name must be at least 5 characters long.';
      return;
    }
    this.categoryService
      .createCategory({ id: 0, name: name.value })
      .subscribe((data) => {
        alert('Category saved successfully!');
        window.location.href = '/products';
      });
  }
  loadCategories() {
    this.categoryService.getCategories().subscribe((data) => {
      this.category = data;
    });
  }
  onCategoryChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const categoryId = selectElement.value;
    const selected = this.category.find((cat) => cat.id === categoryId);

    this.selectedCategoryId = selected ? selected.id : '';
    this.model.name = selected ? selected.name : '';
  }

  updateCategory() {
    if (this.selectedCategoryId && this.model.name) {
      const categoryModel: Category = {
        id: this.selectedCategoryId,
        name: this.model.name,
      };

      this.categoryService
        .updateCategory(this.selectedCategoryId, categoryModel)
        .subscribe({
          next: () => {
            alert('Category updated successfully!');
            window.location.href = '/products';
          },
          error: (err) => {
            console.error('Güncelleme hatası', err);
          },
        });
    } else {
      this.error = 'You must select a category to update and enter a new name.';
    }
  }
  deleteProductById(id: string) {
    if (!this.isAuthenticated || !this.isAdmin) {
      alert('You do not have permission to perform this action.');
      return;
    }
    this.categoryService.deleteCategoryById(id).subscribe({
      next: () => {
        alert('Category deleted successfully.');
        window.location.href = '/';
      },
      error: (error) => {
        console.error('Kategori silme işlemi başarısız:', error);
        alert(
          'An error occurred while deleting the category. Please try again.'
        );
      },
    });
  }
}
