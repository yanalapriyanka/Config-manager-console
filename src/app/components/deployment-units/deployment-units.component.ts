import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deployment-units',
  templateUrl: './deployment-units.component.html',
  styles: []
})
export class DeploymentUnitsComponent implements OnInit {
  deployUnitColumns: any = ['Id', 'Name', 'Country'];
  deploymentUnits: any = [
    {
         Id : 1,
         Name : 'Unit 1',
         Country : 'Germany'
     }, {
         Id : 2,
         Name : 'Unit 2',
         Country : 'Sweden'
     }, {
         Id : 3,
         Name : 'Unit 3',
         Country : 'Mexico'
     }, {
         Id : 4,
         Name : 'Unit 4',
         Country : 'Austria'
     }
 ];
  constructor() { }

  ngOnInit() {
  }

}
