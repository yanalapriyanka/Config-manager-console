import { Component, OnInit } from '@angular/core';

import {ProductService} from 'src/app/services/product.service';
import {SettingService} from 'src/app/services/settings.service';
import { Product } from 'src/app/models/product.model';
import { Setting } from 'src/app/models/setting.model';
import { Environment } from 'src/app/models/environment.model';
import {EnvironmentService} from 'src/app/services/environment.service';
import { EnvironmentConfigSettingRequest } from 'src/app/models/environment-config-settings-request.model';
import { EnvironmentConfiguredSetting } from 'src/app/models/environment-configured-settings.model';

@Component({
    selector: 'app-map-du-settings',
    templateUrl: './environment-config-settings.component.html',
    styles: []
  })
  export class environmentSettings {
    activeProduct : Product = new Product;
    activeEnvironment : Environment = new Environment; 
    errorList: string[];
    environmentSettings: EnvironmentConfigSettingRequest[] = [];

    constructor(public productService: ProductService, private settingService: SettingService, private environmentService: EnvironmentService) { }
    ngOnInit() {
        this.activeProduct = this.productService.getActiveProduct();
        this.activeEnvironment = this.environmentService.getActiveEnvironment();
        if(Object.keys(this.activeProduct).length === 0 || Object.keys(this.activeEnvironment).length === 0){
            this.productService.navigateToProducts();
        }
        else{
            //All settings
            let configurationSettings : Setting[], envConfiguredSettings : EnvironmentConfiguredSetting[];  
            this.settingService.fetchSettingByProducId(this.activeProduct.Id).subscribe(res=>{
                console.log(res);
                if(res && res.Success){
                    configurationSettings = res.Data;                     
                    //environment settings
                    this.environmentService.getEnvironmentSettings(this.activeProduct.Id,this.activeEnvironment.Id).subscribe(res=>{
                        if(res && res.Data){
                            envConfiguredSettings = res.Data;
                            this.getEnvironmentConfiguredSettings(configurationSettings, envConfiguredSettings);
                        }    
                    });      
                }    
            });      
           
        }
    }
    private getEnvironmentConfiguredSettings(configurationSettings: Setting[], envConfiguredSettings: EnvironmentConfiguredSetting[]):void{
        configurationSettings.forEach(setting => {
            let envSetting: EnvironmentConfigSettingRequest= {Id:setting.Id, Name: setting.Name, Value: ""};
            envConfiguredSettings.forEach(configuredSettings=>{
                if(configuredSettings.ConfigurationSettingId == setting.Id){
                    envSetting.Value= configuredSettings.Value;
                }
            });
            this.environmentSettings.push(envSetting);
        });  
    }
    navigateEnvironments() : void {
        this.environmentService.navigateToEnvironments();
    } 
    saveEnvironmentConfigSettings(): void {       
        this.environmentService.configureEnvironmentSettings(this.activeProduct.Id,this.activeEnvironment.Id, this.getEnvironmentSettingVlues()).subscribe(res=>{
            if(res && res.Success){ 
                console.log(res.Message);           
              //this.deploymentunitService.navigateToDeploymentUnits();
            }else{
              this.errorList=res.ErrorDetails;
            }
        });
    }
    private getEnvironmentSettingVlues(): any {
        let settingValues={           
            Settings : this.environmentSettings
        }  
        return settingValues;
    }     
  }
