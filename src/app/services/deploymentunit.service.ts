import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

import { DeploymentUnitResponse } from '../models/deploymentunit.response.model';
import { DeploymentUnit } from '../models/deploymentunit.model';
import { ServiceProvider } from '../providers/service-provider';
import { Constants, ProtocolTypes , DUTypes} from '../common/app-constants';
import { ApiResponse } from '../models/api-response.model';
import { SettingResponse } from '../models/setting.response.model';

@Injectable({
  providedIn: 'root'
})
export class DeploymentunitService extends ServiceProvider {
  
  activeDeployUnit: DeploymentUnit = new DeploymentUnit; 
  setActiveDeployUnit(du : DeploymentUnit){
    this.activeDeployUnit = du;
  }
  getActiveDeployUnit() : DeploymentUnit{
    return this.activeDeployUnit;
  }
  /**
   * Type of Protocols
   */
  getProtocols() {
    return [
      {ProtocolId :1 , ProtocolName: ProtocolTypes[1]},
      {ProtocolId :2 , ProtocolName: ProtocolTypes[2]},
      {ProtocolId :3 , ProtocolName: ProtocolTypes[3]}
    ];
  }
  /**
   * Type of Deployment Units
   */
  getDeploymentunitTypes(){
    return[
      { Id: 1, Name: DUTypes[1] },
      { Id: 2, Name: DUTypes[2] }
    ]
  }
  /**
   * Get Deployment unit by product id and deployment id
   * @param productId 
   * @param deploymentUnitId 
   */
  getDeploymentUnitById(productId,deploymentUnitId):Observable<DeploymentUnitResponse>{
    let url = this.utility.formatString(Constants.ApiCalls.getDeploymentUnitById, [productId,deploymentUnitId]);
    return this.get(url).pipe(map(output=>this.mapDeploymentUnitDetails(output)));
  }

  /**
   * fetches the product by id
   */
  fetchDeploymentUnitByProducId(id):Observable<DeploymentUnitResponse>{
    let url = this.utility.formatString(Constants.ApiCalls.getDeploymentUnitsByProductId, [id]);
    return this.get(url).pipe(map(output=>this.mapDeploymentUnitDetails(output)));
  }
  /**
   * Create DeploymentUnit
   * @param DeploymentUnit
   */
  createDeploymentUnit(deploymentUnitModel:DeploymentUnit):Observable<ApiResponse>{
    let url = this.utility.formatString(Constants.ApiCalls.createDeploymentUnit, [deploymentUnitModel.ProductId]);
    return this.post(url,deploymentUnitModel).pipe(map(output=>this.mapDeploymentUnit(output)));
  }
  /**
   * Update DeploymentUnit
   * @param DeploymentUnit
   */
  updateDeploymentUnit(deploymentUnitModel:DeploymentUnit):Observable<ApiResponse>{
    let url = this.utility.formatString(Constants.ApiCalls.updateDeploymentUnit, [deploymentUnitModel.ProductId,deploymentUnitModel.Id]);
    return this.put(url ,deploymentUnitModel).pipe(map(output=>this.mapDeploymentUnit(output)));
  }
  /**
   * Configure DeployUnit settings
   * @param productId
   * @param DUId
   * @param settingsModel
   */
  configureDeployUnitSettings( productId:number, DUId: number , settingsModel: any):Observable<ApiResponse>{
    let url = this.utility.formatString(Constants.ApiCalls.configureDeployUnitSettings,[productId,DUId]);
    return this.post(url, settingsModel).pipe(map(output=>this.mapDeploymentUnit(output)));
  }
  /**
   * Get DeployUnit settings
   * @param productId
   * @param DUId
   */
  getDeployUnitSettings( productId:number, DUId: number):Observable<SettingResponse>{
    let url = this.utility.formatString(Constants.ApiCalls.getDeployUnitSettings,[productId,DUId]);
    return this.get(url).pipe(map(output=>this.mapDeployUnitSettings(output)));
  }

  navigateToDeploymentUnits(){
    this.router.navigate(['/deploymentUnits']);
  }
  private mapDeploymentUnitDetails(response: any): DeploymentUnitResponse {
    var result: DeploymentUnitResponse;
    try {

      if (response) {
        result = response as DeploymentUnitResponse;
      }
    }
    catch (error) {
      // console.log(error);
    }
    return result;
  }
  private mapDeploymentUnit(response: any): ApiResponse {
    var result: ApiResponse;
    try {

      if (response) {
        result = response as ApiResponse;
      }
    }
    catch (error) {
      // console.log(error);
    }
    return result;
  }
  private mapDeployUnitSettings(response:any):SettingResponse{
    var result: SettingResponse;
    try {

      if (response) {
        result = response as SettingResponse;
      }
    }
    catch (error) {
      // console.log(error);
    }
    return result;
  }
}
