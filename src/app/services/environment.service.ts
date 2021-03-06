import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

import { EnvironmentResponse } from '../models/environment.response.model';
import { Environment } from '../models/environment.model';
import { ServiceProvider } from '../providers/service-provider';
import { Constants} from '../common/app-constants';
import { ApiResponse } from '../models/api-response.model';
import { EnvironmentConfigSettingResponse } from '../models/environment-config-settings-response.model';


@Injectable({
  providedIn: 'root'
})
export class EnvironmentService extends ServiceProvider {
  
  activeEnvironment: Environment = new Environment; 
  setActiveEnvironment(env : Environment){
    this.activeEnvironment = env;
  }
  getActiveEnvironment() : Environment{
    return this.activeEnvironment;
  }
  /**
   * Get Deployment unit by product id and deployment id
   * @param productId 
   * @param envId 
   */
  getEnvironmentById(productId,envId):Observable<EnvironmentResponse>{
    let url = this.utility.formatString(Constants.ApiCalls.getEnvironmentById, [productId,envId]);
    return this.get(url).pipe(map(output=>this.mapEnvironmentDetails(output)));
  }

  /**
   * fetches the product by id
   */
  fetchEnvironmentByProducId(id):Observable<EnvironmentResponse>{
    let url = this.utility.formatString(Constants.ApiCalls.getEnvironmentByProductId, [id]);
    return this.get(url).pipe(map(output=>this.mapEnvironmentDetails(output)));
  }
  /**
   * Create Environment
   * @param Environment
   */
  createEnvironment(envModel:Environment):Observable<ApiResponse>{
    let url = this.utility.formatString(Constants.ApiCalls.createEnvironment, [envModel.ProductId]);
    return this.post(url,envModel).pipe(map(output=>this.mapEnvironment(output)));
  }
  /**
   * Update Environment
   * @param Environment
   */
  updateEnvironment(envModel:Environment):Observable<ApiResponse>{
    let url = this.utility.formatString(Constants.ApiCalls.updateEnvironment, [envModel.ProductId,envModel.Id]);
    return this.put(url ,envModel).pipe(map(output=>this.mapEnvironment(output)));
  }
  
   /**
   * Configure Environment settings
   * @param productId
   * @param envId
   * @param settingsModel
   */
  configureEnvironmentSettings( productId:number, envId: number , settingsModel: any):Observable<ApiResponse>{
    let url = this.utility.formatString(Constants.ApiCalls.configureEnvironmentSettings,[productId,envId]);
    return this.post(url, settingsModel).pipe(map(output=>this.mapEnvironment(output)));
  }
  /**
   * get Environment Settings
   * @param productId
   * @param envId
   */
  getEnvironmentSettings( productId:number, envId: number):Observable<EnvironmentConfigSettingResponse>{
    let url = this.utility.formatString(Constants.ApiCalls.getEnvironmentSettings,[productId,envId]);
    return this.get(url).pipe(map(output=>this.mapEnvironSettings(output)));
  }
  navigateToEnvironments(){
    this.router.navigate(['/environments']);
  }

  private mapEnvironmentDetails(response: any): EnvironmentResponse {
    var result: EnvironmentResponse;
    try {

      if (response) {
        result = response as EnvironmentResponse;
      }
    }
    catch (error) {
      // console.log(error);
    }
    return result;
  }
  private mapEnvironment(response: any): ApiResponse {
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
  private mapEnvironSettings(response:any):EnvironmentConfigSettingResponse{
    var result: EnvironmentConfigSettingResponse;
    try {

      if (response) {
        result = response as EnvironmentConfigSettingResponse;
      }
    }
    catch (error) {
      // console.log(error);
    }
    return result;
  }
}
