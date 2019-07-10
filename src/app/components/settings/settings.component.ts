import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styles: []
})
export class SettingsComponent implements OnInit {
  settingColumns: any = ['Id', 'Name', 'Country'];
  settings: any = [
    {
         Id : 1,
         Name : 'Setting 1',
         Country : 'Germany'
     }, {
         Id : 2,
         Name : 'Setting 2',
         Country : 'Sweden'
     }, {
         Id : 3,
         Name : 'Setting 3',
         Country : 'Mexico'
     }, {
         Id : 4,
         Name : 'Setting 4',
         Country : 'Austria'
     }
 ];
  constructor() { }

  ngOnInit() {
  }

}
