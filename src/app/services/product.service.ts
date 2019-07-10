import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { Observable, from } from 'rxjs';

import { ProductsListResponse } from '../models/products-list-response.model';
import { ServiceProvider } from '../providers/service-provider';
import { Constants } from '../common/app-constants';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends  ServiceProvider {

  /**
   * fetches the products list
   */
  fetchAllProducts(): Observable<ProductsListResponse>{
    return this.get(Constants.ApiCalls.getProductsList).pipe(map(output=>this.mapProductDetails(output)));
  }

  /**
   * Create product
   */
  createProduct(productModel:any):Observable<ApiResponse>{
    return this.post(Constants.ApiCalls.createProduct,productModel).pipe(map(output=>this.mapCreateProduct(output)));
  }
  
  private mapProductDetails(response: any): ProductsListResponse {

    var result: ProductsListResponse;
    try {

      if (response) {
        result = response as ProductsListResponse;
      }
    }

    catch (error) {
      // console.log(error);
    }
    return result;
  }
  private mapCreateProduct(response: any): ApiResponse {

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