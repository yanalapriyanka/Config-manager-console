import { Component, OnInit } from '@angular/core';
import {ProductService} from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: []
})
export class ProductsComponent implements OnInit {
  constructor(private productService:ProductService){

  }
  isActionMenuOpend: boolean;
  actionMenus = [];
  activeProduct : Product = new Product;
  productColumns: any = ['Id', 'Name', 'Description','Actions'];
  products: Product[];
  errorList: string[];

  ngOnInit() {
    this.actionList();
    this.getAllProducts();
  }
  toggleActionMenu(product: any): void {
    this.activeProduct = product;
    this.isActionMenuOpend = !this.isActionMenuOpend;
  }
  closeActionMenu(): void {
    this.isActionMenuOpend = false;
    console.log('closeActionMenu'); // TODO : implement directive
  }
  actionList(): void {
    this.actionMenus.push({
      id: 1,
      text: 'Deployment Units',
      routeTo: '/deploymentUnits'
    });
    this.actionMenus.push({
      id: 2,
      text: 'Environments',
      routeTo: '/environments'
    });
    this.actionMenus.push({
      id: 3,
      text: 'Settings',
      routeTo: '/settings'
    });
  }
  setActiveProduct(product : Product):void{
    this.productService.setActiveProduct(product);
  }
  getAllProducts():void{
    this.productService.fetchAllProducts().subscribe(res => {
      console.log(res);
      if(res && res.Success){
        this.products = res.Data;
        this.productService.setProducts(res.Data);
      } else {
        this.errorList = res.ErrorDetails;
      }
    });

  }
}
