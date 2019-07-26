import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';

import { DeploymentUnit } from 'src/app/models/deploymentunit.model';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { DeploymentunitService } from 'src/app/services/deploymentunit.service';
import { ProtocolTypes} from 'src/app/common/app-constants';

@Component({
  selector: 'app-create-deploymentunit',
  templateUrl: './create-deploymentunit.component.html',
  styles: []
})
export class CreateDeploymentunitComponent implements OnInit {

  constructor(private route: ActivatedRoute , private formBuilder: FormBuilder , private productService : ProductService, private deploymentunitService : DeploymentunitService) {
    this.formBuilder.group({
      protocols: ['']
    });
   }

  deploymentUnit : any =  new Object();
  protocols: any = [];
  deploymentunitTypes: any = [];
  products: Product[];
  activeProduct : Product = new Product;
  isEdit: boolean =false;
  errorList: string[] = [];
  selectedProtocol: number= 1;
  selectedDUType: number= 1;
  ngOnInit() {
    this.protocols = this.deploymentunitService.getProtocols();
    this.deploymentunitTypes = this.deploymentunitService.getDeploymentunitTypes();
    this.activeProduct = this.productService.getActiveProduct();
    if(Object.keys(this.activeProduct).length === 0){
      this.productService.navigateToProducts();
    } else{
      let routeParamId=this.route.snapshot.paramMap.get('id');
      if(routeParamId){
        this.isEdit=true;
        let id= Number(routeParamId);
        this.deploymentunitService.getDeploymentUnitById(this.activeProduct.Id, id).subscribe(res=>{
          if(res && res.Success){
            this.deploymentUnit = res.Data[0];
            this.selectedProtocol = this.deploymentUnit.ProtocolId;
            this.selectedDUType = this.deploymentUnit.DeploymentUnitTypeId;
          }else{
            this.errorList=res.ErrorDetails;
          }
        });
      }
    }
  }
  onClickSubmit(deploymentUnit: any): void {
    console.log(deploymentUnit);
    deploymentUnit = this.createRequest(deploymentUnit);
    if(this.isEdit){
      this.deploymentunitService.updateDeploymentUnit(deploymentUnit).subscribe(res=>{
        if(res && res.Success){
          this.cancel();
        }else{
          this.errorList=res.ErrorDetails;
        }
      });
    } else{
      this.deploymentunitService.createDeploymentUnit(deploymentUnit).subscribe(res=>{
        if(res && res.Success){
          this.cancel();
        }else{
          this.errorList=res.ErrorDetails;
        }
      });
    }
  }
  cancel(): void{
    this.deploymentunitService.navigateToDeploymentUnits();
  }
  private createRequest(obj: any): DeploymentUnit{
    let dUnit= new DeploymentUnit();
    dUnit.Id = obj.Id;
    dUnit.Name = obj.Name;
    dUnit.Description = obj.Description;
    dUnit.ProductId = this.activeProduct.Id;
    dUnit.ProductName = this.activeProduct.Name;
    dUnit.ProtocolId = this.selectedProtocol;
    dUnit.ProtocolName = ProtocolTypes[this.selectedProtocol];
    dUnit.DeploymentUnitTypeId = this.selectedDUType;

    return dUnit;
  }
}
