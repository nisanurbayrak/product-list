import { Product } from 'src/app/models/product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, exhaustMap, map, Observable, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

//local service
@Injectable() // herhangi bir servis gondermediğimiz için
export class ProductService {
  private url = 'https://shopapp-b8412-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient, private authService: AuthService) {}
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
      tap((data) => console.log(data)),
      delay(450)
    );
  }

  createProducts(product: Product): Observable<Product> {
    return this.authService.user.pipe(
      take(1),
      tap((user) => console.log(user)),
      exhaustMap((user) => {
        return this.http
          .post<Product>(
            this.url + 'products.json?auth=' + user?.token,
            product
          )
          .pipe(delay(350));
      })
    );
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(this.url + 'products/' + id + '.json');
  }
}
