import { NgModule } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product-list/product/product.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { AuthComponent } from './auth/auth.component';
import { AdminGuard } from './guards/admin-guards';
import { UserGuard } from './guards/user-guards';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'products/create',
    component: ProductCreateComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'categories/create',
    component: CategoryCreateComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'products',
    component: ProductListComponent,
    // canActivate: [UserGuard],
  },
  { path: 'products/:productId', component: ProductComponent },
  { path: 'category/:categoryId', component: ProductListComponent },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
