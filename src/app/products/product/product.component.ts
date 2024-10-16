import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/products/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService],
})
export class ProductComponent implements OnInit {
  [x: string]: any;
  product: Product | undefined;
  loading: boolean = false;

  // @Input() prd: Product;
  // @Output() unSelectEvent = new EventEmitter<void>();
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
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
  }

  // unselectProduct() {
  //   this.unSelectEvent.emit();
  // }
}
