import { ProductService } from 'src/app/products/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/products/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private productService: ProductService) {}
  loading: boolean = true;
  recentProducts: Product[] = [];

  ngOnInit(): void {
    this.fetchRecentProducts(); // Bileşen başlatıldığında ürünleri getir
  }
  fetchRecentProducts(): void {
    this.productService.getRecentProduct().subscribe((products: Product[]) => {
      this.recentProducts = products;
      this.loading = false;
    });
  }
}
