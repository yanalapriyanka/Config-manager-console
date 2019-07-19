import { Component, OnInit } from '@angular/core';

import {ProductService} from 'src/app/services/product.service';
import {SettingService} from 'src/app/services/settings.service';
import { Product } from 'src/app/models/product.model';
import { Setting } from 'src/app/models/setting.model';
import {ConfigSettingTypes} from 'src/app/common/app-constants';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styles: []
})
export class SettingsComponent implements OnInit {
  settingColumns: any = ['Id', 'Name', 'Description', 'Product', 'Setting Type'];
  settings : Setting[];
  errorList: string[]; 
  ConfigSettingTypes = ConfigSettingTypes;
  activeProduct : Product = new Product;
  constructor(public productService: ProductService, private settingService: SettingService) { }
  ngOnInit() {
    this.activeProduct = this.productService.getActiveProduct();
    if(Object.keys(this.activeProduct).length === 0){
      this.productService.navigateToProducts();
    }
    else{
      this.settingService.fetchSettingByProducId(this.activeProduct.Id).subscribe(res=>{
        console.log(res);
        if(res && res.Success){
          this.settings = res.Data;          
          console.log(this.settings);
        } else {
          this.errorList = res.ErrorDetails;
        }      
      });      
    }
  }

}
