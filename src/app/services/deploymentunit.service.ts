import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

import { DeploymentUnitResponse } from '../models/deploymentunit.response.model';
import { ServiceProvider } from '../providers/service-provider';
import { Constants } from '../common/app-constants';


@Injectable({
  providedIn: 'root'
})
export class DeploymentunitService extends ServiceProvider {
  
  /**
   * fetches the product by id
   */
  fetchDeploymentUnitByProducId(id):Observable<DeploymentUnitResponse>{
    let url = this.utility.formatString(Constants.ApiCalls.getDeploymentUnitByProductId, [id]);
    return this.get(url).pipe(map(output=>this.mapDeploymentUnitDetails(output)));
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
}
