import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { CreateProductComponent } from './components/products/create-product.component';
import { DeploymentUnitsComponent } from './components/deployment-units/deployment-units.component';
import { CreateDeploymentunitComponent } from './components/deployment-units/create-deploymentunit.component';
import { EnvironmentsComponent } from './components/environments/environments.component';
import { CreateEnvironmentComponent } from './components/environments/create-environment.component';
import { SettingsComponent } from './components/settings/settings.component';
import { CreateSettingComponent } from './components/settings/create-setting.component';
import { MapDUSettings } from './components/deployment-units/map-du-settings.component';

const routes: Routes = [
  {
    path: 'products',
    children: [
      {
        path: '',
        component: ProductsComponent
      },
      {
        path: 'create',
        component: CreateProductComponent
      },
      {
        path: 'edit/:id',
        component: CreateProductComponent
      }
    ]
  },
  {
    path: 'deploymentUnits',
    children: [
      {
        path: '',
        component: DeploymentUnitsComponent
      },
      {
        path: 'create',
        component: CreateDeploymentunitComponent
      },
      {
        path: 'edit/:id',
        component: CreateDeploymentunitComponent
      },
      {
        path: 'settings/:id',
        component: MapDUSettings
      }
    ]
  },
  {
    path: 'environments',
    children: [
      {
        path: '',
        component: EnvironmentsComponent
      },
      {
        path: 'create',
        component: CreateEnvironmentComponent
      },
      {
        path: 'edit/:id',
        component: CreateEnvironmentComponent
      }
    ]
  },
  {
    path: 'settings',
    children: [
      {
        path: '',
        component: SettingsComponent
      },
      {
        path: 'create',
        component: CreateSettingComponent
      },
      {
        path: 'edit/:id',
        component: CreateSettingComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
