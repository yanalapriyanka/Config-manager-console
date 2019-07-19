import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SettingService } from 'src/app/services/settings.service';
import { ProductService } from 'src/app/services/product.service';
import {Product} from 'src/app/models/product.model';
import { Setting } from 'src/app/models/setting.model';


@Component({
  selector: 'app-create-setting',
  templateUrl: './create-setting.component.html',
  styles: []
})
export class CreateSettingComponent implements OnInit {

  setting : any =  new Object();
  settingTypes: any[];
  selectedSettingType: number= 1;
  activeProduct : Product = new Product;
  isEdit: boolean =false;
  errorList: string[];

  constructor(private route: ActivatedRoute ,private settingService: SettingService, private productService:ProductService) { }

  ngOnInit() {
    this.settingTypes= this.settingService.getSettingTypes();
    this.activeProduct = this.productService.getActiveProduct();
    if(Object.keys(this.activeProduct).length === 0){
      this.productService.navigateToProducts();
    } else{      
      let routeParamId=this.route.snapshot.paramMap.get('id');
      if(routeParamId){
        this.isEdit=true;
        let id= Number(routeParamId);
        this.settingService.getSettingById(this.activeProduct.Id, id).subscribe(res=>{
          if(res && res.Success){
            this.setting = res.Data[0];
            this.selectedSettingType = this.setting.ConfigurationSettingTypeId;
          }else{
            this.errorList=res.ErrorDetails;
          }
        });
      }
    }
  }
  onClickSubmit(setting: any): void {
    console.log(setting);
    setting = this.createRequest(setting);
    if(this.isEdit){
      this.settingService.updateSetting(setting).subscribe(res=>{
        if(res && res.Success){
          this.settingService.navigateToSettings();
        }else{
          this.errorList=res.ErrorDetails;
        }
      });
    } else{
      this.settingService.createSetting(setting).subscribe(res=>{
        if(res && res.Success){
          this.settingService.navigateToSettings();
        }else{
          this.errorList=res.ErrorDetails;
        }
      });
    }    
  }
  private createRequest(obj: any): Setting{
    let setting= new Setting();
    setting.Id = obj.Id;
    setting.Name = obj.Name;
    setting.Description = obj.Description;
    setting.ProductId = this.activeProduct.Id;
    setting.ProductName = this.activeProduct.Name;
    setting.ConfigurationSettingTypeId = this.selectedSettingType;

    return setting;
  } 
}
