import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import{ ProductService } from 'src/app/services/product.service';
import {Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styles: []
})
export class CreateProductComponent implements OnInit {

  constructor(private route: ActivatedRoute, private productService:ProductService){
  }
  errorList : string[] = [];
  product : Product = new Product();
  isEdit: boolean =false;
  ngOnInit() {
    let routeParamId=this.route.snapshot.paramMap.get('id');
    if(routeParamId){
      this.isEdit=true;
      let id= Number(routeParamId);
      this.productService.fetchProductById(id).subscribe(res=>{
        if(res && res.Success){
          this.product = res.Data[0];
        }else{
          this.errorList=res.ErrorDetails;
        }
      });
    }
  }
  //TODO: update any to Product
  onClickSubmit(product: Product): void {
    console.log(product);
    if(this.isEdit){
      this.productService.updateProduct(product).subscribe(res=>{
        if(res && res.Success){
          this.cancel();
        }else{
          this.errorList=res.ErrorDetails;
        }
      });
    } else{
      this.productService.createProduct(product).subscribe(res=>{
        if(res && res.Success){
          this.cancel();
        }else{
          this.errorList=res.ErrorDetails;
        }
      });
    }
  }
  // cancel product
 cancel(): void {
    this.productService.navigateToProducts();
  }
}
