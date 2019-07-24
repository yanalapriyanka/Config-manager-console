import { Component, OnInit } from '@angular/core';

import {ProductService} from 'src/app/services/product.service';
import {DeploymentunitService} from 'src/app/services/deploymentunit.service';
import {DeploymentUnit} from 'src/app/models/deploymentunit.model';
import { Product } from 'src/app/models/product.model';
import { DUTypes} from 'src/app/common/app-constants';

@Component({
  selector: 'app-deployment-units',
  templateUrl: './deployment-units.component.html',
  styles: []
})
export class DeploymentUnitsComponent implements OnInit {
  deployUnitColumns: any = ['Name', 'Description','DeploymentUnit Type', 'Product' ,'Protocol'];
  deploymentUnits: DeploymentUnit[];
  errorList: string[]; 
  activeProduct : Product = new Product;
  DeploymentunitTypes: any = [];
  DUTypes = DUTypes;
  isActionMenuOpend: boolean;
  activeDU : DeploymentUnit = new DeploymentUnit;
  actionMenus = [];
  constructor(public productService: ProductService, private deploymentunitService: DeploymentunitService) { }

  ngOnInit() {
    this.actionList();
    this.activeProduct = this.productService.getActiveProduct();
    this.DeploymentunitTypes = this.deploymentunitService.getDeploymentunitTypes(); //TODO: bind name of dataunittype
    if(Object.keys(this.activeProduct).length === 0){
      this.productService.navigateToProducts();
    }
    else{
      this.deploymentunitService.fetchDeploymentUnitByProducId(this.activeProduct.Id).subscribe(res=>{
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
  toggleActionMenu(du: any): void {
    this.activeDU = du;
    this.isActionMenuOpend = !this.isActionMenuOpend;    
  }  
  closeActionMenu(): void {
    this.isActionMenuOpend = false;
    console.log('closeActionMenu'); // TODO : implement directive
  }
  setActiveDeployUnit(du : DeploymentUnit):void{
    this.deploymentunitService.setActiveDeployUnit(du);   
  }
  actionList(): void {
    this.actionMenus.push({
      id: 1,
      text: 'Settings',
      routeTo: '/deploymentUnits/configSettings'
    });    
  }
}
