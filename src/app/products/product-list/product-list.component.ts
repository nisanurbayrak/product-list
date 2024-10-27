import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  // providers: [ProductService], //inject edilen değeri burada tanımlıyorsun. hangi compta kullanacaksan ekle.
})
export class ProductListComponent implements OnInit {
  // selectedProduct: Product | null;
  //defaultu true olan "strictPropertyInitialization": false değerini false yaptık çünkü; obje için initialition(veri atamasını constructor içerisinde yapmasını engelliyoruz)
  //compiler option içerisine tsconfigte
  products: Product[] = [];
  loading: boolean = false;
  private router: Router;
  heartedProducts: Set<number> = new Set(); // Kalp durumunu takip etmek için Set

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.loading = true;
      this.productService
        .getProducts(params['categoryId'])
        .subscribe((data) => {
          this.products = data;
          this.loading = false;
        });
    });
  }
  deleteProductById(id: string) {
    this.productService.deleteProductById(id).subscribe((data) => {
      this.router.navigate(['/products']);
    });
  }
  toggleHeart(productId: number) {
    if (this.isHearted(productId)) {
      this.heartedProducts.delete(productId);
    } else {
      this.heartedProducts.add(productId);
    }
  }

  isHearted(productId: number): boolean {
    return this.heartedProducts.has(productId);
  }
}
