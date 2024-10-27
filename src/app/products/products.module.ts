import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AdminGuard } from '../authentication/admin.guards';
import { AuthenticationModule } from '../authentication/auth.module';
import { ProductUpdateComponent } from './product-update/product-update.component';

const routes: Routes = [
  {
    path: 'products',
    children: [
      {
        path: 'create',
        component: ProductCreateComponent,
        canActivate: [AdminGuard],
      },
      { path: '', component: ProductListComponent },
      { path: ':productId', component: ProductComponent },
      { path: 'update/:productId', component: ProductUpdateComponent },
      { path: 'category/:categoryId', component: ProductListComponent },
    ],
  },
];

@NgModule({
  declarations: [
    ProductListComponent,
    ProductComponent,
    ProductCreateComponent,
    ProductUpdateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthenticationModule,
    EditorModule,
    RouterModule.forChild(routes),
  ],
  exports: [ProductListComponent, ProductComponent, ProductCreateComponent],
})
export class ProductsModule {}
