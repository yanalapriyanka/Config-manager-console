import { Component, OnInit } from '@angular/core';

import {ProductService} from 'src/app/services/product.service';
import {SettingService} from 'src/app/services/settings.service';
import { Product } from 'src/app/models/product.model';
import { Setting } from 'src/app/models/setting.model';
import { DeploymentUnit } from 'src/app/models/deploymentunit.model';
import {DeploymentunitService} from 'src/app/services/deploymentunit.service';

@Component({
    selector: 'app-map-du-settings',
    templateUrl: './deployementunit-config-settings.component.html',
    styles: []
  })
  export class deployementunitSettings {
    activeProduct : Product = new Product;
    activeDeployUnit : DeploymentUnit = new DeploymentUnit;
    configurationSettings : Setting[];   
    sourceSettings : Setting[] = [];    
    destinationSettings: Setting[];  
    errorList: string[];
    selectedSourceItem: Number=0;
    selectedDestinationItem: Number=0;
    mappingButtonsTosend: any = [{
        id:1,
        name: 'sourceToDestination-All',
        enable: false,
        class:'doubleGreaterThan'
    },
    {
        id:2,
        name: 'sourceToDestination',
        enable: false,
        class:'greaterThan'
    },
    {
        id:3,
        name: 'destinationToSource',
        enable: false,
        class:'lessThan'
    },{
        id:4,
        name: 'destinationToSource-All',
        enable: false,
        class:'doubleLessThan'
    }]

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
                    this.configurationSettings = res.Data; 
                     //Deploy unit settings
                    this.deploymentunitService.getDeployUnitSettings(this.activeProduct.Id,this.activeDeployUnit.Id).subscribe(res=>{
                        if(res && res.Success){
                        this.destinationSettings = res.Data; 
                        this.getSourceSettings();
                        this.updateArrowSatus();
                        }    
                    });      
                }    
            });      
           
        }
    }    
    saveDeployUnitConfigSettings(): void {       
        this.deploymentunitService.configureDeployUnitSettings(this.activeProduct.Id,this.activeDeployUnit.Id, this.getDestinationSettingIds()).subscribe(res=>{
            if(res && res.Success){ 
                console.log(res.Message);           
              //this.deploymentunitService.navigateToDeploymentUnits();
            }else{
              this.errorList=res.ErrorDetails;
            }
        });
    }       
    selectSourceItem(Id:Number){
        this.selectedSourceItem=Id;
        this.mappingButtonsTosend[1].enable=true;
    }
    selectDestinationItem(Id:Number){
        this.selectedDestinationItem=Id;
        this.mappingButtonsTosend[2].enable=true;
    }
    updateArrowSatus(){  
        this.mappingButtonsTosend[0].enable=this.sourceSettings.length > 0 ? true : false; 
        this.mappingButtonsTosend[3].enable=this.destinationSettings.length > 0 ? true : false;
    }
    clearSelectedArrow(){
        this.selectedSourceItem = this.selectedDestinationItem = 0;
        this.mappingButtonsTosend[1].enable = this.mappingButtonsTosend[2].enable = false;
    }
    sendData(arrowIndex: Number) : void{        
        let selected=null, selectedIndex= -1;
        switch(arrowIndex){
           case 0:
                this.destinationSettings = this.destinationSettings.concat(this.sourceSettings);
               this.sourceSettings = [];
               break;
            case 1:
                this.sourceSettings.forEach((source,index)=>{
                    if(source.Id==this.selectedSourceItem){
                        selected=source;
                        selectedIndex=index;
                    }
                })
                this.sourceSettings.splice(selectedIndex,1);
                this.destinationSettings.push(selected);
                break;
            case 2:                    
                this.destinationSettings.forEach((destination,index)=>{
                    if(destination.Id==this.selectedDestinationItem){
                        selected=destination;
                        selectedIndex=index;
                    }
                });
                this.destinationSettings.splice(selectedIndex,1);
                this.sourceSettings.push(selected);
            break;
            case 3:
                this.sourceSettings = this.sourceSettings.concat(this.destinationSettings);
                this.destinationSettings = []; 
                break;
           
        }
        this.updateArrowSatus();
        this.clearSelectedArrow();
    }
    navigateDeployUnits() : void {
        this.deploymentunitService.navigateToDeploymentUnits();
    } 
    private getSourceSettings():void{
        let destinationIds = this.getDestinationSettingIds();
        this.configurationSettings.forEach(setting => {
            if(destinationIds.Settings.indexOf(setting.Id) < 0){
                this.sourceSettings.push(setting);
            }
        });  
    }
    private getDestinationSettingIds(): any {
        let destinationIds={           
            Settings: []
        }
        this.destinationSettings.forEach(setting => {
            destinationIds.Settings.push(setting.Id);
        });  
        return destinationIds;
    }
  }
