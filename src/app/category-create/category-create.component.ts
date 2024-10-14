import { Category } from './../models/category';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css'],
  providers:[CategoryService]
})
export class CategoryCreateComponent implements OnInit {
  categories:Category[]=[];
  error:string="";
  id: any;

  constructor(private categoryService:CategoryService,
    private router: Router,) { }

  ngOnInit(): void {
  }

  saveCategory(id:any,name:any , isActive:any){
    if (name.value==""||name.value.length<5) {
      this.error = "Kategori adı en az 5 harfli olmak zorundadır."
      return;
  }
    const category = {
      id:1,
      name:name.value,
      isActive:isActive.checked,
    }
    this.categoryService
    .createCategory(category)
    .subscribe(data=>{
      this.router.navigate(["/products"]);
    })

  }
}
