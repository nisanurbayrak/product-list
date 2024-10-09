import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoryRepo } from '../models/category.repo';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  categories: Category[];
  selectedCategory: Category | null;
  categoryRepository: CategoryRepo;

  constructor() {
    this.categoryRepository = new CategoryRepo();
    this.categories = this.categoryRepository.getCategory();
  }

  ngOnInit(): void {}

  displayAll = true;

  selectCategory(category?: Category) {
    if (category) {
      this.selectedCategory = category;
      this.displayAll = false;
    } else {
      this.selectedCategory = null;
      this.displayAll = true;
    }
  }
}
