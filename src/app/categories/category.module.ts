import { NgModule } from '@angular/core';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthenticationModule } from '../authentication/auth.module';
import { AdminGuard } from '../authentication/admin.guards';

@NgModule({
  declarations: [CategoryCreateComponent, CategoryListComponent],
  imports: [
    CommonModule,
    FormsModule,
    AuthenticationModule,
    RouterModule.forChild([
      {
        path: 'categories/create',
        component: CategoryCreateComponent,
        canActivate: [AdminGuard],
      },
    ]),
  ],
  exports: [CategoryCreateComponent, CategoryListComponent],
})
export class CategoryModule {}
