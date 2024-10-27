import { Category } from './../../categories/category.model';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../products/product.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../categories/category.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
  providers: [CategoryService],
})
export class ProductCreateComponent implements OnInit {
  updatePlainText($event: any) {
    throw new Error('Method not implemented.');
  }
  categories: Category[] = [];
  error: string = '';
  model: any = {
    categoryId: '0',
  }; //two way binding

  constructor(
    private productService: ProductService,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  saveProduct(form: NgForm) {
    const product = {
      id: 1,
      name: this.model.name,
      price: this.model.price,
      isActive: this.model.isActive,
      image: this.model.image,
      desc: this.model.desc,
      categoryId: this.model.categoryId,
    };

    const extentions = ['jpeg', 'jpg', 'png'];
    const extention = this.model.image.split('.').pop();

    if (extentions.indexOf(extention) == -1) {
      this.error = 'Please upload an image in jpeg, jpg, or png format.';
      return;
    }
    if (this.model.categoryId.value == 0) {
      this.error = 'The category field cannot be left empty.';
      return;
    }
    if (form.valid) {
      this.productService.createProduct(product).subscribe((data) => {
        this.router.navigate(['/products']);
      });
    } else {
      this.error = 'Please check the form.';
      return;
    }
  }
}
