import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

import { DeploymentUnitResponse } from '../models/deploymentunit.response.model';
import { DeploymentUnit } from '../models/deploymentunit.model';
import { ServiceProvider } from '../providers/service-provider';
import { Constants } from '../common/app-constants';
import { ApiResponse } from '../models/api-response.model';


@Injectable({
  providedIn: 'root'
})
export class DeploymentunitService extends ServiceProvider {
  
  /**
   * Type of Protocols
   */
  getProtocols() {
    return [
      {ProtocolId :1 , ProtocolName: 'HTTP'},
      {ProtocolId :2 , ProtocolName: 'HTTPS'},
      {ProtocolId :3 , ProtocolName: 'TCP'}
    ];
  }
  /**
   * Type of Deployment Units
   */
  getDeploymentunitTypes(){
    return[
      { Id: 1, Name: 'Custom' },
      { Id: 2, Name: 'Third Party' }
    ]
  }
  /**
   * fetches the product by id
   */
  fetchDeploymentUnitByProducId(id):Observable<DeploymentUnitResponse>{
    let url = this.utility.formatString(Constants.ApiCalls.getDeploymentUnitByProductId, [id]);
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
    return this.post(url ,deploymentUnitModel).pipe(map(output=>this.mapDeploymentUnit(output)));
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
}
