import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { AuthService } from 'src/app/authentication/auth.service';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css'],
})
export class ProductUpdateComponent implements OnInit {
  product: Product | null = null;
  loading: boolean = true;
  isAdmin: boolean = false;
  isAuthenticated: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.loading = true;
      const id = params['productId'];
      this.productService.getProductById(id).subscribe((result) => {
        this.product = { ...result, id: id };
        this.loading = false;
      });
    });

    this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      this.isAdmin = user?.email === environment.adminEmail;
    });
  }

  updateProduct(productForm: NgForm) {
    if (productForm.valid && this.product) {
      this.loading = true;
      this.productService.updateProduct(this.product).subscribe({
        next: () => {
          this.loading = false;
          alert('Product updated successfully!');
          this.router.navigate(['/products']);
        },
        error: (err) => {
          this.loading = false;
          console.error('Update error', err);
        },
      });
    }
  }
}
