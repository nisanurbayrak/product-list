import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductRepo } from '../models/product.repo';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  // selectedProduct: Product | null;
  //defaultu true olan "strictPropertyInitialization": false değerini false yaptık çünkü; obje için initialition(veri atamasını constructor içerisinde yapmasını engelliyoruz)
  //compiler option içerisine tsconfigte
  products: Product[];
  productRepo: ProductRepo;

  constructor(private route: ActivatedRoute) {
    this.productRepo = new ProductRepo();
    this.products = this.productRepo.getProducts();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['categoryId']) {
        this.products = this.productRepo.getProductsByCategoryId(
          params['categoryId']
        );
      } else {
        this.products = this.productRepo.getProducts();
      }
    });
  }

  // selectProduct(product: Product) {
  //   this.selectedProduct = product;
  // }
  // unselectProduct() {
  //   this.selectedProduct = null;
  // }
}
