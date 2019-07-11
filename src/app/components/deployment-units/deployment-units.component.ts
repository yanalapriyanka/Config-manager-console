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
  deployUnitColumns: any = ['Id', 'Name', 'Country'];
  deploymentUnit: DeploymentUnit[];
  errorList: string[]; 
  activeProduct : Product = new Product;
  constructor(public productService: ProductService, private deployementunitService: DeploymentunitService) { }

  ngOnInit() {
    this.activeProduct = this.productService.getActiveProduct();
    this.deployementunitService.fetchDeploymentUnitByProducId(this.activeProduct.Id).subscribe(res=>{
        console.log(res);
        if(res && res.Success){
          this.deploymentUnit = res.Data;
          console.log(this.deploymentUnit);
        } else {
          this.errorList = res.ErrorDetails;
        }      
    });
  }

}
