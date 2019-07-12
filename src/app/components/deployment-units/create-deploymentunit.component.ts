import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";

import { DeploymentUnit } from 'src/app/models/deploymentunit.model';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { DeploymentunitService } from 'src/app/services/deploymentunit.service';

@Component({
  selector: 'app-create-deploymentunit',
  templateUrl: './create-deploymentunit.component.html',
  styles: []
})
export class CreateDeploymentunitComponent implements OnInit {

  constructor(private formBuilder: FormBuilder , private productService : ProductService, private deploymentunitService : DeploymentunitService) {
    this.formBuilder.group({
      protocols: ['']
    });
    this.protocols = this.deploymentunitService.getProtocols();
    this.DeploymentunitTypes = this.deploymentunitService.getDeploymentunitTypes();
   }

  deploymentUnit : any =  new Object();
  protocols: any = [];
  DeploymentunitTypes: any = [];
  products: Product[];
  activeProduct : Product = new Product;
  isEdit: boolean =false;
  errorList: string[];
  ngOnInit() {    
    this.activeProduct = this.productService.getActiveProduct();
    if(Object.keys(this.activeProduct).length === 0){
      this.productService.navigateToProducts();
    }
    else{
       /* Intialize default values */
       this.deploymentUnit.Protocal = null;
       this.deploymentUnit.DeploymentUnitType = null;
       this.products = this.productService.getProducts(); //TODO: not in use
    }
  }
  onClickSubmit(deploymentUnit: any): void {
    console.log(deploymentUnit);
    deploymentUnit = this.createRequest(deploymentUnit);
    if(this.isEdit){
      this.deploymentunitService.updateDeploymentUnit(deploymentUnit).subscribe(res=>{
        if(res && res.Success){
          console.log(res.Message);
        }else{
          this.errorList=res.ErrorDetails;
        }
      });
    } else{
      this.deploymentunitService.createDeploymentUnit(deploymentUnit).subscribe(res=>{
        if(res && res.Success){
          console.log(res.Message);
        }else{
          this.errorList=res.ErrorDetails;
        }
      });
    }    
  }  
  private createRequest(obj: any): DeploymentUnit{
    let dUnit= new DeploymentUnit();
    dUnit.Name = obj.Name;
    dUnit.Description = obj.Description;
    dUnit.ProductId = this.activeProduct.Id;
    dUnit.ProductName = this.activeProduct.Name;
    dUnit.ProtocolId = obj.Protocal ? obj.Protocal.ProtocolId : -1;
    dUnit.ProtocolName = obj.Protocal ? obj.Protocal.ProtocolName : '';
    dUnit.DeploymentUnitTypeId = obj.DeploymentUnitType ? obj.DeploymentUnitType.Id : -1;

    return dUnit;
  } 
}
