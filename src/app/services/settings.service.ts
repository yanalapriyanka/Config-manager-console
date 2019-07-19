import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

import { SettingResponse } from '../models/setting.response.model';
import { Setting } from '../models/setting.model';
import { ServiceProvider } from '../providers/service-provider';
import { Constants} from '../common/app-constants';
import { ApiResponse } from '../models/api-response.model';


@Injectable({
  providedIn: 'root'
})
export class SettingService extends ServiceProvider {
   
  /**
   * Get Deployment unit by product id and deployment id
   * @param productId 
   * @param envId 
   */
  getSettingById(productId,envId):Observable<SettingResponse>{
    let url = this.utility.formatString(Constants.ApiCalls.getSettingById, [productId,envId]);
    return this.get(url).pipe(map(output=>this.mapSettingDetails(output)));
  }

  /**
   * fetches the product by id
   */
  fetchSettingByProducId(id):Observable<SettingResponse>{
    let url = this.utility.formatString(Constants.ApiCalls.getSettingByProductId, [id]);
    return this.get(url).pipe(map(output=>this.mapSettingDetails(output)));
  }
  /**
   * Create Setting
   * @param Setting
   */
  createSetting(envModel:Setting):Observable<ApiResponse>{
    let url = this.utility.formatString(Constants.ApiCalls.createSetting, [envModel.ProductId]);
    return this.post(url,envModel).pipe(map(output=>this.mapSetting(output)));
  }
  /**
   * Update Setting
   * @param Setting
   */
  updateSetting(envModel:Setting):Observable<ApiResponse>{
    let url = this.utility.formatString(Constants.ApiCalls.updateSetting, [envModel.ProductId,envModel.Id]);
    return this.put(url ,envModel).pipe(map(output=>this.mapSetting(output)));
  }
  navigateToSettings(){
    this.router.navigate(['/settings']);
  }

  private mapSettingDetails(response: any): SettingResponse {
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
  private mapSetting(response: any): ApiResponse {
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
