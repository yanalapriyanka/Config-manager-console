import { Component, OnInit } from '@angular/core';

import {ProductService} from 'src/app/services/product.service';
import {DeploymentunitService} from 'src/app/services/deploymentunit.service';
import {DeploymentUnit} from 'src/app/models/deploymentunit.model';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-deployment-units',
  templateUrl: './deployment-units.component.html',
  styles: []
})
export class DeploymentUnitsComponent implements OnInit {
  deployUnitColumns: any = ['Name', 'Description','Product' ,'Protocol'];
  deploymentUnits: DeploymentUnit[];
  errorList: string[]; 
  activeProduct : Product = new Product;
  constructor(public productService: ProductService, private deployementunitService: DeploymentunitService) { }

  ngOnInit() {
    this.activeProduct = this.productService.getActiveProduct();
    if(Object.keys(this.activeProduct).length === 0){
      this.productService.navigateToProducts();
    }
    else{
      this.deployementunitService.fetchDeploymentUnitByProducId(this.activeProduct.Id).subscribe(res=>{
        console.log(res);
        if(res && res.Success){
          this.deploymentUnits = res.Data;
          console.log(this.deploymentUnits);
        } else {
          this.errorList = res.ErrorDetails;
        }      
      });      
    }
  }

}
