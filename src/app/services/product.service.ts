import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs';

import { ProductsListResponse } from '../models/products-list-response.model';
import { ServiceProvider } from '../providers/service-provider';
import { Constants } from '../common/app-constants';
import { ApiResponse } from '../models/api-response.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends  ServiceProvider {

  activeProduct: Product = new Product; 
  products: Product[];

  setActiveProduct(product : Product){
    this.activeProduct = product;
  }
  getActiveProduct() : Product{
    return this.activeProduct;
  }

  setProducts(productsList : Product[]){
    this.products = productsList;
  }
  getProducts(): Product[]{
    return this.products;
  }
  /**
   * fetches the products list
   */
  fetchAllProducts(): Observable<ProductsListResponse>{
    return this.get(Constants.ApiCalls.getProductsList).pipe(map(output=>this.mapProductDetails(output)));
  }
  /**
   * fetches the product by id
   */
  fetchProductById(id):Observable<ProductsListResponse>{
    let url = this.utility.formatString(Constants.ApiCalls.getProduct, [id]);
    return this.get(url).pipe(map(output=>this.mapProductDetails(output)));
  }
  /**
   * Create product
   */
  createProduct(productModel:Product):Observable<ApiResponse>{
    return this.post(Constants.ApiCalls.createProduct,productModel).pipe(map(output=>this.mapCreateProduct(output)));
  }
  
   /**
   * Update product
   */
  updateProduct(productModel:Product):Observable<ApiResponse>{
    let url = this.utility.formatString(Constants.ApiCalls.updateProduct, [productModel.Id]);
    return this.put(url, productModel).pipe(map(output=>this.mapCreateProduct(output)));
  }

  navigateToProducts(){
    this.router.navigate(['/products']);
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