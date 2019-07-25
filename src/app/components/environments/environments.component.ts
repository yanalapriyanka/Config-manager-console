import { Component, OnInit } from '@angular/core';

import {ProductService} from 'src/app/services/product.service';
import {EnvironmentService} from 'src/app/services/environment.service';
import { Product } from 'src/app/models/product.model';
import { Environment } from 'src/app/models/environment.model';

@Component({
  selector: 'app-environments',
  templateUrl: './environments.component.html',
  styles: []
})
export class EnvironmentsComponent implements OnInit {
  envColumns: any = ['Id', 'Name', 'Description', 'Product'];
  environments: Environment[];
  errorList: string[]; 
  activeProduct : Product = new Product;
  isActionMenuOpend: boolean;
  activeEnv : Environment = new Environment;
  actionMenus = [];
  constructor(public productService: ProductService, private environmentService: EnvironmentService) { }
  ngOnInit() {
    this.actionList();
    this.activeProduct = this.productService.getActiveProduct();
    if(Object.keys(this.activeProduct).length === 0){
      this.productService.navigateToProducts();
    }
    else{
      this.environmentService.fetchEnvironmentByProducId(this.activeProduct.Id).subscribe(res=>{
        console.log(res);
        if(res && res.Success){
          this.environments = res.Data;          
          console.log(this.environments);
        } else {
          this.errorList = res.ErrorDetails;
        }      
      });      
    }
  }
  toggleActionMenu(env: any): void {
    this.activeEnv = env;
    this.isActionMenuOpend = !this.isActionMenuOpend;    
  }  
  closeActionMenu(): void {
    this.isActionMenuOpend = false;
    console.log('closeActionMenu'); // TODO : implement directive
  }
  setActiveEnvironment(env : Environment):void{
    this.environmentService.setActiveEnvironment(env);   
  }
  actionList(): void {
    this.actionMenus.push({
      id: 1,
      text: 'Settings',
      routeTo: '/environments/configSettings'
    });    
  }
}
