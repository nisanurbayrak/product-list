import { Product } from 'src/app/models/product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

//local service
@Injectable() // herhangi bir servis gondermediğimiz için
export class ProductService {
  private url = 'https://shopapp-b8412-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) {}
  getProducts(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + 'products.json').pipe(
      //bir filtreleme yaptığımda gelen product bilgileriyle yeni bir liste oluşturup verebiliyorum. map dışındaki operatörleri de kullabilirsin.
      map((data) => {
        const products: Product[] = [];

        for (const key in data) {
          if (categoryId) {
            if (categoryId == data[key].categoryId) {
              products.push({ ...data[key], id: key });
            }
          } else {
            products.push({ ...data[key], id: key });
          }
        }

        return products;
      }),
      tap((data) => console.log(data))
    );
  }

  createProducts(product: Product): Observable<Product> {
    return this.http.post<Product>(this.url + 'products.json', product);
  }
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(this.url + 'products/' + id + '.json');
  }
}
