import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from 'src/app/models/product.model';
import { Environment } from 'src/app/models/environment.model';
import {EnvironmentService} from 'src/app/services/environment.service';
import { ProductService } from 'src/app/services/product.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-create-environment',
  templateUrl: './create-environment.component.html',
  styles: []
})
export class CreateEnvironmentComponent implements OnInit {

  constructor(private route: ActivatedRoute ,private environmentService:EnvironmentService,private productService : ProductService) { }

  environment : Environment =  new Environment();
  activeProduct : Product = new Product;
  isEdit: boolean =false;
  errorList: string[] = [];

  ngOnInit() {
    this.activeProduct = this.productService.getActiveProduct();
    if(Object.keys(this.activeProduct).length === 0){
      this.productService.navigateToProducts();
    } else{
      let routeParamId=this.route.snapshot.paramMap.get('id');
      if(routeParamId){
        this.isEdit=true;
        let id= Number(routeParamId);
        this.environmentService.getEnvironmentById(this.activeProduct.Id, id).subscribe(res=>{
          if(res && res.Success){
            this.environment = res.Data[0];
          }else{
            this.errorList=res.ErrorDetails;
          }
        });
      }
    }
  }
  onClickSubmit(environment: Environment): void {
    console.log(environment);
    environment.ProductId = this.activeProduct.Id;
    environment.ProductName = this.activeProduct.Name;
    if(this.isEdit){
      this.environmentService.updateEnvironment(environment).subscribe(res=>{
        if(res && res.Success){
          this.cancel();
        }else{
          this.errorList=res.ErrorDetails;
        }
      });
    } else{
      this.environmentService.createEnvironment(environment).subscribe(res=>{
        if(res && res.Success){
          this.cancel();
        }else{
          this.errorList=res.ErrorDetails;
        }
      });
    }
  }
  cancel(): void {
    this.environmentService.navigateToEnvironments();
  }
}
