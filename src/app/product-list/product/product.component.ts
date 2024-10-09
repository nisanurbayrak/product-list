import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductRepo } from 'src/app/models/product.repo';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  product: Product | undefined;
  productRepo: ProductRepo;

  // @Input() prd: Product;
  // @Output() unSelectEvent = new EventEmitter<void>();
  constructor(private route: ActivatedRoute) {
    this.productRepo = new ProductRepo();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['productId'];
      this.product = this.productRepo.getProductById(id);
    });
  }

  // unselectProduct() {
  //   this.unSelectEvent.emit();
  // }
}
