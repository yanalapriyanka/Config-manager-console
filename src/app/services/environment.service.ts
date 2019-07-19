import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

import { EnvironmentResponse } from '../models/environment.response.model';
import { Environment } from '../models/environment.model';
import { ServiceProvider } from '../providers/service-provider';
import { Constants} from '../common/app-constants';
import { ApiResponse } from '../models/api-response.model';


@Injectable({
  providedIn: 'root'
})
export class EnvironmentService extends ServiceProvider {
   
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
}
