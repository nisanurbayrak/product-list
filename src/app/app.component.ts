import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProductService } from './services/product.service';

@Component({
  selector: '#app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductService],
})
export class AppComponent {
  private title = 'home page';
  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) {}
  getTitle() {
    return this.title;
  }
  createProduct() {
    const product = {
      id: 1,
      price: 20000,
      name: 'iphone 10',
      isActive: true,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBuf9R-kVvMuTJkp5BCtU2c4QSBAD2aTuMcQ&s',
      text: 'telefon 11',
      desc: 'Model: iPhone 11\nEkran: 6.1 inç, Super Retina XDR display\nÇözünürlük: 2532 x 1170 piksel\nYonga Seti: A14 Bionic chip\nArka Kamera: 12 MP (geniş ve ultra geniş)',
      categoryId: 2,
    };
    this.productService
      .createProducts(product)
      .subscribe((data) => console.log(data));
  }
}
