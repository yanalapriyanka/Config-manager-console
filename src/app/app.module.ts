import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , FormBuilder} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { CreateProductComponent } from './components/products/create-product.component';
import { DeploymentUnitsComponent } from './components/deployment-units/deployment-units.component';
import { CreateDeploymentunitComponent } from './components/deployment-units/create-deploymentunit.component';
import { MapDUSettings } from './components/deployment-units/map-du-settings.component';
import { EnvironmentsComponent } from './components/environments/environments.component';
import { CreateEnvironmentComponent } from './components/environments/create-environment.component';
import { SettingsComponent } from './components/settings/settings.component';
import { CreateSettingComponent } from './components/settings/create-setting.component';
import { ProductService } from './services/product.service';
import {Utility} from './common/utility';



@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    DeploymentUnitsComponent,
    MapDUSettings,
    EnvironmentsComponent,
    SettingsComponent,
    CreateProductComponent,
    CreateDeploymentunitComponent,
    CreateEnvironmentComponent,
    CreateSettingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,    
    HttpClientModule,
    DragDropModule
  ],
  providers: [
    FormBuilder,
    Utility,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
