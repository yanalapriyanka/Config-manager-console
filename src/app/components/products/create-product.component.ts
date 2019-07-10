import { Component, OnInit } from '@angular/core';

import{ProductService} from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styles: []
})
export class CreateProductComponent implements OnInit {

  constructor(private productService:ProductService){

  }
  errorList : string[];
  ngOnInit() {
  }
  //TODO: update any to Product
  onClickSubmit(product: any): void {
    console.log(product);
    this.productService.createProduct(product).subscribe(res=>{
      if(res && res.Success){
        console.log(res.Message);
      }else{
        this.errorList=res.ErrorDetails;
      }
    })
  }
}
