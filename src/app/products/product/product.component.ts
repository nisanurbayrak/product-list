import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/products/product.model';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService],
})
export class ProductComponent implements OnInit {
  product: Product | undefined;
  loading: boolean = false;
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
  deleteProductById(id: string) {
    if (!this.isAuthenticated || !this.isAdmin) {
      alert('Bu işlemi gerçekleştirmek için yetkiniz yok.');
      return;
    }

    this.productService.deleteProductById(id).subscribe({
      next: () => {
        alert('Ürün başarıyla silindi.');
        this.router.navigate(['/']); // Ana sayfaya yönlendir
      },
      error: (error) => {
        console.error('Ürün silme işlemi başarısız:', error);
        alert('Ürün silinirken bir hata oluştu. Lütfen tekrar deneyin.');
      },
    });
  }
}
