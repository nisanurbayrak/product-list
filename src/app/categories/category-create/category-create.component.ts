import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { Category } from '../category.model';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css'],
  providers: [CategoryService],
})
export class CategoryCreateComponent implements OnInit {
  error: string = '';

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  saveCategory(name: any) {
    if (name.value == '' || name.value.length < 5) {
      this.error = 'Kategori adı en az 5 harfli olmak zorundadır.';
      return;
    }
    this.categoryService
      .createCategory({ id: 0, name: name.value })
      .subscribe((data) => {
        this.router.navigate(['/products']);
      });
  }
}
