import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductRepo } from '../models/product.repo';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService], //inject edilen değeri burada tanımlıyorsun. hangi compta kullanacaksan ekle.
})
export class ProductListComponent implements OnInit {
  // selectedProduct: Product | null;
  //defaultu true olan "strictPropertyInitialization": false değerini false yaptık çünkü; obje için initialition(veri atamasını constructor içerisinde yapmasını engelliyoruz)
  //compiler option içerisine tsconfigte
  products: Product[] = [];
  productRepo: ProductRepo;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.productRepo = new ProductRepo();
    this.products = this.productRepo.getProducts();
  }

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

  // selectProduct(product: Product) {
  //   this.selectedProduct = product;
  // }
  // unselectProduct() {
  //   this.selectedProduct = null;
  // }
}
