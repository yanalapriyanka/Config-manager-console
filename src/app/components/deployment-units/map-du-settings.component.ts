import { Component, OnInit } from '@angular/core';
import { CdkDrag, moveItemInArray, CdkDragDrop, CdkDragEnter} from '@angular/cdk/drag-drop';

import {ProductService} from 'src/app/services/product.service';
import {SettingService} from 'src/app/services/settings.service';
import { Product } from 'src/app/models/product.model';
import { Setting } from 'src/app/models/setting.model';
import { DeploymentUnit } from 'src/app/models/deploymentunit.model';
import {DeploymentunitService} from 'src/app/services/deploymentunit.service';

@Component({
    selector: 'app-map-du-settings',
    templateUrl: './map-du-settings.component.html',
    styles: []
  })
  export class MapDUSettings {
    activeProduct : Product = new Product;
    activeDeployUnit : DeploymentUnit = new DeploymentUnit;
    configSettings : Setting[];    
    mappedSettings: number[] =[];
    errorList: string[];
    constructor(public productService: ProductService, private settingService: SettingService, private deploymentunitService: DeploymentunitService) { }
    ngOnInit() {
        this.activeProduct = this.productService.getActiveProduct();
        this.activeDeployUnit = this.deploymentunitService.getActiveDeployUnit();
        if(Object.keys(this.activeProduct).length === 0 || Object.keys(this.activeDeployUnit).length === 0){
            this.productService.navigateToProducts();
        }
        else{
            //All settings
            this.settingService.fetchSettingByProducId(this.activeProduct.Id).subscribe(res=>{
                console.log(res);
                if(res && res.Success){
                this.configSettings = res.Data;          
                console.log(this.configSettings);
                } else {
                    //this.errorList = res.ErrorDetails;
                }      
            });      
            //Deploy unit settings
            this.deploymentunitService.getDeployUnitSettings(this.activeProduct.Id,this.activeDeployUnit.Id).subscribe(res=>{
                console.log(res);
                if(res && res.Success){
                    res.Data.forEach(setting => {
                        this.mappedSettings.push(setting.ConfigurationSettingTypeId);
                    });   
                } else {
                    //this.errorList = res.ErrorDetails;
                }      
            });      
        }
    }
    configureDeployUnitSettings(): void {
        let configObj={           
            Settings: this.mappedSettings
        }
        this.deploymentunitService.configureDeployUnitSettings(this.activeProduct.Id,this.activeDeployUnit.Id, configObj).subscribe(res=>{
            if(res && res.Success){
              this.deploymentunitService.navigateToDeploymentUnits();
            }else{
              this.errorList=res.ErrorDetails;
            }
          });
      }  
    drop(event: CdkDragDrop<Setting[]>){
        console.log(event.previousIndex);
        let mapSetting= this.configSettings[event.previousIndex].Id;
        this.mappedSettings.push(mapSetting);
        console.log(this.mappedSettings);
    }
    drag(event: CdkDragEnter<Setting[]>){
        console.log(event);
    }    
  }
